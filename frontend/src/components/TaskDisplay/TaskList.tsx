"use client";

import React from "react";
import TaskComponent from "./TaskComponent";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  fetchTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, fetchTasks }) => {
  return (
    <div className="flex flex-col">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <TaskComponent
              id={task.id}
              description={task.description}
              isCompleted={task.isCompleted}
              fetchTasks={fetchTasks}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
