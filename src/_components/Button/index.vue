<template>
  <div 
    id="button-component"
    class="flex"
  >
    <button
      :type="type"
      class="text-sm rounded focus:outline-none focus:shadow-none border-1 w-20 py-1"
      :class="[bg]"
      :disabled="isDisabled"
      @click="$emit('onClick')"
    >
      <div
        v-if="isLoading"
        class="sm-spinner m-auto" 
      />
      <span v-else>
        {{ label }}
      </span>
    </button>
  </div>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'button'
      },
      variant: {
        type: String,
        default: 'primary'
      },
      label: {
        type: String,
        default: ''
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bg: ''
      }
    },
    mounted() {
      this.onSetVariant()
    },
    methods: {
      onSetVariant()
      {
        switch (this.variant) {
          case 'success':
            this.bg = 'bg-yellow-400 text-white'
            break
          case 'info':
            this.bg = 'bg-grey-400 text-black'
            break
          case 'danger':
            this.bg = 'bg-red-600 text-white'
            break
          default:
            this.bg = 'bg-blue-600 text-white'
            break
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>