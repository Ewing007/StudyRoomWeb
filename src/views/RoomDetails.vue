<template>
  <div class="room-details-page">
    <el-row :gutter="20" class="flex-container">
      <!-- 自习室详情信息部分 -->
      <el-col :span="8" class="flex-item">
        <el-card shadow="hover" class="room-info-card">
          <div class="room-info">
            <img
              :src="roomInfo?.imageUrl"
              alt="自习室图片"
              class="room-image"
            />
            <div class="info-item">
              <strong>位置:</strong>
              <el-tag type="primary" effect="dark">{{
                roomInfo?.location
              }}</el-tag>
            </div>
            <div class="info-item">
              <strong>容纳人数:</strong>
              <el-tag type="primary" class="capacity-badge" effect="dark">
                {{ roomInfo?.capacity }}
              </el-tag>
            </div>
            <div class="info-item">
              <strong>设施:</strong>
              <el-tag
                v-for="amenity in roomInfo?.amenities?.split(',')"
                :key="amenity"
                type="success"
                effect="dark"
                class="amenity-tag"
              >
                {{ amenity.trim() }}
              </el-tag>
            </div>
            <div class="info-item">
              <strong>描述:</strong>
              <el-tag type="danger" effect="dark">
                {{ roomInfo?.description }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 座位选择部分 -->
      <el-col :span="16" class="flex-item">
        <el-card shadow="hover" class="seat-selection-card">
          <div class="seat-selection">
            <h1 class="section-title">查看座位空闲状态</h1>
            <div class="select-container">
              <el-select
                v-model="selectedDate"
                placeholder="选择预约日期"
                @change="fetchTimeSlots"
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
                placeholder="选择预约时间段"
                @change="fetchSeats"
                class="time-select"
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

            <div class="seats-layout" v-if="filteredSeats.length > 0">
              <div
                v-for="seat in filteredSeats"
                :key="seat.seatId"
                class="seat"
                @click="bookSeat(seat)"
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
              <p>暂无可用座位</p>
            </div>

            <!-- 占位元素，保持高度一致 -->
            <div class="placeholder" v-if="filteredSeats.length === 0"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 预约时间选择对话框 -->
    <el-dialog
      title="选择预约时间"
      v-model="timeSelectionDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="top">
        <el-form-item label="选择预约时间段">
          <el-checkbox-group v-model="selectedTimeSlotsForBooking">
            <el-checkbox
              v-for="timeSlot in timeSlots"
              :key="timeSlot"
              :label="timeSlot"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="confirmBooking">确 定</el-button>
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
import { Service } from "../../generated/services/Service";
import { useRoute } from "vue-router";
import { BookRoomReqDto } from "../../generated";

interface Seat {
  seatId: string;
  roomId: string;
  seatNumber: string;
  status: string;
  date?: string;
  slotId?: string;
}

const route = useRoute();
const roomId = ref(route.params.id as string);
const roomInfo = ref();
const selectedDate = ref("");
const selectedTimeSlotForFetch = ref("");
const selectedTimeSlotsForBooking = ref<string[]>([]);
const timeSelectionDialogVisible = ref(false);
const seatToBook = ref<Seat | null>(null);
const availableDates = ref<string[]>([]);
const timeSlots = ref<string[]>([]);
const seats = ref<Seat[]>([]);

const fetchAvailableDates = async () => {
  try {
    const response = await Service.getDateByRoomId(roomId.value);
    if (response.code === "200") {
      availableDates.value = response.data;
    }
  } catch (error) {
    ElMessage.error("获取可预约日期失败，请重试");
  }
};

const fetchTimeSlots = async () => {
  if (!selectedDate.value) return;
  try {
    const response = await Service.getTimeSlotsByRoomId(roomId.value);
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
      roomId: roomId.value,
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

const filteredSeats = computed(() =>
  seats.value.filter((seat) => seat.status !== "2")
);

const bookSeat = (seat: Seat) => {
  if (seat.status === "1" || seat.status === "2") {
    ElMessage.warning("该座位已被预约或不可选");
    return;
  }

  // 检查用户在选定的时间段内是否已经预约了其他座位
  const isAlreadyBooked = seats.value.some(
    (reservedSeat) =>
      reservedSeat.roomId === roomId.value &&
      selectedTimeSlotsForBooking.value.includes(reservedSeat.slotId!) &&
      reservedSeat.status === "1"
  );

  if (isAlreadyBooked) {
    ElMessage.warning("您在该时间段内已预约了一个座位，不能重复预约");
    return;
  }

  seatToBook.value = seat;
  timeSelectionDialogVisible.value = true;
};

const handleClose = () => {
  timeSelectionDialogVisible.value = false;
  selectedTimeSlotsForBooking.value = [];
  seatToBook.value = null;
};

const confirmBooking = async () => {
  if (!seatToBook.value || !selectedTimeSlotsForBooking.value.length) {
    ElMessage.warning("请选择座位和时间段");
    return;
  }

  try {
    const response = await Service.someMethodToBookStudyRoom({
      roomId: roomId.value,
      seatId: seatToBook.value.seatId,
      date: selectedDate.value,
      time: selectedTimeSlotsForBooking.value,
    } as BookRoomReqDto);

    if (response.code === "A4014") {
      seatToBook.value.status = "1"; // 假设预约成功后状态变为 "1"
      ElMessage.success("预约成功！");
      fetchSeats(); // 更新座位信息
    } else {
      ElMessage.error("预约失败，请重试");
    }
  } catch (error) {
    ElMessage.error("预约失败，请重试");
  } finally {
    timeSelectionDialogVisible.value = false;
    selectedTimeSlotsForBooking.value = [];
    seatToBook.value = null;
  }
};

// 各个状态对应的图标
const seatIcons = {
  "0": new URL("../assets/seat-available.png", import.meta.url).href,
  "1": new URL("../assets/seat-reserved.png", import.meta.url).href,
  "2": new URL("../assets/seat-unavailable.png", import.meta.url).href,
};

const getSeatIcon = (status: string) =>
  seatIcons[status as keyof typeof seatIcons] || seatIcons["0"];

// 监听路由变化以获取新的自习室信息
watch(
  route,
  (newRoute) => {
    roomId.value = newRoute.params.id as string;
    const roomInfoString = newRoute.query.roomInfo as string;
    if (roomInfoString) {
      roomInfo.value = JSON.parse(roomInfoString);
    }
    fetchAvailableDates();
  },
  { immediate: true }
);

onMounted(() => {
  fetchAvailableDates();
});
</script>

<style scoped>
.room-details-page {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flex-item {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.room-info-card,
.seat-selection-card {
  width: 100%;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.room-info,
.seat-selection {
  padding: 20px;
  flex-grow: 1;
  background-color: #fff;
}

.room-name {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

.room-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
}

.capacity-badge {
  margin-left: 5px;
}

.amenity-tag {
  margin-right: 5px;
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

.date-select,
.time-select {
  width: 45%;
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
