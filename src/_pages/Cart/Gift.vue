<template>
  <MainLayout title="Weiter shoppen">
    <template #content>
      <div class="bg-custom-gray">
        <div
          v-if="!IS_LOADING.status"
          class="content-container flex flex-col w-full px-4 pt-10"
        >
          <h1 class="font-medium text-xl mx-auto mb-6">Warenkorb</h1>
          <div
            class="bg-white max-w-2xl mb-12 md:mx-auto px-4 md:px-12 py-12 w-full"
          >
            <CartGiftList
              v-if="WALLETS && WALLETS.length >= 0"
              class="mb-3"
              :role="AUTH_USER.role.name"
              :data="WALLETS"
              @onDelete="onDelete"
              ref="gift"
            />
            <div
              class="bg-white flex items-start justify-between max-w-xl mx-auto"
            >
              <div class="flex flex-col items-baseline justify-center">
                <span class="text-sm ">Gesamt</span>
                <span class="font-medium text-4xl">{{
                  $helpers.convertCurrency(totalAmount)
                }}</span>
              </div>
              <button
                @click="handleSubmit()"
                class="px-5 py-3 rounded-md text-sm text-white"
                style="background-color: var(--company-color, #ff5563);"
                :class="{ 'opacity-50': !WALLETS.length }"
                :disabled="!WALLETS.length"
              >
                Bestellung abgeben
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import MainLayout from '_layouts';
import Header1 from '_components/Headers/Header1';
import CartGiftList from '_components/List/Modules/CartList/Gift';

