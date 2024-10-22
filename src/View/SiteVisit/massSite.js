import React from "react";

import { useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/breadcrumb";
import MassSiteUpdate from "../../Layouts/app/siteVisit/mass/update";
import MassSiteDelete from "../../Layouts/app/siteVisit/mass";
import MassTransferSite from "../../Layouts/app/siteVisit/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassSiteVisit() {
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
          <MassSiteUpdate />
        ) : location?.search?.includes("delete") ? (
          <MassSiteDelete />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferSite />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassSiteVisit;
