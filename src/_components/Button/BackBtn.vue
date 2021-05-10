<template>
  <div
    v-if="$route.meta.back || $route.meta.back == '' || show"
    id="back-button-component"
    class="content-container flex items-center w-full"
  >
    <button
      @click="onBack()"
      type="button"
      class="border-1 focus:outline-none focus:shadow-none font-display px-2 py-1 rounded-full text-2xl text-peach w-16">
        <i class="fa-arrow-left fas"></i>
    </button>
    <h3 class="font-medium text-xl">{{ title }}</h3>
    <!-- <Button
      size="w-32 py-1 px-2"
      fontSize="text-2xs"
      labelClass="ml-2"
      fontWeight="font-normal"
      label="Zurück"
      icon="arrow-left"
      @onClick="onBack()"
    /> -->
  </div>
</template>
<script>
  import Button from '_components/Button'

  export default {
    components: {
      Button,
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      onBack()
      {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang='css' scoped>
</style>