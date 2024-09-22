import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./TimerDisplay.module.css";

interface TimerControlProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlProps> = ({
  isRunning,
  onStart,
  onPause,
  onStop,
  onReset,
}) => {
  return (
    <div className="flex flex-row justify-center gap-x-20 mt-4">
      <Button
        className={`rounded-full ${styles.buttonAnimation}`}
        variant="ghost"
        size="icon"
        onClick={isRunning ? onPause : onStart}
      >
        <Image
          src={isRunning ? "icons/pause-circle.svg" : "icons/play-circle.svg"}
          alt={isRunning ? "Pause Icon" : "Play Icon"}
          width={40}
          height={40}
        />
      </Button>
      <Button
        className={`rounded-full ${styles.buttonAnimation}`}
        variant="ghost"
        size="icon"
        onClick={onStop}
      >
        <Image
          src="icons/stop-circle.svg"
          alt="Stop Icon"
          width={40}
          height={40}
        />
      </Button>
      <Button
        className={`rounded-full ${styles.buttonAnimation}`}
        variant="ghost"
        size="icon"
        onClick={onReset}
      >
        <Image
          src="icons/timer-reset.svg"
          alt="Reset Timer Icon"
          width={40}
          height={40}
        />
      </Button>
    </div>
  );
};

export default TimerControls;
