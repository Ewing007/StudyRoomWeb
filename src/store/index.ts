// import { createStore } from "vuex";
// import user from "./user";
// import persistedState from "vuex-persistedstate";
// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {
//     user,
//   },
//   plugins: [
//     persistedState({
//       storage: window.sessionStorage,
//       paths: ["user.loginUser"],
//     }),
//   ],
// });
import { createStore } from "vuex";
import user from "./user";
import persistedState from "vuex-persistedstate";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
  plugins: [
    persistedState({
      storage: window.sessionStorage,
      paths: ["user.loginUser"], // 只持久化 loginUser
    }),
  ],
});

// 页面加载时自动恢复 WebSocket 连接
store.subscribe((mutation, state) => {
  if (mutation.type === "user/setLoginUser" && state.user.loginUser.isLogin) {
    store.dispatch("user/connectWebSocket");
  }
});

export default store;
