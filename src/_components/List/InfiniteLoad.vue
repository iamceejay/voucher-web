<template>
  <div :id="id">
    <slot name="content" />
    <transition name="fade">
      <div v-show="testLoad" class="loading">
        <span class="fa fa-spinner fa-spin" /> Loading
      </div>
    </transition>
  </div>
</template>
<script>

  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      isInfiniteLoad: {
        type: Boolean,
        default: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        testLoad: false
      }
    },
    mounted() {
      this.onScroll()
    },
    methods: {
      onScroll()
      {
        let self = this
        document.onscroll = () => {
          const listElm = document.querySelector(`#${self.id}`)
          const doc = document.documentElement
          if(self.isInfiniteLoad && listElm && doc.scrollTop + window.innerHeight == doc.scrollHeight && !self.testLoad)
          {
            self.loadMore()
          }
        }
      },
      async loadMore () 
      {
        await this.$emit('onLoadMore')
      }
    },
  }

</script>
<style lang="css" scoped>

</style>