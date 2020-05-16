<template>
  <div class="font-bold py-2 text-2xl md:text-4xl font-display text-gray-900 capitalize mb-1">
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