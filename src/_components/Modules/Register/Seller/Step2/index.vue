<template>
  <ValidationObserver 
    v-slot="{ handleSubmit }"
    class="flex w-full h-full"
  >
    <form 
      class="w-full flex flex-col"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <Header2
        label="Company Info"
      />
      <CompanyForm
        class="w-full md:w-1/2 my-5"
        :data="form"
        :errorMessages="errorMessages"
        @onChange="onChange"
      />
      <Button
        type="submit"
        label="Next Step >"
        size="w-full sm:w-1/2 py-3 mx-3"
        round="rounded-full"
      />
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
          step: 3,
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
        console.log('this.form step 2', this.form)
      },
      onSetForm()
      {
        if( this.data ) {
          this.form = {
            ...this.form,
            ...this.data
          }
          console.log('this.form', this.form)
        }
      }, 
    }
  }
</script>
<style lang='css' scoped>
</style>