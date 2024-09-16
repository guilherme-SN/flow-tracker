"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        })
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isBreakMode, time]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? String(hours).padStart(2, "0") : null;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return formattedHours
      ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      {/* Modes */}
      <div className="flex flex-row justify-center gap-10 mt-10">
        <div
          className={`flex justify-center items-center w-[130px] h-[50px] rounded-lg text-xl font-medium select-none ${!isBreakMode ? "bg-slate-900 text-white" : "bg-slate-200"}`}
        >
          Focus
        </div>
        <div
          className={`flex justify-center items-center w-[130px] h-[50px] rounded-lg text-xl font-medium select-none ${isBreakMode ? "bg-slate-900 text-white" : "bg-slate-200"}`}
        >
          Break
        </div>
      </div>

      {/* Timer */}
      <p className="text-[125px] font-bold leading-none">{formatTime(time)}</p>

      {/* Timer Controls */}
      <div className="flex flex-row justify-center gap-x-20 mt-4">
        <Button
          className="rounded-full"
          variant="ghost"
          size="icon"
          onClick={isRunning ? pauseTimer : startTimer}
        >
          <Image
            src={isRunning ? "icons/pause-circle.svg" : "icons/play-circle.svg"}
            alt={isRunning ? "Pause Icon" : "Play Icon"}
            width={40}
            height={40}
          />
        </Button>
        <Button
          className="rounded-full"
          variant="ghost"
          size="icon"
          onClick={stopTimer}
        >
          <Image
            src="icons/stop-circle.svg"
            alt="Stop Icon"
            width={40}
            height={40}
          />
        </Button>
        <Button
          className="rounded-full"
          variant="ghost"
          size="icon"
          onClick={resetTimer}
        >
          <Image
            src="icons/timer-reset.svg"
            alt="Reset Timer Icon"
            width={40}
            height={40}
          />
        </Button>
      </div>
    </div>
  );
}
