<script lang="ts">
	import '@fontsource/unifrakturcook';
	import '@fontsource/unifrakturmaguntia';
	import { IconRss } from '@tabler/icons-svelte';

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

		<a href="/rss.xml"><IconRss class="size-3" /></a>
	</section>
</header>

{#each articles as article}
	<article class="flex flex-col p-6">
		<h2 class="font-title text-2xl">{article.title}</h2>
		<h3 class="inline-flex gap-x-1">
			<i>{article.author ?? 'By some author'}</i>
			<span>•</span>
			<i>{article.date ? new Date(article.date).toDateString() : 'At some point in time'}</i>
		</h3>
	</article>
{/each}
