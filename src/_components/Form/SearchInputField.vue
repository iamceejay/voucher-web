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
        <div class="w-full flex flex-row relative mt-2">
          <input
            :id="id"
            ref="inputField"
            v-model="keyword"
            :name="id"
            :type="type"
            class="input-field py-2 pl-10 px-3 rounded-full text-sm font-semibold font-body"
            :class="{ 'text-red-500 border-red-500': errors && errors.length > 0 }"
            :value="value"
            :placeholder="placeholder"
          />
          <a
            href="javascript:void(0)" class="absolute bg-peach px-2 sm:px-8 py-1 py-2 right-0 rounded-full text-white"
            @click="onSearch"
          >Suchen</a>
          <span class="search-icon">
            <i class="fas fa-search" />
          </span>
        </div>
        <ErrorMessage :errors="[...errors, ...errorMessages]" />
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