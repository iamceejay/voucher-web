<template>
  <span>
   <component v-bind:is="currentTabComponent" ref="form"></component>
  </span>
</template>
<script>
import Buyer from './Buyer'
import Seller from './Seller'

export default {
  name: 'Profile',
  components: {
    Seller,
    Buyer
  },
  computed: {
    currentTabComponent() {
      return this.$store.getters.AUTH_USER.role.name == 'seller' ? 'Seller' : 'Buyer'
    }
  },
  beforeRouteLeave(to, from, next) {
      if (this.$refs.form.isSubmitted || !this.$refs.form.isFormDirty) {
        return next(true)
      }

      this.$swal({
        title: 'Möchten Sie Änderungen speichern?',
        text: '',
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'speichern',
        cancelButtonText: 'Verwerfen',
      }).then(async (result) => {
        if(result.value) {
          this.$refs.form.isRouteChanged = true
          let response = await this.$refs.form.onSubmit()
          next(response)
        } else {
          next(true)
        }
      })
    },
}
</script>
