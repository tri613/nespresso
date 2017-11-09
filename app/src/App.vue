<template>
<div id="app">
  <app-header></app-header>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import AppHeader from '#/Header.vue'
export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
.container {
  padding: 1rem;
}
</style>
