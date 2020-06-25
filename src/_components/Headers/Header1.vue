<template>
  <div
    class="font-bold py-2 text-2xl md:text-4xl font-display capitalize mb-1"
    :class="[color]"
  >
    {{ label }}
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: '',
      }, color: {
        type: String,
        default: 'text-gray-900',
      }, 
    },
  }
</script>