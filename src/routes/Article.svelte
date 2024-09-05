<script lang="ts">
	import type { FeedItem } from '$lib/feed';
	import { onMount } from 'svelte';

	export let { index, favicon, title, url, author, date, description } = $$props as FeedItem & {
		index: number;
	};

	let isMounted = false;
	onMount(() => {
		setTimeout(() => (isMounted = true), 500 + 15 * index);
	});
</script>

<article
	class="-ml-[1px] flex break-inside-avoid flex-col gap-y-2 border border-t-0 border-gray p-6 duration-[25ms] ease-out hover:bg-gray motion-safe:transition-colors dark:border-black dark:hover:bg-black"
	class:faded={isMounted}
	class:opacity-0={!isMounted}
>
	<div class="flex flex-col gap-y-1">
		<h2 class="flex items-start gap-x-2 font-title text-2xl">
			{#if favicon}
				<img class="inline" width="24px" src={favicon} alt={`${title} favicon`} />
			{/if}

			<a class="hover:underline" href={url}>{title}</a>
		</h2>

		<h3 class="inline-flex gap-x-1">
			<i>{author || 'By some author'}</i>
			<span>•</span>
			<i>{date ? new Date(date).toDateString() : 'At some point in time'}</i>
		</h3>
	</div>

	<p class="text-justify">{description}</p>

	<div class="flex items-center justify-between">
		<a class="bold text-start font-subtitle hover:underline" href={url}>
			Read more
			<!-- TODO: enable when time to read (ttr) is implemented -->
			<!-- ({ttr}) -->
		</a>

		<!-- TODO: enable when delete article is implemented -->
		<!-- <button>
					<IconTrashFilled class="size-4" />
				</button> -->
	</div>
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
