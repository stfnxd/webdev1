<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <router-link :to="{ path: '/' }">
      <img alt="Vue logo" class="logo" src="@/assets/images/logo-white.png"/>
    </router-link>
  </header>

  <RouterView />

</template>
