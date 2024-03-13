<template>
  <div class="admin_qr_code">
    <div v-if="qrCodeSvg" v-html="qrCodeSvg"></div>
  </div>
</template>
<script setup lang="ts">
import QRCode from "qrcode"
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  size:{
    type: Number,
    default: 200
  },
  items: {
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
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }
  },
  { immediate: true }
);

const generateQRCode = ()=> {
  QRCode.toDataURL(props.value, (err, dataUrl) => {
    if (err) {
      console.error('Error generating QR code:', err);
      return;
    }
    // 从 data URL 中提取 SVG 部分
    const svgMatch = dataUrl.match(/svg:svg[^`]*/);
    if (svgMatch && svgMatch[0]) {
      qrCodeSvg.value = svgMatch[0];
    } else {
      console.error('Failed to extract SVG from data URL');
    }
  });
}

onMounted(() => {
  // 如果需要，可以在这里执行额外的 DOM 操作，例如添加或移除事件监听器
});
</script>
<style scoped lang="sass">

</style>