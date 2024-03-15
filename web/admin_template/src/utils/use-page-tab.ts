import { unref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useThemeStore, TabItemType } from '@/store/modules/theme';
import { HOME_PATH, LAYOUT_PATH, REDIRECT_PATH } from '@/config/setting';

/**
 * 页签操作hook
 */

interface OptionType {
  key: string;
  active: string
}

export const usePageTab = function () {
  const HOME_ROUTE = HOME_PATH || LAYOUT_PATH;
  const { push, replace, currentRoute } = useRouter();
  const themeStore = useThemeStore();

  /**
   * 刷新当前路由
   */
  const reloadPageTab = (option: { fullPath: string } | undefined) => {
    const { path, fullPath, query } = unref(currentRoute);
    if (path.includes(REDIRECT_PATH)) {
      return;
    }
    if (!option) {
      // 刷新当前路由
      if (path.includes(REDIRECT_PATH)) {
        return;
      }
      setPageTab({ fullPath, refresh: true } as TabItemType);
      replace({ path: REDIRECT_PATH + path, query });
    } else {
      // 刷新指定页签
      setPageTab({ fullPath: option.fullPath, refresh: true } as TabItemType);
      replace(REDIRECT_PATH + option.fullPath);
    }
  };

  /**
   * 关闭当前页签
   */
  const finishPageTab = () => {
    const key = getRouteTabKey();
    removePageTab({ key, active: key });
  };

  /**
   * 关闭指定页签
   */
  const removePageTab = (option: OptionType) => {
    themeStore
      .tabRemove(option)
      .then((result: any) => {
        onRemoveDone(result);
      })
      .catch(() => {
        ElMessage.error('当前页签不可关闭');
      });
  };

  /**
   * 关闭左侧页签
   */
  const removeLeftPageTab = (option: { key: string, active: string }) => {
    themeStore
      .tabRemoveLeft(option)
      .then((result) => {
        onRemoveDone(result);
      })
      .catch(() => {
        ElMessage.error('左侧没有可关闭的页签');
      });
  };

  /**
   * 关闭右侧页签
   */
  const removeRightPageTab = (option: { key: string, active: string }) => {
    themeStore
      .tabRemoveRight(option)
      .then((result) => {
        onRemoveDone(result);
      })
      .catch(() => {
        ElMessage.error('右侧没有可关闭的页签');
      });
  };

  /**
   * 关闭其它页签
   */
  const removeOtherPageTab = (option: { key: string, active: string }) => {
    themeStore
      .tabRemoveOther(option)
      .then((result) => {
        onRemoveDone(result);
      })
      .catch(() => {
        ElMessage.error('没有可关闭的页签');
      });
  };

  /**
   * 关闭全部页签
   */
  const removeAllPageTab = (option: { key: string, active: string }) => {
    themeStore
      .tabRemoveAll(option)
      .then((result) => {
        onRemoveDone(result);
      })
      .catch(() => {
        ElMessage.error('没有可关闭的页签');
      });
  };

  /**
   * 页签移除方法完成操作 :{path: string, home: string}| Record<string, never>
   */
  const onRemoveDone = ({ path, home }: any) => {
    if (path) {
      push(path);
    } else if (home) {
      push(HOME_ROUTE);
    }
  };

  /**
   * 更新页签数据
   * @param data 页签数据
   */
  const setPageTabs = (data: TabItemType[]) => {
    themeStore.setTabs(data);
  };

  /**
   * 登录成功后清空页签
   */
  const cleanPageTabs = () => {
    setPageTabs([]);
  };

  /**
   * 添加页签
   * @param data 页签数据
   */
  const addPageTab = (data: TabItemType) => {
    themeStore.tabAdd(data);
  };

  /**
   * 修改页签
   * @param data 页签数据
   */
  const setPageTab = (data: TabItemType) => {
    themeStore.tabSetItem(data);
  };

  /**
   * 修改当前页签标题
   * @param title 标题
   */
  const setPageTabTitle = (title: string) => {
    setPageTab({ key: getRouteTabKey(), title } as TabItemType);
  };

  /**
   * 获取当前路由对应的页签key
   */
  const getRouteTabKey = () => {
    const { path, fullPath, meta } = unref(currentRoute);
    return meta.tabUnique === false ? fullPath : path;
  };

  /**
   * 登录成功后跳转首页
   * @param from 登录前的地址
   */
  const goHomeRoute = (from?: any) => {
    replace(from ? decodeURIComponent(from) : HOME_ROUTE);
  };

  return {
    reloadPageTab,
    finishPageTab,
    removePageTab,
    removeLeftPageTab,
    removeRightPageTab,
    removeOtherPageTab,
    removeAllPageTab,
    setPageTabs,
    cleanPageTabs,
    addPageTab,
    setPageTab,
    setPageTabTitle,
    getRouteTabKey,
    goHomeRoute
  };
};
