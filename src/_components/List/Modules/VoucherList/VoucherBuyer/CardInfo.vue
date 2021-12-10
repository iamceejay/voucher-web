<template>
  <div
    :class="`cursor-pointer flex flex-col text-black w-full border`"
    @click="onClickHeader()"
  >
    <div class="card-header  p-5">
      <div class="flex flex-col w-3/5 break-words">
        <div class="text-base font-semibold sm:h-12">
          {{ voucher.title || 'Gutscheintitel' }}
        </div>
        <div class="text-sm">
          Von {{ AUTH_USER.data.detail.fullname }}
        </div>
      </div>
      <div class="self-center w-2/5">
        <img
          class="card-logo ml-auto"
          src="@/_assets/img/epasnets-heart-light.png"
          alt=""
        />
      </div>
    </div>
    <div class="card-content">
      <div class="w-full flex flex-col break-words">
        <div
          v-if="order && userVoucher && userVoucher.custom_image"
          class="w-2/5 p-1"
        >
          <img
            class="card-image"
            :src="onSetCustomImage(userVoucher.custom_image)"
            alt=""
          />
        </div>
        <div v-else>
          <div
            :style="{
              backgroundImage:
                'url(' +
                onSetCustomImage(
                  voucher.data_json != null &&
                    voucher.data_json.background_image
                    ? voucher.data_json.background_image
                    : voucher.custom_background_image ||
                        voucher.background_image
                ) +
                ')',
              backgroundColor: 'white',
            }"
            style="background-size: cover"
            class="card-image"
          ></div>
        </div>
      </div>
      <div class="flex flex-col p-5 break-words card-description">
        <div class="text-xs leading-5">
          {{
            (voucher.note || voucher.description).length > 120
              ? (voucher.note || voucher.description).slice(0, 120) + '...'
              : voucher.note || voucher.description || 'Beschreibung'
          }}
        </div>
      </div>
      <div class="flex flex-col p-5 bg-white">
        <div class="text-center w-full mb-2">epasnets... mit Liebe verschenkt!</div>
        <div class="text-2xs opacity-50">*Durch die Gestaltung dieses Gutscheins wurde ein Fixbetrag an soziale Projekte in unserer Epasnets-Region gespendet.</div>
      </div>
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
import moment from 'moment';
import { formatDate } from '_helpers/CustomFunction';

