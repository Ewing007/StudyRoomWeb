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
      <div class="message-content">您预约的自习室座位马上准备开始签到啦!!!</div>
      <div class="message-actions">
        <el-button
          v-if="message.content && message.content.checkInQrCode"
          type="success"
          size="small"
          @click="showQrCodeDialog(message.content.checkInQrCode)"
        >
          签到
        </el-button>
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
      <el-empty description="暂无签到通知"></el-empty>
    </div>

    <!-- 弹出二维码对话框 -->
    <el-dialog
      title="签到二维码"
      v-model="qrCodeDialogVisible"
      :visible="qrCodeDialogVisible"
      width="30%"
    >
      <div class="qr-code-container">
        <img :src="currentQrCode" alt="签到二维码" class="qr-code" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <!--          <el-button @click="qrCodeDialogVisible = false">取 消</el-button>-->
          <el-button type="primary" @click="qrCodeDialogVisible = false"
            >关 闭</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { format } from "date-fns";

interface NotificationMessage {
  notificationId: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: number;
}
const store = useStore();
const messages = computed(() =>
  store.state.user.notifications.checkInNotifications.map((msg: any) => ({
    ...msg,
    content: JSON.parse(msg.content),
  }))
);

const markAsRead = (notificationId: string) => {
  const noticeId = notificationId; // noticeId
  // 发送 WebSocket 消息
  store.dispatch("user/sendMessage", { type: "markAsRead", noticeId });

  // 删除消息
  store.commit("user/removeCheckInNotification", notificationId);
};

const formatDate = (timestamp: number) => {
  return format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss");
};

// 控制二维码对话框的显示与隐藏
const qrCodeDialogVisible = ref(false);
const currentQrCode = ref("");

const showQrCodeDialog = (qrCode: string) => {
  currentQrCode.value = `data:image/png;base64,${qrCode}`;
  qrCodeDialogVisible.value = true;
};
</script>

<style scoped>
/* 保留原有样式 */
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

.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  /*background: #f9fafc;*/
  /*border-radius: 12px;*/
  /*box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);*/
}

.qr-code {
  max-width: 100%;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qr-code:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
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
