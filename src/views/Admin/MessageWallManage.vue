<template>
  <div class="message-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>留言管理</span>
        </div>
      </template>
      <el-table
        :data="messages"
        style="width: 100%"
        :loading="loading"
        class="custom-table"
      >
        <el-table-column label="头像" width="80">
          <template #default="scope">
            <el-avatar :src="scope.row.userAvatar" />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="deleteMessage(scope.row.messageId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../../generated/services/Service";
import { MessageByAdminReqDto } from "../../../generated";

interface Message {
  id: number;
  messageId: string;
  topMessageId: string;
  userId: string;
  content: string;
  replyTo: string | null;
  status: string;
  createTime: string;
  updateTime: string;
  replyToUserId: string | null;
  replyToUserName: string | null;
  userAvatar: string;
  delFlag: string;
  userName: string | null;
  roles: string | null;
  replies: any | null;
}

const messages = ref<Message[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const loading = ref(true);

const fetchMessages = async () => {
  loading.value = true;
  try {
    const response = await Service.getAllMessagesByAdmin({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      fetchAll: false,
    });
    if (response.code === "200") {
      messages.value = response.data.list || [];
      total.value = response.data.total;
    }
  } catch (error) {
    ElMessage.error("获取留言失败，请稍后再试。");
  } finally {
    loading.value = false;
  }
};

const getStatusTagType = (status: string) => {
  switch (status) {
    case "0":
      return "info";
    case "1":
      return "success";
    default:
      return "warning";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "0":
      return "已删除";
    case "1":
      return "有效";
    default:
      return "未知状态";
  }
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchMessages();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchMessages();
};

const deleteMessage = async (messageId: string) => {
  try {
    const response = await Service.deleteMessageByAdmin(messageId);
    if (response.code === "A4051") {
      ElMessage.success("留言删除成功！");
      fetchMessages();
    } else {
      ElMessage.error("留言删除失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("留言删除失败，请稍后再试。");
  }
};

onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
.message-manager {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.box-card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.custom-table .el-table__header-wrapper {
  background-color: #f5f7fa;
  color: #333;
  font-weight: 600;
}

.custom-table .el-table__row:hover {
  background-color: #f2f6fc;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
