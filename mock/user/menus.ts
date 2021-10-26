import { resultSuccess } from '../_util';

const menusList = [
  {
    path: '/homeStatic',
    name: 'HomeStatic',
    component: 'LAYOUT',
    redirect: '/homeStatic/request',
    meta: {
      icon: 'CheckCircleOutlined',
      title: '首页',
    },
    children: [
      {
        path: 'request',
        name: 'homeStatic-request',
        component: '/homeStatic/request/request',
        meta: {
          title: '首页',
        },
      },
      {
        path: 'homeStatic',
        name: 'homeStatic-suppliers',
        component: '/homeStatic/suppliers/suppliers',
        meta: {
          title: '首页',
        },
      },
      {
        path: 'operator',
        name: 'homeStatic-operator',
        component: '/homeStatic/operator/operator',
        meta: {
          title: '首页',
        },
      },
    ],
  },
];

export default [
  {
    url: '/api/menus',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(menusList);
    },
  },
];
