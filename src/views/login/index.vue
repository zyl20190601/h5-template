<template>
  <div>
    <div class="login-btn" @click="jump(path)">首页</div>
    <button class="btn-auth" data-scope="scope.mobile" data-timeout="2000">授权-mobile</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {};
  },
  methods: {
    jump(path) {
      this.$router.push({
        path: '/home',
        query,
      });
    },
  },
};
</script>

<style lang="scss">
.login-btn {
  font-size: 24px;
  background-color: red;
  color: aliceblue;
  margin-bottom: 100px;
  text-align: center;
  line-height: 100px;
}
.btn-auth {
  width: 100%;
  font-size: 24px;
  background-color: red;
  line-height: 100px;
  color: aliceblue;
  margin-bottom: 100px;
  text-align: center;
}
</style>
