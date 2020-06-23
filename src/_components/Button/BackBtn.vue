<template>
  <div
    v-if="$route.meta.back || $route.meta.back == ''"
    id="back-button-component"
    class="flex"
  >
    <Button
      size="w-20 py-1 px-2"
      fontSize="text-2xs"
      labelClass="ml-2"
      fontWeight="font-normal"
      label="Back"
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
        let route = this.$route.meta.back
        if( route == '' ) {
          route = (window.history.length > 1) 
            ? this.$router.go(-1) 
            : this.$router.push('/')
        } else {
          this.$router.push(route)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>