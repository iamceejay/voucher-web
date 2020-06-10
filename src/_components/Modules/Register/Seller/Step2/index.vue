<template>
  <ValidationObserver 
    v-slot="{ handleSubmit, invalid }"
    class="flex w-full h-full"
  >
    <form 
      class="w-full flex flex-col"
      @submit.prevent="handleSubmit(onSubmit(invalid))"
    >
      <Header2
        label="Company Info"
      />
      <CompanyForm
        class="w-full md:w-1/2 my-5"
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
        form: {
          name: '',
          description: '',
          url: '',
          logo: '',
          region: '',
          vat_number: '',
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
    },
    methods: {
      onSubmit( isValid )
      {
        if( !isValid ) {
          this.$emit('onChangeStep', {
            step: 3,
            form: {
              company: {
                ...this.form,
                region: this.form.region_id.label,
                region_id: this.form.region_id.id
              }
            }
          })
        }
      },
      onChange( data )
      {
        this.form = {
          ...this.form,
          ...data
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>