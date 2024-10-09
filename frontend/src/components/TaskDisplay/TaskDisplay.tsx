"use client";

import Image from "next/image";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

export default function TaskDisplay() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState<string>("");

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

  const createTask = async () => {
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, isCompleted: false }),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    toast.success("Task created successfully!");

    setDescription("");
    fetchTasks();
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

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
            <DropdownMenuItem
              className="text-red-600 font-bold"
              onClick={deleteAllTasks}
            >
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

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-5 font-bold w-full">Add New Task</Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-100">
          <DialogHeader>
            <DialogTitle className="text-xl">Create Task</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" onClick={createTask}>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
