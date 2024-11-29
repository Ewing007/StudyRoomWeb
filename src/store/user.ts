// import { StoreOptions } from "vuex";
// import { Service } from "../../generated/services/Service";
// import { OpenAPI } from "../../generated";
// import WebSocketService from "../webSocket/WebSocketService";
// // const websocketUrl = "ws://localhost:8888/StudyRoom-User/ws";
// const websocketUrl = "ws://localhost:8888/StudyRoom-User/ws/13245687";
// const websocketService = new WebSocketService(websocketUrl);
//
// export default {
//   namespaced: true,
//   state: () => ({
//     loginUser: {
//       userid: "",
//       username: "",
//       phone: "",
//       email: "",
//       avatar: "",
//       sex: "",
//       creditScore: 0,
//       token:
//         window.sessionStorage.getItem("token") ||
//         (OpenAPI.HEADERS as any).Authorization ||
//         "",
//       roles: [],
//       permission: [],
//       isLogin: false,
//     },
//     notifications: [] as any[],
//     websocketConnected: false,
//   }),
//   getters: {},
//   actions: {
//     async updateUser({ commit, dispatch, state }, payload) {
//       commit("setLoginUser", payload);
//       console.log("loginUser: ", state.loginUser);
//       if (payload.isLogin) {
//         // 用户登录时连接 WebSocket
//         console.log("连接 WebSocket", state.loginUser.userId);
//         dispatch("connectWebSocket");
//       }
//     },
//     async logout({ commit, dispatch }) {
//       // 用户退出时断开 WebSocket
//       dispatch("disconnectWebSocket");
//       commit("clearUserInfo"); // 调用 mutation 清空用户信息
//       // 清除 sessionStorage 中的 token
//       window.sessionStorage.removeItem("vuex");
//       window.sessionStorage.removeItem("token");
//       (OpenAPI.HEADERS as any).Authorization = null;
//     },
//     async updateAvatar({ state, commit }, payload: { avatar: string }) {
//       commit("setAvatar", { avatar: `${payload.avatar}` });
//     },
//     async setToken({ state, commit }, payload) {
//       commit("setToken", payload);
//     },
//     async connectWebSocket({ state, commit }) {
//       console.log("userid: ", state.loginUser.userId);
//       // websocketService.connect(state.loginUser.userId);
//       // websocketService.sendMessage({ type: "connect", user: state.loginUser });
//       // websocketService.on("notification", (data) => {
//       //   commit("addNotification", data);
//       // });
//       websocketService.connect(state.loginUser.userId);
//       commit("setWebSocketConnected", true);
//     },
//     disconnectWebSocket({ commit }) {
//       console.log("断开 WebSocket");
//       websocketService.close();
//       commit("setWebSocketConnected", false);
//     },
//   },
//   mutations: {
//     clearUserInfo(state) {
//       state.loginUser = {
//         userid: "",
//         username: "",
//         phone: "",
//         email: "",
//         avatar: "",
//         sex: "",
//         creditScore: 0,
//         token: "",
//         roles: [],
//         permission: [],
//         isLogin: false,
//       };
//     },
//     setLoginUser(state, payload) {
//       state.loginUser = payload;
//     },
//     setAvatar(state, payload: { avatar: string }) {
//       state.loginUser.avatar = payload.avatar;
//     },
//     setToken(state, payload) {
//       state.loginUser.token = payload;
//       window.sessionStorage.setItem("token", payload);
//     },
//     setWebSocketConnected(state, isConnected: boolean) {
//       state.websocketConnected = isConnected;
//     },
//     addNotification(state, notification) {
//       state.notifications.push(notification);
//     },
//   },
// } as StoreOptions<any>;

import { StoreOptions } from "vuex";
import { Service } from "../../generated/services/Service";
import { OpenAPI } from "../../generated";
import WebSocketService from "../webSocket/WebSocketService";

