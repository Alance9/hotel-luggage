import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { count: 1 }, // 存放状态 （共享属性）
  mutations: {
    increment(state, n) {
      state.count += n;
    }
  }, // 更改状态值
  actions: {
    add1(context, n) {
      context.commit("increment", n);
    }
  }, // 触发mutations里面的方法
  modules: {},
  getters: {
    desc(state) {
      if (state.count < 50) {
        return "一米八";
      } else if (state.count < 100) {
        return "大帅比周某";
      }
    }
  } // 派生属性
});
