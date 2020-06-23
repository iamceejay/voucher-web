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
        label="Kategorie"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isCategory ? 'primary' : 'info' }`"
        @onClick="isCategory = !isCategory"
      />
      <Button
        :key="`isRegion-${isRegion}`"
        class="py-2 px-1 w-full md:w-40"
        label="Region"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isRegion ? 'primary' : 'info' }`"
        @onClick="isRegion = !isRegion"
      />
      <Button
        :key="`isPrice-${isPrice}`"
        class="py-2 px-1 w-full md:w-40"
        label="Preis"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isPrice ? 'primary' : 'info' }`"
        @onClick="isPrice = !isPrice"
      />
    </div>
    <div class="flex flex-col md:flex-row">
      <MultipleCheckboxField
        v-if="isCategory"
        label="Select kategorien: "
        class="mx-2 mr-5"
        style="margin-bottom: 5px;"
        name="categories"
        :options="categories"
        @onChange="onChangeCategory"
      />
      <MultipleCheckboxField
        v-if="isRegion"
        label="Select regions: "
        class="mx-2 mr-5"
        style="margin-bottom: 5px;"
        name="regions"
        :options="regions"
        @onChange="onChangeRegion"
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
          </form>
        </ValidationObserver>
      </div>
    </div>
    <Button
      v-if="isCategory || isRegion || isPrice"
      class="px-2 w-32 mb-3"
      label="Apply filter"
      size="w-full"
      round="rounded-full"
      fontSize="text-xs"
      @onClick="onFilter"
    />
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
      }
      // , isRegion: {
      //   type: Boolean,
      //   default: false
      // }, isCategory: {
      //   type: Boolean,
      //   default: false
      // }, isPrice: {
      //   type: Boolean,
      //   default: false
      // },
    },
    data() {
      return {
        isCategory: false,
        isRegion: false,
        isPrice: false,
        categories: [],
        regions: [],
        selectedCategories: [],
        selectedRegions: [],
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
      },
      REGIONS()
      {
        return this.$store.getters.REGIONS
      },
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
      },
      REGIONS()
      {
        this.onSetRegions()
      }
    },
    mounted() {
      this.onSetCategories()
      this.onSetRegions()
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
        // this.$emit('onFilter', [
        //   'category',
        //   data
        // ])
      },
      onChangeRegion(data)
      {
        this.selectedRegions = data;
        // this.$emit('onFilter', [
        //   'region',
        //   data
        // ])
      },
      onFilter()
      {
        const data = {
          isCategory: !this.isCategory ? null : this.selectedCategories,
          isRegion: !this.isRegion ? null : this.selectedRegions,
          isPrice: !this.isPrice ? null : this.price,
        }
        this.$emit('onFilter', data)
      },
      onSetCategories()
      {
        this.categories = this.CATEGORIES.map( row => row.name)
      },
      onSetRegions()
      {
        this.regions = this.REGIONS.map( row => row.label)
      },
    }
  }
</script>
<style lang='css' scoped>
</style>