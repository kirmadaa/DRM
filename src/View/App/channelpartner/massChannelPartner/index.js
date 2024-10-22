import React from "react";

import { useLocation } from "react-router-dom";
import BreadCrumb from "../../../../Components/breadcrumb";
import MassUpdateVendor from "../../../../Layouts/app/vendor/mass/update";
import MassDeleteVendor from "../../../../Layouts/app/vendor/mass";
import MassTransferVendor from "../../../../Layouts/app/vendor/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Note", path: "/crm/note" },
  { name: "Mass", path: "/crm/Note/mass-module" },
];

function MasschannelPartner() {
  const location = useLocation();

  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Channel Partner"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        {location?.search?.includes("update") ? (
          <MassUpdateVendor />
        ) : location?.search?.includes("delete") ? (
          <MassDeleteVendor />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferVendor />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MasschannelPartner;
