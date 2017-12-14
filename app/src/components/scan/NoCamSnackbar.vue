<template>
    <md-snackbar :md-duration="Infinity" :md-active.sync="open">
      <span>Seems like you don't have access to camera.</span>
      <md-button class="md-raised md-accent" @click="$emit('update:open', false)">Got it</md-button>
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

<style>

</style>
