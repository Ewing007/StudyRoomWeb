<template>
  <div id="header">
    <el-row>
      <el-col :span="22">
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          :ellipsis="true"
          @select="handleSelect"
          style="max-width: 100%; display: flex; padding: 0"
          :router="true"
        >
          <el-menu-item>
            <img
              style="width: 100px"
              src="../assets/logo.svg"
              alt="StudyRoom logo"
            />
          </el-menu-item>
          <el-menu-item
            style="padding-right: 50px; padding-left: 50px"
            v-for="route in visibleRouters"
            :key="route.path"
            :index="route.path"
            >{{ route.name }}</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="2" style="align-content: center">
        <div
          style="display: flex; align-items: center; position: relative"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <el-avatar
            size="large"
            :src="store.state.user.loginUser.avatar"
            @mouseenter="showMenu = true"
            @mouseleave="onMouseLeave"
            >{{ loginStatus ? "" : "未登录" }}</el-avatar
          >
          <div
            v-if="showMenu"
            class="menu-popup"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
          >
            <template v-if="!loginStatus">
              <div class="custom-button" @click="openLoginDialog">登录</div>
            </template>
            <template v-else>
              <div class="custom-button" @click="goToProfile(userId)">
                个人中心
              </div>
              <div class="custom-button" @click="logout">退出登录</div>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 登录弹窗 -->
    <el-dialog
      v-model="loginDialogVisible"
      width="400px"
      :before-close="closeLoginDialog"
      class="login-dialog"
    >
      <LoginForm
        v-model="loginDialogVisible"
        @login-success="handleLoginSuccess"
        @register-open="pushRegisterSuccess"
        @register="handleRegister"
      />
    </el-dialog>

    <!-- 注册弹窗 -->
    <el-dialog
      v-model="registerDialogVisible"
      width="400px"
      :before-close="closeLoginDialog"
      class="login-dialog"
    >
      <RegisterForm
        v-model="registerDialogVisible"
        @login-open="pushLoginSuccess"
        @register="handleLogin"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { routes } from "@/router/routes";
import router from "@/router";
import { useStore } from "vuex";
import LoginForm from "../views/UserLogin.vue";
import RegisterForm from "../views/UserRegister.vue";
import { Service } from "../../generated";
import { ElMessage } from "element-plus";
import user from "@/store/user";

const activeIndex = ref(["/"]);
router.afterEach((to) => {
  activeIndex.value = [to.path];
});

const showMenu = ref(false);
const loginDialogVisible = ref(false);
const registerDialogVisible = ref(false);
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleLoginSuccess = () => {
  loginDialogVisible.value = false;
  showMenu.value = false;
};
const handleRegisterSuccess = () => {
  registerDialogVisible.value = false;
  showMenu.value = false;
};
const pushRegisterSuccess = () => {
  loginDialogVisible.value = false;
  registerDialogVisible.value = true;
};

const pushLoginSuccess = () => {
  loginDialogVisible.value = true;
  registerDialogVisible.value = false;
};
const openLoginDialog = () => {
  loginDialogVisible.value = true;
};

const hideMenuTimer = ref<any | null>(null);

const onMouseEnter = () => {
  if (hideMenuTimer.value) {
    clearTimeout(hideMenuTimer.value);
  }
  showMenu.value = true;
};

const onMouseLeave = () => {
  if (hideMenuTimer.value) {
    clearTimeout(hideMenuTimer.value);
  }
  hideMenuTimer.value = setTimeout(() => {
    showMenu.value = false;
  }, 1000); // 延迟 1000 毫秒后隐藏菜单
};

const goToProfile = (userId: string) => {
  console.log("userId:", userId);
  router.push({ name: "UserProfile", params: { id: userId } });
  // router.push("/userProfile");
};

const logout = async () => {
  const resp = await Service.logout();
  if (resp.code === "200") {
    await store.dispatch("user/logout");
    ElMessage.success("退出成功");
    await router.push("/");
  } else {
    ElMessage.error("退出失败");
  }
};

const store = useStore();
const userId = computed(() => store.state.user.loginUser.userId);
const roles = computed(() => store.state.user.loginUser.roles);
const loginStatus = computed(() => store.state.user.loginUser.isLogin);
// 过滤出当前用户可见的路由
const visibleRouters = computed(() => {
  return routes.filter((item) => {
    // 如果当前用户有访问权限
    if (item.meta?.roles?.some((role) => roles.value.includes(role))) {
      // 管理员可见所有路由
      if (roles.value.includes("ADMIN")) {
        return true;
      }
      // 普通用户只能看到 hidden 为 false 的路由
      if (!item.meta?.hidden) {
        return true;
      }
    } else if (!item.meta?.hidden) {
      return true;
    }
    return false;
  });
});

const handleRegister = () => {
  loginDialogVisible.value = false;
};

const handleLogin = () => {
  loginDialogVisible.value = false;
};
</script>

<style scoped>
#header .el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: 90px;
}

#header .el-menu--horizontal.el-menu {
  border-bottom: none;
}
#header {
  box-shadow: #eee 1px 1px 5px;
  border-bottom: 1px solid var(--el-menu-border-color);
}

#header .el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

.menu-popup {
  position: absolute;
  top: 80px;
  right: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 10px 0;
  min-width: 150px;
  z-index: 10;
  background-color: white;
  text-align: center;
}

.menu-popup .el-button {
  width: 100%;
  margin: 5px 0;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-popup .el-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.login-dialog {
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
}

.login-dialog .el-dialog__header {
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
}

.login-dialog .el-dialog__body {
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
  padding: 20px;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  background: none;
}

.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  background: none;
}

.menu-popup {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
}

.custom-button {
  cursor: pointer;
  padding: 8px 16px;
  margin: 5px 0;
  text-align: center;
  color: #333;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.custom-button:hover {
  background-color: #f0f0f0;
  color: #007bff;
  border-color: #e0e0e0;
}
</style>
