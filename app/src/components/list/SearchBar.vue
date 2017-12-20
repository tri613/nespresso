<template>
  <div class="app-search-bar">
    <input type="search" v-model="keywords" class="app-input" placeholder="a coffee name or color">
    <md-icon id="app-search-icon">search</md-icon>
    <!-- <md-field :md-clearable="true" :md-inline="true" md-theme="reverse-dark">
      <label for="">a coffee name or color</label>
      <md-input type="text" v-model="keywords"></md-input>
    </md-field> -->
  </div>
</template>

<script>
import { EventBus } from "@/bus";
import "@/../assets/base.scss";

export default {
  created() {
    EventBus.$on("click-tag", tag => (this.keywords = tag));
  },
  data() {
    return {
      keywords: ""
    };
  },
  watch: {
    keywords() {
      EventBus.$emit("input", this.keywords);
    }
  }
};
</script>

<style lang="scss">
@import '@/../assets/base.scss';

$input: #524c48;
$input-color: #fff;
$input-active: #dadad3;
$placeholder: lighten($input, 20%);

.app-search-bar {
  position: relative;
  width: 70%;
  // margin: 0 auto;

  #app-search-icon {
    position: absolute;
    color: $placeholder;
    fill: $placeholder;
    top: 50%;
    transform: translate(0, -45%);
    left: 5px;
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
