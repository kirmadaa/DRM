import SetupSidebar from "../../Layouts/app/setupSidebar";
import UserList from "../../Layouts/app/userList/detail";


const ListOfUser = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="w-full">
        <UserList />
      </div>
    </div>
  );
};

export default ListOfUser;
