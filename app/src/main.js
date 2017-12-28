import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);

import App from "./App.vue";
import router from "./router";
import store from "./store";

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
