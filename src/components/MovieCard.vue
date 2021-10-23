<template>
  <div class="mfx-movie-card">
    <router-link
        :to="{name: 'show', params: {id: id}}"
    >
      <img class="mfx-image-fit"
           v-if="image"
           :src="image"
           alt="" />
      <div v-else class="fallback">
        <div class="layer"></div>
        <img src="https://dummyimage.com/210x295/" alt="">
        <p class="mfx-ellipsis">{{title}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MfxMovieCard',
  props: {
    id: {
      type: Number,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true
    },
  },
}
</script>

<style lang="scss">
.mfx-movie-card {
  border-radius: 4px;
  margin-bottom: 15px;
  position: relative;

  &:hover {
    transform: scale(1.02);
  }

  .movie-info {
    bottom: 0;
  }

  .fallback {
    p {
      position: absolute;
      bottom: 0;
      left: 8%;
      right: 8%;
      margin: 0;
      padding: 0 0 10%;
      text-align: center;
      z-index: 2;
      color: var(--mfx-color-white);
    }
    .layer {
      background-image: linear-gradient(rgba(0,0,0,0),#000);
      background-color: #222;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>
