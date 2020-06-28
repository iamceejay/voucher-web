<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form 
            class="w-full flex flex-col"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div class="flex flex-wrap w-full">
              <div class="w-full md:w-1/2 order-1">
                <Header2 label="Profilinfo" />
                <ProfileForm
                  :data="form"
                  :type="AUTH_USER.role.name"
                  :errorMessages="errorMessages"
                  @onChange="onChange"
                />
              </div>
              <div
                v-if="AUTH_USER.role.name == 'seller'" 
                class="w-full md:w-1/2 order-2 md:order-3 mt-5"
              >
                <Header2 label="Company Info" />
                <CompanyForm
                  :data="form"
                  :errorMessages="errorMessages"
                  @onChange="onChange"
                />
              </div>
              <div
                v-if="AUTH_USER.role.name == 'seller'" 
                class="w-full md:w-1/2 order-3 md:order-2 mt-5"
              >
                <Header2 label="Auszahlungsinfo" />
                <PayoutForm
                  :data="form"
                  :errorMessages="errorMessages"
                  @onChange="onChange"
                />
              </div>
            </div>
            <Button
              type="submit"
              label="Speichern"
              size="w-full md:w-1/2 py-3 mx-2 mt-1"
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
  import Header2 from '_components/Headers/Header2';

  export default {
    name: 'Profile',
    components: {
      MainLayout,
      ProfileForm,
      CompanyForm,
      PayoutForm,
      Button,
      Header2
    },
    data() {
      return {
        errorMessages: [],
        form: {
          id: null,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          zip_code: '',
          iban: '',
          bic: '',
          company: null,
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      REGIONS()
      {
        return this.$store.getters.REGIONS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchUser()
          if( this.AUTH_USER.role.name == 'seller' ) {
            await this.$store.commit('SET_GLOBAL_SETTING', null)
            await this.onFetchGlobalSetting()
            await this.onFetchUserSetting()
          }
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onSubmit()
      {
        try {
          this.errorMessages = []
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          if( this.AUTH_USER.role.name == 'seller' ) {
            if( this.form?.company?.region_id ) {
              this.form.company.region = this.form.company.region_id.label
              delete this.form.company.region_id; 
            }
          }
          const data = await this.$store.dispatch('UPDATE_USER', this.form)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          let confirm = this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Updating your info.',
            allowOutsideClick: false,
            showConfirmButton: false
          })
          setTimeout(() => {
            confirm.close()
            this.$router.push('/home')
          }, 1000)
        } catch (err) {
          if( err?.response?.status == 422 ) {
            this.errorMessages = err.response.data.errors
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      },
      onChange( data )
      {
        this.form = {
          ...this.form,
          ...data
        }
      },
      async onFetchUser()
      {
        try {
          const { user } = await this.$store.dispatch('FETCH_USER', {
            id: this.AUTH_USER.data.id
          })

          let params = {
            id: user.id,
            username: user.username,
            firstName: user.detail.firstName,
            lastName: user.detail.lastName,
            email: user.email,
            address: user.detail.address,
            city: user.detail.city,
            zip_code: user.detail.zip_code,
            iban: user.detail.iban,
            bic: user.detail.bic,
            company: null
          }

          
          if( this.AUTH_USER.role.name == 'seller' ) {
            const region = this.REGIONS.filter( row => user.company.region == row.label)
            params = {
              ...params,
              company: {
                name: user.company.name,
                description: user.company.description,
                url: user.company.url,
                logo: user.company.logo,
                region: user.company.region,
                region_id: region ? region[0] : '',
                vat_number: user.company.vat_number,
              },
            }
          }
          this.form = params
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchGlobalSetting()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_GLOBAL_SETTING', 1)
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchUserSetting()
      {
        try {
          const data = await this.$store.dispatch('FETCH_USER_SETTING_BY_USER', {
            user_id: this.AUTH_USER.data.id
          })
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>