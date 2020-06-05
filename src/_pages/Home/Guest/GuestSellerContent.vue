<template>
  <div class="bg-peach">
    <div class="content-container flex flex-col sm:flex-wrap sm:flex-row items-center">
      <div class="flex flex-col w-full md:w-1/5 lg:w-2/6 text-white">
        <div class="font-bold font-display text-3xl">
          Become a seller
        </div>
        <div class="flex flex-col w-full">
          <p class="font-body">
            Lorem ipsum dolor sit amet.
          </p>
          <p class="font-body">
            Lorem ipsum dolor sit amet.
          </p>
          <p class="font-body">
            Lorem ipsum dolor sit amet.
          </p>
          <Button
            variant="white"
            class="py-2"
            label="Register"
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
          <div class="font-bold font-display text-lg">
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
            title: 'Lorem ipsum',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          }, {
            icon: 'far fa-check-circle',
            title: 'Lorem ipsum',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          }, {
            icon: 'far fa-check-circle',
            title: 'Lorem ipsum',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
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