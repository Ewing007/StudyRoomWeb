<template>
  <div class="admin-dashboard">
    <!-- 欢迎栏 -->
    <div class="header">
      <h1>欢迎，管理员</h1>
      <h1>今天是 {{ currentDate }}，祝您工作愉快！</h1>
    </div>

    <!-- 数据概览卡片 -->
    <div class="overview-cards">
      <el-card
        class="overview-card"
        v-for="(card, index) in overviewCards"
        :key="index"
      >
        <div class="card-content">
          <el-icon :size="30" :class="card.iconClass" />
          <div class="info">
            <p class="title">{{ card.title }}</p>
            <h2 class="value">{{ card.value }}</h2>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 图表区 -->
    <div class="chart-section">
      <el-card class="chart-card">
        <template #header>用户增长趋势</template>
        <line-chart :data="userGrowthData" />
      </el-card>

      <el-card class="chart-card">
        <template #header>预约统计</template>
        <bar-chart :data="reservationStatsData" />
      </el-card>
    </div>

    <!-- 近期活动 -->
    <el-card class="activity-log">
      <template #header>近期活动</template>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in recentActivities"
          :key="index"
          :timestamp="activity.time"
          placement="bottom"
        >
          <p>{{ activity.description }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

const currentDate = ref(new Date().toLocaleDateString());

const overviewCards = ref([
  { title: "总用户数", value: 5023, iconClass: "el-icon-user-solid" },
  { title: "今日预约", value: 284, iconClass: "el-icon-document-checked" },
  { title: "待处理任务", value: 12, iconClass: "el-icon-tickets" },
  { title: "本月收入", value: "¥28,560", iconClass: "el-icon-money" },
]);

const userGrowthData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  datasets: [
    {
      label: "用户数量",
      data: [300, 400, 500, 700, 900, 1000, 1200, 1500, 2000],
    },
  ],
});

const reservationStatsData = ref({
  labels: ["9月", "10月", "11月", "12月"],
  datasets: [{ label: "预约数量", data: [100, 200, 300, 400] }],
});

const recentActivities = ref([
  { time: "今天 10:15", description: "管理员通过了3条新的预约申请。" },
  { time: "昨天 18:00", description: "系统自动完成了5个过期任务。" },
  { time: "本周一 12:45", description: "新增了10个用户注册。" },
  { time: "本周一 9:30", description: "预约系统更新完成。" },
]);

onMounted(() => {
  ElMessage.success("欢迎来到管理员面板！");
});
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background-color: #f5f7fa;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 26px;
  color: #333;
  font-weight: bold;
}

.header p {
  font-size: 14px;
  color: #666;
}

.overview-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.overview-card {
  flex: 1;
  background: linear-gradient(135deg, #43cea2, #185a9d);
  color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.card-content {
  display: flex;
  align-items: center;
}

.info {
  margin-left: 15px;
}

.info .title {
  font-size: 14px;
}

.info .value {
  font-size: 24px;
  font-weight: bold;
}

.chart-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  flex: 1;
}

.activity-log {
  margin-top: 20px;
}

.timeline-item {
  font-size: 14px;
  color: #666;
}
</style>
