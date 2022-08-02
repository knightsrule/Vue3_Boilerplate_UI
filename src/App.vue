<script setup>
import { RouterView } from "vue-router";
import navbar from "@/components/navbar.vue";
import footerbar from "@/components/footerbar.vue";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { useAuthStore } from "@/stores/auth";

const { initialize } = useAuthStore();

Amplify.configure(awsconfig);

initialize();
</script>

<template>
  <v-app>
    <navbar app></navbar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>
    <footerbar app></footerbar>
  </v-app>
</template>
