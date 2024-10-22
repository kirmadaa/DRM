import React from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../../Components/breadcrumb";
import MassUpdateOpportunity from "../../Layouts/app/opportunities/mass/update";
import MassDeleteOpportunity from "../../Layouts/app/opportunities/mass";
import MassTransferOpportunity from "../../Layouts/app/opportunities/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassOpportunity() {
  const location = useLocation();
  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Lead"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        {location?.search?.includes("update") ? (
          <MassUpdateOpportunity />
        ) : location?.search?.includes("delete") ? (
          <MassDeleteOpportunity />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferOpportunity />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassOpportunity;
