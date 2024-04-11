<template>
  <div class="admin_tool">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  
</script>
<style lang="scss" scoped>
  .admin_tool{
    padding: 12px;
    border-radius: 6px;
    box-sizing: border-box;
    transition: color 0.2s, background-color 0.2s;
    @extend .f-row-c-c;
    cursor: pointer;
    &:hover{
      background-color: #f5f5f5;
    }
  }
</style>