class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private userId: string;
  private isUserLoggedOut = false;
  private onMessageCallback: ((data: any) => void) | null = null;
  constructor(url: string, userId: string) {
    this.url = url;
    this.userId = userId;
    // 监听页面卸载事件，断开 WebSocket
    window.addEventListener("beforeunload", () => {
      this.close();
    });
  }

  private heartbeatTimer: NodeJS.Timeout | null = null;
  private heartbeatInterval = 30000; // 30秒

  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: "heartbeat" });
    }, this.heartbeatInterval);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 10000; // 10秒

  reconnect() {
    if (this.isUserLoggedOut) {
      return;
    }
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `尝试重新连接... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );
      setTimeout(() => {
        this.connect(this.userId); // 传递 userId 参数
      }, this.reconnectInterval);
    } else {
      console.error("达到最大重连次数，连接失败");
    }
  }

  connect(userId: string) {
    this.userId = userId;
    const fullUrl = `${this.url}/${userId}`;
    // this.socket = new WebSocket(fullUrl);
    // this.socket.onopen = this.onOpen.bind(this);
    // this.socket.onmessage = this.onMessage.bind(this);
    // this.socket.onclose = this.onClose.bind(this);
    // this.socket.onerror = this.onError.bind(this);
    // this.startHeartbeat();
    try {
      this.socket = new WebSocket(fullUrl);
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.startHeartbeat();
    } catch (error) {
      console.error("WebSocket 连接失败:", error);
      this.reconnect(); // 尝试重连
    }
  }

  onOpen() {
    console.log("WebSocket连接已建立");
    this.reconnectAttempts = 0;
    this.startHeartbeat();
  }

  onMessage(event: MessageEvent) {
    console.log("收到消息:", event.data);
    const data = JSON.parse(event.data);
    console.log("收到消息:", data);
    if (this.onMessageCallback) {
      this.onMessageCallback(data);
    }
  }

  onClose() {
    console.log("WebSocket连接已关闭");
    this.stopHeartbeat();
    this.reconnect();
  }

  onError(error: Event) {
    console.error("WebSocket错误:", error);
  }

  send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error("WebSocket未连接");
    }
  }
  close() {
    if (this.socket && !this.userId) {
      this.socket.close();
      this.userId = "";
      this.stopHeartbeat();
    }
  }
  setUserLoggedOut(isLoggedOut: boolean) {
    this.isUserLoggedOut = isLoggedOut;
    if (isLoggedOut) {
      this.userId = ""; // 用户登出时清空 userId
      this.close(); // 关闭 WebSocket 连接
    }
  }

  setOnMessageCallback(callback: (data: any) => void) {
    this.onMessageCallback = callback;
  }
}

export default WebSocketService;
