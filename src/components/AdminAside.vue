<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="sidebar" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          background-color="#f8f9fa"
          text-color="#333"
          active-text-color="#409eff"
        >
          <el-menu-item index="1" @click="navigateTo('/userManage')">
            <el-icon><Setting /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="2" @click="navigateTo('/bulletinBoardManage')">
            <el-icon><Setting /></el-icon>
            <span>公告栏管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="navigateTo('/lostFoundManage')">
            <el-icon><Setting /></el-icon>
            <span>失物招领管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="navigateTo('/reservationManage')">
            <el-icon><Setting /></el-icon>
            <span>预约管理</span>
          </el-menu-item>
          <el-menu-item index="5" @click="navigateTo('/roomManage')">
            <el-icon><Setting /></el-icon>
            <span>自习室管理</span>
          </el-menu-item>
          <el-menu-item index="6" @click="navigateTo('/messageWallManage')">
            <el-icon><Setting /></el-icon>
            <span>留言管理</span>
          </el-menu-item>
          <el-menu-item index="7" @click="navigateTo('/permissionManage')">
            <el-icon><Setting /></el-icon>
            <span>权限管理</span>
          </el-menu-item>
          <el-menu-item index="8" @click="navigateTo('/logManage')">
            <el-icon><Setting /></el-icon>
            <span>日志管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();

const isCollapse = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const navigateTo = (path: string) => {
  router.push(path);
};

onMounted(() => {
  // 确保一进入管理员界面时，默认跳转到 userManage
  if (router.currentRoute.value.path === "/admin") {
    navigateTo("/adminDashboard");
  }
});
</script>

<style scoped>
.common-layout {
  height: 100vh;
  display: flex;
}

.sidebar {
  background-color: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  border-radius: 10px; /* 圆角效果，仅顶部和底部 */
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-item,
.el-sub-menu__title {
  padding-left: 20px;
}

.el-container {
  display: flex;
  gap: 20px; /* 调整侧边栏和内容区域的间距 */
}

.main-content {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff; /* 主内容背景色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
