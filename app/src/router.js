import Vue from "vue";
import VueRouter from "vue-router";

const AppScan = () => import(/* webpackChunkName: "scan" */ "#/scan/Scan");
const AppList = () => import(/* webpackChunkName: "list" */ "#/list/List");

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "scan", component: AppScan, meta: { header: "AppScanHeader" }},
  { path: "/coffee", name: "coffee", component: AppList, meta: { header: "AppListHeader" }}
];

export default new VueRouter({ routes });
