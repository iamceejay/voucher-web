<template>
  <div class="w-full flex flex-col px-4 py-3">
    <div class="card-header">
      <div class="flex flex-col">
        <div class="text-base">
          {{ data.name }}
        </div>
        <div class="text-xs font-semibold">
          {{ data.companyName }}
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
        {{ data.description }}
      </div>
      <div class="w-full flex flex-row">
        <div class="w-9/12">
          <div class="text-xs">
            <span>
              Valid on {{ `${data.validDate.start} to ${data.validDate.end}` }}
            </span>
            <div v-if="data.validDay.length > 0">
              Valid on 
              <span 
                v-for="(day, index) in data.validDay"
                :key="`day-${index}`"
              >
                {{ `${day}${ (data.validDay.length != (index+1)) ? ',' : '' }` }}
              </span>
            </div>
          </div>
          <div class="text-base font-semibold">
            {{ (data.type == 'value' ? 'Value' : 'Quantity') }}-base
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
    width: 70px;
    height: 70px;
    margin-left: auto;
  }
  .qr-text {
    margin-top: -10px;
    margin-right: 10px;
    font-size: 9px;
  }
</style>