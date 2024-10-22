import React from "react";
import AssignmentRule from "../../../../Layouts/app/automation/assignment-rules";
import SetupSidebar from "../../../../Layouts/app/setupSidebar";

const AssignmentRules = () => {
  return (
    <>
      <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
        <SetupSidebar />
        <div className="rounded-2xl bg-[white] w-full p-6">
          <AssignmentRule />
        </div>
      </div>
    </>
  );
};

export default AssignmentRules;
