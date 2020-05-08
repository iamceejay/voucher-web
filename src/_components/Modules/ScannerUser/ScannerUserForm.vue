<template>
  <div class="flex flex-col w-full md:w-1/2">
    <InputField
      id="text"
      type="text"
      class="m-2"
      placeholder="Username"
    />
    <InputField
      id="text"
      type="text"
      class="m-2"
      placeholder="Email address"
    />
    <InputField
      id="text"
      type="text"
      class="m-2"
      placeholder="Password"
    />
    <p class="text-center px-12 py-4">
      A scan user is only allowed to do scans and redeem vouchers.
      All other seller functions are deactivated.
    </p>
    <Button
      class="py-2"
      label="Save"
      size="w-full py-1"
      variant="info"
      round="rounded-full"
      fontSize="text-xs"
    />
    <router-link to="/scanner-users">
      <Button
        class="py-2"
        label="Cancel"
        size="w-full py-1"
        variant="info"
        round="rounded-full"
        fontSize="text-xs"
      />
    </router-link>
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';
  import Button from '_components/Button'

  export default {
    components: {
      InputField,
      Button,
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