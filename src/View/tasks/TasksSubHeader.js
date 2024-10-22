import React, { Fragment, useEffect, useState } from "react";
import {
  CanvasIcon,
  DropdownArrow,
  DropdownFilter,
  DropdownMenuIcon,
  FilterIcon,
  KanbanIcon,
} from "../../assets/svgIcons";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import useAccessibleRole from "../../hooks/useAccessibleRole";
import SendEmailAndTask from "../../Components/sendEmailCreateTask";
import { GET_MACRO, RUN_MACRO } from "../../Redux/actions/comman";


import { Link, NavLink } from "react-router-dom";

function TasksSubHeader({ form, moduleName, setView }) {
  const dispatch = useDispatch();
  const usercheck = useSelector((state) => state.user);
  const countCheck = usercheck?.Checbox?.selectRow?.selectedCount;
  const sideBar = useSelector((state) => state.sideBarReducer.sideBar);

  const selectedItem = usercheck?.Checbox?.selectRow;
  const reset_data = useSelector((state) => state.user.reset_data);

  const {
    edit,
    write,
    delete: deleteValue,
    autoResponders,
    excelSheet,
  } = useAccessibleRole("tasks");
  const [macroModal, setMacroModal] = useState(false);
  const [macroId, setMacroId] = useState("");
  const { checkedListedData, macros } = useSelector((state) => state.commanvar);

  const checkedDataForPerformMacro = checkedListedData?.selectedRows?.map(
    (value) => {
      return value._id;
    }
  );

  useEffect(() => {
    dispatch(GET_MACRO(moduleName));
  }, [moduleName]);

  const macroClickHandler = (macro) => {
    setMacroId(macro?._id);
    setMacroModal(true);
  };

  const runMacro = () => {
    const data = { connections: checkedDataForPerformMacro };
    dispatch(RUN_MACRO(macroId, data));
    setMacroModal(false);
  };

  const setModuleView = (name, view) => {
    setView(view);
    localStorage.setItem(name, view);
  };

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
                        {macros.map((macro) => {
                          return (
                            macro.title !== "" ? <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                              {({ active }) => (
                                <Link
                                  className={`${active && "bg-white"}`}
                                  onClick={() => macroClickHandler(macro)}
                                >
                                  {macro.title}
                                </Link>
                              )}
                            </Menu.Item> :
                              null
                          );
                        })}
                        <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                          {({ active }) => (
                            <Link
                              className={`${active && "bg-white"}`}
                              to={"/crm/macro?module=Tasks"}
                            >
                              Create Macro
                            </Link>
                          )}
                        </Menu.Item>
                        {macros.length && (
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/macro/manage-macro?module=Tasks"
                              >
                                Manage Macro
                              </Link>
                            )}
                          </Menu.Item>
                        )}
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

        </div>
        {!countCheck >= 1 && (
          <div className="flex gap-4 ">

            {form?.length > 0 && (
              <>
                {write && (
                  <div className="block relative">
                    <Menu>
                      <Menu.Button className="border flex bg-primary text-white items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl">
                        Create Task
                        <DropdownArrow />
                      </Menu.Button>
                      <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                        <Menu.Items>
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/create-tasks"
                              >
                                Create Task
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/import?module=Tasks"
                              >
                                Import Tasks
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
                                to="/crm/tasks/mass-module?type=delete"
                              >
                                Mass Delete
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
                                  to="/crm/tasks/mass-module?type=update"
                                >
                                  Mass Update
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                              {({ active }) => (
                                <Link
                                  className={`${active && "bg-white"}`}
                                  to="/crm/tasks/mass-module?type=transfer"
                                >
                                  Mass Transfer
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
              </>
            )}
          </div>
        )}
      </div>
      <Transition appear show={macroModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setMacroModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB] text-center"
                  >
                    Run Macro
                  </Dialog.Title>
                  <div className="container min-h-[140px]">
                    <div className="grid lg:grid-cols-1 text-center">
                      <h3 className="font-medium text-semibold">
                        Are you sure you want to run this macro?
                      </h3>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                      onClick={() => setMacroModal(false)}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => runMacro()}
                      className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                    >
                      Run
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default TasksSubHeader;
