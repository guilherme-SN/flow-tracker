import Image from "next/image";
import TaskList from "./TaskList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskDisplay() {
  return (
    <div className="mt-10 ">
      <h2 className="flex flex-row justify-between scroll-m-20 border-black">
        Tasks
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src="icons/settings-2.svg"
              alt="Settings Icon"
              width={40}
              height={40}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-red-600 font-bold">
              <Image
                className="mr-1"
                src="icons/trash-bin-red.svg"
                alt="Trash Bin Icon"
                width={20}
                height={20}
              />
              Delete All Tasks
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </h2>

      {/* Task List */}
      <TaskList />
    </div>
  );
}
