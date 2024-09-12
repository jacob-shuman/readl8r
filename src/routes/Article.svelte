<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import IconButton from '$lib/components/IconButton.svelte';
	import { type Article } from '$lib/types';
	import { onMount } from 'svelte';
	import ArticleCard from './ArticleCard.svelte';

	let {
		fake,
		index,
		id,
		ttr,
		favicon,
		title,
		url,
		author,
		publish_date,
		description
	}: Article & {
		index: number;
		fake?: boolean;
		authCookie: any;
	} = $props();
	let isMounted = $state(false);

	onMount(() => {
		setTimeout(() => (isMounted = true), 500 + 15 * index);
	});
</script>

<ArticleCard {isMounted}>
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

	{#if !fake}
		<div class="flex items-center justify-between">
			<a class="bold text-start font-subtitle hover:underline" href={url}>
				Read more
				{#if ttr != null}
					({Math.round(ttr / 60)} minutes)
				{/if}
			</a>

			<IconButton
				icon="tabler:trash-filled"
				onclick={async () => {
					const { status } = await fetch(`/articles/${id}/delete`, {
						method: 'DELETE',
						credentials: 'same-origin'
					});

					if (status === 200) {
						await invalidateAll();
					}
				}}
			/>
		</div>
	{/if}
</ArticleCard>
