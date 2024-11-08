<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">403</div>
      <div class="error-message">抱歉，您没有访问权限！</div>
      <div class="error-info">您可以返回首页，或联系管理员获取访问权限。</div>
      <el-button type="primary" class="return-button" @click="goHome">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 返回首页
const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
/* 页面布局和背景样式 */
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #e4ebf1);
}

/* 中心内容 */
.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #333;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

/* 错误代码样式 */
.error-code {
  font-size: 5rem;
  color: #355a71;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
}

/* 错误图像样式 */
.error-image {
  width: 150px;
  height: auto;
  margin: 20px 0;
}

/* 错误消息 */
.error-message {
  font-size: 1.5rem;
  color: #666;
  margin-top: 20px;
}

.error-info {
  font-size: 1rem;
  color: #999;
  margin-top: 10px;
}

/* 返回按钮 */
.return-button {
  margin-top: 30px;
  font-size: 1rem;
  padding: 10px 20px;
  background: linear-gradient(135deg, #4caf50, #81c784);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
}

.return-button:hover {
  background: linear-gradient(135deg, #43a047, #66bb6a);
  transform: scale(1.05);
}
</style>
