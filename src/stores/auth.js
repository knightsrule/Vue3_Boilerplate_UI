import { Auth } from "aws-amplify";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  state: { user: null },
  actions: {
    setUser(user) {
      this.user = user;
    },
    async logout({ commit }) {
      commit("setUser", null);
      return await Auth.signOut();
    },
    async login({ commit }, { username, password }) {
      try {
        await Auth.signIn({
          username,
          password,
        });

        const userInfo = await Auth.currentUserInfo();
        commit("setUser", userInfo);
        return Promise.resolve("Success");
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async confirmSignUp(_, { username, code }) {
      try {
        await Auth.confirmSignUp(username, code);
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async signUp(_, { username, password, email }) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
          },
        });
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject();
      }
    },
    async authAction({ commit }) {
      const userInfo = await Auth.currentUserInfo();
      commit("setUser", userInfo);
    },
  },
  getters: {
    user: (state) => state.user,
    userName: (state) =>
      state.user && state.user.username ? state.user.username : "",
  },
});
