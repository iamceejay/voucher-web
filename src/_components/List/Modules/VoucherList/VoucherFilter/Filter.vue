<template>
  <div class="w-full flex flex-col">
    <Header4 
      v-if="filterLabel != ''"
      class="px-1"
      :label="filterLabel"
    />
    <div class="flex flex-row">
      <Button
        :key="`isCategory-${isCategory}`"
        class="py-2 px-1 w-full md:w-40"
        label="Category"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isCategory ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['category'])"
      />
      <Button
        :key="`isRegion-${isRegion}`"
        class="py-2 px-1 w-full md:w-40"
        label="Region"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isRegion ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['region'])"
      />
      <Button
        :key="`isPrice-${isPrice}`"
        class="py-2 px-1 w-full md:w-40"
        label="Price"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isPrice ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['price'])"
      />
    </div>
    <div class="flex flex-col md:flex-row">
      <MultipleCheckboxField
        v-if="isCategory"
        label="Select categories: "
        class="mx-2 mr-5"
        name="categories"
        :options="categories"
        @onChange="onChangeCategory"
      />
      <div
        v-if="isPrice"
        class="flex flex-col mb-2 mr-5"
      >
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form 
            class="flex flex-col"
            @submit.prevent="handleSubmit(onFilterPrice(invalid))"
          >
            <Header5
              class="px-1"
              label="Price Filter:"
            />
            <div class="flex flex-row px-3">
              <InputField
                id="priceFrom"
                v-model="price.from"
                type="number"
                class="w-full md:w-1/2 m-auto mt-1 mr-2"
                style="margin-bottom: 10px;"
                label="From"
                placeholder="Enter price"
                rules="required"
                inputContainer="py-1"
                @input="onChangePrice"
              />
              <InputField
                id="priceTo"
                v-model="price.to"
                type="number"
                class="w-full md:w-1/2 m-auto mt-1 mr-2"
                style="margin-bottom: 10px;"
                label="To"
                placeholder="Enter price"
                rules="required"
                inputContainer="py-1"
                @input="onChangePrice"
              />
            </div>
            <Button
              class="px-3 w-32"
              type="submit"
              label="Apply filter"
              size="w-full"
              round="rounded-full"
              fontSize="text-xs"
            />
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
  import MultipleCheckboxField from '_components/Form/MultipleCheckboxField'
  import Button from '_components/Button/'
  import Header4 from '_components/Headers/Header4';
  import Header5 from '_components/Headers/Header5';
  import InputField from "_components/Form/InputField";

  export default {
    components: {
      Button,
      Header4,
      Header5,
      MultipleCheckboxField,
      InputField,
    },
    props: {
      filterLabel: {
        type: String,
        default: ''
      }, isRegion: {
        type: Boolean,
        default: false
      }, isCategory: {
        type: Boolean,
        default: false
      }, isPrice: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        categories: [],
        selectedCategories: [],
        price: {
          from: 0,
          to: 0,
        }
      }
    },
    computed: {
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      }
    },
    watch: {
      isCategory(newVal)
      {
        if( newVal ) {
          this.selectedCategories = []
        }
      },
      isPrice(newVal)
      {
        if( newVal ) {
          this.price = {
            from: 0,
            to: 0,
          }
        }
      },
      CATEGORIES()
      {
        this.onSetCategories()
      }
    },
    mounted() {
      this.onSetCategories()
    },
    methods: {
      onFilterPrice( invalid )
      {
        if( !invalid ) {
          this.$emit('onFilter', ['price', {
            from: parseFloat(this.price.from),
            to: parseFloat(this.price.to),
          }])
        }
      },
      onChangePrice(data)
      {
        this.price = {
          from: this.price.from < 0 ? null : this.price.from,
          to: this.price.to < 0 ? null : this.price.to,
        }
      },
      onChangeCategory(data)
      {
        this.selectedCategories = data;
        this.$emit('onFilter', [
          'category',
          data
        ])
      },
      onSetCategories()
      {
        this.categories = this.CATEGORIES.map( categ => categ.label )
      }
    }
  }
</script>
<style lang='css' scoped>
</style>