<script lang="ts">
	let {
		max,
		val,
		quantity,
		activeDial,
		updateProgress
	}: { max: number; val: number; quantity: number; activeDial: string; updateProgress: Function } =
		$props();
	// let val = $state(0);

	$effect(() => {
		updateProgress(val, activeDial);
	});
</script>

<div class="flex w-10/12 flex-col items-center">
	<div class="text-white">{activeDial}: {val}</div>
	<input type="range" min="0" {max} bind:value={val} class="dsyrange" step="1" />
	<div class="flex">
		<button
			class="dsybtn"
			onclick={() => {
				val = Math.max(val - quantity, 0);
			}}>-{quantity}</button
		>
		<div class="mx-2"></div>
		<button
			class="dsybtn"
			onclick={() => {
				val = Math.min(val + quantity, max);
			}}>{quantity}</button
		>
	</div>
</div>
