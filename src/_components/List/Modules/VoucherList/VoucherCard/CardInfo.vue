<template>
  <div 
    :class="`w-full flex flex-col px-4 py-3 cursor-pointer`"
    @click="onClickHeader()"
  >
    <div 
      class="card-header"
    >
      <div class="flex flex-col w-3/5 break-words">
        <div class="text-base font-bold font-display">
          {{ voucher.title || 'Voucher Name' }}
        </div>
        <div class="text-xs font-bold font-body">
          {{ voucher.seller && voucher.seller.username || 'N/A' }}
        </div>
      </div>
      <div class="self-center w-2/5">
        <img
          v-if="voucher.seller && voucher.seller.company.logo"
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
      <div class="w-full flex flex-row break-words">
        <div :class="`${order && userVoucher && userVoucher.custom_image ? 'w-3/5' : 'w-9/12'}`">
          <div class="text-xs text-justify card-description h-40 font-body">
            {{ voucher.description || 'Voucher Description' }}
          </div>
          <div class="text-xs text-justify h-12 font-body">
            {{ order && userVoucher && userVoucher.note || '' }}
          </div>
        </div>
        <div v-if="order && userVoucher && userVoucher.custom_image" class="w-2/5 p-1">
          <img 
            style="width: 120px; height: 48px;"
            :src="onSetCustomImage(userVoucher.custom_image)" 
            alt=""
          />
        </div>
      </div>
      <div class="w-full flex flex-row">
        <div class="w-9/12 flex flex-col">
          <div class="text-xs font-body ">
            <div class="min-h-20">
              <div v-if="voucher.valid_date && voucher.valid_date.length > 0">
                <div
                  v-for="(date, index) in voucher.valid_date"
                  :key="`date-${index}`"
                >
                  Valid on {{ `${formatDate(date.start) || '...'} to ${formatDate(date.end) || '...'}` }}
                </div>
              </div>
            </div>
            <div class="min-h-8">
              <div v-if="voucher.valid_day && voucher.valid_day.length > 0">
                Valid on 
                <span 
                  v-for="(day, index) in voucher.valid_day"
                  :key="`day-${index}`"
                >
                  {{ `${day.substring(0,3)}${ (voucher.valid_day.length != (index+1)) ? ',' : '' }` }}
                </span>
              </div>
            </div>
            <div v-if="order">
              Expiry: {{ onGetExpiryDate(order) }}
            </div>
          </div>
          <div class="text-sm font-bold font-body">
            {{ `${(voucher.type == 'quantity') ? 'Quantity' : 'Value'}-based` }}
          </div>
          <div v-if="role != 'seller'" class="text-sm font-bold font-body">
            <span v-if="userVoucher || order">
              {{ 
                `${(voucher.type == 'quantity') 
                  ? `x${(!userVoucher && order) ? order.qty : userVoucher.qty}${ userVoucher && !userVoucher.price_hidden ? ` (${$helpers.convertCurrency(voucher.price_filter)}/voucher)` : '' }` 
                  : `${$helpers.convertCurrency(userVoucher.value)}`}` 
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
            <div v-if="order && order.sent_via" class="text-xs font-bold font-body border border-gray-500 rounded-full w-32">
              {{ onGetSentVia(order.sent_via) }}
            </div>
          </div>
        </div>
        <div 
          v-if="withQR && qr"
          :class="`w-1/4 flex flex-col ${ isFlippable && (!order || (order && !order.sent_via)) ? 'cursor-pointer' : ''}`"
          @click="(order && order.sent_via ) ? '' : $emit('onFlip')"
        >
          <QrcodeVue
            class="card-qr"
            :value="qr.url" 
            :size="50" 
            level="H" 
          />
          <div class="qr-text ml-auto font-semibold flex flex-col font-body">
            <div class="">
              Voucher No.
            </div>
            <div v-if="order && qr" class="">
              {{ qr.url }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  import moment from 'moment'
  import { formatDate } from '_helpers/CustomFunction'

  export default {
    components: {
      QrcodeVue,
    },
    props: {
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
      onGetSentVia(value)
      {
        switch (value) {
          case 'voucher_download':
            return 'Downloaded'
            break;
          case 'email':
            return 'Sent via Email'
            break;
          case 'transferred':
            return 'Transferred'
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
          }
        } else {
          if( this.role == 'admin' ) {
            this.$router.push(`/vouchers/${this.voucher.id}`)
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
  .card-description {
    min-width: 10rem;
  }
  .card-header {
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
  }
  .card-content {
    padding: 8px 0px;
  }
  .card-logo {
    width: 80px;
    height: 32px;
  }
  .card-qr {
    margin-left: auto;
    /* margin: 0px 15px; */
  }
  .qr-text {
    margin-top: 2px;
    /* margin-right: 6px; */
    font-size: 9px;
  }
</style>