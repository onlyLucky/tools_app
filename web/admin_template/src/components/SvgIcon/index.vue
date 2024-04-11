<template>
  <div v-if="isOnlineSvg"
    :style="{ 
      '--svg-icon-url': `url(${icon})`,
      'width': size, 
      'height': size,
      'backgroundColor': color 
    }"
    class="admin_svg_icon admin_svg_icon_online"
    :class="className"/>
  <svg v-else
    class="admin_svg_icon"
    :class="className"
    :style="{'width': size, 'height': size}"
    aria-hidden="true">
    <use :xlink:href="iconName" :fill="color"/>
  </svg>
</template>
<script lang="ts">
export default {
  name: 'SvgIcon',
};
</script>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  // SVG 图标名称或在线URL
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
  color:{
    type: String,
    default: ''
  },
  size:{
    type: String,
    default: '16px'
  }
})
// 判断在线图标
const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon))
const iconName = computed(() => `#icon-${props.icon}`);
</script>
<style lang="scss" scoped>
  .admin_svg_icon {
    @include size(1em,1em);
    fill: currentColor;
    overflow: hidden;
  }
  .admin_svg_icon_online{
    background-color: currentColor;
    mask-image: var(--svg-icon-url);
    -webkit-mask-image: var(--svg-icon-url);
    mask-size: cover;
    -webkit-mask-size: cover;
    display: inline-block;
  }
</style>