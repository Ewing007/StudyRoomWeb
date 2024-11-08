<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>预约记录</span>
      </div>
    </template>
    <el-table :data="reservations" style="width: 100%">
      <el-table-column label="预约日期" width="180">
        <template #default="scope">
          {{ formatDate(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="180">
        <template #default="scope">
          {{ formatTime(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="180">
        <template #default="scope">
          {{ formatTime(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template #default="scope">
          <el-tag :type="scope.row.status === '0' ? 'success' : 'info'">
            {{ scope.row.status === "0" ? "有效" : "已取消" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            v-if="canCancel(scope.row)"
            size="small"
            type="danger"
            @click="handleCancel(scope.row.reservationId)"
          >
            取消预约
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

interface Reservation {
  date: string;
  reservationId: string;
  startTime: string;
  endTime: string;
  status: string;
}

const reservations = ref<Reservation[]>([]);
const total = ref(0);
const pageSize = ref(10);
const pageNum = ref(1);

onMounted(() => {
  fetchReservations();
});

const fetchReservations = async () => {
  try {
    const response = await Service.someMethodToQueryReservation({
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      fetchAll: false,
    });
    if (response.data) {
      reservations.value = response.data.list;
      total.value = response.data.total;
    }
  } catch (error) {
    ElMessage.error("获取预约记录失败");
  }
};

const handlePageChange = (newPage: number) => {
  pageNum.value = newPage;
  fetchReservations();
};

const canCancel = (reservation: Reservation) => {
  const now = new Date().getTime();
  const startTime = new Date(reservation.startTime).getTime();
  const thirtyMinutesBefore = startTime - 30 * 60 * 1000;
  return now < thirtyMinutesBefore && reservation.status === "0";
};

const handleCancel = async (reservationId: string) => {
  try {
    const response = await Service.someMethodToCancelStudyRoom(reservationId);
    if (response.code === "A4032") {
      ElMessage.success("取消预约成功");
      // 立即更新当前页面的数据
      fetchReservations();
    } else {
      ElMessage.error(response.message || "取消预约失败");
    }
  } catch (error) {
    ElMessage.error("取消预约失败");
  }
};

const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
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
</style>
