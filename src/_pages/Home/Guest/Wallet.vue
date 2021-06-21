<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-1 justify-center items-center flex-col w-full">
        <div class="container w-11/12 lg:w-1/2 text-center">
          <h1 class="font-bold text-4xl font-display mb-10">
            Meine Wallet
          </h1>
          <p class="text-sm">
            In der Wallet sind deine Gutscheine ein lebenlang gespeichert und du kannst von dort aus deine Gutscheine personalisieren und verschenken
          </p>
          <div class="border-b-2 border-input-border my-8" />
          <p>
            Um auf deine Wallet zugreifen zu ko&#776;nnen musst du angemeldet sein.
          </p>
          <Button
            class="flex flex-col items-center mt-12"
            fontWeight="font-normal"
            type="submit"
            label="Anmelden"
            size="px-12 py-3 mb-3"
            round="rounded"
            @onClick="() => $router.push('/login')"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';

  export default {
    components: {
      MainLayout,
      Button
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style lang="css" scoped>
</style>