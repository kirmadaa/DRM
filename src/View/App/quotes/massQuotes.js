import React from "react";

import { useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../../Components/breadcrumb";
import MassPurchaseOrderModules from "../../../Layouts/app/purchaseOrder/mass";
import MassQuotesModules from "../../../Layouts/app/quotes/mass";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassQuotes() {
  const location = useLocation();
  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Lead"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        <MassQuotesModules location={location?.search} />
      </div>
    </div>
  );
}

export default MassQuotes;
