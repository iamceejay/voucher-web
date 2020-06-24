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
        label="Auszahlungsinfo"
      />
      <PayoutForm
        class="w-full md:w-1/2 "
        :errorMessages="errorMessages"
        @onChange="onChange"
      />
      <Header2
        label="Legal"
      />
      <CheckboxField
        id="dataPrivacy"
        v-model="form.dataPrivacy"
        type="text"
        container="mx-2 mb-0"
        :rules="{ required: { allowFalse: false } }"
      >
        <template #labelSentence_>
          <label class="text-xs p-1 mt-1 font-bold text-gray-900 font-body">
            Ich akzeptiere die
            <a 
              class="text-blue-700" 
              href="https://verkaufen.epasnets.com/datenschutz" 
              target="_blank"
            >
              Datenschutzerklärung.
            </a>
          </label>
        </template>
      </CheckboxField>
      <CheckboxField
        id="terms"
        v-model="form.terms"
        type="text"
        container="mx-2 mb-0"
        :rules="{ required: { allowFalse: false } }"
      >
        <template #labelSentence_>
          <label class="text-xs p-1 mt-1 font-bold text-gray-900 font-body">
            Ich akzeptiere die
            <a 
              class="text-blue-700" 
              href="https://verkaufen.epasnets.com/agb" 
              target="_blank"
            >
              Nutzungsbedingungen.
            </a>
          </label>
        </template>
      </CheckboxField>
      <CheckboxField
        id="commision"
        v-model="form.commision"
        type="text"
        container="mx-2 mb-5"
        :labelSentence="`Ich akzeptiere die Kommision von ${ GLOBAL_SETTING ? GLOBAL_SETTING.sales_commission_percentage : '5' }% des Umsatzes und ${ GLOBAL_SETTING ? $helpers.convertCurrency(GLOBAL_SETTING.sales_commission_euro) : '5,00 €' } pro Gutscheinverkauf.`"
        :rules="{ required: { allowFalse: false } }"
      />
      <Button
        type="submit"
        label="Registrierung abschließen"
        size="w-full sm:w-1/2 py-4 mx-2"
        round="rounded-full"
      />
    </form>
  </ValidationObserver>
</template>
<script>
  import Button from '_components/Button';
  import PayoutForm from '_components/Modules/Profile/Form/PayoutForm';
  import CheckboxField from '_components/Form/CheckboxField';
  import Header2 from '_components/Headers/Header2';

  export default {
    components: {
      PayoutForm,
      CheckboxField,
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
          dataPrivacy: false,
          terms: false,
          commission: false,
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      GLOBAL_SETTING()
      {
        return this.$store.getters.GLOBAL_SETTING
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
            step: 'done',
            form: this.form
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