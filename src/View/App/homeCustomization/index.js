import React from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import HomeCustomizationLayout from "../../../Layouts/app/homeCustomization/list";


const HomeCustomization = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6 mb-[50px]">
        <HomeCustomizationLayout />
      </div>
    </div>
  );
};

export default HomeCustomization;
