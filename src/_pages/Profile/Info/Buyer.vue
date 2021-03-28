<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <div data-v-6d1a851d="" class="font-medium mb-1 text-2xl text-center">
          Profil & Einstellungen
        </div>

        <span class="border-b-2 pb-6 flex flex-wrap text-sm mt-4">
            <router-link
              class="px-3 py-1 rounded-md text-xs border border-black bg-black text-white mr-2 mb-2"
              to="/profile-info"
            >
              Profil
            </router-link>
            <router-link
              class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"
              to="/profile-settings"
            >
              Passwort
            </router-link>
            <router-link
              class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"
              to="/profile-payment"
            >
              Zahlungsmethoden
            </router-link>
            <router-link
              class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"
              to="/orders"
            >
              Bestellungen
            </router-link>
        </span>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="w-full flex flex-col mt-6"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div class="flex flex-wrap w-full">
              <div class="w-full md:w-1/2 order-1">
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
            <div class="flex justify-between md:w-1/2 w-full items-baseline">
              <Button
                type="submit"
                label="Speichern"
                size="w-full py-3 px-4 "
                round="rounded"
              />
              <!-- <a
                href="javascript:void(0)"
                class="menu-item hover:text-peach underline text-sm"
                @click="onLogout()"
              >
                Abmelden
              </a> -->
            </div>
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
          phone_number: '',
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
            text: 'Info aktualisiert.',
            allowOutsideClick: false,
            showConfirmButton: false
          })
          setTimeout(() => {
            confirm.close()
            this.$router.push('/home')
          }, 1000)
        } catch (err) {
          console.log(err.response)

          if( err?.response?.status == 500 && err?.response?.data?.message.indexOf('account is verified') != -1 ) {
            this.$swal({
              icon: 'warning',
              title: 'Achtung!',
              text: 'You cannot change verification file if an account is verified',
              confirmButtonColor: '#48BB78',
            })
          }

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
            phone_number: user.detail.phone_number,
            iban: user.detail.iban,
            bic: user.detail.bic,
            bday: user.bday,
            company: null,
            verification_front: user.front_verification_image,
            verification_back: user.back_verification_image,
            additional_identity: user.additional_verification_image,
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
      async onLogout()
      {
        try {
          const data = await this.$store.dispatch('LOGOUT')
          await this.onRemoveAuth()
        } catch (err) {
          await this.onRemoveAuth()
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>