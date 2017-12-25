import Vue from "vue";
import axios from "axios";

export const CoffeeBus = new Vue({
  data: {
    coffees: []
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.coffees.length) {
        return Promise.resolve(this.coffees);
      } else {
        return axios.get("/assets/data-v1.json")
          .then(response => {
            this.coffees = response.data;
          });
      }
    }
  }
});

export const ScanBus = new Vue({
  data: {
    result: []
  },
  created() {
  },
  methods: {
    // toggleTrackingStatus() {
    //   this.isTracking = !this.isTracking;
    //   this.$emit("toggle-tracking", this.isTracking);
    // },
    setNotSupportState(state) {
      this.$emit("update:notSupported", state);
    },
    setResult(result) {
      this.result = result;
    },
    setShowResultState(state) {
      this.$emit("update:showResult", state);
    }
  }
});
