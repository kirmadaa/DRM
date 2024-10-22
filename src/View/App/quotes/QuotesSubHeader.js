import React from "react";
import {
  DropdownArrow,
  DropdownRefresh,
  FilterIcon,
} from "../../../assets/svgIcons";
import { Menu } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAccessibleRole from "../../../hooks/useAccessibleRole";

function QuotesSubHeader({ moduleName }) {
  const dispatch = useDispatch();
  const usercheck = useSelector((state) => state.user);
  const countCheck = usercheck?.Checbox?.selectRow?.selectedCount;
  const reset_data = useSelector((state) => state.user.reset_data);
  const sideBar = useSelector((state) => state.sideBarReducer.sideBar);

  const {
    edit,
    // read,
    write,
    delete: deleteValue,
    excelSheet
  } = useAccessibleRole("quotes");

  return (
    <div className="bg-white py-3 -mx-8 group px-2">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-4 ">
          <div
            className="p-2 rounded bg-[#FFF7BE]  cursor-pointer"
            onClick={() => dispatch({ type: "SIDEBAR_STATE", data: !sideBar })}
          >
            <FilterIcon />
          </div>
          {countCheck >= 1 ? (
            <>
              <div className="flex items-center gap-4">
                <div className="block">
                  <Menu>
                    <Menu.Button className="border flex items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl whitespace-nowrap">
                      Run Macro
                      <DropdownArrow />
                    </Menu.Button>
                    <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                      <Menu.Items>
                        <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <Link
                              className={`${active && "bg-white"}`}
                              to={"/crm/macro?module=Quotes"}
                            >
                              Create Macro
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </Menu>
                </div>
              </div>
            </>
          ) : (
            <>

            </>
          )}
          <div
            className="cursor-pointer hidden group-hover:block "
            onClick={() => dispatch({ type: "RESET_DATA", data: !reset_data })}
          >
            <DropdownRefresh />
          </div>
        </div>
        {!countCheck >= 1 && (
          <div className="flex gap-4 ">

            {write && (
              <div className="block relative">
                <Menu>
                  <Menu.Button className="border flex bg-primary text-white items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl">
                    Create Quotes
                    <DropdownArrow />
                  </Menu.Button>
                  <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                    <Menu.Items>
                      <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                        {({ active }) => (
                          <Link
                            className={`${active && "bg-white"}`}
                            to="/crm/create-quotes"
                          >
                            Create Quotes
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                        {({ active }) => (
                          <Link
                            className={`${active && "bg-white"}`}
                            to="/crm/imports?module=Quotes"
                          >
                            Import Quotes
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </div>
                </Menu>
              </div>
            )}
            <div className="block relative">
              <Menu>
                <Menu.Button className="border flex items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl">
                  Actions
                  <DropdownArrow />
                </Menu.Button>
                <div className="absolute z-10 right-0 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                  <Menu.Items>
                    {deleteValue && (
                      <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                        {({ active }) => (
                          <Link
                            className={`${active && "bg-white"}`}
                            to="/crm/quotes/mass-module?type=delete"
                          >
                            Bulk Delete
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    {edit && (
                      <>
                        <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <Link
                              className={`${active && "bg-white"}`}
                              to="/crm/quotes/mass-module?type=update"
                            >
                              Bulk Update
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <Link
                              className={`${active && "bg-white"}`}
                              to="/crm/quotes/mass-module?type=transfer"
                            >
                              Bulks Transfer
                            </Link>
                          )}
                        </Menu.Item>

                        {excelSheet && <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <NavLink
                              target="_blank"
                              className={`flex items-center gap-2 ${active && "bg-white"}`}
                              to={`/crm/sheetview?moduleName=${moduleName}`}
                            >
                              XL Sheet View
                            </NavLink>
                          )}
                        </Menu.Item>}

                      </>
                    )}
                  </Menu.Items>
                </div>
              </Menu>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuotesSubHeader;
