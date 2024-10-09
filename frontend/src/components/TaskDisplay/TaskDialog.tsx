"use client";

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TaskDialogProps {
  mode: "create" | "edit";
  taskId?: string;
  initialDescription?: string;
  fetchTasks: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void,
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  mode,
  taskId,
  initialDescription,
  fetchTasks,
  isOpen,
  setIsOpen,
}) => {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (mode === "edit" && initialDescription) {
      setDescription(initialDescription);
    }
  }, [mode, initialDescription]);

  const handleSave = async () => {
    const url =
      mode === "edit"
        ? `http://localhost:8080/api/tasks/${taskId}`
        : "http://localhost:8080/api/tasks";

    const method = mode === "edit" ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, isCompleted: false }),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${mode === "edit" ? "edit" : "create"} task`);
    }

    setDescription("");
    fetchTasks();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={mode === "edit" ? "ghost" : "default"}
          className={`mt-5 ${mode === "edit" ? "m-0 pl-0" : "font-bold w-full "}`}
          onClick={fetchTasks}
        >
          {mode === "edit" ? "" : "Add New Task"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-100">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === "edit" ? "Edit Task" : "Create Task"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter task description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={async () => {
                await handleSave();
              }}
            >
              {mode === "edit" ? "Save" : "Create"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;


