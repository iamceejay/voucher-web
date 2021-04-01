<template>
  <div>
     <div class="bg-white h-32 md:h-64 overflow-hidden relative w-full" style="margin-top: 90px">
        <img class="bg-white h-full mx-auto" src="/placeholder-1080.jpg" />
        <div class="absolute bg-black bg-opacity-50 flex inset-0 items-center justify-center  text-2xl md:text-3xl text-white">{{ CATEGORY ? CATEGORY.name : 'Category Name' }}</div>
      </div>
    <MainLayout>
      <template #content>
        <div v-if="!IS_LOADING.status" class="flex flex-col mt-32 md:mt-64 mx-auto px-8 w-full" style="max-width: 1200px;">


          <!-- <BackBtn :show="true" class="mt-10" />
          <Header1
            :label="`${ CATEGORY ? CATEGORY.name : 'Category Name' }`"
          /> -->
          <!-- <VoucherList
            class="mb-3"
            title="Unsere Lieblinge"
            :data="FEATURED_VOUCHERS"
            :withQR="false"
            :isInline="true"
            type="feature"
            listId="featured-voucher-list"
            :hideIfEmpty="true"
          /> -->
          <div class="flex justify-end">
            <button
              type="button"
              class="bg-white border flex items-center mb-2 mr-3 px-2 py-2 rounded-md text-black text-xs"
              @click="showFilter = true"
              >
              <svg class="border border-peach h-4 icon mr-2 rounded-full text-peach w-4">
                <use xlink:href="/icons/sprite.svg#filter"/>
              </svg>
              Filter
            </button>
          </div>
          <VoucherList
            class="mb-3"
            title=""
            :data="VOUCHERS.data"
            :withPagination="true"
            :currentPage="VOUCHERS.current_page"
            :lastPage="VOUCHERS.last_page"
            sortLabel="Sortieren nach:"
            :withSort="false"
            filterLabel="Filtern nach:"
            :withFilter="false"
            :withQR="false"
            listId="search-voucher-list"
            :hasCategory="false"
            @onChange="onLoadData"
            @onFilter="onSearchData($event, 'filter')"
            @onSort="onSearchData($event, 'sort')"
            @onPaginate="onPaginateVouchers($event)"
          />
          <div
            class="bg-white bottom-0 fixed filter-sidebar transition-all duration-500 shadow-2xl top-0 grid"
            :class="{'show' : showFilter}"
            style="grid-template-rows: 1fr;">
            <div class="p-8 overflow-auto">
              <div class="border-b-2 flex items-center justify-between pb-4 mb-4">
                <div class="flex font-medium items-center text-xl">
                  <svg class="border border-peach h-6 icon mr-2 p-1 rounded-full text-peach w-6">
                    <use xlink:href="/icons/sprite.svg#filter"/>
                  </svg>
                  Filter
                </div>
                <div class="flex items-center text-sm">
                  Schließen
                  <svg @click="showFilter = false" class="h-4 icon ml-2 mr-6 w-4 cursor-pointer">
                    <use xlink:href="/icons/sprite.svg#x-circle"/>
                  </svg>
                </div>
              </div>
              <!-- PRICE -->
              <section class="border-b-2 mb-4 pb-4">
                <div class="font-medium text-xs mb-2">Preis</div>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="params.isPrice.from" type="number" placeholder="von" step="any" class="border mt-2 px-3 py-2 rounded-md text-xs">

                  <input v-model="params.isPrice.to" type="number" placeholder="bis" step="any" class="border mt-2 px-3 py-2 rounded-md text-xs">
                </div>
              </section>
              <!-- End PRICE -->
              <!-- SORT -->
              <section class="border-b-2 mb-4 pb-4">
                <div class="font-medium text-xs mb-2">Sortieren</div>
                <div>
                  <button
                    type="button"
                    class="px-2 py-2 rounded-md text-xs mr-3 mb-2 border border-black"
                    :class="params.isNewest ? 'bg-black text-white ' : ' text-black'"
                    @click="onSort(['isNewest'])"
                    >
                    Neueste
                  </button>
                  <button
                    type="button"
                    class="px-2 py-2 rounded-md text-xs mr-3 mb-2 border border-black"
                    :class="params.isMostPopular ? 'bg-black text-white ' : ' text-black'"
                    @click="onSort(['isMostPopular'])"
                    >
                    Beliebteste
                  </button>
                  <button
                    type="button"
                    class="px-2 py-2 rounded-md text-xs mr-3 mb-2 border border-black"
                    :class="params.isLowestPrice ? 'bg-black text-white ' : ' text-black'"
                    @click="onSort(['isLowestPrice'])"
                    >
                    {{ !params.isLowestPrice ? 'Günstigster' : 'Günstigster' }} Preis
                  </button>
                </div>
              </section>
              <!-- End SORT -->
              <!-- REGION -->
              <section class="border-b-2 mb-4 pb-4">
                <div class="font-medium text-xs mb-2">Region</div>
                <div>
                  <button
                    v-for="(region, index) in REGIONS"
                    :key="index"
                    type="button"
                    class="px-2 py-2 rounded-md text-xs mr-3 mb-2 border border-black"
                    :class="params.isRegion.indexOf(region.label) != -1 ? 'bg-black text-white' : 'text-black'"
                    @click="onChangeRegion(region.label)"
                    >
                    {{ region.label }}
                  </button>
                </div>
              </section>
              <!-- End REGION -->
              <!-- CATEGORY -->
              <section class="mb-4 pb-4">
                <div class="font-medium text-xs mb-2">Unterkategorien</div>
                <div v-if="SUBCATEGORIES && SUBCATEGORIES.length">
                  <span class="flex items-center mb-3 text-xs">
                    <svg class="icon h-4 w-4 mr-2">
                      <use :xlink:href="`/icons/sprite.svg#chevron-right`"/>
                    </svg>{{ currentCategory.name }}
                  </span>
                  <div class="ml-6">
                    <button
                      v-for="(category, index) in SUBCATEGORIES"
                      :key="index"
                      type="button"
                      class="px-2 py-2 rounded-md text-xs mr-3 mb-2 border border-black"
                      :class="params.subcategory.indexOf(category.id) !== -1 ? 'bg-black text-white' : 'text-black'"
                      @click="onChangeData('subcategory', category.id)"
                      >
                        {{ category.name }}
                    </button>
                  </div>
                </div>
              </section>
              <!-- End CATEGORY -->
              <!-- Fur -->
                <section class="mb-4 pb-4">
                  <div class="font-medium text-xs mb-2">Für</div>
                  <div>
                    <button
                      v-for="(target, index) in target_group"
                      :key="index"
                      type="button"
                      class="px-2 py-2 rounded-md text-xs mr-3 mb-2 border border-black"
                      :class="params.targets.indexOf(target) !== -1 ? 'bg-black text-white' : 'text-black'"
                      @click="onChangeData('targets', target)"
                      >
                      {{ target }}
                    </button>
                  </div>
                </section>
                <!-- End Fur -->
                <!-- Wetter / Saison -->
                <section class="mb-4 pb-4">
                  <div class="font-medium text-xs mb-2">Wetter / Saison</div>
                  <div>
                    <button
                      v-for="(season, index) in seasons"
                      :key="index"
                      type="button"
                      class="px-2 py-2 rounded-md text-xs mr-3 mb-2 border border-black"
                      :class="params.seasons.indexOf(season) !== -1 ? 'bg-black text-white' : 'text-black'"
                      @click="onChangeData('seasons', season)"
                      >
                      {{ season }}
                    </button>
                  </div>
                </section>
                <!-- End Wetter / Saison -->
            </div>
            <button
              type="button"
              @click="onSearchData"
              class="bg-peach px-5 py-3 text-sm text-white mt-3 text-center"
            >Ergebnisse Anzeigen</button>
          </div>
        </div>
      </template>
    </MainLayout>
  </div>
