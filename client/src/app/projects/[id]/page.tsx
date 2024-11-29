"use client";

import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";

// type Props = {
// };

const Project = () => {
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div>
      {/* Modal NEW TASK */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* TODO: {activeTab === "Board" && ( <Board />)} */}
    </div>
  );
};

export default Project;
