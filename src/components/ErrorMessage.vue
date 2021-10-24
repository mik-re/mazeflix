<template>
  <div class="error-message">
    <h2 class="mfx-heading-2">{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'MfxErrorMessage',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Something went wrong!'
    }
  }
}
</script>