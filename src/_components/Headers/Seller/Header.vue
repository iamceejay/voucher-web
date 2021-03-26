<template>
  <div :class="[ containerClass, {
    'border-b-2 border-input-border flex mb-8': !overwriteContainerClass
  }]">
    <h1 :class="[ headingClass, {
      'font-bold py-5 text-2xl md:text-3xl font-display capitalize text-black': !overwriteHeadingClass
    }]" v-html="title" />
    <slot></slot>
  </div>
</template>
<script>
  import Button from '_components/Button';

  export default {
    components: {
      Button
    },
    props: {
      title: {
        type: String,
        default: ''
      }, headingClass: {
        type: String,
        default: ''
      }, overwriteHeadingClass: {
        type: Boolean,
        default: false
      }, containerClass: {
        type: String,
        default: ''
      }, overwriteContainerClass: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>