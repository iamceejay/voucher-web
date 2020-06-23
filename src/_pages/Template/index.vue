<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Templates"
        />
        <Button
          class="py-2 mt-3"
          label="Add Template"
          size="w-32 py-1"
          round="rounded-full"
          fontSize="text-xs"
          @onClick="onEdit(null)"
        />
        <Table
          class="mt-3"
          :fields="fields"
          :data="TEMPLATES"
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
        <TemplateModal
          :data="template"
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
  import TemplateModal from '_components/Modals/Modules/TemplateModal'
  import Button from '_components/Button/'

  export default {
    components: {
      MainLayout,
      Header1,
      Button,
      Table,
      TemplateModal,
    },
    data() {
      return {
        template: null,
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
            title: 'Template Name',
            dataClass: 'text-center'
          }, {
            name: 'photo_',
            title: 'Image',
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
      TEMPLATES() {
        return this.$store.getters.TEMPLATES;
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
      AUTH_USER(newVal) {
        this.onSetRole();
      },
      TEMPLATES(newVal) {
        this.tableIndex = this.tableIndex + 1
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.$store.commit('SET_TEMPLATES', [])
        await this.onFetchTemplates()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },  
    methods: {
      async onEdit( data )
      {
        this.onShowModal = !this.onShowModal
        this.template = data
      },
      async onDelete(data)
      {
        this.$swal({
          title: 'Delete Template',
          text: `Are you sure you want to delete this template?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            await this.$store.dispatch('DELETE_TEMPLATE', data)
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Deleting the template.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      },
      async onFetchTemplates()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_TEMPLATES')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>