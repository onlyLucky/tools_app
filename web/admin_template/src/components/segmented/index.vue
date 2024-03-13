<template>
  <div class="segmented">
    <div class="segmentedBox">
      <div class="admin_tab" ref="refTab">
        <div class="admin_tab_active_bar" 
          :style="{
            width: itemWidths[currentIndex]+'px',
            transform: 'translateX('+currentIndex*itemWidths[currentIndex]+'px)'
          }">
        </div>
        <div 
          :class="['admin_tab_item',currentIndex==index ? 'is_active' : '']" 
          v-for="(item,index) in items" 
          :key="index" 
          @click="handleTapItem(index)">
          <div class="admin_tab_item_label">
            {{ item.label }}
          </div>
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
    default: ()=>[]
  },
});

const handleTapItem = (index:number)=>{
  currentIndex.value = index;
  if(index >= 0 && index < props.items.length){
    emit('update:modelValue', props.items[index].value)
    emit('change', props.items[index].value)
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
    .segmentedBox{
      display: inline-block;
      .admin_tab{
        padding: 3px;
        box-sizing: border-box;
        background: #f5f5f5;
        border-radius: 4px;
        display: flex;
        white-space: nowrap;
        position: relative;
        .admin_tab_active_bar{
          position: absolute;
          top: 3px;
          left: 3px;
          background: #fff;
          border-radius: 4px;
          z-index: 1;
          height: 28px;
          padding: 0 12px;
          box-sizing: border-box;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
          transition: width var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier), transform var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
        }
        .admin_tab_item{
          height: 28px;
          line-height: 28px;
          padding: 0 12px;
          font-size: 14px;
          border-radius: 4px;
          color: rgba(0,0,0,0.6);
          cursor: pointer;
          z-index: 2;
          user-select: none;
        }
        .admin_tab_item.is_active{
          color: rgba(0,0,0,0.92);
        }
      }
    }
  }
</style>