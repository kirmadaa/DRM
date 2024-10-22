import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { list } from "../Components/module";
import {
  GET_FILTERS,
  GET_TABLE_HEADER,
  SET_LOADER,
  GET_ALL_DATA_FILTER,
  GET_FORM,
  RESET_STATE,
} from "../Redux/actions/user";
import ModuleNotFound from "../Components/moduleNotFound";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  AlignJustify,
  RotateCcw,
} from "react-feather";
import { MASS_TRANSFER } from "../Redux/actions/massModule";
import { getUserList } from "../Redux/actions/userList";
import { toast } from "react-toastify";
import EnumFilter from "../Components/enumFilter";
import useAccessibleRole from "../hooks/useAccessibleRole";
import moment from "moment";
import FilterFieldFortable from "./FilterFieldFortable";
import { GET_FOMR_LAYOUT_BY_MODULE } from "../Redux/actions/modules";
// Import the icon component from a library

const MassTransferList = (props) => {
  const { moduleName } = props;
  const api = list[moduleName] || {};
  const [showRows, setShowRows] = useState(10);
  const [checkRows, setCheckRows] = useState([]);
  const [fromTO, setFromTo] = useState({
    from: "",
    to: "",
  });
  const formbyModuleName = useSelector(
    (state) => state?.ModulesReducer?.formbyModuleName
  );
  const getdefaultFilter = (name) => {
    return JSON.parse(localStorage.getItem("defaultFilter" + name));
  };

  const [formbyModuleNameState, setFormbyModuleNameState] = useState({});
  const [selectedFilter, setselectedFilter] = useState(getdefaultFilter(moduleName) || []);
  const [currentPage, setCurrentPage] = useState(1);
  const data = useSelector((state) => state.user.data);
  const pagination = useSelector((state) => state.user.pagination);
  let tableHeader = useSelector((state) => state.user.tableHeader) || [];
  const filters = useSelector((state) => state.user.filters);
  const form = useSelector((state) => state.user.form);
  const users = useSelector((state) => state?.profile?.userList);
  const filter = useSelector((state) => state.commanvar.filter);

  const { edit, write } = useAccessibleRole(moduleName);
  useEffect(() => {
    let sidefilterUpdate = [];
    const data = filters.filter(item => (item === "CreatedBy" || item === "createdTime" || item === "updatedTime" || item === "ModifiedBy"))
    const newData = data.map(item => ({
      id: item,
      placeholder: item,
      FieldName: item,
      label: item,
      name: item,
      value: item,
      type: (item === "CreatedBy" || item === "ModifiedBy") ? "Owner" : "date",
    }));

    const newFormbyModuleName = { ...formbyModuleName, formData: formbyModuleName?.formData.map(item => ({ ...item, sections: [...item?.sections.map((ele, index) => ({ ...ele, inputs: index === 0 ? { ...ele?.inputs, ...newData.reduce((a, v) => ({ ...a, [v.id]: v }), {}) } : { ...ele.inputs } }))] })) }

    if (newFormbyModuleName?.formData?.length > 0) {
      for (let item of newFormbyModuleName?.formData[0]?.sections) {
        for (let input in item?.inputs) {
          let inputInfo = item?.inputs[input];

          if (inputInfo?.value.includes("owner")) {
            sidefilterUpdate.push({
              filter: inputInfo?.type === "number" ? "<" : "IS",
              name: inputInfo?.value,
              value: "",
              apply: false,
              type: "lookup",
            });
          } else {
            sidefilterUpdate.push({
              filter: inputInfo?.type === "number" ? "<" : "IS",
              name: inputInfo?.value,
              value: "",
              apply: false,
              type: inputInfo?.value?.toLowerCase().includes("lookup")
                ? "lookup"
                : inputInfo?.type,
            });
          }
        }
      }
    }
    setFormbyModuleNameState(newFormbyModuleName)
    if (sidefilterUpdate?.length > 0) {
      setselectedFilter(sidefilterUpdate);
    }
  }, [formbyModuleName]);

  const hideFilterList = [
    "ModuleTitle",
    "createdTime",
    "updatedTime",
    "tuch",
    "deletedAt",
    "0",
    "_id",
    "LeadOwnerId",
    "tuch",
    "Owner",
    "LeadsOwnerId",
    "organizationId",
    "DealOwnerId",
    "DealsOwnerId",
    "ContactOwnerId",
    "ContactsOwnerId",
    "AccountOwnerId",
    "AccountsOwnerId",
    "TaskOwnerId",
    "TasksOwnerId",
    "MeetingOwnerId",
    "MeetingsOwnerId",
    "callOwnerId",
    "CallsOwnerId",
    "OpportunitiesOwnerId",
    "Id",
    "id",
    "connectionId",
    "taskOwnerId",
    "connectionId",
    "ModifiedBy",
    "id",
    "SmsOwnerId",
    "WhatsappOwnerId",
    "templateOwner",
    "siteVisitOwnerId",
    "meetingHostId",
    "_id",
    "ContactOwnerId",
    "organizationId",
    "EmailOwnerId",
    "noteOwnerId",
    "VendorOwnerId",
    "InventoryOwnerId",
    "CreatedBy",
    "read",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(RESET_STATE());
    SET_LOADER(true);
    let promisAll = [];
    dispatch(GET_FORM(api.formApi));
    dispatch(GET_FOMR_LAYOUT_BY_MODULE(1, 100, moduleName));
    promisAll.push(dispatch(GET_TABLE_HEADER(api.tableHeaderApi)));
    promisAll.push(dispatch(GET_FILTERS(api.filterApi)));
    promisAll.push(
      dispatch(
        GET_ALL_DATA_FILTER(api.getApi, {
          offset: currentPage,
          limit: showRows,
          buttonType: filter,
        })
      )
    );
    Promise.all(promisAll).then(() => { });
    dispatch(
      getUserList({ page: 1, limit: 200, active: true, userlist: true })
    );
    SET_LOADER(false);
  }, [dispatch, filter]);
  //   useEffect(() => {
  //     let temparr = [];
  //     filters.forEach((element) => {
  //       let tempobj = {
  //         name: element,
  //         value: "",
  //         apply: false,
  //       };
  //       temparr.push(tempobj);
  //     });
  //     setselectedFilter(temparr);
  //   }, [filters]);

  const handleCheckRows = (rows) => {
    setCheckRows(rows?.selectedRows?.map((item) => item?._id));
  };

  const handlePagination = (page) => {
    // check if selected checkbox is true then apply filter
    if (showFilter()) {
      applyFilter(page.selected + 1, showRows);
    } else {
      dispatch(
        GET_ALL_DATA_FILTER(api.getApi, {
          offset: page.selected + 1,
          limit: showRows,
          buttonType: "All",
        })
      );
      setCurrentPage(page.selected + 1);
    }
  };
  //   const handleselectedFilter = (data) => {
  //     var temp = [...selectedFilter];
  //     temp?.forEach((element) => {
  //       if (element.name === data.name) {
  //         element.value = data.value;
  //         element.apply = data.apply;
  //       }
  //     });
  //     setselectedFilter(temp);
  //   };
  const showFilter = () => {
    let show = false;
    // var temp = [...selectedFilter];
    var temp = [];
    temp?.forEach((element) => {
      if (element.apply === true) {
        show = true;
      }
    });
    return show;
  };
  const applyFilter = (offset = 1, limit = 10) => {
    let isApply = false
    selectedFilter.forEach(item => {
      if (item.apply && item.value) {
        isApply = true
      }
    })
    if (isApply) {
      let payload = {
        offset,
        limit,
        buttonType: "All",
      };
      let search = [
        {
          field: selectedFilter.find(item => item.apply && item.value)?.name,
          data: selectedFilter.find(item => item.apply && item.value)?.value,
          filter: selectedFilter.find(item => item.apply && item.value)?.filter || "IS",
          type: selectedFilter.find(item => item.apply && item.value)?.type
        },
      ];

      payload["search"] = search;

      // let prams = `?offset=${offset}&limit=${limit}0&${selectedFilter?.key}=${selectedFilter?.value}`;
      dispatch(GET_ALL_DATA_FILTER(api.getApi, payload));
      setShowRows(10);
    } else {
      toast.warning("Please select search first");
    }
  };
  const ClearFilter = () => {
    setShowRows(10);
    dispatch(
      GET_ALL_DATA_FILTER(api.getApi, {
        offset: 1,
        limit: 10,
        buttonType: "All",
      })
    );

    setselectedFilter(pre => [...pre.map((element) =>
    ({
      ...element,
      value: "",
      apply: false,
    })
    )]);
  };
  const handleMassTransfer = () => {
    if (checkRows?.length !== 0) {
      dispatch(
        MASS_TRANSFER(api.transferUrl, {
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
      toast.warning(`Please select ${moduleName} first`);
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
    // return [
    //   ...tempArry,
    //   {
    //     name: <FilterAction/>,
    //     maxWidth: "50px",
    //     minWidth: "50px",
    //     header: '',
    //   },
    // ];
  };
  const CustomPagination = () => {
    const count = Number(Math.ceil(pagination?.total / showRows));

    return (
      <ReactPaginate
        previousLabel={<ChevronLeft />}
        nextLabel={<ChevronRight />}
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

  const setCondition = (name, value) => {
    setselectedFilter(prev => [...prev.map(item => (item.name === name ? { ...item, filter: value } : { ...item }))]);
  };
  const handleShowRows = (value) => {
    setShowRows(value);
    dispatch(
      GET_ALL_DATA_FILTER(api.getApi, {
        offset: 1,
        limit: value,
        buttonType: "All",
      })
    );
  };
  const calldetail = (_id) => {
    navigate(api.detialUrl + _id);
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
        maxWidth: 18,
      },
    },
  };
  return (
    <>
      <div className=" bg-white p-10 rounded-2xl">
        <p className="text-lg font-semibold mb-3">Select Owner</p>
        <div className=" grid grid-cols-4  items-end gap-4 mb-3 ">
          <div>
            <p className="text-base font-semibold mb-1">Transfer From</p>
            <div className="border border-[#E6E6EB] rounded-xl p-3">
              <select
                className="form-control pe-3 focus:outline-none"
                onChange={(e) => setFromTo({ ...fromTO, from: e.target.value })}
                value={fromTO?.from}
              >
                <option value="">Choose one</option>
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
                className="form-control pe-3 focus:outline-none"
                onChange={(e) => setFromTo({ ...fromTO, to: e.target.value })}
                disabled={!fromTO?.from}
                value={fromTO?.to}
              >
                <option value="">Choose one</option>
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
        <div className="flex items-center gap-4">
          {/* <p className="text-base font-semibold mb-3">Transfer To</p> */}
          <div className="border border-[#E6E6EB] rounded-xl p-3">
            <select
              className="form-control pe-3 focus:outline-none"
              onChange={(e) => {
                setselectedFilter(prev => [...prev.map(item => (item.name === e.target.value ? { ...item, apply: true } : { ...item, apply: false }))])
              }
              }
              value={selectedFilter?.key}
            >
              <option value="">Select User</option>
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
          <div className="flex items-center">
            {selectedFilter?.map((filterData, index) => {
              return (
                <>
                  {filterData.apply && (
                    <div key={filterData?.name + index} className="flex mr-2 min-w-[200px]">
                      <EnumFilter
                        typeIs={filterData?.type}
                        filter={filterData?.filter}
                        setCondition={setCondition}
                        name={filterData?.name}
                        comp
                      />
                      <FilterFieldFortable
                        filter={filterData}
                        selectedFilter={selectedFilter}
                        setselectedFilter={setselectedFilter}
                        modulename={moduleName}
                        formbyModuleName={formbyModuleNameState}
                      />
                    </div>
                  )}
                </>
              )
            })}
            <RotateCcw className="cursor-pointer" onClick={() => ClearFilter()} />
          </div>
        </div>
        <button
          className="bg-primary rounded-2xl text-white py-3 px-8 mt-7"
          onClick={() => {
            applyFilter();
            // setshowModal(true);
          }}
        >
          Search
        </button>
      </div>

      {form?.sections ? (
        <div className="w-full lead-mains">
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
              <button
                className="bg-primary rounded-2xl text-white py-3 px-8"
                onClick={() => {
                  handleMassTransfer();
                }}
                disabled={!fromTO?.from || !fromTO?.to || !edit || !write}
              >
                Transfer
              </button>
              <select
                className="form-control border border-[#E6E6EB] rounded-xl p-3 focus:outline-none"
                onChange={(e) => handleShowRows(e.target.value)}
              >
                <option value="10">10 Records Per Page</option>
                <option value="20">20 Records Per Page</option>
                <option value="50">50 Records Per Page</option>
              </select>

              {CustomPagination()}
            </div>
          </div>
          <div
            // style={{ width: "85%" }}
            className=" bg-white cstm-table rounded-xl flex flex-col col-span-6 leads-table h-full"
          >
            <DataTable
              noHeader={false}
              pagination={false}
              subHeader={false}
              responsive
              customStyles={customStyles}
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
              columns={renderTabel()}
              selectableRows
              onSelectedRowsChange={handleCheckRows}
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
              className="react-dataTable dataTables_wrapper"
              // paginationComponent={}
              data={data || []}
            />
            <div className="md:hidden">{CustomPagination()}</div>
          </div>
        </div>
      ) : (
        <ModuleNotFound moduleName={moduleName} />
      )}
    </>
  );
};
export default MassTransferList;
