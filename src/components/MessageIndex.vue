<template>
  <el-card class="page-card">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sidebar" :width="isCollapse ? '64px' : '200px'">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ffffff"
          text-color="#606266"
          active-text-color="#409eff"
        >
          <el-menu-item
            index="1"
            @click="navigateTo('/MessageCenter/ReplyMessage')"
          >
            <el-badge
              :value="unreadReplyMessages"
              :max="9"
              class="item"
              :offset="[10, 10]"
            >
              <img
                src="../assets/回复消息.svg"
                alt="回复消息"
                class="button-icon"
              />
              回复消息
            </el-badge>
          </el-menu-item>
          <el-menu-item
            index="2"
            @click="navigateTo('/MessageCenter/SystemMessage')"
          >
            <el-badge
              :value="unreadSystemMessages"
              :max="9"
              class="item"
              :offset="[10, 10]"
            >
              <img
                src="../assets/系统消息.svg"
                alt="系统消息"
                class="button-icon"
              />
              系统消息
            </el-badge>
          </el-menu-item>
          <el-menu-item
            index="3"
            @click="navigateTo('/MessageCenter/CheckInMessage')"
          >
            <el-badge
              :value="unreadCheckInMessages"
              :max="9"
              class="item"
              :offset="[10, 10]"
            >
              <img
                src="../assets/签到.svg"
                alt="系统消息"
                class="button-icon"
              />
              签到消息
            </el-badge>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容 -->
      <el-main class="main-content">
        <div class="placeholder" v-if="!hasContent">
          <el-empty description="暂无内容"></el-empty>
        </div>
        <router-view v-else></router-view>
      </el-main>
    </el-container>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ChatDotRound, Bell } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const isCollapse = ref(false);
const hasContent = ref(false); // 控制是否有内容展示

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const unreadReplyMessages = computed(
  () => store.state.user.notifications.replyNotifications?.length || undefined
);
const unreadSystemMessages = computed(
  () => store.state.user.notifications.systemNotifications?.length || undefined
);
const unreadCheckInMessages = computed(
  () => store.state.user.notifications.checkInNotifications?.length || undefined
);
const navigateTo = (path: string) => {
  router.push(path);
  hasContent.value = true;
};

onMounted(() => {
  if (router.currentRoute.value.path === "/MessageCenter") {
    navigateTo("/MessageCenter/ReplyMessage");
  } else if (
    router.currentRoute.value.path === "/MessageCenter/SystemMessage"
  ) {
    navigateTo("/MessageCenter/SystemMessage");
  } else if (
    router.currentRoute.value.path === "/MessageCenter/CheckInMessage"
  ) {
    navigateTo("/MessageCenter/CheckInMessage");
  }
});
</script>

<style scoped>
/* 页面整体卡片 */
.page-card {
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  background: linear-gradient(to bottom, #f9fafc, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%; /* 确保页面充满父容器 */
}

/* 容器布局 */
.el-container {
  display: flex;
  gap: 20px; /* 左侧栏和右侧内容栏间距 */
  width: 100%;
  height: 100%; /* 确保容器充满整个页面 */
}

/* 侧边栏 */
.sidebar {
  background: #ffffff;
  border-right: 1px solid #ebeef5;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 12px; /* 添加圆角 */
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.05); /* 增加阴影效果 */
}

.el-menu-vertical-demo {
  padding-top: 20px;
}

.el-menu-item {
  font-size: 15px;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;
}

.el-menu-item:hover {
  background-color: #f2f6fc;
  transform: scale(1.02);
}

.el-menu-item.is-active {
  background-color: #e8f3ff;
  color: #409eff !important;
  border-right: 3px solid #409eff;
}

/* 主内容 */
.main-content {
  flex: 1;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px; /* 保持一定高度，即使内容为空 */
  overflow: hidden;
  position: relative;
}

/* 占位符 */
.placeholder {
  text-align: center;
  width: 100%;
}

.el-empty {
  margin-top: 20px;
}

/* 修改消息卡片的样式 */
.message-card {
  width: 100%; /* 使卡片宽度适应父容器 */
  max-width: 800px; /* 设置最大宽度，防止卡片过宽 */
  margin-bottom: 20px; /* 卡片之间的间距 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background-color: #ffffff;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #606266;
  margin-bottom: 10px;
}

.sender {
  font-weight: bold;
}

.time {
  font-size: 12px;
  color: #909399;
}

.message-content {
  font-size: 16px;
  color: #303133;
  margin-bottom: 15px;
  line-height: 1.5;
}

.el-button {
  margin-top: 10px;
}

.button-icon {
  width: 30px;
  height: 25px;
  padding-bottom: 12px;
}
</style>
