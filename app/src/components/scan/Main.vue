<template>
  <div>
    <h3 class="md-title container">Hello There! This is where you scan your nespresso capsule.</h3>

    <div class="app-camera-container">
      <video ref="video" id="video" class="app-camera-video" autoplay width="500" height="500"></video>
      <canvas ref="canvas" class="app-camera-canvas" width="500" height="500"></canvas>
    </div>
    <div v-if="supported === false">
      Oops, your browser doesn't support using camera!
    </div>
    <md-button class="md-raised md-accent" @click="isTracking = !isTracking">{{ isTracking ? "Stop Tracking" : "Start Tracking" }}</md-button>
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
      .then(() => this.isTracking = true)
      .catch(err => this.supported = false)
  },
  data() {
    return {
      supported: null,
      tracker: null,
      trackTask: null,
      isTracking: false
    }
  },
  watch: {
    isTracking(newValue) {
      console.log('isTracking', newValue);
      if (newValue) {
        this.trackTask.run();
      } else {
        this.trackTask.stop();
      }
    }
  },
  methods: {
    initTracker() {
      const context = this.$refs.canvas.getContext('2d');
      window.context = context;

      this.tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
      this.tracker.setMinDimension(5);

      this.tracker.on('track',  event => {
        const { width, height } = this.$refs.canvas;
        console.log(width, height);
        context.clearRect(0, 0, width, height);

        if (event.data.length === 0) {
          // No colors were detected in this frame.
        } else {
          event.data.forEach(rect => {
            console.log(rect);
            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
          });
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
    border: 1px solid red;
    overflow: hidden;
  }
  .app-camera-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
