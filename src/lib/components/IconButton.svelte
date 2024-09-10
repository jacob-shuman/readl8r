<script lang="ts">
	import Icon, { type IconifyIcon } from '@iconify/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let icon: IconifyIcon | string;
	export let href: string | undefined = undefined;
	export let onclick: HTMLButtonAttributes['on:click'] | undefined = undefined;

	// TODO: add a more accessible focus state
	const interactiveClasses =
		'focus:outline-none duration-100 ease-out hover:opacity-50 focus:opacity-50 motion-safe:transition-opacity';
	const iconClasses = 'size-4';
</script>

{#if href}
	<a {href} class={interactiveClasses}>
		<Icon {icon} class={iconClasses} />
	</a>
{:else}
	<button on:click={onclick} class={interactiveClasses}>
		<Icon {icon} class={iconClasses} />
	</button>
{/if}
