<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { message }: { message: string } = $props();
	let isMounted = $state(false);

	onMount(() => {
		isMounted = true;
	});
</script>

<Tooltip.Root openDelay={250}>
	<Tooltip.Trigger asChild let:builder class="focus:outline-none">
		<slot {builder} />
	</Tooltip.Trigger>

	{#if isMounted && message}
		<Tooltip.Content transition={fade} transitionConfig={{ duration: 100 }} sideOffset={8}>
			<div
				class="border border-dashed border-gray-light bg-blacker px-2 py-1 font-body text-sm text-white focus:outline-none"
			>
				{message}
			</div>
		</Tooltip.Content>
	{/if}
</Tooltip.Root>
