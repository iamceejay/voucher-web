<template>
  <div class="flex">
    <div class="flex flex-1 justify-center items-center flex-col h-screen p-5">
      <p class="text-base md:text-2xl">
        <span class="font-bold">Sorry!</span> 
        You're not allowed to access that page. <br />
      </p>
      <p>
        <router-link 
          :to="`${ AUTH_USER.isAuth ? '/home' : '/login' }`"
          class="text-blue-600 font-bold p-4"
        >
          Back
        </router-link>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'UserNotAllowed',
    components: {
    },
    data() {
      return {
        submitting: false
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      }
    },
    mounted() {},
    methods: {}
  };
</script>
<style lang='css' scoped>
</style>