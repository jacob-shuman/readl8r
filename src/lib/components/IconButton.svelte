<script lang="ts">
	import Icon, { type IconifyIcon } from '@iconify/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Tooltip from './Tooltip.svelte';

	let {
		icon,
		tooltip,
		href,
		onclick
	}: {
		icon: IconifyIcon | string;
		tooltip: string;
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

{#snippet _interactiveElement(builder?: any)}
	{#if href}
		<a {href} class={interactiveClasses} use:builder.action {...builder}>
			{@render _icon()}
		</a>
	{:else}
		<button {onclick} class={interactiveClasses} use:builder.action {...builder}>
			{@render _icon()}
		</button>
	{/if}
{/snippet}

<Tooltip message={tooltip} let:builder>
	{@render _interactiveElement(builder)}
</Tooltip>
