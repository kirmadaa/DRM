import React from "react";

import { useLocation, useParams } from "react-router-dom";
// import LeadDetail from "../../Layouts/app/leads/detail";
import BreadCrumb from "../../Components/breadcrumb";
import MassSms from "../../Layouts/app/sms/mass";
import MassTransferSms from "../../Layouts/app/sms/mass/transfer";
import MassUpdateSms from "../../Layouts/app/sms/mass/update";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/sms" },
  { name: "Mass", path: "/crm/sms/mass-module" },
];

function MassSmss() {
  const location = useLocation();

  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Sms"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        {location?.search?.includes("update") ? (
          <MassUpdateSms />
        ) : location?.search?.includes("delete") ? (
          <MassSms />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferSms />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassSmss;
