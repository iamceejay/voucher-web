<template>
  <div id="input-field-component" class="mb-5 w-full">
    <ValidationProvider
      :name="id"
      :rules="rules"
    >
      <template #default="{ errors }">
        <Header5
          v-if="label != ''"
          :label="label"
        />
        <div class="flex flex-col max-w-md mt-2 mx-auto relative w-full">
          <input
            :id="id"
            ref="inputField"
            v-model="keyword"
            :name="id"
            :type="type"
            class="input-field pr-12 px-3 py-2 rounded-full text-sm"
            :class="{ 'text-red-500 border-red-500': errors && errors.length > 0 }"
            :value="value"
            :placeholder="placeholder"
          />

          <svg class="absolute h-5 icon mr-6 mt-3 right-0 text-peach w-5">
            <use xlink:href="/icons/sprite.svg#search"/>
          </svg>
          <a
            href="javascript:void(0)" class="bg-peach px-5 py-3 rounded-md text-sm text-white mt-3 text-center"
            @click="onSearch"
          >Suchen</a>
        </div>
        <ErrorMessage class="mt-1" :errors="[...errors, ...errorMessages]" />
      </template>
    </ValidationProvider>
  </div>
</template>
<script>
  import ErrorMessage from './FieldErrorMessage'
  import Header5 from '_components/Headers/Header5';

  export default {
    components: {
      ErrorMessage,
      Header5
    },
    props: {
      id: {
        type: [Number, String],
        default: null
      }, type: {
        type: String,
        default: ''
      }, label: {
        type: String,
        default: ''
      }, placeholder: {
        type: String,
        default: ''
      }, value: {
        type: [Number, String],
        default: null
      }, rules: {
        type: String,
        default: ''
      }, errorMessages: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        keyword: ''
      }
    },
    watch: {
      value( newVal )
      {
        this.keyword = newVal
      }
    },
    mounted() {
      let input = document.getElementById(this.id);
      let timeout = null;
      let self = this
      input.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          self.$emit('input', e.target.value)
        }, 1000);
      });
    },
    methods: {
      onUpdateField() {
        // let input = document.getElementById(this.id);
        // let timeout = null;
        // input.addEventListener('keyup', function (e) {
        //   clearTimeout(timeout);
        //   timeout = setTimeout(function () {
        //     console.log('Input Value:', e.target.value);
        //   }, 3000);
        // });
        // this.$emit('input', this.$refs.inputField.value);
      },
      onSearch() {
        if (this.$route.name == 'vouchers-search') {
          this.$emit('input', this.keyword)
        } else {
          this.$router.push('vouchers/search')
        }
      }
    }
  }
</script>
<style lang='css' scoped>
  .search-icon {
    position: absolute;
    left: 0;
    padding: 9px 15px;
  }
</style>