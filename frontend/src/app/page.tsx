
import TaskDisplay from "@/components/Tasks/TaskDisplay";
import TimerDisplay from "@/components/TimerDisplay/TimerDisplay";

export default function Home() {
  return (
    <main>
      {/* Timer */}
      <div className="flex bg-slate-100 w-[630px] h-[310px] rounded-lg mx-auto justify-center">
        <div className="container flex flex-col items-center">
          <TimerDisplay />
        </div>
      </div>

      {/* Tasks */}
      <TaskDisplay />
    </main>
  );
}
