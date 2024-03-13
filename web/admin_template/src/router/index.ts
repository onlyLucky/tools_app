/**
 * 路由配置
 */
import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';
import { setPageTitle } from '@/utils/page-title-util';
import { routes } from './routers';

NProgress.configure({
  speed: 200,
  minimum: 0.02,
  trickleSpeed: 200,
  showSpinner: false
});

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: () => {
    return { top: 0 };
  }
});

/**
 * 路由守卫
 */
router.beforeEach(async (to) => {
  NProgress.start();
  setPageTitle(to.meta?.title);
  // token 判断进行拦截处理
  if (false) {
    // 未登录跳转登录界面
    /* if (!WHITE_LIST.includes(to.path)) {
      return {
        path: '/login',
        query: to.path === LAYOUT_PATH ? {} : { from: to.path }
      };
    } */
    return;
  }
  // 注册动态路由
});

router.afterEach(() => {
  if (NProgress.isStarted()) {
    setTimeout(() => {
      NProgress.done(true);
    }, 200);
  }
});

export default router;