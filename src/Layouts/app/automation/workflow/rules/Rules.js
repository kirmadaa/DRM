import React from "react";
import DataTable from "react-data-table-component";
import { SearchIcon } from "../../../../../assets/svgIcons";
import { PlusWhite } from "../../../../../assets/svgIcons";
import { useState } from "react";
import CreateRuleModal from "./CreateRuleModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  DELETE_WORKFLOW,
  GET_WORKFLOW_LIST,
  UPDATE_WORKFLOW,
} from "../../../../../Redux/actions/workflow";
import { ChevronDown } from "react-feather";
import { Menu } from "@headlessui/react";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";

const Rules = () => {
  const [modal, setModal] = useState(false);
  const [cModal, setCModal] = useState(false);
  const [data, setData] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStatus = async (rowData, key) => {
    let newData = { ...rowData };

    newData.status = key === "Active" ? true : false;
    let res = await dispatch(UPDATE_WORKFLOW(newData?._id, newData));
    if (res?.success) {
      getData();
    }
  };

  const handlePagination = (page) => {
    getData({
      offset: page.selected + 1,
      limit: 10,
      search: [],
    });
    setCurrentPage(page.selected + 1);
  };
  const handleDelete = async (rowData, key) => {
    let newData = { dataList: [rowData?._id] };
    let res = await dispatch(DELETE_WORKFLOW(newData));
    if (res?.success) {
      getData();
    }
  };

  const columns = [
    {
      name: "RuleName",
      width: "25%",
      selector: (row) => row?.RuleName,
      cell: (row) => row?.RuleName || "N/A",
      sortable: true,
    },
    {
      name: "All Modules",
      width: "25%",
      selector: (row) => row?.ModuleTitle,
      cell: (row) => row?.ModuleTitle || "N/A",
      sortable: true,
    },
    {
      name: "Execute On",
      width: "25%",
      cell: (row) =>
        row?.when?.ExecuteAction?.create
          ? row?.when?.ExecuteAction?.edit
            ? "Create or Edit"
            : "Create"
          : row?.when?.ExecuteAction?.edit
            ? "Edit"
            : "NA",
      sortable: true,
    },
    {
      name: "Status",
      width: "25%",
      cell: (row) => (
        <>
          <Menu as="div" className="relative inline-block text-left m-2">
            <div>
              <Menu.Button className="inline-flex items-center gap-3 w-full justify-center rounded-lg border-[1.5px] px-4 py-3 text-sm font-medium bg-white text-grey hover:bg-opacity-90">
                {row?.status ? "Active" : "Inactive"}
                <ChevronDown size={16} />
              </Menu.Button>
            </div>
            <Menu.Items
              style={{ zIndex: 1000 }}
              className="absolute left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              {["Active", "Inactive", "Delete"].map((items, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-primary text-white" : "text-gray-900"
                        } group flex w-full items-center px-5 py-[10px] text-sm`}
                      onClick={() => {
                        if (items === "Delete") {
                          handleDelete(row, items);
                        } else {
                          handleStatus(row, items);
                        }
                      }}
                    >
                      {items}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </>
      ),
      sortable: true,
    },
  ];

  const handleClose = () => {
    setModal(false);
  };
  // const handleCloseConfirm = () => {
  //   setCModal(false);
  // };
  const getData = (limit) => {
    dispatch(GET_WORKFLOW_LIST(limit)).then((response) => {
      setPageCount(Math.ceil(response?.data?.pagination?.total / limit?.limit));
      setData(response?.data);
    });
  };

  useEffect(() => {
    let limit = {
      offset: 1,
      limit: 10,
      search: [],
    };
    getData(limit);
  }, []);

  return (
    <>
      <div>
        <h6 className="text-[#191242] text-xl font-semibold mb-1">
          Workflow Rules
        </h6>
        <p className="text-[#6A6A6D] text-[14px] font-medium">
          Workflow rules allow you to perform certain automatic actions on
          specific records based on filter criteria. Workflow automations can
          send emails, update fields, create records and much more.
        </p>
        <div className="flex items-center justify-end my-10">
          {/* <div className="flex items-center justify-between p-3 gap-3 border border-[#E6E6EB] rounded-xl lg:w-[30%]">
            <input
              type="text"
              placeholder="Search All Reports"
              className="focus:outline-none w-full"
            />
            <SearchIcon />
          </div> */}
          <div>
            <button
              className="flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
              onClick={() => setModal(true)}
            >
              <PlusWhite /> Create Rule
            </button>
          </div>
        </div>
        <div className=" bg-white cstm-table rounded-xl flex flex-col col-span-6  h-full">
          <DataTable
            noHeader={false}
            pagination={false}
            subHeader={false}
            responsive
            sortable={true}
            noDataComponent={
              <div className="text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/msoeawqm.json"
                  trigger="loop"
                  colors="primary:#121331,secondary:#08a88a"
                  style={{ width: "75px", height: "75px" }}
                />
                <h5 className="mt-2">Sorry! No Results matching your search.</h5>
                <p className="text-muted mb-0">
                  
                 
                </p>
              </div>
            }
            id="_id"
            onRowClicked={(row) => navigate(`/crm/workflow-rules/${row?._id}`)}
            columns={columns}
            selectableRows
            sortIcon={
              <>
                <svg
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.845 9.36719H1.625"
                    stroke="#6A6A6D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.845 5.17969H1.625"
                    stroke="#6A6A6D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.62866 1H1.625"
                    stroke="#6A6A6D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            }
            theme="solarized"
            className="react-dataTable dataTables_wrapper !overflow-none"
            data={data?.workFlowData || []}
          />
        </div>
      </div>
      {pageCount && pageCount > 1 ? (
        <div className="flex justify-between items-center">
          <div className=" whitespace-nowrap text-[#18181B] font-semibold">
            Total Record {data?.pagination?.total}
          </div>
          <div className="ml-6 flex justify-end  gap-x-10 items-center">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount || 1}
              activeClassName="active"
              forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              onPageChange={(page) => handlePagination(page)}
              //   onPageChange={handlePagination}
              containerClassName={
                "pagination react-paginate text-sm gap-2 flex justify-end my-2"
              }
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <CreateRuleModal modal={modal} handleClose={handleClose} />
      {/* <ConfirmationModal handleClose={handleCloseConfirm} modal={cModal} /> */}
    </>
  );
};

export default Rules;
