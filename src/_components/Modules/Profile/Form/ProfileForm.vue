<template>
  <div class="flex flex-col w-full">
    <InputField
      id="text"
      type="text"
      class="m-2"
      label="Username"
    />
    <div class="flex flex-row">
      <InputField
        id="text"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Name"
      />
      <InputField
        id="text"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Surname"
      />
    </div>
    <InputField
      id="text"
      type="text"
      class="m-2"
      label="Email address"
    />
    <InputField
      id="text"
      type="text"
      class="m-2"
      label="Password"
    />
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';

  export default {
    components: {
      InputField,
    },
    props: {
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="css" scoped>
</style>