import { useUserStore } from '@/store/modules/user';

export function usePermission() {
  const userStore = useUserStore();

  /**
   * 检查权限
   * @param accesses
   */
  function _somePerms(accesses: string[]) {
    return userStore.getPerms.some((item) => {
      const { value }: any = item;
      return accesses.includes(value);
    });
  }

  /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true;
    return _somePerms(accesses);
  }

  /**
   * 是否包含指定的所有权限
   * @param accesses
   */
  function hasEveryPermission(accesses: string[]): boolean {
    const permsList = userStore.getPerms;
    if (Array.isArray(accesses)) {
      return permsList.every((access: any) => accesses.includes(access.value));
    }
    throw new Error(`[hasEveryPermission]: ${accesses} should be a array !`);
  }

  /**
   * 是否包含其中某个权限
   * @param accesses
   * @param accessMap
   */
  function hasSomePermission(accesses: string[]): boolean {
    const permsList = userStore.getPerms;
    if (Array.isArray(accesses)) {
      return permsList.some((access: any) => accesses.includes(access.value));
    }
    throw new Error(`[hasSomePermission]: ${accesses} should be a array !`);
  }

  return { hasPermission, hasEveryPermission, hasSomePermission };
}
