<template>
  <div class="relative">
    <button class="z-10 relative flex items-center focus:outline-none select-none" @click.prevent.stop="open = !open">
      <slot name="button" />
    </button>

    <!-- to close when clicked on space around it in desktop-->
    <button
      v-if="open" class="fixed inset-0 h-full w-full cursor-default focus:outline-none"
      tabindex="-1" @click="open = false"
    />
    <!--dropdown content: desktop-->
    <transition
      enterActiveClass="transition-all duration-200 ease-out" leaveActiveClass="transition-all duration-750 ease-in"
      enterClass="opacity-0 scale-75" enterToClass="opacity-100 scale-100"
      leaveClass="opacity-100 scale-100" leaveToClass="opacity-0 scale-75"
    >
      <div
        v-if="open" class="hidden md:block absolute shadow-lg border w-56 rounded py-1 px-2 text-sm mt-4 bg-white bottom-0 mb-12"
        :class="placement === 'right' ? 'right-0' : 'left-0'"
      >
        <slot name="content" />
      </div>
    </transition>

    <!--dropdown content: mobile-->
    <transition
      enterActiveClass="transition-all duration-200 ease-out" leaveActiveClass="transition-all duration-750 ease-in"
      enterClass="opacity-0 scale-75" enterToClass="opacity-100 scale-100"
      leaveClass="opacity-100 scale-100" leaveToClass="opacity-0 scale-75"
    >
      <div v-if="open" class="md:hidden fixed inset-x-0 bottom-0 bg-white w-full z-20 px-2 py-2 shadow-2xl leading-loose">
        <slot name="content" />
      </div>
    </transition>
    <!-- to close when clicked on space around it in mobile-->
    <div
      v-if="open" class="md:hidden fixed w-full h-full inset-0 bg-gray-900 opacity-50 z-10"
      @click="open = false"
    />
  </div>
</template>

<script>
  export default {
    props: {
      placement: {
        type: String,
        default: "right",
        validator: (value) => ["right", "left"].indexOf(value) !== -1,
      },
    },
    data() {
      return {
        open: false,
      };
    },
    mounted() {
      const onEscape = (e) => {
        if (e.key === "Esc" || e.key === "Escape") {
          this.open = false;
        }
      };

      document.addEventListener("keydown", onEscape);
    },
    beforeDestroy() {
      document.removeEventListener("keydown", onEscape);
    }
  };
</script>
