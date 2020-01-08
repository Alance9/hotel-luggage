<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {}
};
</script>

<style>

html,body,#app {
  height: 100%;
  font-family: "微软雅黑";
  margin: 0px auto;
}

/* margin: -9px -4px -35px -9px; */ /* 上 右 下 左 */
</style>
