"use client";

import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Timeline from "../TimelineView";
import Table from "../TableView";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div>
      {/* Modal NEW TASK */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && <Board id={id} />}
      {activeTab === "List" && <List id={id} />}
      {activeTab === "Timeline" && <Timeline id={id} />}
      {activeTab === "Table" && <Table id={id} />}
    </div>
  );
};

export default Project;
