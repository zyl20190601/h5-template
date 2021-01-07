import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // userInfo: '', 
  },
  getters: {
    // getUser(state){
    //     return state.userInfo
    // }
  },
  mutations: {
    // setUserInfo(state, data) {
    //   state.userInfo = data;
    // },
  },
});
export default store;
