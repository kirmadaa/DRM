import React from "react";

import { useLocation } from "react-router-dom";
import BreadCrumb from "../../../../Components/breadcrumb";
import MassUpdateNote from "../../../../Layouts/app/inventory/mass/update";
import MassDeleteNote from "../../../../Layouts/app/inventory/mass";
import MassTransferNote from "../../../../Layouts/app/inventory/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Note", path: "/crm/note" },
  { name: "Mass", path: "/crm/Note/mass-module" },
];

function MassNoteApp() {
  const location = useLocation();

  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Note"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        {location?.search?.includes("update") ? (
          <MassUpdateNote />
        ) : location?.search?.includes("delete") ? (
          <MassDeleteNote />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferNote />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassNoteApp;
