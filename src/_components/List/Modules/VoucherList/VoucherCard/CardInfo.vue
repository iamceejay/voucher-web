<template>
  <div class="w-full flex flex-col px-4 py-3">
    <div class="card-header">
      <div 
        :class="`flex flex-col ${ role ? 'cursor-pointer' : '' }`"
        @click="onClickHeader()"
      >
        <div class="text-base font-bold font-display">
          {{ data.name || 'Voucher Name' }}
        </div>
        <div class="text-xs font-bold font-body">
          {{ data.companyName || 'Company Name' }}
        </div>
      </div>
      <img 
        class="card-logo"
        src="@/_assets/img/company-default-logo.png" 
        alt=""
      />
    </div>
    <div class="card-content">
      <div class="w-full flex flex-row">
        <div :class="`${data.personalized && data.personalized.picture ? 'w-3/5' : 'w-9/12'}`">
          <div class="text-xs text-justify card-description font-body">
            {{ data.description || 'Voucher Description' }}
          </div>
          <div v-if="data.personalized" class="text-xs text-justify h-12 font-body">
            {{ data.personalized.note || 'Voucher Note' }}
          </div>
        </div>
        <div v-if="data.personalized && data.personalized.picture" class="w-2/5">
          <img 
            style="width: 120px; height: 80px;"
            :src="data.personalized.picture" 
            alt=""
          />
        </div>
      </div>
      <div class="w-full flex flex-row">
        <div class="w-9/12">
          <div class="text-xs font-body">
            <div v-if="data.validDates.length > 0">
              <span
                v-for="(date, index) in data.validDates"
                :key="`date-${index}`"
              >
                Valid on {{ `${date.start || '...'} to ${date.end || '...'}` }}
              </span>
            </div>
            <div v-if="data.validDay.length > 0">
              Valid on 
              <span 
                v-for="(day, index) in data.validDay"
                :key="`day-${index}`"
              >
                {{ `${day.substring(0,3)}${ (data.validDay.length != (index+1)) ? ',' : '' }` }}
              </span>
            </div>
          </div>
          <div class="text-base font-bold font-body">
            {{
              ( role === 'seller' ) 
                ? `${data.isQuantityBased ? 'Quantity' : 'Value'}-based`
                : `${data.isQuantityBased ? `${data.quantity}x` : `€${data.value}`}`
            }}
          </div>
        </div>
        <div 
          v-if="withQR"
          :class="`w-1/4 ${ isFlippable ? 'cursor-pointer' : ''}`"
          @click="$emit('onFlip')"
        >
          <img 
            class="card-qr mt-1"
            src="@/_assets/img/default-qr-code.png" 
            alt=""
          />
          <div class="qr-text font-semibold flex font-body">
            <span class="ml-auto">Voucher No.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      data: {
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
    mounted() {
      this.onSetRole()
    },
    methods: {
      onClickHeader()
      {
        if( this.role ) {
          if( this.role === 'user' ) {
            if( this.withQR ) {
              this.$emit('onFlip')
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
    width: 65px;
    height: 65px;
    margin-left: auto;
  }
  .qr-text {
    margin-top: 2px;
    margin-right: 6px;
    font-size: 9px;
  }
</style>