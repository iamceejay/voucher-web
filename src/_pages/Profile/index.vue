<template>
  <MainLayout>
    <template #content>
      <div class="flex">
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form 
            class="w-full flex flex-col"
            @submit.prevent="handleSubmit(onSubmit(invalid))"
          >
            <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize mb-4">
              Profile & Settings
            </div>
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2 order-1 mb-5">
                <div class="font-bold mb-3 text-gray-700 font-display text-2xl">
                  Profile Info
                </div>
                <ProfileForm />
              </div>
              <div
                v-if="role == 'seller'" 
                class="w-full md:w-1/2 order-2 md:order-3 mb-5"
              >
                <div class="font-bold mb-3 text-gray-700 font-display text-2xl">
                  Company Info
                </div>
                <CompanyForm />
              </div>
              <div class="w-full md:w-1/2 order-3 md:order-2 mb-5">
                <div class="font-bold mb-3 text-gray-700 font-display text-2xl">
                  Payout Info
                </div>
                <PayoutForm />
              </div>
            </div>
            <Button
              type="submit"
              label="Save"
              size="w-full sm:w-1/2 py-3"
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
        role: null,
        submitting: false
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
      },
    },
    created() {
      this.onSetRole()
    },
    methods: {
      onSubmit( isValid )
      {
        if( !isValid ) {
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Updating the profile.',
            confirmButtonColor: '#6C757D',
          });
        }
      },
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>