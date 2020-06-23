<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Manage Category"
        />
        <Button
          class="py-2 mt-3"
          label="Add Category"
          size="w-32 py-1"
          round="rounded-full"
          fontSize="text-xs"
          @onClick="onEdit(null)"
        />
        <Table
          class="mt-3"
          :fields="fields"
          :data="CATEGORIES"
        >
          <template #customActions="props">
            <div class="flex flex-row justify-center">
              <a 
                class="text-xs text-indigo-500 underline text-center mx-2" 
                href="javascript:void(0)"
                @click="onEdit(props.data)"
              >
                <i class="fas fa-pen" />
              </a>
              <a 
                class="text-xs text-red-900 underline text-center mx-2" 
                href="javascript:void(0)"
                @click="onDelete(props.data)"
              >
                <i class="fas fa-trash" />
              </a>
            </div>
          </template>
        </Table>
        <CategoryModal
          :data="category"
          :onShowModal="onShowModal"
          @onClose="onShowModal = false"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import Table from '_components/Table';
  import CategoryModal from '_components/Modals/Modules/CategoryModal'
  import Button from '_components/Button/'

  export default {
    components: {
      MainLayout,
      Header1,
      Button,
      Table,
      CategoryModal,
    },
    data() {
      return {
        category: null,
        onShowModal: false,
        search: '',
        tableIndex: 0,
        fields: [
          {
            name: 'sequence_',
            title: '',
            dataClass: 'text-center'
          }, {
            name: 'name',
            title: 'Category Name',
          }, {
            name: 'icon_',
            title: 'Icon',
          }, {
            name: 'actions',
            title: 'Actions',
          }
        ],
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      CATEGORIES() {
        return this.$store.getters.CATEGORIES;
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
      CATEGORIES() {
        this.tableIndex = this.tableIndex + 1
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.$store.commit('SET_CATEGORIES', [])
        await this.onFetchCategories()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onEdit( data )
      {
        this.onShowModal = !this.onShowModal
        this.category = data
      },
      async onDelete(data)
      {
        this.$swal({
          title: 'Delete Category',
          text: `Are you sure you want to delete this category?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('DELETE_CATEGORY', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Deleting the category.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      },
      async onFetchCategories()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_CATEGORIES')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>