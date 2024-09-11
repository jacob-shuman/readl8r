<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export let type: HTMLButtonAttributes['type'] = undefined;
	export let href: string | undefined = undefined;
	export let classes: string | undefined = undefined;
	export { classes as class };

	const buttonClasses =
		'text-center w-full border border-dashed border-gray-light py-3 font-bold transition duration-100 ease-out hover:border-solid hover:underline focus:border-solid focus:border-white focus:underline focus:outline-none motion-safe:transition-all';
</script>

{#if href}
	<a {href} class={twMerge(buttonClasses, classes)}>
		<slot />
	</a>
{:else}
	<button {type} class={twMerge(buttonClasses, classes)}>
		<slot />
	</button>
{/if}
