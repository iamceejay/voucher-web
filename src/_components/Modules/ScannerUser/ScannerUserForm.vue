<template>
  <div class="flex flex-col w-full">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form 
        class="w-full flex flex-col"
        @submit.prevent="handleSubmit(onSubmit(invalid))"
      >
        <InputField
          id="username"
          class="mb-5"
          v-model="form.username"
          type="text"
          label="Benutzername"
          :rules="`required|unique:users,username,${form.id}`"
        />
        <InputField
          id="email"
          class="mb-5"
          v-model="form.email"
          type="email"
          label="E-Mail "
          :rules="`required|email|unique:users,email,${form.id}`"
        />
        <InputField
          id="password"
          class="mb-5"
          v-model="form.password"
          type="password"
          label="Passwort"
          rules="required|min:8|max:16"
        />
        <!-- <p class="text-center px-8 py-4 text-xs text-gray-700 font-semibold font-body">
          Ein Scan Benutzer kann nur Gutscheine für dein Unternehmen einlösen. Alle weiteren Funktionen sind für diesen Benutzer nicht sichtbar. 
        </p> -->
        <div class="flex flex-wrap">
          <Button
            class="mr-4"
            type="submit"
            label="Speichern"
            fontWeight="font-normal"
            size="py-4 px-8"
            round="rounded"
          />
          <Button
            label="Abbrechen"
            fontWeight="font-normal"
            size="py-4 px-8"
            round="rounded"
            @onClick="() => $emit('onButtonClick')"
          />
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';
  import Button from '_components/Button'

  export default {
    components: {
      InputField,
      Button,
    },
    props: {
    },
    data() {
      return {
        form: {
          id: null,
          username: '',
          password: '',
          email: '',
        }
      }
    },
    mounted() {
    },
    methods: {
      async onSubmit( isValid )
      {
        if( !isValid ) {
          try {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('ADD_SCANNER_USER', this.form)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.form = {
              id: null,
              username: '',
              password: '',
              email: '',
            }
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Adding new user.',
              allowOutsideClick: false,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            });
            this.$router.push('/scanner-users')
          } catch (err) {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            console.log('err', err)
          }
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>