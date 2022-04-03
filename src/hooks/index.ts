import { useEffect, useRef, useState } from 'react';

const DELAY_TIME = 1000;

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay === null) return () => {};

    const interval = setInterval(tick, delay);
    return () => clearInterval(interval);
  }, [delay]);
};

export const useTimer = (time: number, active: boolean) => {
  const [remainTime, setRemainTime] = useState(time);

  useEffect(() => {
    time > 1 && setRemainTime(time);
  }, [time]);

  useInterval(
    () => setRemainTime((remain) => remain - 1),
    remainTime > 0 && active ? DELAY_TIME : null
  );

  return remainTime;
};
