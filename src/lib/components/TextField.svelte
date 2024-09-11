<script lang="ts">
	import tw from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let required: HTMLInputAttributes['required'] = undefined;
	export let type: HTMLInputAttributes['type'] = undefined;
	export let name: HTMLInputAttributes['name'] = undefined;
	export let placeholder: HTMLInputAttributes['placeholder'] = undefined;
	export let label: string | undefined = undefined;
	export let error: string | undefined = undefined;
</script>

<div class="flex flex-col gap-y-2">
	{#if label || error}
		<label for="password" class:text-red-400={error}>
			{#if error}
				<span>{error}</span>
			{:else}
				<span>{label}</span>
			{/if}
		</label>
	{/if}

	<input
		{required}
		{type}
		{name}
		{placeholder}
		class={tw(
			'duration-100 ease-out motion-safe:transition-all',
			'w-full bg-transparent p-3 font-mono text-lg',
			'border-gray-light border border-dashed hover:border-solid',
			'focus:border-solid focus:border-white focus:outline-none'
		)}
	/>
</div>
