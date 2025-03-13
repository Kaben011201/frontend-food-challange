<script>
	import '../app.css';
	let { children } = $props();
</script>

<main class="p-6 bg-rose-100">
	{@render children()}
</main>
