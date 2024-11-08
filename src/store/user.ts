import { StoreOptions } from "vuex";
import { Service } from "../../generated/services/Service";
import { OpenAPI } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userid: "",
      username: "",
      phone: "",
      email: "",
      avatar: "",
      sex: "",
      creditScore: 0,
      token:
        window.sessionStorage.getItem("token") ||
        (OpenAPI.HEADERS as any).Authorization ||
        "",
      roles: [],
      permission: [],
      isLogin: false,
    },
  }),
  getters: {},
  actions: {
    async updateUser({ commit, state }, payload) {
      commit("setLoginUser", payload);
    },
    async logout({ commit }) {
      commit("clearUserInfo"); // 调用 mutation 清空用户信息
      // 清除 sessionStorage 中的 token
      window.sessionStorage.removeItem("vuex");
      window.sessionStorage.removeItem("token");
      (OpenAPI.HEADERS as any).Authorization = null;
    },
    async updateAvatar({ state, commit }, payload: { avatar: string }) {
      commit("setAvatar", { avatar: `${payload.avatar}` });
    },
    async setToken({ state, commit }, payload) {
      commit("setToken", payload);
    },
  },
  mutations: {
    clearUserInfo(state) {
      state.loginUser = {
        userid: "",
        username: "",
        phone: "",
        email: "",
        avatar: "",
        sex: "",
        creditScore: 0,
        token: "",
        roles: [],
        permission: [],
        isLogin: false,
      };
    },
    setLoginUser(state, payload) {
      state.loginUser = payload;
    },
    setAvatar(state, payload: { avatar: string }) {
      state.loginUser.avatar = payload.avatar;
    },
    setToken(state, payload) {
      state.loginUser.token = payload;
      window.sessionStorage.setItem("token", payload);
    },
  },
} as StoreOptions<any>;
