<script>
	import '../app.css';

	export let data;
	$: ({ title } = data);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<slot />
