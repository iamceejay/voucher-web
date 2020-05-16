<template>
  <div class="font-bold text-lg md:text-2xl py-2 font-display text-gray-700">
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