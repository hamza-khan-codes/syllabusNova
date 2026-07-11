import { useEffect, useState } from "react";

export default function Countdown({ className, min, onStopFunc = () => {} }) {
  const Sec = min * 60;

  const [sec, setSec] = useState(Sec);

  useEffect(() => {
    const timer = setInterval(() => {
      setSec(sec - 1);
    }, 1000);
    if (sec === 0) {
      clearInterval(timer);
      const oncall = onStopFunc;
      oncall();
    }
    return () => {
      clearInterval(timer);
    };
  }, [sec]);
  const minute = String(Math.floor(sec / 60));
  const seconds = String(sec % 60);

  return (
    <>
      <span className={className} role="timer">
        {minute.padStart(2, "0")}:{seconds.padStart(2, "0")}
      </span>
    </>
  );
}
