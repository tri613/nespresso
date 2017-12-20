<template>
  <div class="container">
    <div class="card-wrapper">
      <md-card 
        md-with-hover
        v-for="(coffee, index) in filteredCoffees" 
        :key="index"
        :style="{ backgroundColor: colorStyle(coffee.color.rgb)}"
        >
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ coffee.name }}</div>
            <div class="md-subhead">
              <md-icon>local_cafe</md-icon> x {{ coffee.intensity }}
            </div>
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
    <p v-if="!filteredCoffees.length">
      No matching coffee found.
    </p>
  </div>
</template>

<script>
import _ from "lodash/core";
import { EventBus } from "@/bus";

export default {
  created() {
    EventBus.$on("input", value => (this.keywords = value));
  },
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    colorStyle(rgb, transparency = 1) {
      return {
        color: `rgba(${rgb.join(",")}, ${transparency})`
      };
    },
    writeToSearch(tag) {
      EventBus.$emit("click-tag", tag);
    }
  },
  computed: {
    coffees() {
      return EventBus.coffees;
    },
    sortedCoffees() {
      const intensityGroup = this.coffees.reduce((result, current) => {
        result[current.intensity] = result[current.intensity] || [];
        result[current.intensity].push(current);
        return result;
      }, {});

      const flatten = [];
      for (const key in intensityGroup) {
        const group = intensityGroup[key].sort(
          (a, b) => (a.name <= b.name ? -1 : 1)
        );
        flatten.push(...group);
      }

      return flatten;
    },
    filteredCoffees() {
      if (!this.keywords) {
        return this.sortedCoffees;
      }

      const keywords = this.keywords.trim().split(/\s+/);
      return this.sortedCoffees.filter(coffee =>
        keywords.some(
          term =>
            coffee.name.includes(term) ||
            coffee.color.names.some(tag => tag.includes(term))
        )
      );
    }
  },
  watch: {
    filteredCoffees() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss">
.md-card {
  margin-bottom: 1rem;

  .md-subhead {
    margin-top: .5rem !important;
  }
}

#app-search-bar {
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 48px;
  left: 0;
  z-index: 50;
  background-color: #fff;
  box-shadow: 0 0 10px 1px #9e9e9e;
}

.md-card-header .md-card-media img {
  object-fit: none;
}
</style>