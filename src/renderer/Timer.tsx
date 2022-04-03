import { useMemo } from 'react';
import { useTimer } from '../hooks';

interface TimerProps {
  time: number;
  active: boolean;
}

const Timer = ({ time, active }: TimerProps) => {
  const remainTime = useTimer(time, active);

  const timerLabel = useMemo(() => {
    const minutes = `00${Math.floor((remainTime % 3600) / 60)}`.slice(-2);
    const seconds = `00${(remainTime % 3600) % 60}`.slice(-2);

    return `${minutes}:${seconds}`;
  }, [remainTime]);

  return <span>{timerLabel}</span>;
};

export default Timer;
