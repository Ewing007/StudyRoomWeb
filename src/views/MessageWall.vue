<template>
  <div class="container">
    <div class="message-form">
      <el-input v-model="newMessage.content" placeholder="我要发留言" />
      <el-button @click="addMessage">发表</el-button>
    </div>

    <div
      v-for="message in messages"
      :key="message.messageId"
      class="message-card"
    >
      <div class="message-header">
        <img :src="message.userAvatar" alt="User Avatar" class="avatar" />
        <span class="user-name">{{ message.userName }}</span>
        <span class="timestamp">{{ formatDate(message.createTime) }}</span>
      </div>
      <p class="message-content">{{ message.content }}</p>

      <div class="actions">
        <el-button @click="setReplyTo(message.messageId)">回复</el-button>
        <el-button @click="showReplies(message.messageId)"
          >查看留言回复</el-button
        >
      </div>

      <div v-if="replyingTo[message.messageId]" class="reply-form">
        <el-input v-model="replyMessage.content" placeholder="回复评论" />
        <el-button @click="replyToMessage(message.messageId)">回复</el-button>
        <el-button @click="cancelReply(message.messageId)">取消</el-button>
      </div>

      <div v-if="message.replies && message.replies.length > 0" class="replies">
        <div
          v-for="reply in message.replies"
          :key="reply.messageId"
          class="reply-card"
        >
          <div class="reply-header">
            <img :src="reply.userAvatar" alt="User Avatar" class="avatar" />
            <span class="user-name">{{ reply.userName }}</span>
            <span class="timestamp">{{ formatDate(reply.createTime) }}</span>
            <span v-if="reply.replyToUserId" class="reply-context">
              回复 {{ reply.replyToUserName }}
            </span>
          </div>
          <p class="reply-content">{{ reply.content }}</p>

          <div class="actions">
            <el-button
              @click="
                setReplyToReply(
                  message.messageId,
                  reply.messageId,
                  reply.userId,
                  reply.userName
                )
              "
              >回复</el-button
            >
          </div>

          <div v-if="replyingToReply[reply.messageId]" class="reply-form">
            <el-input
              v-model="replies[reply.messageId].content"
              placeholder="回复评论"
            />
            <el-button @click="replyToReply(message.messageId, reply.messageId)"
              >回复</el-button
            >
            <el-button @click="cancelReplyToReply(reply.messageId)"
              >取消</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElInput, ElButton, ElMessage } from "element-plus";
import { Service } from "../../generated/services/Service";
import { type } from "os";
import { useStore } from "vuex";

interface Message {
  messageId: string;
  userId: string;
  userName: string;
  roles: string[];
  content: string;
  replyTo: string | null;
  status: string;
  createTime: string;
  updateTime: string;
  replies: Reply[] | null;
  children: Message[] | null;
}

interface Reply {
  messageId: string;
  userId: string;
  userName: string;
  roles: string[];
  content: string;
  replyTo: string;
  replyToUserId: string; // 新增字段
  replyToUserName: string; // 新增字段
  status: string;
  createTime: string;
  updateTime: string;
}

const messages = ref<Message[]>([]);
const replies = reactive<{
  [key: string]: { content: string; userId: string; userName: string };
}>({});

const newMessage = reactive({ content: "" });
const replyMessage = reactive({ content: "" });
const replyToReplyMessage = reactive({ content: "" });
const replyingTo = reactive<{ [key: string]: boolean }>({});
const replyingToReply = reactive<{ [key: string]: boolean }>({}); // 新增字段
const store = useStore();
const loginUser = store.state.user.loginUser;
const generateTestData = async () => {
  try {
    const response = await Service.getAllMessages();
    if (response.code === "200") {
      messages.value = response.data;
    } else {
      ElMessage.error(response.message);
    }
  } catch (error) {
    ElMessage.error("获取留言失败，请稍后再试");
  }
};

