import { useMemo, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Timer from './Timer';
import { useTimer } from '../hooks';

const timer = {
  work: 0.1,
  shortBreak: 5,
  longBreak: 10,
  stop: 0,
};
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type Mode = 'work' | 'shortBreak' | 'longBreak' | 'stop';

const TimerWrapper = () => {
  const [mode, setMode] = useState<Mode>('work');
  const [active, setActive] = useState(false);
  const remainTime = useTimer(timer[mode] * 60, active);

  const dashoffset = useMemo(() => {
    const process = remainTime / (timer[mode] * 60);
    return CIRCUMFERENCE * (1 - process);
  }, [mode, remainTime]);

  const handleMode = (selectedMode: Mode) => {
    if (selectedMode === 'stop') {
      setActive((prev) => !prev);
    } else {
      setMode(selectedMode);
      setActive(true);
    }
  };

  return (
    <div className="wrapper">
      <h1>Pomodoro Timer</h1>
      <div className="container">
        <div className="buttons">
          <button onClick={() => handleMode('work')} type="button">
            Work
          </button>
          <button
            onClick={() => handleMode('shortBreak')}
            className="shortBreak"
            type="button"
          >
            Short Break
          </button>
          <button
            onClick={() => handleMode('longBreak')}
            className="longBreak"
            type="button"
          >
            Long Break
          </button>
          <button
            onClick={() => handleMode('stop')}
            className="stop"
            type="button"
          >
            {active ? 'Stop' : 'Start'}
          </button>
        </div>
        <div className="circle_progress_wrap timer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="circle_progress"
            width="200"
            height="200"
            viewBox="0 0 120 120"
          >
            <circle className="frame" cx="60" cy="60" r="54" strokeWidth="12" />
            <circle
              className="bar"
              cx="60"
              cy="60"
              r="54"
              strokeWidth="12"
              strokeDashoffset={dashoffset}
              strokeDasharray={CIRCUMFERENCE}
            />
          </svg>
          <div className="value">
            <Timer time={timer[mode] * 60} active={active} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TimerWrapper />} />
      </Routes>
    </Router>
  );
}
