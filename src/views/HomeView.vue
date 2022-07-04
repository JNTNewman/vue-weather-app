<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
import { weatherDataStore } from '../stores/weather';

const store = weatherDataStore
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
