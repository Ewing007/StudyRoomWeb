import { createStore } from "vuex";
import user from "./user";
import persistedState from "vuex-persistedstate";
export default createStore({
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
      paths: ["user.loginUser"],
    }),
  ],
});
