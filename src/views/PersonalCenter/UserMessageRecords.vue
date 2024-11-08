<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>我的留言</span>
      </div>
    </template>
    <el-table :data="messages" style="width: 100%">
      <el-table-column label="" width="80">
        <template #default="scope">
          <img :src="scope.row.userAvatar" alt="头像" class="user-avatar" />
        </template>
      </el-table-column>
      <el-table-column label="留言内容" width="300">
        <template #default="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="回复对象" width="200">
        <template #default="scope">
          {{ scope.row.replyToUserName || "无" }}
        </template>
      </el-table-column>
      <el-table-column label="发送时间" width="200">
        <template #default="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.messageId)"
          >
            删除留言
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../../generated/services/Service";

interface Message {
  messageId: string;
  userId: string;
  userName: string | null;
  userAvatar: string;
  content: string;
  replyTo: string;
  replyToUserId: string;
  replyToUserName: string | null;
  createTime: string;
  updateTime: string;
  children: any | null;
}

const messages = ref<Message[]>([]);
const total = ref(0);
const pageSize = ref(10);
const pageNum = ref(1);

onMounted(() => {
  fetchMessages();
});

const fetchMessages = async () => {
  try {
    const response = await Service.getMessagesByUserId({
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      fetchAll: false,
    });
    if (response.data) {
      messages.value = response.data.list;
      total.value = response.data.total;
    }
  } catch (error) {
    ElMessage.error("获取留言失败");
  }
};

const handlePageChange = (newPage: number) => {
  pageNum.value = newPage;
  fetchMessages();
};

const handleDelete = async (messageId: string) => {
  try {
    const response = await Service.deleteMessage(messageId);
    if (response.code === "A4051") {
      ElMessage.success("删除留言成功");
      fetchMessages();
    } else {
      ElMessage.error(response.message || "删除留言失败");
    }
  } catch (error) {
    ElMessage.error("删除留言失败");
  }
};

const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};
</script>

<style scoped>
.box-card {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
