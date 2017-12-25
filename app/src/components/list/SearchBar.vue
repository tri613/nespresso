<template>
  <div class="app-search-bar">
    <input type="search" v-model="keywords" class="app-input" placeholder="a coffee name or color">
    <md-icon id="app-search-icon" class="app-icon" @click="clearKeywords()">search</md-icon>
    <button id="app-clear-icon" class="app-icon" v-if="keywords.length" @click="clearKeywords()">
      <md-icon>clear</md-icon>
    </button>
    <!-- <md-field :md-clearable="true" :md-inline="true" md-theme="reverse-dark">
      <label for="">a coffee name or color</label>
      <md-input type="text" v-model="keywords"></md-input>
    </md-field> -->
  </div>
</template>

<script>
import { CoffeeBus } from "@/bus";

export default {
  created() {
    CoffeeBus.$on("click-tag", tag => (this.keywords = tag));
  },
  data() {
    return {
      keywords: ""
    };
  },
  watch: {
    keywords() {
      CoffeeBus.$emit("input", this.keywords);
    }
  },
  methods: {
    clearKeywords() {
      console.log('clear clicked');
      this.keywords = "";
    }
  }
};
</script>

<style lang="scss">
  @import "~@/../assets/base.scss";

  $input: #524c48;
  $input-color: #fff;
  $input-active: #dadad3;
  $placeholder: lighten($input, 20%);

  .app-search-bar {
    position: relative;
    width: 70%;
    // margin: 0 auto;

    .app-icon {
      position: absolute;
      top: 50%;
    }

    #app-search-icon {
      left: 5px;
      color: $placeholder;
      fill: $placeholder;
      transform: translate(0, -45%);
    }

    #app-clear-icon {
      // transform: translate(0, -50%);
      right: 5px;
      border: 0;
      background: transparent;
      cursor: pointer;
      > i {
        fill: $accent;
        color: $accent;
      }
    }

    .app-input {
      width: 100%;
      border: 0;
      padding: 0.3rem 0.5rem;
      font-size: 16px;
      border-radius: 12px;
      background-color: $input;
      padding-left: 35px;
      color: $input-color;

      @include placeholder($placeholder);
      @include transition();

      &:focus {
        $placeholder: lighten($input, 40%);
        
        outline: none;
        @include placeholder($placeholder);

        & ~ #app-search-icon {
          fill: $placeholder;
          color: $placeholder;
        }
      }
    }
  }
</style>
