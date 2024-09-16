<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import { onMount } from 'svelte';
	import Article from './Article.svelte';
	import ArticleCard from './ArticleCard.svelte';

	let { data } = $props();
	let isMounted = $state(false);

	onMount(() => {
		isMounted = true;
	});

	function generateNoArticlesTitle(): string {
		const titles = [
			'Your reading list is taking a day off!',
			'Looks like the news is on pause, check again later!',
			'Nothing on the front page, check back later!',
			'No stories today, but the headlines will return!',
			'All quiet on the reading front, come back soon!'
		];

		return titles[Math.floor(Math.random() * titles.length)];
	}
</script>

{#if isMounted}
	<header
		class="flex w-full flex-col border-b border-gray dark:border-black"
		class:faded={isMounted}
	>
		<section class="flex flex-col gap-y-1 bg-gray p-page dark:bg-black dark:text-white">
			<h1 class="font-title text-4xl">{data.title}</h1>
			<p><i>{data.description}</i></p>
		</section>

		<section
			class="flex w-full flex-col gap-y-2 px-page py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0"
		>
			<p class="inline-flex items-center gap-x-4">
				<i>{new Date().toDateString()}</i>
				<span>•</span>
				<i>
					{data.articles.length} Article{data.articles.length !== 1 ? 's' : ''}
				</i>
			</p>

			<div class="flex items-center gap-x-4">
				<IconButton tooltip="RSS Feed" icon="tabler:rss" href="/rss.xml" />
				<IconButton tooltip="Atom Feed" icon="tabler:atom" href="/atom" />
				<IconButton tooltip="JSON Feed" icon="tabler:json" href="/json" />
				{#if data.usesAuth}
					<span>•</span>
					<IconButton tooltip="Logout" icon="tabler:logout" href="/logout" />
				{/if}
			</div>
		</section>
	</header>

	<main class="gap-x-0 sm:columns-2 xl:columns-3">
		{#if data.articles.length > 0}
			{#each data.articles as article, index}
				<Article {...article} {index} authCookie={data.authCookie} />
			{/each}
		{:else}
			<ArticleCard {isMounted}>
				<h2 class="flex items-start gap-x-2 font-title text-2xl">
					{generateNoArticlesTitle()}
				</h2>
				<p class="text-justify">There are no articles in your list...</p>
			</ArticleCard>

			<ArticleCard {isMounted}>
				<h2 class="flex items-start gap-x-2 font-title text-2xl">Developers Wanted!</h2>

				<p class="text-justify">
					Make a POST request to <code>/articles/add</code> to add a new article.
				</p>

				<Button href="https://github.com/jacob-shuman/readl8r#add-an-article">
					Open Documentation
				</Button>
			</ArticleCard>

			<!-- TODO: enable once add article ui is created -->
			<ArticleCard {isMounted}>
				<h2 class="flex items-start gap-x-2 font-title text-2xl">Not a developer? No Problem!</h2>

				<!-- <form method="POST" use:enhance></form> -->
				<!-- <a class="text-justify hover:underline" href="/articles/add">
					Click here to add a new article
				</a> -->

				<!-- TODO: include an option to quickly add an article here by url -->
			</ArticleCard>
		{/if}
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

	.faded {
		animation: 250ms fade ease-out;
	}
</style>
