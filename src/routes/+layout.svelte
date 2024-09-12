<script>
	import '@fontsource/unifrakturcook';
	import '@fontsource/unifrakturmaguntia';
	import '../app.css';

	let { data, children } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

{@render children()}
