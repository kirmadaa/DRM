import React from "react";
import CompanyLayout from "../../../Layouts/app/company";
import SetupSidebar from "../../../Layouts/app/setupSidebar";


const Company = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6">
      <SetupSidebar />
      <CompanyLayout />
    </div>
  );
};

export default Company;
