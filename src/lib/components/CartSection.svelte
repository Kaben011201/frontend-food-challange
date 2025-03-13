<script>
	import xIcon from '$assets/icons/icon-remove-item.svg';
	import carbonIcon from '$assets/icons/icon-carbon-neutral.svg';
	import emptyCart from '$assets/icons/illustration-empty-cart.svg';
	import { desserts, result } from '../../shared';
	import ConfirmModal from './ConfirmModal.svelte';
	import { fade, fly } from 'svelte/transition';

	function removeItem(index) {
		desserts.update((currentCart) => {
			const newCart = [...currentCart];

			result.update((currentResult) => {
				const newResult = { ...currentResult };
				newResult.total -= newCart[index].quantity;
				newResult.price -= newCart[index].price * newCart[index].quantity;
				return newResult;
			});

			newCart[index].quantity = 0;
			return newCart;
		});
	}

	let showModal = $state(false);
</script>

<section class="transition-costum relative rounded-xl bg-white p-6">
	<h2 class="text-red mb-3 text-2xl font-bold">Your Cart ({$result.total})</h2>
	<div>
		{#each $desserts as dessert, index}
			{#if dessert.quantity > 0}
				<div
					class="flex items-center justify-between border-b-[0.2px] border-rose-400 py-3 text-sm"
					in:fade
					out:fly={{ x: 100, duration: 300 }}
				>
					<div>
						<h6 class="mb-2 font-semibold">{dessert.name}</h6>
						<p class="flex gap-3">
							<span class="text-red font-semibold">{dessert.quantity}x</span>
							<span class="text-rose-500">@ ${dessert.price.toFixed(2)}</span>
							<strong class="font-semibold text-rose-500"
								>${(dessert.quantity * dessert.price).toFixed(2)}</strong
							>
						</p>
					</div>
					<button onclick={() => removeItem(index)}>
						<img src={xIcon} alt="remove item" class="mini-icon" />
					</button>
				</div>
			{/if}
		{/each}
		{#if $result.total > 0}
			<div in:fade>
				<div class="my-5 flex items-center justify-between">
					<p>Order Total</p>
					<h3 class="text-2xl font-bold">${$result?.price.toFixed(2)}</h3>
				</div>

				<div class="mb-4 flex gap-2 rounded-xl bg-rose-100 px-4 py-3">
					<img src={carbonIcon} alt="carbon icon" />
					<p>This is a <strong class="font-semibold">carbon-neutral</strong> delivery</p>
				</div>

				<button
					class="bg-red w-full rounded-4xl py-3 text-lg font-semibold text-rose-100"
					onclick={() => (showModal = true)}>Confirm Order</button
				>
			</div>
		{:else}
			<div in:fade>
				<img src={emptyCart} class="mx-auto py-3" alt="empty cart" />
				<p class="text-center font-semibold text-rose-400">Your added items will appear here</p>
			</div>
		{/if}
	</div>
	{#if showModal}
		<ConfirmModal onclick={() => (showModal = false)} />
	{/if}
</section>
