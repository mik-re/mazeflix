<template>
  <div class="search-container d-flex">
    <input type="text" class="search-input" placeholder="titles, genres" v-model="searchQuery"
           @keyup="handleSearch">
    <button class="button-wrapper btn d-flex">
      <b-icon icon="search"></b-icon>
    </button>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
import {mutationTypes, getterTypes, actionTypes} from "@/store/modules/search";
import debounce from 'lodash.debounce';

export default {
  name: 'MfxSearchBar',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    ...mapMutations({
      startSearch: mutationTypes.startSearch,
      finishSearch: mutationTypes.finishSearch,
    }),
    ...mapActions({
      searchShow: actionTypes.searchShow
    }),
    handleSearch() {
      if (!this.isUserTyping) {
        this.startSearch()
      }
    },
  },
  computed: {
    ...mapGetters({
      isUserTyping: getterTypes.isUserTyping
    }),
  },
  watch: {
    searchQuery: {
      handler: debounce(function (query) {
        if (query === '') {
          this.finishSearch()
          return;
        }

        this.searchShow(query)
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import "../../node_modules/bootstrap/scss/bootstrap.scss";

.search-container {
  position: relative;
  transition: width .3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 400px;
  @include media-breakpoint-down(md) {
    width: 100%;
  }

  .search-input {
    border: 1px solid var(--mfx-color-white);
    padding: 5px 40px 6px 10px;
    width: 100%;
    background-color: var(--mfx-color-black);
    color: var(--mfx-color-white);
    font-family: var(--mfx-text-font-light);
  }

  .button-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    align-items: center;
    width: 40px;
    height: 100%;
    opacity: 1;
    color: var(--mfx-color-white);

    &:hover {
      opacity: 0.6;
      top: -1px;
    }
  }
}
</style>
