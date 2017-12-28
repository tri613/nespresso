<template>
  <transition name="app-fade" v-if="isLoading">
    <div class="app-mask">
      <md-progress-spinner class=" md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "~@/../assets/base.scss";

  .app-mask {
    @extend %full-page;
    position: fixed;
    width: 100%;
    background-color: transparentize(#FFF, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
</style>

