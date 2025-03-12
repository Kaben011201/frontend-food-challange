<script>
	import { desserts, result } from '../../shared';
	import addToCart from '$assets/images/icon-add-to-cart.svg';
	import addQuantity from '$assets/images/icon-increment-quantity.svg';
	import removeQuantity from '$assets/images/icon-decrement-quantity.svg';

	function CartHandler(index, type='') {
		desserts.update((currentCart) => {
			const newCart = [...currentCart];
			if (type === 'increas') {
				newCart[index].quantity += 1;
        result.update((currentResult) => {
          const newResult = {...currentResult};
          newResult.total += 1
          newResult.price += newCart[index].price;
          return newResult;
        });
			} else {
				if (newCart[index].quantity > 0) {
					newCart[index].quantity -= 1;
          result.update((currentResult) => {
         const newResult = {...currentResult};
          newResult.total -= 1
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

	<figure>
		{#each $desserts as dessert, index}
			<div class="relative mb-8 ">
				<img src={dessert.image['mobile']} class="w-full rounded-xl transition-all duration-100 ease-linear  {dessert.quantity > 0 ? 'outline-1 outline-red' : 'outline-none  outline-transparent'}" alt={dessert.name} />
				<div
					class="absolute inset-x-24 -bottom-5 rounded-3xl  border-rose-500 {dessert?.quantity >
					0
						? 'bg-red'
						: 'bg-white border'} px-4 py-2 font-semibold"
				>
					{#if dessert?.quantity <= 0}
						<button
							class="flex w-full items-center justify-center gap-2"
							onclick={() => CartHandler(index, 'increas')}
						>
							<img src={addToCart} alt="add to cart {index}" /> Add to Cart
						</button>
					{:else}
						<div class="flex justify-between items-center">
							<button class="mini-icon !py-[6px]" onclick={() => CartHandler(index, 'decreas')}>
								<img src={removeQuantity} alt="decrement {index}" />
							</button>
							<span class="text-white">{dessert.quantity}</span>
							<button class="mini-icon" onclick={() => CartHandler(index, 'increas')}>
								<img src={addQuantity} alt="increment {index}" />
							</button>
						</div>
					{/if}
				</div>
			</div>
			<figcaption class="mb-6">
				<p class="text-sm text-rose-500">{dessert.category}</p>
				<h4 class="font-semibold">{dessert.name}</h4>
				<p class="text-red font-semibold">${dessert.price.toFixed(2)}</p>
			</figcaption>
		{/each}
	</figure>
</section>
