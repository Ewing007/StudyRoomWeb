import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: HomeView,
  },
  {
    path: "/BulletinBoard",
    name: "公告栏",
    component: () => import("../views/BulletinBoard.vue"),
    meta: {
      requireAuth: true,
      roles: ["ADMIN", "STUDENT"], // 仅允许 "admin" 角色访问
    },
  },
  {
    path: "/LostFound",
    name: "失物招领",
    component: () => import("../views/LostFound.vue"),
    meta: {
      requireAuth: true,
      roles: ["ADMIN", "STUDENT"], // 仅允许 "admin" 角色访问
    },
  },
  {
    path: "/MessageWall",
    name: "留言墙",
    component: () => {
      return import("../views/MessageWall.vue");
    },
    meta: {
      requireAuth: true,
      roles: ["ADMIN", "STUDENT"], // 仅允许 "admin" 角色访问
    },
  },
  {
    path: "/about",
    name: "关于",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("../views/UserLogin.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/NoAuth",
    name: "没有权限",
    component: () => import("../views/NoAuth.vue"),
    meta: {
      hidden: true,
    },
  },
  // {
  //   path: "/test",
  //   name: "测试",
  //   component: () => import("../views/TestView.vue"),
  // },
  {
    path: "/admin",
    name: "管理员",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/AdminView.vue"),
    meta: {
      hidden: true,
      requireAuth: true,
      roles: ["ADMIN"], // 仅允许 "admin" 角色访问
    },
    children: [
      {
        path: "/userManage",
        name: "用户管理",
        component: () => import("../views/Admin/UserManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/permissionManage",
        name: "权限管理",
        component: () => import("../views/Admin/PermissionManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/reservationManage",
        name: "预约管理",
        component: () => import("../views/Admin/ReservationMange.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/bulletinBoardManage",
        name: "公告管理",
        component: () => import("../views/Admin/BulletinBoardManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/messageWallManage",
        name: "留言管理",
        component: () => import("../views/Admin/MessageWallManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/roomManage",
        name: "自习室管理",
        component: () => import("../views/Admin/RoomManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/lostFoundManage",
        name: "失物招领管理",
        component: () => import("../views/Admin/LostFoundManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/logManage",
        name: "日志管理",
        component: () => import("../views/Admin/LogManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
      {
        path: "/adminDashboard",
        name: "管理员首页",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/AdminDashboard.vue"
          ),
        meta: {
          hidden: true,
        },
      },
      {
        path: "/seatManage",
        name: "座位管理",
        component: () => import("../views/Admin/SeatManage.vue"),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN"], // 仅允许 "admin" 角色访问
        },
      },
    ],
  },
  {
    path: "/register",
    name: "用户注册",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/UserRegister.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/room/:id",
    name: "RoomDetails",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/RoomDetails.vue"),
    props: true, // 使用 props 将参数传入组件
    meta: {
      hidden: true,
      requireAuth: true,
      roles: ["STUDENT"],
    },
  },
  {
    path: "/StudyRooms",
    name: "MoreStudyRooms",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/MoreStudyRooms.vue"),
    props: true, // 使用 props 将参数传入组件
    meta: {
      hidden: true,
      requireAuth: true,
      roles: ["STUDENT"],
    },
  },
  {
    path: "/UserProfile/:id",
    name: "UserProfile",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/UserProfile.vue"),
    props: true, // 使用 props 将参数传入组件
    meta: {
      hidden: true,
      requireAuth: true,
      roles: ["STUDENT"],
    },
    children: [
      {
        path: "/UserCheckIn",
        name: "用户签到",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/PersonalCenter/UserCheckIn.vue"
          ),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN", "STUDENT"], // 仅允许 "student" 角色访问
        },
      },
      {
        path: "/UserInformation",
        name: "用户信息",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/PersonalCenter/UserInformation.vue"
          ),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN", "STUDENT"], // 仅允许 "student" 角色访问
        },
      },
      {
        path: "/UserLostFound",
        name: "用户失物发布记录",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/PersonalCenter/UserLostFound.vue"
          ),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN", "STUDENT"], // 仅允许 "student" 角色访问
        },
      },
      {
        path: "/UserMessageRecords",
        name: "用户留言记录",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/PersonalCenter/UserMessageRecords.vue"
          ),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN", "STUDENT"], // 仅允许 "student" 角色访问
        },
      },
      {
        path: "/UserAppointmentRecords",
        name: "用户预约记录",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/PersonalCenter/UserAppointmentRecords.vue"
          ),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN", "STUDENT"], // 仅允许 "student" 角色访问
        },
      },
      {
        path: "/UserSetting",
        name: "用户设置",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/PersonalCenter/UserSetting.vue"
          ),
        meta: {
          hidden: true,
          requireAuth: true,
          roles: ["ADMIN", "STUDENT"], // 仅允许 "student" 角色访问
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
