import { defineStore } from 'pinia';
import { createStorage } from '@/utils/Storage';
import { store } from '@/store';
import { isArray } from '@/utils/is';
import { ACCESS_TOKEN, CURRENT_USER, IS_LOCKSCREEN } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';

const Storage = createStorage({ storage: localStorage });
import { getUserInfo, login } from '@/api/system/user';
import { storage } from '@/utils/Storage';

export interface IUserState {
  token: string;
  info: Object;
  avatar: string;
  cp_mode: number;
  dept: string;
  dept_id: number;
  id: number;
  parent_depts: any[];
  parent_depts_ids: any[];
  perms: any[];
  roles: any[];
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    perms: [],
    info: { name: '', username: '', phone: '' },
    cp_mode: 0,
    dept: '',
    dept_id: 0,
    id: 0,
    parent_depts: [],
    parent_depts_ids: [],
    avatar: '',
    roles: [],
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getPerms(): any[] {
      return this.perms;
    },
    getCpmode(): number {
      return this.cp_mode;
    },
    getDept(): string {
      return this.dept;
    },
    getDeptid(): number {
      return this.dept_id;
    },
    getId(): number {
      return this.id;
    },
    getParentDept(): any[] {
      return this.parent_depts;
    },
    getParentDeptid(): any[] {
      return this.parent_depts_ids;
    },
    getRoles(): any[] {
      return this.roles;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPerms(perms) {
      this.perms = perms;
    },
    setCpmode(cp_mode) {
      this.cp_mode = cp_mode;
    },
    setDept(dept) {
      this.dept = dept;
    },
    setDeptid(dept_id) {
      this.dept_id = dept_id;
    },
    setId(id) {
      this.id = id;
    },
    setParentDept(parent_depts) {
      this.parent_depts = parent_depts;
    },
    setParentDeptid(parent_depts_ids) {
      this.parent_depts_ids = parent_depts_ids;
    },
    setRoles(roles) {
      this.roles = roles;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // ??????
    async login(userInfo) {
      try {
        const response = await login(userInfo);
        const { result, code } = response;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, result.access, ex);
          storage.set(IS_LOCKSCREEN, false);
          this.setToken(result.access);
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // ??????????????????
    GetInfo() {
      // const that = this;
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const result = res;
            const ex = 7 * 24 * 60 * 60 * 1000;
            if (result.perms && result.perms.length) {
              const permsList = changeKeys(result.perms);
              this.setPerms(permsList);
              storage.set(CURRENT_USER, result, ex);
              this.setUserInfo({
                username: result.username,
                name: result.name,
                phone: result.phone,
              });
              this.setAvatar(result.avatar);
              this.setPerms(result.perms);
              this.setCpmode(result.cp_mode);
              this.setDept(result.dept);
              this.setDeptid(result.dept_id);
              this.setId(result.id);
              this.setParentDept(result.parent_depts);
              this.setParentDeptid(result.parent_depts_ids);
              this.setRoles(result.roles);
              storage.set('ROLES', result.roles);
            } else {
              reject(new Error('getInfo: permsList must be a non-null array !'));
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // ??????
    async logout() {
      this.setPerms([]);
      this.setUserInfo('');
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
function changeKeys(Arrydata: any) {
  var keyMap = {
    name: "label",
    method: "value"
  };
  for (var i = 0; i < Arrydata.length; i++) {
    var obj = Arrydata[i];
    if (obj === 'admin') {
      Arrydata[i] = {
        label: 'admin',
        value: 'admin'
      }
    } else if (isArray(obj)) {
      Arrydata[i] = {
        label: Arrydata[i][0],
        value: Arrydata[i][0]
      }
    } else {
      for (var key in obj) {
        var newKey = keyMap[key];
        if (newKey) {
          obj[newKey] = obj[key];
          delete obj[key];
        }
      }
    }
  }
}

