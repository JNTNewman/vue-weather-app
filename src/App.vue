<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/weather">Weather</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 100vw;
  margin: 0;
  padding: 0;
  font-weight: normal;
  background: transparent;
}

header {
  line-height: 1;
  max-height: 100vh;
  margin: 0;
}

a {
  text-decoration: none;
  color: var(--color-platinum);
  transition: 0.4s;
}

/* @media (hover: hover) {
  a:hover {
    color: calc(var(--color-primary));
  }
} */

nav {
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin: 0;
  padding: 0.75rem 0;
  background-color: var(--color-accent-blue);
}

nav a:hover {
  text-decoration: underline;
  color: var(--color-primary);
}

nav a.router-link-exact-active {
  color: var(--color-accent-yellow);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: flex;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}
</style>
