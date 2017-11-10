import Vue from 'vue'
import VueRouter from 'vue-router'
import AppScan from '#/scan/Main'
import AppList from '#/list/Main'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'scan', component: AppScan },
    { path: '/coffee', name: 'coffee', component: AppList }
]

export default new VueRouter({ routes })