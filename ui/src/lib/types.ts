// place files you want to import through the `$lib` alias in this folder.

interface DataResponse {
	pushUps: number;
	sitUps: number;
	squats: number;
	// extra: string;
}
interface ProgressProps {
	val: number;
	total: number;
	name: string;
	callback: any;
}

interface SliderProps {
	val: number;
	today: Date;
	hide: boolean;
	topic: string;
	topicTitle: string;
	getData(date: Date): void;
}
