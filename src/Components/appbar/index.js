import { Menu } from "@headlessui/react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../../assets/images/header/message.svg";
import User from "../../assets/images/header/user.png";
import LogoNew from "../../assets/images/logo/logoNew.svg";
import { menuItems } from "./menuItems";
import { Fragment, useState } from "react";
import { HamburgerIcon } from "../../assets/svgIcons";
import MenuList from "./profileMenu";
import { Settings } from "react-feather";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HamBurger = ({ hamburger, currentPath }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full justify-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-opacity-90">
          <HamburgerIcon />
        </Menu.Button>
      </div>

      <Menu.Items
        style={{ zIndex: 1000 }}
        className="absolute left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {hamburger.map((el) => {
          return (
            <Fragment key={el?.key}>
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    key={el?.key}
                    to={el?.key}
                    className={`${currentPath === el?.key
                      ? "bg-primary text-white"
                      : "text-gray-900"
                      } group flex w-full items-center px-5 py-[10px] text-sm hover:bg-primary hover:text-white`}
                  >
                    {el.label}
                  </NavLink>
                )}
              </Menu.Item>
            </Fragment>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

const Appheader = () => {
  const [menuState, setMenuState] = useState(menuItems);
  const location = useLocation();
  const navigate = useNavigate();
  const permissionsData = useSelector(
    (store) => store.SecurityProfile.permissions
  );

  useEffect(() => {
    if (permissionsData?.permission) {
      let newMenuItems = menuItems
        ?.map((item, index) => {
          if (index < 1) {
            if (
              permissionsData?.permission?.find(
                (ele) =>
                  ele?.module_title?.toLowerCase() == item?.id?.toLowerCase()
              )
            ) {
              return item;
            }
          } else {
            return {
              ...item,
              hamburger: item?.hamburger
                ?.map((hamItem) => {
                  if (
                    permissionsData?.permission?.find(
                      (ele) =>
                        ele?.module_title?.toLowerCase() ==
                        hamItem?.id?.toLowerCase()
                    )
                  ) {
                    return hamItem;
                  }
                })
                ?.filter((ele) => ele !== undefined),
            };
            // }
          }
        })
        ?.filter((ele) => ele !== undefined);
      setMenuState(newMenuItems);
    }
  }, [permissionsData]);

  const logOut = () => {
    localStorage.clear();
    navigate("/crm/login");
  };
  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white flex justify-center border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-[88px]">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/crm/dashboard" className="flex flex-row">
                <img
                  className="w-[70px] sm:[70px] lg:w-[70px] md:[70px]"
                  src={LogoNew}
                  alt="Logo"
                />
                <p className="ml-0 mt-3 text-xl font-bold text-navy">TSM</p>
              </Link>
            </div>
            <nav className="flex justify-center w-full items-center text-base">
              {/* {console.log("item===>>", menuState, location?.pathname, location?.pathname)} */}

              {menuState?.map((item) => {
                let roots = item?.id ? (item?.id).slice(0, (item?.id.length - 1)) : ""
                // console.log("item===>>", (location?.pathname).includes(roots));
                return (
                  <Fragment
                    key={
                      item?.key ||
                      Math.random().toString(36).substr(2, 9) +
                      new Date().getTime().toString(36)
                    }
                  >
                    {!item?.hamburger ? (
                      <NavLink
                        to={item?.key}
                        className={`px-4 hover:text-gray-900 text-sm font-medium ${item?.key === location?.pathname || (location?.pathname).includes(roots) || location?.pathname.includes(item?.id)
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-700"
                          }`}
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <HamBurger
                        currentPath={location?.pathname}
                        hamburger={item?.hamburger}
                      />
                    )}
                  </Fragment>
                );
              })}
            </nav>
            <div className="min-w-[200px] flex space-x-2 justify-end items-center">
              <Link to="/crm/ipanel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </Link>
              <Link to="/crm/chat">
                <img className="w-18 h-[22px]" src={Message} alt="meassage" />
              </Link>
              <Link to="/crm/setup">
                <Settings size={18} />
              </Link>
            </div>
            <Menu as="div" className="relative inline-block z-50">
              <div>
                <Menu.Button className="inline-flex items-center  w-full justify-center px-4 py-3 text-sm font-medium  text-white hover:bg-opacity-90">
                  <img src={User} className="w-10 min-w-[40px]" alt="user" />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {MenuList?.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Fragment>
                        <button
                          className={`hover:bg-primary hover:text-white  ${active ? "bg-primary text-white" : "text-gray-900"
                            } group flex w-full items-center px-5 py-[10px] text-sm`}
                          onClick={() => {
                            item?.path === "" ? logOut() : navigate(item?.path);
                          }}
                        >
                          <span className="mr-2"> {item?.icon}</span>
                          {item?.title}
                        </button>
                      </Fragment>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Appheader;
