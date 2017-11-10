<template>
  <div class="container">
    <md-card :md-with-hover="true" v-for="(coffee, index) in coffees" :key="index">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ coffee.name }}</div>
          <!-- <div class="md-subhead">{{ coffee.flavor }}</div> -->
          <span class="md-subhead">
            <md-icon>local_cafe</md-icon> x {{ coffee.intensity }}
          </span>
        </md-card-header-text>
        <md-card-media>
          <img :src="coffee.image" :alt="coffee.name">
        </md-card-media>
      </md-card-header>
      <md-card-content>
        <p class="md-subheading" :style="colorStyle(coffee.color.rgb)">{{ coffee.details.subtitle }}</p>
        <p class="md-body-1">{{ coffee.details.description }}</p>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import coffees from '@/../assets/coffee.json'

export default {
  data() {
    return {
      coffees
    }
  },
  methods: {
    colorStyle(rgb) {
      return {
        color: `rgb(${rgb.join(',')})`
      }
    }
  }
}
</script>

<style>
.md-card {
  margin-bottom: 1rem;
}
</style>

