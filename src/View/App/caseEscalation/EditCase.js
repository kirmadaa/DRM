import React from "react";
import EditLayout from "../../../Layouts/app/caseEscalation/Edit";
import SetupSidebar from "../../../Layouts/app/setupSidebar";

const EditCase = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <EditLayout />
    </div>
  );
};

export default EditCase;
