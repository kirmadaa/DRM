import React, { useEffect } from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { GET_ALL_AUDIT_LOG } from "../../../Redux/actions/auditLog";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import * as XLSX from "xlsx";

const AuditLog = () => {
  // state
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState({});
  const [error, setError] = useState(200);
  const [exportData, setExportData] = useState([{ data: "" }]);

  // hoook
  const dispatch = useDispatch();

  // api call function
  const fetchAuditLog = () => {
    dispatch(GET_ALL_AUDIT_LOG(`get-audit-log`, currentPage, limit)).then(
      (res) => {
        if (res?.status === 200) {
          setPageCount(Math.ceil(res?.data?.data.pagination?.total / limit));
          setData(res?.data?.data);
          setExportData(res?.data?.data?.data);
          setError(200);
        } else {
          setPageCount(0);
          setData({});
          setExportData([{ data: "" }]);

          setError(res?.status || 500);
        }
      }
    );
  };

  // pagination function
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchAuditLog();
  }, [currentPage, limit]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, 'Export' + ".xlsx");
  };


  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <h2 className="font-semibold">Add Activities</h2>
        <p>
          The Add Activities provides you with a chronological sequence of actions
          performed by the users in CRM.
        </p>
        <div className="text-end my-2">
          <button onClick={exportToExcel} className="text-[#338cf0] underline">
            Export Add Activities
          </button>
        </div>
        <div className="px-4">
          <div>
            {error === 200 ? (
              <div className="w-full border-[1.5px] border-[#E6E6EB] rounded-2xl">
                <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
                  <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium ">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Client Ip
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Collection Name
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left font-medium ">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(data.data || []).map((item, index) => {
                      return (
                        <tr className="bg-white cursor-pointer border-b border-[1.5px]-[#E6E6EB]">
                          <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                            {item?.userData.firstName || ""}{" "}
                            {item?.userData.lastName || ""}
                          </td>
                          <td className="px-5 py-4 font-medium text-sm text-primary  text-left">
                            {item?.clientIp || ""}
                          </td>
                          <td className="px-5 py-4 font-medium text-sm text-primary break-all  text-left">
                            {item?.collectionName || ""}
                          </td>
                          <td className="px-5 py-4 font-medium text-sm text-primary  text-left">
                            {item?.method || ""}
                          </td>
                          <td className="px-5 py-4 font-medium text-sm text-primary text-left">
                            {item?.action || ""}
                          </td>
                          <td className="px-5 py-4 font-medium text-sm text-primary text-left">
                            {moment(item?.createdTime).format(
                              "dddd, MMM DD, YYYY"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : error === 404 ? (
              <p className="text-center">No data found</p>
            ) : error === 500 ? (
              <p className="text-center">Internal server error</p>
            ) : (
              ""
            )}
          </div>
          {pageCount && pageCount > 1 ? (
            <div className="flex justify-start items-center mt-4">
              <div className=" whitespace-nowrap">
                Total Record {data?.pagination?.total}
              </div>
              <div className="ml-6 flex justify-end  gap-x-10 items-center">
                <select
                  onChange={(e) => setLimit(e.target.value)}
                  value={limit}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="10">10 Record per page</option>
                  <option value="20">20 Record per page</option>
                  <option value="30">30 Recode per page</option>
                  <option value="50">50 Recode per page</option>
                  <option value="100">100 Recode per page</option>
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
    </div>
  );
};

export default AuditLog;
