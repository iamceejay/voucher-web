<template>
  <MainLayout>
    <template #content>
      <div class="flex">
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form 
            class="w-full flex flex-col"
            @submit.prevent="handleSubmit(onSubmit(invalid))"
          >
            <div class="font-bold text-lg py-2">
              Profile & Settings
            </div>
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2 order-1">
                <div class="font-bold text-sm pt-2">
                  Profile Info
                </div>
                <ProfileForm />
              </div>
              <div class="w-full md:w-1/2 order-2 md:order-3">
                <div class="font-bold text-sm pt-2">
                  Company Info
                </div>
                <CompanyForm />
              </div>
              <div class="w-full md:w-1/2 order-3 md:order-2">
                <div class="font-bold text-sm pt-2">
                  Payout Info
                </div>
                <PayoutForm />
              </div>
            </div>
            <Button
              type="submit"
              class="py-2 mx-2"
              label="Save"
              size="w-full sm:w-64 py-2"
              variant="info"
              round="rounded-full"
            />
          </form>
        </ValidationObserver>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';
  import ProfileForm from '_components/Modules/Profile/Form/ProfileForm';
  import CompanyForm from '_components/Modules/Profile/Form/CompanyForm';
  import PayoutForm from '_components/Modules/Profile/Form/PayoutForm';

  export default {
    name: 'Profile',
    components: {
      MainLayout,
      ProfileForm,
      CompanyForm,
      PayoutForm,
      Button
    },
    data() {
      return {
        submitting: false
      }
    },
    mounted() {

    },
    methods: {
      onSubmit( isValid )
      {
        if( !isValid ) {
          console.log('valid', isValid)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>