const websocketUrl = "ws://localhost:8888/StudyRoom-User/ws";
let websocketService: WebSocketService;

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userId: "",
      userName: "",
      phone: "",
      email: "",
      avatar: "",
      sex: "",
      creditScore: 0,
      token:
        window.sessionStorage.getItem("token") ||
        (OpenAPI.HEADERS as any).Authorization ||
        "",
      roles: [],
      permission: [],
      isLogin: false,
    },
    notifications: {
      replyNotifications: [] as any[],
      systemNotifications: [] as any[],
      checkInNotifications: [] as any[],
    },
    websocketConnected: false,
  }),
  getters: {},
  actions: {
    async updateUser({ commit, dispatch, state }, payload) {
      commit("setLoginUser", payload);
      if (payload.isLogin && !this.state.user.userId) {
        // 用户登录时连接 WebSocket
        // websocketService = new WebSocketService(
        //   websocketUrl,
        //   state.loginUser.userid
        // );
        websocketService.setOnMessageCallback((data) => {
          commit("addNotification", data);
        });
        dispatch("connectWebSocket");
      }
    },
    async logout({ commit, dispatch }) {
      // 清除 sessionStorage 中的 token
      window.sessionStorage.removeItem("vuex");
      window.sessionStorage.removeItem("token");
      (OpenAPI.HEADERS as any).Authorization = null;
      commit("clearUserInfo"); // 调用 mutation 清空用户信息
      commit("clearNotifications");
      // 用户退出时断开 WebSocket
      // dispatch("disconnectWebSocket");
      // websocketService.setUserLoggedOut(true);
      if (websocketService) {
        websocketService.setUserLoggedOut(true);
        websocketService.close();
      }
    },
    async updateAvatar({ state, commit }, payload: { avatar: string }) {
      commit("setAvatar", { avatar: `${payload.avatar}` });
    },
    async setToken({ state, commit }, payload) {
      commit("setToken", payload);
    },
    async connectWebSocket({ state, commit }) {
      // console.log("页面刷新，重新连接");
      // console.log("用户是否登录: ", state.loginUser.isLogin);
      if (!state.loginUser.isLogin) {
        console.log("页面刷新，websocket连接失败");
        return;
      }
      // 确保 WebSocket 服务实例可用
      if (!websocketService) {
        websocketService = new WebSocketService(
          websocketUrl,
          state.loginUser.userId
        );
        websocketService.setOnMessageCallback((data) => {
          commit("addNotification", data);
        });
      }

      websocketService.connect(state.loginUser.userId);
      commit("setWebSocketConnected", true);
      // websocketService.connect(state.loginUser.userId);
      // commit("setWebSocketConnected", true);
    },
    // disconnectWebSocket({ commit }) {
    //   console.log("断开 WebSocket");
    //   websocketService.close();
    //   commit("setWebSocketConnected", false);
    // },
    async sendMessage({ dispatch }, payload) {
      if (websocketService) {
        websocketService.send(payload);
      }
    },
  },
  mutations: {
    clearUserInfo(state) {
      state.loginUser = {
        userid: "",
        username: "",
        phone: "",
        email: "",
        avatar: "",
        sex: "",
        creditScore: 0,
        token: "",
        roles: [],
        permission: [],
        isLogin: false,
      };
    },
    clearNotifications(state) {
      state.notifications = {
        replyNotifications: [],
        systemNotifications: [],
        checkInNotifications: [],
      };
    },
    setLoginUser(state, payload) {
      state.loginUser = payload;
    },
    setAvatar(state, payload: { avatar: string }) {
      state.loginUser.avatar = payload.avatar;
    },
    setToken(state, payload) {
      state.loginUser.token = payload;
      window.sessionStorage.setItem("token", payload);
    },
    setWebSocketConnected(state, isConnected: boolean) {
      state.websocketConnected = isConnected;
    },
    addNotification(state, notification) {
      if (notification.type === "reply") {
        state.notifications.replyNotifications.push(notification);
      } else if (notification.type === "system") {
        state.notifications.systemNotifications.push(notification);
      } else if (notification.type === "check") {
        state.notifications.checkInNotifications.push(notification);
      }
    },
    removeReplyNotification(state, notificationId: string) {
      state.notifications.replyNotifications =
        state.notifications.replyNotifications.filter(
          (msg: { notificationId: string }) =>
            msg.notificationId !== notificationId
        );
    },
    removeSystemNotification(state, notificationId: string) {
      state.notifications.systemNotifications =
        state.notifications.systemNotifications.filter(
          (msg: { notificationId: string }) =>
            msg.notificationId !== notificationId
        );
    },
    removeCheckInNotification(state, notificationId: string) {
      state.notifications.checkInNotifications =
        state.notifications.checkInNotifications.filter(
          (msg: { notificationId: string }) =>
            msg.notificationId !== notificationId
        );
    },
  },
} as StoreOptions<any>;
