<template>
<div id="app">
  <app-header></app-header>
  <router-view class="app-page-wrapper"></router-view>
  <app-footer></app-footer>
</div>
</template>

<script>
import './../assets/base.scss'
import AppHeader from '#/Header.vue'
import AppFooter from '#/Footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
body {
  width: 100vw;
  overflow-x: hidden;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif;
}

.container {
  padding: 1rem;
}

.app-page-wrapper {
  padding-top: 48px;
  // background-color: #ece6dd;
  min-height: calc(100vh - 48px);
}
</style>
