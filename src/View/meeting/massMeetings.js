import React from "react";

import { useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/breadcrumb";
import MassMeetingUpdate from "../../Layouts/app/meeting/mass/update";
import MassDeleteMeeting from "../../Layouts/app/meeting/mass";
import MassTransferMeeting from "../../Layouts/app/meeting/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassMeetings() {
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
          <MassMeetingUpdate />
        ) : location?.search?.includes("delete") ? (
          <MassDeleteMeeting />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferMeeting />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassMeetings;
