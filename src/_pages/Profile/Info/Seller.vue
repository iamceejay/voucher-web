<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="w-full flex flex-col"
            @submit.prevent="handleSubmit(onSubmit)"
          >
           <div class="border-b border-gray-400 flex items-center justify-between pb-5">
              <span class="text-xl font-medium">Profil & Einstellungen</span>
              <button type="submit" class="bg-peach px-5 py-3 rounded-md text-sm text-white">Speichern</button>
            </div>
            <div class="bg-white mt-8 p-6 w-full">
              <div class="border-b-2 flex flex-wrap mb-4 pb-4">
                <button
                  @click="currentTab = 0"
                  type="button"
                  class="px-4 py-3 rounded-md text-xs mr-4 mb-4"
                  :class="currentTab == 0 ? 'bg-black text-white' : 'border border-black text-black'"
                  >
                  Profilinfo
                </button>
                <button
                  @click="currentTab = 1"
                  type="button"
                  class="px-4 py-3 rounded-md text-xs mr-4 mb-4"
                  :class="currentTab == 1 ? 'bg-black text-white' : 'border border-black text-black'"
                  >
                  Auszahlungsinfo
                </button>
                <button
                  @click="currentTab = 2"
                  type="button"
                  class="px-4 py-3 rounded-md text-xs mr-4 mb-4"
                  :class="currentTab == 2 ? 'bg-black text-white' : 'border border-black text-black'"
                  >
                  Überprüfung
                </button>
                <button
                  @click="currentTab = 3"
                  type="button"
                  class="px-4 py-3 rounded-md text-xs mr-4 mb-4"
                  :class="currentTab == 3 ? 'bg-black text-white' : 'border border-black text-black'"
                  >
                  Passwort
                </button>
              </div>
              <div class="w-full" v-if="currentTab == 0">
                <div class="md:flex flex-row md:space-x-6 w-full">
                  <div class="w-full md:w-1/2">
                    <div>
                      <span class="block mb-1 text-sm">Logo</span>
                      <label
                        class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs text-center cursor-pointer" style="background-color: rgb(247, 247, 247);"
                        >
                            <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-3xl text-center"></i> (Ideales Maß ist 250px x 100px)
                            <input
                              type="file"
                              accept="'image/*'"
                              aria-label="File browser example"
                              @change="(e) => croppie(e, 'logo')"
                              />
                            <span class="file-custom"></span>
                        </label>
                        <section v-if="logo && logo != '' && logo == form.company.logo" class="relative border" style="width: 250px; height: 100px;">
                          <img :src="onSetLogo('set', logo)" style="width: auto; height: 100%;"/>
                        </section>
                        <section class="relative hidden">
                          <vue-croppie
                            ref="logo"
                            :enableOrientation="true"
                            :enableResize="false"
                            :boundary="{ width: 250, height: 100 }"
                            :viewport="{ width: 250, height: 100, 'type':'square' }"
                            @update="update('logo', 'logo')"
                          />
                        </section>
                    </div>

                    <div>
                      <span class="block mb-1 text-sm">Titelbild</span>
                      <label
                        class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs text-center cursor-pointer" style="background-color: rgb(247, 247, 247);"
                        >
                            <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-3xl text-center"></i> (Ideales Maß ist 1920px x 1080px)
                            <input
                              type="file"
                              accept="'image/*'"
                              aria-label="File browser example"
                              @change="(e) => croppie(e, 'header_logo')"
                              />
                            <span class="file-custom"></span>
                        </label>
                        <section v-if="header_logo && header_logo != '' && header_logo == form.company.header_logo" class="relative border" style="width: 250px; height: 141px;">
                          <img :src="onSetLogo('set', header_logo)" style="width: auto; height: 100%;"/>
                        </section>
                        <section class="relative hidden">
                          <vue-croppie
                            ref="header_logo"
                            :enableOrientation="true"
                            :enableResize="false"
                            :boundary="{ width: 250, height: 141 }"
                            :viewport="{ width: 250, height: 141, 'type':'square' }"
                            @update="update('header_logo', 'header_logo')"
                          />
                        </section>
                    </div>

                    <InputField
                      v-if="AUTH_USER.role.name == 'seller'"
                      id="company_name"
                      class="mb-4 mt-4"
                      v-model="form.company.name"
                      type="text"
                      rules="required"
                      :errorMessages="errorMessages.company && errorMessages.company.name"
                      @input="onChange"
                    >
                      <template #label_>
                        <div class="flex flex-row">
                          <Header5 label="Unternehmensname" />
                          <div class="tooltip ml-1">
                            <i
                              v-tippy
                              class="fas fa-info-circle text-base text-gray-700"
                              content="Teile uns hier deinen Firmennamen mit. Dieser Name wird auch auf der Rechnung bei einem Gutscheinverkauf angeführt."
                            />
                          </div>
                        </div>
                      </template>
                    </InputField>

                    <InputField
                      id="username"
                      class="mb-4"
                      v-model="form.username"
                      type="text"
                      :rules="`required|unique:users,username,${form.id}`"
                      :errorMessages="errorMessages.username"
                      :disabled="form.id ? true : false"
                      @input="onChange"
                    >
                      <template #label_>
                        <div class="flex flex-row">
                          <Header5 v-if="AUTH_USER.role.name == 'seller'" label="Name auf Gutschein" />
                          <Header5 v-if="AUTH_USER.role.name == 'user'" label="Benutzername" />
                          <div v-if="AUTH_USER.role.name == 'seller'" class="tooltip ml-1">
                            <i
                              v-tippy
                              class="fas fa-info-circle text-base text-gray-700"
                              content="Wähle einen Wunschnamen als Benutzername. Der Benutzername ist auf dem Gutschein ersichtlich und kann im Nachhinein nicht mehr geändert werden."
                            />
                          </div>
                        </div>
                      </template>
                    </InputField>

                    <TextAreaField
                      id="text"
                      v-model="form.company.description"
                      class="my-2"
                      label="Beschreibung deines Unternehmens"
                      rules="max:800"
                      :errorMessages="errorMessages.description"
                      @input="onChange"
                    />
                    <InputField
                      id="company_web_site"
                      v-model="form.company.url"
                      type="text"
                      class="my-2"
                      label="Webseite"
                      rules=""
                      :errorMessages="errorMessages.url"
                      @input="onChange"
                    />

                    <InputField
                      id="vat_number"
                      v-model="form.company.vat_number"
                      type="text"
                      class="my-2"
                      label="UID Nummer"
                      :errorMessages="errorMessages.vat_number"
                      @input="onChange"
                    />
                  </div>
                  <div class="w-full md:w-1/2">
                    <SelectField
                      id="month"
                      v-model="form.company.region_id"
                      :options="REGIONS"
                      class="my-2"
                      label="Region"
                      rules="required"
                      :errorMessages="errorMessages.region_id"
                      @input="onChange"
                    />


                    <div class="flex flex-col sm:flex-row">
                      <InputField
                        id="city"
                        v-model="form.city"
                        type="text"
                        class="w-full sm:w-1/2 sm:mr-2 mb-4"
                        label="Stadt"
                        :errorMessages="errorMessages.city"
                        @input="onChange"
                      />
                      <InputField
                        id="zip_code"
                        v-model="form.zip_code"
                        type="text"
                        class="w-full sm:w-1/2 sm:ml-2 mb-4"
                        label="Postleitzahl"
                        :errorMessages="errorMessages.zip_code"
                        @input="onChange"
                      />
                    </div>
                     <InputField
                      v-if="AUTH_USER.role.name == 'seller'"
                      id="address"
                      class="mb-4"
                      v-model="form.address"
                      type="text"
                      label="Hausnummer"
                      :errorMessages="errorMessages.address"
                      @input="onChange"
                    />
                    <InputField
                      id="email"
                      class="mb-4"
                      v-model="form.email"
                      type="text"
                      label="Emailadresse "
                      :rules="`required|email|unique:users,email,${form.id}`"
                      :errorMessages="errorMessages.email"
                      @input="onChange"
                    />
                    <InputField
                      v-if="AUTH_USER.role.name == 'seller'"
                      id="phoneNumber"
                      v-model="form.phone_number"
                      type="number"
                      class="w-full mb-4"
                      label="Telefonnummer"
                      :errorMessages="errorMessages.phone_number"
                      rules="required"
                      @input="onChange"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="AUTH_USER.role.name == 'seller' && currentTab == 2"
                class="w-full mmt-5"
              >
                <span class="block font-semibold text-sm mb-4" v-if="AUTH_USER.role.name == 'seller'">Bitte gib den Namen und das Geburtsdatum vom Inhaber oder Geschäftsführer des Unternehmens an.</span>
               <InputField
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  class="w-full mb-4"
                  label="Vorname"
                  rules="required"
                  :errorMessages="errorMessages.firstName"
                  @input="onChange"
                />
                <InputField
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    class="w-full mb-4"
                    label="Nachname"
                    rules="required"
                    :errorMessages="errorMessages.lastName"
                    @input="onChange"
                  />
                <DatePicker
                  v-if="AUTH_USER.role.name == 'seller'"
                  id="data"
                  class="mb-4"
                  v-model="form.bday"
                  label="Geburtsdatum"
                  :errorMessages="errorMessages.phone_number"
                  rules="required"
                  @input="onChange"
                />
               <span class="block font-semibold text-sm mb-4">Um die ersten Auszahlungen zu erhalten musst du dich mittels den genannten Dokumenten verifizieren.</span>
               <span class="block text-sm mb-4">(Personalausweis, Führerschein oder Pass. Bitte lade eine JPEG oder PNG Datei hoch (keine PDF). Foto sollte im Hochformat und gut lesbar sein.)</span>

                  <div class="gap-4 md:grid grid-cols-3">
                    <div class="mb-4">
                      <div
                        v-if="verification_front && verification_front != ''"
                        class="flex max-w-xs mx-2 w-full"
                      >
                        <img
                          style="width: 100%; height: auto;"
                          :src="onSetImage('set', verification_front)"
                          alt=""
                        />
                      </div>
                      <SellerUploadFile
                        v-if="AUTH_USER.role.name == 'seller' && AUTH_USER.isAuth"
                        id="icon"
                        v-model="form.verification_front"
                        class="w-full m-2"
                        inputContainer="py-1 text-xs w-full"
                        label="Vorderseite eines gültigen Ausweise"
                        note=""
                        :isMultiple="false"
                        accept=".jpeg,.png,.jpg"
                        rules="required"
                        :errorMessages="errorMessages.verification_front"
                        @input="(data) => onChangeLogo(data, 'verification_front')"
                      />
                    </div>
                    <div class="mb-4">
                      <div
                        v-if="verification_back && verification_back != ''"
                        class="flex max-w-xs mx-2 w-full"
                      >
                        <img
                          style="width: 100%; height: auto;"
                          :src="onSetImage('set', verification_back)"
                          alt=""
                        />
                      </div>
                      <SellerUploadFile
                        v-if="AUTH_USER.role.name == 'seller' && AUTH_USER.isAuth"
                        id="icon"
                        v-model="form.verification_back"
                        class="w-full m-2"
                        inputContainer="py-1 text-xs w-full"
                        label="Rückseite des gültigen Ausweises"
                        note=""
                        :isMultiple="false"
                        accept=".jpeg,.png,.jpg"
                        rules="required"
                        :errorMessages="errorMessages.verification_back"
                        @input="(data) => onChangeLogo(data, 'verification_back')"
                      />
                    </div>
                    <div class="mb-4">
                      <div
                        v-if="additional_identity && additional_identity != ''"
                        class="flex max-w-xs mx-2 w-full"
                      >
                        <img
                          style="width: 100%; height: auto;"
                          :src="onSetImage('set', additional_identity)"
                          alt=""
                        />
                      </div>
                      <SellerUploadFile
                        v-if="AUTH_USER.role.name == 'seller' && AUTH_USER.isAuth"
                        id="icon"
                        v-model="form.additional_identity"
                        class="w-full m-2"
                        inputContainer="py-1 text-xs w-full"
                        label="Amtliches Dokument mit Adresse deines Unternehmens"
                        note=""
                        :isMultiple="false"
                        accept=".jpeg,.png,.jpg"
                        rules="required"
                        :errorMessages="errorMessages.additional_identity"
                        @input="(data) => onChangeLogo(data, 'additional_identity')"
                      />
                    </div>
                  </div>
              </div>
              <div
                v-if="AUTH_USER.role.name == 'seller' && currentTab == 1"
                class="w-full mt-5 md:flex"
              >
                <div class="w-full md:w-1/2 mb-4">
                  <InputField
                    id="iban"
                    v-model="form.iban"
                    type="text"
                    class="my-2"
                    label="IBAN"
                    :errorMessages="errorMessages.lastName"
                    @input="onChange"
                  />
                  <InputField
                    id="bic"
                    v-model="form.bic"
                    type="text"
                    class="my-2"
                    label="BIC"
                    :errorMessages="errorMessages.lastName"
                    @input="onChange"
                  />
                </div>
                <div class="w-full md:w-1/2 md:px-20  ">
                  <span class="block font-semibold text-sm mb-4">Kommission Marktplatz</span>
                  <div v-if="GLOBAL_SETTING && AUTH_USER.isAuth" class="mb-4 text-sm">
                    {{
                      `Deine Kommission ist ${ settings ? settings.sales_commission_percentage : '5' }% und ${ settings ? $helpers.convertCurrency(settings.sales_commission_euro) : '5,00 €' } pro Verkauf zuzüglich 20% MwSt.`
                    }}
                  </div>
                </div>
              </div>
              <div
                v-if="AUTH_USER.role.name == 'seller' && currentTab == 3"
                class="w-full mt-5 md:flex"
              >
                <ValidationObserver v-slot="{ handleSubmit }" class="w-full md:w-1/2">
                  <form
                    class="flex flex-col w-full"
                    @submit.prevent="handleSubmit(onSubmit)"
                  >
                    <div class="flex flex-col w-full">
                      <InputField
                        id="current_password"
                        v-model="form.current_password"
                        type="password"
                        class="my-2"
                        label="Passwort bestätigen"
                        rules="required|min:8|max:16"
                        :errorMessages="errorMessages.current_password"
                      />
                      <InputField
                        id="new_password"
                        v-model="form.new_password"
                        type="password"
                        class="my-2"
                        label="Neues Passwort"
                        rules="required|min:8|max:16"
                        :errorMessages="errorMessages.new_password"
                      />
                      <InputField
                        id="repeat_password"
                        v-model="form.repeat_password"
                        type="password"
                        class="my-2"
                        label="Passwort wiederholen"
                        rules="required|min:8|max:16|password:@new_password"
                        :errorMessages="errorMessages.repeat_password"
                      />
                    </div>
                    <div class="mt-8 flex">
                      <Button
                        type="submit"
                        label="Speichern"
                        size="w-full py-3 px-4 "
                        round="rounded"
                      />
                    </div>
                  </form>
                </ValidationObserver>
              </div>
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
  import Header2 from '_components/Headers/Header2';
  import InputField from '_components/Form/InputField';
  import Header5 from '_components/Headers/Header5';
  import DatePicker from '_components/Form/DatePickerField';
  import FileInputField from '_components/Form/FileInputField';
  import SellerUploadFile from '_components/Form/SellerUploadFile';
  import SelectField from '_components/Form/SelectField';
  import TextAreaField from '_components/Form/TextAreaField';

  export default {
    name: 'Profile',
    components: {
      MainLayout,
      ProfileForm,
      CompanyForm,
      InputField,
      Button,
      Header2,
      Header5,
      DatePicker,
      FileInputField,
      SellerUploadFile,
      SelectField,
      TextAreaField
    },
    data() {
      return {
        isRouteChanged: false,
        isSubmitted: false,
        errorMessages: [],
        logo: '',
        header_logo: '',
        logoUpdate: false,
        currentTab: 0,
        verification_front: '',
        verification_back: '',
        additional_identity: '',
        form: {
          id: null,
          current_password: '',
          new_password: '',
          repeat_password: '',
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
          company: {
            name: '',
            description: '',
            url: '',
            logo: '',
            header_logo: '',
            region: '',
            vat_number: '',
          },
          verification_front: '',
          verification_back: '',
          additional_identity: '',

        },
        settings: null
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
      GLOBAL_SETTING()
      {
        return this.$store.getters.GLOBAL_SETTING
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
            this.verification_front = this.form.verification_front
            this.verification_back = this.form.verification_back
            this.additional_identity = this.form.additional_identity
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

            this.form.company.logo = this.logo
            this.form.company.header_logo = this.header_logo
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
            if (!this.isRouteChanged) {
              this.isSubmitted = true;
              this.$router.push('/home')
            }

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
                header_logo: user.company.header_logo,
                region: user.company.region,
                region_id: region ? region[0] : '',
                vat_number: user.company.vat_number,
              },
            }
          }
          this.logo = user.company.logo
          this.header_logo = user.company.header_logo
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
      onChangeLogo(data, field) {
        if (data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0]);
          reader.onload = () => {
            this.form[field] = data[0];
            this[field] = reader.result;
            this.onChange();
          };
        } else {
          this[field] = '';
          this.onChange();
        }
      },
      onSetLogo(action, value)
      {
        if( action == 'set' ) {
          return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
        } else {
          this.form.company.logo = ''
          this.logo = ''
        }
      },
      onSetImage(action, value) {
        if (action == 'set') {
          return value.search('base64') < 0
            ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
            : value;
        } else {
          this.form.verification_front = '';
          this.logo = '';
        }
      },
      croppie (e, ref) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        var reader = new FileReader();
        reader.onload = e => {
          this.$refs[ref].$vnode.elm.parentElement.classList.remove('hidden')
          this.$refs[ref].bind({
            url: e.target.result
          });
        };

        reader.readAsDataURL(files[0]);
      },
      // CALBACK USAGE
      crop(ref, form) {
          // Here we are getting the result via callback function
          // and set the result to this.cropped which is being
          // used to display the result above.
          let size = { width: 250, height: 100};
          let options = {
              type: 'base64',
              format: 'jpeg',
              size,
              quality: 1,
          }
          this.$refs[ref].result(options, (output) => {
            this[form] = output
          });
      },
      update(ref, form) {
        this.crop(ref, form)
      },
      removeImage(e, form) {
        e.target.parentElement.classList.add('hidden')
        this.form[form] = ''
        this.form[form + '_update'] = false
      }

    }
  }
</script>
<style lang='css' scoped>
.company-logo {
  width: 250px;
  height: 100px;
  border: 1px solid #ccc;
}
input[type="file"] {
  display: none;
}
</style>