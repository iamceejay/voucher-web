<template>
  <div class="bg-peach">
    <div class="content-container flex flex-col sm:flex-wrap sm:flex-row items-center bg-gray-200">
      <div class="flex flex-col w-full text-white bg-peach px-6 py-20 items-center">
        <div class="font-medium max-w-md mb-4 text-3xl text-center">
          Werde Partner und verkaufe deine Gutscheine
        </div>
        <div class="flex justify-center w-full">
          <a
            class="bg-white mt-2 px-4 py-3 rounded text-black text-center"
            href="https://verkaufen.epasnets.com/"
            target="_blank"
          >
            Jetzt als Verkäufer registrieren
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button'

  export default {
    components: {
      Button,
    },
    data() {
      return {
        items: [
          {
            icon: 'far fa-check-circle',
            title: 'Einfach',
            content: 'Erstelle innerhalb weniger Minuten deine individuellen Gutscheine'
          }, {
            icon: 'far fa-check-circle',
            title: 'Automatisiert',
            content: 'Verkaufe ohne jeglichen Aufwand deine Gutscheine rund um die Uhr'
          }, {
            icon: 'far fa-check-circle',
            title: 'Direkt',
            content: 'Profitiere von schnellen Zahlungen und lege deine eigenen Richtlinien fest'
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
    /* padding: 30px 40px;
    justify-content: center; */
  }
  .content-item {
    text-align: center;
    color: #fff;
    padding: 20px;
  }
</style>