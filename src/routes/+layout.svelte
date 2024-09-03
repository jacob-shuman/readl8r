<script>
	import '../app.css';

	export let data;
	$: ({ title, description } = data);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<slot />
