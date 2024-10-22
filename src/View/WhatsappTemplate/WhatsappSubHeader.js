import React from "react";
import {
  CanvasIcon,
  DropdownArrow,
  DropdownFilter,
  DropdownMenuIcon,
  DropdownRefresh,
  FilterIcon,
  KanbanIcon,
} from "../../assets/svgIcons";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAccessibleRole from "../../hooks/useAccessibleRole";

function WhatsappSubHeader({ form }) {
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
  } = useAccessibleRole("whatsapp");

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
                              to="/crm/macro"
                            >
                              Create Macro
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <Link
                              className={`${active && "bg-white"}`}
                              to="/crm/import?module=whatsapp"
                            >
                              Import Whatsapp
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </Menu>
                </div>
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
                              to="/crm/macro"
                            >
                              Tags
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </Menu>
                </div>
                <div className="block">
                  <Menu>
                    <Menu.Button className="border flex items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl whitespace-nowrap">
                      Send Bulk Whatsapp
                      <DropdownArrow />
                    </Menu.Button>
                    <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                      <Menu.Items>
                        <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <Link
                              className={`${active && "bg-white"}`}
                              to="/crm/macro"
                            >
                              Create Macro
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </Menu>
                </div>
                <div className="block">
                  <Menu>
                    <Menu.Button className="border flex items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl whitespace-nowrap">
                      Action
                      <DropdownArrow />
                    </Menu.Button>
                    <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                      <Menu.Items>
                        <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <Link
                              className={`${active && "bg-white"}`}
                              to="/crm/macro"
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
            <div className="block relative">
              <Menu>
                <Menu.Button className="border flex items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl">
                  <DropdownMenuIcon />
                  <DropdownArrow />
                </Menu.Button>
                <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-xl overflow-hidden bg-white shadow-lg focus:outline-none">
                  <Menu.Items>
                    <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white group">
                      {({ active }) => (
                        <Link
                          className={`flex items-center gap-2 ${active && "bg-white"
                            }`}
                          to="/account-settings"
                        >
                          <DropdownFilter />
                          List View
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                      {({ active }) => (
                        <Link
                          className={`flex items-center gap-2 ${active && "bg-white"
                            }`}
                          to="/account-settings"
                        >
                          <KanbanIcon />
                          Kanban View
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                      {({ active }) => (
                        <Link
                          className={`flex items-center gap-2 ${active && "bg-white"
                            }`}
                          to="/account-settings"
                        >
                          <CanvasIcon />
                          Canvas View
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </div>
              </Menu>
            </div>
            {form?.length > 0 && (
              <>
                {write && (
                  <div className="block relative">
                    <Menu>
                      <Menu.Button className="border flex bg-primary text-white items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl">
                        Create Whatsapp
                        <DropdownArrow />
                      </Menu.Button>
                      <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                        <Menu.Items>
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/create-whatsapp"
                              >
                                Create Whatsapp
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
                                to="/crm/whatsapp/mass-module?type=delete"
                              >
                                Mass Delete
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {edit && (
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/whatsapp/mass-module?type=update"
                              >
                                Mass Update
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {edit && (
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/whatsapp/mass-module?type=transfer"
                              >
                                Mass Transfer
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </div>
                  </Menu>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WhatsappSubHeader;