const addMessage = async () => {
  if (!newMessage.content.trim()) return;
  const response = await Service.post(newMessage);
  // console.log("resp:", response);
  if (response.code === "200") {
    messages.value.push(response.data);
    ElMessage.success(response.message);
    newMessage.content = "";
  } else {
    ElMessage.error(response.message);
  }
};

const setReplyTo = (messageId: string) => {
  replyingTo[messageId] = true;
};

const cancelReply = (messageId: string) => {
  replyingTo[messageId] = false;
  replies[messageId] = { content: "", userId: "", userName: "" };
};

const replyToMessage = async (messageId: string) => {
  const message = messages.value.find((msg) => msg.messageId === messageId);
  if (!message || !message.content || !message.content.trim()) return;
  // console.log("reply message:", message);
  const response = await Service.reply({
    content: replyMessage.content,
    replyTo: messageId,
    replyToUserId: message.userId,
    replyToUserName: message.userName,
  });
  // console.log(response);
  if (response.code === "200") {
    const newReply: Reply = response.data;
    if (message) {
      if (!message.replies) {
        message.replies = [];
      }
      message.replies.push(newReply);
    }
    if (message) {
      replyMessage.content = "";
      replyingTo[messageId] = false;
    }
  } else {
    ElMessage.error(response.message);
  }
};

const fetchRepliesByMessageId = async (messageId: string) => {
  try {
    const response = await Service.getRepliesByMessageId(messageId);
    if (response.code === "200") {
      const message = messages.value.find((msg) => msg.messageId === messageId);
      if (message) {
        message.replies = response.data;
      }
    } else {
      ElMessage.error(response.message);
    }
  } catch (error) {
    ElMessage.error("获取回复失败，请稍后再试");
  }
};

const showReplies = (messageId: string) => {
  fetchRepliesByMessageId(messageId);
};

const cancelReplyToReply = (replyId: string) => {
  replyingToReply[replyId] = false;
  replies[replyId] = { content: "", userId: "", userName: "" };
};

const replyToReply = async (messageId: string, replyId: string) => {
  const reply = replies[replyId];
  // console.log("replytoreply:", reply);
  // console.log("replies[reply.messageId].content", replies[replyId].content);
  if (!reply || !reply.content.trim()) {
    ElMessage.error("回复内容不能为空");
    return;
  }
  try {
    const response = await Service.reply({
      content: replies[replyId].content,
      replyTo: replyId,
      replyToUserId: reply.userId,
      replyToUserName: reply.userName,
    });
    if (response.code === "200") {
      const newReply: Reply = response.data;
      const message = messages.value.find((msg) => msg.messageId === messageId);
      if (message) {
        if (!message.replies) message.replies = [];
        message.replies.push(newReply);
      }
      // 清空回复内容
      replies[replyId] = { content: "", userId: "", userName: "" };
      replyingToReply[replyId] = false;
    } else {
      ElMessage.error(response.message);
    }
  } catch (error) {
    ElMessage.error("回复评论失败，请稍后再试");
  }
};

const setReplyToReply = (
  messageId: string,
  replyId: string,
  replyToUserId: string,
  replyToUserName: string
) => {
  // 初始化指定的 replyId 的内容
  replyingToReply[replyId] = true;
  replies[replyId] = {
    content: "", // 重置回复内容
    userId: replyToUserId,
    userName: replyToUserName,
  };
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

onMounted(generateTestData);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.message-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.message-card {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.message-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.message-header,
.reply-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user-name {
  font-weight: bold;
  color: #2c3e50;
}

.timestamp {
  color: #999;
}

.message-content,
.reply-content {
  margin-bottom: 10px;
}

.replies {
  margin-top: 10px;
}

.reply-card {
  margin-bottom: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.actions {
  margin-top: 10px;
}

.actions .el-button {
  margin-right: 5px;
}

.reply-form {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.reply-context {
  color: #777;
  font-size: 0.9em;
}
</style>
