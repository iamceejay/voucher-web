<template>
  <div
    v-if="$route.meta.back || $route.meta.back == '' || show"
    id="back-button-component"
    class="content-container flex flex-col w-full"
  >
    <Button
      size="w-32 py-1 px-2"
      fontSize="text-2xs"
      labelClass="ml-2"
      fontWeight="font-normal"
      label="Zurück"
      icon="arrow-left"
      @onClick="onBack()"
    />
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
        if( !this.show ) {
          let route = this.$route.meta.back
          if( route == '' ) {
            (window.history.length > 1) 
              ? this.$router.go(-1) 
              : this.$router.push('/')
          } else {
            this.$router.push(route)
          }
        } else {
          (window.history.length > 1) 
            ? this.$router.go(-1) 
            : this.$router.push('/')
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>