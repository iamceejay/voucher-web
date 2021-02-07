<template>
  <div class="text-sm">
    {{ label }}
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      }
    },
  }
</script>