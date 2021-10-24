<template>
  <div class="mfx-continer">
    <mfx-error-message v-if="error"/>
    <mfx-loader v-if="isSubmitting"/>
    <div v-if="shows" data-mfx="shows-home">
      <div class="categories-section">
        <mfx-categories :categories="categories"></mfx-categories>
      </div>

      <div v-for="(results, genre) in shows"
           :key="genre"
           class="genre-section"
      >
        <div :id="genre">
          <h2 class="mfx-heading-2 title" data-mfx="shows-genre">{{ genre }}</h2>
        </div>
        <div class="mfx-flex-grid">
          <mfx-movie-card
              class="mfx-flex-image"
              v-for="show in results"
              :key="show.id"
              :id="show.id"
              :image="show.image ? show.image.medium : ''"
              :title="show.name"
              :showTitle="false"
          >
          </mfx-movie-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import getFeedsMixin from "@/mixins/getShowsMixin";
import MfxMovieCard from "@/components/MovieCard.vue";
import MfxCategories from "@/components/Categories.vue";

export default {
  name: 'MfxHome',
  components: {
    MfxMovieCard,
    MfxCategories
  },
  mixins: [getFeedsMixin],

}
</script>

<style lang="scss">
.categories-section{
  margin-top: 18px;
}
</style>
