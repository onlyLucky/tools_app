<template>
  <div class="AppCon">
    <div class="menuApp">
      <div class="menuItem">html5Page</div>
      <div class="menuItem">React15</div>
    </div>
    <div id='container'></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
  .AppCon{
    display: flex;
    width: 100vw;
    height: 100vh;
    .menuApp{
      width: 130px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      padding: 20% 0;
      border-right: 1px solid #ebebeb;
      .menuItem{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
    #container{
      width: calc(100% - 130px);
      height: 100%;
    }
  }
</style>
