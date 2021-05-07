<template>
  <span class="border-b-2 pb-6 flex flex-wrap text-sm mt-4">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"
      activeClass="bg-black text-white"
      :to="link.to"
    >
      {{ link.name }}
    </router-link>
    <button
      @click="onLogout()"
      class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2">
      Ausloggen
    </button>
	</span>
</template>

<script>
export default {
	data() {
		return {
			links: [
				{
					name: 'Profil',
					to: '/profile-info'
				},
				{
					name: 'Passwort',
					to: '/profile-settings'
				},
				{
					name: 'Zahlungsmethoden',
					to: '/profile-payment'
				},
				{
					name: 'Bestellungen',
					to: '/orders'
				}
			]
		}
	},
  beforeMount() {
    document.body.classList.remove('voucher-builder-page')
  },
  methods: {
    async onLogout()
    {
      try {
        const data = await this.$store.dispatch('LOGOUT')
        await this.onRemoveAuth()
      } catch (err) {
        await this.onRemoveAuth()
      }
    },
    async onRemoveAuth()
    {
      await localStorage.removeItem('_auth')
      await this.$store.commit('SET_AUTH_USER', {
        isAuth: false,
        token: '',
        role: {
          id: null,
          name: null,
        },
        data: null,
      })
      await localStorage.removeItem('_userWishlist')
      await this.$store.commit('SET_AUTH_USER_VOUCHER_WISHLIST', [])
      window.location = '/login'
    }
  }
}
</script>

<style>

</style>