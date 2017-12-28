<template>
  <div class="container app-page">
    <div class="card-wrapper">
      <md-card 
        md-with-hover
        v-for="(coffee, index) in filteredCoffees" 
        :key="index"
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
          <p class="md-subheading" :style="{ 'color': colorStyle(coffee.color.rgb) }">{{ coffee.details.subtitle }}</p>
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
import { mapGetters, mapState } from "vuex";

export default {
  methods: {
    colorStyle(rgb, transparency = 1) {
      return `rgba(${rgb.join(",")}, ${transparency})`;
    },
    writeToSearch(tag) {
      this.$store.commit("setKeywords", tag);
    }
  },
  computed: {
    ...mapState({
      keywords: state => state.list.keywords
    }),
    ...mapGetters(["sortedCoffees"]),
    filteredCoffees() {
      if (!this.keywords) {
        return this.sortedCoffees;
      }

      const keywords = this.keywords.toLowerCase().trim().split(/\s+/);
      return this.sortedCoffees.filter(coffee =>
        keywords.some(
          term =>
            coffee.name.toLowerCase().includes(term) ||
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