<template>
    <div class="app-camera-container md-accent">
      <div class="app-camera-placeholder md-title">
        <span><md-icon>photo_camera</md-icon> <span>Scan my coffee</span></span>
      </div>
      <video ref="video" id="video" class="app-camera-video" autoplay></video>

      <app-snackbar :open.sync="notSupported"></app-snackbar>
    </div>
    
    <!-- <md-button class="md-raised md-accent" 
      @click="isTracking = !isTracking">
      {{ isTracking ? "Stop Tracking" : "Start Tracking" }}
    </md-button> -->

</template>

<script>
import _ from "lodash";
import "@/../node_modules/tracking/build/tracking-min";

import { camera } from "@/libs/camera";
import { EventBus } from "@/bus";

import AppSnackbar from "./NoCamSnackbar";

export default {
  data() {
    return {
      notSupported: null,
      isTracking: false,
      tracker: null,
      task: null,
      result: []
    };
  },
  mounted() {
    this.initCamera()
      .then(this.initTracker);
  },
  watch: {
    isTracking(newValue) {
      if (newValue) {
        this.task.run();
        camera.startCapture();
      } else {
        this.task.stop();
        camera.stopCapture();
      }
    }
  },
  methods: {
    initCamera() {
      camera.init(this.$refs.video);
      return camera.startCapture()
        .catch(err => this.notSupported = true);
    },
    initTracker() {
      this.registerColors();
      this.tracker = new tracking.ColorTracker(this.coffees.map(c => c.color.names[0]));
      this.tracker.setMinDimension(20);
      this.task = tracking.track(`#${this.$refs.video.id}`, this.tracker);
      this.tracker.on("track", this.trackEventHandler);
      this.isTracking = false;
    },
    registerColors() {
      const therhold = 20;
      this.coffees.forEach(coffee => {
        const [cr, cg, cb] = coffee.color.rgb;
        tracking.ColorTracker.registerColor(
          coffee.color.names[0],
          (r, g, b) => {
            return (
              this.isBetween(r, cr) &&
              this.isBetween(g, cg) &&
              this.isBetween(b, cb)
            );
          }
        );
      });
    },
    isBetween(num, target, therhold) {
      return num < target + therhold && num > target + therhold;
    },
    trackEventHandler(event) {
      if (event.data.length) {
        this.isTracking = false;
        this.result = event.data
          .map(rect => 
            coffees.filter(coffee => coffee.name == rect.color)
          )
          .reduce((flatten, rows) => [...flatten, rows])
      }
    }
  },
  computed: {
    coffees() {
      return EventBus.coffees;
    }
  },
  components: {
    AppSnackbar
  },
  beforeDestroy() {
    camera.stopCapture();
  }
};
</script>

<style lang="scss" scoped>
.app-camera-container {
  flex: 1;
  overflow: hidden;
}

.app-camera-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.app-camera-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  color: #616161;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}
</style>
