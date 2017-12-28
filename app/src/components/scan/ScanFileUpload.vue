<template>
  <div class="app-page app-page-wrapper">
    <transition name="app-fade" mode="out-in">
      <md-empty-state
        key="empty-state"
        v-if="!isInited"
        class="app-page"
        md-icon="photo_camera"
        md-label="我的咖啡掃瞄器"
        md-description="掃掃看手上的膠囊是什麼口味吧！">
        <md-button class="md-primary md-raised" @click="triggerUpload()">來掃掃看</md-button>
      </md-empty-state>

      <div class="container" v-if="isInited" key="card"> 
        <md-card>
          <md-card-header>
            <div class="md-title">{{ title }}</div>
            <div class="md-subhead">Uploaded at {{ timestamp }}</div>
          </md-card-header>

          <md-card-media>
            <img :src="src">
          </md-card-media>

          <md-card-content>
            <div class="app-plaette-container">
              <div class="app-plaette" v-for="(color, i) in plaette" 
                :key="i"
                :style="{ backgroundColor: `rgb(${color.join(',')})`}">
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button v-if="result.length" @click="$store.commit('setShowResult', true)">查看結果</md-button>
            <md-button class="md-primary md-raised" @click="triggerUpload()">再試一遍</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </transition>

    <div class="app-hidden">
      <input ref="fileInput" 
        id="app-file-input" 
        type="file" 
        name="photo" 
        accept="image/*" 
        capture="environment"
        @change="onUploadChange($event)"
      >
      <img :src="src" id="app-image" ref="image">
    </div>

    <app-loading-mask :isLoading="isLoading"></app-loading-mask>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { scan } from "@/libs/plaette";

import AppLoadingMask from "./../shared/LoadingMask";

export default {
  data: () => ({
    src: "",
    title: "",
    timestamp: "",
    plaette: [],
    isInited: false,
    isLoading: false
  }),
  created() {
    this.$store.commit("setStartTaskHandler", this.triggerUpload.bind(this));
  },
  mounted() {
    this.$refs.image.addEventListener("load", e => {
      this.onImageLoad();
    });
  },
  filters: {
    json(v) {
      return JSON.stringify(v);
    }
  },
  methods: {
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onUploadChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      this.title = file.name;
      this.timestamp = new Date().toLocaleString();
      this.isLoading = true;

      reader.addEventListener("load", () => {
        this.src = reader.result;
        event.target.value = "";

        // if (this.$refs.image.complete) {
        //   this.onImageLoad();
        // }
      });

      reader.readAsDataURL(file);
    },
    onImageLoad() {
      if (!this.isInited) {
        this.isInited = true;
      }

      scan(this.$refs.image)
        .then(data => {
          this.isLoading = false;
          this.$store.commit("setResult", data.result);
          if (data.result.length > 0) {
            this.$store.commit("setShowResult", true);
          }
          this.plaette = data.colors;
        })
        .error(console.error);
    }
  },
  computed: {
    ...mapState({
      showResult: state => state.scan.showResult,
      result: state => state.scan.result
    })
  },
  components: {
    AppLoadingMask
  },
  destroyed() {
    this.$store.commit("setShowResult", false);
  }
};
</script>


<style lang="scss" scoped>
  @import "~@/styles/base.scss";

  .app-empty-state-container {
    // @extend %full-page;
    // position: absolute;
    // padding: 3rem 0;
    text-align: center;
  }

  .app-hidden {
    display: none;
  }

  .app-image {
    object-fit: none;
  }

  .app-image-container {
    text-align: center;
    > img {
      max-width: 100%;
    }
  }

  .app-plaette-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .app-plaette {
      width: 50px;
      height: 30px;
      border-radius: 4px;
      margin: .5rem;
      border: 1px solid #EEEEEE;
    }
  }
  
</style>