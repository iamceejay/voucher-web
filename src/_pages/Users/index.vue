<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
        <Header1
          label="User Management"
        />
        <div class="flex flex-col w-full p-2">
          <SearchInputField
            id="search-user"
            v-model="params.keyword"
            :value="params.keyword"
            class="m-2"
            placeholder="Search for users..."
            @input="onChangeTab(params.role)"
          />
          <div class="flex flex-row btn-switch m-2 w-full md:w-1/2 lg:w-4/12">
            <a 
              class="btn btn-left"
              :class="(params.role == 'user') ? 'active' : ''"
              href="javascript:void(2)"
              @click="onChangeTab('user')"
            >
              Users
            </a>
            <a 
              class="btn btn-right"
              :class="(params.role == 'seller') ? 'active' : ''"
              href="javascript:void(2)"
              @click="onChangeTab('seller')"
            >
              Sellers
            </a>
          </div>
          <Table
            class="mt-3"
            :fields="fields"
            :data="USERS"
          >
            <template #customActions="props">
              <div class="flex flex-col">
                <a 
                  class="text-xs text-indigo-500 underline text-center" 
                  href="javascript:void(0)"
                >
                  Take {{ params.role }} role
                </a>
                <router-link
                  v-if="params.role == 'seller'"
                  :to="`/settings/user/${props.data.id}`"
                  class="text-xs text-indigo-500 underline text-center" 
                >
                  Payout setings
                </router-link>
                <a 
                  class="text-xs text-indigo-500 underline text-center" 
                  href="javascript:void(0)"
                  @click="onDelete(props.data)"
                >
                  Delete
                </a>
              </div>
            </template>
          </Table>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import SearchInputField from '_components/Form/SearchInputField';
  import Table from '_components/Table';

  export default {
    components: {
      MainLayout,
      Header1,
      SearchInputField,
      Table,
    },
    data() {
      return {
        tableIndex: 0,
        params: {
          keyword: '',
          role: 'user',
        },
        fields: [
          {
            name: 'username',
            title: 'Username',
            dataClass: 'text-center',
          }, {
            name: 'detail',
            title: 'Name',
            dataClass: 'text-center',
            formatter: val => `${val.firstName} ${val.lastName}`, 
          }, {
            name: 'actions',
            title: 'Actions',
          }
        ],
        search: ''
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      USERS() {
        return this.$store.getters.USERS;
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
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchUserFilter()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onDelete(data)
      {
        this.$swal({
          title: 'Delete User',
          text: `Are you sure you want to delete this user?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then( async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('DELETE_USER', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Deleting the user.',
              confirmButtonColor: '#6C757D',
            });
          }   
        })
      },
      async onChangeTab( role )
      {
        this.params.role = role
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.onFetchUserFilter()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchUserFilter()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_USER_FILTER', this.params)
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
  .btn-switch {
    margin: 0 auto;
  }
  .btn-switch .btn {
    padding: 5px 10px;
    width: 100%;
    border: 1px solid #1a202c;
    text-align: center;
  }
  .btn-switch .btn.active {
    background-color: #1a202c;
    color: #fff;
  }
  .btn-switch .btn.btn-left {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .btn-switch .btn.btn-right {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>