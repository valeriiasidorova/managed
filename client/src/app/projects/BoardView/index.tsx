import React from "react";

import { useGetTasksQuery } from "@/state/api";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, Plus } from "lucide-react";

type BoardProps = {
  id: string;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
      {taskStatus.map((status) => (
        <TaskColumn key={status} status={status} tasks={tasks || []} />
      ))}
    </div>
  );
};

/* Task Column */
type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
};

const TaskColumn = ({ status, tasks }: TaskColumnProps) => {
  const tasksCount = tasks.filter((task) => task.status === status).length;
  
  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    "Completed": "#000000",
  };

  return (
    <div className="sl:py-4 rounded-lg py-2 xl:px-2">
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>

          {/* Right-side buttons */}
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
