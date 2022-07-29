<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Hub } from "aws-amplify";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { hubSubscribed } = storeToRefs(useAuthStore());

const { authAction, logout, setHubSubscribed } = useAuthStore();

//VV: this following is not working as expected
//if (!hubSubscribed) {
//  console.log("hub status: ", hubSubscribed);

//  setHubSubscribed(true);
Hub.listen("auth", (data) => {
  switch (data.payload.event) {
    case "signIn":
    case "signOut":
      authAction(data.payload.event);
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
//}
</script>

<template>
  <authenticator>
    <template v-slot="{ user }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="logout">Sign Out</button>
    </template>
  </authenticator>
</template>
