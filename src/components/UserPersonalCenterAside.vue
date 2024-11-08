<template>
  <div class="profile-container">
    <el-container>
      <el-aside width="200px" class="sidebar">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="navigateTo('/UserInformation')">
            <i class="el-icon-user"></i>
            <template #title>个人信息</template>
          </el-menu-item>
          <el-menu-item index="2" @click="navigateTo('/UserCheckIn')">
            <i class="el-icon-setting"></i>
            <template #title>我的签到</template>
          </el-menu-item>
          <el-menu-item
            index="3"
            @click="navigateTo('/UserAppointmentRecords')"
          >
            <i class="el-icon-setting"></i>
            <template #title>我的预约记录</template>
          </el-menu-item>
          <el-menu-item index="4" @click="navigateTo('/UserMessageRecords')">
            <i class="el-icon-setting"></i>
            <template #title>我的留言记录</template>
          </el-menu-item>
          <el-menu-item
            index="5"
            @click="navigateTo('/UserAppointmentRecords')"
          >
            <i class="el-icon-setting"></i>
            <template #title>我的失物发布</template>
          </el-menu-item>
          <el-menu-item index="6" @click="navigateTo('/UserSetting')">
            <i class="el-icon-setting"></i>
            <template #title>设置</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

onMounted(() => {
  // 确保一进入管理员界面时，默认跳转到 userManage
  if (router.currentRoute.value.name === "UserProfile") {
    navigateTo("/UserInformation");
  }
});
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  /*background-color: #f5f5f5; !* 统一背景颜色 *!*/
}

.sidebar {
  /*background-color: #f5f5f5;*/
  font-style: oblique;
  font-size: medium;
  min-height: 100vh;
}
</style>
