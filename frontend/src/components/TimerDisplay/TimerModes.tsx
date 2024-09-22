
interface TimerModesProps {
  isBreakMode: boolean;
}

const TimerModes: React.FC<TimerModesProps> = ({ isBreakMode }) => {
  return (
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
  );
}

export default TimerModes;
