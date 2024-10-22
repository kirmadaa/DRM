import React from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import TerritoruDetails from "../../../Layouts/app/territoryManagement/territoruDetails";

const TerritoryManagement = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6 mb-[50px]">
        <TerritoruDetails />
      </div>
    </div>
  );
};

export default TerritoryManagement;
