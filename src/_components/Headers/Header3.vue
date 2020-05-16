<template>
  <div class="font-semibold text-base md:text-lg py-1 font-display text-gray-700">
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