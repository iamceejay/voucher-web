<template>
  <div class="flex flex-col w-full mb-5">
    <div
      v-for="(row, index) in data"
      :key="`scanner-${index}`"
      class="w-full md:w-1/2 flex flex-row"
    >
      <div class="w-3/5 sm:w-4/5 text-sm px-5 py-2 text-gray-900 font-semibold font-body">
        {{ `${index+1}. ${row.scanner.username}` }}
      </div>
      <div class="w-2/5 sm:w-1/5">
        <Button
          class="py-2"
          :label="`${row.status ? 'Deaktivieren' : 'Aktivieren'}`"
          size="w-full py-1"
          round="rounded-full"
          fontSize="text-xs"
          @onClick="onDelete(row)"
        />
      </div>
    </div>
    <div v-if="data.length <= 0" class="py-2 text-lg">
      Keine Daten gefunden.
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button'

  export default {
    components: {
      Button,
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      async onDelete(data)
      {
        this.$swal({
          title: `${data.status ? 'Benutzer deaktivieren' : 'Benutzer Aktivieren'}`,
          text: `Bist du sicher, dass du diesen Benutzer ${data.status ? 'deaktivieren' : 'aktivieren'} willst?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then(async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('DELETE_SCANNER_USER', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: `${data.status ? 'Deaktivieren' : 'Aktiviere'} den Benutzer.`,
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      }
    }
  }
</script>
<style lang="css" scoped>
</style>