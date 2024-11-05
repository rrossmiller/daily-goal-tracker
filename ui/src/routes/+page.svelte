<script lang="ts">
	import { getData, saveData } from '$lib/data';
	import Progress from './Progress.svelte';
	import Slider from './Slider.svelte';
	let { data } = $props();

	let date = $state(new Date());

	let sitUps = $state(data.sitUps);
	let pushUps = $state(data.pushUps);
	let meditate = $state(data.meditation);
	let sliderVisible = $state(false);
	let activeDial = $state('');

	function toggleSlider(name: string) {
		// if a new progress dial is clicked, don't hide. just change name
		if (name !== activeDial) {
			if (!sliderVisible) {
				sliderVisible = !sliderVisible;
			}
			activeDial = name;
		} else {
			sliderVisible = !sliderVisible;
		}
	}

	function updateProgress(value: number, name: string) {
		switch (name) {
			case 'Sit Ups':
				sitUps = value;
				break;
			case 'Push Ups':
				pushUps = value;
				break;
			case 'Meditate':
				meditate = value;
				break;
		}
		saveData(date, name, value);
	}
</script>

<div class="bg-steel-blue-950 flex h-screen flex-col items-center text-white">
	<h1 class=" my-20 text-3xl">{date.toDateString()}</h1>
	<!-- radial progress  -->
	<div class="flex overflow-hidden">
		<Progress val={sitUps} name={'Sit Ups'} callback={toggleSlider} total={100} />
		<div class="mx-1"></div>
		<Progress val={pushUps} name={'Push Ups'} callback={toggleSlider} total={100} />
		<div class="mx-1"></div>
		<Progress val={meditate} name={'Meditate'} callback={toggleSlider} total={15} />
	</div>

	<div class="mt-5"></div>
	<!-- Move dates -->
	<div class="flex">
		<!-- back arrow -->
		<button
			class="w-7 fill-[#a6adbb]"
			onclick={async () => {
				date.setDate(date.getDate() - 1);
				date = new Date(date);
				const data = await getData(date);

				pushUps = data.pushUps;
				sitUps = data.sitUps;
				meditate = data.squats;
			}}
		>
			<!-- ! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.  -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
				<path
					d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
				/>
			</svg>
		</button>
		<!-- reset to today -->
		<button
			class="mx-8 w-12 fill-[#a6adbb]"
			onclick={async () => {
				date = new Date();
				const data = await getData(date);
				pushUps = data.pushUps;
				sitUps = data.sitUps;
				meditate = data.squats;
			}}
		>
			<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
			</svg>
		</button>
		<!-- forward arrow -->
		<button
			class="w-7 fill-[#a6adbb]"
			onclick={async () => {
				date.setDate(date.getDate() + 1);
				date = new Date(date);
				const data = await getData(date);
				pushUps = data.pushUps;
				sitUps = data.sitUps;
				meditate = data.squats;
			}}
		>
			<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
				<path
					d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
				/>
			</svg>
		</button>
	</div>
	{#if sliderVisible && activeDial === 'Sit Ups'}
		<div class="mt-5"></div>
		<Slider val={sitUps} {activeDial} {updateProgress} />
	{:else if sliderVisible && activeDial === 'Push Ups'}
		<div class="mt-5"></div>
		<Slider val={pushUps} {activeDial} {updateProgress} />
	{:else if sliderVisible && activeDial === 'Meditate'}
		<div class="mt-5"></div>
		<Slider val={meditate} {activeDial} {updateProgress} />
	{/if}
</div>
