import Vue from 'vue';
import App from './App.vue';
import router from './routers/config';
import store from './store';
import './utils/fastClick.js';
// import VConsole from 'vconsole';
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
