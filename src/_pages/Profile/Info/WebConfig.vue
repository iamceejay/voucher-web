<template>
  <MainLayout>
    <template #content>
      <div
        v-if="!IS_LOADING.status"
        class="content-container flex flex-col w-full px-8"
      >
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <form
            class="w-full flex flex-col"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div
              class="border-b border-gray-400 flex items-center justify-between pb-5"
            >
              <span class="text-xl font-medium">Gutschein Webseite</span>
              <button
                type="submit"
                class="company-bg-color px-5 py-3 rounded-md text-sm text-white"
              >
                Speichern
              </button>
            </div>
            <div class="bg-white my-8 p-6 w-full">
              <div class="w-full">
                <div class="md:flex flex-row md:space-x-6 w-full">
                  <div class="w-full md:w-1/2">
                    <div>
                      <span class="block mb-1 text-sm">Logo</span>
                      <label
                        class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs text-center cursor-pointer"
                        style="background-color: rgb(247, 247, 247);"
                      >
                        <ValidationProvider rules="" name="logo">
                          <i
                            class="fa fa-cloud-upload-alt mb-2 mr-1 text-3xl text-center"
                          ></i>
                          (Ideales Maß ist 250px x 100px)
                          <input
                            type="file"
                            accept="'image/*'"
                            aria-label="File browser example"
                            @change="(e) => croppie(e, 'logo')"
                          />
                          <span class="file-custom"></span>
                        </ValidationProvider>
                      </label>
                      <section
                        v-if="logo && logo != '' && logo == form.company.logo"
                        class="relative border"
                        style="width: 250px; height: 100px;"
                      >
                        <img
                          :src="onSetLogo('set', logo)"
                          style="width: auto; height: 100%;"
                        />
                      </section>
                      <section class="relative reset-hidden hidden">
                        <vue-croppie
                          ref="logo"
                          :enableOrientation="true"
                          :enableResize="false"
                          :boundary="{ width: 250, height: 100 }"
                          :viewport="{
                            width: 250,
                            height: 100,
                            type: 'square',
                          }"
                          @update="update('logo', 'logo')"
                        />
                      </section>
                    </div>

                    <div>
                      <span class="block mb-1 text-sm">Titelbild</span>
                      <label
                        class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs text-center cursor-pointer"
                        style="background-color: rgb(247, 247, 247);"
                      >
                        <i
                          class="fa fa-cloud-upload-alt mb-2 mr-1 text-3xl text-center"
                        ></i>
                        (Ideales Maß ist 1920px x 1080px)
                        <ValidationProvider rules="" name="header_logo">
                          <input
                            type="file"
                            accept="'image/*'"
                            aria-label="File browser example"
                            @change="(e) => croppie(e, 'header_logo')"
                          />
                        </ValidationProvider>
                        <span class="file-custom"></span>
                      </label>
                      <section
                        v-if="
                          header_logo &&
                            header_logo != '' &&
                            header_logo == form.company.header_logo
                        "
                        class="relative border"
                        style="width: 250px; height: 141px;"
                      >
                        <img
                          :src="onSetLogo('set', header_logo)"
                          style="width: auto; height: 100%;"
                        />
                      </section>
                      <section class="relative reset-hidden hidden">
                        <vue-croppie
                          ref="header_logo"
                          :enableOrientation="true"
                          :enableResize="false"
                          :boundary="{ width: 384, height: 216 }"
                          :viewport="{
                            width: 384,
                            height: 216,
                            type: 'square',
                          }"
                          @update="update('header_logo', 'header_logo')"
                        />
                      </section>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2">
                    <InputField
                      id="address"
                      class="mb-4"
                      v-model="form.company.header_1"
                      type="text"
                      label="Titel 1"
                      :errorMessages="errorMessages.title_1"
                      @input="onChange"
                    />
                    <InputField
                      id="email"
                      class="mb-4"
                      v-model="form.company.header_2"
                      type="text"
                      label="Titel 2"
                      :errorMessages="errorMessages.title_2"
                      @input="onChange"
                    />
                    <div class="flex mt-8">
                      <colorpicker
                        v-model="form.company.background_color"
                        :color="form.company.background_color"
                        :label="'Unternehmens Farbe'"
                      />
                      <div
                        class="grid grid-cols-3 items-end relative w-full mb-1"
                      >
                        <label class="text-sm col-span-2">Schriftfarbe</label>
                        <span>
                          <toggle-button
                            :color="{
                              checked: '#000',
                              unchecked: '#fff',
                              disabled: '#CCCCCC',
                            }"
                            :switch-color="{
                              checked: '#fff',
                              unchecked: '#000',
                              disabled: '#CCCCCC',
                            }"
                            :value="
                              form.company.text_color == '#000' ? true : false
                            "
                            @change="
                              (e) =>
                                (form.company.text_color = e.value
                                  ? '#000'
                                  : '#fff')
                            "
                          />
                        </span>
                      </div>
                    </div>
                    <div
                      class="grid grid-cols-3 items-end relative w-full mb-1"
                    >
                      <label class="text-sm col-span-1">Feld ausblenden</label>
                      <span>
                        <toggle-button
                          :color="{
                            checked: '#000',
                            unchecked: '#fff',
                            disabled: '#CCCCCC',
                          }"
                          :switch-color="{
                            checked: '#fff',
                            unchecked: '#000',
                            disabled: '#CCCCCC',
                          }"
                          :value="form.company.is_header_show"
                          @change="
                            (e) => (form.company.is_header_show = e.value)
                          "
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex md:space-x-6 w-full mt-4">
                <div class="w-full md:w-1/2">
                  <label class="text-sm col-span-2 block">Unterdomäne</label>
                  <div class="block border mt-2 mx-auto relative w-full xl:flex">
                    <input
                      id="subdomain"
                      name="clipboard"
                      type="text"
                      class="flex-1 input-copy px-4 py-2 rounded w-full"
                      v-model="form.subdomain"
                      disabled
                    />
                    <input
                      id="copy-text"
                      type="text"
                      v-model="form.subdomain"
                      class="absolute opacity-0"
                    />
                    <button
                      data-clipboard-target="#copy-text"
                      type="button"
                      class="bg-black clipboard mt-3 px-5 py-3 rounded text-sm text-white w-full xl:mt-0 xl:w-auto"
                    >
                      Link kopieren
                    </button>
                  </div>
                </div>
                <div class="w-full md:w-1/2">
                  <InputField
                      id="email"
                      class="mb-4"
                      v-model="form.company.link"
                      type="text"
                      label="Link zu Impressum"
                      :errorMessages="errorMessages.link"
                      @input="onChange"
                    />
                </div>
              </div>

              <div class="flex md:space-x-6 w-full mt-4">
                <div class="w-full md:w-1/2">

                  <InputField
                    id="email"
                    class="mb-4"
                    v-model="form.company.text_1"
                    type="text"
                    label="Text 1"
                    :errorMessages="errorMessages.title_2"
                    @input="onChange"
                  />
                  <InputField
                    id="email"
                    class="mb-4"
                    v-model="form.company.text_2"
                    type="text"
                    label="Text 2"
                    :errorMessages="errorMessages.title_2"
                    @input="onChange"
                  />
                  <InputField
                    id="email"
                    class="mb-4"
                    v-model="form.company.text_3"
                    type="text"
                    label="Text 3"
                    :errorMessages="errorMessages.title_3"
                    @input="onChange"
                  />
                </div>

                <div class="w-full md:w-1/2">
                  <InputField
                    id="address"
                    class="mb-4"
                    v-model="form.company.icon_1"
                    type="text"
                    label="Icon 1"
                    :errorMessages="errorMessages.title_1"
                    @input="onChange"
                  />
                  <span class="block text-xs mb-3">Get <a href="https://icons.getbootstrap.com/" class="text-blue-500 font-medium">icons</a> here and copy its name.</span>
                  <InputField
                    id="address"
                    class="mb-4"
                    v-model="form.company.icon_2"
                    type="text"
                    label="Icon 2"
                    :errorMessages="errorMessages.title_1"
                    @input="onChange"
                  />
                  <span class="block text-xs mb-3">Get <a href="https://icons.getbootstrap.com/" class="text-blue-500 font-medium">icons</a> here and copy its name.</span>
                  <InputField
                    id="address"
                    class="mb-4"
                    v-model="form.company.icon_3"
                    type="text"
                    label="Icon 3"
                    :errorMessages="errorMessages.title_1"
                    @input="onChange"
                  />
                  <span class="block text-xs mb-3">Get <a href="https://icons.getbootstrap.com/" class="text-blue-500 font-medium">icons</a> here and copy its name.</span>

                </div>
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
import InputField from '_components/Form/InputField';
import Colorpicker from '_components/Colorpicker';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  name: 'Web Config',
  components: {
    MainLayout,
    InputField,
    Colorpicker,
    ToggleButton,
  },
  data() {
    return {
      isRouteChanged: false,
      isSubmitted: false,
      errorMessages: [],
      logo: '',
      header_logo: '',
      logoUpdate: false,
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
          link: '',
          name: '',
          description: '',
          url: '',
          logo: '',
          header_logo: '',
          region: '',
          vat_number: '',
          header_1: '',
          header_2: '',
          icon_1: '',
          text_1: '',
          icon_2: '',
          text_2: '',
          icon_3: '',
          text_3: '',
        },
        verification_front: '',
        verification_back: '',
        additional_identity: '',
      },
      settings: null,
      verification: {
        front: undefined,
        back: undefined,
        identity: undefined,
      },
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    REGIONS() {
      return this.$store.getters.REGIONS;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
    GLOBAL_SETTING() {
      return this.$store.getters.GLOBAL_SETTING;
    },
    isFormDirty() {
      return Object.keys(this.$refs.observer.fields).some(
        (key) => this.$refs.observer.fields[key].dirty
      );
    },
  },
  watch: {},
  mounted() {
    (async () => {
      this.currentTab = this.$route.query.currentTab || 0;
      try {
        var clipboard = new ClipboardJS('.clipboard');
        clipboard.on('success', (e) => {
          let processing = this.$swal({
            title: 'Erfolgreich!',
            text: 'Link wurde kopiert',
            allowOutsideClick: false,
            showConfirmButton: false,
          });
          setTimeout(() => {
            processing.close();
          }, 2000);
          e.clearSelection();
        });

        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.onFetchUser();
        if (this.AUTH_USER.role.name == 'seller') {
          await this.$store.commit('SET_GLOBAL_SETTING', null);
          await this.onFetchGlobalSetting();
          await this.onFetchUserSetting();
          this.verification_front = this.form.verification_front;
          this.verification_back = this.form.verification_back;
          this.additional_identity = this.form.additional_identity;

          this.verification.front =
            this.verification_front != '' ? this.verification_front : undefined;
          this.verification.back =
            this.verification_back != '' ? this.verification_back : undefined;
          this.verification.identity =
            this.additional_identity != ''
              ? this.additional_identity
              : undefined;
        }
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    async onSubmit() {
      try {
        this.errorMessages = [];
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
        if (this.AUTH_USER.role.name == 'seller') {
          if (this.form?.company?.region_id) {
            this.form.company.region = this.form.company.region_id.label;
            delete this.form.company.region_id;
          }

          this.form.company.logo = this.logo;
          this.form.company.header_logo = this.header_logo;
        }

        const data = await this.$store.dispatch('UPDATE_USER', this.form);
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
        document
          .querySelectorAll('.reset-hidden')
          .forEach((el) => el.classList.add('hidden'));
        window.location.reload();
        let confirm = this.$swal({
          icon: 'success',
          title: 'Erfolgreich!',
          text: 'Info aktualisiert.',
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        setTimeout(() => {
          confirm.close();
          if (!this.isRouteChanged) {
            this.isSubmitted = true;
            this.$route.query.currentTabr.push('/home');
          }
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.log(err.response);

        if (
          err?.response?.status == 500 &&
          err?.response?.data?.message.indexOf('account is verified') != -1
        ) {
          this.$swal({
            icon: 'warning',
            title: 'Achtung!',
            text:
              'You cannot change verification file if an account is verified',
            confirmButtonColor: '#48BB78',
          });
        }

        if (err?.response?.status == 422) {
          this.errorMessages = err.response.data.errors;
        }
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      }
    },
    onChange(data) {
      this.form = {
        ...this.form,
        ...data,
      };
    },
    async onFetchUser() {
      try {
        const { user } = await this.$store.dispatch('FETCH_USER', {
          id: this.AUTH_USER.data.id,
        });

        if (!user.subdomain) {
          this.$swal({
            title: 'Subdomain not found',
            text: 'Subdomain is not registered yet.',
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
            timer: 2000,
            timerProgressBar: true,
          }).then((result) => {
          });
        }


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
          subdomain: user.subdomain ? user.subdomain + '.' + window.location.hostname : '',
        };

        const region = this.REGIONS.filter(
          (row) => user.company.region == row.label
        );
        params = {
          ...params,
          company: {
            ...user.company,
            name: user.company.name,
            description: user.company.description,
            url: user.company.url,
            logo: user.company.logo,
            header_logo: user.company.header_logo,
            region: user.company.region,
            region_id: region ? region[0] : '',
            vat_number: user.company.vat_number,
            background_color: user.company.background_color
              ? user.company.background_color
              : '#ff5563',
            text_color: user.company.text_color
              ? user.company.text_color
              : '#fff',
          },
        };
        this.logo = user.company.logo;
        this.header_logo = user.company.header_logo;
        this.form = params;
      } catch (err) {
        console.log('err', err);
      }
    },
    async onFetchGlobalSetting() {
      try {
        const { data } = await this.$store.dispatch('FETCH_GLOBAL_SETTING', 1);
      } catch (err) {
        console.log('err', err);
      }
    },
    async onFetchUserSetting() {
      try {
        const data = await this.$store.dispatch('FETCH_USER_SETTING_BY_USER', {
          user_id: this.AUTH_USER.data.id,
        });
        this.settings = data.user_setting;
      } catch (err) {
        console.log('err', err);
      }
    },
    onChangeLogo(data, field) {
      if (data.length > 0) {
        let reader = new FileReader();
        reader.readAsDataURL(data[0]);
        reader.onload = () => {
          this.form[field] = data[0];
          this[field] = reader.result;
          this.verification[field.split('_')[1]] = undefined;
          this.onChange();
        };
      } else {
        this[field] = '';
        this.onChange();
      }
    },
    onSetLogo(action, value) {
      if (action == 'set') {
        return value.search('base64') < 0
          ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
          : value;
      } else {
        this.form.company.logo = '';
        this.logo = '';
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
    croppie(e, ref) {
      this.$refs.observer.fields[ref].dirty = true;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs[ref].$vnode.elm.parentElement.classList.remove('hidden');
        this.$refs[ref].bind({
          url: e.target.result,
        });
      };

      reader.readAsDataURL(files[0]);
    },
    // CALBACK USAGE
    crop(ref, form) {
      // Here we are getting the result via callback function
      // and set the result to this.cropped which is being
      // used to display the result above.
      let size = { width: 250, height: 100 };

      if (form == 'header_logo') {
        size = { width: 1920, height: 1080 };
      }

      let options = {
        type: 'base64',
        format: 'jpeg',
        size,
        quality: 1,
      };
      this.$refs[ref].result(options, (output) => {
        this[form] = output;
      });
    },
    update(ref, form) {
      this.crop(ref, form);
    },
    removeImage(e, form) {
      e.target.parentElement.classList.add('hidden');
      this.form[form] = '';
      this.form[form + '_update'] = false;
    },
  },
};
</script>
<style lang="css" scoped>
.company-logo {
  width: 250px;
  height: 100px;
  border: 1px solid #ccc;
}
input[type='file'] {
  display: none;
}
</style>
