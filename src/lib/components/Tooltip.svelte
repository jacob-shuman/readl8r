<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import tw from 'clsx';
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
				class={tw(
					'bg-white px-2 py-1 font-body text-sm focus:outline-none dark:bg-blacker dark:text-white',
					'border border-dashed border-gray-light'
				)}
			>
				{message}
			</div>
		</Tooltip.Content>
	{/if}
</Tooltip.Root>
