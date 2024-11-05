<script lang="ts">
	import { saveData } from '$lib/data';

	const radialSize = 7;
	let { val, name, callback, total = 100 }: ProgressProps = $props();

	let progress = $derived(Math.floor((val / total) * 100));
</script>

<div class="text-white">
	<button
		class="align-center border-steel-blue-700 bg-steel-blue-700 dsyradial-progress border-4"
		style="--value: {progress}; --size: {radialSize}rem"
		onclick={() => callback(name)}
	>
		<div class="flex justify-center">{name}</div>
		<div class="flex justify-center">{progress}%</div>
	</button>
</div>
