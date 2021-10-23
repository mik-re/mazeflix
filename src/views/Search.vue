<template>
  <div class="mfx-continer">
    <mfx-loader v-if="isSubmitting"/>
    <div class="row">
      <div class="col-12 mb-4">
        <h1 class="mfx-heading-2">Search Results: </h1>
      </div>
    </div>
    <div class="row">
      <mfx-error-message v-if="error" />
      <div v-if="searchShowResult">
        <div class="col-12 mb-4" v-if="searchShowResult.length === 0">
          <p class='mfx-text-md'>The search has not produced results. Try Again!!</p>
        </div>
        <div class="mfx-flex-grid">
          <mfx-movie-card
              v-for="result in searchShowResult"
              :key="result.show.id"
              :id="result.show.id"
              :image="result.show.image ? result.show.image.medium: ''"
              :title="result.show.name"
          >
          </mfx-movie-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import MfxMovieCard from "@/components/MovieCard.vue";
import MfxLoader from "@/components/Loader.vue";
import {mutationTypes} from "@/store/modules/search";
import {mapMutations} from 'vuex'
import MfxErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: 'MfxSearch',
  components: {
    MfxMovieCard,
    MfxLoader,
    MfxErrorMessage
  },
  beforeDestroy() {
    this.finishSearch();
  },
  methods: {
    ...mapMutations({
      finishSearch: mutationTypes.finishSearch,
    }),
  },
  computed: {
    ...mapState({
      searchShowResult: state => state.search.searchShowResult,
      isSubmitting: state => state.search.isSubmitting,
      error: state => state.search.validationErrors
    }),
  }
}
</script>
