<script>
	import '../app.css';
	let { children } = $props();
</script>

<main class="p-6 sm:py-20 bg-rose-100 ">
	{@render children()}
</main>
