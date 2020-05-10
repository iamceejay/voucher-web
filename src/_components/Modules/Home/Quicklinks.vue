<template>
  <div class="w-full flex flex-col">
    <Header1 label="Quicklinks" />
    <div class="flex flex-col">
      <router-link to="/vouchers">
        <Button
          class="py-2"
          label="Show my vouchers"
          size="w-full md:w-64 py-2"
          round="rounded-full"
        />
      </router-link>
      <router-link to="/vouchers/new">
        <Button
          class="py-2"
          label="Create new voucher"
          size="w-full md:w-64 py-2"
          round="rounded-full"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      Button,
      Header1,
    },
    props: [],
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      
    }
  }
</script>
<style lang="css" scoped>
</style>