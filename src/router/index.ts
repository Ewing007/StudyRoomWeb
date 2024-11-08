import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { routes } from "@/router/routes";
import { useStore } from "vuex";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 添加路由前置守卫
router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLogin = store.state.user.loginUser.isLogin;
  const roles = store.state.user.loginUser.roles;

  // 判断该路由是否需要登录权限
  console.log("用户权限：", roles);
  if (to.meta.requireAuth) {
    // 如果需要，则校验用户是否已经登录
    if (isLogin) {
      // 判断当前用户是否有访问该路由的权限
      console.log("页面权限:", to.meta.roles);
      if (
        Array.isArray(to.meta.roles) &&
        to.meta.roles.some((role) => roles.includes(role))
      ) {
        next(); // 用户有访问权限，直接进入页面
      } else {
        ElMessage.error("用户未授权");
        next("/NoAuth"); // 跳转到其他页面
      }
    } else {
      // 如果用户未登录，提示用户选择
      ElMessageBox.confirm("您需要登录才能访问该页面，是否立即登录？", {
        confirmButtonText: "登录",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          next("/login");
        })
        .catch(() => {
          next(false); // 用户选择取消，允许继续浏览其他页面
        });
    }
  } else {
    next(); // 如果不需要登录权限，直接进入页面
  }
});

export default router;
