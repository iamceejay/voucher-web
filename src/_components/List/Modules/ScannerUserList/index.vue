<template>
  <div class="flex flex-col w-full mb-2">
    <div
      v-for="(row, index) in data"
      :key="`scanner-${index}`"
      class="w-full flex flex-row items-center"
    >
      <div class="w-3/5 sm:w-4/5 text-sm pr-5 py-2 font-semibold font-body">
        {{ `${index+1}. ${row.scanner.username}` }}
      </div>
      <div class="w-2/5 sm:w-1/5">
        <Button
          class="py-2"
          :label="`${row.status ? 'Deaktivieren' : 'Aktivieren'}`"
          size="w-full py-1"
          round="rounded"
          fontSize="text-xs"
          @onClick="onDelete(row)"
        />
      </div>
    </div>
    <div v-if="data.length <= 0" class="font-semibold py-2">
      Noch keine Daten vorhanden.
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
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
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
              text: `${data.status ? 'Aktiviere' : 'Deaktivieren'} den Benutzer.`,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }   
        })
      }
    }
  }
</script>
<style lang="css" scoped>
</style>