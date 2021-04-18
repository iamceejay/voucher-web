<template>
  <MainLayout :showBackButton="false">
    <template #content>
      <div v-if="!IS_LOADING.status " class="content-container w-full flex flex-col px-8 -mt-10">
        <div class="border-b-2 border-input-border flex items-center justify-between mb-10 pb-3">
          <div class="font-medium mb-1 text-2xl">Meine Gutscheine</div>
          <router-link
            to="/vouchers/new"
          >
            <Button
              class=""
              size="w-10 h-10"
              round="rounded"
              icon="fas fa-plus text-2xl"
              :fullIconClass="true"
              @onClick="onSSO('#')"
            />
          </router-link>
        </div>
        <div class="border-b-2 flex flex-wrap items-start mb-8 pb-8">
          <div class="max-w-md mr-4 relative w-full">
            <div class="absolute inset-0 z-10"></div>
            <VoucherCard
              :voucher="voucher"
              role="seller"
              :withQR="false"
            />
          </div>
          <div class="flex flex-col">
            <div class="border p-6 w-full flex flex-col" style="max-width: 240px">
              <span class="font-semibold text-sm text-peach mb-4">Statistik</span>
              <div class="text-sm flex flex-col mb-3">
                <span class="text-black text-opacity-50">Gutscheine verkauft: </span>
                <span class="font-semibold">{{ stats[2].value }} Stück</span>
              </div>

              <div class="text-sm flex flex-col mb-3">
                <span class="text-black text-opacity-50">Umsatz: </span>
                <span class="font-semibold">{{ stats[3].value }}</span>
              </div>

              <div class="text-sm flex flex-col mb-3">
                <span class="text-black text-opacity-50">Eingelöst:  </span>
                <span class="font-semibold">{{ stats[7].value }}</span>
              </div>
            </div>
            <div class="mt-10 flex flex-col">
              <router-link
                class="px-3 py-3 rounded-md text-xs border border-black bg-black text-white mb-3 text-center"
                :to="`/vouchers/update/${$route.params.id}`"
                >
                Gutschein bearbeiten
              </router-link>
              <button
                class="px-5 py-3 rounded-md text-xs border border-black text-black mb-3"
                @click="onDelete(voucher)"
                >
                Gutschein löschen
              </button>
              <button
                class="px-5 py-3 rounded-md text-xs border border-black text-black"
                @click="onDeact(voucher)"
                >
                {{ voucher.is_active ? 'Deaktivieren' : 'Aktivieren' }}
              </button>
            </div>

          </div>
        </div>
        <!-- <StatisticList
          :data="stats"
        /> -->
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import StatisticList from '_components/List/Modules/StatisticList/';
  import Header1 from '_components/Headers/Header1';
  import Button from '_components/Button';
  import VoucherCard from '_components/List/Modules/VoucherDisplay/VoucherCard'

  export default {
    name: 'Vouchers',
    components: {
      MainLayout,
      StatisticList,
      Header1,
      Button,
      VoucherCard
    },
    data() {
      return {
        stats: [],
        voucher: null,
      }
    },
    computed: {
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
      async onFetchVoucher()
      {
        try {
          const data = await this.$store.dispatch('FETCH_VOUCHER', {
            id: this.$route.params.id,
            with_stat: true
          })
          this.voucher = data.voucher
          await this.onSetStats(data)
        } catch (err) {
          console.log('err', err)
        }
      },
      onSetStats(data)
      {
        this.stats = [
          // {
          //   type: 'Vouchers',
          //   title: 'sold this day',
          //   value: data.daily_voucher_sold
          // }
          // ,{
          //   type: 'Earnings',
          //   title: 'this day',
          //   value: `${this.$helpers.convertCurrency(data.daily_earnings)}`
          // }
          {
            type: 'Gutscheine',
            title: 'diese Woche verkauft',
            value: data.weekly_voucher_sold
          }
          ,{
            type: 'Umsatz',
            title: 'diese Woche',
            value: `${this.$helpers.convertCurrency(data.weekly_earnings)}`
          }
          // ,{
          //   type: 'Vouchers',
          //   title: 'sold this month',
          //   value: data.monthly_voucher_sold
          // }
          // ,{
          //   type: 'Earnings',
          //   title: 'this month',
          //   value: `${this.$helpers.convertCurrency(data.montyly_earnings)}`
          // }
          ,{
            type: 'Gutscheine',
            title: 'gesamt verkauft',
            value: data.voucher_total
          },{
            type: 'Umsatz',
            title: 'gesamt',
            value: `${this.$helpers.convertCurrency(data.total_earnings)}`
          },{
            type: 'Gutscheine eingelöst',
            title: 'heute',
            value: data.daily_redemptions
          },{
            type: 'Gutscheine eingelöst',
            title: 'diese Woche',
            value: data.weekly_redemptions
          },{
            type: 'Gutscheine eingelöst',
            title: 'diesen Monat',
            value: data.monthly_redemptions
          },{
            type: 'Gutscheine eingelöst',
            title: 'gesamt',
            value: data.total_redemptions
          }
        ]
      },
      onDelete(data)
      {
        this.$swal({
          title: 'Gutschein löschen',
          text: `Bist du sicher, dass du diesen Gutschein löschen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then(async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('DELETE_VOUCHER', data)
            // await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })

            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Gutschein löschen',
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
            setTimeout(() => {
              location.href = '/vouchers'
            }, 2000)
          }
        })
      },
      async onDeact(data)
      {
        this.$swal({
          title: `${ data.is_active ? 'Deaktivieren' : 'Aktivieren' }`,
          text: `${ data.is_active ? 'Bist du sicher, dass du diesen Gutschein deaktivieren willst?' : 'Bist du sicher, dass du diesen Gutschein aktivieren willst?' }`,
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then(async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('STATUS_UPDATE_VOUCHER', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            data.is_active = !data.is_active
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: `${ data.is_active ? 'Gutscheine aktivieren.' : 'Gutscheine deaktiveren.' }`,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }
        })
      },
    },
  }
</script>
<style lang='css' scoped>
</style>