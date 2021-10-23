<template>
  <div class="mfx-continer main-header">
    <div class="d-flex logo-wrapper">
      <router-link
          :to="{name: 'home'}"
      >
        <img src="@/assets/logo.png" alt="mazeflix logo" class="logo">
      </router-link>
    </div>

    <div class="search-container d-flex justify-content-end flex-grow-1">
      <mfx-search-bar></mfx-search-bar>
    </div>
  </div>
</template>

<script>
import MfxSearchBar from "@/components/SearchBar.vue";

export default {
  name: 'MfxHeader',
  components: {
    MfxSearchBar
  }
}
</script>

<style lang="scss">
.main-header {
  height: 68px;
  display: flex;
  align-items: center;
  flex-direction: row;

  .logo-wrapper {
    flex: 1;
    margin-right: 18px;

    .logo {
      height: 35px;
    }
  }
}
</style>
