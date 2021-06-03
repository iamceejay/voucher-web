<template>
  <div
    class="bg-white flex flex-shrink-0 voucher-card-container border"
    :class="{ flip: isFlip }"
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
    <div
      class="flex flex-col w-full bg-aid rounded"
    >
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
    </div>
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
      default: false
    }
  },
  data() {
    return {
      isAction: false,
      isFlip: false,
      vIndex: 0,
    };
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
    this.onSetBgImage(this.onGetBg());
  },
  activated() {
    this.onSetBgImage(this.onGetBg());
  },
  methods: {
    onFlip() {
      this.$router.push(`/voucher/${this.userVoucher.id}`)
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
</style>
