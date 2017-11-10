<template>
  <header>
    <md-toolbar class="md-dense">
      <md-button class="md-icon-button" @click="$refs.leftSidenav.toggle()">
        <md-icon>menu</md-icon>
      </md-button>

      <h1 class="md-title">Find my Nespresso</h1>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav" :md-swipeable="true">
      <md-toolbar class="md-transparent">
        <h2 class="md-title">Find my Nespresso</h2>
      </md-toolbar>
      <md-list>
        <md-list-item @click.native="$refs.leftSidenav.close()">
          <router-link :to="{ 'name': 'coffee' }" >
            <md-icon>list</md-icon> <span>List of coffees</span>
          </router-link>
        </md-list-item>

        <md-list-item @click.native="$refs.leftSidenav.close()">
          <router-link :to="{ 'name': 'scan' }">
            <md-icon>photo_camera</md-icon> <span>Scan your coffee</span>
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </header>
</template>
