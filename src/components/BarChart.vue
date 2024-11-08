<template>
  <div class="admin-dashboard">
    <el-card class="chart-card">
      <LineChart />
    </el-card>
    <el-card class="chart-card">
      <BarChart />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.chart-card {
  flex: 1;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
