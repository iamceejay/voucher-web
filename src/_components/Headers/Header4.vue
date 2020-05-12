<template>
  <div class="font-semibold text-base font-display text-gray-700">
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