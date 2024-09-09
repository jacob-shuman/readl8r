<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { type Article } from '$lib/types';
	import Icon from '@iconify/svelte';

	import { onMount } from 'svelte';

	export let { index, id, ttr, favicon, title, url, author, publish_date, description } =
		$$props as Article & {
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
			<i>{publish_date ? new Date(publish_date).toDateString() : 'At some point in time'}</i>
		</h3>
	</div>

	<p class="text-justify">{description}</p>

	<div class="flex items-center justify-between">
		<a class="bold text-start font-subtitle hover:underline" href={url}>
			Read more
			{#if ttr != null}
				({Math.round(ttr / 60)} minutes)
			{/if}
		</a>

		<!-- TODO: enable when delete article is implemented -->
		<button
			on:click={async () => {
				// TODO: replace with password cookie
				const password = 'this-is-the-token';

				const { status } = await fetch(`/articles/${id}/delete`, {
					method: 'DELETE',
					headers: { Authorization: `Bearer ${password}` }
				});

				if (status === 200) {
					await invalidateAll();
				}
			}}
		>
			<Icon icon="tabler:trash-filled" class="size-4 duration-100 ease-out hover:opacity-50" />
		</button>
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
