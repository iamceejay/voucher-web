<template>
  <div 
    id="button-component"
    class="flex"
  >
    <button
      :type="type"
      class="text-sm focus:outline-none focus:shadow-none border-1 font-display font-bold"
      :class="[bg, size, round]"
      :disabled="isDisabled"
      @click="$emit('onClick')"
    >
      <div
        v-if="isLoading"
        class="sm-spinner m-auto" 
      />
      <span 
        v-else
        :class="[fontSize]"
      >
        <i v-if="icon != ''" :class="`fas fa-${icon}`" />
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
      round: {
        type: String,
        default: 'rounded-full'
      },
      label: {
        type: String,
        default: ''
      },
      icon: {
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
      },
      size: {
        type: String,
        default: 'w-32 py-3'
      },
      fontSize: {
        type: String,
        default: 'font-base'
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
            this.bg = 'bg-gray-500 text-black'
            break
          case 'danger':
            this.bg = 'bg-red-600 text-white'
            break
          case 'white':
            this.bg = 'bg-white text-black'
            break
          default:
            this.bg = 'bg-peach text-white'
            break
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>