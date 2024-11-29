<template>
  <div class="home">
    <!-- 通告区域 -->
    <el-card class="announcement-card">
      <div class="announcement-badge">
        <svg
          class="announcement-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        公告
      </div>
      <div class="announcement-wrapper">
        <template v-if="!announcementsLoading">
          <div
            v-for="(announcement, index) in announcements"
            :key="index"
            class="announcement-item"
            v-show="currentIndex === index"
            :style="{
              animationDuration: `${scrollSpeed(announcement.content)}s`,
            }"
          >
            <strong>{{ announcement.title }}: </strong>
            {{ announcement.content }}
          </div>
        </template>
        <el-skeleton
          v-else
          animated
          :rows="1"
          style="width: 80%; margin: auto"
        />
      </div>
    </el-card>

    <!-- 自习室展示区域 -->
    <el-card class="study-room-card">
      <div class="study-room-header">
        <h2>自习室区域</h2>
      </div>
      <el-row :gutter="20">
        <template v-if="!studyRoomsLoading">
          <el-col
            v-for="room in visibleStudyRooms"
            :key="room.roomId"
            :span="8"
          >
            <el-card class="room-card" @click="goToRoomDetails(room)">
              <img
                :src="room.imageUrl || defaultImageUrl"
                alt="Room Image"
                class="room-image"
              />
              <div class="room-info">
                <h3>{{ room.name }}</h3>
                <p>
                  <strong>状态:</strong>
                  {{ room.currentStatus === "0" ? "开放" : "关闭" }}
                </p>
                <p><strong>描述:</strong> {{ room.description }}</p>
              </div>
            </el-card>
          </el-col>
        </template>
        <template v-else>
          <!-- Skeleton loaders for study rooms -->
          <el-col :span="8" v-for="index in 3" :key="index">
            <el-skeleton animated style="width: 100%">
              <template #template>
                <el-skeleton-item
                  variant="image"
                  style="width: 100%; height: 120px"
                />
                <el-skeleton :rows="3" />
              </template>
            </el-skeleton>
          </el-col>
        </template>
      </el-row>
      <div class="more-study-rooms" v-if="!studyRoomsLoading">
        <hr class="separator-line" />
        <el-button
          class="more-rooms-button"
          type="primary"
          @click="goToMoreStudyRooms"
        >
          更多自习室
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { Service } from "../../generated";

// 公告数据和加载状态
const announcements = ref([]);
const announcementsLoading = ref(true);
const currentIndex = ref(0);
const displayDuration = 180000; // 每条公告展示时长（毫秒）
const pauseDuration = 10000; // 缓冲时间（毫秒）

let intervalId: ReturnType<typeof setInterval> | null = null; // Updated type

// 获取公告数据
const fetchAnnouncements = async () => {
  try {
    const response = await Service.getAllAnnouncement();
    if (response.code === "200") {
      announcements.value = response.data;
    } else {
      ElMessage.error("获取公告失败");
    }
  } catch (error) {
    ElMessage.error("获取公告失败，请检查网络连接");
  } finally {
    announcementsLoading.value = false;
  }
};

// 动态计算滚动速度
const scrollSpeed = (content: string) => {
  const baseSpeed = 10;
  return Math.max((content.length / 10) * baseSpeed, baseSpeed);
};

// 切换当前公告
const startScrolling = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % announcements.value.length;
  }, displayDuration + pauseDuration);
};

// 自习室数据和加载状态
const studyRooms = ref<any>([]);
const studyRoomsLoading = ref(true);
const defaultImageUrl = "";

// 跳转路由id
const goToRoomDetails = (room: any) => {
  router.push({
    name: "RoomDetails",
    params: { id: room.roomId },
    query: { roomInfo: JSON.stringify(room) },
  });
};

// 获取自习室数据
const fetchStudyRooms = async () => {
  try {
    const response = await Service.someMethodToGetAllStudyRooms();
    if (response.code === "200") {
      studyRooms.value = response.data;
    } else {
      ElMessage.error("获取自习室信息失败");
    }
  } catch (error) {
    ElMessage.error("获取自习室信息失败，请检查网络连接");
  } finally {
    studyRoomsLoading.value = false;
  }
};

const visibleStudyRooms = computed(() => studyRooms.value.slice(0, 3));

const router = useRouter();

const goToMoreStudyRooms = () => {
  router.push({ name: "MoreStudyRooms" });
};

onMounted(() => {
  fetchAnnouncements();
  startScrolling();
  fetchStudyRooms();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.home {
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(255, 255, 255, 0.9);
}

.announcement-card {
  width: auto;
  max-height: 30px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
}
.announcement-icon {
  width: 16px;
  height: 16px;
  fill: white; /* 根据需要调整颜色 */
}
.announcement-badge {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background-color: #409eff;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  z-index: 1;
}

.announcement-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: initial;
  position: relative;
  margin-left: 60px; /* 确保公告内容不被徽章遮挡 */
}

.announcement-item {
  font-size: 14px; /* 调整字体大小以适应高度限制 */
  color: #333;
  font-weight: 500;
  text-align: center;
  /*padding: 0 10px;*/
  animation: scroll-text linear infinite;
  transition: all 0.3s ease;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  /*padding-left: 100px;*/
}

.study-room-section {
  padding-top: 20px;
}
.study-room-card {
  padding: 20px;
}
.room-card {
  border-radius: 8px;
  padding: 15px;
  width: 95%; /* 缩小卡片大小 */
  cursor: pointer;
  transition: transform 0.2s ease;
}

.room-card:hover {
  transform: scale(1.02);
}

.study-room-header h2 {
  padding-bottom: 5px;
  border-bottom: 1px solid #dcdfe6;
}

.room-image {
  width: 100%;
  height: 120px; /* 调整图片高度 */
  object-fit: cover;
  border-radius: 8px;
}

.room-info {
  padding: 10px;
}
.more-study-rooms {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 使下划线和按钮对齐 */
  margin-top: 10px;
}

.separator-line {
  width: 80%; /* 缩短分割线宽度 */
  border-top: 1px solid #dcdfe6;
}

.more-rooms-button {
  cursor: pointer;
  background-color: #409eff;
  color: #fff;
  padding: 6px 12px;
}
@keyframes scroll-text {
  0% {
    transform: translateX(calc(100% - 60px));
  }
  100% {
    transform: translateX(calc(-100% + 60px));
  }
}

.el-carousel__arrow--hover {
  color: #666;
  transition: color 0.2s ease;
}

.el-carousel__arrow--hover:hover {
  color: #409eff;
}
</style>
