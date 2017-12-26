<template>
    <!-- :class="[ isInited ? 'app-disabled' : '' ]" -->
  <div>
    <transition name="app-fade" mode="out-in">
      <md-empty-state
        key="empty-state"
        v-if="!isInited"
        class="app-empty-state-container"
        md-icon="photo_camera"
        md-label="Scan my coffee"
        md-description="Scan your coffee to find out what flavor it is!">
        <md-button class="md-primary md-raised" @click="triggerUpload()">Start Scaning!</md-button>
      </md-empty-state>

      <div class="container" v-if="isInited" key="card"> 
        <md-card>
          <md-card-header>
            <div class="md-title">{{ title }}</div>
            <div class="md-subhead">Uploaded at {{ timestamp }}</div>
          </md-card-header>

          <md-card-media>
            <img :src="src" class="app-image">
          </md-card-media>

          <md-card-actions>
            <md-button  class="md-primary md-raised" @click="triggerUpload()">Scan Again</md-button>
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
import { createTrackingTask } from "@/libs/tracker";

import AppLoadingMask from "./LoadingMask";

export default {
  data: () => ({
    src: "",
    title: "",
    timestamp: "",
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

        if (this.$refs.image.complete) {
          this.onImageLoad();
        }
      });

      reader.readAsDataURL(file);
    },
    onImageLoad() {
      this.isLoading = false;

      if (!this.isInited) {
        this.isInited = true;
      }

      createTrackingTask("#app-image", result => {
        this.$store.commit("setResult", result);
      });
    }
  },
  computed: {
    ...mapState({
      showResult: state => state.scan.showResult
    })
  },
  components: {
    AppLoadingMask
  }
};
</script>


<style lang="scss" scoped>
  @import "~@/../assets/base.scss";

  .app-empty-state-container {
    @extend %full-page;
    position: relative;
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
  
</style>