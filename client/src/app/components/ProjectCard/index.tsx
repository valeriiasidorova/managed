import { Project } from "@/state/api";
import React from "react";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="rounded border p-4 shadow">
      <h3 className="font-semibold">{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  );
};

export default ProjectCard;
