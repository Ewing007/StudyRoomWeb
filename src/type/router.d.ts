// src/types/router.d.ts
import "vue-router";

// 扩展 Vue Router 中的 RouteMeta 接口
declare module "vue-router" {
  interface RouteMeta {
    hidden?: boolean; // 是否隐藏菜单
    requireAuth?: boolean; // 是否需要权限
    roles?: string[]; // 允许访问的角色
    permission?: string[]; // 其他权限定义
  }
}
