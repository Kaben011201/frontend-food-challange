<script>
	import '../app.css';
	let { children } = $props();
</script>

<main class="p-6 sm:py-10">
	{@render children()}
</main>
