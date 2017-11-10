<template>
  <header>
    <md-toolbar class="md-dense" id="app-header">
      <md-button class="md-icon-button" @click="$refs.leftSidenav.toggle()">
        <md-icon>menu</md-icon>
      </md-button>
      <h1 class="md-title">Find my Nespresso</h1>
    </md-toolbar>
    
    <md-sidenav class="md-left" ref="leftSidenav" :md-swipeable="true" :md-swipe-distance="30">
      <md-toolbar class="md-accent md-dense">
        <h2 class="md-title">
          <md-icon>local_cafe</md-icon> 
          <span style="margin-left: 1rem;vertical-align: middle;">Find my Nespresso</span>
        </h2>
      </md-toolbar>
      <md-list>
        <md-list-item @click.native="$refs.leftSidenav.close()">
          <router-link :to="{ 'name': 'scan' }">
            <md-icon>photo_camera</md-icon> <span>Scan your coffee</span>
          </router-link>
        </md-list-item>

        <md-list-item @click.native="$refs.leftSidenav.close()">
          <router-link :to="{ 'name': 'coffee' }">
            <md-icon>list</md-icon> <span>List of coffees</span>
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </header>
</template>

<style lang="scss">

#app-header {
  position: fixed;
  width: 100%;
  z-index: 51;
  top: 0px;
}

.router-link-exact-active {
  color: #F44336 !important;
}

</style>

