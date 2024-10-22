import React from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";

const BluePrint = () => {
  return  <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
  <SetupSidebar />
  <div className="rounded-2xl bg-[white] w-full p-6">
    <h2 className="font-semibold">Add Activities</h2>
  </div>
</div>
};

export default BluePrint;
