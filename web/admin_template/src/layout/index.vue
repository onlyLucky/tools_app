<template>
  <div class="admin_layout">
    <div class="admin_header">
      <div class="admin_header_logo">
        <img src="/src/assets/logo.png" style="width: 42px; height: 42px" />
        <h1 style="font-size: 17px; letter-spacing: 1px">{{ PROJECT_NAME }}</h1>
      </div>
      <div class="admin_header_tools">tools</div>
      <div class="admin_header_breadcrumb"></div>
      <div class="admin_header_menus"></div>
      <div class="admin_header_tools"></div>
    </div>
    <div class="admin_main">
      <div class="admin_main_sidebar">sidebar</div>
      <div class="admin_main_body">
        <div class="admin_body_tabs"></div>
        <div class="admin_body_content">
          <div class="admin_body_iframe"></div>
          <div class="admin_body_page">
            <RouterLayout></RouterLayout>
          </div>
          <div class="admin_body_footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Layout',
};
</script>
<script setup lang="ts">
import { PROJECT_NAME } from '@/config/setting';
import RouterLayout from '@/components/RouterLayout/index.vue';
</script>
<style scoped lang="scss">
.admin_layout{
  @include size(100vw, 100vh);
  background-color: pink;
}
</style>