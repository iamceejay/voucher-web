<template>
  <div
    id="button-component"
    class="flex"
  >
    <button
      :type="type"
      class="focus:outline-none focus:shadow-none border-1"
      :class="[bg, size, round, fontSize, fontWeight]"
      :style="variant != 'white' ? 'background-color: var(--company-color, #ff5563)' : ''"
      :disabled="isDisabled"
      @click="$emit('onClick')"
    >
      <div
        v-if="isLoading"
        class="sm-spinner m-auto"
      />
      <span :class="`flex items-center justify-center`" v-else>
        <i v-if="icon != ''" :class="fullIconClass ? icon : `fas fa-${icon}`" />
        <img v-if="customIcon != ''" :src="customIcon" :class="customIconClass" />
        <span :class="[labelClass]" v-html="label"></span>
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
      fullIconClass: {
        type: Boolean,
        default: false
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
        default: 'text-sm'
      },
      fontWeight: {
        type: String,
        default: 'font-normal'
      },
      labelClass: {
        type: String,
        default: ''
      },
      customIcon: {
        type: String,
        default: ''
      },
      customIconClass: {
        type: String,
        default: ''
      },
      useDefaultFont: {
        type: Boolean,
        default: true
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
          case 'black':
            this.bg = 'bg-black text-white'
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