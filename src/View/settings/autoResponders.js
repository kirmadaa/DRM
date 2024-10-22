import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, LeftBackArrow } from "../../assets/svgIcons";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  DELETE_AUTO_RESPONDERS,
  GET_AUTO_RESPONDERS,
} from "../../Redux/actions/autoResponders";
import MassDeleteModal from "../../Components/massDeleteModal";
import ReactPaginate from "react-paginate";
import useAccessibleRole from "../../hooks/useAccessibleRole";

const AutoResponders = () => {
  // state
  // state
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [modalDelete, setModalDelete] = useState(false);
  const [data, setData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState(200);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search.split('?')[1])
  const modulename = searchParams.get('module')
  const { autoResponders } = useAccessibleRole(modulename);

  useEffect(() => {
    if (!autoResponders && autoResponders !== undefined) {
      navigate('/crm/dashboard')
    }
  }, [autoResponders])

  // api call function
  const fetchAutoResponders = () => {
    const filter = {
      offset: currentPage,
      limit: limit,
      search: [],
    };
    dispatch(GET_AUTO_RESPONDERS(`search-autoresponder`, filter)).then(
      (res) => {
        if (res?.status === 200) {
          setPageCount(Math.ceil(res?.data?.data.pagination?.total / limit));
          setData(res?.data?.data);
          // setExportData(res?.data?.data?.data);
          setError(200);
        } else {
          setPageCount(0);
          setData({});

          setError(res?.status || 500);
        }
      }
    );
  };

  // pagination function
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleFlowUpsDelete = () => {
    if (deleteId) {
      let data = {
        dataList: [deleteId],
      };
      dispatch(DELETE_AUTO_RESPONDERS("autoresponder-mass-delete", data)).then(
        (res) => {
          if (res?.status === 200) {
            fetchAutoResponders();
            setModalDelete(false);
            setDeleteId(null);
          }
        }
      );
    }
  };
  useEffect(() => {
    fetchAutoResponders();
  }, [currentPage, limit]);

  return (
    <div className="my-4">
      <div className="flex ">
        <LeftBackArrow />
        <div className="text-primary text-base font-semibold ml-4">
          Autoresponders
        </div>
      </div>
      <div className="rounded-2xl bg-[white] w-full p-6 mt-4">
        <p>Autoresponders help you to automate your email follow-up process.</p>
        <div className="mt-4 rounded-lg bg-[#F8F8FC] p-4">
          <h2 className="text-[14px] font-semibold">Important Notes</h2>
          <p className="ml-4 text-[14px] leading-5  mb-2">
            The autoresponder feature is only available in the Leads, Contacts,
            and Custom Modules.
            <br /> Select specific records from the custom view to exclude them
            from the next round of follow-up emails.
            <br /> Use the Reset option to include Leads/Contacts/Custom Modules
            in a custom view (even the excluded ones) for the next follow-up.
          </p>
          <h2 className="text-[14px] font-semibold ">Maximum Limits</h2>
          <div className="ml-4">
            <p className="text-[14px] leading-5">
              <span>Number of Emails left for the day -</span>
              <span> 1000</span>
            </p>
            <p className="text-[14px] leading-5">
              <span>Number of Autoresponders -</span>
              <span> 3</span>
            </p>
            <p className="text-[14px] leading-5">
              <span>Number of follow-up emails -</span>
              <span> 5</span>
            </p>
          </div>
        </div>
        <div className="my-4">
          <button
            type="button"
            className="inline-flex  justify-center rounded-lg border border-transparent bg-primary px-8 py-2 text-sm font-medium text-white "
            onClick={() =>
              navigate(`/crm/modules/auto-responders/create${search}`)
            }
          >
            Create Autoresponder
          </button>
          {/* <button
            type="button"
            className=" ml-2 inline-flex justify-center rounded-lg border border-[#B2B2B6] bg-white px-8 py-2 text-sm font-medium text-[#B2B2B6] "
          >
            Create Folder
          </button> */}
        </div>
        <div className="mt-4">
          <div className="text-primary text-base font-semibold ">General</div>
          <div className="p-4">
            {error === 200 ? (
              <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
                <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
                  <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3  text-left font-medium"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3  text-left font-medium"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-left font-medium"
                      >
                        Folder
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-left font-medium"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.respondersData?.map((item, index) => (
                      <tr key={index} className="bg-white cursor-pointer">
                        <td className="px-5 py-4">{item?.Name}</td>
                        <td className="px-5 py-4">{item?.Type}</td>
                        <td className="px-5 py-4">{item?.Folder}</td>
                        <td className="px-5 py-4">
                          {" "}
                          <div className="flex">
                            <span
                              className="p-2 rounded bg-[#DCFCE7]"
                              onClick={() =>
                                navigate(
                                  `/crm/modules/auto-responders/edit/${item._id}${search}`
                                )
                              }
                            >
                              <EditIcon />
                            </span>{" "}
                            <span
                              className="p-2 ml-2 rounded bg-[#FFEAEF]"
                              onClick={() => {
                                setDeleteId(item?._id);
                                setModalDelete(true);
                                // handleDelete();
                              }}
                            >
                              <DeleteIcon />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                  <option value="30">30 Record per page</option>
                  <option value="100">100 Record per page</option>
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
          {modalDelete && (
            <MassDeleteModal
              modal={modalDelete}
              setModal={setModalDelete}
              deleteFun={handleFlowUpsDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoResponders;
