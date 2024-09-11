import { Button } from "@/components/ui/button"

import Image from "next/image";

export default function Home() {
  {
    /* Example Tasks Data (DELETE) */
  }
  const taskList = [
    {
      id: 1,
      taskDescription: "Task 1",
      isCompleted: true,
    },
    {
      id: 2,
      taskDescription: "Task 2",
      isCompleted: false,
    },
    {
      id: 3,
      taskDescription: "Task 3",
      isCompleted: true,
    },
    {
      id: 4,
      taskDescription: "Task 4",
      isCompleted: false,
    },
  ];

  return (
    <main>
      {/* Timer */}
      <div className="flex bg-slate-100 w-[630px] h-[310px] rounded-lg mx-auto justify-center">
        <div className="container flex flex-col items-center">
          {/* Modes */}
          <div className="flex flex-row justify-center gap-10 mt-10">
            <div className="flex justify-center items-center w-[130px] h-[50px] rounded-lg bg-slate-900 text-white text-xl font-medium">
              Focus
            </div>
            <div className="flex justify-center items-center w-[130px] h-[50px] rounded-lg bg-slate-200 text-xl font-medium">
              Break
            </div>
          </div>

          {/* Timer */}
          <div>
            <p className="text-[125px] font-bold leading-none">00:00</p>
          </div>

          {/* Timer Buttons */}
          <div className="flex flex-row justify-around w-[320px] mt-4">
            <Image
              src="icons/play-circle.svg"
              alt="Play Icon"
              width={40}
              height={40}
            />
            <Image
              src="icons/stop-circle.svg"
              alt="Stop Icon"
              width={40}
              height={40}
            />
            <Image
              src="icons/timer-reset.svg"
              alt="Reset Timer Icon"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>

      {/* Tasks */}

      <h2 className="flex flex-row justify-between mt-10 scroll-m-20 border-black">
        Tasks
        <Image
          src="icons/settings-2.svg"
          alt="Settings Icon"
          width={40}
          height={40}
        />
      </h2>

      <div className="flex flex-col">
        {taskList.map((task) => (
          <div
            className="flex flex-row items-center justify-between bg-slate-100 rounded-lg h-[55px] mt-5"
            key={task.id}
          >
            <div className="flex flex-row items-center">
              <Image
                className="ml-2"
                src="icons/check-circle-2.svg"
                alt="Check Icon"
                width={40}
                height={40}
              />
              <p className="text-xl text-muted-foreground p-0 m-0 ml-2">
                {task.taskDescription}
              </p>
            </div>
            <Image
              src="icons/Meatballs_menu.svg"
              alt="Meatballs Menu Icon"
              width={40}
              height={40}
            />
          </div>
        ))}
        <Button className="font-bold mt-5">Add New Task</Button>
      </div>
    </main>
  );
}
