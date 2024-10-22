import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_ROLE_DATA,
  GET_ROLE_BY_ID_DATA,
} from "../../../../Redux/actions/role";
import ReactPaginate from "react-paginate";
import EditRoleLayout from "../edit";
import { Edit } from "react-feather";
import CreateRole from "../create";
import PageLoader from "../../../../Components/pageLoader";

const RoleDetails = () => {
  const [selectRole, setSelectRole] = useState(null);
  const [showRows, setShowRows] = useState(10);
  const roles = useSelector((state) => state?.role);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = useSelector((state) => state?.role?.pagination);
  const [roleByIdData, setRoleByIdData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const handleShowRows = (val) => {
    setShowRows(val);
    dispatch(GET_ALL_ROLE_DATA(currentPage + 1, val));
  };

  const handlePagination = (page) => {
    dispatch(GET_ALL_ROLE_DATA(page.selected + 1, showRows));
  };

  const handleClicks = (_id, item) => {
    dispatch(GET_ROLE_BY_ID_DATA(_id)).then((res) => {
      if (res) {
        setRoleByIdData(res?.RoleData[0]);
      }
    });
    setSelectRole(item);
    openModal();
  };

  useEffect(() => {
    if (currentPage) {
      dispatch(GET_ALL_ROLE_DATA(currentPage, showRows));
    }
  }, [dispatch, showRows]);

  useEffect(() => {
    if (roles?.roledata?.length > 0 && pagination) {
      setCurrentPage(pagination?.offset - 1);
    }
  }, [roles, pagination]);

  function openModal() {
    setModalShow(true);
  }
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
      style={{ minHeight: "500px" }}
      className="border rounded table-responsive mt-3"
    >
      {roles.loader ? <> <PageLoader title="Loading" /></> :
        <>
          <div className="my-3 flex justify-items-end items-right">
            <CreateRole />
          </div>
          <table className="table table-dashboard mg-b-0 w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left pl-40">
                  Role Title
                </th>
                <th scope="col" className="px-6 py-3 text-left pl-40">Action</th>
              </tr>
            </thead>
            <tbody>
              {roles?.roledata?.map((item) => {
                let { roleTitle, _id } = item;
                return (
                  <tr
                    key={_id}
                    className="bg-white border-b "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left pl-40"
                    >
                      {roleTitle}
                    </th>
                    <td className="px-6 py-4 pl-40">
                      <div onClick={() => handleClicks(_id, item)}>
                        <Edit />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <EditRoleLayout
              selectRole={selectRole}
              setSelectRole={setSelectRole}
              modalShow={modalShow}
              setModalShow={setModalShow}
              roleByIdData={roleByIdData}
              currentPage={currentPage}
            />
          </table>
          <div className="p-2 mt-2 hadow-xl bg-white rounded w-[100%]">
            <div className="flex justify-between items-center">
              <div>Total Records {pagination?.total}</div>
              <div className="flex justify-end items-center gap-x-10 items-center">
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
          </div></>}
    </div>
  );
};

export default RoleDetails;
