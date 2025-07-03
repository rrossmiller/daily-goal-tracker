export async function load() {
	// have to use localhost for server-side get data
	// const data = await getData(new Date());

	const date = new Date();
	const pth = `${date.getDate()}${date.getMonth()}${date.getUTCFullYear()}`;
	const r = await fetch(`http://localhost:8080/days/${pth}`);
	// const r = await fetch(`http://piw.local:8080/days/${pth}`);
	const data = await r.json();
	return {
		pushUps: data.pushUps,
		sitUps: data.sitUps,
		meditation: data.squats
	};
}
