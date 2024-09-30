import Image from "next/image";

interface TaskProps {
  description: string;
  isCompleted: boolean;
}

const TaskComponent: React.FC<TaskProps> = ({ description, isCompleted }) => {
  return (
    <div className="flex flex-row items-center justify-between bg-slate-100 rounded-lg h-[55px] mt-5">
      <div className="flex flex-row items-center">
        <Image
          className="ml-2"
          src="icons/check-circle-2.svg"
          alt="Check Icon"
          width={40}
          height={40}
        />
        <p className="text-xl text-muted-foreground p-0 m-0 ml-2">
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
