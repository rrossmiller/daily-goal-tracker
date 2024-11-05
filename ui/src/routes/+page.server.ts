// import { posts } from './data.js';

import { getData } from '$lib/data';

export async function load() {
	const data = await getData(new Date());
	
	return {
		pushUps: data.pushUps,
		sitUps: data.sitUps,
		meditation: data.squats
	};
}
