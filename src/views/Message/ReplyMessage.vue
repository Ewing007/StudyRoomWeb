<!--<template>-->
<!--  <div class="reply-message-page">-->
<!--    <el-card-->
<!--      v-for="message in messages"-->
<!--      :key="message.messageId"-->
<!--      class="message-card"-->
<!--    >-->
<!--      <div class="message-header">-->
<!--        <el-avatar-->
<!--          :src="message.content.userAvatar"-->
<!--          size="small"-->
<!--          class="avatar"-->
<!--        />-->
<!--        <div class="message-info">-->
<!--          <span class="sender">{{ message.content.userName }}</span>-->
<!--          <span class="time">{{ message.createTime }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="message-content">回复了您: {{ message }}</div>-->
<!--      <div class="message-actions">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          size="small"-->
<!--          @click="markAsRead(message.messageId)"-->
<!--        >-->
<!--          已读-->
<!--        </el-button>-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          size="small"-->
<!--          @click="replyMessage(message.messageId)"-->
<!--        >-->
<!--          回复-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </el-card>-->
<!--    <div v-if="messages.length === 0" class="empty-placeholder">-->
<!--      <el-empty description="暂无回复消息"></el-empty>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { useStore } from "vuex";-->
<!--import { computed } from "vue";-->
<!--import WebSocketService from "@/webSocket/WebSocketService";-->

<!--const store = useStore();-->
<!--const messages = computed(-->
<!--  () => store.state.user.notifications.replyNotifications-->
<!--);-->
<!--const replyMessage = (id: number) => {-->
<!--  console.log(`Replying to message ID: ${id}`);-->
<!--  // 实现具体的回复逻辑-->
<!--};-->
<!--const markAsRead = (messageId: number) => {-->
<!--  const noticeId = messageId; // 假设 messageId 就是 noticeId-->
<!--  console.log(`Marking message ID: ${messageId} as read`);-->

<!--  // 发送 WebSocket 消息-->
<!--  const websocketService = new WebSocketService(-->
<!--    "ws://localhost:8888/StudyRoom-User/ws",-->
<!--    store.state.loginUser.userId-->
<!--  );-->
<!--  websocketService.send({ type: "markAsRead", noticeId });-->

<!--  // 删除消息-->
<!--  store.commit("user/removeReplyNotification", messageId);-->
<!--};-->
<!--</script>-->
<template>
  <div class="reply-message-page">
    <el-card
      v-for="message in messages"
      :key="message.notificationId"
      class="message-card"
    >
      <div class="message-header">
        <el-avatar :src="getUserAvatar(message)" size="small" class="avatar" />
        <div class="message-info">
          <span class="sender">{{ getUsername(message) }}</span>
          <span class="time">{{ getCreateTime(message) }}</span>
        </div>
      </div>
      <div class="message-content">
        回复了您: {{ getMessageContent(message) }}
      </div>
      <div class="message-actions">
        <el-button
          type="primary"
          plain
          size="small"
          @click="markAsRead(message.notificationId)"
        >
          已读
        </el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="replyMessage(message.notificationId)"
        >
          回复
        </el-button>
      </div>
    </el-card>
    <div v-if="messages.length === 0" class="empty-placeholder">
      <el-empty description="暂无回复消息"></el-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import WebSocketService from "@/webSocket/WebSocketService";

const store = useStore();
const messages = computed(
  () => store.state.user.notifications.replyNotifications
);

const getUserAvatar = (message: any) => {
  try {
    const content = JSON.parse(message.content);
    return content.userAvatar;
  } catch (error) {
    console.error("解析 content 失败:", error);
    return ""; // 返回默认值或空字符串
  }
};

const getUsername = (message: any) => {
  try {
    const content = JSON.parse(message.content);
    return content.userName;
  } catch (error) {
    console.error("解析 content 失败:", error);
    return ""; // 返回默认值或空字符串
  }
};

const getMessageContent = (message: any) => {
  try {
    const content = JSON.parse(message.content);
    return content.content;
  } catch (error) {
    console.error("解析 content 失败:", error);
    return ""; // 返回默认值或空字符串
  }
};

const getCreateTime = (message: any) => {
  try {
    const content = JSON.parse(message.content);
    return content.createTime;
  } catch (error) {
    console.error("解析 content 失败:", error);
    return ""; // 返回默认值或空字符串
  }
};
const replyMessage = (id: number) => {
  console.log(`Replying to message ID: ${id}`);
  // 实现具体的回复逻辑
};

const markAsRead = (notificationId: string) => {
  const noticeId = notificationId; // noticeId

  console.log(
    "store.state.loginUser.userId",
    store.state.user.loginUser.userId
  );
  // 发送 WebSocket 消息
  store.dispatch("user/sendMessage", { type: "markAsRead", noticeId });

  // 删除消息
  store.commit("user/removeReplyNotification", notificationId);
};
</script>
<style scoped>
.reply-message-page {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 卡片之间的间距 */
  padding: 20px;
  background: linear-gradient(to bottom, #f9fafc, #ffffff);
  overflow-y: auto; /* 允许滚动以适配更多内容 */
  width: 100%; /* 确保页面宽度适应父容器 */
  max-width: 1200px; /* 设置最大宽度，防止卡片过宽 */
  margin: 0 auto; /* 居中显示 */
}

.message-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  background: linear-gradient(to bottom, #f9fafc, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 10px; /* 标题、内容和按钮的间距 */
  width: 100%; /* 容器宽度自适应父容器 */
  max-width: 800px; /* 设置最大宽度，避免卡片过宽 */
  margin: 0 auto; /* 居中显示 */
}

.message-header {
  display: flex;
  align-items: center;
  gap: 10px; /* 头像与文本之间的间距 */
}

.avatar {
  width: 36px; /* 设置头像大小 */
  height: 36px;
}

.message-info {
  display: flex;
  flex-direction: column;
}

.sender {
  font-weight: bold;
}

.time {
  font-size: 12px;
  color: #909399;
}

.message-content {
  font-size: 15px;
  color: #303133;
  line-height: 1.5;
  flex: 1; /* 确保内容部分占据足够空间 */
}

.message-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* 按钮之间的间距 */
}

.empty-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
