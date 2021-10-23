<template>
  <div id="app">
    <mfx-header></mfx-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MfxHeader from "@/components/Header.vue";
import {mapGetters} from "vuex";
import {getterTypes} from "@/store/modules/search";

export default {
  name: 'App',
  components: {
    MfxHeader
  },
  computed: {
    ...mapGetters({
      isUserTyping: getterTypes.isUserTyping,
    }),
  },
  watch: {
    isUserTyping() {
      if (this.isUserTyping && this.$route.name !== 'search') {
        this.$router.push({name: 'search'})
      }
    }
  }
}
</script>





