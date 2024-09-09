<script lang="ts">
	export let isMounted = false;
</script>

<article
	class="group -ml-[1px] flex break-inside-avoid flex-col gap-y-2 border border-t-0 border-gray p-6 duration-[25ms] ease-out hover:bg-gray motion-safe:transition-colors dark:border-black dark:hover:bg-black"
	class:faded={isMounted}
	class:opacity-0={!isMounted}
>
	<slot />
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
