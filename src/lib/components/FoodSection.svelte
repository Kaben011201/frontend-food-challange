<script>
	import { onMount } from 'svelte';
	import { desserts, result } from '../../shared';
	import addToCart from '$assets/icons/icon-add-to-cart.svg?raw';
	import addQuantity from '$assets/icons/icon-increment-quantity.svg?raw';
	import removeQuantity from '$assets/icons/icon-decrement-quantity.svg?raw';

	let currentBreakpoint = 'mobile';

	function updateBreakpoint() {
		if (window.innerWidth >= 1024) {
			currentBreakpoint = 'desktop';
		} else if (window.innerWidth >= 800) {
			currentBreakpoint = 'tablet';
		} else {
			currentBreakpoint = 'mobile';
		}
	}

	onMount(() => {
		updateBreakpoint();
		window.addEventListener('resize', updateBreakpoint);
		return () => window.removeEventListener('resize', updateBreakpoint);
	});

	function CartHandler(index, type = '') {
		desserts.update((currentCart) => {
			const newCart = [...currentCart];
			if (type === 'increase') {
				newCart[index].quantity += 1;
				result.update((currentResult) => {
					const newResult = { ...currentResult };
					newResult.total += 1;
					newResult.price += newCart[index].price;
					return newResult;
				});
			} else {
				if (newCart[index].quantity > 0) {
					newCart[index].quantity -= 1;
					result.update((currentResult) => {
						const newResult = { ...currentResult };
						newResult.total -= 1;
						newResult.price -= newCart[index].price;
						return newResult;
					});
				}
			}
			return newCart;
		});
	}
</script>

<section>
	<h1 class="mb-8 text-4xl font-bold">Desserts</h1>

	<div class="gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
		{#each $desserts as dessert, index}
			<figure>
				<div class="relative mb-8">
					<img
						src={dessert.image[currentBreakpoint]}
						class="transition-costum w-full rounded-xl {dessert.quantity > 0 ? 'outline-red outline-1' : 'outline-transparent outline-none'}"
						alt={dessert.name}
					/>
					<div
						class="hover:border-red hover:text-red absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-3xl border-rose-500 {dessert?.quantity > 0 ? 'bg-red' : 'border bg-white'} px-4 py-2 font-semibold"
					>
						{#if dessert?.quantity <= 0}
							<button
								class="flex w-full min-w-32 items-center justify-center gap-2 text-sm"
								onclick={() => CartHandler(index, 'increase')}
							>
								{@html addToCart}
								Add to Cart
							</button>
						{:else}
							<div class="flex min-w-32 items-center justify-between">
								<button
									class="mini-icon hover:text-red !py-[6px] text-white hover:bg-white"
									onclick={() => CartHandler(index, 'decrease')}
								>
									{@html removeQuantity}
								</button>
								<span class="text-white">{dessert.quantity}</span>
								<button
									class="mini-icon hover:text-red text-white hover:bg-white"
									onclick={() => CartHandler(index, 'increase')}
								>
									{@html addQuantity}
								</button>
							</div>
						{/if}
					</div>
				</div>
				<figcaption class="mb-6">
					<p class="text-sm text-rose-500">{dessert.category}</p>
					<p class="font-semibold">{dessert.name}</p>
					<p class="text-red font-semibold">${dessert.price.toFixed(2)}</p>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>
