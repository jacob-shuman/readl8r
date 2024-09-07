<script lang="ts">
	import '@fontsource/unifrakturcook';
	import '@fontsource/unifrakturmaguntia';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import Article from './Article.svelte';

	export let data;
	$: ({ title, articles, description } = data);

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});
</script>

{#if isMounted}
	<header
		class="flex w-full flex-col border-b border-gray dark:border-black"
		class:fade-header={isMounted}
	>
		<section class="flex flex-col gap-y-1 bg-gray p-page dark:bg-black dark:text-white">
			<h1 class="font-title text-4xl">{title}</h1>
			<p><i>{description}</i></p>
		</section>

		<section
			class="flex w-full flex-col gap-y-2 px-page py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0"
		>
			<p class="inline-flex gap-x-4">
				<i>{new Date().toDateString()}</i>
				<span>•</span>
				<i>
					{articles.length} Article{articles.length !== 1 ? 's' : ''}
				</i>
			</p>

			<div class="flex gap-x-4">
				<a href="/rss.xml">
					<Icon
						icon="tabler:rss"
						class="size-4 duration-100 ease-out hover:opacity-50 motion-safe:transition-opacity"
					/>
				</a>
				<a href="/atom">
					<Icon
						icon="tabler:atom"
						class="size-4 duration-100 ease-out hover:opacity-50 motion-safe:transition-opacity"
					/>
				</a>
				<a href="/json">
					<Icon
						icon="tabler:json"
						class="size-4 duration-100 ease-out hover:opacity-50 motion-safe:transition-opacity"
					/>
				</a>
			</div>
		</section>
	</header>

	<main class="gap-x-0 sm:columns-2 xl:columns-3">
		{#each articles as article, index}
			<Article {...article} {index} />
		{/each}
	</main>
{/if}

<style>
	@keyframes fade {
		from {
			transform: translateY(-8px);
			opacity: 0;
		}
		to {
			transform: translateY(0px);
			opacity: 100;
		}
	}

	.fade-header {
		animation: 250ms fade ease-out;
	}
</style>
