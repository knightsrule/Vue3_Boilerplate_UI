<script setup>
import { RouterLink, RouterView } from "vue-router";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import navbar from "@/components/navbar.vue";
import footerbar from "@/components/footerbar.vue";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
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
