import React from "react";

import { useLocation, useParams } from "react-router-dom";
import LeadDetail from "../../Layouts/app/leads/detail";
import BreadCrumb from "../../Components/breadcrumb";
import MassWhatsapp from "../../Layouts/app/WhatsappTemplate/mass";
import MassTransferWhatsapp from "../../Layouts/app/WhatsappTemplate/mass/transfer";
import MassUpdateWhatsapp from "../../Layouts/app/WhatsappTemplate/mass/update";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Whatsapps", path: "/crm/whatsapp" },
  { name: "Mass", path: "/crm/whatsapp/mass-module" },
];

function MassWhatsappTemplates() {
  const location = useLocation();

  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit WhatsappTemplate"
        active={"Mass module"}
        breadcrumblist={breadcrumblist}
      />
      <div>
        {location?.search?.includes("update") ? (
          <MassUpdateWhatsapp />
        ) : location?.search?.includes("delete") ? (
          <MassWhatsapp />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferWhatsapp />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassWhatsappTemplates;
