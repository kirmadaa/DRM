import BreadCrumb from "../../../Components/breadcrumb";
import EditProfileLayout from "../../../Layouts/app/user/editProfile";

const AppUserProfileEdit = () => {
  const breadcrumblist = [
    { name: "Dashboard", path: "/crm/dashboard" },
    { name: "User Profile", path: "/crm/profile" },
  ];

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="py-2 w-full">
          <BreadCrumb
            mainTitle="Edit profile"
            active="Edit profile"
            breadcrumblist={breadcrumblist}
          />
        </div>
        <EditProfileLayout />
      </div>
    </>
  );
};

export default AppUserProfileEdit;
