<template>
  <div class="bg-peach">
    <div class="content-container flex flex-col sm:flex-wrap sm:flex-row items-center">
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        class="content-item w-full sm:w-1/2 md:w-1/2 lg:w-1/5"
      >
        <div class="text-5xl">
          <i :class="item.icon" />
        </div>
        <div class="font-bold font-display text-lg my-3">
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
            icon: 'far fa-check-circle',
            title: 'Sofort erhältlich',
            content: 'LJetzt kaufen und gleich verschenken'
          }, {
            icon: 'far fa-check-circle',
            title: 'Personalisierbar',
            content: 'Mit eigenen Fotos und Grüßen gestaltbar'
          }, {
            icon: 'far fa-check-circle',
            title: 'Stressfreies Einlösen',
            content: 'Einfach Gutschein vorzeigen und Genießen'
          }, {
            icon: 'far fa-check-circle',
            title: 'Vielseitig verwendbar',
            content: 'Ausgedruckt oder am Smartphone'
          }, {
            icon: 'far fa-check-circle',
            title: 'Eigene Wallet',
            content: 'Nie wieder Gutscheine verlieren'
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
    padding: 30px 40px;
    justify-content: center;
  }
  .content-item {
    text-align: center;
    color: #fff;
    padding: 20px;
  }
</style>