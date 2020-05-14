<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-1 justify-center items-center flex-col">
        <div class="container">
          <div class="text-center font-bold text-4xl font-display mb-10">
            Voucher
          </div>
          <div class="content-container">
            <LoginForm />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from "_layouts";
  import LoginForm from '_components/Modules/Login/LoginForm';

  export default {
    name: 'Login',
    components: {
      MainLayout,
      LoginForm
    }
  }
</script>
<style lang='css' scoped>
  .container {
    /* margin-top: -100px; */
    width: 40%;
  }
  .content-container {
  }
  @media only screen and (max-width: 599px) {
    .container {
      width: 90% !important;
    }
  }
  @media only screen and (max-width: 767px) {
    .container {
      width: 60%;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .container {
      width: 50%;
    }
  }
</style>
