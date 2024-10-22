import React from "react";

import { useLocation, useParams } from "react-router-dom";
import LeadDetail from "../../Layouts/app/leads/detail";
import BreadCrumb from "../../Components/breadcrumb";
import MassLead from "../../Layouts/app/leads/mass";
import MassContact from "../../Layouts/app/contacts/mass";
import MassContactUpdate from "../../Layouts/app/contacts/mass/update";
import MassTransfer from "../../Layouts/app/contacts/mass/transfer";
import MassCallUpdate from "../../Layouts/app/call/mass/update";
import MassDeleteCall from "../../Layouts/app/call/mass";
import MassTransferCall from "../../Layouts/app/call/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassCall() {
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
          <MassCallUpdate />
        ) : location?.search?.includes("delete") ? (
          <MassDeleteCall />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferCall />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassCall;
