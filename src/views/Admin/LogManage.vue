<template>
  <div class="log-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>日志管理</span>
        </div>
      </template>
      <el-skeleton :loading="loading" animated>
        <el-table
          :data="logs"
          style="width: 100%"
          :key="tableKey"
          :fit="true"
          class="custom-table"
        >
          <el-table-column prop="id" label="ID" width="70" />

          <el-table-column label="模块" width="120">
            <template #default="{ row }">
              <el-tag type="info">{{ row.title }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="用户ID" width="100">
            <template #default="{ row }">
              <el-tag type="primary">{{ row.userId }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作用户" width="120">
            <template #default="{ row }">
              <el-tag type="primary">{{ row.operationUser }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="内容" min-width="150" show-overflow-tooltip>
            <template #default="{ row }">
              <el-tag type="danger" effect="dark">{{ row.content }}</el-tag>
              <!--              <span>{{ row.content }}</span>-->
            </template>
          </el-table-column>

          <el-table-column
            label="请求URL"
            min-width="150"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag type="warning" effect="plain">{{
                row.requestUrl
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="请求方式" width="100">
            <template #default="{ row }">
              <el-tag :type="getMethodTagType(row.requestMethod)">{{
                row.requestMethod
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="请求参数"
            min-width="150"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span>{{ row.requestParam }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="响应结果"
            min-width="150"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span>{{ row.responseResult }}</span>
            </template>
          </el-table-column>

          <el-table-column label="IP地址" width="120">
            <template #default="{ row }">
              <el-tag type="primary">{{ row.ip }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="IP位置" width="120" show-overflow-tooltip>
            <template #default="{ row }">
              <span>{{ row.ipLocation }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="80">
            <template #default="{ row }">
              <el-tag :type="row.status === 'success' ? 'danger' : 'success'">
                {{ row.status === "success" ? "失败" : "成功" }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="错误信息"
            min-width="150"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span>{{ row.errorMessage || "无" }}</span>
            </template>
          </el-table-column>

          <el-table-column label="耗时 (ms)" width="80">
            <template #default="{ row }">
              <el-tag type="info">{{ row.takeTime }} ms</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作时间" width="150">
            <template #default="{ row }">
              <el-tag type="primary">{{ row.operationTime }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-skeleton>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../../generated/services/Service";

interface Log {
  id: number;
  title: string;
  userId: string;
  operationUser: string;
  content: string;
  requestUrl: string;
  method: string;
  requestMethod: string;
  requestParam: string;
  responseResult: string;
  ip: string;
  ipLocation: string;
  status: string;
  errorMessage: string | null;
  takeTime: number;
  operationTime: string;
}

const logs = ref<Log[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableKey = ref(0);
const loading = ref(true);

const fetchLogs = async () => {
  loading.value = true;
  try {
    const response = await Service.getAllLogs({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      fetchAll: false,
    });
    if (response.code === "200") {
      logs.value = response.data.list || [];
      total.value = response.data.total;
      tableKey.value += 1;
    }
  } catch (error) {
    ElMessage.error("获取日志失败，请稍后再试。");
  } finally {
    loading.value = false;
  }
};

const getMethodTagType = (method: string) => {
  switch (method) {
    case "POST":
      return "success";
    case "GET":
      return "primary";
    case "DELETE":
      return "danger";
    default:
      return "info";
  }
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchLogs();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchLogs();
};

onMounted(() => {
  fetchLogs();
});
</script>

<style scoped>
.log-manager {
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
