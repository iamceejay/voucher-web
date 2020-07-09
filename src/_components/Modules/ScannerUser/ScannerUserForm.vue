<template>
  <div class="flex flex-col w-full md:w-1/2">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form 
        class="w-full flex flex-col"
        @submit.prevent="handleSubmit(onSubmit(invalid))"
      >
        <InputField
          id="username"
          v-model="form.username"
          type="text"
          class="mx-2"
          placeholder="Benutzername"
          :rules="`required|unique:users,username,${form.id}`"
        />
        <InputField
          id="email"
          v-model="form.email"
          type="email"
          class="mx-2"
          placeholder="Emailadresse "
          :rules="`required|email|unique:users,email,${form.id}`"
        />
        <InputField
          id="password"
          v-model="form.password"
          type="password"
          class="mx-2"
          placeholder="Password"
          rules="required|min:8|max:16"
        />
        <p class="text-center px-8 py-4 text-xs text-gray-700 font-semibold font-body">
          Ein Scan Benutzer kann nur Gutscheine für dein Unternehmen einlösen. Alle weiteren Funktionen sind für diesen Benutzer nicht sichtbar. 
        </p>
        <Button
          type="submit"
          class="py-2"
          label="Speichern"
          size="w-full py-3"
          round="rounded-full"
          fontSize="text-xs"
        />
        <router-link to="/scanner-users">
          <Button
            class="py-2"
            label="Abbrechen"
            size="w-full py-3"
            round="rounded-full"
            fontSize="text-xs"
          />
        </router-link>
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
              confirmButtonColor: '#6C757D',
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