<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    class="flex flex-col w-full h-full items-center"
  >
    <form
      class="w-full flex flex-col items-center"
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
        label="Bedingungen"
      />
      <div class="flex flex-col w-full md:w-1/2">
        <CheckboxField
          id="dataPrivacy"
          v-model="form.dataPrivacy"
          type="text"
          container="mb-0"
          :rules="{ required: { allowFalse: false } }"
        >
          <template #labelSentence_>
            <label class="text-xs px-1 py-0 mt-0 font-bold text-gray-900 font-body">
              Ich akzeptiere die
              <a
                class="text-peach underline"
                href="https://about.epasnets.com/datenschutz/"
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
          container="mb-0"
          :rules="{ required: { allowFalse: false } }"
        >
          <template #labelSentence_>
            <label class="text-xs px-1 py-0 mt-0 font-bold text-gray-900 font-body">
              Ich akzeptiere die
              <a
                class="text-peach underline"
                href="https://about.epasnets.com/agb/"
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
          container="mb-5"
          :labelSentence="`Ich akzeptiere die Kommision von ${ GLOBAL_SETTING ? GLOBAL_SETTING.sales_commission_percentage : '5' }% des Umsatzes und ${ GLOBAL_SETTING ? $helpers.convertCurrency(GLOBAL_SETTING.sales_commission_euro) : '5,00 €' } pro Gutscheinverkauf zuzüglich 20% MwSt.`"
          :rules="{ required: { allowFalse: false } }"
        />
      </div>
      <div class="w-full sm:w-1/2">
        <Button
          class="flex flex-col items-center w-full"
          type="submit"
          label="Registrierung abschließen"
          size="w-full py-4"
          round="rounded"
        />
      </div>
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
    mounted() {
      document.getElementById('register-header').scrollIntoView();
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