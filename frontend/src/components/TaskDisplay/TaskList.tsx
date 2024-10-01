"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import TaskComponent from "./TaskComponent";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:8080/api/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <div
          key={task.id}
        >
          <TaskComponent
            id={task.id}
            description={task.description}
            isCompleted={task.isCompleted}
          />
        </div>
      ))}
      <Button className="font-bold mt-5">Add New Task</Button>
    </div>
  );
};

export default TaskList;
