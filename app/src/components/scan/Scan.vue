<template>
  <div>
    <div class="app-camera-container md-accent">
      <div class="app-camera-placeholder md-title">
        <span><md-icon>photo_camera</md-icon> <span>Scan my coffee</span></span>
      </div>
      <video ref="video" id="video" class="app-camera-video" autoplay></video>
      <canvas ref="canvas" class="app-camera-canvas"></canvas>
    </div>
    
    <div class="">
      <md-button class="md-raised md-accent" 
<<<<<<< HEAD
        @click="isTracking = !isTracking"
      >
=======
        @click="notSupported = !notSupported">
>>>>>>> 38775814af4475f677acd41732edb11a6c641fcf
        {{ isTracking ? "Stop Tracking" : "Start Tracking" }}
      </md-button>
    </div>

    <app-snackbar :open.sync="notSupported"></app-snackbar>
  </div>
</template>

<script>
import _ from "lodash";
import "@/../node_modules/tracking/build/tracking-min";

import { camera } from "@/libs/camera";
import { EventBus } from "@/bus";

import AppSnackbar from './NoCamSnackbar';

export default {
  data() {
    return {
      notSupported: null,
      isTracking: false,
      context: null,
      tracker: null,
      task: null,
      result: []
    };
  },
  mounted() {
    const [vw, vh] = [window.innerWidth, window.innerHeight - 42];
    this.$refs.video.width = vw;
    this.$refs.video.height = vh;
    this.$refs.canvas.width = vw;
    this.$refs.canvas.height = vh;

    camera
      .startCapture(this.$refs.video)
      .then(this.initTracker)
      .then(() => (this.isTracking = true))
      .catch(err => {
        console.log("startCapture", err);
        this.notSupported = true;
      });
  },
  watch: {
    isTracking(newValue) {
      newValue ? this.task.run() : this.task.stop();
    },
    coffees(newValue, oldValue) {
      console.log("coffee changed", newValue, oldValue);
    }
  },
  methods: {
    initTracker() {
<<<<<<< HEAD
      const context = this.$refs.canvas.getContext('2d');
			const { width, height } = this.$refs.canvas;
      
      track.init(this.$refs.video.id);
      track.task.stop();
=======
      this.registerColors();
      this.tracker = new tracking.ColorTracker(this.coffee.map(c => c.color.names[0]));
      this.tracker.setMinDimension(20);
      this.task = tracking.track(`#${this.$refs.video.id}`, this.tracker);

      const context = this.$refs.canvas.getContext("2d");
      const { width, height } = this.$refs.canvas;
>>>>>>> 38775814af4475f677acd41732edb11a6c641fcf

      this.tracker.on("track", event => {
        context.clearRect(0, 0, width, height);
        if (event.data.length) {
          this.task.stop();
          event.data.forEach(rect => {
            this.drawRect(rect);
            // find match
            this.result = coffees.filter(coffee => coffee.name == rect.color);
          });
        }
      });
    },
    registerColors() {
      const therhold = 20;
      this.coffees.forEach(coffee => {
        const [cr, cg, cb] = coffee.color.rgb;
        tracking.ColorTracker.registerColors(coffee.color.names[0], (r, g, b) => {
          return (isBetween(r, cr) && isBetween(g, cg) && isBetween(b, cb));
        });
      });
    },
    isBetween(num, target, therhold) {
      return num < target + therhold && num > target + therhold;
    },
    drawRect(rect) {
      this.context.strokeStyle = '#f44336';
      this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      this.context.fillStyle = '#fff';
      this.context.fillText(
        "Coffee detected!",
        rect.x,
        rect.y + rect.height + 10
      );
    }
  },
<<<<<<< HEAD
  beforeDestroy() {
    this.$refs.snackbar.close();
    this.isTracking = false;
    track.task.stop();
=======
  computed: {
    coffees() {
      return EventBus.coffees;
    }
  },
  components: {
    AppSnackbar
>>>>>>> 38775814af4475f677acd41732edb11a6c641fcf
  }
};
</script>

<style lang="scss" scoped>
<<<<<<< HEAD
  .app-camera-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .app-camera-video {
    position: relative;
    z-index: 2;
  }

  .app-camera-canvas {
    z-index: 3;
  }

  .app-camera-placeholder,
  .app-camera-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
=======
.app-camera-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  
}
>>>>>>> 38775814af4475f677acd41732edb11a6c641fcf

.app-camera-placeholder,
.app-camera-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.app-camera-placeholder {
  color: #616161;
  background: #e0e0e0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
