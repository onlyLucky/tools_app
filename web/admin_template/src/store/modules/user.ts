/**
 * 登录用户状态管理
 */
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // 当前登录用户的信息
    info: null,
  }),
  actions: {
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
  }
});