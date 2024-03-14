/**
 * 主题状态管理
 */
import { defineStore } from 'pinia';
import { changeColor } from '@/utils/theme-util.ts';
import { THEME_CACHE_NAME, TAB_KEEP_ALIVE } from '@/config/setting';

/**
 * 默认值
 */

interface DefaultStateType {
  [key: string]: any; // 或者使用具体类型的联合，如 string | number | boolean
}

const DEFAULT_STATE: DefaultStateType = Object.freeze({
  // 页签数据
  tabs: [],
  // 是否折叠侧栏
  collapse: false,
  // 侧栏一级是否紧凑风格
  compact: false,
  // 内容区是否最大化
  maximized: false,
  // 是否需要页签栏
  tabBar: true,
  // 布局类型
  layout: 'side',
  // 侧栏布局类型
  sidebarLayout: 'default',
  // 顶栏风格
  headerStyle: 'light',
  // 侧栏风格
  sidebarStyle: 'dark',
  // 页签风格
  tabStyle: 'simple',
  // 是否固定顶栏
  fixedHeader: false,
  // 是否固定侧栏
  fixedSidebar: true,
  // 是否固定内容区
  fixedBody: true,
  // 内容区是否撑满
  fluid: true,
  // 图标是否置于顶栏
  logoInHeader: false,
  // 侧栏菜单是否彩色图标
  colorfulIcon: false,
  // 侧栏排他展开
  uniqueOpened: true,
  // 固定主页页签
  fixedHome: true,
  // 路由切换动画
  transitionName: 'slide-right',
  // 是否暗黑模式
  darkMode: false,
  // 内容区宽度
  contentWidth: null
});

/**
 * 读取缓存配置
 */
