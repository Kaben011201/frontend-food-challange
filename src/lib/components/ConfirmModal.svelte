<script>
	import confirmIcon from '$assets/icons/icon-order-confirmed.svg';
	import { desserts, result } from '../../shared';
	import { fly, fade } from 'svelte/transition';

	let { onclick } = $props();

	function newOrder() {
		onclick();
		desserts.update((currentCart) => {
			currentCart.forEach((item) => {
				item.quantity = 0;
			});
			result.update((currentResult) => {
				currentResult.total = 0;
				currentResult.price = 0;
				return currentResult;
			});

			return currentCart;
		});

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<div
	class="fixed inset-0 flex items-end bg-black/30 sm:items-center sm:justify-center"
	{onclick}
	aria-hidden="true"
	transition:fade
>
	<div
		class="w-full space-y-6 rounded-t-xl bg-white px-6 pt-8 pb-6 sm:max-w-lg sm:rounded-xl"
		transition:fly={{ y: 200, duration: 500 }}
	>
		<img src={confirmIcon} alt="confirm icon" />
		<div class="space-y-1">
			<h1 class="text-4xl font-bold">Order</h1>
			<h1 class="text-4xl font-bold">Confirmed</h1>
			<p class="text-rose-400">We hope you enjoy your food</p>
		</div>

		<div class="rounded-2xl bg-rose-100">
			<div class="max-h-[calc(20rem-5rem)] sm:max-h-[calc(25rem-5rem)] overflow-y-auto px-6 pt-2 pb-6">
				{#each $desserts as dessert, index}
				{#if dessert.quantity > 0}
					<div class="flex items-center justify-between border-b-[0.2px] border-rose-300 py-4">
						<div class="flex items-center gap-4">
							<img
								src={dessert.image['thumbnail']}
								alt="thumbnail {dessert.name}"
								class="w-16 rounded-lg"
							/>
							<div class="space-y-1">
								<p class="line-clamp-1 font-semibold">{dessert.name}</p>
								<p class="space-x-2">
									<span class="text-red font-semibold">{dessert.quantity}x</span>
									<span class="text-rose-500">@ ${dessert.price.toFixed(2)}</span>
								</p>
							</div>
						</div>
						<p class="font-semibold">${(dessert.quantity * dessert.price).toFixed(2)}</p>
					</div>
				{/if}
			{/each}
			</div>
			<div class="flex items-center justify-between px-6 pt-2 pb-6">
				<p>Order Total</p>
				<h3 class="text-2xl font-bold">${$result?.price.toFixed(2)}</h3>
			</div>
		</div>
		<button
			class="bg-red w-full rounded-4xl py-3 text-lg font-semibold text-rose-100"
			onclick={newOrder}>Start New Order</button
		>
	</div>
</div>
