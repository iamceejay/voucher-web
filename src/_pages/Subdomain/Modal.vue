<template>
  <Modal :show="onShowModal" @close="$emit('onCloseModal', false)">
    <template>
      <div class="font-bold text-lg py-2 text-center text-gray-900 text-3xl">
        Subdomain
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <ValidationProvider rules="required" v-slot="{ errors }">
            <vSelect
              label="username"
              :options="sellers"
              v-model="form.user"
              :disabled="form.id"
            />
            <span class="text-xs text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <InputField
            id="name"
            v-model="form.name"
            type="text"
            class="w-full m-auto mt-4"
            label="Subdomain Name"
            placeholder="Entere here"
            rules="required"
          />
          <Button
            class="justify-center"
            :label="`${form.id ? 'Update' : 'Speichern'}`"
            size="mt-1 w-full py-3"
            round="rounded-full"
            type="submit"
          />
        </form>
      </ValidationObserver>
    </template>
  </Modal>
</template>
<script>
import { post } from '_helpers/ApiService';
import Button from '_components/Button/';
import InputField from '_components/Form/InputField';
import Modal from '_components/Modals/';
import SelectField from '_components/Form/SelectField';
import vSelect from 'vue-select';

export default {
  components: {
    InputField,
    Button,
    Modal,
    vSelect,
  },
  props: {
    data: {
      type: Object,
      default() {
        return null;
      },
    },
    sellers: {
      type: Array,
      default() {
        return null;
      },
    },
    onShowModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      example: '<i class="fas fa-book"></i>',
      value: '',
      form: {
        id: null,
        user: '',
        name: '',
        icon: '',
      },
    };
  },
  computed: {
    CATEGORIES() {
      return this.$store.getters.CATEGORIES;
    },
  },
  watch: {
    onShowModal() {
      this.value = '';
      this.onSetForm();
    },
  },
  mounted() {
    this.onSetForm();
  },
  methods: {
    async onSubmit() {
      try {
        const url = this.form.id ? 'UPDATE_SUBCATEGORY' : 'ADD_SUBCATEGORY';
        let form = {
          id: this.form.id,
          name: this.form.name,
        };

        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
        await post(`user/company/update/${this.form.user.id}`, form);
        this.$emit('onCloseModal', true);
        this.form = {
          id: null,
          user: '',
        };
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      } catch (err) {
        console.log(err);
        if( err?.response?.status == 422 ) {
          this.$swal({
            icon: 'warning',
            title: 'Warnung!',
            text: err.response.data.message,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
          })
        }
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      }
    },
    onSetForm() {
      this.form = this.data?.id
        ? {
            id: true,
            user: this.data,
            name: this.data.subdomain,
          }
        : {
            id: null,
            name: '',
            icon: '',
          };
    },
  },
};
</script>
<style lang="css" scoped></style>
