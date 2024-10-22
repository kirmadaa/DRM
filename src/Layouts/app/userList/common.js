import React, { Fragment } from "react";
import { Menu, Tab } from "@headlessui/react";
import { Plus, Search } from "react-feather";
import { Dropdown, SearchIcon, Searchicon } from "../../../assets/svgIcons";
export const TabComponent = () => {
  return (
    <>
      <div className="border-b border-[#E6E6EB]">
        <Tab.List className="flex my-4 mx-16 space-x-1 w-[400px] rounded-[32px] bg-white border-[1.5px] border-[#E6E6EB] p-1">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "bg-[#191242] rounded-[32px] text-white w-[143px] py-2 text-sm font-normal leading-5 "
                    : "text-[#6A6A6D] w-[143px] hover:bg-white/[0.12] text-sm font-normal"
                }
              >
                Users
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "bg-[#191242] rounded-[32px] text-white w-[143px] py-2 text-sm font-normal leading-5 "
                    : "text-[#6A6A6D] hover:bg-white/[0.12] w-[143px] text-sm font-normal"
                }
              >
                Activate Users
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "bg-[#191242] rounded-[32px] text-white w-[143px] py-2 text-sm font-normal leading-5 "
                    : "text-[#6A6A6D] text-sm font-normal hover:bg-white/[0.12] w-[143px]"
                }
              >
                Groups
              </button>
            )}
          </Tab>
        </Tab.List>
      </div>
    </>
  );
};

export const ActiveDeactive = ({
  handleFilterChange,
  handleActiveDeactive,
  handleShow,
  allActDeactive,
  userOpendValue,
  activeDropdown,
}) => {
  return (
    <>
      <div className="form-group mb-[20px] row d-flex addrole flex items-center justify-between">
        <div className="col-6">
          <div className="username">
            <Menu as="div" className="relative inline-block z-[1]">
              <div>
                <Menu.Button className="flex gap-3 border rounded-2xl items-center w-full justify-center px-4 py-3 text-sm font-medium text-[#1b1b1b] hover:bg-opacity-90">
                  {activeDropdown ? "Active Users" : "Inactive Users"}
                  <Dropdown />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Fragment>
                  <Menu.Item>
                    <button
                      className="border-b border-[#E6E6EB] pl-[52px] text-[#6A6A6D] group font-medium flex w-full items-center pr-8 py-[10px] text-sm"
                      onClick={() => handleFilterChange(true)}
                    >
                      Active Users
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className="border-b border-[#E6E6EB] pl-[52px] text-[#6A6A6D] group font-medium flex w-full items-center pr-8 py-[10px] text-sm"
                      onClick={() => handleFilterChange(false)}
                    >
                      Inactive Users
                    </button>
                  </Menu.Item>
                </Fragment>
              </Menu.Items>
            </Menu>
          </div>
        </div>
        {userOpendValue?.length > 0 ? (
          <button
            className="bg-[#FFEAEF] py-1 mb-[14px] px-2 rounded-[22px] text-[#FE3F34] text-sm font-medium"
            onClick={() => {
              handleActiveDeactive();
            }}
          >
            {activeDropdown ? "Inactive Users" : "Active users"}
          </button>
        ) : (
          <div className="col-6 d-flex justify-content-end">
            <div className="username">
              <button
                type="button"
                className="btn adduser hover:bg-[#191242] focus:shadow-none font-medium gap-3 bg-[#191242] flex items-center text-white py-[14px] px-4 rounded-2xl btn-primary"
                onClick={handleShow}
              >
                <Plus />
                New user
              </button>{" "}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const AddGroup = ({ handleShow, setStr, str }) => {
  return (
    <div className="form-group mb-[20px] row d-flex addrole flex items-center justify-between">
      <div className="col-6">
        <div className="relative">
          <div className="absolute left-3 top-4">
            <Searchicon className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={str}
            onChange={(e) => setStr(e.target.value)}
            className="border pl-11 rounded-2xl px-4 w-full py-3.5 focus:outline-none"
            placeholder="Enter Name"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="username">
          <div className="col-6 d-flex justify-content-end">
            <div className="username">
              <button
                type="button"
                className="btn adduser hover:bg-[#191242] focus:shadow-none font-medium gap-3 bg-[#191242] flex items-center text-white py-[14px] px-4 rounded-2xl btn-primary"
                onClick={handleShow}
              >
                <Plus />
                Create Group
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Searchbar = ({
  onChangeAllSelect,
  mainCheckboxSelected,
  onChangeSearch,
}) => {
  return (
    <>
      <div className="relative mb-8 flex items-center">
        <input
          type="checkbox"
          onChange={onChangeAllSelect}
          checked={mainCheckboxSelected}
          name="mainselect"
          className="me-6"
        />
        <input
          className="border w-full border-[#E6E6EB] rounded-2xl focus:outline-0 py-[15px] pe-4 pl-[52px]"
          placeholder="Enter Name "
          onChange={(e) => onChangeSearch(e)}
        />

        <div className="absolute top-[15px] left-[53px]">
          <SearchIcon className="h-6 w-6" />
        </div>
      </div>
    </>
  );
};
