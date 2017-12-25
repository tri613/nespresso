<template>
  <div id="app">
    <app-header></app-header>
    <div class="app-page-wrapper">
      <router-view ></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import "./../assets/base.scss";
import AppHeader from "#/Header.vue";
import AppFooter from "#/Footer.vue";

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style lang="scss">
.container {
  padding: 1rem;
}
</style>
