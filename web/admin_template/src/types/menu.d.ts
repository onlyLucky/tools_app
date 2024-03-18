import type { RouteMeta } from 'vue-router';

/* 
  菜单路由的类型声明
*/

declare interface MenuItemType {
  alwaysShow?: boolean;
  component: string;
  hidden?: boolean;
  meta: MetaType;
  name: string;
  path: string;
  redirect: string;
  query?: string;
  [string]: any;
}

declare interface MenuItemChildType {
  component: string;
  hidden?: boolean;
  meta: MetaType;
  name: string;
  path: string;
}

declare interface MetaType {
  icon: string;
  link: any;
  noCache: boolean;
  title: string;
  keepAlive?: boolean;
  routePath?: any;
}

/**
 * 菜单元数据
 */
declare interface MenuMeta extends RouteMeta {
  /** 菜单标题 */
  title?: string;
  /** 菜单图标 */
  icon?: EleMenuItemProps['icon'];
  /** 菜单是否隐藏 */
  hide?: boolean;
  /** 选中其它菜单 */
  active?: string;
  /** 是否隐藏页脚 */
  hideFooter?: boolean;
  /** 是否隐藏侧栏 */
  hideSidebar?: boolean;
  /** 是否隐藏双侧栏一级 */
  hideSidebox?: boolean;
  /** 页签是否可关闭 */
  closable?: boolean;
  /** 页签不同参数是否合并 */
  tabUnique?: boolean;
  /** 页签是否缓存 */
  keepAlive?: boolean;
  /** 是否在面包屑中显示 */
  breadcrumb?: boolean;
  /** 菜单组件其它属性 */
  props?: EleMenuItemProps;
  /** 是否需要外层布局 */
  layout?: boolean;
  /** 路由地址 */
  routePath?: string;
  /** 内链地址, 内部属性 */
  iframe?: string;
}

/**
 * 菜单数据
 */
declare interface MenuItem {
  /** 路由名称 */
  name?: string;
  /** 菜单地址 */
  path: string;
  /** 路由组件 */
  component?: string;
  /** 路由重定向 */
  redirect?: string;
  /** 路由元数据 */
  meta?: MenuMeta;
  /** 子路由 */
  children?: Array<MenuItem>;
  /** 临时子路由数据, 内部属性 */
  tempChildren?: Array<MenuItem>;
}

/**
 * 页签数据
 */
declare interface TabItem {
  /** 页签标题 */
  title?: string;
  /** 页签标识 */
  key?: string | undefined;
  /** 路由地址 */
  path?: string;
  /** 路由完整地址 */
  fullPath?: string;
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否是主页 */
  home?: boolean;
  /** 组件名称 */
  components?: string[];
  /** 是否为刷新状态 */
  refresh?: boolean;
  /** 路由元数据 */
  meta?: MenuMeta;
}

/**
 * 面包屑导航数据
 */
declare interface LevelItem {
  /** 标题 */
  title: string;
  /** 地址 */
  path: string;
}

export { MenuItemType, MenuItemChildType, MetaType, MenuMeta, MenuItem, TabItem, LevelItem }