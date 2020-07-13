<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status && VOUCHER" class="content-container w-full flex flex-col px-8">
        <div class="flex flex-col w-full">
          <VoucherCard
            class="self-center"
            :voucher="VOUCHER"
            :isFlippable="false"
            :withQR="false"
          />
          <div v-if="!AUTH_USER.isAuth" class="py-2 text-sm text-center px-2">
            Logge dich ein oder registriere dich, um Gutscheine zu kaufen.
          </div>
          <router-link 
            class="self-center w-full md:w-1/2"
            :to="`/seller/${VOUCHER.seller_id}`"
          >
            <Button
              label="Mehr Infos über den Verkäufer"
              size="w-full py-1"
              round="rounded-full"
            />
          </router-link>
        </div>
        <ValidationObserver
          v-if="AUTH_USER.isAuth && AUTH_USER.role.name != 'admin'"
          v-slot="{ handleSubmit }"
        >
          <form 
            class="flex flex-col w-full mt-8"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <InputField
              id="value"
              v-model="form.value"
              type="number"
              class="w-full md:w-1/2 self-center"
              :label="`Gib deine ${ (VOUCHER.type == 'quantity') ? `Bestellmenge (${$helpers.convertCurrency(VOUCHER.price_filter)} pro Gutschein)` : 'Wunschbetrag' } an`"
              placeholder="Hier eingeben"
              :rules="`required|${ (VOUCHER.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_min : VOUCHER.val_min }|max_value:${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_max : VOUCHER.val_max }`"
              :note="`
              ${
                (VOUCHER.type == 'quantity')
                  ? `Menge zwischen x${VOUCHER.qty_min} und x${VOUCHER.qty_max}`
                  : `Wert zwischen ${$helpers.convertCurrency(VOUCHER.val_min)} und ${$helpers.convertCurrency(VOUCHER.val_max) }`
              }
              `"
              :disabled="isAdded ? true : false"
            />
            <div class="flex flex-col mt-3 self-center text-center">
              <span class="text-2xl">Preis</span>
              <span class="text-2xl font-bold">
                {{ $helpers.convertCurrency(form.value * ( (VOUCHER.type != 'quantity') ? 1 : VOUCHER.qty_val )) }}
              </span>
            </div>
            <Button
              class="self-center w-full md:w-1/2 mt-3 "
              :label="`zum Warenkorb hinzufügen`"
              :icon="`${ isAdded ? 'check' : '' }`"
              size="w-full py-3"
              round="rounded-full"
              :type="`${ isAdded ? 'button' : 'submit' }`"
              @onClick=" isAdded ? onRemoveCart() : null"
            />
          </form>
        </ValidationObserver>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import VoucherCard from '_components/List/Modules/VoucherList/VoucherCard/'
  import InputField from '_components/Form/InputField'
  import Button from '_components/Button'

  export default {
    name: 'Vouchers',
    components: {
      MainLayout,
      VoucherCard,
      InputField,
      Button,
    },
    data() {
      return {
        form: {
          id: null,
          voucher_id: null,
          user_id: null,
          value: null,
          qty: null,
          total_amount: 0,
        },
        symbol: '',
        isAdded: false,
      }
    },
    computed: {
      VOUCHER()
      {
        return this.$store.getters.VOUCHER
      },
      CARTS()
      {
        return this.$store.getters.CARTS
      },
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      }
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchVoucher()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onSubmit()
      {
        this.form.total_amount = this.form.value * ( (this.VOUCHER.type != 'quantity') ? 1 : this.VOUCHER.qty_val )
        this.$swal({
          title: 'Im Warenkorb hinzufügen',
          text: `Bist du sicher, dass du diesen Gutschein zum Warenkorb hinzufügen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              this.form.total_amount = this.form.value * ( (this.VOUCHER.type != 'quantity') ? 1 : this.VOUCHER.qty_val )
              this.form.user_id = this.AUTH_USER.data.id
              this.form.voucher_id = this.VOUCHER.id
              if( this.VOUCHER.type == 'quantity' ) {
                this.form.qty = this.form.value
                this.form.value = null
              } else {
                this.form.value = this.form.value
              }
              const data = await this.$store.dispatch('ADD_WALLET', this.form)
              this.form = {
                id: null,
                voucher_id: null,
                user_id: null,
                value: null,
                qty: null,
                value: 0,
                total_amount: 0,
              }
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              let confirm = this.$swal({
                icon: 'success',
                title: 'Erfolgreich!',
                text: 'Die Gutscheine wurden in den Warenkorb gelegt.',
                allowOutsideClick: false,
                showConfirmButton: false
              })
              setTimeout(() => {
                confirm.close()
                this.$router.push('/home')
              }, 1000)
            } catch (err) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'warning',
                title: 'Achtung! ',
                text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
                confirmButtonColor: '#6C757D',
              })
            }
          }   
        })
      },
      async onRemoveCart()
      {
        this.$swal({
          title: 'Vom Warenkorb entfernen',
          text: `Bist du sicher, dass du diesen Gutschein vom Warenkorb entfernen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            const newData = this.CARTS.filter( cart => this.form.id != cart.id )
            await this.$store.commit('SET_CARTS', newData)
            this.isAdded = false
            this.form = {
              id: null,
              user_id: null,
              value: null,
              type: '',
              voucher: null
            }
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Removing the voucher.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      },
      async onFetchVoucher()
      {
        try {
          await this.$store.dispatch('FETCH_VOUCHER', {
            id: this.$route.params.id
          })
          this.symbol = (this.VOUCHER.type == 'quantity') ? 'x' : '€'
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>