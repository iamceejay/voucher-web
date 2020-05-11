<template>
  <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize mb-3">
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