<template>
    <md-snackbar :md-duration="Infinity" :md-active.sync="open" >
      <span>Seems like you don't have access to camera.</span>
      <md-button id="app-snackbar-btn" class="md-raised md-accent md-dense" @click="$emit('update:open', false)">GOT IT</md-button>
    </md-snackbar>
</template>

<script>
export default {
  name: "NoCamSnackbar",
  props: {
    open: {
      default: false
    }
  },
  data: () => ({
    showSnackbar: true
  }),
  methods: {
  }
};
</script>

<style lang="scss">
  #app-snackbar-btn {
    color: #FFF;
    .md-ripple {
      padding: 0 1rem;
    }
  }
</style>
