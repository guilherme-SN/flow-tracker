import Image from "next/image";
import TaskList from "./TaskList";

export default function TaskDisplay() {
  return (
    <div className="mt-10 ">
      <h2 className="flex flex-row justify-between scroll-m-20 border-black">
        Tasks
        <Image
          src="icons/settings-2.svg"
          alt="Settings Icon"
          width={40}
          height={40}
        />
      </h2>
      
      <TaskList />
    </div>
  );
}
