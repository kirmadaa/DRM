import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/images/users/user-dummy-img.jpg";

const ProfileButton = ({ profileInfo }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/crm/login");
  };

  return (
    <div className="text-right ">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="px-1 md:px-2 lg:px-2 flex justify-start border rounded-xl items-center mx-1 focus:ring-0 focus:outline-none p-1">
            <img
              src={avatar}
              alt="profile avatar"
              className="rounded-full w-9 h-9 object-fill"
            />
            <span className="hidden lg:block md:block ">User name here</span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-[200px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-0 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/web/profile/edit"
                    className={`border-b ${
                      active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    <i className="bx bx-pencil mr-2 text-lg"></i>
                    Edit Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/web/profile/detail"
                    className={`border-b ${
                      active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    <i className="bx bx-user-circle mr-2 text-lg"></i>
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/web/wallet-transactions"
                    className={`border-b ${
                      active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    <i className="bx bx-wallet-alt mr-2 text-lg"></i>
                    <span>Wallet Amount :{/* ₹ */}</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/web/notifications"
                    className={`border-b ${
                      active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    <i className="bx bx-bell mr-2 text-lg"></i>
                    Notifications
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    <i className="bx bx-log-out mr-2 text-lg"></i>
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileButton;
