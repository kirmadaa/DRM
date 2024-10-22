import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../module";
import {
  GET_ALL_DATA,
  GET_FILTERS,
  GET_TABLE_HEADER,
  SET_LOADER,
  GET_ALL_DATA_FILTER,
  GET_FORM,
  RESET_STATE,
  SELECT_CHECKBOX,
} from "../../Redux/actions/user";
import ModuleNotFound from "../moduleNotFound";
import FilterTableModel from "../filterTableModel";
import { useNavigate } from "react-router-dom";
import { Edit } from "react-feather";
import { SearchIcon } from "../../assets/svgIcons";
import EnumFilter from "../enumFilter";
import CanvasView from "./card";
import PageLoader from "../pageLoader";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import FilterFieldFortable from "../FilterFieldFortable";
import { GET_FOMR_LAYOUT_BY_MODULE } from "../../Redux/actions/modules";

const getdefaultFilter = (name) => {
  return JSON.parse(localStorage.getItem("defaultFilter" + name));
};

const CanvasList = (props) => {
  const { moduleName, filterSHow } = props;
  const api = list[moduleName] || {};
  const [showRows, setShowRows] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedFilter, setselectedFilter] = useState(
    getdefaultFilter(moduleName) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setshowModal] = useState(false);
  const data = useSelector((state) => state.user.data);
  // const pagination = useSelector((state) => state.user.pagination);
  const filters = useSelector((state) => state.user.filters);
  const [selectedItems, setSelectedItems] = useState([]);
  const form = useSelector((state) => state.user.form);
  const [selectedId, setSelectedId] = useState([]);
  const pagination = useSelector((state) => state.user.pagination);
  const loading = useSelector((state) => state.user.loading);
  const [formbyModuleNameState, setFormbyModuleNameState] = useState({});
  const formbyModuleName = useSelector(
    (state) => state?.ModulesReducer?.formbyModuleName
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const filterData = () => {
  //   let temparr = [];
  //   filters.forEach((element) => {
  //     let tempobj = {
  //       name: element,
  //       value: "",
  //       apply: false,
  //     };
  //     temparr.push(tempobj);
  //   });
  //   setselectedFilter(temparr);
  // };

  const getData = () => {
    dispatch(RESET_STATE());
    SET_LOADER(true);
    let promisAll = [];
    dispatch(GET_FORM(api.formApi));
    promisAll.push(dispatch(GET_TABLE_HEADER(api.tableHeaderApi)));
    promisAll.push(dispatch(GET_FILTERS(api.filterApi)));
    Promise.all(promisAll).then(() => {});
    SET_LOADER(false);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  useEffect(() => {
    // {
    //   filter: "IS",
    //   name: "Created time",
    //   value: "",
    //   apply: false,
    //   type: "date",
    // },
    // {
    //   filter: "IS",
    //   name: "Modified time",

    //   value: "",
    //   apply: false,
    //   type: "date",
    // },
    let sidefilterUpdate = [];
    // let temparr = [];
    const data = filters.filter(
      (item) =>
        item === "CreatedBy" ||
        item === "createdTime" ||
        item === "updatedTime" ||
        item === "ModifiedBy"
    );

    const newData = (
      moduleName === "Opportunities" ||
      moduleName === "Accounts" ||
      moduleName === "Leads" ||
      moduleName === "Contacts" ||
      moduleName === "Inventory" ||
      moduleName === "SalesOrder" ||
      // moduleName === "PurchaseOrder" ||
      //moduleName === "Invoice" ||
      moduleName === "Vendor"
        ? [...data, "lastActivityTime"]
        : [...data]
    ).map((item) => ({
      id: item,
      placeholder: item,
      FieldName: item,
      label: item,
      name: item,
      value: item,
      type: item === "CreatedBy" || item === "ModifiedBy" ? "Owner" : "date",
    }));

    const newFormbyModuleName = {
      ...formbyModuleName,
      formData: formbyModuleName?.formData.map((item) => ({
        ...item,
        sections: [
          ...item?.sections.map((ele, index) => ({
            ...ele,
            inputs:
              index === 0
                ? {
                    ...ele?.inputs,
                    ...newData.reduce((a, v) => ({ ...a, [v.id]: v }), {}),
                  }
                : { ...ele.inputs },
          })),
        ],
      })),
    };

    if (newFormbyModuleName?.formData?.length > 0) {
      for (let item of newFormbyModuleName?.formData[0]?.sections) {
        // item?.inputs = [...item?.inputs, ...newData]
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
    setFormbyModuleNameState(newFormbyModuleName);
    if (sidefilterUpdate?.length > 0) {
      setselectedFilter(sidefilterUpdate);
    }
    // console.log("formbyModuleName===>", formbyModuleName);
  }, [formbyModuleName]);

  // useEffect(() => {
  //   if (selectedFilter?.length === 0) {
  //     filterData();
  //   }
  // }, [filters]);

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
  const handleselectedFilter = (data) => {
    var temp = [...selectedFilter];
    let getValue = temp.filter((item, index) => item.apply == true);
    if (getValue.length > 0) {
      temp?.forEach((element) => {
        if (element.name === data.name) {
          element.value = data.value;
          element.apply = data.apply;
          element.filter = data?.filter;
        }
      });
      // console.log(temp);
      setselectedFilter(temp);
    } else {
      //alert("handleselectedFilter")
      ClearFilter();
    }
  };

  const calldetail = (_id, name) => {
    // console.log('sdsdhsdhjs',_id)
    //navigate(api.detialUrl + _id);

    // alert(firstName + LastName)
    navigate(api.detialUrl + _id + "/?fullName=" + name);
    // navigate(api.detialUrl + _id);
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

  const applyFilter = (offset = 1, limit = 10) => {
    let payload = {
      offset,
      limit,
      buttonType: "All",
    };
    let search = [];
    // var temp = [...selectedFilter];
    for (let el of selectedFilter) {
      if (el?.apply) {
        search.push({
          field: el?.name,
          data: el?.value,
          filter: el?.filter || "IS",
          type: el?.type || "text",
        });
      }
    }
    if (search.length > 0) {
      payload["search"] = search;
    }

    if (search.length > 0) {
      payload["search"] = search;
    }

    dispatch(GET_ALL_DATA_FILTER(api.getApi, payload));
    setShowRows(10);
  };

  const ClearFilter = async () => {
    setShowRows(10);
    dispatch(
      GET_ALL_DATA_FILTER(api.getApi, {
        offset: currentPage,
        limit: showRows,
      })
    );
    await SET_LOADER(true);
    await dispatch(GET_FOMR_LAYOUT_BY_MODULE(1, 100, moduleName));
    await SET_LOADER(false);
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

  const handleClose = () => {
    setshowModal(false);
  };

  useEffect(() => {
    if (selectedFilter?.length > 0) {
      const debounceTimer = setTimeout(() => {
        localStorage.setItem(
          "defaultFilter" + moduleName,
          JSON.stringify(selectedFilter)
        );
        applyFilter(currentPage, showRows);
      }, 2000);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [selectedFilter]);

  const handleCheckRow = (checked, row) => {
    let rows = {};
    let ids = [];
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

  const CustomPagination = () => {
    const count = Number(Math.ceil(pagination?.total / showRows));

    const handleShowRows = (value) => {
      localStorage.setItem(`${moduleName}-pagelimit`, value);
      GET_ALL_DATA_FILTER(api.getApi, {
        offset: currentPage,
        limit: showRows,
      });
      setShowRows(value);
    };

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
    localStorage.setItem(`${moduleName}-pagelimit`, value);
    GET_ALL_DATA_FILTER(api.getApi, {
      offset: currentPage,
      limit: showRows,
    });
    setShowRows(value);
  };
  if (loading) {
    return <PageLoader title="Loading" />;
  }
  return (
    <>
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
              value={showRows}
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
      {form?.sections ? (
        <div className="w-full">
          <div className="mt-4 flex justify-start items-start w-full  gap-5 overflow-y-auto">
            {filterSHow && (
              <div className="pl-1 pr-1 py-8 bg-white rounded-xl h-full col-span-2 w-[270px] min-w-[270px]">
                <div>
                  <div className="cardbodyMain px-3">
                    <div className="cardbody">
                      <div className="text-[#191242] font-medium mb-2">
                        Filter {moduleName} by
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
                        {/* {console.log("selectedFilter===>",hideFilterList selectedFilter)} */}
                        {selectedFilter
                          ?.filter((item) => !hideFilterList?.includes(item))
                          ?.map((filter, index) => {
                            return (
                              <div
                                key={String(filter?.name + index)}
                                className="py-1"
                              >
                                <div className="w-full hover:bg-gray-50 flex justify-between gap-2 items-center">
                                  <div className="flex justify-between items-center ">
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
                                    <label
                                      className="text-xs"
                                      htmlFor={filter.name}
                                    >
                                      {getTitle(
                                        "lastActivityTime" === filter.name
                                          ? "lastActivity"
                                          : filter.name
                                      )}
                                    </label>
                                  </div>
                                  {filter.apply && (
                                    <EnumFilter
                                      typeIs={filter?.type}
                                      filter={filter?.filter}
                                      setCondition={setCondition}
                                      name={filter?.name}
                                    />
                                  )}
                                </div>
                                {filter.apply && (
                                  <div className="px-2 pt-2 flex justify-start items-center">
                                    <FilterFieldFortable
                                      filter={filter}
                                      selectedFilter={selectedFilter}
                                      setselectedFilter={setselectedFilter}
                                      modulename={moduleName}
                                      formbyModuleName={formbyModuleNameState}
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
                    <div className="w-32 py-1 px-4 ">
                      <span>{moduleName}</span>
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
                        `/crm/canvas/view/${moduleName}?listingPath=/crm/accounts`
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
                      sections={form?.sections}
                      isSelected={selectedId?.includes(item?._id)}
                      handleCheckRow={handleCheckRow}
                      onRowClicked={(e) => {
                        //calldetail(item?._id);
                        let name = "";
                        if (moduleName == "Leads" || moduleName == "Contacts") {
                          name =
                            (item?.FirstName ? item?.FirstName : "N/A") +
                            " " +
                            (item?.LastName ? item?.LastName : "N/A");
                          calldetail(item._id, name);
                        } else if (moduleName == "Accounts") {
                          name = item?.AccountName;
                          calldetail(item._id, name);
                        } else if (moduleName == "Opportunities") {
                          name = item?.OpportunityName;
                          calldetail(item._id, name);
                        } else if (moduleName == "Inventory") {
                          name = item?.InventoryName;
                          calldetail(item._id, name);
                        } else if (moduleName == "SalesOrder") {
                          name = item?.SalesOrderName;
                          calldetail(item._id, name);
                          // } else if (moduleName == "PurchaseOrder") {
                          //   name = item?.PurchaseOrderName;
                          //   calldetail(item._id, name);
                          // } else if (moduleName == "Invoice") {
                          //   name = item?.InvoiceName;
                          //   calldetail(item._id, name);
                        } else if (moduleName == "Vendor") {
                          name = item?.VendorName;
                          calldetail(item._id, name);
                        } else if (
                          moduleName == "Tasks" ||
                          moduleName == "Calls" ||
                          moduleName == "Meeting"
                        ) {
                          name = item?.Subject;
                          calldetail(item._id, name);
                        } else if (moduleName == "channelPartner") {
                          name = item?.ChannerPartnerName;
                          calldetail(item._id, name);
                          // } else if (moduleName == "Vendor") {
                          //   name = item?.VendorName;
                          //   calldetail(item._id, name);
                          // } else if (moduleName == "Inventory") {
                          //   name = item?.InventoryName;
                          //   calldetail(item._id, name);
                          //
                        } else if (moduleName == "siteVisit") {
                          name = item?.Title;
                          calldetail(item._id, name);
                        } else {
                          name = item?.Subject;
                          calldetail(item._id, name);
                        }
                      }}
                      key={item?._id}
                      modulename={moduleName}
                      itemInfo={item}
                    />
                  );
                })}
              </div>
            ) : (
              <PageLoader title="Loading" />
            )}
          </div>
        </div>
      ) : loading ? (
        <PageLoader title="Loading" />
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
// export default memo(CanvasList);
export default CanvasList;
const hideFilterList = [
  // "ContactName",
  // "AccountName",
  // "ModuleTitle",
  // // "createdTime",
  // // "updatedTime",
  // "tuch",
  "createdBy",
  "deletedAt",
  "0",
  "_id",
  "tuch",
  // "Owner",
  "NoteOwnerId",
  "organizationId",
  "Id",
  "id",
  "connectionId",
  "connectionId",
  // "ModifiedBy",
  "id",
  "templateOwner",
  "meetingHostId",
  "_id",
  "organizationId",
  "CreatedBy",
  "read",
  "Pipeline",
  "Stage",
  "Lookup",
  "file",
  "File",
  "Lookup1",
];
