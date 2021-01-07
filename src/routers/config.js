import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import routes from './index';

const router = new Router({
  base: '/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  next();
});

router.afterEach((to, from) => {
});

export default router;
