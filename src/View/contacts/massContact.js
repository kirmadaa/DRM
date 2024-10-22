import React from "react";

import { useLocation } from "react-router-dom";
import BreadCrumb from "../../Components/breadcrumb";
import MassContact from "../../Layouts/app/contacts/mass";
import MassContactUpdate from "../../Layouts/app/contacts/mass/update";
import MassTransfer from "../../Layouts/app/contacts/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassContacts() {
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
          <MassContactUpdate />
        ) : location?.search?.includes("delete") ? (
          <MassContact />
        ) : location?.search?.includes("transfer") ? (
          <MassTransfer />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassContacts;
