<template>
  <div class="bg-peach">
    <div class="content-container flex flex-wrap sm:flex-row items-center">
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        class="content-item w-1/2 md:w-1/2 lg:w-1/5"
      >
        <div class="text-5xl">
          <i :class="item.icon" />
        </div>
        <div class="font-bold font-display text-lg my-3 h-10">
          {{ item.title }}
        </div>
        <div class="text-sm font-body">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'fa fa-download',
            title: 'Sofort erhältlich',
            content: 'Jetzt kaufen und gleich aus deiner Wallet verschenken'
          }, {
            icon: 'fa fa-palette',
            title: 'Personalisierbar',
            content: 'Mit eigenen Fotos und Grüßen gestaltbar'
          }, {
            icon: 'far fa-check-circle',
            title: 'Stressfrei Einlösen',
            content: 'Gutschein ausgedruckt oder am Smartphone vorzeigen'
          }, {
            icon: 'fa fa-gift',
            title: 'Einfach Verschenken',
            content: 'Ausgedruckt oder via Whatsapp verschicken'
          },
        ],
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style lang="css" scoped>
  .content-container {
    /* padding: 30px 40px; */
    justify-content: center;
  }
  .content-item {
    text-align: center;
    color: #fff;
    padding: 20px;
  }
</style>