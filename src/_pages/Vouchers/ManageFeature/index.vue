<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full">
        <Header1
          label="Featured Vouchers"
        />
        <!-- <Button
          class="py-2 mt-3"
          label="Add Feature"
          size="w-32 py-1"
          round="rounded-full"
          fontSize="text-xs"
          @onClick="onEdit(null)"
        /> -->
        <Table
          class="mt-3"
          :fields="fields"
          :perPage="10"
          :data="VOUCHERS"
        >
          <template #customActions="props">
            <div class="flex flex-row justify-center">
              <!-- <a 
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
              </a> -->
            </div>
          </template>
        </Table>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import Table from '_components/Table';
  import Button from '_components/Button/'

  export default {
    components: {
      MainLayout,
      Header1,
      Button,
      Table,
    },
    data() {
      return {
        role: null,
        voucher: null,
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
            title: 'Voucher Name',
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
      VOUCHERS() {
        return this.$store.getters.VOUCHERS;
      },
    },
    watch: {
      AUTH_USER(newVal) {
        this.onSetRole();
      },
      VOUCHERS() {
        this.tableIndex = this.tableIndex + 1
      },
    },
    mounted() {
      this.onSetRole();
    },
    methods: {
      async onEdit( data )
      {
        // this.onShowModal = !this.onShowModal
        // this.voucher = data
      },
      async onDelete(data)
      {
        this.$swal({
          title: 'Delete Feature',
          text: `Are you sure you want to delete this featured voucher?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then( async (result) => {
          if(result.value){
            await this.$store.dispatch('DELETE_CATEGORY', data)
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Deleting the featured voucher.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      },
      onSetRole() {
        if (this.AUTH_USER?.data?.user_role) {
          this.role = this.AUTH_USER.data.user_role.role.name;
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>