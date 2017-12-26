<template>
  <transition name="app-slide-up" v-if="showResult">
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      result: state => state.scan.result,
      showResult: state => state.scan.showResult
    }),
    shortResult() {
      return this.result.splice(0, 5);
    }
  },
  methods: {
    close() {
      this.$store.commit("setShowResult", false);
      this.$store.state.scan.startTaskHandler();
    }
  }
};

</script>

<style lang="scss">
  @import "~@/../assets/base.scss";

  #app-scan-result {
    @extend %full-page;
    background: #FFF;
    z-index: 10;
    width: 100%;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 50px;
  }

  p {
    white-space: initial;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
