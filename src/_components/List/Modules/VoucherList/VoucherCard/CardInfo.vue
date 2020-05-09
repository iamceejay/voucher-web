<template>
  <div class="w-full flex flex-col px-4 py-3">
    <div class="card-header">
      <div class="flex flex-col">
        <div class="text-base">
          {{ data.name || 'Voucher Name' }}
        </div>
        <div class="text-xs font-semibold">
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
      <div class="w-9/12 text-xs text-justify h-24">
        {{ data.description || 'Voucher Description' }}
      </div>
      <div class="w-full flex flex-row">
        <div class="w-9/12">
          <div class="text-xs">
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
          <div class="text-base font-semibold">
            {{ (data.isQuantityBased ? 'Quantity' : 'Value') }}-based
          </div>
        </div>
        <div 
          class="w-1/4 cursor-pointer"
          @click="$emit('onFlip')"
        >
          <img 
            class="card-qr mt-1"
            src="@/_assets/img/default-qr-code.png" 
            alt=""
          />
          <div class="qr-text font-semibold flex">
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
      }
    },
    data() {
      return {};
    },
    mounted() {},
    methods: {}
  }
</script>
<style lang="css" scoped>
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