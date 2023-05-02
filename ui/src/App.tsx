import { useState } from 'react';
import './App.css';

interface Response {
  dayId: string;
  sitUps: number;
  pushUps: number;
  squats: number;
  extra: number;
}

interface SliderProps {
  hide: boolean;
}
function Slider(p: SliderProps) {
  const [val, setVal] = useState(0);

  return (
    <div className={`flex flex-col items-center ${p.hide ? 'hidden' : ''}`}>
      {val}
      <input className="dsyrange dsyrange-lg my-5" type="range" min="0" max="100" onChange={(v) => {
        const x = +v.target.value;
        console.log(x);
        setVal(x);
      }} />
      <button className='dsybtn' onClick={() => {
        console.log('>>', val);
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
          onClick={() => { console.log('hi'); setHideSlider(!hideSlider); }}
        >
          <div className='flex justify-center'>Sit Ups</div>
          <div className='flex justify-center'>{sitUps}%</div>
        </button>

        <button className="dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center mx-2" style={{ "--value": pushUps, "--size": `${radialSize}rem` }}
          onClick={() => { console.log('hi'); setHideSlider(!hideSlider); }}
        >
          <div className='flex justify-center'>Push Ups</div>
          <div className='flex justify-center'>{pushUps}%</div>
        </button>

        <button className="dsyradial-progress bg-primary text-primary-content border-4 border-primary align-center" style={{ "--value": squats, "--size": `${radialSize}rem` }}
          onClick={() => { console.log('hi'); setHideSlider(!hideSlider); }}
        >
          <div className='flex justify-center'>Squats</div>
          <div className='flex justify-center'>{squats}%</div>
        </button>
      </div>
      <div className='absolute bottom-[25%] w-11/12'>
        <Slider hide={hideSlider} />
      </div>
    </div>
  );
}

export default App;
