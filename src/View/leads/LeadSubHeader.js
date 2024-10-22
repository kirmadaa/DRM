import React, { useEffect } from "react";
import {
  CanvasIcon,
  DropdownArrow,
  DropdownFilter,
  DropdownMenuIcon,
  FilterIcon,
  KanbanIcon,
} from "../../assets/svgIcons";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FilterDropDown } from "../Common/filterDropDown";
import useAccessibleRole from "../../hooks/useAccessibleRole";
import { GET_MACRO, RUN_MACRO } from "../../Redux/actions/comman";
import { Fragment, useState } from "react";
import SendEmailAndTask from "../../Components/sendEmailCreateTask";
import RefreshCw from "feather-icons-react/build/IconComponents/RefreshCw";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function LeadSubHeader({ form, moduleName, setView }) {
  const dispatch = useDispatch();
  const usercheck = useSelector((state) => state.user);
  const selectedItem = usercheck?.Checbox?.selectRow;
  const countCheck = usercheck?.Checbox?.selectRow?.selectedCount;
  const reset_data = useSelector((state) => state.user.reset_data);
  const sideBar = useSelector((state) => state.sideBarReducer.sideBar);

  const {
    edit,
    write,
    delete: deleteValue,
    autoResponders,
    excelSheet,
  } = useAccessibleRole("leads");
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
    <div className="bg-white py-3  group w-full">
      <div className="flex justify-between items-center px-8">
        <div className="flex justify-start items-center space-x-3">
          <div className="flex items-center gap-4 ">
            <div
              className="p-2 rounded bg-[#FFF7BE]  cursor-pointer"
              onClick={() =>
                dispatch({ type: "SIDEBAR_STATE", data: !sideBar })
              }
            >
              <FilterIcon />
            </div>
            {countCheck >= 1 ? (
              <>
                <div className="w-full flex items-center gap-4">
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
                              macro.title && <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                                {({ active }) => (
                                  <Link
                                    className={`${active && "bg-white"}`}
                                    onClick={() => macroClickHandler(macro)}
                                  >
                                    {macro.title}
                                  </Link>
                                )}
                              </Menu.Item>
                            );
                          })}
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/macro?module=Leads"
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
                                  to="/crm/macro/manage-macro?module=Leads"
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
              <div className="block">
                <FilterDropDown module="Leads" />
              </div>
            )}
          </div>
          <button
            className="cursor-pointer  hidden group-hover:block "
            onClick={() => dispatch({ type: "RESET_DATA", data: !reset_data })}
          >
            <span className="flex rounded-md justify-center items-center w-10 h-10 bg-primary ">
              <RefreshCw color="white" />
            </span>
          </button>
          {selectedItem?.selectedRows?.length > 0 && (
            <SendEmailAndTask
              itemId={selectedItem?.selectedRows[0]?._id}
              moduleName={moduleName}
            />
          )}
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
                        <button
                          onClick={() =>
                            setModuleView("lead-module-view", "list")
                          }
                          className={`flex items-center gap-2 ${active && "bg-white"
                            }`}
                        >
                          <DropdownFilter />
                          List View
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                      {({ active }) => (
                        <button
                          onClick={() =>
                            setModuleView("lead-module-view", "Kanban")
                          }
                          className={`flex items-center gap-2 ${active && "bg-white"
                            }`}
                        >
                          <KanbanIcon />
                          Kanban View
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                      {({ active }) => (
                        <button
                          onClick={() =>
                            setModuleView("lead-module-view", "canvas")
                          }
                          className={`flex items-center gap-2 ${active && "bg-white"
                            }`}
                        // to="/crm/leads/lead-canvas-list"
                        >
                          <CanvasIcon />
                          Canvas View
                        </button>
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
                        Create Lead
                        <DropdownArrow />
                      </Menu.Button>
                      <div className="absolute z-10 mt-1 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                        <Menu.Items>
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/create-leads"
                              >
                                Create Lead
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/import?module=Leads"
                              >
                                Import Leads
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
                                to="/crm/leads/mass-module?type=delete"
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
                                  to="/crm/leads/mass-module?type=update"
                                >
                                  Mass Update
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                              {({ active }) => (
                                <Link
                                  className={`${active && "bg-white"}`}
                                  to="/crm/leads/mass-module?type=transfer"
                                >
                                  Mass Transfer
                                </Link>
                              )}
                            </Menu.Item>
                          </>
                        )}
                        {autoResponders && (
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <Link
                                className={`${active && "bg-white"}`}
                                to="/crm/modules/auto-responders?module=Leads"
                              >
                                Autoresponders
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {excelSheet && (
                          <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-bottom b-[#E4E4E7] hover:bg-primary hover:text-white">
                            {({ active }) => (
                              <NavLink
                                target="_blank"
                                className={`flex items-center gap-2 ${active && "bg-white"
                                  }`}
                                to={`/crm/sheetview?moduleName=${moduleName}`}
                              >
                                XL Sheet View
                              </NavLink>
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

export default LeadSubHeader;
