import Vue from 'vue'
import VueRouter from 'vue-router'
import AppScan from '#/scan/Main'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: AppScan },
    // { path: '/', component: Index },
]

export default new VueRouter({ routes })