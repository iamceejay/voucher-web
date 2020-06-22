<template>
  <div class="bg-peach">
    <div class="content-container flex flex-col sm:flex-wrap sm:flex-row items-center">
      <div class="flex flex-col w-full md:w-1/5 lg:w-2/6 text-white">
        <div class="font-bold font-display text-3xl mb-4">
          Werde auch du Partner
        </div>
        <div class="flex flex-col w-full">
          <p class="font-body">
            Verkaufe deine Wert-, Erlebnis-
          </p>
          <p class="font-body">
            oder Produktgutscheine und
          </p>
          <p class="font-body">
            sichere dir Zusatzeinnahmen.
          </p>
          <Button
            variant="white"
            class="py-2 mt-4"
            label="Jetzt mehr erfahren"
            size="w-32 py-1"
            round="rounded-full"
            fontSize="text-xs"
            @onClick="$router.push('register')"
          />
        </div>
      </div>
      <div class="flex flex-col sm:flex-wrap sm:flex-row items-center w-full md:w-4/5 lg:w-4/6">
        <div
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
    padding: 30px 40px;
    justify-content: center;
  }
  .content-item {
    text-align: center;
    color: #fff;
    padding: 20px;
  }
</style>