import React from "react";
import WorkFlowTabs from "../../../../Layouts/app/automation/workflow";
import SetupSidebar from "../../../../Layouts/app/setupSidebar";

const WorkFlow = () => {
  return (
    <>
      <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
        <SetupSidebar />
        <div className="rounded-2xl bg-[white] w-full p-6">
          <WorkFlowTabs />
        </div>
      </div>
    </>
  );
};

export default WorkFlow;
