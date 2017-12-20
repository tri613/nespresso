<template>
  <header>
    <md-toolbar class="md-primary" id="app-header">
      <md-button class="md-icon-button" @click="openSideNav = !openSideNav">
        <md-icon>menu</md-icon>
      </md-button>
      <component :is="headerComponent"></component>
    </md-toolbar>
    
    <md-drawer :md-active.sync="openSideNav" :md-fixed="true">
      <md-toolbar class="md-transparent" md-elevation="0">
        <md-icon>local_cafe</md-icon> 
        <h2 class="md-title">Find my Nespresso</h2>
      </md-toolbar>

      <md-list>
        <md-list-item @click="openSideNav = false" :to="{ 'name': 'scan' }">
          <md-icon>photo_camera</md-icon> <span class="md-list-item-text">Scan my coffee</span>
        </md-list-item>

        <md-list-item @click="openSideNav = false" :to="{ 'name': 'coffee' }">
          <md-icon>list</md-icon> <span class="md-list-item-text">List of coffees</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </header>
</template>

<script>
import upperFirst from "lodash/upperFirst";
import AppCoffeeHeader from "#/list/SearchBar";
import AppScanHeader from "#/scan/HeaderBar";

export default {
  data() {
    return {
      headerComponent: "AppScanHeader",
      openSideNav: false
    };
  },
  watch: {
    "$route"(to, from) {
      this.headerComponent = `App${upperFirst(to.name)}Header`;
    }
  },
  components: {
    AppCoffeeHeader,
    AppScanHeader
  }
};
</script>


<style lang="scss">
#app-header {
  position: fixed;
  width: 100%;
  z-index: 51;
  top: 0px;
}

.router-link-exact-active {
  color: #bd1d11 !important;
}
</style>
