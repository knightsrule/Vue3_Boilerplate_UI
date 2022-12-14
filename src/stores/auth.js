import { Auth } from "aws-amplify";
import { defineStore } from "pinia";
import Router from "@/router";
import { Hub } from "aws-amplify";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    hubSubscribed: false,
    userInfo: null,
  }),
  actions: {
    initialize() {
      console.log("setting hub subscribed");

      if (!this.hubSubscribed) {
        this.hubSubscribed = true;
        Hub.listen("auth", (data) => {
          switch (data.payload.event) {
            case "signIn":
            case "signOut":
              this.authAction(data.payload.event);
              break;
            case "signUp":
              console.log("user signed up");
              break;
            case "signIn_failure":
              console.log("user sign in failed");
              break;
            case "configured":
              console.log("the Auth module is configured");
          }
        });
        //        this.authAction("signIn");
        Auth.currentUserInfo().then((userInfo) => {
          this.setUser(userInfo);
        });
      }
    },
    setUser(user) {
      this.userInfo = user;
      console.log("setUser", user);
    },
    async logout() {
      console.log("in logout");
      return await Auth.signOut();
    },
    async login(username, password) {
      try {
        await Auth.signIn({
          username,
          password,
        });

        //        const userInfo = await Auth.currentUserInfo();
        //        this.setUser(userInfo);
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
    async authAction(action) {
      const userInfo = await Auth.currentUserInfo();
      this.setUser(userInfo);

      switch (action) {
        case "signOut":
        case "signIn":
          console.log("pushing router");
          Router.push("/");
        //VV: this is not working this.$router.push("/");
      }
    },
  },
  getters: {
    ifHubSubscribed: (state) => state.hubSubscribed,
    user: (state) => state.userInfo,
    userName: (state) =>
      state.userInfo && state.userInfo.username ? state.userInfo.username : "",
  },
});
