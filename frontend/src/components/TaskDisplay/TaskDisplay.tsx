"use client";

import Image from "next/image";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

export default function TaskDisplay() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const deleteAllTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "DELETE",
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete all tasks");
      }

      toast.success("All tasks deleted successfully!");

      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mt-10 ">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />

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
            <DropdownMenuItem className="text-red-600 font-bold" onClick={deleteAllTasks}> 
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
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}
