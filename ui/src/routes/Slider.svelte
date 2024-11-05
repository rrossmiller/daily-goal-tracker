<script lang="ts">
	let {val ,activeDial, updateProgress }: {val:number, activeDial: string; updateProgress: Function } = $props();
	// let val = $state(0);

	$effect(() => {
		updateProgress(val, activeDial);
	});
</script>

<div class="flex w-10/12 flex-col items-center">
	<div class="text-white">{activeDial}: {val}</div>
	<input type="range" min="0" max="100" bind:value={val} class="dsyrange" step="1" />
	<div class="flex">
		<button
			class="dsybtn"
			onclick={() => {
				val = Math.max(val - 20, 0);
			}}>-20</button
		>
		<div class="mx-2"></div>
		<button
			class="dsybtn"
			onclick={() => {
				val = Math.min(val + 20, 100);
			}}>20</button
		>
	</div>
</div>
