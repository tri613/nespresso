import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from './App.vue'
import router from './router'

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'brown',
  accent: 'red',
  warn: 'indigo',
  background: 'white'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
