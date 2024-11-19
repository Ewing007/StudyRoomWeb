<template>
  <div class="seat-management-page">
    <el-row :gutter="20" class="flex-container">
      <!-- 座位管理部分 -->
      <el-col :span="24" class="flex-item">
        <el-card shadow="hover" class="seat-management-card">
          <div class="seat-management">
            <h1 class="section-title">管理座位</h1>
            <div class="select-container">
              <el-select
                v-model="selectedRoomId"
                placeholder="选择自习室"
                @change="fetchAvailableDates"
                class="room-select"
              >
                <el-option
                  v-for="room in studyRooms"
                  :key="room.roomId"
                  :label="room.name"
                  :value="room.roomId"
                />
              </el-select>
              <el-select
                v-model="selectedDate"
                placeholder="选择日期"
                @change="fetchAvailableSlots"
                class="date-select"
              >
                <el-option
                  v-for="date in availableDates"
                  :key="date"
                  :label="date"
                  :value="date"
                />
              </el-select>
              <el-select
                v-model="selectedTimeSlotForFetch"
                placeholder="选择时间段"
                @change="fetchSeats"
                class="slot-select"
              >
                <el-option
                  v-for="timeSlot in timeSlots"
                  :key="timeSlot"
                  :label="timeSlot"
                  :value="timeSlot"
                />
              </el-select>
            </div>

            <el-divider></el-divider>

            <!-- 座位状态图标说明 -->
            <div class="seat-status-indicators">
              <div class="status-item">
                <img
                  :src="getSeatIcon('0')"
                  alt="可预约图标"
                  class="status-icon"
                />
                可预约
              </div>
              <div class="status-item">
                <img
                  :src="getSeatIcon('1')"
                  alt="已预约图标"
                  class="status-icon"
                />
                已预约
              </div>
              <div class="status-item">
                <img
                  :src="getSeatIcon('2')"
                  alt="不可预约图标"
                  class="status-icon"
                />
                不可预约
              </div>
            </div>

            <el-divider></el-divider>

            <div class="seats-layout" v-if="seats.length > 0">
              <div
                v-for="seat in seats"
                :key="seat.seatId"
                class="seat"
                @click="manageSeat(seat)"
              >
                <img
                  :src="getSeatIcon(seat.status)"
                  alt="座位状态图标"
                  class="seat-icon"
                />
                <span class="seat-number">{{ seat.seatNumber }}</span>
              </div>
            </div>

            <div v-else class="no-seats">
              <p>暂无座位信息</p>
            </div>

            <!-- 占位元素，保持高度一致 -->
            <div class="placeholder" v-if="seats.length === 0"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 座位管理对话框 -->
    <el-dialog
      title="管理座位"
      v-model="seatManagementDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form label-position="top">
        <el-form-item label="座位编号">
          <el-input v-model="selectedSeat.seatNumber" disabled />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="selectedSeat.status" placeholder="选择状态">
            <el-option label="可预约" value="0" />
            <el-option label="已预约" value="1" />
            <el-option label="不可预约" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="confirmManagement">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  ElMessage,
  ElDialog,
  ElSelect,
  ElOption,
  ElButton,
  ElCheckboxGroup,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElDivider,
} from "element-plus";
import { Service } from "../../../generated/services/Service";
import { useRoute } from "vue-router";
import { UpdateSeatByAdminReqDto } from "../../../generated";

interface Seat {
  seatId: string;
  roomId: string;
  seatNumber: string;
  status: string;
  date?: string;
  slotId?: string;
}

interface StudyRoom {
  amenities: string;
  currentStatus: string;
  description: string;
  updateTime: string;
  type: string;
  delFlag: string;
  userId: string;
  roomId: string;
  capacity: number;
  createTime: string;
  imageUrl: string;
  name: string;
  location: string;
  id: number;
  floor: string;
}

