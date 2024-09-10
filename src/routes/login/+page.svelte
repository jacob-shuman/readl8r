<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import tw from 'clsx';
	import { onMount } from 'svelte';
	import Article from '../Article.svelte';
	import ArticleCard from '../ArticleCard.svelte';

	export let form;

	let isMounted = false;
	const jokeArticles: {
		title: string;
		publish_date: string;
		author: string;
		description: string;
	}[] = [
		{
			title: 'Man Claims He Invented the Internet by Accident',
			publish_date: new Date().toDateString(),
			author: 'Al Dente',
			description:
				'Local man swears his Wi-Fi router malfunction led to the creation of the internet as we know it.'
		},
		{
			title: 'Cat Declares Itself CEO of Startup',
			publish_date: new Date().toDateString(),
			author: 'Furrball McWhiskers',
			description:
				'Feline entrepreneur launches company based on naps and laser pointer technology. Investors interested.'
		},
		{
			title: 'New Study Finds Coffee Cups Multiply on Desks',
			publish_date: new Date().toDateString(),
			author: 'Java Bean',
			description:
				'Scientists baffled as coffee cups mysteriously appear out of nowhere on office desks worldwide.'
		},
		{
			title: 'Area Man Proud of His 3-Second Plank',
			publish_date: new Date().toDateString(),
			author: 'Brock Hardman',
			description:
				'Gym-goer celebrates personal record plank, immediately posts about it on social media.'
		},
		{
			title: 'Local Dog Enrolls in Online University',
			publish_date: new Date().toDateString(),
			author: 'Bark Twain',
			description:
				"Golden Retriever aims for a degree in Fetchonomics, says it's time to take his skills to the next level."
		},
		{
			title: 'Fridge Becomes Sentient, Refuses to Chill',
			publish_date: new Date().toDateString(),
			author: 'Chillbert Einstein',
			description:
				"Smart fridge develops attitude, only cools items it 'approves' of, leaving milk out in the cold."
		},
		{
			title: 'Man Spends $10K on Perfect Chair, Still Stands',
			publish_date: new Date().toDateString(),
			author: 'Chairy McChairface',
			description:
				'After months of research, man finally buys the perfect chair but continues to stand while working.'
		},
		{
			title: 'Local Woman Declares Friday a National Holiday',
			publish_date: new Date().toDateString(),
			author: 'T.G.I. Friday',
			description:
				"Tired of waiting for the weekend, local woman takes matters into her own hands, celebrates 'Friyay."
		},
		{
			title: 'AI Develops Taste for Memes, Refuses Serious Work',
			publish_date: new Date().toDateString(),
			author: 'Meme Smith',
			description:
				'New AI model shocks creators by generating nothing but memes, completely ignoring assigned tasks.'
		},
		{
			title: "Scientist Discovers Parallel Universe Where Mondays Don't Exist",
			publish_date: new Date().toDateString(),
			author: 'Dr. I.P. Freely',
			description:
				'Physicist stumbles upon alternate reality where the week skips straight to Tuesday. Global envy ensues.'
		}
	].sort(() => Math.random() - 0.5);
	const subtitles = [
		"Shhh... it's just between us.",
		'Strictly no nosy neighbors.',
		'No paparazzi allowed.',
		'Members only, no skimming allowed.',
		'Reserved for article hoarders.',
		'Get in before we change the locks.',
		'Enter if you know the password... or guess really well.',
		'Members only, trespassers will be mocked.'
	];
	const subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];

	onMount(() => {
		isMounted = true;
	});
</script>

{#if isMounted}
	<!-- TODO: fix styling -->
	<main class="gap-x-0 border-t border-gray sm:columns-2 xl:columns-3 dark:border-black">
		<ArticleCard {isMounted}>
			<div class="mb-6">
				<h1 class="font-title text-4xl font-bold underline">Login</h1>
				<p class="mt-2">{subtitle}</p>
			</div>

			<!-- TODO: implement debounced submission -->
			<form method="POST" use:enhance>
				<div class="mb-4">
					<label for="password" class={tw('flex flex-col', form?.passwordError && 'text-red-400')}>
						{#if form?.passwordError}
							<span>{form?.passwordError}</span>
						{:else}
							<span>Password</span>
						{/if}
					</label>

					<!-- TODO: move #757575 to tailwind config -->
					<input
						required
						type="password"
						name="password"
						placeholder="••••••••"
						class="mt-2 w-full border border-dashed border-[#757575] bg-transparent p-3 font-mono text-lg duration-100 ease-out hover:border-solid focus:border-solid focus:border-white focus:outline-none motion-safe:transition-all"
					/>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</ArticleCard>

		{#each jokeArticles.slice(0, 2) as article}
			<Article {...article} fake />
		{/each}
	</main>
{/if}
