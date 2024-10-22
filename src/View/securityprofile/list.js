// import { ModulesListing } from "../../Layouts/";
import BreadCrumb from "../../Components/breadcrumb";
import SecurityProfile from "../../Layouts/app/securityProfile/detail";
import SetupSidebar from "../../Layouts/app/setupSidebar";

const breadcrumblist = [{ name: "Dashboard", path: "/crm/list" }];

const SecurityProfiles = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="w-full">
        {/* <BreadCrumb
          mainTitle="Profile"
          active="list"
          breadcrumblist={breadcrumblist}
        /> */}
        <SecurityProfile />
      </div>
    </div>
  );
};

export default SecurityProfiles;
