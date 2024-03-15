import RedirectLayout from "@/components/RedirectLayout/index.vue";
import Layout from "@/layout/index.vue";
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
 * 解析路由组件
 * @param component 组件名称
 */
function getComponent(component: string) {
  if (component) {
    const module = modules[`/src/views${component}.vue`];
    if (!module) {
      return modules[`/src/views${component}/index.vue`];
    }
    return module;
  }
}
