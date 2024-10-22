import SetupSidebar from "../../../Layouts/app/setupSidebar";
import ProfileLayout from "../../../Layouts/app/user/profile";

const UserProfile = () => {

  return (
    <>
      <div className="w-full min-h-screen flex gap-6 py-6">
        <SetupSidebar />
        <ProfileLayout />
      </div>
    </>
  );
};

export default UserProfile;
