<template>
<div id="app">
  <app-header></app-header>
  <router-view class="app-page-wrapper"></router-view>
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
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif;
}

.container {
  padding: 1rem;
}

.app-page-wrapper {
  background-color: #d6bea0;
}
</style>
