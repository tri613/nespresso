<template>
  <div>
    <md-layout id="app-search-bar" md-gutter="8" md-align="center" md-vertical-align="center">
        <md-layout md-flex="80">
          <md-input-container :md-clearable="true">
            <md-icon>search</md-icon>
            <label>coffee name or color</label>
            <md-input type="text" v-model="keywords"></md-input>
          </md-input-container>
        </md-layout>
    </md-layout>
    
    <div class="container">
      <md-card :md-with-hover="true" v-for="(coffee, index) in filteredCoffees" :key="index">
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
          <span v-for="tag in coffee.color.names" :key="tag" style="margin-right: 0.5rem;">
            <a href="#/" @click.prevent="writeToSearch(tag)">#{{ tag }}</a>
          </span>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import _ from 'lodash/core';
import coffees from '@/../assets/coffee.json';

export default {
  data() {
    return {
      coffees,
      keywords: ''
    }
  },
  methods: {
    colorStyle(rgb) {
      return {
        color: `rgb(${rgb.join(',')})`
      }
    },
    writeToSearch(tag) {
      this.keywords = tag;
    }
  },
  computed: {
    sortedCoffees() {
      const intensityGroup = this.coffees.reduce((result, current) => {
        result[current.intensity] = result[current.intensity] || [];
        result[current.intensity].push(current);
        return result;
      }, {});

      const flatten = [];
      for (let key in intensityGroup) {
        const group = intensityGroup[key].sort((a, b) => a.name <= b.name ? -1 : 1);
        flatten.push(...group);
      }

      return flatten;
    },
    filteredCoffees() {
      if (!this.keywords) {
        return this.sortedCoffees;
      }

      const keywords = this.keywords.trim().split(/\s+/);
      return this.sortedCoffees.filter(coffee => keywords.some(term => coffee.name.includes(term) || coffee.color.names.some(tag => tag.includes(term))))
    }
  }
}
</script>

<style lang="scss">
.md-card {
  margin-bottom: 1rem;
}

#app-search-bar {
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 48px; 
  left: 0;
  z-index: 50;
  background-color: #FFF;
  box-shadow: 0 0 10px 1px #9e9e9e;
}
</style>