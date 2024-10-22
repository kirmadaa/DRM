import { FormModulesByLayout } from "../../../Layouts";
import SetupSidebar from "../../../Layouts/app/setupSidebar";


const FormLayoutByModule = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2">
      <SetupSidebar />
      <div className="w-full">
        <FormModulesByLayout />
      </div>
    </div>
  );
};

export default FormLayoutByModule;
