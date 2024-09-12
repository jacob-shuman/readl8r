<script lang="ts">
	import Icon, { type IconifyIcon } from '@iconify/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		icon,
		href,
		onclick
	}: {
		icon: IconifyIcon | string;
		href?: string | undefined;
		onclick?: HTMLButtonAttributes['onclick'];
	} = $props();

	// TODO: add a more accessible focus state
	const interactiveClasses =
		'focus:outline-none duration-100 ease-out hover:opacity-50 focus:opacity-50 motion-safe:transition-opacity';
	const iconClasses = 'size-4';
</script>

{#snippet _icon()}
	<Icon {icon} class={iconClasses} />
{/snippet}

{#if href}
	<a {href} class={interactiveClasses}>
		{@render _icon()}
	</a>
{:else}
	<button {onclick} class={interactiveClasses}>
		{@render _icon()}
	</button>
{/if}
