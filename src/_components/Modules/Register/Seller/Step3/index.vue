<template>
  <ValidationObserver
    v-slot="{ handleSubmit }"
    class="flex flex-col w-full h-full items-center"
  >
    <form
      class="w-full flex flex-col items-center"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <Header2
        label="Unternehmensinfo"
      />
      <CompanyForm
        class="w-full md:w-1/2 my-5"
        :data="form"
        :errorMessages="errorMessages"
        @onChange="onChange"
      />
      <div class="w-full sm:w-1/2">
        <Button
          class="flex flex-col items-center w-full"
          type="submit"
          label="nächster Schritt >"
          size="w-full py-4"
          round="rounded"
        />
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
  import Button from '_components/Button';
  import CompanyForm from '_components/Modules/Profile/Form/CompanyForm';
  import Header2 from '_components/Headers/Header2';

  export default {
    components: {
      CompanyForm,
      Button,
      Header2
    },
    props: {
      data: {
        type: Object,
        default() {
          return null
        }
      },
      errorMessages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        submitting: false,
        // form: {
        //   name: '',
        //   description: '',
        //   url: '',
        //   logo: '',
        //   region: '',
        //   vat_number: '',
        // }
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
          password: '',
          confirmPassword: '',
          company: {
            name: '',
            description: '',
            url: '',
            logo: '',
            region: '',
            vat_number: ''
          }
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
    },
    watch: {
    },
    created() {
      this.onSetForm()
    },
    methods: {
      onSubmit()
      {
        this.$emit('onChangeStep', {
          step: 4,
          form: {
            ...this.form,
            company: {
              ...this.form.company,
              region: this.form.company.region_id.label,
              region_id: this.form.company.region_id.id
            }
          }
        })
      },
      onChange( data )
      {
        this.form = {
          ...this.form,
          ...data,
        }
      },
      onSetForm()
      {
        if( this.data ) {
          this.form = {
            ...this.form,
            ...this.data
          }
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>