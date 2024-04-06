import { HOME_PATH, LAYOUT_PATH, REDIRECT_PATH } from '@/config/setting';
import RedirectLayout from "@/components/RedirectLayout/index.vue";
import { eachTree } from "@/utils/common.ts"
import { menuToRoutes } from "@/utils/menu-utils.ts"
import Layout from "@/layout/index.vue";
import type { MenuItem } from "@/types/menu.d.ts"
const modules = import.meta.glob('/src/views/**/index.vue');
/**
 * 静态路由
 */
export const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  // 404
  {
    path: '/:path(.*)*',
    component: () => import('@/views/exception/404/index.vue')
  }
];

/**
 * 根据菜单生成动态路由
 * @param menus 菜单数据
 * @param homePath 主页地址
 */
export function getMenuRoutes(menus: MenuItem[], homePath: string | null | undefined) {
  const child = [
    // 用于刷新的路由
    {
      path: REDIRECT_PATH + '/:path(.*)',
      component: RedirectLayout,
      meta: { hideFooter: true }
    }
  ];
  const routes = [
    {
      path: LAYOUT_PATH,
      component: Layout,
      redirect: HOME_PATH ?? homePath,
      children: child
    }
  ];
  // 路由铺平处理
  eachTree(menuToRoutes(menus, getComponent), (route) => {
    const temp = Object.assign({}, route, { children: void 0 });
    if (route.meta?.layout === false) {
      routes.push(temp); // 不需要外层布局的路由
    } else {
      child.push(temp); // 需要外层布局的路由
    }
  });
  console.log('getMenuRoutes：', routes);
  return routes;
}

/**
 * 解析路由组件
 * @param component 组件名称
 */
function getComponent(component?: string) {
  if (component) {
    const module = modules[`/src/views${component}.vue`];
    if (!module) {
      return modules[`/src/views${component}/index.vue`];
    }
    console.log("getComponent:== ", component, module)
    return module;
  }
}
