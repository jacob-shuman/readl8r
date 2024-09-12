<script lang="ts">
	import type { Snippet } from 'svelte';

	let { isMounted = false, children }: { isMounted?: boolean; children: Snippet } = $props();
</script>

<article
	class="group -ml-[1px] flex break-inside-avoid flex-col gap-y-2 border border-t-0 border-gray p-6 duration-[25ms] ease-out hover:bg-gray motion-safe:transition-colors dark:border-black dark:hover:bg-black"
	class:faded={isMounted}
	class:opacity-0={!isMounted}
>
	{@render children()}
</article>

<style>
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 100;
		}
	}

	.faded {
		animation: 500ms fade ease-out;
	}
</style>
