<script lang="ts">
	import '@fontsource/unifrakturcook';
	import '@fontsource/unifrakturmaguntia';
	import { IconAtom, IconJson, IconRss } from '@tabler/icons-svelte';

	export let data;
	$: ({ title, articles } = data);
</script>

<header class="border-gray flex w-full flex-col border-b dark:border-black">
	<section class="font-title p-page bg-gray text-4xl dark:bg-black dark:text-white">
		<h1>{title}</h1>
	</section>

	<section
		class="px-page flex w-full flex-col gap-y-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0"
	>
		<p class="inline-flex gap-x-4">
			<i>{new Date().toDateString()}</i>
			<span>•</span>
			<i>
				{articles.length} Article{articles.length !== 1 ? 's' : ''}
			</i>
		</p>

		<div class="flex gap-x-4">
			<a href="/rss.xml"><IconRss class="size-4" /></a>
			<a href="/atom"><IconAtom class="size-4" /></a>
			<a href="/json"><IconJson class="size-4" /></a>
		</div>
	</section>
</header>

<main
	class="border-blacker after:bg-blacker relative gap-x-0 border-l after:absolute after:left-0 after:top-[1px] after:z-50 after:h-full after:w-[1px] sm:columns-2 xl:columns-3"
>
	{#each articles as article}
		<article
			class="border-gray flex break-inside-avoid flex-col gap-y-2 border-b border-l p-6 dark:border-black"
		>
			<div class="flex flex-col gap-y-1">
				<h2 class="font-title text-2xl">{article.title}</h2>
				<h3 class="inline-flex gap-x-1">
					<i>{article.author || 'By some author'}</i>
					<span>•</span>
					<i>{article.date ? new Date(article.date).toDateString() : 'At some point in time'}</i>
				</h3>
			</div>

			<p>{article.description}</p>

			<a class="bold font-subtitle text-start hover:underline" href={article.url}>
				Read more
				<!-- TODO: enable when time to read (ttr) is implemented -->
				<!-- ({article.ttr}) -->
			</a>
		</article>
	{/each}
</main>
