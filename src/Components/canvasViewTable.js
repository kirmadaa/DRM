import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { list } from "../Components/module";
import {
  GET_ALL_DATA,
  GET_FILTERS,
  GET_TABLE_HEADER,
  SET_LOADER,
  GET_ALL_DATA_FILTER,
  GET_FORM,
  RESET_STATE,
  SELECT_CHECKBOX,
} from "../Redux/actions/user";
import ModuleNotFound from "../Components/moduleNotFound";
import FilterTableModel from "../Components/filterTableModel";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, AlignJustify } from "react-feather";
import {
  HeaderFilterIcon,
  SearchIcon,
  TableElement,
  TablePhoneIcon,
} from "../assets/svgIcons";
import EnumFilter from "../Components/enumFilter";
// Import the icon component from a library

const TableList = (props) => {
  const { moduleName, filterSHow } = props;
  const api = list[moduleName] || {};
  const [showRows, setShowRows] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedFilter, setselectedFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setshowModal] = useState(false);
  const data = useSelector((state) => state.user.data);
  const pagination = useSelector((state) => state.user.pagination);
  let tableHeader = useSelector((state) => state.user.tableHeader) || [];
  const filters = useSelector((state) => state.user.filters);
  const form = useSelector((state) => state.user.form);

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
    promisAll.push(dispatch(GET_TABLE_HEADER(api.tableHeaderApi)));
    promisAll.push(dispatch(GET_FILTERS(api.filterApi)));
    promisAll.push(
      dispatch(
        GET_ALL_DATA_FILTER(api.getApi, {
          offset: currentPage,
          limit: showRows,
        })
      )
    );
    Promise.all(promisAll).then(() => { });
    SET_LOADER(false);
  }, [dispatch]);

  useEffect(() => {
    let temparr = [];
    filters.forEach((element) => {
      let tempobj = {
        name: element,
        value: "",
        apply: false,
      };
      temparr.push(tempobj);
    });
    setselectedFilter(temparr);
  }, [filters]);

  useEffect(() => {
    dispatch(GET_TABLE_HEADER(api.tableHeaderApi));
  }, [showModal]);

  const handlePagination = (page) => {
    // check if selected checkbox is true then apply filter
    if (showFilter()) {
      applyFilter(page.selected + 1, showRows);
    } else {
      dispatch(GET_ALL_DATA(page.selected + 1, showRows, api.getApi));
      setCurrentPage(page.selected + 1);
    }
  };

  const handleselectedFilter = (data) => {
    var temp = [...selectedFilter];
    temp?.forEach((element) => {
      if (element.name === data.name) {
        element.value = data.value;
        element.apply = data.apply;
        element.filter = data.filter;
      }
    });
    setselectedFilter(temp);
  };

  const setCondition = (name, value) => {
    let afterAddEnum = selectedFilter?.map((el) => {
      if (el?.name === name) {
        el["filter"] = value;
      }
      return el;
    });
    setselectedFilter(afterAddEnum);
  };

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
    let payload = {
      offset,
      limit,
    };
    let search = [];
    // var temp = [...selectedFilter];
    for (let el of selectedFilter) {
      if (el?.apply) {
        search.push({
          field: el?.name,
          data: el?.value,
          filter: el?.filter || "IS",
        });
      }
    }
    if (search.length > 0) {
      payload["search"] = search;
    }

    dispatch(GET_ALL_DATA_FILTER(api.getApi, payload));
    setShowRows(10);
  };

  const ClearFilter = () => {
    setShowRows(10);
    dispatch(
      GET_ALL_DATA_FILTER(api.getApi, {
        offset: currentPage,
        limit: showRows,
      })
    );
    let temparr = [];
    filters.forEach((element) => {
      let tempobj = {
        name: element,
        value: "",
        apply: false,
      };
      temparr.push(tempobj);
    });
    setselectedFilter(temparr);
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
        selector: (row) => row[element],
        sortable: true,
        minWidth: 200,
        header: <AlignJustify />,
      };

      tempArry.push(temp);
    });

    return [
      {
        minWidth: 86,
        maxWidth: 86,
        style: {
          paddingLeft: "0",
        },
        cell: (row) => (
          <>
            <TablePhoneIcon />
            <div
              className="tableElement relative ml-1"
              onClick={() => calldetail(row._id)}
            >
              <TableElement />
              <p className="text-xs w-[90%] absolute top-0 flex justify-center text-white">
                Today
              </p>
            </div>
          </>
        ),
      },
      ...tempArry,
      {
        name: "Action",
        selector: "_id",
        sortable: true,
        minWidth: 200,
        cell: (row) => (
          <span
            role="button"
            onClick={() => {
              calldetail(row["_id"]);
            }}
            className="font-semibold text-[#191242]"
          >
            View
          </span>
        ),
      },

      {
        name: <HeaderFilterIcon />,
        maxWidth: 0,
      },
    ];
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

  const handleClose = () => {
    setshowModal(false);
  };

  const handleShowRows = (value) => {
    setShowRows(value);
    dispatch(GET_ALL_DATA(1, value, api.getApi));
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

  const handleCheckRows = (rows) => {
    dispatch(SELECT_CHECKBOX({ selectRow: rows, pagename: "test" }));
  };
  return (
    <>
      {form?.sections ? (
        <div className="w-full">
          <div className="flex justify-between items-center my-4">
            <div className="text-sm font-medium text-[#18181B]">
              Total Records{" "}
              <span className="text-sm font-semibold text-[#18181B]">
                {pagination?.total}
              </span>
            </div>
            <div className="w-6/12 flex justify-end items-center gap-4">
              <div className="border border-[#E4E4E7] rounded-2xl px-3 bg-white">
                <select
                  className="focus:outline-none pe-2 py-3 text-sm font-medium text-[#18181B]"
                  onChange={(e) => handleShowRows(e.target.value)}
                >
                  <option className="text-sm font-medium" value="10">
                    10 Records Per Page
                  </option>
                  <option className="text-sm font-medium" value="20">
                    20 Records Per Page
                  </option>
                  <option className="text-sm font-medium" value="50">
                    50 Records Per Page
                  </option>
                </select>
              </div>
              <button
                className="inline-flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
                onClick={() => {
                  setshowModal(true);
                }}
              >
                Filter Table columns
              </button>

              {CustomPagination()}
            </div>
          </div>
          <div className="flex justify-start items-start w-full  gap-5 overflow-y-auto">
            {filterSHow && (
              <div className="pl-1 pr-1 py-8 bg-white rounded-xl h-full col-span-2 w-[270px] min-w-[270px]">
                <div>
                  <div className="cardbodyMain px-3">
                    <div className="cardbody">
                      <div className="text-[#191242] font-medium mb-2">
                        Filter {getTitle(moduleName)} by
                      </div>
                      <div className="relative mb-2 flex justify-start items-center">
                        <div className="absolute left-3 top-3">
                          <SearchIcon className="w-5 h-5" />
                        </div>
                        <input
                          type="search"
                          className="border pl-11 border-[#E6E6EB] rounded-xl px-4 w-full py-2 focus:outline-none"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => {
                            // make first letter capital
                            let result = e.target.value.replace(
                              /(^\w{1})|(\s+\w{1})/g,
                              (letter) => letter.toUpperCase()
                            );
                            setSearch(result);
                          }}
                        />
                      </div>
                      <div className="overflow-y-auto h-[420px]">
                        {selectedFilter &&
                          selectedFilter
                            ?.filter(
                              (filter) => !hideFilterList.includes(filter.name)
                            )
                            ?.filter((filter) => filter.name.includes(search))
                            ?.map((filter, index) => {
                              return (
                                <div key={filter?.name} className="py-1">
                                  <div className="hover:bg-gray-50 flex gap-2 items-center">
                                    <input
                                      type="checkbox"
                                      value={filter.apply}
                                      checked={filter.apply}
                                      id={filter.name}
                                      onChange={(e) => {
                                        filter.apply = e.target.checked;
                                        handleselectedFilter(filter);
                                      }}
                                    />
                                    <label htmlFor={filter.name}>
                                      {getTitle(filter.name)}
                                    </label>
                                  </div>
                                  {filter.apply && (
                                    // add the text field and button on that click on that button it will filter the data
                                    <div className="pt-2 flex justify-start items-center">
                                      <input
                                        type="text"
                                        placeholder="Enter text"
                                        className="border p-1 rounded-md focus:outline-none w-full"
                                        value={filter.value}
                                        onChange={(e) => {
                                          filter.value = e.target.value;
                                          handleselectedFilter(filter);
                                        }}
                                      />
                                      <EnumFilter
                                        filter={filter?.filter}
                                        setCondition={setCondition}
                                        name={filter?.name}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  </div>
                </div>
                {showFilter() && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => {
                        applyFilter();
                      }}
                      className="w-full bg-primary rounded-2xl text-white p-2"
                    >
                      Apply Filter
                    </button>
                    <button
                      onClick={() => {
                        ClearFilter();
                      }}
                      className="w-full bg-white rounded-2xl text-primary p-2 border border-primary"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}

            <div
              // style={{ width: "85%" }}
              className={`bg-white ${filterSHow ? "w-[calc(100%-270px)]" : "w-full"
                } rounded-xl flex flex-col col-span-6 leads-table h-full`}
            >
              <DataTable
                noHeader={false}
                pagination={false}
                subHeader={false}
                responsive
                onRowClicked={(row) => {
                  calldetail(row._id);
                }}
                customStyles={customStyles}
                sortable={true}
                noDataComponent={
                  <div className="text-center">
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
            </div>
          </div>
        </div>
      ) : (
        <ModuleNotFound moduleName={moduleName} />
      )}
      {showModal && (
        <FilterTableModel
          show={showModal}
          handleClose={handleClose}
          moduleName={moduleName}
        />
      )}
    </>
  );
};
export default TableList;
