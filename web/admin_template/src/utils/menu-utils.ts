import type { MenuItem } from "@/types/menu.d.ts"
import { defineComponent, computed, unref, h, Component, ref } from "vue";
import { isExternalLink, eachTree } from "./common"

/**
 * 菜单数据转为路由数据
 * @param menus 菜单数据
 * @param getComponent 加载组件的方法
 * @param added 已添加的路由
 */
function menuToRoutes(menus: MenuItem[], getComponent: (component?: string) => void, added?: any): any[] | undefined {
  if (!(menus == null ? void 0 : menus.length)) {
    return;
  }
  const routes: any[] = [];
  const addedRoutes = added ? [...added] : [];
  menus.forEach((item) => {
    const meta = { ...item.meta };
    const path = getRoutePath(meta.routePath || item.path);
    if (path && !isExternalLink(path) && !pathIsAdd(path, addedRoutes)) {
      const name = item.name || camelCase(path);
      const { component, link } = getRouteComponent(item, name, getComponent);
      if (link) {
        meta.iframe = item.component;
        meta.hideFooter = true;
      }
      addedRoutes.push({ path });
      routes.push({
        name,
        path,
        component,
        redirect: item.redirect,
        meta,
        children: menuToRoutes(item.children as MenuItem[], getComponent, addedRoutes)
      });
    }
  });
  return routes;
};

function camelCase(str: string): string {
  const val = str.replace(/[-|/](\w)/g, (_, c) => c ? c.toUpperCase() : "");
  return val.charAt(0).toUpperCase() + val.slice(1);
}
function pathIsAdd(path: string, data: any[]): boolean {
  let isAdd = false;
  eachTree(data, (item) => {
    if (path === item.path) {
      isAdd = true;
      return false;
    }
  });
  return isAdd;
}

function getRoutePath(path: string): string {
  if (!path || !path.includes("?")) {
    return path;
  }
  return path.substring(0, path.indexOf("?"));
}

function getRouteComponent(menu: MenuItem, name: string, func: (component?: string) => void) {

  if (!menu.component || !isExternalLink(menu.component)) {
    return { component: func(menu.component) }
    // return { component: func(menu.component, menu, name) };
  }
  return {
    component: defineComponent({
      name,
      setup() {
        var _a;
        const src = menu.component;
        const isAlive = ((_a = menu.meta) == null ? void 0 : _a.keepAlive) !== false;
        // useLayoutState()
        const layoutProvide = ref({
          keepAlive: true
        });
        const keepAlive = computed(() => {
          var _a2;
          return !!((_a2 = unref(layoutProvide)) == null ? void 0 : _a2.keepAlive);
        });
        return () => {
          if (!isAlive || !keepAlive.value) {
            return h("iframe", { src, class: "admin-iframe" });
          }
          return h("div", { class: "admin-none", style: { display: "none" } });
        };
      }
    }),
    link: true
  };
}

export { menuToRoutes }