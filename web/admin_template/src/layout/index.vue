<template>
  <div class="admin_layout">
    <div class="admin_header">
      <div class="admin_header_logo">
        <img src="/src/assets/logo.png" />
        <h1>{{ PROJECT_NAME }}</h1>
      </div>
      <div class="admin_header_opt">
        <div class="admin_header_tools">
          <HeaderTool>
            <svg-icon icon="test" size="14px"></svg-icon>
          </HeaderTool>
          <!-- <svg-icon icon="https://media.flaticon.com/dist/min/img/collection-empty.svg"></svg-icon> -->
        </div>
        <div class="admin_header_breadcrumb"></div>
        <div class="admin_header_menus"></div>
        <div class="admin_header_tools"></div>
      </div>
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
import HeaderTool from '@/components/common/HeaderTool.vue';
</script>
<style scoped lang="scss">
.admin_layout{
  @include size(100vw, 100vh);
  background: var(--el-bg-color-page);
  .admin_header{
    @include size(100%, $headerHeight);
    @extend .f-row-c-c;
    .admin_header_logo{
      @include size($sideBarWidth, 100%);
      @extend .f-row-c-c;
      background: $darkBg;
      img{
        @include size(42px, 42px);
        margin-right: 10px;
      }
      h1{
        font-size: 17px;
        letter-spacing: 1px;
        color: #fff;
        font-weight: 500;
      }
    }
    .admin_header_opt{
      @include size(calc(100% - #{$sideBarWidth}), 100%);
      background: #fff;
      border-bottom: 1px solid #f0f0f0;
      @extend .f;
      .admin_header_tools{
        flex-shrink: 0;
        padding: 0 12px;
        box-sizing: border-box;
        @extend .f-row-c-c;
      }
    }
  }
  .admin_main{
    @include size(100%, calc(100% - #{$headerHeight}));
  }
}
</style>