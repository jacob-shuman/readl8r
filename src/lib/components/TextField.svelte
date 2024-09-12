<script lang="ts">
	import tw from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		required,
		type,
		name,
		placeholder,
		label,
		error
	}: {
		required?: HTMLInputAttributes['required'];
		type?: HTMLInputAttributes['type'];
		name?: HTMLInputAttributes['name'];
		placeholder?: HTMLInputAttributes['placeholder'];
		label?: string;
		error?: string;
	} = $props();
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
			'border border-dashed border-gray-light hover:border-solid',
			'focus:border-solid focus:border-white focus:outline-none'
		)}
	/>
</div>