const route = useRoute();
const selectedRoomId = ref("");
const selectedDate = ref("");
const selectedTimeSlotForFetch = ref("");
const selectedSeat = ref<Seat>({
  seatId: "",
  roomId: "",
  seatNumber: "",
  status: "0",
});
const seatManagementDialogVisible = ref(false);
const availableDates = ref<string[]>([]);
const timeSlots = ref<string[]>([]);
const seats = ref<Seat[]>([]);
const studyRooms = ref<StudyRoom[]>([]);

const fetchStudyRooms = async () => {
  try {
    const response = await Service.getAllRooms({
      fetchAll: true,
    });
    if (response.code === "200") {
      studyRooms.value = response.data.list;
    }
  } catch (error) {
    ElMessage.error("获取自习室列表失败，请重试");
  }
};

const fetchAvailableDates = async () => {
  if (!selectedRoomId.value) return;
  try {
    const response = await Service.getDateByRoomId(selectedRoomId.value);
    if (response.code === "200") {
      availableDates.value = response.data;
    }
  } catch (error) {
    ElMessage.error("获取可预约日期失败，请重试");
  }
};

const fetchAvailableSlots = async () => {
  if (!selectedDate.value) return;
  try {
    const response = await Service.getTimeSlotsByRoomId(selectedRoomId.value);
    if (response.code === "200") {
      timeSlots.value = response.data;
    }
  } catch (error) {
    ElMessage.error("获取可预约时间段失败，请重试");
  }
};

const fetchSeats = async () => {
  if (!selectedDate.value || !selectedTimeSlotForFetch.value) return;
  try {
    const response = await Service.methodToGetSeatInfoByDateAndTime({
      roomId: selectedRoomId.value,
      date: selectedDate.value,
      slotId: selectedTimeSlotForFetch.value,
    });
    if (response.code === "200") {
      seats.value = response.data;
    }
  } catch (error) {
    ElMessage.error("获取座位信息失败，请重试");
  }
};

const manageSeat = (seat: Seat) => {
  selectedSeat.value = { ...seat };
  seatManagementDialogVisible.value = true;
};

const handleClose = () => {
  seatManagementDialogVisible.value = false;
  selectedSeat.value = {
    seatId: "",
    roomId: "",
    seatNumber: "",
    status: "0",
  };
};

const confirmManagement = async () => {
  try {
    const response = await Service.someMethodToUpdateSeatByAdmin({
      roomId: selectedRoomId.value,
      seatId: selectedSeat.value.seatId,
      date: selectedDate.value,
      slotId: selectedTimeSlotForFetch.value,
      seatStatus: selectedSeat.value.status,
    });

    if (response.code === "A4054") {
      ElMessage.success("更新成功！");
      fetchSeats(); // 更新座位信息
    } else {
      ElMessage.error(response.message);
    }
  } catch (error) {
    ElMessage.error("更新失败，请重试");
  } finally {
    handleClose();
  }
};

// 各个状态对应的图标
const seatIcons = {
  "0": new URL("../../assets/seat-available.png", import.meta.url).href,
  "1": new URL("../../assets/seat-reserved.png", import.meta.url).href,
  "2": new URL("../../assets/seat-unavailable.png", import.meta.url).href,
};

const getSeatIcon = (status: string) =>
  seatIcons[status as keyof typeof seatIcons] || seatIcons["0"];

onMounted(() => {
  fetchStudyRooms();
});
</script>

<style scoped>
.seat-management-page {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.flex-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.seat-management-card {
  width: 100%;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.seat-management {
  padding: 20px;
  flex-grow: 1;
  background-color: #fff;
}

.section-title {
  font-size: 24px;
  margin-bottom: 15px;
}

.select-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.room-select,
.date-select,
.slot-select {
  width: 100%;
  margin-right: 10px;
}

.seat-status-indicators {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  align-items: center;
}

.status-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.seats-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.seat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s;
  cursor: pointer;
}

.seat:hover {
  transform: scale(1.05);
}

.seat-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
}

.seat-number {
  font-size: 14px;
  text-align: center;
}

.no-seats {
  text-align: center;
  color: #888;
}

.placeholder {
  flex-grow: 1;
}
</style>
