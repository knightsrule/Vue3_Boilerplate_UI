<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { useAuthStore } from "@/stores/auth";

const { logout } = useAuthStore();
</script>

<template>
  <authenticator>
    <template v-slot="{ user }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="logout">Sign Out</button>
    </template>
  </authenticator>
</template>
