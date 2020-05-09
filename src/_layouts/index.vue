<template>
  <div 
    id="main-layout-component"
    class="w-full flex flex-row overflow-auto"
  >
    <Sidebar 
      @onHide="isHideSideBar = $event"
    />
    <div 
      class="w-full flex"
    >
      <div 
        :class="`main-container p-8 ${isHideSideBar ? 'hide h-screen' : ''}`"
      >
        <div
          :class="`${isHideSideBar ? 'hide' : ''}`"
        >
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Sidebar from '_components/Menus/Sidebar'
  export default {
    components: {
      Sidebar
    },
    props: [],
    data() {
      return {
        isHideSideBar: false
      }
    },
    mounted() {

    },
    methods: {
      test(){
        console.log('test')
      }
    }
  }
</script>
<style lang="css" scoped>
  .main-container.hide {
    transition: all 0.6s;
  }
  @media only screen and (max-width: 640px) {
    .main-container.hide {
      background: rgba(0, 0, 0, 0.80);
    }
    .main-container .hide {
      display: none !important;
    }
  }
</style>