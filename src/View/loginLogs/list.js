// import { ModulesListing } from "../../Layouts/";
import BreadCrumb from "../../Components/breadcrumb";
import LoginLogs from "../../Layouts/app/loginLogs/index";
import SetupSidebar from "../../Layouts/app/setupSidebar";

const breadcrumblist = [{ name: "Dashboard", path: "/crm/dashboard" }];

const LoginLog = () => {
  return (
    <div className="w-full flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        {/* <BreadCrumb
          mainTitle="Profile"
          active="Login Logs"
          breadcrumblist={breadcrumblist}
        /> */}
        <LoginLogs />
      </div>
    </div>
  );
};

export default LoginLog;
