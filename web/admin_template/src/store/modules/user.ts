/**
 * 登录用户状态管理
 */
import { defineStore } from 'pinia';
import { MenuData } from "@/mock/menu.ts"
import { mapTree, isExternalLink } from "@/utils/common"
import type { MenuItemType } from "@/types/menu.d.ts"
import { API_BASE_URL } from '@/config/setting';

interface UserStoreType {
  info: any;
  menus: any;
  authorities: string[];
  roles: any[];
  dicts: any
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // 当前登录用户的信息
    info: null,
    // 当前登录用户的菜单
    menus: null,
    // 当前登录用户的权限
    authorities: [],
    // 当前登录用户的角色
    roles: [],
    // 字典数据缓存
    dicts: {}
  } as UserStoreType),
  actions: {
    /**
     * 请求登录用户的个人信息/权限/角色/菜单
     */
    async fetchUserInfo() {
      // 接口调用
      const result = {
        user: {},
        permissions: ["*:*:*"],
        roles: []
      }
      // 用户信息
      this.setInfo(result.user);
      // 用户权限
      this.authorities = result.permissions;
      // 用户角色
      this.roles = result.roles;
      // 获取用户菜单接口调用（权限路由）
      const userMenu = MenuData.data
      if (!userMenu) {
        return {};
      }
      const { menus, homePath } = formatMenus(userMenu as unknown as MenuItemType[]);
      console.log("formatMenus:", menus, homePath)
      this.setMenus(menus);
      return { menus, homePath };
    },
    /**
     * 更新用户信息
     */
    setInfo(data: any) {
      if (data) {
        if (!data.avatar) {
          data.avatar = 'https://cdn.eleadmin.com/20200610/avatar.jpg';
        }
      }
      this.info = data || {};
    },
    /**
     * 更新菜单数据
     */
    setMenus(value: any[]) {
      this.menus = value;
    },
  }
});

/**
 * 菜单数据处理为EleProLayout所需要的格式
 * @param data 菜单数据
 * @param childField 子级的字段名称
 */
function formatMenus(data: MenuItemType[], childField: string = 'children'): { menus: any[], homePath: string | null | undefined, homeTitle?: string } {
  let homePath: string | null | undefined;
  let homeTitle;
  const menus = mapTree<MenuItemType, any>(
    data,
    (item, _index, parent) => {
      const meta = item.meta;
      const { path, rPath } = formatPath(item.path, parent?.path, item.query as string);
      const menu = {
        path: path,
        component: formatComponent(item.component),
        meta: {
          hide: !!item.hidden,
          keepAlive: !meta.noCache,
          routePath: rPath,
          ...meta
        },
        redirect: null
      };
      const children = (item as unknown as { [key: string]: any })[childField]?.filter?.(
        (d: any) => !(d.meta?.hide ?? d.hide)
      );
      if (!children?.length) {
        if (!homePath && menu.path && !isExternalLink(menu.path)) {
          homePath = menu.path;
          homeTitle = menu.meta?.title;
        }
      } else {
        const childPath = children[0].path;
        if (childPath) {
          if (!menu.redirect) {
            menu.redirect = childPath;
          }
          if (!menu.path) {
            menu.path = childPath.substring(0, childPath.lastIndexOf('/'));
          }
        }
      }
      if (!menu.path) {
        console.error('菜单path不能为空且要唯一:', item);
        return;
      }
      return menu;
    },
    childField
  );
  return { menus, homePath, homeTitle };
}

/**
 * 组件路径处理以兼容若依默认数据
 * @param component 组件路径
 */
function formatComponent(component: string): string {
  if (!component || isExternalLink(component)) {
    return component;
  }
  // 修改内链格式
  if ('tool/swagger/index' === component) {
    return `${API_BASE_URL}/swagger-ui/index.html`;
  }
  if ('monitor/druid/index' === component) {
    return `${API_BASE_URL}/druid/login.html`;
  }
  if ('tool/build/index' === component) {
    return 'https://yupk.github.io/vue3-code-generator/';
  }
  return component.startsWith('/') ? component : `/${component}`;
}

/**
 * 菜单地址处理以兼容若依
 * @param mPath 菜单地址
 * @param pPath 父级菜单地址
 * @param query 路由参数
 */
function formatPath(mPath: string, pPath: string, query: string) {
  if (!mPath || isExternalLink(mPath)) {
    return { path: mPath };
  }
  const path = !pPath || mPath.startsWith('/') ? mPath : `${pPath}/${mPath}`;
  if (query) {
    try {
      const params = new URLSearchParams(JSON.parse(query)).toString();
      if (params) {
        return { path: `${path}?${params}`, rPath: path };
      }
    } catch (e) {
      console.error(e);
    }
  }
  return { path };
}