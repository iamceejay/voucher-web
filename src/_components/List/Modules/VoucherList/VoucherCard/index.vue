<template>
  <div style="padding-bottom: 15px">
    <div
      class="bg-white flex flex-shrink-0 voucher-card-container border"
      :class="{ flip: isFlip, 'truncate-company': showRegion }"
      :style="{
        '--bgColor': !isFlip ? 'transparent' : 'white',
        '--card-description-background':
          voucher.data_json != null
            ? voucher.data_json.background_description_color
            : voucher.background_description_color,
        '--card-description-color':
          voucher.data_json != null
            ? voucher.data_json.description_color
            : voucher.description_color,
        '--card-header-footer-background':
          voucher.data_json != null
            ? voucher.data_json.header_and_footer_background_color
            : voucher.header_and_footer_background_color,
        '--card-header-footer-color':
          voucher.data_json != null
            ? voucher.data_json.header_and_footer_color
            : voucher.header_and_footer_color,
        fontSize: 'clamp(4px, 4.360vw, 16px)',
      }"
    >
      <div class="relative flex flex-col w-full bg-aid rounded">
        <CardInfo
          v-if="!isAction"
          :voucher="voucher"
          :order="order"
          :qr="qr"
          :userVoucher="userVoucher"
          :isFlippable="isFlippable"
          :withQR="withQR"
          :listId="listId"
          :cardId="cardId"
          :isBought="isBought"
          @onFlip="onFlip()"
        />
        <CardAction
          v-if="isAction && role === 'seller'"
          :voucher="voucher"
          @onFlip="onFlip()"
        />
        <CardUserAction
          v-if="isAction && role === 'user'"
          :qr="qr"
          :userVoucher="userVoucher"
          :order="order"
          @onFlip="onFlip()"
        />
        <div
          v-if="showRegion"
          class="-mb-2.5 absolute bottom-0 flex inset-x-0 justify-center"
        >
          <div class="bg-white border px-2 rounded-md shadow-sm text-xs">
            <span
              v-if="voucher.seller.company.region != 'Innsbruck und Umgebung'"
            >
              Tiroler {{ voucher.seller.company.region }}
            </span>
            <span v-else>
              {{ voucher.seller.company.region }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        v-if="AUTH_USER.role.name == 'seller' || AUTH_USER.role.name == 'scanner'"
        class="flex flex-col w-full mt-4 order__form"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <section class="flex items-center justify-center">
          <div
            v-if="voucher.type == 'quantity'"
            class="flex flex-col items-end mr-3 md:mr-12"
          >
            <span class="font-medium text-xl">
              {{
                $helpers.convertCurrency(
                  form.value *
                    (voucher.type != 'quantity' ? 1 : voucher.qty_val)
                )
              }}
            </span>
          </div>
          <template v-else>
            <div class="mr-2 w-28 relative">
              <input
                v-model="form.value"
                class="bg-white"
                type="number"
                :min="
                  voucher.type == 'quantity' ? voucher.qty_min : voucher.val_min
                "
                :max="
                  voucher.type == 'quantity' ? voucher.qty_max : voucher.val_max
                "
                style="
                          padding-right: 2em;
                          text-align: right;
                        "
                required
              />
              <span class="font-medium absolute mt-2" style="right: 15px;"
                >€</span
              >
            </div>
          </template>

          <div class="order__form-group mr-2">
            <input
              v-if="voucher.type == 'quantity'"
              v-model="form.value"
              class="bg-white"
              type="number"
              disabled
              :min="
                voucher.type == 'quantity' ? voucher.qty_min : voucher.val_min
              "
              :max="
                voucher.type == 'quantity' ? voucher.qty_max : voucher.val_max
              "
              required
            />
            <input
              v-else
              v-model="form.qty"
              class="bg-white"
              type="number"
              disabled
              :min="
                voucher.type == 'quantity' ? voucher.qty_min : voucher.val_min
              "
              :max="
                voucher.type == 'quantity' ? voucher.qty_max : voucher.val_max
              "
              required
            />
            <div
              class="order__form-number order-up"
              @click="
                updateValue(voucher.type == 'quantity' ? 'value' : 'qty', 'add')
              "
            >
              +
            </div>
            <div
              class="order__form-number order-down"
              @click="
                updateValue(
                  voucher.type == 'quantity' ? 'value' : 'qty',
                  'subtract'
                )
              "
            >
              -
            </div>
          </div>
        </section>
        <button
          type="submit"
          class="border flex items-center justify-center text-sm w-full px-3 py-4 company-bg-color text-white mt-4"
        >
          In den Einkausfwagen
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import CardInfo from './CardInfo';
import CardAction from './CardAction';
import CardUserAction from './CardUserAction';

export default {
  components: {
    CardInfo,
    CardAction,
    CardUserAction,
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
    qr: {
      type: Object,
      default: null,
    },
    userVoucher: {
      type: Object,
      default: null,
    },

    bg: {
      type: String,
      default: '#fff',
    },
    role: {
      type: String,
      default: 'seller',
    },
    bgImg: {
      type: String,
      default: '',
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
    showRegion: {
      type: Boolean,
      default: false,
    },
    openNewTab: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        id: null,
        voucher_id: null,
        user_id: null,
        value: null,
        qty: 1,
        total_amount: 0,
      },
      isAction: false,
      isFlip: false,
      vIndex: 0,
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
  },
  watch: {
    'voucher.background_image'(newVal, oldVal) {
      if (newVal & (newVal != '')) {
        this.onSetBgImage(newVal);
      }
    },
    'userVoucher.template'(newVal, oldVal) {
      if (newVal && newVal.length > 0) {
        const tem = newVal.filter((row) => row.status);
        if (tem.length > 0) {
          this.onSetBgImage(tem[0].path);
        }
      }
    },
    'userVoucher.text_color'(newVal, oldVal) {
      this.onGetTextColor();
    },
  },
  mounted() {
    (this.form.value = this.voucher.type !== 'quantity' ? null : 1),
      this.onSetBgImage(this.onGetBg());
  },
  activated() {
    this.onSetBgImage(this.onGetBg());
  },
  methods: {
    onFlip() {
      if (this.userVoucher) {
        this.$router.push(`/voucher/${this.userVoucher.id}`);
      } else if(this.openNewTab) {
        window.open(`https://epasnets.com/vouchers/${this.voucher.id}`, '_blank')
      } else {
        window.location.href = `https://epasnets.com/vouchers/${this.voucher.id}`;
      }

      // if (this.isFlippable) {
      //   this.isFlip = !this.isFlip;
      //   this.isAction = !this.isAction;
      //   this.onSetBgImage(this.isFlip ? '' : this.onGetBg());
      // }
    },
    onGetTextColor() {
      let color = '';
      if (this.userVoucher?.text_color != null) {
        color =
          this.userVoucher.text_color == 'dark' ? 'text-black' : 'text-white';
      } else {
        color = this.voucher.text_color == 'dark' ? 'text-black' : 'text-white';
      }
      return color;
    },
    onGetBg() {
      let bg = '';
      if (this.userVoucher?.template) {
        const template = this.userVoucher.template;
        bg = template.image;
      } else if (this.voucher?.background_image) {
        bg = this.voucher.background_image;
      }
      return bg;
    },
    onSetBgImage(value) {
      const card = document.getElementById(`${this.listId}-${this.cardId}`);
      if (card) {
        const bg =
          this.voucher && this.voucher.id && value.search('base64') < 0
            ? value != ''
              ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
              : ''
            : value;
        card.style.backgroundImage = `url('${bg}')`;
        card.style.backgroundSize = `cover`;
      }
    },
    updateValue(form, action) {
      if (this.form[form] <= 1 && action == 'subtract') {
        return;
      }

      if (action == 'add') {
        this.form[form]++;
      } else {
        this.form[form]--;
      }
    },
    async onSubmit() {
      this.form.total_amount =
        this.form.value *
        (this.voucher.type != 'quantity' ? 1 : this.voucher.qty_val);
      try {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
        this.form.total_amount =
          this.form.value *
          (this.voucher.type != 'quantity' ? 1 : this.voucher.qty_val);
        this.form.user_id = this.AUTH_USER.data ? this.AUTH_USER.data.id : null;
        this.form.voucher_id = this.voucher.id;
        if (this.voucher.type == 'quantity') {
          this.form.qty = this.form.value;
          this.form.value = null;
        } else {
          this.form.value = this.form.value;
          this.form.total_amount = this.form.qty * this.form.value;
        }
        const data = await this.$store.dispatch('ADD_WALLET', this.form);
        this.form = {
          id: null,
          voucher_id: null,
          user_id: null,
          value: null,
          qty: null,
          value: 0,
          total_amount: 0,
        };
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
        let confirm = this.$swal({
          icon: 'success',
          title: 'Erfolgreich!',
          text: 'Die Gutscheine wurden in den Warenkorb gelegt.',
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        setTimeout(() => {
          confirm.close();
          this.$router.push(`/vouchers-gift/${data.order.id}`);
        }, 1000);
      } catch (err) {
        console.log(err);
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
        this.$swal({
          icon: 'warning',
          title: 'Achtung! ',
          text:
            'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
          confirmButtonColor: '#48BB78',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then(async (result) => {
          if (result.value) {
            const newData = this.CARTS.filter(
              (cart) => this.form.id != cart.id
            );
            await this.$store.commit('SET_CARTS', newData);
            this.isAdded = false;
            this.form = {
              id: null,
              user_id: null,
              value: null,
              type: '',
              voucher: null,
            };
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Removing the voucher.',
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen',
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="css" scoped>
.voucher-card-container {
  max-width: 367px;
  width: 100%;
  min-height: 330px;
  /* min-height: 480px; */
  transform: rotateY(0deg);
  transition: transform 0.5s linear;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 auto;
}
.voucher-card-container.flip {
  transform: rotateY(360deg);
  transition: transform 0.5s linear;
}
.card-header {
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
}
.card-content {
  padding: 8px 0px;
}
.card-logo {
  width: 65px;
  height: 30px;
  margin-left: auto;
}
.card-qr {
  width: 70px;
  height: 70px;
  margin-left: auto;
}
.qr-text {
  margin-top: -10px;
  margin-left: 9px;
  font-size: 9px;
}
.bg-color {
  background-color: var(--bgColor);
}
.bg-aid {
  background-color: var(--bgAid);
}
@media only screen and (max-width: 600px) {
  .voucher-card-container {
    width: 99%;
    /* max-width: 330px; */
  }
}
.show-more {
  -webkit-mask-image: -webkit-gradient(
    linear,
    center bottom,
    center top,
    color-stop(0, rgba(0, 0, 0, 0)),
    color-stop(1, rgba(0, 0, 0, 1))
  );
}
.order__form-number {
  cursor: pointer;
  width: 12px;
  height: 12px;
  text-align: center;
  color: #333;
  font-weight: bold;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.order__form .order__form-number.order-up {
  position: absolute;
  top: 10px;
  right: 4px;
}
.order__form .order__form-number.order-down {
  position: absolute;
  top: 10px;
  left: 20px;
}
.order__form-group {
  width: 80px;
  position: relative;
}
.order__form input[type='number']::-webkit-inner-spin-button,
.order__form input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.order__form input[type='number'] {
  -moz-appearance: textfield;
  width: 100%;
  padding-right: 5px;
  text-align: center;
  color: #45434a;
  padding-top: 7px;
  padding-bottom: 8px;
  border-radius: 8px;
  border: 2px solid #e3e3e3;
}
.order__form input[type='number']:focus {
  outline: 0;
}
</style>
