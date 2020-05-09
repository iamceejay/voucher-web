<template>
  <div class="flex flex-col w-full">
    <div
      v-for="(row, index) in data"
      :key="`scanner-${index}`"
      class="w-full md:w-1/2 flex flex-row"
    >
      <div class="w-4/5 text-sm px-5 py-2">
        {{ `${index+1}. ${row.username}` }}
      </div>
      <div class="w-1/5">
        <Button
          class="py-2"
          label="Delete"
          size="w-full py-1"
          variant="info"
          round="rounded-full"
          fontSize="text-xs"
          @onClick="onDelete(row)"
        />
      </div>
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
      onDelete(data)
      {
        this.$swal({
          title: 'Delete User Scanner',
          text: `Are you sure you want to delete this user?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if(result.value){
            this.$store.dispatch('DELETE_SCANNER_USER', data)
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Deleting the user.',
              confirmButtonColor: '#6C757D',
            });
            this.$emit('onSetVoucher', '')
          }   
        });
      }
    }
  }
</script>
<style lang="css" scoped>
</style>