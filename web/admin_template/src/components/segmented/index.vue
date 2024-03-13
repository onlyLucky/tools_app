<template>
  <div class="segmented">
    <div class="admin_tab" ref="refTab">
      <div class="admin_tab_active_bar"></div>
      <!-- is_active -->
      <div class="admin_tab_item" v-for="(item,index) in items" :key="index">
        <div class="admin_tab_item_label">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits(['update:modelValue','change']);

const refTab = ref<HTMLElement | null>(null);
const itemWidths = ref<number[]>([]);
let currentIndex = ref<number>(0)

const props = defineProps({
  // tab当前数据
  modelValue: Number,
  items: {
    type: Array,
    default: ()=>[
      { label: '密码登录', value: 1 },
      { label: '扫码登录', value: 2 }
    ]
  },
});
onMounted(() => {
  // 组件挂载后，获取 .admin_tab 元素
  const tabDom = refTab.value
  if(tabDom){
    let itemDom = tabDom.querySelectorAll('.admin_tab_item');
    let widths = Array.from(items).map((item) => item.clientWidth);
    itemWidths.value = widths;
  }
  console.log("tabDom=====",tabDom)
});
</script>
<style scoped lang="scss">
  .segmented{
    .admin_tab{
      padding: 3px;
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 4px;
      .admin_tab_item{
        height: 28px;
        line-height: 28px;
        padding: 0 12px;
        font-size: 14px;
        border-radius: 4px;
        color: rgba(0,0,0,0.6);
      }
      .admin_tab_item.is_active{
        color: rgba(0,0,0,0.92);
      }
    }
  }
</style>