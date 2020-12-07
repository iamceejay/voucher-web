<template>
  <div style="background: linear-gradient(90deg, #ff5563 50%, #edf2f7 50%);">
    <div class="content-container flex flex-col sm:flex-wrap sm:flex-row items-center bg-gray-200">
      <div class="flex flex-col w-full md:w-1/5 lg:w-2/6 text-white bg-peach px-6 py-12 ">
        <div class="font-bold font-display text-3xl mb-4 text-center md:text-left">
          Werde Partner und verkaufe deine Gutscheine
        </div>
        <div class="flex justify-center md:justify-start w-full">
          <a
            class="bg-white mt-2 py-1 py-3 rounded text-black text-center w-64"
            href="https://verkaufen.epasnets.com/"
            target="_blank"
          >
            Als Verkaufer regisrieren
          </a>
        </div>
      </div>
      <div class="bg-gray-200 flex flex-col items-center lg:w-4/6 md:w-4/5 px-6 py-12 w-full">
        <h2 class="font-bold text-3xl">Z'Weihnachten gibt's epasnets</h2>
        <p class="max-w-sm text-2xl">
          Entdecke Gutscheine von Tiroler Unternehmen zum verschenken und genießen.
        </p>
        <!-- <div
          v-for="(item, index) in items"
          :key="`item-${index}`"
          class="content-item w-full sm:w-1/2 md:w-1/2 lg:w-3/12 md:ml-auto"
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
        </div> -->
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