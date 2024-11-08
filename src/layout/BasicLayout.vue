<template>
  <div id="common-layout">
    <el-container>
      <el-header class="header">
        <GloableHeader />
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
      <el-footer class="footer">
        <div class="footer-content">
          <p>© 2024 自习室预约系统. All Rights Reserved.</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#common-layout {
  background-color: #ffffff;
}

#common-layout .header {
  margin-bottom: 16px;
}

#common-layout .content {
  margin-bottom: 16px;
}
#common-layout .footer {
  position: fixed; /* 固定位置 */
  bottom: 0; /* 距离底部0 */
  left: 0; /* 左边距 */
  width: 100%; /* 宽度100% */
  background-color: #f1f1f1; /* 背景颜色 */
  text-align: center; /* 文本居中 */
  padding: 10px 0; /* 上下内边距 */
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1); /* 上方阴影 */
}

#common-layout .footer-content {
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 居中 */
}
</style>
<script>
import GloableHeader from "@/components/GloableHeader";
export default {
  components: { GloableHeader },
};
</script>
