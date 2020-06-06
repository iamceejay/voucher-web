<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full px-8">
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form 
            class="flex flex-col w-1/2"
            @submit.prevent="handleSubmit(onSubmit(invalid))"
          >
            <Header2 label="Settings" />
            <div class="flex flex-col w-full">
              <InputField
                id="current_password"
                v-model="form.current_password"
                type="password"
                class="m-2"
                label="Confirm Password"
                rules="required|min:8|max:16"
                :errorMessages="errorMessages.current_password"
              />
              <InputField
                id="new_password"
                v-model="form.new_password"
                type="password"
                class="m-2"
                label="New Password"
                rules="required|min:8|max:16"
                :errorMessages="errorMessages.new_password"
              />
              <InputField
                id="repeat_password"
                v-model="form.repeat_password"
                type="password"
                class="m-2"
                label="Repeat Password"
                rules="required|min:8|max:16|password:@new_password"
                :errorMessages="errorMessages.repeat_password"
              />
            </div>
            <Button
              type="submit"
              label="Save"
              size="w-full py-3 mx-2 mt-2"
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
  import InputField from '_components/Form/InputField';
  import Header2 from '_components/Headers/Header2';

  export default {
    name: 'Profile',
    components: {
      MainLayout,
      InputField,
      Button,
      Header2
    },
    data() {
      return {
        errorMessages: [],
        form: {
          id: null,
          current_password: '',
          new_password: '',
          repeat_password: '',
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
    },
    created() {
      this.form.id =  this.AUTH_USER.data.id
    },
    methods: {
      async onSubmit( isValid )
      {
        if( !isValid ) {
          try {
            this.errorMessages = []
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            const data = await this.$store.dispatch('CHANGE_PASSWORD', this.form)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.form = {
              id: null,
              current_password: '',
              new_password: '',
              repeat_password: '',
            }
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Updating the password.',
              confirmButtonColor: '#6C757D',
            })
          } catch (err) {
            if( err?.response?.status == 422 ) {
              this.errorMessages = err.response.data.errors
            }
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>