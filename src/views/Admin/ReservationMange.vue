<template>
  <div class="reservation-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>预约管理</span>
        </div>
      </template>
      <el-skeleton :rows="5" :loading="loading" animated>
        <el-table
          :data="reservations"
          style="width: 100%"
          :key="tableKey"
          :fit="true"
          class="custom-table"
        >
          <el-table-column prop="reservationId" label="预约ID" width="100" />
          <el-table-column prop="userId" label="用户ID" width="120" />
          <el-table-column prop="roomId" label="房间ID" width="120" />
          <el-table-column prop="seatId" label="座位ID" width="120" />
          <el-table-column prop="slotId" label="时间段ID" width="120" />
          <el-table-column prop="startTime" label="开始时间" width="160" />
          <el-table-column prop="endTime" label="结束时间" width="160" />
          <el-table-column
            prop="reservationTime"
            label="预约时间"
            width="160"
          />
          <el-table-column prop="date" label="日期" width="160" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)" effect="dark">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="checkInStatus" label="签到状态" width="100">
            <template #default="{ row }">
              <el-tag
                :type="getCheckInStatusTagType(row.checkInStatus)"
                effect="dark"
              >
                {{ getCheckInStatusText(row.checkInStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="paymentStatus" label="支付状态" width="100">
            <template #default="{ row }">
              <el-tag
                :type="getPaymentStatusTagType(row.paymentStatus)"
                effect="dark"
              >
                {{ getPaymentStatusText(row.paymentStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="notes"
            label="备注"
            min-width="150"
            show-overflow-tooltip
          />
          <el-table-column prop="finishTime" label="完成时间" width="160" />
          <el-table-column prop="cancelTime" label="取消时间" width="160" />
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <el-button type="primary" @click="showUpdateDialog(row)"
                >管理预约</el-button
              >
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

    <!-- 更新预约信息对话框 -->
    <el-dialog v-model="dialogVisible" title="更新预约信息" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="待处理" value="0" />
            <el-option label="已接受" value="1" />
            <el-option label="已拒绝" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="删除标志">
          <el-select v-model="form.delFlag" placeholder="请选择删除标志">
            <el-option label="正常" value="0" />
            <el-option label="已删除" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.notes" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpdate">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../../generated/services/Service"; // 假设这是你的服务层

interface Reservation {
  reservationId: string;
  userId: string;
  roomId: string;
  seatId: string;
  slotId: string;
  startTime: string;
  endTime: string;
  reservationTime: string;
  date: string;
  status: string;
  checkInStatus: string;
  paymentStatus: string;
  notes: string | null;
  payTime: string | null;
  finishTime: string | null;
  cancelTime: string | null;
  cancelPayTime: string | null;
  penaltyTime: string | null;
  delFlag: string;
  id: number;
}

const reservations = ref<Reservation[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableKey = ref(0);
const loading = ref(true);
const dialogVisible = ref(false);
const form = ref<Reservation>({
  reservationId: "",
  userId: "",
  roomId: "",
  seatId: "",
  slotId: "",
  startTime: "",
  endTime: "",
  reservationTime: "",
  date: "",
  status: "",
  checkInStatus: "",
  paymentStatus: "",
  notes: "",
  payTime: "",
  finishTime: "",
  cancelTime: "",
  cancelPayTime: "",
  penaltyTime: "",
  delFlag: "",
  id: 0,
});

const fetchReservations = async () => {
  loading.value = true;
  try {
    const response = await Service.someMethodToGetAllReservations({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      fetchAll: false,
    });
    if (response.code === "200") {
      reservations.value = response.data.list || [];
      total.value = response.data.total;
      tableKey.value += 1;
    }
  } catch (error) {
    ElMessage.error("获取预约信息失败，请稍后再试。");
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
    case "2":
      return "success";
    case "3":
      return "danger";
    default:
      return "warning";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "0":
      return "已确认";
    case "1":
      return "已取消";
    case "2":
      return "完成";
    case "3":
      return "违约";
    default:
      return "未知状态";
  }
};

const getCheckInStatusTagType = (status: string) => {
  switch (status) {
    case "0":
      return "info";
    case "1":
      return "success";
    case "2":
      return "warning";
    case "3":
      return "danger";
    default:
      return "warning";
  }
};

const getCheckInStatusText = (status: string) => {
  switch (status) {
    case "0":
      return "已确认";
    case "1":
      return "已取消";
    case "2":
      return "完成";
    case "3":
      return "违约";
    default:
      return "未知状态";
  }
};

const getPaymentStatusTagType = (status: string) => {
  switch (status) {
    case "0":
      return "success";
    case "1":
      return "success";
    case "2":
      return "danger";
    default:
      return "warning";
  }
};

const getPaymentStatusText = (status: string) => {
  switch (status) {
    case "0":
      return "未支付";
    case "1":
      return "已支付";
    case "2":
      return "已退款";
    default:
      return "未知状态";
  }
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchReservations();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchReservations();
};

const showUpdateDialog = (reservation: Reservation) => {
  form.value = { ...reservation };
  dialogVisible.value = true;
};

const submitUpdate = async () => {
  try {
    const notes = form.value.notes ?? undefined;
    const response = await Service.someMethodToUpdateReservation({
      reservationId: form.value.reservationId,
      status: form.value.status,
      notes,
      delFlag: form.value.delFlag,
    });
    if (response.code === "A4048") {
      ElMessage.success("更新预约信息成功");
      fetchReservations();
      dialogVisible.value = false;
    } else {
      ElMessage.error("更新预约信息失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("请求错误，请稍后再试。");
  }
};

onMounted(fetchReservations);
</script>

<style scoped>
.reservation-manager {
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
