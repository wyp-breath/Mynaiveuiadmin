<template>
  <div>
    <Requestor v-if="roles_sup.roles_req" />
    <Supplier v-if="roles_sup.roles_sup" />
    <Operator v-if="roles_sup.roles_ope" />
  </div>
</template>

<script lang="ts" setup>
  import Supplier from './Supplier.vue';
  import Requestor from './Requestor.vue';
  import Operator from './Operator.vue';
  import { toRaw } from '@vue/reactivity'
  import { ref } from 'vue';
  import { useUserStoreWidthOut } from '@/store/modules/user';
  const useInfo = useUserStoreWidthOut();
  console.log(toRaw(useInfo.getRoles), toRaw(useInfo.getRoles).includes('供应商（管理）'))
   const roles_sup = ref({
    roles_sup: toRaw(useInfo.getRoles).includes('供应商（管理）'),
    roles_req: toRaw(useInfo.getRoles).includes('需求方（管理）'),
    roles_ope: toRaw(useInfo.getRoles).includes('运营（管理）')
    });
</script>

<style lang="less" scoped>
</style>
