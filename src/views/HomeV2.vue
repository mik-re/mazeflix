<template>
  <div class="mfx-continer">
    <div class="row">
      <div class="col-12">
        <mfx-loader v-if="isSubmitting"/>
        <div v-if="shows">
          <div v-for="(results, genre) in shows"
               :key="genre"
               class="genre-section"
          >
            <h2 class="mfx-heading-2 title">{{ genre }}</h2>
            <carousel
                :per-page="6"
                :navigate-to="0"
                :mouse-drag="true"
                :paginationEnabled="false"
                :navigationEnabled="true"
                :navigationClickTargetSize="9"
            >
              <slide
                  v-for="show in results"
                  :key="show.id"
                  class="slider-item"
              >
                <img :src="show.image.medium" loading="lazy"/>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getFeedsMixin from "@/mixins/getShowsMixin";

export default {
  name: 'MfxHome',
  mixins: [getFeedsMixin]
}
</script>

<style lang="scss">
.genre-section {
  margin: var(--mfx-size-xxl) 0;

  .title {
    margin-bottom: var(--mfx-size-md);
  }
}
</style>