import React from "react";

import { useLocation } from "react-router-dom";
import BreadCrumb from "../../../Components/breadcrumb";
import MassSaleOrderDelete from "../../../Layouts/app/saleOrder/mass";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassSaleOrder() {
  const location = useLocation();
  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Lead"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        <MassSaleOrderDelete location={location?.search} />
      </div>
    </div>
  );
}

export default MassSaleOrder;
