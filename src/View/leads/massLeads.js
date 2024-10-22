import React from "react";

import { useLocation } from "react-router-dom";
import BreadCrumb from "../../Components/breadcrumb";
import MassLead from "../../Layouts/app/leads/mass";
import MassTransferLead from "../../Layouts/app/leads/mass/transfer";
import MassUpdateLead from "../../Layouts/app/leads/mass/update";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassLeads() {
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
          <MassUpdateLead />
        ) : location?.search?.includes("delete") ? (
          <MassLead />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferLead />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassLeads;
