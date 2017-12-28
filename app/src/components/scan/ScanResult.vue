<template>
  <transition name="app-slide-up" v-if="showResult">
    <div id="app-scan-result">
      <md-list v-if="result.length">
        <md-list-item
          :style="{ borderLeft: `5px solid ${rgbToColor(coffee.color.rgb)}`}"
          v-for="coffee in shortResult" 
          :key="coffee.name" 
          md-expand
          >
          <h4 :style="{ color: rgbToColor(coffee.color.rgb) }">{{ coffee.name }}</h4>
          <div slot="md-expand" style="padding: 4px 16px;">
            <p class="md-subheading">
              <app-coffee-color :rgb="coffee.color.rgb" :width="'30px'"></app-coffee-color>
              {{ coffee.details.subtitle }}
            </p>
            <p class="md-caption">{{ coffee.flavor }}</p>
            <p><md-icon>local_cafe</md-icon> x {{ coffee.intensity }}</p>
            <p class="md-body-1">{{ coffee.details.description }}</p>
          </div>
        </md-list-item>
      </md-list>
      <p v-if="!result.length" class="container">沒有找到符合的咖啡口味喔！</p>

      <md-snackbar :md-duration="Infinity" :md-active="true" >
        <span>沒看到你的咖啡嗎？</span>
        <md-button id="app-snackbar-btn" class="md-raised md-accent md-dense" @click="close()">再試一遍</md-button>
      </md-snackbar>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import { RgbColorMixin } from "@/mixins";
import AppCoffeeColor from "./../shared/CoffeeColor";

export default {
  mixins: [RgbColorMixin],
  computed: {
    ...mapState({
      startTaskHandler: state => state.scan.startTaskHandler,
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
      this.startTaskHandler();
    }
  },
  components: {
    AppCoffeeColor
  }
};

</script>

<style lang="scss">
  @import "~@/styles/base.scss";

  #app-scan-result {
    @extend %full-page;
    background: #FFF;
    z-index: 10;
    width: 100%;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 50px;
    -webkit-overflow-scrolling: touch;
  }

  p {
    white-space: initial;
  }

  .app-circle-container {
    display: inline-block;
    vertical-align: middle;
  }
</style>
