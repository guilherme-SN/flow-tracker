import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Task.module.css";
import { useState } from "react";

interface TaskComponentProps {
  id: string;
  description: string;
  isCompleted: boolean;
  fetchTasks: () => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({
  id,
  description,
  isCompleted,
  fetchTasks,
}) => {
  const [completed, setCompleted] = useState<boolean>(isCompleted);

  const toggleCompletion = async () => {
    const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        description: description,
        isCompleted: !completed,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the task");
    }

    setCompleted((prevCompleted) => !prevCompleted);
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete task");
      }

      toast.success("Task deleted successfully!");

      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="flex flex-row items-center justify-between bg-slate-100 rounded-lg h-[55px] mt-5">
      <div className="flex flex-row items-center">
        <Button
          className={`ml-2 rounded-full ${styles.buttonAnimation}`}
          variant="ghost"
          size="icon"
        >
          <Image
            src={
              completed
                ? "icons/checked-circle.svg"
                : "icons/check-circle-2.svg"
            }
            alt="Check Icon"
            width={40}
            height={40}
            onClick={toggleCompletion}
          />
        </Button>
        <p
          className={`transition ease delay-1 text-xl p-0 m-0 ml-2 ${completed ? "line-through text-muted-foreground" : ""}`}
        >
          {description}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src="icons/Meatballs_menu.svg"
            alt="Meatballs Menu Icon"
            width={40}
            height={40}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Image
              className="mr-1"
              src="icons/edit.svg"
              alt="Edit Icon"
              width={20}
              height={20}
            />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteTask}>
            <Image
              className="mr-1"
              src="icons/trash-bin.svg"
              alt="Trash Bin Icon"
              width={20}
              height={20}
            />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskComponent;
