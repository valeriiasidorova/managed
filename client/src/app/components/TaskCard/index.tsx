import { Task } from "@/state/api";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "dd-MM-yyyy")
    : "Not set";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "dd-MM-yyyy")
    : "Not set";

  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      <p>
        <strong>ID: {task.id}</strong>
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "No tags "}
      </p>
      <p>
        <strong>Start Date:</strong> {formattedStartDate}
      </p>
      <p>
        <strong>Due Date:</strong> {formattedDueDate}
      </p>
      <p>
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length && (
              <Image
                src={`https://managed-s3-images.s3.eu-central-1.amazonaws.com/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="mt-1 rounded-md"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
