import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { AlignJustify, RotateCcw } from "react-feather";
import {
  GET_ALL_DATA_INVOICE,
  GET_FILTERS_SaleOrder,
  RESET_STATE_SaleOrder,
  GET_ALL_DATA_FILTER_INVOICE,
} from "../../../../Redux/actions/invoices";
import { useNavigate } from "react-router-dom";
import EnumFilter from "../../../../Components/enumFilter";
import { toast } from "react-toastify";
import MassDeleteModal from "../../../../Components/massDeleteModal";
import {
  MASS_DELETE,
  MASS_TRANSFER,
  MASS_UPDATE,
} from "../../../../Redux/actions/massModule";
import InvoiceUpdateModal from "./invoiceUpdateModal";
import useAccessibleRole from "../../../../hooks/useAccessibleRole";
import moment from "moment";

const MassInvoiceModules = ({ location }) => {
  const [showRows, setShowRows] = useState(10);
  const [showDeletModal, setShowDeleteModal] = useState(false);
  const [checkRows, setCheckRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [selectedFilter, setselectedFilter] = useState({
    key: "",
    value: "",
    filter: "",
  });
  const [newInput, setNewInput] = useState({ field: "", value: "" });
  const [fromTO, setFromTo] = useState({
    from: "",
    to: "",
  });

  const { edit, write, delete: deleteValue } = useAccessibleRole("invoices");

  // setp 1
  const data = useSelector((state) => state.Invoices.List);
  const pagination = useSelector((state) => state.Invoices.pagination);
  let tableHeader = useSelector((state) => state.Invoices.tableHeader) || [];
  const filters = useSelector((state) => state.Invoices.Filters);
  const users = useSelector((state) => state?.profile?.userList);

  // setp 2 for filter
  const hideFilterList = [
    "_id",
    "organizationId",
    "salesOrderOwnerId",
    "organizationId",
    "connectionId",
    "ModifiedBy",
    "id",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // setp 2
  useEffect(() => {
    tableHeader = [
      "Subject",
      "CustomerNo",
      "QuoteName",
      "Carrier",
      "SalesCommission",
      "AccountName",
    ];
    dispatch(RESET_STATE_SaleOrder());
    let promisAll = [];
    promisAll.push(dispatch(GET_FILTERS_SaleOrder()));
    promisAll.push(
      dispatch(
        GET_ALL_DATA_FILTER_INVOICE({
          offset: 1,
          limit: 10,
          buttonType: "All",
        })
      )
    );
    Promise.all(promisAll).then(() => { });
  }, [dispatch]);

  const handleCheckRows = (rows) => {
    setCheckRows(rows?.selectedRows?.map((item) => item?._id));
  };

  const handlePagination = (page) => {
    // check if selected checkbox is true then apply filter
    if (showFilter()) {
      applyFilter(page.selected + 1, showRows);
    } else {
      dispatch(GET_ALL_DATA_INVOICE(page.selected + 1, showRows));
      setCurrentPage(page.selected + 1);
    }
  };

  // const setCondition = (name, value) => {
  //   let afterAddEnum = selectedFilter?.map((el) => {
  //     if (el?.name === name) {
  //       el["filter"] = value;
  //     }
  //     return el;
  //   });
  //   setselectedFilter(afterAddEnum);
  // };

  const setCondition = (name, value) => {
    setselectedFilter({ ...selectedFilter, filter: value });
  };

  // const handleselectedFilter = (data) => {
  //   var temp = [...selectedFilter];
  //   temp?.forEach((element) => {
  //     if (element.name === data.name) {
  //       element.value = data.value;
  //       element.apply = data.apply;
  //     }
  //   });
  //   setselectedFilter(temp);
  // };

  const showFilter = () => {
    let show = false;
    var temp = [...selectedFilter];
    temp?.forEach((element) => {
      if (element.apply === true) {
        show = true;
      }
    });
    return show;
  };

  const applyFilter = (offset = 1, limit = 10) => {
    if (selectedFilter?.key && selectedFilter?.value) {
      let payload = {
        offset,
        limit,
        buttonType: "All",
      };
      let search = [
        {
          field: selectedFilter?.key,
          data: selectedFilter?.value,
          filter: selectedFilter?.filter || "IS",
        },
      ];

      payload["search"] = search;

      dispatch(GET_ALL_DATA_FILTER_INVOICE(payload));
      setShowRows(10);
    } else {
      toast.warning("Please select search first");
    }
  };

  const ClearFilter = () => {
    setShowRows(10);
    dispatch(
      GET_ALL_DATA_FILTER_INVOICE({
        offset: 1,
        limit: 10,
        buttonType: "All",
      })
    );
    setselectedFilter({
      key: "",
      value: "",
      filter: "",
    });
  };

  const handleMassDelete = () => {
    if (checkRows?.length !== 0) {
      dispatch(
        MASS_DELETE("invoices-mass-delete", { dataList: [...checkRows] })
      ).then((res) => {
        if (res?.status === 200) {
          ClearFilter();
          setShowDeleteModal(false);
        }
      });
    } else {
      toast.warning(`Please select Invoice list first`);
    }
  };

  const handleDeleteModal = () => {
    if (checkRows?.length !== 0) {
      setShowDeleteModal(true);
    } else {
      toast.warning(`Please select Invoice list first`);
    }
  };

  const handleMassUpdate = () => {
    if (newInput?.field && newInput?.value) {
      dispatch(
        MASS_UPDATE("invoices-mass-update", {
          data: { [newInput?.field]: newInput?.value },
          dataList: [...checkRows],
        })
      ).then((res) => {
        if (res?.status === 200) {
          ClearFilter();
          setshowUpdateModal(false);
          setNewInput({
            field: "",
            value: "",
          });
        }
      });
    } else {
      toast.warning("Please select values first");
    }
  };
  const handleUpdateModal = () => {
    if (checkRows?.length !== 0) {
      setshowUpdateModal(true);
    } else {
      toast.warning(`Please select Invoice list first`);
    }
  };

  const handleMassTransfer = () => {
    if (checkRows?.length !== 0) {
      dispatch(
        MASS_TRANSFER("invoices-mass-transfer", {
          fromUser: fromTO?.from,
          toUserm: fromTO?.to,
          dataList: [...checkRows],
        })
      ).then((res) => {
        if (res?.status === 200) {
          ClearFilter();
        }
      });
    } else {
      toast.warning(`Please select Invoice list first`);
    }
  };

  const getTitle = (value) => {
    let titleis = value
      ?.replace(/([A-Z])/g, " $1")
      ?.replace(/^./, function (str) {
        return str.toUpperCase();
      });
    return titleis.replace(/_/g, "");
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(pagination?.total / showRows));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        containerClassName={
          "pagination react-paginate text-sm gap-2 flex justify-end my-2"
        }
      />
    );
  };
  const handleShowRows = (value) => {
    setShowRows(value);
    dispatch(GET_ALL_DATA_INVOICE(1, value));
  };

  const calldetail = (_id) => {
    navigate("/crm/invoices-details/" + _id);
    let tempArry = [];

    if (tableHeader?.length === 0) {
      tableHeader = filters
        ?.slice(0, 5)
        ?.filter((item) => !hideFilterList?.includes(item));
    }
    tableHeader?.forEach((element) => {
      let temp = {};
      temp.title = getTitle(element);
      temp.sortId = element;
      temp = {
        name: getTitle(element),
        selector: (row) => {
          if (element === "createdTime" || element === "updatedTime") {
            return moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
          }
          return row[element];
        },
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div
            className="flex items-center"
            onClick={() => {
              if (element === "Phone") {
                //phone(row[element]);
              }
            }}
          >
            <div className="flex flex-col">
              <span className="font-bold">{row[element]}</span>
            </div>
          </div>
        ),
      };

      tempArry.push(temp);
    });
    return [
      ...tempArry,
      {
        name: "Action",
        selector: "action",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="flex items-center">
            <div className="flex flex-col">
              <span
                onClick={() => {
                  calldetail(row._id);
                }}
                className="font-bold"
              >
                View
              </span>
            </div>
          </div>
        ),
      },
    ];
  };

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#f7f7f7",
      },
    },
    header: {
      style: {
        fontWeight: "bold",
      },
    },
    row: {
      style: {
        fontSize: "14px",
      },
    },
    cell: {
      style: {
        padding: "8px",
      },
    },
    checkbox: {
      style: {
        border: "red",
        maxHeight: "18px",
        maxWidth: "18px",
      },
    },
  };

  const renderTabel = () => {
    let tempArry = [];

    if (tableHeader?.length === 0) {
      tableHeader = filters
        ?.slice(0, 5)
        ?.filter((item) => !hideFilterList?.includes(item));
    }
    tableHeader?.forEach((element) => {
      let temp = {};
      temp.title = getTitle(element);
      temp.sortId = element;
      temp = {
        name: getTitle(element),
        selector: (row) => {
          if (element === "createdTime" || element === "updatedTime") {
            return moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
          }
          return row[element];
        },
        sortable: true,
        minWidth: "200px",
        header: <AlignJustify />,
        cell: (row) => (
          <div
            className="flex items-center"
            onClick={() => {
              if (element === "Phone") {
                //phone(row[element]);
              }
            }}
          >
            <div className="flex flex-col">
              <span className="font-normal">{row[element]}</span>
            </div>
          </div>
        ),
      };

      tempArry.push(temp);
    });
    return [
      ...tempArry,
      {
        name: "Action",
        selector: "action",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="flex items-center">
            <div className="flex flex-col">
              <span
                onClick={() => {
                  calldetail(row._id);
                }}
                className="font-bold"
              >
                View
              </span>
            </div>
          </div>
        ),
      },
    ];
  };

  return (
    <div className="flex gap-3   flex-col w-full">
      <div className="bg-white p-10 rounded-2xl">
        <p className="text-lg font-semibold mb-3">Criteria</p>
        {location?.includes("transfer") ? (
          <div className=" grid grid-cols-4  items-end gap-4 mb-3 ">
            <div>
              <p className="text-base font-semibold mb-1">Transfer From</p>
              <div className="border border-[#E6E6EB] rounded-xl p-3">
                <select
                  className="form-control pe-3 focus:outline-none w-full"
                  onChange={(e) =>
                    setFromTo({ ...fromTO, from: e.target.value })
                  }
                  value={fromTO?.from}
                >
                  <option value="">From</option>
                  {users?.map((item, index) => {
                    return (
                      <option key={index} value={item?._id}>
                        {`${item?.firstName} ${item?.lastName}`}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold mb-1">Transfer To</p>
              <div className="border border-[#E6E6EB] rounded-xl p-3">
                <select
                  className="form-control pe-3 focus:outline-none w-full"
                  onChange={(e) => setFromTo({ ...fromTO, to: e.target.value })}
                  disabled={!fromTO?.from}
                  value={fromTO?.to}
                >
                  <option value="">To</option>
                  {users?.map((item, index) => {
                    if (item?._id !== fromTO?.from) {
                      return (
                        <option key={index} value={item?._id}>
                          {`${item?.firstName} ${item?.lastName}`}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex items-center gap-4">
          <div className="border border-[#E6E6EB] rounded-xl p-3">
            <select
              className="form-control pe-3 focus:outline-none"
              onChange={(e) =>
                setselectedFilter({ ...selectedFilter, key: e.target.value })
              }
              value={selectedFilter?.key}
            >
              <option value="">Choose one</option>
              {filters?.map((item, index) => {
                let newValue = getTitle(item)?.replace(/^\s+/g, "");
                if (newValue !== "id") {
                  return (
                    <option key={index} value={item}>
                      {newValue}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <EnumFilter
            filter={selectedFilter?.filter}
            setCondition={setCondition}
            name={selectedFilter?.key}
            comp
          />
          <input
            type="text"
            className="bg-[#F9F9FB] rounded-xl px-4 py-3 focus:outline-none w-full md:w-5/12"
            value={selectedFilter?.value}
            onChange={(e) =>
              setselectedFilter({ ...selectedFilter, value: e.target.value })
            }
          />

          <button
            className="bg-primary rounded-2xl text-white py-3 px-8"
            onClick={() => {
              applyFilter();
            }}
          >
            Search
          </button>
          <RotateCcw className="cursor-pointer" onClick={() => ClearFilter()} />
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-4 py-2">
          <div>
            <div className="text-sm font-medium text-[#18181B]">
              Total Records{" "}
              <span className="text-sm font-semibold text-[#18181B]">
                {pagination?.total}
              </span>
            </div>
            <div className="text-sm font-medium text-[#18181B]">
              Total Select{" "}
              <span className="text-sm font-semibold text-[#18181B]">
                {checkRows?.length}
              </span>
            </div>
          </div>

          <div className="w-6/12 flex justify-end items-center gap-x-10">
            <div className="flex justify-center m-3">
              {location?.includes("delete") ? (
                <button
                  className="bg-primary rounded-2xl text-white py-3 px-8"
                  onClick={() => {
                    handleDeleteModal();
                  }}
                  disabled={!deleteValue}
                >
                  Delete
                </button>
              ) : location?.includes("update") ? (
                <button
                  className="bg-primary rounded-2xl text-white py-3 px-8"
                  onClick={() => {
                    handleUpdateModal();
                  }}
                  disabled={!edit}
                >
                  Update
                </button>
              ) : location?.includes("transfer") ? (
                <button
                  className="bg-primary rounded-2xl text-white py-3 px-8"
                  onClick={() => {
                    handleMassTransfer();
                  }}
                  disabled={!fromTO?.from || !fromTO?.to || !edit || !write}
                >
                  Transfer
                </button>
              ) : null}
            </div>
            <div className=" border border-[#E6E6EB] rounded-xl p-3 bg-white">
              <select
                className="pe-2 focus:outline-none"
                onChange={(e) => handleShowRows(e.target.value)}
              >
                <option value="10">10 Records Per Page</option>
                <option value="20">20 Records Per Page</option>
                <option value="50">50 Records Per Page</option>
              </select>
            </div>

            {CustomPagination()}
          </div>
        </div>

        <div className=" bg-white cstm-table rounded-xl flex flex-col col-span-6 leads-table h-full">
          <DataTable
            noHeader={false}
            pagination={false}
            subHeader={false}
            responsive
            sortable={true}
            customStyles={customStyles}
            onSelectedRowsChange={handleCheckRows}
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
            selectableRows
            id="_id"
            columns={renderTabel()}
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
            className="react-dataTable dataTables_wrapper"
            // paginationComponent={}
            data={data || []}
          />
          <div className="md:hidden">{CustomPagination()}</div>
        </div>
      </div>
      <MassDeleteModal
        modal={showDeletModal}
        setModal={setShowDeleteModal}
        deleteFun={handleMassDelete}
      />
      <InvoiceUpdateModal
        modal={showUpdateModal}
        setModal={setshowUpdateModal}
        updateFun={handleMassUpdate}
        input={newInput}
        setInput={setNewInput}
      />
    </div>
  );
};
export default MassInvoiceModules;
