import { ModulesListing } from "../../../Layouts";
import SetupSidebar from "../../../Layouts/app/setupSidebar";


const ListOfModules = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2">
      <SetupSidebar />
      <div className="py-2 w-full">
        <ModulesListing />
      </div>
    </div>
  );
};

export default ListOfModules;
