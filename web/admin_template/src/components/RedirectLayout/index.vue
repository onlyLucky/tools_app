<!-- 路由刷新页面 -->
<template>
  <div></div>
</template>
<script lang="ts">
export default {
  name: 'RedirectLayout',
};
</script>
<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useThemeStore } from '@/store/modules/theme';
  import type {TabItem} from "@/types/menu.d.ts"

  const { replace } = useRouter();
  const { params, query } = useRoute();
  const themeStore = useThemeStore();
  const { tabs } = storeToRefs(themeStore);

  const from = Array.isArray(params.path) ? params.path.join('/') : params.path;

  setTimeout(() => {
    tabs.value.forEach((t: TabItem) => {
      if (t.refresh) {
        themeStore.tabSetItem({ key: t.key, refresh: false });
      }
    });
    replace({ path: '/' + from, query });
  }, 100);
</script>
