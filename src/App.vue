<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="page">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand router-link">Oasis</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="router-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about/2" class="router-link">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/video/2" class="router-link">About2</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled router-link" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
}


.header {
  line-height: 0.5;
  max-height: 100vh;
  gap: 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  background-color: black !important;
  color: white;
  /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.nav-item {
  color: white;
}

</style>
