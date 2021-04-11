<template>
  <div
    :class="`cursor-pointer flex flex-col text-black w-full border`"
    @click="onClickHeader()"
  >
    <div
      class="card-header  p-5"
    >
      <div class="flex flex-col w-3/5 break-words">
        <div class="text-base font-semibold h-12">
          {{ voucher.title || 'Gutscheinnname' }}
        </div>
        <div class="text-sm">
          {{ voucher.seller && voucher.seller.username || 'N/A' }}
        </div>
      </div>
      <div class="self-center w-2/5">
        <img
          v-if="voucher.seller && voucher.seller.company && voucher.seller.company.logo"
          class="card-logo ml-auto"
          :src="onSetImage(voucher.seller.company.logo)"
          alt=""
        />
        <img
          v-else
          class="card-logo ml-auto"
          src="@/_assets/img/company-default-logo.png"
          alt=""
        />
      </div>
    </div>
    <div class="card-content">
      <div class="w-full flex flex-col break-words">
        <!-- <div class="w-full py-5 card-description">
          <div class="text-sm  px-5">
            {{ voucher.description || 'Beschreibung' }}
          </div>
          <div class="text-xs h-16 font-body font-bold py-1">
            {{ order && userVoucher && userVoucher.note || '' }}
          </div>
        </div> -->
        <div v-if="order && userVoucher && userVoucher.custom_image" class="w-2/5 p-1">
          <img
            class="card-image"
            :src="onSetCustomImage(userVoucher.custom_image)"
            alt=""
          />
        </div>
        <div v-else>
            <div
              :style="{ backgroundImage: 'url(' + (voucher.data_json != null ? voucher.data_json.background_image : voucher.custom_background_image || voucher.background_image) + ')', backgroundColor: 'white'}"
              style="background-size: contain"
              class="card-image"
            ></div>
        </div>
      </div>
      <div class="flex flex-col p-5 break-words card-description">
        <div class="text-xs leading-5">
          {{ voucher.note || voucher.description || 'Beschreibung' }}
        </div>
      </div>
      <div class="flex flex-row card-footer">
        <div class="w-1/2 flex flex-col p-5">
          <span class="text-2xs">{{ `${(voucher.type == 'quantity') ? 'Produktgutschein' : 'Wertgutschein'}` }}</span>
          <span class="text-xl font-bold" v-if="userVoucher">
            <span v-show="!voucher.price_hidden || typeof voucher.price_hidden == 'undefined'">{{
                `${(voucher.type == 'quantity')
                  ? `${$helpers.convertCurrency(voucher.qty_val)}`
                  : `${$helpers.convertCurrency(voucher.min || voucher.val_min).replace('€', '')} - ${$helpers.convertCurrency(voucher.max || voucher.val_max)}`}`
            }}</span>
          </span>
          <span class="text-xl font-bold" v-else>{{
                `${(voucher.type == 'quantity')
                  ? `${$helpers.convertCurrency(voucher.qty_val)}`
                  : `${$helpers.convertCurrency(voucher.min || voucher.val_min).replace('€', '')} - ${$helpers.convertCurrency(voucher.max || voucher.val_max)}`}`
              }}</span>
          <span class="mt-3 flex items-center">
             <QrcodeVue
              class="card-qr"
              :value="withQR && qr ? qr.url : ''"
              level="H"
            />
            <div class="flex flex-col text-2xs ml-2">
              <span>Gutscheincode:</span>
              <span class="font-bold">{{ withQR && qr ? qr.url : '123456789' }}</span>
            </div>
          </span>
        </div>

        <div class="w-1/2 flex flex-col p-5">
          <span class="text-2xs">Einlösbar:</span>
          <span
            v-if="voucher.valid_day && voucher.valid_day.length > 0"
            class="text-2xs opacity-50">
            am: <span
                  v-for="(day, index) in voucher.valid_day"
                  :key="`day-${index}`"
                >
                  {{ `${day.substring(0,3)}${ (voucher.valid_day.length != (index+1)) ? ',' : '' }` }}
                </span>
          </span>
          <span
            v-if="voucher.data_json.months && voucher.data_json.months.length > 0"
            class="text-2xs opacity-50">
            im: <span
                v-for="(month, index) in voucher.data_json.months"
                :key="`month-${index}`"
              >
                <span v-if="month">
                  {{ `${getMonth(parseInt(month))}${ (voucher.data_json.months.length != (index+1)) ? ',' : '' }` }}
                </span>
              </span>
          </span>
          <span class="text-2xs mt-1">Region:</span>
          <span class="text-2xs opacity-50">Tirol</span>
        </div>
      </div>
      <!-- <div class="w-full flex flex-row">
        <div class="w-9/12 flex flex-col">
          <div class="text-xs font-body ">

            <div class="min-h-20">
              <div v-if="voucher.valid_date && voucher.valid_date.length > 0">
                <div
                  v-for="(date, index) in voucher.valid_date"
                  :key="`date-${index}`"
                >
                  Gültig von {{ `${formatDate(date.start) || '...'} bis ${formatDate(date.end) || '...'}` }}
                </div>
              </div>
            </div>
            <div class="min-h-8">
              <div v-if="voucher.valid_day && voucher.valid_day.length > 0">
                Gültig am
                <span
                  v-for="(day, index) in voucher.valid_day"
                  :key="`day-${index}`"
                >
                  {{ `${day.substring(0,3)}${ (voucher.valid_day.length != (index+1)) ? ',' : '' }` }}
                </span>
              </div>
            </div>
            <div v-if="order">
              Gültig bis: {{ onGetExpiryDate(order) }}
            </div>
          </div>
          <div v-if="role != 'seller'" class="text-sm font-bold font-body">
            <span v-if="userVoucher || order">
              {{
                `${(voucher.type == 'quantity')
                  ? `${(!userVoucher && order) ? order.qty : userVoucher.qty}x${ userVoucher && !userVoucher.price_hidden ? ` (${$helpers.convertCurrency(voucher.price_filter)}/Gutschein)` : '' }`
                  : `${$helpers.convertCurrency(order.value)}`}`
              }}
            </span>
            <span v-else>
              {{
                `${(voucher.type == 'quantity')
                  ? `${$helpers.convertCurrency(voucher.qty_val)}`
                  : `${$helpers.convertCurrency(voucher.val_min)} - ${$helpers.convertCurrency(voucher.val_max)}`}`
              }}
            </span>
          </div>
          <div class="text-center self-center h-4">
            <div v-if="userVoucher && userVoucher.sent_via && userVoucher.sent_via != 'transferred'" class="text-xs font-bold font-body border border-gray-500 rounded-full w-32">
              {{ onGetSentVia(userVoucher.sent_via) }}
            </div>
          </div>
        </div>
        <div
          v-if="withQR && qr"
          :class="`w-1/4 flex flex-col ${ isFlippable && (!userVoucher || (order && !userVoucher.sent_via)) ? 'cursor-pointer' : ''}`"
          @click="(userVoucher && userVoucher.sent_via ) ? '' : $emit('onFlip')"
        >
          <QrcodeVue
            class="card-qr"
            :value="qr.url"
            :size="50"
            level="H"
          />
          <div class="qr-text font-semibold flex flex-col font-body text-center">
            <div class="">
              Gutschein
            </div>
            <div v-if="order && qr" class="">
              {{ qr.url }}
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  import moment from 'moment'
  import { formatDate } from '_helpers/CustomFunction'

  export default {
    components: {
      QrcodeVue
    },
    props: {
      cardId: {
        type: String,
        default: 'voucher-card'
      },
      listId: {
        type: String,
        default: 'voucher-list'
      },
      voucher: {
        type: Object,
        default: null
      }, order: {
        type: Object,
        default: null
      }, userVoucher: {
        type: Object,
        default: null
      }, qr: {
        type: Object,
        default: null
      }, isFlippable: {
        type: Boolean,
        default: true
      }, withQR: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        role: null
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      }
    },
    created() {
      this.onSetRole()
    },
    methods: {
      formatDate(date)
      {
        return formatDate(date)
      },
      getMonth(month) {
        return moment(month).format('MMM')
      },
      onGetSentVia(value)
      {
        switch (value) {
          case 'voucher_download':
            return 'Verschenkt'
            break;
          case 'email':
            return 'Verschenkt'
            break;
          case 'transferred':
            return 'Übertragen'
            break;
          default:
            break;
        }
      },
      onGetExpiryDate(data)
      {
        let expire = data.voucher.expiry_date ? data.voucher.expiry_date : 4
        return moment(data.created_at).local().add(expire, 'year').format('DD.MM.YYYY')
      },
      onClickHeader()
      {

        if( this.role === 'user' || !this.role ) {
          if( this.withQR ) {
            // if( (!this.order || (this.order && !this.order.sent_via)) ) {
            this.$emit('onFlip')
            // }
          } else {
            this.$router.push(`/vouchers/${this.voucher.id}`)
            // this.$store.commit('SET_VOUCHER_ID', this.voucher.id)
            // this.$store.commit('SET_MODAL', true)

            this.$store.commit('SET_SELLER_MODAL', false)
            document.body.classList.remove('overflow-hidden')
          }
        } else {
          if( this.role == 'admin' ) {
            // this.$router.push(`/vouchers/${this.voucher.id}`)
            this.$store.commit('SET_VOUCHER_ID', this.voucher.id)
            this.$store.commit('SET_MODAL', true)

            this.$store.commit('SET_SELLER_MODAL', false)
            document.body.classList.remove('overflow-hidden')
          } else {
            this.$emit('onFlip')
          }
        }
      },
      onSetCustomImage( value)
      {
        return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
      },
      onSetImage(value)
      {
        return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
      },
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  .text-base {
      font-size: 1em;
  }
  .text-xl {
    font-size: 1.25em;
  }
  .text-lg {
    font-size: 1.125em;
  }
  .text-sm {
    font-size: 0.875em;
  }
  .text-xs {
    font-size: 0.75em;
  }
  .text-2xs {
    font-size: .60em;
  }

  .p-1 {
    padding: 0.25em;
  }

  .p-5 {
    padding: 1.25em;
  }
  .card-description {
    height: 8.4375em;
    background-color: var(--card-description-background, #1D4F55);
    color: var(--card-description-color, white);
  }

  .card-footer,
  .card-header {
    background-color: var(--card-header-footer-background, #fff);
    color: var(--card-header-footer-color, #000);
  }

  .card-footer {
    height: 10em;
  }

  .card-image {
    padding-top: 92.65%;
    width: 100%;
  }

  .card-header {
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
  }
  .card-logo {
    width: auto;
    height: 32px;
  }
  .card-qr {
    align-self: center;
    width: 2.1875em;
    /* margin-left: auto; */
    /* margin: 0px 15px; */
  }

  .qr-text {
    margin-top: 2px;
    /* margin-right: 6px; */
    font-size: 9px;
  }
</style>