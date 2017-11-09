<template>
  <div>
    <h3 class="md-title container">Hello There! This is where you scan your nespresso capsule.</h3>

    <div class="app-camera-container" v-if="supported === true">
      <video ref="video" id="video" class="app-camera"></video>
      <canvas ref="canvas" class="app-camera"></canvas>
    </div>
    <div v-if="supported === false">
      Oops, your browser doesn't support using camera!
    </div>
  </div>
</template>

<script>
import '@/../node_modules/tracking/build/tracking-min';
import { startCapture } from '@/libs/camera';

export default {
  created() {
   
  },
  mounted() {
    startCapture(this.$refs.video)
      .then(this.initTracker)
      .catch(err => this.supported = false)
  },
  data() {
    return {
      supported: null,
      tracker: null,
      trackTask: null
    }
  },
  methods: {
    initTracker() {
      this.tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

      this.tracker.on('track', function (event) {
        if (event.data.length === 0) {
          // No colors were detected in this frame.
        } else {
          event.data.forEach(rect => console.log(rect.x, rect.y, rect.height, rect.width, rect.color));
        }
      });

      this.trackTask = tracking.track(`#${this.$refs.video.id}`, this.tracker);
      this.trackTask.stop();
    }
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
