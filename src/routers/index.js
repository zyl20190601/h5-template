import Home from '@/views/home/index.vue';
import Login from '@/views/login/index.vue';

const baseRouter = [
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/',
    name: '代理商登录',
    component: Login,
    meta: {
      keepAlive: true,
    },
  },
];

export default baseRouter;
