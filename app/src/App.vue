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
$app-header-height: 48px;

body {
  width: 100vw;
  overflow-x: hidden;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif;
}

.container {
  padding: 1rem;
}

.app-page-wrapper {
  // padding-top: $app-header-height;
  // background-color: #ece6dd;
  // min-height: calc(100vh - 48px);
}
</style>