function getCacheSetting() {
  try {
    const value = localStorage.getItem(THEME_CACHE_NAME);
    if (value) {
      const cache = JSON.parse(value);
      if (typeof cache === 'object') {
        return cache;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return {};
}

/**
 * 缓存配置
 */
function cacheSetting(key: string, value: any) {
  const cache = getCacheSetting();
  if (cache[key] !== value) {
    cache[key] = value;
    localStorage.setItem(THEME_CACHE_NAME, JSON.stringify(cache));
  }
}

/**
 * 切换主题
 */
function changeTheme(value: string | undefined, dark: boolean): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      changeColor(value, dark);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

/* 页签栏单个对象类型 */
export interface TabItemType {
  closable: boolean;
  components: string[];
  fullPath: string;
  home: boolean;
  refresh: any;
  key: string;
  meta: {
    hide: boolean;
    icon: string;
    keepAlive: boolean;
    link: null | any;
    iframe?: string;
    noCache: boolean;
    routePath: undefined | any;
    title: string;

  };
  path: string;
  title: string;
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => {
    const state = { ...DEFAULT_STATE };
    // 读取本地缓存
    const cache = getCacheSetting();
    Object.keys(state).forEach((key) => {
      if (typeof cache[key] !== 'undefined') {
        state[key] = cache[key];
      }
    });
    return state;
  },
  getters: {
    // 需要缓存的组件
    keepAliveInclude() {
      if (!TAB_KEEP_ALIVE || !this.tabBar || !this.tabs) {
        return [];
      }
      const components = new Set();
      this.tabs.forEach((t: TabItemType) => {
        if (t.meta?.keepAlive !== false && !t.refresh && t.components) {
          t.components.forEach((c) => {
            if (typeof c === 'string' && c) {
              components.add(c);
            }
          });
        }
      });
      return Array.from(components);
    }
  },
  actions: {
    setTabs(value: TabItemType[]) {
      this.tabs = value;
      //cacheSetting('tabs', value);
    },
    setCollapse(value: boolean) {
      this.collapse = value;
    },
    setCompact(value: boolean) {
      this.compact = value;
    },
    setMaximized(value: boolean) {
      this.maximized = value;
    },
    setTabBar(value: boolean) {
      this.tabBar = value;
      cacheSetting('tabBar', value);
    },
    setLayout(value: string) {
      this.layout = value;
      cacheSetting('layout', value);
    },
    setSidebarLayout(value: string) {
      this.sidebarLayout = value;
      cacheSetting('sidebarLayout', value);
    },
    setHeaderStyle(value: string) {
      this.headerStyle = value;
      cacheSetting('headerStyle', value);
    },
    setSidebarStyle(value: string) {
      this.sidebarStyle = value;
      cacheSetting('sidebarStyle', value);
    },
    setTabStyle(value: string) {
      this.tabStyle = value;
      cacheSetting('tabStyle', value);
    },
    setFixedHeader(value: boolean) {
      this.fixedHeader = value;
      cacheSetting('fixedHeader', value);
    },
    setFixedSidebar(value: boolean) {
      this.fixedSidebar = value;
      cacheSetting('fixedSidebar', value);
    },
    setFixedBody(value: boolean) {
      this.fixedBody = value;
      cacheSetting('fixedBody', value);
    },
    setFluid(value: boolean) {
      this.fluid = value;
      cacheSetting('fluid', value);
    },
    setLogoInHeader(value: boolean) {
      this.logoInHeader = value;
      cacheSetting('logoInHeader', value);
    },
    setColorfulIcon(value: boolean) {
      this.colorfulIcon = value;
      cacheSetting('colorfulIcon', value);
    },
    setUniqueOpened(value: boolean) {
      this.uniqueOpened = value;
      cacheSetting('uniqueOpened', value);
    },
    setFixedHome(value: boolean) {
      this.fixedHome = value;
      cacheSetting('fixedHome', value);
    },
    setTransitionName(value: string) {
      this.transitionName = value;
      cacheSetting('transitionName', value);
    },
    setContentWidth(value: any) {
      this.contentWidth = value;
    },
    /**
     * 切换暗黑模式
     * @param value 是否是暗黑模式
     */
    setDarkMode(value: boolean): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        // void 0 赋一个 “空” 值 类似于undefined
        changeTheme(void 0, value)
          .then(() => {
            this.darkMode = value;
            cacheSetting('darkMode', value);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    /**
     * 恢复主题
     */
    recoverTheme() {
      // 恢复主题色
      if (this.darkMode) {
        changeTheme(void 0, this.darkMode).catch((e) => {
          console.error(e);
        });
      }
    },
    /**
     * 添加页签或更新页签数据
     * @param data 页签数据
     */
    tabAdd(data: TabItemType) {
      const i = this.tabs.findIndex((d: TabItemType) => d.key === data.key);
      if (i === -1) {
        this.setTabs([...this.tabs, data]);
      } else if (data.fullPath !== this.tabs[i].fullPath) {
        const temps = [...this.tabs];
        temps[i] = data;
        this.setTabs(temps);
      }
    },
    /**
     * 关闭页签
     */
    async tabRemove({ key, active }: { key: string, active: string }) {

      const i = this.tabs.findIndex((t: TabItemType) => t.key === key || t.fullPath === key);
      if (i === -1) {
        return {};
      }
      const t = this.tabs[i];
      if (!t.closable || (t.home && this.tabs.length === 1)) {
        return Promise.reject();
      }
      const path = this.tabs[i + (i === 0 ? 1 : -1)]?.fullPath;
      this.setTabs(this.tabs.filter((_d: TabItemType, j: number) => j !== i));
      return t.key === active ? { path, home: !path } : {};
    },
    /**
     * 关闭左侧页签
     */
    async tabRemoveLeft({ key, active }: { key: string, active: string }) {
      let index = -1; // 选中页签的索引
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].key === active) {
          index = i;
        }
        if (this.tabs[i].key === key) {
          if (i === 0) {
            break;
          }
          const temp = this.tabs.filter((d: TabItemType, j: number) => !d.closable && j < i);
          if (temp.length === i) {
            break;
          }
          const path = index === -1 ? void 0 : this.tabs[i].fullPath;
          this.setTabs(temp.concat(this.tabs.slice(i)));
          return { path };
        }
      }
      return Promise.reject();
    },
    /**
     * 关闭右侧页签
     */
    async tabRemoveRight({ key, active }: { key: string, active: string }) {
      let index = -1; // 选中页签的索引
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].key === active) {
          index = i;
        }
        if (this.tabs[i].key === key) {
          if (i === this.tabs.length - 1) {
            break;
          }
          const temp = this.tabs.filter((d: TabItemType, j: number) => !d.closable && j > i);
          if (temp.length === this.tabs.length - i - 1) {
            break;
          }
          const path = index === -1 ? this.tabs[i].fullPath : void 0;
          this.setTabs(this.tabs.slice(0, i + 1).concat(temp));
          return { path };
        }
      }
      return Promise.reject();
    },
    /**
     * 关闭其它页签
     */
    async tabRemoveOther({ key, active }: { key: string, active: string }) {
      let path; // 关闭后跳转的地址
      const temps = this.tabs.filter((d: TabItemType) => {
        if (d.key === key) {
          path = d.fullPath;
        }
        return !d.closable || d.key === key;
      });
      if (temps.length === this.tabs.length) {
        return Promise.reject();
      }
      this.setTabs(temps);
      return key === active ? {} : { path };
    },
    /**
     * 关闭全部页签
     */
    async tabRemoveAll({ active }: { active: string }) {
      if (this.tabs.length === 1 && this.tabs[0].home) {
        return Promise.reject();
      }
      const temps = this.tabs.filter((d: TabItemType) => !d.closable);
      if (temps.length === this.tabs.length) {
        return Promise.reject();
      }
      const t = active ? this.tabs.find((d: TabItemType) => d.key === active) : void 0;
      const jump = t != null && t.closable === true; // 关闭后是否跳转
      if (!temps.length) {
        const h = this.tabs.find((d: TabItemType) => d.home);
        if (!h) {
          this.setTabs([]);
          return { home: true };
        }
        this.setTabs([h]);
        return { home: t?.home ? void 0 : true };
      }
      this.setTabs(temps);
      return { path: jump ? temps[0].fullPath : void 0 };
    },
    /**
     * 修改页签
     * @param data 页签数据
     */
    tabSetItem(data: TabItemType) {
      if (!data.key && !data.fullPath) {
        if (!data.path) {
          return;
        }
        this.tabs.forEach((d: TabItemType) => {
          if (data.path === d.path) {
            this.tabSetItem({ ...data, key: d.key });
          }
        });
        return;
      }
      const k = data.key ? 'key' : 'fullPath';
      const i = this.tabs.findIndex((d: TabItemType) => data[k] === d[k]);
      if (i === -1) {
        return;
      }
      const item = { ...this.tabs[i] };
      if (data.title) {
        item.title = data.title;
      }
      if (typeof data.closable === 'boolean') {
        item.closable = data.closable;
      }
      if (typeof data.refresh === 'boolean') {
        item.refresh = data.refresh;
      }
      if (data.components) {
        item.components = data.components;
      }
      const temps = [...this.tabs];
      temps[i] = item;
      this.setTabs(temps);
    }
  }
});
