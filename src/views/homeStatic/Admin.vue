<template>
  <div>
    <p class="welcomeText">你好{{ username }}，欢迎光临！</p>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  const { username } = userStore?.info || {};
</script>

<style lang="less" scoped>
  .welcomeText{
    font-size: 30px;
    color: #000;
  }
</style>