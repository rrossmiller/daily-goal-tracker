/**
 * Don't use this as an example of good practices 😉
 * ... It works for me
 */
import {useState} from 'react';
import './App.css';

interface Response {
    dayId: string;
    sitUps: number;
    pushUps: number;
    squats: number;
    extra: number;
}

interface SliderProps {
    today: Date;
    hide: boolean;
    topic: string;
    topicTitle: string;
    getData(date: Date): void;
}
function Slider(p: SliderProps) {
    const [val, setVal] = useState(0);

    async function saveData(date: Date) {
        const day = `${date.getDate()}${date.getMonth()}${date.getUTCFullYear()}`;
        const reqData: any = {
            dayId: day,
        };
        reqData[p.topic] = val;

        switch (p.topic) {
            case 'sitUps':
                reqData['pushUps'] = 0;
                reqData['squats'] = 0;
                break;
            case 'pushUps':
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

        await fetch(`/api/days/${p.topic}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(reqData),
        });

        p.getData(p.today);
    }
    return (
        <div className={`flex flex-col items-center ${p.hide ? 'hidden' : ''}`}>
            {`${p.topicTitle}: ${val}`}
            <input
                className='dsyrange dsyrange-lg my-5'
                type='range'
                min='0'
                max='100'
                onChange={(v) => {
                    const x = +v.target.value;
                    setVal(x);
                }}
            />

            <button
                className='dsybtn'
                onClick={() => {
                    saveData(p.today);
                }}
            >
                Submit
            </button>
        </div>
    );
}

function App() {
    const [today, setToday] = useState(new Date());
    const [sitUps, setSitUps] = useState(0);
    const [pushUps, setPushUps] = useState(0);
    const [squats, setSquats] = useState(0);
    const [extra, setExtra] = useState(0);
    const [hideSlider, setHideSlider] = useState(true);
    const [sliderTopic, setSliderTopic] = useState('pushUps');
    const [sliderTopicTitle, setSliderTopicTitle] = useState('Push Ups');

    const radialSize = 7;

    async function getData(date: Date) {
        const pth = `${date.getDate()}${date.getMonth()}${date.getUTCFullYear()}`;
        const data: Promise<Response> = (await fetch(`/api/days/${pth}`)).json();
        setSitUps((await data).sitUps);
        setPushUps((await data).pushUps);
        setSquats((await data).squats);
        setExtra((await data).extra);
    }

    getData(today);

    return (
        <div className='flex flex-col items-center'>
            <div className='my-20'>
                {/* TODO add forward and back buttons to go around dates */}
                <h1 className='text-3xl'>{today.toDateString()}</h1>
            </div>
            {/* radial progress */}
            <div className='flex overflow-hidden'>
                <button
                    className='dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center'
                    style={{'--value': sitUps, '--size': `${radialSize}rem`}}
                    onClick={() => {
                        setHideSlider(!hideSlider);
                        setSliderTopic('sitUps');
                        setSliderTopicTitle('Sit Ups');
                    }}
                >
                    <div className='flex justify-center'>Sit Ups</div>
                    <div className='flex justify-center'>{sitUps}%</div>
                </button>

                <button
                    className='dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center mx-2'
                    style={{'--value': pushUps, '--size': `${radialSize}rem`}}
                    onClick={() => {
                        setHideSlider(!hideSlider);
                        setSliderTopic('pushUps');
                        setSliderTopicTitle('Push Ups');
                    }}
                >
                    <div className='flex justify-center'>Push Ups</div>
                    <div className='flex justify-center'>{pushUps}%</div>
                </button>

                <button
                    className='dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center'
                    style={{'--value': squats, '--size': `${radialSize}rem`}}
                    onClick={() => {
                        setHideSlider(!hideSlider);
                        setSliderTopic('squats');
                        setSliderTopicTitle('Squats');
                    }}
                >
                    <div className='flex justify-center'>Squats</div>
                    <div className='flex justify-center'>{squats}%</div>
                </button>
            </div>
            <h3 className='mt-5 text-lg'>Extra: {extra}</h3>
            <div className='flex'>
                <button // back arrow
                    className='w-7 fill-[#a6adbb]'
                    onClick={() => {
                        today.setDate(today.getDate() - 1);
                        setToday(today);
                        getData(today);
                    }}
                >
                    {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'>
                        <path d='M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z' />
                    </svg>
                </button>
                <button
                    className='w-12 mx-8 fill-[#a6adbb]'
                    onClick={() => {
                        setToday(new Date());
                        getData(today);
                    }}
                >
                    {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
                    </svg>
                </button>
                <button // forward arrow
                    className='w-7 fill-[#a6adbb]'
                    onClick={() => {
                        today.setDate(today.getDate() + 1);
                        setToday(today);
                        getData(today);
                    }}
                >
                    {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'>
                        <path d='M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z' />
                    </svg>
                </button>
            </div>
            <div className='absolute bottom-[15%] w-11/12'>
                <Slider today={today} hide={hideSlider} topic={sliderTopic} topicTitle={sliderTopicTitle} getData={getData} />
            </div>
        </div>
    );
}

export default App;
