import React, { useState } from "react";
import {
  LeftBackArrow,
  SmallLeftArrow,
  SmallRightArrow,
} from "../../assets/svgIcons";
import userProfile from "./../../assets/images/header/user.png";
import { useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import Menus from "../../assets/images/dashboard/menus.svg";
import useAccessibleRole from "../../hooks/useAccessibleRole";
import { Link, useNavigate } from "react-router-dom";
import PermissionButton from "./permissionButton";
import Addtags from "./addTags";

function DetailsPageHeader({ sectionData }) {
  const queryParams = new URLSearchParams(window.location.search);
  const ownerName = queryParams.get("ownerName");
  const fullName = queryParams.get("fullName");


  const [editable, setEditable] = useState(false);
  const detail = useSelector((state) => state.user.detail);
  const navigate = useNavigate();

  const {
    edit,
    write,
    delete: deleteValue,
    // read,
  } = useAccessibleRole(sectionData?.formTitle);

  const handleButtons = (id) => {
    let sbtn = document.getElementById(id);
    if (sbtn) {
      sbtn.click();
    }
  };

  const prePathname = () => {
    if ("Calls" === sectionData?.formTitle) {
      return "call";
    }
    if ("Note" === sectionData?.formTitle) {
      return "notes";
    } else {
      return sectionData?.formTitle?.toLowerCase();
    }
  };

  return (
    <div className="bg-white border-b py-[10px] z-[9] px-4 sm:px-6 lg:px-8 flex justify-between gap-3 items-center fixed w-full top-[86px]">
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={(event) => {
            event.preventDefault();
            if (edit) {
              // navigate(-2)
              navigate(`/crm/${prePathname()}`)
            } else {
              // navigate(-2)

              navigate(`/crm/${prePathname()}`)
            }

          }
          }>
            <LeftBackArrow />
          </div>
          <div className="h-[70px] w-[70px] rounded-3xl overflow-hidden">
            <img
              src={userProfile}
              alt="User Profile"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex gap-1 mb-1">
            <h3 className="font-semibold text-xl capitalize"> {fullName ? fullName : ownerName}</h3>
            {/* <h3 className="font-semibold text-xl">Owner - {ownerName}</h3> */}

          </div>
          <Addtags />

        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex justify-start items-center space-x-2">
          <Link
            className="text-gray-700 font-[500]"
            to={`/crm/${prePathname()}`}
          >
            {sectionData?.formTitle} /
          </Link>
          <span className="text-primary font-[500]">Details</span>
        </div>
        <PermissionButton
          hooksValue={{
            write,
            editable,
            edit,
            handleButtons,
            setEditable,
            sectionData,
            detail,
          }}
        />
        <div>
          {!editable && sectionData?.formTitle !== "Note" && (
            <Menu as="div" className="relative">
              <div>
                <Menu.Button>
                  <img
                    src={Menus}
                    alt="menu  icon"
                    className="rounded-md cursor-pointer mt-2"
                  />
                </Menu.Button>
              </div>
              <Menu.Items
                style={{ zIndex: 1000 }}
                className="absolute right-0  mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {edit && write ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center px-5 py-[10px] text-sm`}
                        onClick={() => {
                          handleButtons("clone-edit");
                        }}
                        type="button"
                      >
                        <span className="ml-2">Clone</span>
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  ""
                )}
                {deleteValue && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center px-5 py-[10px] text-sm`}
                        type="button"
                        onClick={() => {
                          handleButtons("delete-button-id");
                        }}
                        disabled={!deleteValue}
                      >
                        <span className="ml-2">Delete</span>
                      </button>
                    )}
                  </Menu.Item>
                )}

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-primary text-white" : "text-gray-900"
                        } group flex w-full items-center px-5 py-[10px] text-sm`}
                      onClick={() => window.print()}
                      type="button"
                    >
                      <span className="ml-2">Print Preview</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
        </div>
        <div className="cursor-pointer flex items-center">
          <SmallRightArrow />
          <SmallLeftArrow />
        </div>
      </div>
    </div>
  );
}

export default DetailsPageHeader;
