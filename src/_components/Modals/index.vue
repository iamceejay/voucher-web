<template>
  <Transition name="fade">
    <div 
      v-if="show"
      class="fixed inset-0 w-full h-screen flex items-center justify-center modal-bg"
      @click.self="close"
    >
      <div class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <button
          aria-label="close"
          class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4"
          @click.prevent="close"
        >
          ×
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>
<script>
  export default {
    props: {
      show: {
        required: true,
        type: Boolean
      }
    },
    watch: {
      show(newVal) {
        const body = document.querySelector('body').classList
        if (newVal) {
          body.add('overflow-hidden')
          // body.add('modal-backdrop')
          return true
        }
        body.remove('overflow-hidden')
        // body.remove('modal-backdrop')
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
</script>
<style scoped>
  .modal-bg {
    background: rgba(0, 0, 0, 0.20);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>