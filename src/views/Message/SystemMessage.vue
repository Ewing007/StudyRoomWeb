<template>
  <div class="system-message">
    <el-card
      v-for="message in messages"
      :key="message.notificationId"
      class="message-card"
    >
      <div class="message-header">
        <span class="title">{{ message.title }}</span>
        <span class="time">{{ formatDate(message.createdAt) }}</span>
      </div>
      <div class="message-content">
        {{ message.content }}
      </div>
      <div class="message-actions">
        <el-button
          v-if="!message.isRead"
          type="primary"
          size="small"
          @click="markAsRead(message.notificationId)"
        >
          标记已读
        </el-button>
      </div>
    </el-card>
    <div v-if="messages.length === 0" class="empty-placeholder">
      <el-empty description="暂无系统消息"></el-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { format } from "date-fns";
const store = useStore();
const messages = computed(
  () => store.state.user.notifications.systemNotifications
);
const markAsRead = (notificationId: string) => {
  const noticeId = notificationId; // noticeId
  // 发送 WebSocket 消息
  store.dispatch("user/sendMessage", { type: "markAsRead", noticeId });

  // 删除消息
  store.commit("user/removeSystemNotification", notificationId);
};

const formatDate = (timestamp: number) => {
  return format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss");
};
</script>

<style scoped>
.system-message {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: linear-gradient(to bottom, #f9fafc, #ffffff);
  overflow-y: auto;
}

.message-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  background: linear-gradient(to bottom, #f9fafc, #ffffff);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #606266;
  margin-bottom: 10px;
}

.title {
  font-weight: bold;
}

.time {
  font-size: 12px;
  color: #909399;
}

.message-content {
  font-size: 16px;
  color: #303133;
  margin-bottom: 15px;
  line-height: 1.5;
}

.message-actions {
  display: flex;
  justify-content: flex-end; /* 右对齐按钮 */
  gap: 10px;
  margin-top: 10px; /* 调整间距 */
}

.read-button {
  padding: 8px 16px; /* 调整按钮内边距 */
  font-size: 14px; /* 调整按钮字体大小 */
  border-radius: 8px; /* 调整按钮圆角 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 调整按钮阴影 */
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.read-button:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 鼠标悬停时的阴影效果 */
}

.empty-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.el-empty {
  margin-top: 20px;
}
</style>
