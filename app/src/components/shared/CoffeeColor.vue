<template>
  <div class="app-circle-container" :style="containerStyle">
    <div class="app-circle" :style="{ backgroundColor: color }"></div>
  </div>
</template>

<script>
import { RgbColorMixin } from "@/mixins";

export default {
  mixins: [RgbColorMixin],
  props: {
    rgb: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: null
    }
  },
  computed: {
    color() {
      return this.rgbToColor(this.rgb);
    },
    containerStyle() {
      if (!this.width) {
        return {
          width: "100%",
          height: "100%"
        };
      }

      return {
        width: this.width,
        height: this.width
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

