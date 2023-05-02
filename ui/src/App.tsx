import { useState } from 'react';
import './App.css';

interface Response {
    dayId: string;
    sitUps: number;
    pushUps: number;
    squats: number;
    extra: number;
}
interface SliderFuncProps {
    setSitUps: any;
    setPushUps: any;
    setSquats: any;
}
interface SliderProps {
    today: Date;
    hide: boolean;
    topic: string;
}
function Slider(p: SliderProps) {
    const [val, setVal] = useState(0);

    async function saveData(date: Date) {
        
        const day = `${date.getDate()}${date.getMonth()}${date.getUTCFullYear()}`;
        const reqData: any = {
            "dayId": day,
        };
        reqData[p.topic] = val

        switch (p.topic) {
            case 'sit_ups':
                reqData['pushUps'] = 0;
                reqData['squats'] = 0;
                break;
            case 'push_ups':
                reqData['sitUps'] = 0;
                reqData['squats'] = 0;
                break;
            case 'squats':
                reqData['pushUps'] = 0;
                reqData['sitUps'] = 0;
                break;
            default:
                break;
        }

        const data = (await fetch(`/api/days/${p.topic}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(reqData)
        })).json();
        console.log(data.then((r) => console.log(r)
        ));
    }
    return (
        <div className={`flex flex-col items-center ${p.hide ? 'hidden' : ''}`}>
            {val}
            <input className="dsyrange dsyrange-lg my-5" type="range" min="0" max="100" onChange={(v) => {
                const x = +v.target.value;
                console.log(x);
                setVal(x);
            }} />

            <button className='dsybtn' onClick={() => {
                console.log('>>', p.topic, val);
                saveData(p.today);
            }}>
                Submit
            </button>
        </div>
    );
}
function App() {
    const [sitUps, setSitUps] = useState(0);
    const [pushUps, setPushUps] = useState(0);
    const [squats, setSquats] = useState(0);
    const [hideSlider, setHideSlider] = useState(false);
    const [sliderTopic, setSliderTopic] = useState("pushUps");

    const today = new Date();
    const radialSize = 7;

    async function getData(date: Date) {
        const pth = `${date.getDate()}${date.getMonth()}${date.getUTCFullYear()}`;
        const data: Promise<Response> = (await fetch(`/api/days/${pth}`)).json();
        setSitUps((await data).sitUps);
        setPushUps((await data).pushUps);
        setSquats((await data).squats);
    }

    getData(today);

    return (
        <div className='flex flex-col items-center'>
            <div className='my-20'>
                <h1 className='text-3xl'>{today.toDateString()}</h1>
            </div>
            <div className='flex overflow-hidden'>
                <button className="dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center" style={{ "--value": sitUps, "--size": `${radialSize}rem` }}
                    onClick={() => { setHideSlider(!hideSlider); setSliderTopic("sitUps"); }}
                >
                    <div className='flex justify-center'>Sit Ups</div>
                    <div className='flex justify-center'>{sitUps}%</div>
                </button>

                <button className="dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center mx-2" style={{ "--value": pushUps, "--size": `${radialSize}rem` }}
                    onClick={() => { setHideSlider(!hideSlider); setSliderTopic("pushUps"); }}
                >
                    <div className='flex justify-center'>Push Ups</div>
                    <div className='flex justify-center'>{pushUps}%</div>
                </button>

                <button className="dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center" style={{ "--value": squats, "--size": `${radialSize}rem` }}
                    onClick={() => { setHideSlider(!hideSlider); setSliderTopic("squats"); }}
                >
                    <div className='flex justify-center'>Squats</div>
                    <div className='flex justify-center'>{squats}%</div>
                </button>
            </div>
            <div className='absolute bottom-[25%] w-11/12'>
                <Slider today={today} hide={hideSlider} topic={sliderTopic} />
            </div>
        </div>
    );
}

export default App;
