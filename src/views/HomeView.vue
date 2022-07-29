<script setup>
import { RouterLink } from "vue-router";
import { defineComponent } from "vue";

import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

const { counter } = storeToRefs(useCounterStore());
const { increment } = useCounterStore();
</script>

<template>
  <p>Home page</p>
  <p>Current count: {{ counter }}</p>
  <v-btn @click="increment">Increment</v-btn>
</template>
