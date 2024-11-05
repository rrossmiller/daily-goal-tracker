// const API_URL = 'http://pi3.local:8080';
const API_URL = 'http://localhost:8080';

export async function getData(date: Date): Promise<DataResponse> {
	const pth = `${date.getDate()}${date.getMonth()}${date.getUTCFullYear()}`;
	const r = await fetch(`${API_URL}/days/${pth}`);

	if (r.status === 200) {
		const json = await r.json();

		return json;
	}

	return { pushUps: 0, sitUps: 0, squats: 0 }; //, extra: '' };
}

export async function saveData(date: Date, topic: string, val: number) {
	const day = `${date.getDate()}${date.getMonth()}${date.getUTCFullYear()}`;
	const reqData: any = {
		dayId: day
	};

	let dbTopic = '';
	switch (topic) {
		case 'Sit Ups':
			dbTopic = 'sitUps';
			reqData['pushUps'] = 0;
			reqData['squats'] = 0;
			reqData['sitUps'] = val;
			break;
		case 'Push Ups':
			dbTopic = 'pushUps';
			reqData['sitUps'] = 0;
			reqData['squats'] = 0;
			reqData['pushUps'] = val;
			break;
		case 'Meditate':
			dbTopic = 'squats';
			reqData['pushUps'] = 0;
			reqData['sitUps'] = 0;
			reqData['squats'] = val;
			break;
	}

	const r = await fetch(`${API_URL}/days/${dbTopic}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqData)
	});
}
