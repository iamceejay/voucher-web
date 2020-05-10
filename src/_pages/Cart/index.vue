<template>
  <MainLayout>
    <template #content>
      <Header2 
        class="flex justify-center"
        label="Cart Page"
      />
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import Header2 from '_components/Headers/Header2'

  export default {
    name: 'Home',
    components: {
      MainLayout,
      Header2
    },
    data() {
      return {
        role: null
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      }
    },
    mounted() {
      this.onSetRole()
    },
    methods: {
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>