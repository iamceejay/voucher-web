<template>
	<div class="flex flex-col w-full sm:w-1/2 mb-2">
		<div class="flex">
			<Button
				class="pr-2 w-1/2"
				fontWeight="font-medium"
				size="w-full py-3"
				round="rounded border border-input-border"
				:variant="type == 'user' ? 'black' : 'white'"
				:isDisabled="type == 'user'"
				label="Ka&#776;ufer"
				@onClick="() => $router.push('/register/buyer')"
			/>
			<Button
				class="pl-2 w-1/2"
				fontWeight="font-medium"
				size="w-full py-3"
				round="rounded border border-input-border"
				:variant="type == 'seller' ? 'black' : 'white'"
				:isDisabled="type == 'seller'"
				label="Verka&#776;ufer"
				@onClick="() => $router.push('/register/seller')"
			/>
		</div>
	</div>
</template>
<script>
  import Button from '_components/Button';

	export default {
		components: {
			Button
		},
		props: {
      type: {
        type: String,
        default: 'user'
      }
    },
		data() {
      return {}
		}
	}
</script>