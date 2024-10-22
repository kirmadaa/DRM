import React from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import ComplainceDetail from "../../../Layouts/app/compliance/complainceDetail";

const Compliance = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <ComplainceDetail />
      </div>
    </div>
  );
};

export default Compliance;