</template>
<script>
  import MainLayout from '_layouts'
  import VoucherList from '_components/List/Modules/VoucherList/';
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Home',
    components: {
      MainLayout,
      VoucherList,
      Header1,
    },
    data() {
      return {
        currentCategory: null,
        showFilter: false,
        target_group: ['Paare', 'Freunde', 'Kinder', 'Frauen', 'Männer'],
        seasons: ['Sommer', 'Winter', 'Schönwetter', 'Schlechtwetter'],
        params: {
          page: 1,
          paginate: 9,
          isNewest: false,
          isLowestPrice: false,
          isMostPopular: false,
          seed: new Date().getTime(),
          isCategory: [],
          isRegion: [],
          isPrice: {
            from: '',
            to: ''
          },
          targets: [],
          seasons: [],
          subcategory: []
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
      FEATURED_VOUCHERS()
      {
        return this.$store.getters.FEATURED_VOUCHERS
      },
      NEWEST_VOUCHERS()
      {
        return this.$store.getters.NEWEST_VOUCHERS
      },
      CATEGORY()
      {
        return this.$store.getters.CATEGORY
      },
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      IS_LOAD_MORE()
      {
        return this.$store.getters.IS_LOAD_MORE
      },
      IS_PROCESSING()
      {
        return this.$store.getters.IS_PROCESSING
      },
      REGIONS()
      {
        return this.$store.getters.REGIONS
      },
      SUBCATEGORIES() {
        let selectCategory = this.CATEGORIES.find(category => category.id == this.currentCategory.id)
        return selectCategory.subcategories
      },
      // IS_INFINITE_LOAD()
      // {
      //   return this.$store.getters.IS_INFINITE_LOAD
      // },
    },
    watch: {
      async '$route.params.slug'()
      {
        await this.$store.commit('SET_FEATURED_VOUCHERS', [])
        await this.$store.commit('SET_NEWEST_VOUCHERS', [])
        await this.$store.commit('SET_VOUCHERS', [])
        // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        this.params = {
          page: 1,
          paginate: 5,
          isNewest: true,
          isLowestPrice: false,
          isMostPopular: false,
          isCategory: [],
          isRegion: [],
        }
        await this.onFetchData()
      },

      // async IS_LOAD_MORE(newVal)
      // {
      //   if( newVal ) {
      //     await this.onLoadData({
      //       ...this.params,
      //       page: this.params.page + 1
      //     })
      //     await this.$store.commit('SET_IS_LOAD_MORE', false)
      //   }
      // },
    },
    mounted() {
      (async() => {
        // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_FEATURED_VOUCHERS', [])
        await this.$store.commit('SET_NEWEST_VOUCHERS', [])
        await this.$store.commit('SET_VOUCHERS', [])

        await this.onFetchData()
      })()
    },
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
      async onPaginateVouchers(action)
      {
        let params =
        {
          ...this.params,
          page: (action === "prev") ? this.params.page - 1 : this.params.page + 1
        }
        await this.$store.commit('SET_VOUCHERS', [])
        await this.onLoadData(params)
      },
      async onSearchData( data = null, action )
      {
        if ( action == 'sort' ) {
          this.params.keyword = ''
        }
        let params = ( action == 'sort' || action == 'filter' )
          ? {
            ...this.params,
            ...data,
            page: 1
          }
          : {
            ...this.params,
            page: 1
          }

        if (params.isPrice.from && params.isPrice.to) {
          params.isPrice = {
            from: parseFloat(params.isPrice.from),
            to: parseFloat(params.isPrice.to),
          }
        } else {
          params.isPrice = []
        }

        this.showFilter = false

        await this.$store.commit('SET_VOUCHERS', [])
        await this.onLoadData(params)
      },
      async onFetchData()
      {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchCategory()
          await this.onFetchFeaturedVouchers()
          await this.onFetchNewestVouchers()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      },
      async onLoadData( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data,
          isCategory: [ this.CATEGORY.name ]
        }
        await this.onFetchNewestVouchers()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchFeaturedVouchers()
      {
        try {
          await this.$store.dispatch('FETCH_FEATURED_VOUCHERS', {
            isCategory: this.params.isCategory
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchNewestVouchers()
      {
        try {
          let params = { ...this.params}
           if (params.isPrice.from && params.isPrice.to) {
            params.isPrice = {
              from: parseFloat(params.isPrice.from),
              to: parseFloat(params.isPrice.to),
            }
          } else {
            params.isPrice = []
          }

          const data = await this.$store.dispatch('FETCH_SEARCH_VOUCHERS', params)
          if( data.vouchers.next_page_url == null ) {
            await this.$store.commit('SET_IS_INFINITE_LOAD', false)
          }
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchCategory()
      {
        const { voucher_categories: categories }  = await this.$store.dispatch('FETCH_CATEGORIES')
        this.currentCategory = categories.find((_category) => {
          let categoryName = this.$helpers.toSlug(_category.name)
          return categoryName == this.$route.params.slug
        })
        try {
          await this.$store.dispatch('FETCH_CATEGORY', this.currentCategory.id)
          if( this.CATEGORY ) {
            this.params.isCategory = [ this.CATEGORY.name ]
          }
        } catch (err) {
          console.log('err', err)
        }
      },
      onSort(data) {
        this.params = {
          ...this.params,
          isMostPopular: false,
          isNewest: false,
          isLowestPrice: false,
          [data]: !this.params[data]
        }
      },
      onChangeRegion(name) {
        let index = this.params.isRegion.indexOf(name)

        if (index == -1) {
          this.params.isRegion.push(name)
        } else {
          this.params.isRegion.splice(index, 1);
        }
      },
      onChangeCategory(name) {
        let index = this.params.isCategory.indexOf(name)

        if (index == -1) {
          this.params.isCategory.push(name)
        } else {
          this.params.isCategory.splice(index, 1);
        }
      },
      onChangeData(key, name) {
        console.log(key, name)
        let index = this.params[key].indexOf(name)

        if (index == -1) {
          this.params[key].push(name)
        } else {
          this.params[key].splice(index, 1);
        }
      }
    }
  }
</script>
<style lang='css' scoped>
.filter-sidebar {
  width: 100%;
  z-index: 99999;
  right: -500px;
}
.filter-sidebar.show {
  right: 0;
}

@screen sm {
    .filter-sidebar {
      max-width: 350px;
    }
}
</style>