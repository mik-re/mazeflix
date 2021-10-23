<template>
  <div class="mfx-continer">
    <mfx-loader v-if="isSubmitting"/>
    <mfx-error-message v-if="error" />
    <div class="row">
      <div class="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-8 offset-xl-2">
        <div class="detail" v-if="show">
          <div class="row">
            <div class="col-xl-6 col-12">
              <div class="image-wrapper">
                <div class="background-layer"></div>
                <img class="mfx-image-fit" :src="show.image.original" alt="" v-if="show.image">
                <img class="mfx-image-fit" src="https://dummyimage.com/325x478/" alt="" v-else>
              </div>
            </div>
            <div class="col-xl-6 col-12">
              <div class="details-info-wrapper">
                <div class="info">
                  <h2 class="mfx-heading-2">{{show.name}}</h2>
                  <p class="mfx-text-md">{{summary}}</p>
                  <span class="mfx-text-xs">genres:</span>
                  <span class="mfx-text-sm">&nbsp;{{genres}}</span>
                  <br />
                  <div v-if="show.rating">
                    <span class="mfx-text-xs">rating:</span>
                    <span class="mfx-text-sm">&nbsp;{{show.rating.average}}</span>
                  </div>

                  <div v-if="show.language">
                    <span class="mfx-text-xs">language:</span>
                    <span class="mfx-text-sm">&nbsp;{{show.language}}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {actionTypes,mutationTypes} from "@/store/modules/shows";
import MfxLoader from "@/components/Loader.vue";
import MfxErrorMessage from "@/components/ErrorMessage.vue";
import {mapMutations} from 'vuex'

export default {
  name: 'MfxShowDetail',
  components: {
    MfxLoader,
    MfxErrorMessage
  },
  created() {
    this.fetchShow(this.$route.params.id)
  },
  beforeDestroy() {
    // we need to set the current show to null,
    //becouse while routing back again to this view,
    //the previus show will be visible in the meantime the service gives us the response
    this.getShowByIdReset()
  },
  methods: {
    ...mapActions({
      fetchShow: actionTypes.fetchShowById
    }),
    ...mapMutations({
      getShowByIdReset: mutationTypes.getShowByIdReset,
    }),
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.shows.isSubmitting,
      show: state => state.shows.showById,
      error: state => state.shows.validationErrors
    }),
    genres() {
      return this.show.genres.length > 0 ? this.show.genres.join(', ') : ''
    },
    summary() {
      return this.show.summary
          ? this.show.summary.replace(/<[^>]*>?/gm, '')
          : 'no description available'

    }
  },
}
</script>

<style lang="scss">
@import "../../node_modules/bootstrap/scss/bootstrap.scss";
.detail {
  height: 100%;

  .details-info-wrapper {
    min-height: 200px;
    background-color: var(--mfx-color-dark-grey);
    width: 100%;
    padding: 0 2vh;
    @include media-breakpoint-up(xl) {
      background-color: transparent;
    }

    .info-left {
      margin-top: 15px;
    }
  }

  .image-wrapper {
    position: relative;

    .background-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, var(--mfx-color-dark-grey),transparent 50%);

      @include media-breakpoint-up(xl) {
        background: none;
      }
    }
  }
}
</style>
