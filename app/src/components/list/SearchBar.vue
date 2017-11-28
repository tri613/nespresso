<template>
  <div class="app-search-bar">
    <md-icon style="margin-right: .5rem">search</md-icon>
    <md-field :md-clearable="true" :md-inline="true" md-theme="reverse-dark">
      <label for="">a coffee name or color</label>
      <md-input type="text" v-model="keywords"></md-input>
    </md-field>
  </div>
</template>

<script>
import { EventBus } from '@/bus';
export default {
  created() {
    EventBus.$on('click-tag', tag => this.keywords = tag);
  },
  data() {
    return {
      keywords: ''
    }
  },
  watch: {
    keywords() {
      EventBus.$emit('input', this.keywords);
    }
  }
}
</script>

<style>
  .app-search-bar {
    width: 70%;
    display: flex;
  }
</style>
