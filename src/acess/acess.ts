import { ref } from "vue";

interface ACCESS {
  isLogin?: boolean; //是否登录
  roles?: string[]; // 允许访问的角色
  permission?: string[]; // 其他权限定义
}

const ACCESS = ref<ACCESS>({
  isLogin: false,
  roles: ["admin"],
  permission: [""],
});

export default ACCESS;
