<template>
  <div>
    <div class="app-camera-container md-accent">
      <md-layout md-align="center" md-vertical-align="center" class="app-camera-placeholder md-title">
        <span><md-icon>photo_camera</md-icon> <span>Scan my coffee</span></span>
      </md-layout>
      <video ref="video" id="video" class="app-camera-video" autoplay></video>
      <canvas ref="canvas" class="app-camera-canvas"></canvas>
    </div>
    
    <!--  @click="isTracking = !isTracking" -->
    <md-layout md-align="center" md-vertical-align="center">
      <md-button class="md-raised md-accent" 
        @click="$refs.snackbar.open()"
      >
        {{ isTracking ? "Stop Tracking" : "Start Tracking" }}
      </md-button>
    </md-layout>

    <md-snackbar :md-duration="Infinity" ref="snackbar">
      <md-layout md-gutter="16">
        <md-layout md-flex="70" style="margin-right: 1rem">Seems like you don't have access to camera.</md-layout>
        <md-layout :md-flex="true" md-vertical-align="center">
          <md-button class="md-raised md-accent" @click="$refs.snackbar.close()" style="margin-left: -16px;">Got it</md-button>
        </md-layout>
      </md-layout>
    </md-snackbar>
  </div>
</template>

<script>
import _ from 'lodash';
import { camera, track } from '@/libs/camera';

export default {
  
  mounted() {
    const [ vw, vh ] = [ window.innerWidth, window.innerHeight - 42 ];
    this.$refs.video.width = vw;
    this.$refs.video.height = vh;
    this.$refs.canvas.width = vw;
    this.$refs.canvas.height = vh;

    camera.startCapture(this.$refs.video)
      .then(this.initTracker)
      .then(() => this.isTracking = true)
      .catch(err => {
        console.log('startCapture', err);
        this.$nextTick(() => this.$refs.snackbar.open());
        this.supported = false;
      })
  },
  data() {
    return {
      supported: null,
      isTracking: false
    }
  },
  watch: {
    isTracking(newValue) {
      newValue ? track.task.run() : track.task.stop();
    }
  },
  methods: {
    initTracker() {
      const context = this.$refs.canvas.getContext('2d');
			const { width, height } = this.$refs.canvas;
      
      track.init();
      track.task.stop();

      track.tracker.on('track', event => {
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
    }
  },
  beforeDestroy() {
    this.$refs.snackbar.close();
  }
}
</script>

<style lang="scss" scoped>
  .app-camera-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .app-camera-placeholder,
  .app-camera-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .app-camera-placeholder {
    color: #616161;
    background: #E0E0E0;
    width: 100%;
    height: 100%;
  }

</style>
