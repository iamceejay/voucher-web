<template>
  <MainLayout>
    <template #content>
      <div
        v-if="!IS_LOADING.status"
        class="content-container flex flex-col w-full px-8"
      >
        <Header1 label="Manage Subdomain" />
        <Button
          class="py-2 mt-3"
          label="Add Subdomain"
          size="w-32 py-1"
          round="rounded-full"
          fontSize="text-xs"
          @onClick="onShowModal = true"
        />
        <Table class="mt-3" :fields="fields" :data="subdomains">
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
        <Modal
          :data="data"
          :sellers="seller"
          :onShowModal="onShowModal"
          @onCloseModal="onCloseModal"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
import { post } from '_helpers/ApiService';
import MainLayout from '_layouts';
import Header1 from '_components/Headers/Header1';
import Table from '_components/Table';
import Modal from './Modal.vue';
import Button from '_components/Button/';
import moment from 'moment';

export default {
  components: {
    MainLayout,
    Header1,
    Button,
    Table,
    Modal,
  },
  data() {
    return {
      seller: null,
      subdomains: null,
      onShowModal: false,
      data: null,
      search: '',
      tableIndex: 0,
      fields: [
        {
          name: 'username',
          title: 'Seller',
          dataClass: 'text-center',
        },
        {
          name: 'subdomain',
          title: 'Subdomain',
        },
        {
          name: 'subdomain_updated',
          title: 'Updated',
        },
        {
          name: 'actions',
          title: 'Actions',
        },
      ],
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
  },
  watch: {
    SUBCATEGORIES() {
      this.tableIndex = this.tableIndex + 1;
    },
  },
  mounted() {
    (async () => {
      try {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.fetchSeller();
        await this.fetchSubdomain();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    async onEdit(data) {
      if (moment().diff(moment(data.subdomain_updated), 'minute') < 2880) {
        this.$swal({
          icon: 'warning',
          title: 'Warnung!',
          text: 'Kann nicht bearbeitet werden',
          confirmButtonColor: '#48BB78',
          confirmButtonText: 'Bestätigen',
        });
        return;
      }

      this.onShowModal = !this.onShowModal;
      this.data = data;
    },
    async onDelete(data) {
      this.$swal({
        title: 'Kategorie löschen',
        text: `Bist du sicher, dass du diese Kategorie löschen möchtest? `,
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'Bestätigen',
        cancelButtonText: 'Abbrechen',
      }).then(async (result) => {
        if (result.value) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
          let form = {
            name: '',
          };
          await post(`user/company/update/${data.id}`, form);
          await this.fetchSeller();
          await this.fetchSubdomain();
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
          this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Deleting the category.',
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          });
        }
      });
    },
    async fetchSeller() {
      try {
        let params = {
          keyword: '',
          role: 'seller',
          subdomain_empty: true,
        };
        const { users } = await this.$store.dispatch(
          'FETCH_USER_FILTER',
          params
        );
        this.seller = users;
      } catch (err) {
        console.log('err', err);
      }
    },
    async fetchSubdomain() {
      try {
        let params = {
          keyword: '',
          role: 'seller',
          subdomain: true,
        };

        const { users: subdomains } = await this.$store.dispatch(
          'FETCH_USER_FILTER',
          params
        );

        this.subdomains = subdomains;
      } catch (err) {
        console.log('err', err);
      }
    },
    async onCloseModal(submitted) {
      this.onShowModal = false;
      if (!submitted) {
        return;
      }

      await this.$store.commit('SET_IS_LOADING', { status: 'open' });
      await this.fetchSeller();
      await this.fetchSubdomain();
      await this.$store.commit('SET_IS_LOADING', { status: 'close' });
    },
  },
};
</script>
<style lang="css" scoped></style>
