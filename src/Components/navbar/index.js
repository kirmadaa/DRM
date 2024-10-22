import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../Components/drawer";

const menu = [
  { title: "Residential", path: "/web/residential" },
  { title: "Commercial", path: "/web/commercial" },
  { title: "For Business", path: "/web/for-business" },
  { title: "Market News", path: "/web/market-news" },
];
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  //   const { profileInfo } = store.auth;
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    dispatch({ type: "HANDLE_LOGIN", data: userData });
  }, [dispatch]);

  const activeStyle = "border-b border-white text-white font-bold";
  const inactiveStyle = "font-[200] text-white";

  return (
    <nav className="py-4 flex justify-center bg-primary relative z-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/crm/dashboard">
                <img className="w-16" src="/web/logo_white.svg" alt="Logo" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex  sm:space-x-8">
              {menu?.map((item, i) => {
                let { path, title } = item;
                return (
                  <Link
                    to={path}
                    key={i}
                    className={`transition ease-in-out delay-0 hover:-translate-2  hover:border-white hover:border-b hover:scale-110 duration-300 inline-flex items-center px-1 pt-1 leading-2  ${
                      path === location?.pathname ? activeStyle : inactiveStyle
                    }`}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Login Button */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 gap-2">
            {auth?.logedInUser ? (
              <Link
                to="/web/dashboard"
                className="text-primary justify-center items-center rounded relative flex h-11 w-full px-6 before:absolute before:inset-0 before:rounded-full bg-[#FFFDEE] hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                {auth?.profileInfo?.data[0]?.name || "Dashboard"}
              </Link>
            ) : (
              <Fragment>
                <Link
                  to="/crm/login"
                  className="text-white font-[200] rounded-xl relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  Login
                </Link>
                <Link
                  to="/web/register"
                  className="text-primary  justify-center items-center font-[200] rounded-xl relative flex h-11 w-full px-10 before:absolute before:inset-0 before:rounded-full bg-[#FFFDEE] hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  Signup
                </Link>
              </Fragment>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="border inline-flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus:bg-gray-100 focus:text-gray-500"
            >
              <i className="text-white text-2xl bx bx-menu"></i>
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <div className="flex flex-col p-2 w-full h-screen">
                {menu?.map((item, i) => {
                  let { path, title } = item;
                  return (
                    <Link
                      to={path}
                      key={i}
                      className={`inline-flex text-lg mt-2 items-center px-3 pt-1 leading-2 transition duration-150 ease-in-out ${
                        path === location?.pathname
                          ? "text-primary font-bold"
                          : "font-[200] text-primary"
                      }`}
                    >
                      {title}
                    </Link>
                  );
                })}
                {auth?.logedInUser ? (
                  <Link
                    to="/web/dashboard"
                    className="text-white mx-3 mt-2 rounded relative flex h-11 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full bg-primary hover:before:scale-105 active:duration-75 active:before:scale-95 w-3/4"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="w-[90%] mt-2 grid gap-2 grid-cols-2">
                    <Link
                      to="/crm/login"
                      className="text-primary border border-primary font-[200] rounded-xl relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full hover:before:scale-105 active:duration-75 active:before:scale-95"
                    >
                      Login
                    </Link>
                    <Link
                      to="/web/register"
                      className="text-white bg-primary  justify-center items-center font-[200] rounded-xl relative flex h-11 w-full px-10 before:absolute before:inset-0 before:rounded-full hover:before:scale-105 active:duration-75 active:before:scale-95"
                    >
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
