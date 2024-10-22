import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDown, X } from "react-feather";
import ReactPaginate from "react-paginate";

const AssignTerritory = () => {
  const [accountSelect, setAccountSelect] = useState("Search Account by");
  const [searchTerritories, setSearchTerritories] =
    useState("Search Territories");
  const data = {
    accountName: "King(Sample)",
    phone: "555-555-5555",
    accountType: "Vendor",
    annualRevenue: "$ 850,000.00",
    territories: "",
  };

  return (
    <div>
      <div>
        <h2 className="text-primary text-base font-semibold">
          Assign Territories to Accounts
        </h2>
        <p className="text-[#929296] mt-2 text-[16px] font-semibold">
          {" "}
          Assign or reassign the territories to the Accounts using the Run Rule
          Option. Search Your Accounts as needed and run rules for them.
        </p>
      </div>
      <div className="mt-4">
        <div>
          <Menu as="div" className="relative w-[50%] inline-block text-left">
            <div>
              <Menu.Button className="inline-flex items-center gap-3 w-[100%] justify-between rounded-lg border-[1.5px] border-primary px-4 py-3 text-sm font-medium bg-white text-primary hover:bg-opacity-90">
                {accountSelect}
                <ChevronDown size={16} />
              </Menu.Button>
            </div>
            <Menu.Items
              style={{ zIndex: 1000 }}
              className="absolute left-0 w-[100%] mt-2 origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {["Territory", "Custom View", "My own Criteria"].map(
                (item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={(e) => setAccountSelect(item)}
                        className={`${active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center px-5 py-[10px] text-sm`}
                      >
                        {item}
                      </button>
                    )}
                  </Menu.Item>
                )
              )}
            </Menu.Items>
          </Menu>
        </div>
        <div className="my-4">
          <div className="flex items-center">
            <Menu as="div" className="relative w-[40%] inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center gap-3 w-[100%] justify-between rounded-lg border-[1.5px] border-primary px-4 py-3 text-sm font-medium bg-white text-primary hover:bg-opacity-90">
                  {searchTerritories}
                  <ChevronDown size={16} />
                </Menu.Button>
              </div>
              <Menu.Items
                style={{ zIndex: 1000 }}
                className="absolute left-0 w-[100%] mt-2 origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {[
                  "Without Territories",
                  "Multiple Territories",
                  "All Territories",
                ].map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={(e) => setSearchTerritories(item)}
                        className={`${active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center px-5 py-[10px] text-sm`}
                      >
                        {item}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
            <div className="ml-2">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="" />
                <span className="ml-3 text-sm font-medium text-gray-900 ">
                  Include Sub-territories
                </span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <button className="flex font-bold text-[#008EFF] bg-[#E2F2FF] px-4 py-2 rounded-2xl">
            Without Territories{" "}
            <span className="ml-2">
              <X />
            </span>
          </button>
        </div>
        <div className=" my-4">
          <button className="font-bold text-[#FFFDEE] bg-[#191242] px-12 py-3 rounded-lg">
            Search
          </button>
        </div>

        <div>
          <div>
            {200 === 200 ? (
              <div className="w-full border-[1.5px] border-[#E6E6EB] rounded-2xl">
                <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
                  <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium ">
                        Account Name
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Account Type
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Annual Revenue
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Territories
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white cursor-pointer border-b border-[1.5px]-[#E6E6EB]"
                      >
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {data?.accountName}
                        </td>
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {data?.phone}
                        </td>
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {data?.accountType}
                        </td>

                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {data?.annualRevenue}
                        </td>
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {data?.territories}
                        </td>

                        {/* <td>Delete</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : 400 === 400 ? (
              <p className="text-center">No data found</p>
            ) : 500 === 500 ? (
              <p className="text-center">Internal server error</p>
            ) : (
              ""
            )}
          </div>
          {/* {pageCount && pageCount > 1 ? ( */}
          <div className="flex justify-between items-center">
            <div className=" whitespace-nowrap text-[#18181B] font-semibold">
              Total Record 50
            </div>
            <div className="ml-6 flex justify-end  gap-x-10 items-center">
              <select
                // onChange={(e) => setLimit(e.target.value)}
                // value={limit}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="10">10 Record per page</option>
                <option value="20">20 Record per page</option>
                <option value="50">50 Record per page</option>
                <option value="100">100 Record per page</option>
              </select>

              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={5 || 1}
                activeClassName="active"
                forcePage={1}
                //   onPageChange={handlePagination}
                containerClassName={
                  "pagination react-paginate text-sm gap-2 flex justify-end my-2"
                }
              />
            </div>
          </div>
          {/* ) : (
            ""
          )} */}
          <div className="mt-3">
            <p className="text-center text-[#929296] text-[14px] font-medium">
              Territory rules will run for all the matching Accounts. If the
              Deal rules are configured, then those rules will also run for the
              related Deal.
            </p>
            <div className="my-4 text-center">
              <button className="font-medium text-[#FFFDEE] bg-[#191242] px-8 py-2 rounded-lg">
                Run Rules
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTerritory;
