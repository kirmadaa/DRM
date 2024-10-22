import React, { useState } from "react";
import { useEffect } from "react";
import {
  GET_ALL_ACTIVE_USER,
  getAllActiveDeactive,
} from "../../../../Redux/actions/userList";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { Menu } from "@headlessui/react";
import { ChevronDown } from "react-feather";

const ActiveUserList = () => {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState({});
  const [error, setError] = useState(200);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const fetchActiveUser = () => {
    dispatch(
      GET_ALL_ACTIVE_USER(`get-user?active=true&userlist=true`, currentPage, limit)
    ).then((res) => {
      if (res?.status === 200) {
        setPageCount(Math.ceil(res?.data.data.pagination?.total / limit));
        setData(res?.data?.data);
        setError(200);
      } else {
        setPageCount(0);
        setData({});
        setError(res?.status || 500);
      }
    });
  };
  const handleActiveInactive = (data) => {
    dispatch(getAllActiveDeactive(data)).then(() => {
      fetchActiveUser();
    });
  };
  useEffect(() => {
    fetchActiveUser();
  }, [currentPage, limit]);
  return (
    <div className="p-4">
      <div className="mb-4 px-10">
        <div className="text-primary text-base font-semibold">
          Activate Users{" "}
        </div>
        <p className="text-[#929296]">
          This page allows you to activate and deactivate users. Note: Your
          organization cannot have more active users than user licenses.
        </p>
      </div>
      <div className="px-4">
        <div>
          {error === 200 ? (
            <div className="w-full border-[1.5px] border-[#E6E6EB] rounded-2xl">
              <table className="table table-dashboard mg-b-0 w-full rounded-2xl ">
                <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium ">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left font-medium ">
                      Email Address
                    </th>
                    <th className="px-6 py-3 text-left font-medium ">Role</th>
                    <th className="px-6 py-3 text-left font-medium ">
                      Profile
                    </th>
                    <th className="px-6 py-3 text-left font-medium ">
                      User Status
                    </th>
                  </tr>
                </thead>
                {/* <th>
          Delete
        </th> */}
                <tbody>
                  {(data.usersData || []).map((item, index) => {
                    return (
                      <tr className="bg-white cursor-pointer border-b border-[1.5px]-[#E6E6EB]">
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {item?.firstName || ""} {item?.lastName || ""}
                        </td>
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {item?.email || ""}
                        </td>
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {item?.roleTitle || ""}
                        </td>
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          {item?.profileTitle}
                        </td>
                        <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                          <div>
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex items-center gap-3 w-full justify-center rounded-lg border-[1.5px] px-4 py-3 text-sm font-medium bg-white text-grey hover:bg-opacity-90">
                                  {item?.is_active ? "Active" : "Inactive"}
                                  <ChevronDown size={16} />
                                </Menu.Button>
                              </div>
                              <Menu.Items
                                style={{ zIndex: 1000 }}
                                className="absolute left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {["Active", "Inactive"].map((items, i) => (
                                  <Menu.Item key={i}>
                                    {({ active }) => (
                                      <button
                                        onClick={() =>
                                          handleActiveInactive({
                                            id: [item?._id],
                                            is_active:
                                              items === "Active" ? true : false,
                                          })
                                        }
                                        className={`${active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                          } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      >
                                        {items}
                                      </button>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : error === 400 ? (
            <p className="text-center">No data found</p>
          ) : error === 500 ? (
            <p className="text-center">Internal server error</p>
          ) : (
            ""
          )}
        </div>
        {pageCount && pageCount > 1 ? (
          <div className="flex justify-start items-center">
            <div className=" whitespace-nowrap">
              Total Record {data?.pagination?.total}
            </div>
            <div className="ml-6 flex justify-end  gap-x-10 items-center">
              <select
                onChange={(e) => setLimit(e.target.value)}
                value={limit}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="10">10 Recode per page</option>
                <option value="20">20 Recode per page</option>
                <option value="30">30 Recode per page</option>
                <option value="50">50 Recode per page</option>
              </select>

              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount || 1}
                activeClassName="active"
                forcePage={currentPage - 1}
                onPageChange={handlePagination}
                containerClassName={
                  "pagination react-paginate text-sm gap-2 flex justify-end my-2"
                }
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ActiveUserList;
