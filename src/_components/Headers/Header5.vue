<template>
  <div class="text-sm">
    {{ label }}
    <svg
      v-if="tip"
      v-tippy
      class="icon h-4 w-4 mr-2 inline"
      :content="tip">
      <use xlink:href="/icons/sprite.svg#info-circle-fill" />
    </svg>
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      tip: {
        type: String,
        default: ''
      }
    },
  }
</script>