<template>
  <el-timeline>
    <template v-if="loading">
      <!-- 加载时的占位效果 -->
      <el-skeleton v-for="n in 3" :key="n" animated>
        <template #template>
          <el-skeleton-item
            variant="text"
            style="width: 60%"
          ></el-skeleton-item>
          <el-skeleton-item
            variant="paragraph"
            :style="{ height: '60px', margin: '20px 0' }"
          ></el-skeleton-item>
        </template>
      </el-skeleton>
    </template>
    <template v-else>
      <!-- 公告列表 -->
      <el-timeline-item
        v-for="announcement in announcements"
        :key="announcement.id"
        :timestamp="formatDate(announcement.createdTime)"
        :color="announcement.status === '0' ? 'green' : 'red'"
      >
        <el-card class="box-card" shadow="hover">
          <div class="card-header">
            <h3>{{ announcement.title }}</h3>
            <span
              :class="{
                active: announcement.status === '0',
                expired: announcement.status !== '0',
              }"
            >
              {{ announcement.status === "0" ? "有效" : "已过期" }}
            </span>
          </div>
          <p>{{ announcement.content }}</p>
        </el-card>
      </el-timeline-item>
    </template>
  </el-timeline>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../generated";

const announcements = ref([]);
const loading = ref(true); // 加载状态

const fetchAnnouncements = async () => {
  try {
    const response = await Service.getAllAnnouncement();
    console.log("公告栏：", response);
    if (response.code === "200") {
      announcements.value = response.data;
    } else {
      ElMessage.error("获取公告失败");
    }
  } catch (error) {
    ElMessage.error("获取公告失败，请检查网络连接");
  } finally {
    loading.value = false; // 数据加载完成后关闭加载状态
  }
};

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

onMounted(() => {
  fetchAnnouncements();
});
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.box-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.active {
  color: #67c23a;
  font-weight: bold;
  background-color: #e1f3d8;
  padding: 5px 10px;
  border-radius: 5px;
}

.expired {
  color: #f56c6c;
  font-weight: bold;
  background-color: #fde2e2;
  padding: 5px 10px;
  border-radius: 5px;
}

h3 {
  color: #2c3e50;
  font-weight: bold;
}

p {
  color: #606266;
  margin-top: 10px;
}
</style>
