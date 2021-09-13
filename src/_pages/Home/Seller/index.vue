<template>
  <div class="-mt-10 bg-custom-gray">
    <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
      <Header title="Dashboard" />
      <div class="main-statistics">
        <div class="main-statistics__container">
          <div class="main-statistics__item">
            <h2>Gutscheine verkauft gesamt</h2>
            <p class="text-sm font-semibold">{{ wallet.voucher_total }} Stück</p>
          </div>
          <div class="main-statistics__item">
            <h2>Auszahlung gesamt</h2>
            <p class="text-sm font-semibold mb-4">{{ $helpers.convertCurrency(wallet.total_seller_earnings) }}</p>
            <p class="text-xs text-custom-gray-2 flex items-center">
              <svg
                v-tippy
                class="icon h-4 w-4 mr-2"
                content="Der gesamte Betrag den du mit epasnets verdient hast.">
                <use xlink:href="/icons/sprite.svg#info-circle-fill" />
              </svg>
              Kommission
            </p>
          </div>
        </div>
        <div class="main-statistics__container">
          <div class="main-statistics__item">
            <h2>Auszahlung wartend</h2>
            <p class="text-sm font-semibold">{{ $helpers.convertCurrency(wallet.waiting_for_payout) }}</p>
          </div>
          <div class="main-statistics__item">
            <h2>Nächste Auszahlung</h2>
            <p class="text-sm font-semibold mb-4">in {{ wallet.days_until_next_payout }} Tagen</p>
            <p class="text-xs text-custom-gray-2">Auszahlung alle {{ wallet.payout_every }} Tage</p>
          </div>
        </div>
      </div>
      <div class="statistics flex flex-wrap mb-6">
        <div v-for="(stat, index) in stats"
          :key="`stat-${index}`"
          class="statistics__item"
        >
          <h2 class="statistics__item-title">{{ stat.title }}</h2>
          <div class="statistics__item-stats">
            <p class="text-custom-gray-2">Gutscheine verkauft:</p>
            <p class="font-semibold">{{ stat.sold }} Stück</p>
          </div>
          <div class="statistics__item-stats">
            <p class="text-custom-gray-2">Umsatz:</p>
            <p class="font-semibold">{{ stat.earnings }}</p>
          </div>
          <div v-if="stat.redeemed" class="statistics__item-stats">
            <p class="text-custom-gray-2">Eingelöst:</p>
            <p class="font-semibold">{{ stat.redeemed }} Stück</p>
          </div>
        </div>
      </div>
      <div class="bg-peach p-6 mb-10" v-if="!isPayoutEnabled">
        <p class="text-white text-sm">Du musst in <a class="underline" href="/profile-info?currentTab=2">Profil &amp; Einstellungen</a> unter "Überprüfung" noch Dokumente hochladen, damit die Auszahlung erfolgen kann.</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '_components/Headers/Seller/Header';
  import Button from '_components/Button';

  export default {
    components: {
      Header,
      Button
    },
    data() {
      return {
        stats: [],
        wallet: {},
        params: {
          seller_id: null,
          status: 'completed',
          with_stat: true,
        },
        isPayoutEnabled: false
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        try {
          this.params.seller_id = this.AUTH_USER.data.id

          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          const data = await this.$store.dispatch('FETCH_USER_STIPE_STATUS')
          this.isPayoutEnabled = data.isPayoutEnabled
          await this.$store.commit('SET_WALLETS', [])
          await this.onFetchWallets()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onFetchWallets()
      {
        try {
          const data = await this.$store.dispatch('FETCH_WALLETS', this.params)
          this.wallet = data;
          await this.onSetStats(data)
        } catch (err) {
          console.log('err', err)
        }
      },
      onSetStats( data )
      {
        this.stats = [
          {
            title: 'Heute',
            sold: data.voucher_daily,
            earnings: this.$helpers.convertCurrency(data.seller_daily_earnings),
            redeemed: ''
          },
          {
            title: 'Diese Woche',
            sold: data.voucher_month,
            earnings: this.$helpers.convertCurrency(data.seller_weekly_earnings),
            redeemed: ''
          },
          {
            title: 'Diesen Monat',
            sold: data.voucher_daily,
            earnings: this.$helpers.convertCurrency(data.seller_monthly_earnings),
            redeemed: ''
          }
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
  .main-statistics {
    @apply bg-white flex flex-col mb-6;
  }
  .main-statistics__container {
    @apply flex flex-wrap;
  }
  .main-statistics__item {
    @apply border-t border-b border-custom-gray w-full p-6;
  }
  .statistics__item {
    @apply border-t border-b border-custom-gray w-full p-6 bg-white;
  }
  .statistics__item:first-child {
    @apply border-l-0 border-t-0;
  }
  .statistics__item:last-child {
    @apply border-r-0 border-b-0;
  }
  h2 {
    @apply font-semibold text-peach mb-1;
  }
  .statistics__item-title {
    @apply mb-5;
  }
  .statistics__item-stats {
    @apply text-sm mb-5;
  }
  .statistics__item-stats:last-child {
    @apply mb-0;
  }
  @screen sm {
    .main-statistics__item {
      @apply border w-1/2;
    }
    .main-statistics__item:first-child {
      @apply border-l-0;
    }
    .main-statistics__item:last-child {
      @apply border-r-0;
    }
    .statistics__item {
      @apply border-l border-r w-1/3;
    }
  }
</style>