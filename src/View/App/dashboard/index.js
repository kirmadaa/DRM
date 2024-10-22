import React from "react";
import CardsLayout from "../../../Layouts/app/dashboard/cards";
import SubHeaderLayout from "../../../Layouts/app/dashboard/subHeader.js";
import EarningCards from "../../../Layouts/app/dashboard/earnings/cards";
import EarningTableLayout from "../../../Layouts/app/dashboard/earnings/table";
import CustomizationDashboard from "../../../Layouts/app/dashboard/customizationDashboard";

const DashboardView = () => {
  return (
    <>
      <div className="m-8">
        <CardsLayout />
      </div>

      <SubHeaderLayout />
      {/* <CustomizationDashboard /> */}

      {/* <EarningCards />
      <EarningTableLayout /> */}
    </>
  );
};

export default DashboardView;
