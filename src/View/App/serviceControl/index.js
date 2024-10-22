import { ServiceControlLayout } from "../../../Layouts";
import SetupSidebar from "../../../Layouts/app/setupSidebar";

const ServiceControl = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <ServiceControlLayout />
      </div>
    </div>
  );
};

export default ServiceControl;
