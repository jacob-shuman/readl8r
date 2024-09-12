<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	let {
		type,
		href,
		children,
		class: classes
	}: {
		children: Snippet;
		type?: HTMLButtonAttributes['type'];
		href?: string;
		class?: string;
	} = $props();

	const buttonClasses =
		'text-center w-full border border-dashed border-gray-light py-3 font-bold transition duration-100 ease-out hover:border-solid hover:underline focus:border-solid focus:border-white focus:underline focus:outline-none motion-safe:transition-all';
</script>

{#if href}
	<a {href} class={twMerge(buttonClasses, classes)}>
		{@render children()}
	</a>
{:else}
	<button {type} class={twMerge(buttonClasses, classes)}>
		{@render children()}
	</button>
{/if}
