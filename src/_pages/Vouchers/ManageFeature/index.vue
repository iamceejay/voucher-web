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
              <a 
                class="text-lg text-red-900 underline text-center mx-2" 
                href="javascript:void(0)"
                @click="onChange(props.data)"
              >
                <i :class="`${ props.data.isFeatured ? 'fas' : 'far' } fa-check-circle`" />
              </a>
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
            name: 'voucher_',
            title: 'Voucher Name',
          }, {
            name: 'voucher_feature_',
            title: 'Status',
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
      async onChange(data)
      {
        this.$swal({
          title: `${ data.isFeatured ? 'Removing' : 'Adding' } Featured Voucher`,
          text: `Are you sure you want to ${ data.isFeatured ? 'remove' : 'add' } this to featured vouchers?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then( async (result) => {
          if(result.value){
            const newData = this.VOUCHERS.map( row => {
              if( row.id == data.id ) {
                row.isFeatured = !row.isFeatured
              }
              return row
            })
            await this.$store.commit('SET_VOUCHERS', newData)
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: `${ !data.isFeatured ? 'Removing' : 'Adding' } from the featured voucher.`,
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