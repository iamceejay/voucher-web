<template>
  <div class="w-full flex flex-col">
    <Header2 label="Quicklinks" />
    <div class="flex flex-col">
      <router-link to="/vouchers">
        <Button
          class="py-2"
          label="Meine Gutscheine ansehen"
          size="w-full md:w-64 py-2"
          round="rounded-full"
        />
      </router-link>
      <router-link to="/vouchers/new">
        <Button
          class="py-2"
          label="Neuen Gutschein erstellen"
          size="w-full md:w-64 py-2"
          round="rounded-full"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button';
  import Header2 from '_components/Headers/Header2';

  export default {
    components: {
      Button,
      Header2,
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