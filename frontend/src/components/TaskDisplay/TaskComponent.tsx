import Image from "next/image";
import { Button } from "@/components/ui/button";

import styles from "./Task.module.css"
import { useState } from "react";

interface TaskProps {
  id: string;
  description: string;
  isCompleted: boolean;
}

const TaskComponent: React.FC<TaskProps> = ({ id, description, isCompleted }) => {
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
        isCompleted: !completed
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the task");
    }

    setCompleted((prevCompleted) => !prevCompleted);
  }

  return (
    <div className="flex flex-row items-center justify-between bg-slate-100 rounded-lg h-[55px] mt-5">
      <div className="flex flex-row items-center">
        <Button className={`ml-2 rounded-full ${styles.buttonAnimation}`} variant="ghost" size="icon">
          <Image
            src={completed ? "icons/checked-circle.svg" : "icons/check-circle-2.svg"}
            alt="Check Icon"
            width={40}
            height={40}
            onClick={toggleCompletion}
          />
        </Button>
        <p className={`transition ease delay-1 text-xl p-0 m-0 ml-2 ${completed ? "line-through text-muted-foreground" : ""}`}>
          {description}
        </p>
      </div>
      <Image
        src="icons/Meatballs_menu.svg"
        alt="Meatballs Menu Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

export default TaskComponent;
