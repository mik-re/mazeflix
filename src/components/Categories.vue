<template>
  <ul class="category-list">
    <li v-for="(category, index) in categories" :key="index" class="mfx-text-sm">
      <a :href="'#' + category" class="mfx-link">
        {{ category }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MfxCategories',
  props: {
    categories: {
      type: Array,
      required: false,
    }
  }
}
</script>

<style lang="scss">
.category-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  li {
    flex: 0 auto;
    border-right: 1px solid grey;
    list-style: none;
    padding: 0 0.5em;
  }

  li:last-child {
    border-right: none;
  }
}
</style>
