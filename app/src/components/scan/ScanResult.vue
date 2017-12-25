<template>
  <transition animation="app-slide-up" v-if="active">
    <div id="app-scan-result">
      <md-list v-if="shortResult.length">
        <md-list-item v-for="coffee in shortResult" :key="coffee.name" md-expand>
          <img :src="coffee.image" :alt="coffee.name">
          <h4>{{ coffee.name }}</h4>
          <h5>{{ coffee.details.subtitle }} </h5>
          <div slot="md-expand" style="padding: 4px 16px;">
            <p class="md-subheading">{{ coffee.flavor }}</p>
            <p><md-icon>local_cafe</md-icon> x {{ coffee.intensity }}</p>
            <p class="md-body-1">{{ coffee.details.description }}</p>
          </div>
        </md-list-item>
      </md-list>

      <md-snackbar :md-duration="Infinity" :md-active="true" >
        <span>Don't see your coffee here?</span>
        <md-button id="app-snackbar-btn" class="md-raised md-accent md-dense" @click="close()">RETRY</md-button>
      </md-snackbar>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    result: {
      type: Array,
      default: () => ([])
    },
    active: false
  },
  methods: {
    close() {
      this.$emit("update:active", false);
    }
  },
  computed: {
    shortResult() {
      return this.result.splice(0, 5);
    }
  }
};
</script>

<style lang="scss">
  @import "~@/../assets/base.scss";

  #app-scan-result {
    @extend %full-page;
    background: #FFF;
    z-index: 2;
    width: 100%;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 50px;
  }

  p {
    white-space: initial;
  }
</style>
