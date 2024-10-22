import { useLocation } from "react-router-dom";
import BreadCrumb from "../../Components/breadcrumb";
import MassUpdateTasks from "../../Layouts/app/tasks/mass/update";
import MassDeleteTasks from "../../Layouts/app/tasks/mass";
import MassTransferTasks from "../../Layouts/app/tasks/mass/transfer";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
  { name: "Mass", path: "/crm/leads/mass-module" },
];

function MassTasks() {
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
          <MassUpdateTasks />
        ) : location?.search?.includes("delete") ? (
          <MassDeleteTasks />
        ) : location?.search?.includes("transfer") ? (
          <MassTransferTasks />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MassTasks;
