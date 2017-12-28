<template>
  <div class="app-camera-container md-accent">
    

    <video autoplay playsinline class="app-camera-video" :class="[ isInited ? '' : 'app-disabled' ]" ref="video" id="video" autoplay></video>
    <canvas :class="[ isInited ? '' : 'app-disabled' ]"  ref="canvas" class="app-camera-canvas"></canvas>

    
  </div>
</template>

<script>
import _ from "lodash";
import "@/../node_modules/tracking/build/tracking-min";
import { camera } from "@/libs/camera";
import { CoffeeBus } from "@/bus";

let task;
export default {
  props: {
    notSupported: Boolean,
    showResult: Boolean,
    result: Array
  },
  data: () => ({
    isInited: false,
    isTracking: false,
    tracker: null
  }),
  watch: {
    isTracking(newValue) {
      if (newValue) {
        camera.startCapture();
        setTimeout(() => {
          task.run();
        }, 1000);
      } else {
        camera.stopCapture();
        task.stop();
      }
    }
  },
  methods: {
    init() {
      this.initCamera()
        .then(setTimeout(() => {
          if (!this.notSupported) {
            this.initTracker();
            this.isInited = true;
          }
        }, 800))
        .catch(err => {
          alert(err);
          this.$emit("update:notSupported", true);
        });
    },
    initCamera() {
      camera.init(this.$refs.video, this.$refs.canvas);
      return camera.startCapture();
    },
    initTracker() {
      this.registerColors();
      this.tracker = new tracking.ColorTracker(this.coffees.map(c => c.color.names[0]));
      this.tracker.setMinDimension(20);
      task = tracking.track(`#${this.$refs.video.id}`, this.tracker, { camera: true });
      this.tracker.on("track", this.trackEventHandler.bind(this));
      this.isTracking = true;
    },
    registerColors() {
      this.coffees.forEach(coffee => {
        tracking.ColorTracker.registerColor(
          coffee.color.names[0],
          (r, g, b) => this.isBetween([r, g, b], coffee.color.rgb));
      });
    },
    isBetween(colorRgb, coffeeRgb) {
      const [r, g, b] = colorRgb;
      const [cr, cg, cb] = coffeeRgb;
      var dx = r - cr;
      var dy = g - cg;
      var dz = b - cb;

      // if (b - g >= 100 && r - g >= 60) {
      //   return true;
      // }
      return dx * dx + dy * dy + dz * dz < 3000;
    },
    trackEventHandler(event) {
      if (event.data.length) {
        this.isTracking = false;

        const eventResult = _.uniqBy(event.data, "color")
          .map(({ color }) => this.coffees.filter(coffee => coffee.color.names.includes(color)))
          .reduce((flatten, rows) => [...flatten, ...rows]);

        this.$emit("update:result", _.uniqBy(eventResult, "name"));

        // show result after like 2 seconds
        setTimeout(() => {
          this.$emit("update:showResult", true);
          task.stop(); // just in case
        }, 2000);
      }
    }
  },
  computed: {
    coffees() {
      return CoffeeBus.coffees;
    },
    isLoading() {
      return !this.isTracking && !this.showResult && this.isInited;
    }
  },
  beforeDestroy() {
    this.isTracking = false;
    camera.stopCapture();
  }
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/base.scss";

  .app-camera-container {
    // background: #e0e0e0;
    overflow: hidden;
    @extend %full-page;
    justify-content: center;
    align-items: center;
    position: absolute;
    display: flex;
    width: 100%;
  }

  .app-camera-canvas,
  .app-camera-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .app-mask {
    @extend %full-page;
    position: fixed;
    width: 100%;
    background-color: transparentize($color: #FFF, $amount: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-disabled {
    opacity: 0;
    pointer-events: none;
  }
</style>