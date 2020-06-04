<template>
  <div class="content-container flex flex-col sm:flex-wrap sm:flex-row items-center">
    <div
      v-for="(item, index) in items"
      :key="`item-${index}`"
      class="content-item w-full sm:w-1/2 md:w-1/2 lg:w-3/12"
    >
      <div class="text-5xl">
        <i :class="item.icon" />
      </div>
      <div class="font-bold text-lg">
        {{ item.title }}
      </div>
      <div class="text-sm">
        {{ item.content }}
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
    background: #ff5563;
    padding: 20px 40px;
    justify-content: center;
  }
  .content-item {
    text-align: center;
    color: #fff;
    padding: 20px;
  }
</style>