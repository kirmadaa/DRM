import React from "react";
import {
  DropdownArrow,
  DropdownRefresh,
  FilterIcon,
  KanbanIcon,
} from "../../../assets/svgIcons";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAccessibleRole from "../../../hooks/useAccessibleRole";

function NotesSubHeader({ form, moduleName }) {
  const dispatch = useDispatch();
  const usercheck = useSelector((state) => state.user);
  const countCheck = usercheck?.Checbox?.selectRow?.selectedCount;
  const reset_data = useSelector((state) => state.user.reset_data);
  const sideBar = useSelector((state) => state.sideBarReducer.sideBar);

  const {
    // edit, read, 
    write, delete: deleteValue } = useAccessibleRole("Note");

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
                              to={"/crm/macro?module=Notes"}
                            >
                              Create Macro
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </Menu>
                </div>
                {/* <SendEmailAndTask itemId={selectedItem?.selectedRows[0]?._id} moduleName={moduleName} /> */}
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

            {form?.length > 0 && (
              <>
                {write && (
                  <div className="block relative">
                    <Menu>
                      <Menu.Button className="border flex bg-primary text-white items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl">
                        Create Note
                        <DropdownArrow />
                      </Menu.Button>
                      <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                        <Menu.Items>
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/create-note"
                              >
                                Create Note
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/import?module=Note"
                              >
                                Import Note
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

export default NotesSubHeader;
