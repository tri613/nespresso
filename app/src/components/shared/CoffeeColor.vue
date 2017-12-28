<template>
  <div class="app-circle-container" :style="containerStyle">
    <div class="app-circle" :style="{ backgroundColor: color }"></div>
  </div>
</template>

<script>
export default {
  props: {
    rgb: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 0
    }
  },
  computed: {
    color() {
      return `rgb(${this.rgb.join(",")}`;
    },
    containerStyle() {
      if (this.width <= 0) {
        return {
          width: "100%",
          height: "100%"
        };
      }

      return {
        width: this.width + "px",
        height: this.width + "px"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-circle {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
</style>

