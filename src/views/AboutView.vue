<template>
  <div class="about-page">
    <el-card class="about-card">
      <template #header>
        <div class="card-header">
          <h2>关于自习室</h2>
        </div>
      </template>
      <div class="card-content">
        <h3>自习室简介</h3>
        <p>
          我们的自习室为广大学生提供了一个安静、舒适的学习环境。无论是备考、写作业还是自主学习，这里都是您理想的选择。
        </p>
        <h3>设施</h3>
        <ul>
          <li><el-tag type="success">空调</el-tag></li>
          <li><el-tag type="success">高速Wi-Fi</el-tag></li>
          <li><el-tag type="success">充电插座</el-tag></li>
          <li><el-tag type="success">安静的学习环境</el-tag></li>
        </ul>
        <h3>开放时间</h3>
        <p>自习室每日开放时间为 8:00 - 22:00，欢迎各位同学前来学习。</p>
      </div>
      <div class="footer">
        <el-button type="primary" @click="goToReservation">立即预约</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goToReservation = () => {
  router.push({ name: "首页" });
};
</script>

<style scoped>
.about-page {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.about-card {
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.card-header {
  border-bottom: 2px solid #409eff;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  margin-top: 20px;
  color: #409eff;
}

.footer {
  text-align: center;
  padding: 10px 0;
}
</style>
