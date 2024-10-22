import React from "react";

import { useLocation } from "react-router-dom";
import BreadCrumb from "../../../../Components/breadcrumb";
import MassUpdateInventory from "../../../../Layouts/app/inventory/mass/update";
import MassDeleteInventory from "../../../../Layouts/app/inventory/mass";
import MassTransferInventory from "../../../../Layouts/app/inventory/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Inventory", path: "/crm/inventory" },
  { name: "Mass", path: "/crm/inventory/mass-module" },
];

function MassInventoryApp() {
  const location = useLocation();

  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Inventory"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        {location?.search?.includes("update") ? (
          <MassUpdateInventory />
        ) : location?.search?.includes("delete") ? (
          <MassDeleteInventory />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferInventory />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassInventoryApp;
