<template>
  <div>
    <h3 class="md-title">Hello There! This is where you scan your nespresso capsule.</h3>
    <p>123123123</p>

    <div class="app-camera-container">
      <video ref="video" class="app-camera"></video>
      <canvas ref="canvas" class="app-camera"></canvas>
    </div>
  </div>
</template>

<script>
import { startCapture } from '@/libs/camera'

export default {
  mounted() {
    startCapture()
      .then(stream => this.$refs.video.srcObject = stream)
  }
}
</script>


<style lang="scss" scoped>
  .app-camera-container {
    position: relative;
    width: 100%;
    height: 500px;
    border: 1px solid red;
  }
  .app-camera {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>
