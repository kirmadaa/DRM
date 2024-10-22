import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GET_ALL_LOGIN_LOGS } from "../../../Redux/actions/comman";
import moment from "moment/moment";

const LoginLogs = () => {
  const [showRows, setShowRows] = useState(10);
  const common = useSelector((state) => state.commanvar);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = useSelector((state) => state?.commanvar?.pagination);

  const dispatch = useDispatch();

  const handleShowRows = (val) => {
    setShowRows(val);
    dispatch(GET_ALL_LOGIN_LOGS(currentPage + 1, val));
  };

  const handlePagination = (page) => {
    dispatch(GET_ALL_LOGIN_LOGS(page.selected + 1, showRows));
  };

  useEffect(() => {
    if (currentPage) {
      dispatch(GET_ALL_LOGIN_LOGS(currentPage, showRows));
    }
  }, [dispatch, showRows]);

  useEffect(() => {
    if (common?.loginLogs?.length > 0 && pagination) {
      setCurrentPage(pagination?.offset - 1);
    }
  }, [common, pagination]);

  const CustomPagination = () => {
    const count = Number(Math.ceil(pagination?.total / showRows));
    return (
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={count || 1}
        activeClassName="active"
        // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        containerClassName={
          "pagination react-paginate text-sm gap-2 flex justify-end my-2"
        }
      />
    );
  };

  return (
    <div
    // style={{ minHeight: "500px" }}
    // className="border rounded table-responsive mt-3"
    >
      <h1 className="text-primary text-base font-semibold">Login Logs</h1>
      <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl mt-4">
        <table className="table table-dashboard mg-b-0 w-full rounded-2xl table-auto">
          <thead className="text-sm text-gray-900 font-medium bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3   text-left font-medium ">
                Browser
              </th>
              <th scope="col" className="px-6   py-3 text-left font-medium">
                Login Ip
              </th>
              <th scope="col" className="px-6 py-3  text-left font-medium">
                Login Time
              </th>
            </tr>
          </thead>
          <tbody>
            {(common?.loginLogs || []).map((item, index) => {
              return (
                <tr
                  key={index}
                  // onClick={() => handleClicks(_id, item)}
                  className="bg-white border-b border-[#929296] cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-sm text-primary  text-left"
                  >
                    <p>{item?.user_Browser || ""}</p>
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-[#929296] text-sm  text-left"
                  >
                    {item?.clientIp || ""}
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-[#929296] text-sm  text-left"
                  >
                    {moment(item?.createdAt || "").format(
                      "MM-DD-YYYY HH:mm:ss"
                    )}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-2 mt-2  bg-white rounded">
        <div className="flex justify-between items-center">
          <div>Total Records {pagination?.total}</div>
          <div className="flex justify-end items-center gap-x-10">
            <select
              className="form-control"
              onChange={(e) => handleShowRows(e.target.value)}
              value={showRows}
            >
              <option value="10">10 Records Per Page</option>
              <option value="20">20 Records Per Page</option>
              <option value="50">50 Records Per Page</option>
            </select>
            <button className="btn btn-primary">Filter Table columns</button>
            {CustomPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLogs;
