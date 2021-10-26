<template>
  <div>
    <Requestor v-if="roles.roles_req" />
    <Supplier v-if="roles.roles_sup" />
    <Operator v-if="roles.roles_ope" />
    <Admin v-if="roles.roles_admin" />
  </div>
</template>

<script lang="ts" setup>
  import Supplier from './Supplier.vue';
  import Requestor from './Requestor.vue';
  import Operator from './Operator.vue';
  import Admin from './Admin.vue';
  import { toRaw } from '@vue/reactivity'
  import { ref } from 'vue';
  import { useUserStoreWidthOut } from '@/store/modules/user';
  const useInfo = useUserStoreWidthOut();
   const roles = ref({
    roles_sup: toRaw(useInfo.getRoles).includes('供应商（管理）'),
    roles_req: toRaw(useInfo.getRoles).includes('需求方（管理）'),
    roles_ope: toRaw(useInfo.getRoles).includes('运营（管理）'),
    roles_admin: toRaw(useInfo.getRoles).includes('管理员')
    });
</script>

<style lang="less" scoped>
</style>