export default {
  components: {
    MainLayout,
    Header1,
    CartGiftList,
  },
  data() {
    return {
      role: null,
      search: '',
      totalPrice: 0,
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    WALLETS() {
      return this.$store.getters.WALLETS;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
    COUNT_CART() {
      return this.$store.getters.COUNT_CART;
    },
    totalAmount() {
      let total = 0;
      if (this.WALLETS) {
        this.WALLETS.map((data) => {
          let value =
            data.voucher.type == 'quantity' ? data.qty : data.value * data.qty;
          let vouchTotal = value;

          if (data.voucher.type == 'quantity') {
            vouchTotal = value * data.voucher.price_filter;
          }

          total = total + vouchTotal;
        });
      }

      return total;
    },
  },
  watch: {
    watch: {
      async WALLETS(newVal) {
        this.totalPrice = 0;
        await this.onGetTotalPrice();
      },
    },
  },
  mounted() {
    (async () => {
      try {
        await this.$store.commit('SET_WALLETS', []);
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.onFetchWallets();
        await this.onGetTotalPrice();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
        if (this.$route.query?.status == 'failed') {
          this.$swal({
            icon: 'warning',
            // title: 'Erfolgreich!',
            text: `Zahlung wurde abgebrochen. Bitte versuche es erneut oder wähle eine andere Zahlungsmethode.`,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          });
        }
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    async onFetchWallets() {
      await this.$store.dispatch('FETCH_WALLETS', {
        user_id: this.AUTH_USER.data ? this.AUTH_USER.data.id : null,
        status: 'pending',
        order_id: this.$route.params.id,
      });
    },
    async onDelete(data) {
      await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
      await this.$store.dispatch('DELETE_WALLET', data);
      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      this.$swal({
        icon: 'success',
        title: 'Aus dem Warenkorb entfernt!',
        text: 'Der Gutschein wurde soeben entfernt.',
        confirmButtonColor: '#48BB78',
        confirmButtonText: 'Bestätigen',
      });
    },
    onGetTotalPrice() {
      if (this.WALLETS) {
        this.WALLETS.map((row) => {
          this.totalPrice += this.onGetTotal(row);
        });
      }
    },
    onGetTotal(data) {
      let value = data.voucher.type == 'quantity' ? data.qty : data.value;
      let total = value;

      if (data.voucher.type == 'quantity') {
        total = value * data.voucher.price_filter;
      }

      return total;
    },
    async handleSubmit() {
      if (!this.$refs.gift.giftType) {
        return
      }
       this.$swal({
        title: 'Bestellung bestätigen?',
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'Ja',
        cancelButtonText: 'abbrechen',
      }).then(async (result) => {
        if (result.value) {
            console.log(this.$refs.gift);
            let data = await this.$store.dispatch('SEND_GIFT', {
              order_id: this.$route.params.id,
              user_id: this.$refs.gift.selected ? this.$refs.gift.selected.id : '',
              email: this.$refs.gift.email
            });
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })

            if (this.$refs.gift.giftType === 'pdf') {
              await this.$store.dispatch('DOWNLOAD_USER_VOUCHER', data.user_voucher.id)
            }

            if (this.$refs.gift.giftType === 'email') {
              await this.$store.dispatch('SEND_WALLET', {
                id: data.user_voucher.id,
                email: this.$refs.gift.email,
                subject: 'Gift Voucher.',
                text: 'Gift Voucher.',
                sent_via: 'email',
              })
            }

            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })

            this.$swal({
              icon: 'success',
              title: 'Erledigt!',
              text: 'Gutschein wurde übermittelt.',
              html:
                `<ul class="flex flex-col gap-4">
                  <li class="flex gap-3 text-left">
                    <i class="fa-check-circle fas mt-0.5 text-green-500 text-xl"></i>
                    <span>Gutschein wurde erfolgreich an die E-mail versendet.</span>
                  </li>
                  <li class="flex gap-3 text-left">
                    <i class="fa-check-circle fas mt-0.5 text-green-500 text-xl"></i>
                    <span>Gutscheine zum Ausdrucken wurden erfolgreich versendet.</span>
                  </li>
                  <li class="flex justify-center">
                    <img data-v-dbd26524="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACvCAMAAACPd2FOAAAGWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTAzLTI4VDIxOjQ3OjEzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMy0yOFQyMTo1NzowNyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMy0yOFQyMTo1NzowNyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjODAwNGU1Ny1hMjdmLTY3NDItOTg3YS0yYTMwYTcxMDQ5MjUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2OTM1MjIyZS1hMDg4LWU3NGItYThhNS0zODkzM2MwZmFmZjgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMTNjNTFmYi1jOThjLTIyNDItYTlmMS1mNDU2ZmM3NTNjNDkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMxM2M1MWZiLWM5OGMtMjI0Mi1hOWYxLWY0NTZmYzc1M2M0OSIgc3RFdnQ6d2hlbj0iMjAyMS0wMy0yOFQyMTo0NzoxMyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4MDA0ZTU3LWEyN2YtNjc0Mi05ODdhLTJhMzBhNzEwNDkyNSIgc3RFdnQ6d2hlbj0iMjAyMS0wMy0yOFQyMTo1NzowNyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PplTGy0AAAAJcEhZcwAALiMAAC4jAXilP3YAAAB4UExURUdwTP9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY/9VY7PNs6UAAAAndFJOUwBNow1AcPxrRTTSUgZ7V3YnuPjjkxao8bEfw8qKMNuEh7/qnGRdOV1WqNkAAAblSURBVHja3ZzLgqowDIYrKiiKgjqKgDpe+/5veBYzc7y1JW2SAmY1mwl8pE3zp61CwC3tRVWQF2Ucx+UxPx8uo60gtO3ocjjnxzKO93GRBdWwl04FtfV71fEk322ZJwOCp01HSb68ew3//tgcq8kX4aeaF6HU2yKLUA/7irKFwX1YJClJLKJY1ltxcYzL9FIA3MfDPhIjDUIJs8XZ4bul5wXQvVxjwjI+ShvLdpbuMyv3xdg1GnYYUkp5TFvj/j54z9LFAuBg7gdO7s/WU3G2kG4WXiDuL6Gj+8XELhy5dLeyNhl/lQj3uUVQdieJsqvZ/RXn/QSe9HOJtcDkPkC7r4Ar7Qn9JBlrh9dXTOAdupgTPGujWVN2G8kbb+roSzlSOR4ROB7apK0hwQMViXKC97oY2K0jgxD/zNnb4oT3ubcutL/25CQEHLlLrbUmJiHgOLhVjQkpyYxl1sGsR0iC5zghFMl2SUWC5yhwvYGMhgTPsVKnpHfVUB3VJN8UJHgOtTi4yfmbXpOyVGsi/EvcbuiC56ZWNVJuXteVXF8fpdgicrFAOtCUoCsppTwrawe1kOgXslFbq8Xf71s9Bys2Tqkf9qZsbh4n2ctg+2tUTHWjsSlTVtGP5WdPERD9sjPeNIOxVPfJD49NIl1iUhcC/bIJjkw91J97I/fCvgCVZoF/jm9QYb6+LyuwYnnom2Omlkpv2XyrzUn7LdAFp5120M+Z/CbkJThXUKgtcJ9PXWic9V2ViUX2plBbwC6vTcoZmybxmk1tQSyyaib9pKelXYXT84ChaZVo69dSmbPu7m5casutVVLp/yOt6fRGXGrLpVWS1bTNc/spR6C2DJY4jIOVYYoYk+CMj6MnHHqtpRCpWzc6PfFgLFOnnY7NFyAJXY26htY0KqJ+9RpDdnX8qa2V85bKFfQ6vtSWOva3DShDZIiRS6u2NmPE5zoLoF7iV1ua/AgcwLmA1rPcaivApZRCgNMor9oaIpN8LODDnFFthYO6Vkntywmb+cqltvb1rZLadGQFwqS2ckirhBaERW0dKOJsC6JTW4j98wnJzNsLW5VErLY0jc3I1k8s7GcqpdrS7KfZH3o7Cocilk5trcjqhVy4HDGjUlsXutNiK5OiZ1Zbmv00N/E5dy0x8Gortm6VmNvErokTq7bWtA2aca1mZ1Jbc9qW2akvhHOlhFFbPeJltcAVSq5qS7OfhjgUukIKCo3aqlnPsil56TkTQowZCldjhVHRnz4Nt0IgJomb2roy9DEKx8Lm6WOMrD6wZilFdpYSkg0PG7WFa5UYVhHjTg+92lKXm9Mj8gViqt6nTm2FoFbJDr1xlOj22Z0/iXGh1uyn9fF9/a3m5APVhH8unbRHj9Et5DXVhQ5505+J/K5ZcSgOmj98RtRSEt5Mpzsnz8OYgaTAaP1HjpoLNulJWyTSkDxWfNMly7j6dR7L2qPHE5qAICZcCLjw1AfcMJhQzBAhhCj5OGDmSvKaRAZM44qdJMX3xNTx6EPYpqpL8E4kB4oFVjmuVpDLdYHykJ8DSUxx6kfDoT1R+ayFDyQkY4JaWskRmDT586ErChKNgiiJOMwL4NUk+CeojPW/WN1QcRhKksrcurAh2WuvnA/IOGCdRBxJmOLvNddzqMv2104iimSEvzgN4VAJqRGoMQYkmeGv7ME45Nve1hzY4gOR1P6QQULH8dJsWIOblQCSCH+N0oLjsf2jvVv+7bI4R5DqLaHjuDfkDIeuHGIC4jCTWHL8tUiNesc6JkAOE4k9h5Sr2urHkgTMoSdx4ZAyqN0wsCKx4NCRhDuuo2cWJFYcahK3eBCTWHKoSDg5wCTWHO/rsHJcEd6LAZE4cLzGhDceQBInjueYLJjjASJx5HgkCT1w1JI4c9xJ/HCoN3x7BBx/JAtPHMaYoDh+SPxxGEiQHELMpdxhz7ISjC40hxDJhPA0kmNMokTwGOu1t0p4M+bre9WHcHgjYefwROKBwwuJFw4PJJ442Em8cTCTeORgJfH8G0IrNhDPPyF04QvJ3CfHiHOSDD+Ew2NMRtwLyfxDODyNLg8cXmLihcNDTDxxsJN442Am8cjBSuKVg5HEMwcbiXcOJpIGOFhIGuFgIGmIg5ykMQ5ikgY5SEka5SAkaZiDjKRxDiKSFnCQkLSCg4CkJRxoktZwIElaxIEiaRUHgqRlHM4kA9E6iz6EwykmIyE+gmQgWmrRh3BYxqTFHFYkreawGF0t5wDHpPUcwJh0gANE0gkOAElHOGpJOsNRQ9IhDiNJpzgMJB3j0JJ0jkND0kEOJUknORQkHeV4I+ksxwtJhzmeSDrN8UDScY7/JJ3n+CX5AA4hog/hECK5enjIP8OY0cqltIspAAAAAElFTkSuQmCC" class="w-12 mx-auto">
                  </li>
                  <li class="text-sm">
                    Bei Fragen oder Beschwerden kontaktiere uns auf <a href="mailto:hallo@epasnets.com" class="company-color">hallo@epasnets.com</a>.
                  </li>
                </ul>`,
              confirmButtonColor: '#48BB78',
              allowOutsideClick: false,
              showConfirmButton: true,
            }).then(() => {
              this.$router.push(`/vouchers-gift`);
            });
        }
      });

    },
  },
};
</script>
<style lang="css" scoped></style>