export default {
  components: {
    QrcodeVue,
  },
  props: {
    cardId: {
      type: String,
      default: 'voucher-card',
    },
    listId: {
      type: String,
      default: 'voucher-list',
    },
    voucher: {
      type: Object,
      default: null,
    },
    order: {
      type: Object,
      default: null,
    },
    userVoucher: {
      type: Object,
      default: null,
    },
    qr: {
      type: Object,
      default: null,
    },
    isFlippable: {
      type: Boolean,
      default: true,
    },
    withQR: {
      type: Boolean,
      default: true,
    },
    isBought: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      role: null,
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    valueDisplay() {
      if (this.voucher.type == 'quantity') {
        if (
          ['wallet', 'voucher-detail', 'orders'].indexOf(this.$route.name) != -1
        ) {
          return this.$helpers.convertCurrency(
            this.order
              ? this.order.voucher.price_filter
              : this.voucher.price_filter
          );
        } else {
          return this.$helpers.convertCurrency(
            this.order ? this.order.voucher.qty_val : this.voucher.qty_val
          );
        }
      } else {
        if (this.isBought) {
          return this.$helpers.convertCurrency(this.order.value);
        } else {
          if (['orders'].indexOf(this.$route.name) != -1) {
            return this.$helpers.convertCurrency(this.order.total_value);
          }
          if (
            ['wallet', 'voucher-detail', 'orders'].indexOf(this.$route.name) !=
            -1
          ) {
            return this.$helpers.convertCurrency(this.order.value);
          }
          return `${this.$helpers
            .convertCurrency(this.voucher.min || this.voucher.val_min)
            .replace('€', '')}
              ${
                ['vouchers-detail', 'cart'].indexOf(this.$route.name) != -1
                  ? ' - ' +
                    this.$helpers.convertCurrency(
                      this.voucher.max || this.voucher.val_max
                    )
                  : ''
              }`;
        }
      }
    },
    months() {
      let filteredMonths = [];
      if (this.$route.name == 'vouchers-new') {
        return this.voucher.months;
      }
      return this.voucher && this.voucher.valid_date
        ? this.voucher.valid_date
            .filter((date) => {
              let month = date.start.split('-')[1];
              if (filteredMonths.indexOf(month) == -1) {
                filteredMonths.push(month);
                return true;
              }
              return false;
            })
            .map((date) => parseInt(moment(date.start).format('x')))
        : [];
    },
  },
  watch: {
    AUTH_USER(newVal) {
      this.onSetRole();
    },
  },
  created() {
    this.onSetRole();
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    onGetSentVia(value) {
      switch (value) {
        case 'voucher_download':
          return 'Verschenkt';
          break;
        case 'email':
          return 'Verschenkt';
          break;
        case 'transferred':
          return 'Übertragen';
          break;
        default:
          break;
      }
    },
    onGetExpiryDate(data) {
      let expire = data.voucher.expiry_date ? data.voucher.expiry_date : 4;
      return moment(data.created_at)
        .local()
        .add(expire, 'year')
        .format('DD.MM.YYYY');
    },
    getMonth(month) {
      return moment(parseInt(+month))
        .lang('de')
        .format('MMM');
    },
    onClickHeader() {
      if (this.role === 'user' || !this.role) {
        if (this.withQR) {
          // if( (!this.order || (this.order && !this.order.sent_via)) ) {
          this.$emit('onFlip');
          // }
        } else {
          this.$router.push(`/vouchers/${this.voucher.id}`);
          // this.$store.commit('SET_VOUCHER_ID', this.voucher.id)
          // this.$store.commit('SET_MODAL', true)

          this.$store.commit('SET_SELLER_MODAL', false);
          document.body.classList.remove('overflow-hidden');
        }
      } else {
        if (this.role == 'admin') {
          // this.$router.push(`/vouchers/${this.voucher.id}`)
          this.$store.commit('SET_VOUCHER_ID', this.voucher.id);
          this.$store.commit('SET_MODAL', true);

          this.$store.commit('SET_SELLER_MODAL', false);
          document.body.classList.remove('overflow-hidden');
        } else {
          this.$emit('onFlip');
        }
      }
    },
    onSetCustomImage(value) {
      if (!value) return '';
      return value.search('base64') < 0
        ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
        : value;
    },
    onSetImage(value) {
      return value.search('base64') < 0
        ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
        : value;
    },
    onSetRole() {
      if (this.AUTH_USER?.data?.user_role) {
        this.role = this.AUTH_USER.data.user_role.role.name;
      }
    },
  },
};
</script>
<style lang="css" scoped>
.text-base {
  font-size: 1em;
}
.text-xl {
  font-size: 1.25em;
}
.text-lg {
  font-size: 1.125em;
}
.text-sm {
  font-size: 0.875em;
}
.text-xs {
  font-size: 1em;
}
.text-2xs {
  font-size: 0.6em;
}

.p-1 {
  padding: 0.25em;
}

.p-5 {
  padding: 1.25em;
}

.h-12 {
  height: 3em;
}

.leading-5 {
  line-height: 1.5em;
}
.card-description {
  height: 8.4375em;
  background-color: var(--card-description-background, #ff5563);
  color: var(--card-description-color, white);
}

.card-footer,
.card-header {
  background-color: var(--card-header-footer-background, #fff);
  color: var(--card-header-footer-color, #000);
}

.card-footer {
  height: 10em;
}

.card-image {
  padding-top: 92.65%;
  width: 100%;
}

.card-header {
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
}
.card-logo {
  width: auto;
  max-height: 2.8125em;
}
.card-qr {
  align-self: center;
  width: 2.1875em;
  /* margin-left: auto; */
  /* margin: 0px 15px; */
}

.qr-text {
  margin-top: 2px;
  /* margin-right: 6px; */
  font-size: 9px;
}
</style>
