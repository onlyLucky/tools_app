<template>
  <div class="admin_qr_code">
    <div v-if="qrCodeSvg" v-html="qrCodeSvg"></div>
  </div>
</template>
<script setup lang="ts">
import QRCode from "qrcode-svg"
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  size:{
    type: Number,
    default: 200
  },
  padding: {
    type: Number,
    default: 5
  },
  value: String,
  border: {
    type: Boolean,
    default: true
  }
});
let qrCodeSvg = ref("");

watch(
  () => props.value,
  async (newValue) => {
    if (newValue) {
      try {
        // 生成二维码的 SVG 元素
        qrCodeSvg.value = new QRCode({
          content: newValue,
          width: props.size,
          height: props.size,
          padding: props.padding,
        }).svg();
      } catch (error) {
        ElMessage.error('生成二维码错误:'+ error);
      }
    }
  },
  { immediate: true }
);


onMounted(() => {
  // 如果需要，可以在这里执行额外的 DOM 操作，例如添加或移除事件监听器
});
</script>
<style scoped lang="sass">

</style>