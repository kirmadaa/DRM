import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import QuotesSubHeader from "./QuotesSubHeader";
import {
  GET_ALL_DATA_QUOTES,
  GET_FILTERS_SaleOrder,
  GET_ALL_DATA_FILTER_QUOTES,
  RESET_STATE_SaleOrder,
} from "../../../Redux/actions/quotes";
import EnumFilter from "../../../Components/enumFilter";
import { SearchIcon } from "../../../assets/svgIcons";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
} from "feather-icons-react/build/IconComponents";
import { SELECT_CHECKBOX } from "../../../Redux/actions/user";
import CanvasView from "../../../Components/canvasview/card";
import { useNavigate } from "react-router-dom";

const moduleName = "quotes";

const getdefaultFilter = () => {
  return JSON.parse(localStorage.getItem("defaultFilter-quotes"));
};

const CanvasList = (props) => {
  const navigate = useNavigate();
  const [showRows, setShowRows] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedFilter, setselectedFilter] = useState(
    getdefaultFilter() || []
  );
  const [currentPage, setCurrentPage] = useState(1);

  // setp 1
  const data = useSelector((state) => state.Quotes.List);
  const pagination = useSelector((state) => state.Quotes.pagination);
  let tableHeader = useSelector((state) => state.Quotes.tableHeader) || [];
  const filters = useSelector((state) => state.Quotes.Filters);
  const sideBar = useSelector((state) => state.sideBarReducer.sideBar);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  // setp 2 for filter
  const hideFilterList = [
    "ModuleTitle",
    "createdTime",
    "updatedTime",
    "tuch",
    "deletedAt",
    "0",
    "_id",
    "organizationId",
    "salesOrderOwnerId",
    "organizationId",
    "connectionId",
    "ModifiedBy",
    "id",
  ];
  const dispatch = useDispatch();
  // setp 2

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
    dispatch(GET_FILTERS_SaleOrder());
    dispatch(
      GET_ALL_DATA_FILTER_QUOTES({
        offset: 1,
        limit: 10,
      })
    );
  }, [dispatch]);

  const filterData = () => {
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

  useEffect(() => {
    if (selectedFilter?.length === 0) {
      filterData();
    }
  }, [filters]);

  const handlePagination = (page) => {
    // check if selected checkbox is true then apply filter
    if (showFilter()) {
      applyFilter(page.selected + 1, showRows);
    } else {
      dispatch(GET_ALL_DATA_QUOTES(page.selected + 1, showRows));
      setCurrentPage(page.selected + 1);
    }
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

  const handleselectedFilter = (data) => {
    var temp = [...selectedFilter];
    temp?.forEach((element) => {
      if (element.name === data.name) {
        element.value = data.value;
        element.apply = data.apply;
      }
    });
    setselectedFilter(temp);
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
          filter: "IS",
        });
      }
    }
    if (search.length > 0) {
      payload["search"] = search;
    }

    dispatch(GET_ALL_DATA_FILTER_QUOTES(payload));
    setShowRows(10);
  };

  useEffect(() => {
    if (selectedFilter?.length > 0) {
      const debounceTimer = setTimeout(() => {
        localStorage.setItem(
          "defaultFilter-quotes",
          JSON.stringify(selectedFilter)
        );
        // applyFilter(currentPage, showRows)
      }, 2000);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [selectedFilter]);

  const ClearFilter = () => {
    setShowRows(10);
    let payload = {
      offset: currentPage,
      limit: showRows,
    };
    dispatch(GET_ALL_DATA_FILTER_QUOTES(payload));
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

  const handleShowRows = (value) => {
    setShowRows(value);
    dispatch(GET_ALL_DATA_QUOTES(1, value));
  };

  const SelectAllRows = (e) => {
    let { checked } = e.target;
    let rows = {};
    let ids = [];
    if (checked) {
      rows = {
        allSelected: true,
        selectedCount: data?.length,
        selectedRows: data,
      };
      for (let el of data) {
        ids.push(el?._id);
      }
      setSelectedItems(data);
      setSelectedId(ids);
    } else {
      rows = {
        allSelected: false,
        selectedCount: 0,
        selectedRows: [],
      };
      setSelectedItems([]);
      setSelectedId([]);
    }
    dispatch(SELECT_CHECKBOX({ selectRow: rows, pagename: "lead" }));
    dispatch({ type: "SET_CHECKBOX_OF_LISTING_DATA", rows });
  };

  const handleCheckRow = (checked, row) => {
    let rows = {};
    let ids = [];
    // console.log(checked, row)
    let rm = selectedItems?.filter((it) => it?._id !== row?._id);
    if (checked) {
      rows = {
        allSelected: false,
        selectedCount: rm?.length,
        selectedRows: rm,
      };
    } else {
      rows = {
        allSelected: false,
        selectedCount: 1,
        selectedRows: [...rm, row],
      };
    }
    for (let el of rows["selectedRows"]) {
      ids.push(el?._id);
    }
    setSelectedItems(rows["selectedRows"]);
    setSelectedId(ids);
    dispatch(SELECT_CHECKBOX({ selectRow: rows, pagename: "lead" }));
    dispatch({ type: "SET_CHECKBOX_OF_LISTING_DATA", data: rows });
  };

  return (
    <>
      <QuotesSubHeader />
      <div className="flex gap-3 items-center  flex-col w-full">
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
                  <option className="text-sm font-medium" value="100">
                    100 Records Per Page
                  </option>
                </select>
              </div>
              {CustomPagination()}
            </div>
          </div>
          <div className="flex justify-start items-start w-full  gap-5 overflow-y-auto">
            {sideBar && (
              <div className="pl-1 pr-1 py-8 bg-white rounded-xl h-full col-span-3 xl:col-span-2 w-[270px] min-w-[270px] ">
                <div>
                  <div className="cardbodyMain px-3">
                    <div className="cardbody">
                      <div className="text-[#191242] font-medium mb-2">
                        Filter by
                      </div>
                      <div className="">
                        <div className="absolute left-3 top-3">
                          <SearchIcon className="w-5 h-5" />
                        </div>
                        <input
                          type="search"
                          className="border border-[#E6E6EB] mb-6 rounded-xl px-4 w-full py-2 focus:outline-none"
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
                      <div
                        className={`overflow-y-auto ${showFilter()
                            ? "h-[calc(100vh-549px)]"
                            : "h-[calc(100vh-495px)]"
                          } -mr-4 `}
                      >
                        {selectedFilter &&
                          selectedFilter
                            ?.filter(
                              (filter) => !hideFilterList.includes(filter.name)
                            )
                            ?.filter((filter) => filter.name.includes(search))
                            ?.map((filter, index) => {
                              return (
                                <div key={filter?.name}>
                                  <div className="hover:bg-gray-50 flex gap-2 items-center">
                                    <div>
                                      <input
                                        type="checkbox"
                                        className="mr-4"
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
                      class
                      className="w-full bg-white rounded-2xl text-primary p-2 border border-primary"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}

            {data?.length > 0 ? (
              <div className="bg-[#ebedf0] rounded-t-2xl relative w-full overflow-hidden ">
                <div className="flex justify-between items-center py-3">
                  <div className="flex justify-start items-center">
                    <div className=" w-32  py-1 px-4 border-r border-gray-400">
                      <input
                        onChange={SelectAllRows}
                        checked={selectedId?.length}
                        id="userselect-checkbox"
                        type="checkbox"
                        className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="py-1 px-4 ">
                      <span>Purchese Order info</span>
                    </div>
                  </div>
                  <div
                    role="button"
                    onClick={() => {
                      localStorage.setItem(
                        "canvas-" + moduleName,
                        JSON.stringify(data[0])
                      );
                      navigate(
                        `/crm/canvas/view/${moduleName}?listingPath=/crm/quotes/quotes-canvas-list`
                      );
                    }}
                    className="py-1 flex justify-start items-center px-4"
                  >
                    <Edit className="mx-2 text-gray-600" />
                    <span>Canvas view</span>
                  </div>
                </div>
                {data?.map((item) => {
                  return (
                    <CanvasView
                      isSelected={selectedId?.includes(item?._id)}
                      handleCheckRow={handleCheckRow}
                      key={item?._id}
                      modulename={moduleName}
                      itemInfo={item}
                    />
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CanvasList;
