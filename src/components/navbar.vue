<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

const { user } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

const collapseOnScroll = ref(true),
  drawer = ref(false),
  group = ref(null);

const router = useRouter();

function startSearch(textFieldValue) {
  router.push({
    path: "searchResults",
    query: { words: textFieldValue },
  });
}
</script>

<template>
  <nav>
    <v-app-bar
      app
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      color="darken-1"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-text-field
        placeholder="search"
        v-on:keyup.enter="startSearch($event.target.value)"
      ></v-text-field>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-item-group v-model="group">
          <v-list-item
            prepend-icon="mdi-home"
            title="home"
            to="/"
            v-on:click="drawer = false"
          />
          <v-list-item
            v-if="!user"
            prepend-icon="mdi-account"
            title="login"
            v-on:click="drawer = false"
            to="/authenticate"
          />

          <v-list-item
            v-if="user"
            prepend-icon="mdi-account"
            title="my logged in item"
            v-on:click="drawer = false"
          />
          <v-list-item
            v-if="user"
            prepend-icon="mdi-account"
            title="logout"
            v-on:click="
              drawer = false;
              logout();
            "
          />
        </v-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
