import React from "react";
import { DropdownArrow, LeftBackArrowWhite, RightBackArrowWhite } from "../../assets/svgIcons";
import { useState } from "react";
import { Plus } from "feather-icons-react/build/IconComponents";
import { useLocation, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";

function RelatedList(props) {
  const [sideBarShow, setSidebarShow] = useState(true);
  const { id, moduleName } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate()

  // console.log("moduleName---------<----", moduleName, props);
  return (
    <>
      {sideBarShow ? (
        <div
          className="fixed left-0 top-48 h-12 w-12 rounded-tr-2xl rounded-br-2xl bg-primary flex items-center justify-center cursor-pointer z-10"
          onClick={() => {
            setSidebarShow(false);
          }}
        >
          <LeftBackArrowWhite />
        </div>
      ) : (
        <div
          className="fixed left-0 top-48 h-12 w-12 rounded-tr-2xl rounded-br-2xl bg-primary flex items-center justify-center cursor-pointer z-10"
          onClick={() => {
            setSidebarShow(true);
          }}
        >
          <RightBackArrowWhite />
        </div>
      )}
      {sideBarShow && (
        <div className="rounded-2xl bg-white h-full p-6 w-[270px] min-w-[270px] mt-3 sticky top-[200px] ">
          <h4 className="pt-[10px] pl-10 pb-2 text-base font-[500] text-gray-950">
            <a href="#details"> Details</a>
          </h4>
          <ul>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a href="#task" className="flex justify-between items-center  w-full">
                <span>
                  Tasks {moduleName}</span>
              </a>
              <div

              >
                <Plus size={16} onClick={() => navigate("/crm/create-tasks", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#calls"> <span>
                Calls</span>
              </a>
              {/* <Link
                to={`/crm/create-call?connectionId=${id}?prePathname=${pathname}`}
              >
                <Plus size={16} />
              </Link> */}
              <Menu>
                <Menu.Button
                //className="border flex bg-primary text-white items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl"
                >
                  <Plus size={16} />
                </Menu.Button>

                <div className="absolute z-10 ml-40 mt-5 w-max origin-top-left divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                  <Menu.Items>
                    <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                      {({ active }) => (
                        <div
                          // className={`${active && "bg-white"}`}
                          //to="/crm/create-call?callType=log"
                          onClick={() => navigate("/crm/create-call?callType=log", {
                            state: {
                              getConnectionId: id,
                              prePathname: pathname,
                              moduleName: props?.formType
                            }
                          })}
                        >
                          Log Call
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                      {({ active }) => (
                        <div
                          // className={`${active && "bg-white"}`}
                          //  to="/crm/create-call?callType=schedule"
                          onClick={() => navigate("/crm/create-call?callType=schedule", {
                            state: {
                              getConnectionId: id,
                              prePathname: pathname,
                              moduleName: props?.formType
                            }
                          })}
                        >
                          Schedule Call
                        </div>
                      )}
                    </Menu.Item>

                  </Menu.Items>
                </div>
              </Menu>
              {/* <div

              >
                <Plus size={16} onClick={() => navigate("/crm/create-call?callType=log", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div> */}
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#meetings">
                <span>Meetings</span>
              </a>
              {/* <Link
                to={`/crm/create-meeting?connectionId=${id}?prePathname=${pathname}`}
              >
                <Plus size={16} />
              </Link> */}
              <div

              >
                <Plus size={16} onClick={() => navigate("/crm/create-meeting", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#inventory">
                Inventory
              </a>
              {/* <Link
                to={`/crm/create-inventory?connectionId=${id}?prePathname=${pathname}`}
              >
                <Plus size={16} />
              </Link> */}
              <div

              >
                <Plus size={16}
                  // onClick={() => navigate("/crm/create-inventory", {
                  //   state: {
                  //     getConnectionId: id,
                  //     prePathname: pathname,
                  //     moduleName: props?.formType
                  //   }
                  // })}
                  onClick={() => {

                    navigate("/crm/inventory/connectionId/" + id, {
                      state: {
                        getConnectionId: id,
                        prePathname: pathname,
                        moduleName: props?.formType ? props?.formType : moduleName,
                        type: props?.formType ? props?.formType : moduleName,
                        parentModule: props?.formType ? props?.formType : moduleName
                      }
                    })

                  }
                  }
                />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#notes">
                Notes
              </a>
              {/* <Link
                to={`/crm/create-note?connectionId=${id}?prePathname=${pathname}`}
              >
                <Plus size={16} />
              </Link> */}

              <div>
                <Plus size={16} onClick={() => navigate("/crm/create-note", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#sale-order">
                Sale Order
              </a>
              {/* <Link to={`/crm/create-saleOrder?connectionId=${id}?prePathname=${pathname}`}>
                <Plus size={16} />
              </Link> */}
              <div

              >
                <Plus size={16} onClick={() => navigate("/crm/create-saleOrder", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#purchase-order">
                Purchase Order
              </a>
              {/* <Link to={`/crm/create-purchaseorder?connectionId=${id}?prePathname=${pathname}`}>
                <Plus size={16} />
              </Link> */}
              <div

              >
                <Plus size={16} onClick={() => navigate("/crm/create-purchaseorder", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#invoice">
                Invoice
              </a>
              {/* <Link to={`/crm/create-invoice?connectionId=${id}?prePathname=${pathname}`}>
                <Plus size={16} />
              </Link> */}
              <div

              >
                <Plus size={16} onClick={() => navigate("/crm/create-invoice", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#siteVisit">
                Site Visit
              </a>
              {/* <Link to={`/crm/create-sitevisit?connectionId=${id}?prePathname=${pathname}`}>
                <Plus size={16} />
              </Link> */}
              <div

              >
                <Plus size={16} onClick={() => navigate("/crm/create-sitevisit", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
            <li className="pt-[10px] flex justify-start pl-10 pb-2 text-base font-[500] cursor-pointer hover:text-primary text-[#929296]">
              <a className="flex justify-between items-center  w-full" href="#quotes">
                <span>Quotes</span>
              </a>
              {/* <Link to={`/crm/create-quotes?connectionId=${id}?prePathname=${pathname}`}>
                <Plus size={16} />
              </Link> */}
              <div>
                <Plus size={16} onClick={() => navigate("/crm/create-quotes", {
                  state: {
                    getConnectionId: id,
                    prePathname: pathname,
                    moduleName: props?.formType
                  }
                })} />
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default RelatedList;
