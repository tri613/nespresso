import Vue from 'vue'
import VueRouter from 'vue-router'

const AppScan = () => import(/* webpackChunkName: "scan" */ '#/scan/Scan')
const AppList = () => import(/* webpackChunkName: "list" */ '#/list/List')

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'scan', component: AppScan },
    { path: '/coffee', name: 'coffee', component: AppList }
]

export default new VueRouter({ routes })