<template>
  <div class="w-full flex flex-col px-4 py-3">
    <div class="card-header">
      <div 
        :class="`flex flex-col ${ role && (!otherData || (otherData && !otherData.sent_via)) ? 'cursor-pointer' : '' }`"
        @click="onClickHeader()"
      >
        <div class="text-base font-bold font-display">
          {{ data.title || 'Voucher Name' }}
        </div>
        <div class="text-xs font-bold font-body">
          {{ data.seller && data.seller.company.name || 'Company Name' }}
        </div>
      </div>
      <img
        v-if="data.seller && data.seller.company.logo"
        class="card-logo"
        :src="onSetImage(data.seller.company.logo)" 
        alt=""
      />
      <img 
        v-else
        class="card-logo"
        src="@/_assets/img/company-default-logo.png" 
        alt=""
      />
    </div>
    <div class="card-content">
      <div class="w-full flex flex-row">
        <div :class="`${otherData && otherData.user_voucher && otherData.user_voucher.custom_image ? 'w-3/5' : 'w-9/12'}`">
          <div class="text-xs text-justify card-description h-40 font-body">
            {{ data.description || 'Voucher Description' }}
          </div>
          <div class="text-xs text-justify h-12 font-body">
            {{ otherData && otherData.user_voucher && otherData.user_voucher.note || '' }}
          </div>
        </div>
        <div v-if="otherData && otherData.user_voucher && otherData.user_voucher.custom_image" class="w-2/5 p-1">
          <img 
            style="width: 120px; height: 80px;"
            :src="onSetCustomImage(otherData.user_voucher.custom_image)" 
            alt=""
          />
        </div>
      </div>
      <div class="w-full flex flex-row">
        <div class="w-9/12 flex flex-col">
          <div class="text-xs font-body ">
            <div v-if="data.valid_date && data.valid_date.length > 0">
              <span
                v-for="(date, index) in data.valid_date"
                :key="`date-${index}`"
              >
                Valid on {{ `${date.start || '...'} to ${date.end || '...'}` }}
              </span>
            </div>
            <div v-if="data.valid_day && data.valid_day.length > 0" class="h-8">
              Valid on 
              <span 
                v-for="(day, index) in data.valid_day"
                :key="`day-${index}`"
              >
                {{ `${day.substring(0,3)}${ (data.valid_day.length != (index+1)) ? ',' : '' }` }}
              </span>
            </div>
          </div>
          <div class="text-sm font-bold font-body">
            {{ `${(data.type == 'quantity') ? 'Quantity' : 'Value'}-based` }}
          </div>
          <div v-if="role != 'seller'" class="text-sm font-bold font-body">
            {{
              `${(data.type == 'quantity') ? `${data.qty_val}x (€${data.qty_min} - €${data.qty_max})` : `€${data.val_min} - €${data.val_max}`}`
            }}
          </div>
          <div class="text-center self-center h-4">
            <div v-if="otherData && otherData.sent_via" class="text-xs font-bold font-body border border-gray-500 rounded-full w-32">
              {{ otherData.sent_via == 'email' ? 'Sent by Email' : 'Transferred' }}
            </div>
          </div>
        </div>
        <div 
          v-if="withQR && otherData && otherData.qr"
          :class="`w-1/4 flex flex-col ${ isFlippable && (!otherData || (otherData && !otherData.sent_via)) ? 'cursor-pointer' : ''}`"
          @click="(otherData && otherData.sent_via ) ? '' : $emit('onFlip')"
        >
          <QrcodeVue
            class="card-qr"
            :value="otherData.qr.url" 
            :size="50" 
            level="H" 
          />
          <!-- <img
            v-else
            class="card-qr mt-1"
            src="@/_assets/img/default-qr-code.png" 
            alt=""
          /> -->
          <div class="qr-text ml-auto font-semibold flex flex-col font-body">
            <div class="">
              Voucher No.
            </div>
            <div v-if="otherData && otherData.qr" class="">
              {{ otherData.qr.url }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  
  export default {
    components: {
      QrcodeVue,
    },
    props: {
      data: {
        type: Object,
        default: null
      }, otherData: {
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
      onClickHeader()
      {
        console.log('this.role', this.role)
        if( this.role ) {
          if( this.role === 'user' ) {
            if( this.withQR ) {
              if( (!this.otherData || (this.otherData && !this.otherData.sent_via)) ) {
                this.$emit('onFlip')
              }
            } else {
              this.$router.push(`/vouchers/${this.data.id}`)
            }
          } else {
            if( this.role == 'admin' ) {
              this.$router.push(`/vouchers/${this.data.id}`)
            } else {
              this.$emit('onFlip')
            }
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
    width: 65px;
    height: 30px;
    margin-left: auto;
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