"use client";

import { useEffect, useState } from "react";

import TimerModes from "./TimerModes";
import TimerControls from "./TimerControls";
import { formatTime } from "./timerUtils";

export default function TimerDisplay() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakMode, setIsBreakMode] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = async () => {
    if (isBreakMode) return;

    const response = await fetch(
      `http://localhost:8080/api/timer/calculate-break-time?focusTime=${time}`,
      { method: "POST" },
    );

    if (response.ok) {
      const textData = await response.text();
      setTime(parseInt(textData, 10));
    }

    setIsRunning(false);
    setIsBreakMode(true);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setIsBreakMode(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (isBreakMode) {
            if (prevTime <= 0) {
              clearInterval(interval);

              setIsRunning(false);
              setIsBreakMode(false);

              return 0;
            } else {
              return prevTime - 1;
            }
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isBreakMode, time]);

  return (
    <div>
      {/* Modes */}
      <TimerModes isBreakMode={isBreakMode} />

      {/* Timer */}
      <p className="text-[125px] font-bold leading-none">{formatTime(time)}</p>

      {/* Timer Controls */}
      <TimerControls
        isRunning={isRunning}
        onStart={startTimer}
        onPause={pauseTimer}
        onStop={stopTimer}
        onReset={resetTimer}
      />
    </div>
  );
}
