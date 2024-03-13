<template>
  <div class="segmented">
    <div class="admin_tab" ref="refTab">
      <div class="admin_tab_active_bar"></div>
      <!-- is_active -->
      <div class="admin_tab_item" style="width: 100px;" v-for="(item,index) in items" :key="index" @click="handleTapItem(index)">
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
let itemWidths = ref<number[]>([]);
let currentIndex = ref<number>(0)

// 定义一个接口来表示每个 item 的结构
interface Item {
  label: string;
  value: number;
}
const props = defineProps({
  // tab当前数据
  modelValue: Number,
  items: {
    type: Array as ()=>Item[],
    default: ()=>[
      { label: '密码登录', value: 1 },
      { label: '扫码登录', value: 2 }
    ]
  },
});

const handleTapItem = (index:number)=>{
  currentIndex.value = index;
  if(index >= 0 && index < props.items.length){
    emit('update:modelValue', props.items[index].value)
  }
}
onMounted(() => {
  // 组件挂载后，获取 .admin_tab 元素
  const tabDom = refTab.value
  if(tabDom){
    let itemDom = tabDom.querySelectorAll('.admin_tab_item');
    let widths = Array.from(itemDom).map((item) => item.clientWidth);
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
      display: flex;
      white-space: nowrap;
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