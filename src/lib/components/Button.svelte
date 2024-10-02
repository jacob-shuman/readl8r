<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	let {
		loading,
		type,
		href,
		onclick,
		children,
		class: classes
	}: {
		children: Snippet;
		onclick?: HTMLButtonAttributes['onclick'];
		loading?: boolean;
		type?: HTMLButtonAttributes['type'];
		href?: string;
		class?: string;
	} = $props();

	const buttonClasses =
		'text-center w-full border border-dashed border-gray-light py-3 font-bold duration-100 ease-out hover:border-solid hover:underline focus:border-solid focus:border-blacker focus:dark:border-white focus:underline focus:outline-none motion-safe:transition-all';
</script>

{#snippet loadingChildren()}
	{#if loading}
		<Icon icon="svg-spinners:clock" class="w-full" />
	{:else}
		{@render children()}
	{/if}
{/snippet}

{#if href}
	<a {href} class={twMerge(buttonClasses, classes)}>
		{@render loadingChildren()}
	</a>
{:else}
	<button {type} {onclick} class={twMerge(buttonClasses, classes)}>
		{@render loadingChildren()}
	</button>
{/if}
