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
import { GET_FOMR_LAYOUT_BY_MODULE } from "../Redux/actions/modules";

import ModuleNotFound from "../Components/moduleNotFound";
import FilterTableModel from "../Components/filterTableModel";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, AlignJustify } from "react-feather";
import {
  SearchIcon,
  TableCheckIcon,
  TablePhoneIcon,
  Arrowdowns,
} from "../assets/svgIcons";
import EnumFilter from "../Components/enumFilter";
import moment from "moment";
import PageLoader from "./pageLoader";
import { styled } from "styled-components";
import FilterFieldFortable from "./FilterFieldFortable";
import { getValueOfItemTypeIsSelect } from "../utility/serviceMethod";

const TableMain = styled.div`
  .epRaQS {
    ${({ data }) =>
    data?.length === 0 &&
    `height: 100%;
display: flex;
align-items: center;`}
  }
`;
const getdefaultFilter = (name) => {
  return JSON.parse(localStorage.getItem("defaultFilter" + name));
};

const TableList = (props) => {
  const { moduleName, formTitle } = props;
  const api = list[moduleName] || {};
  const formbyModuleName = useSelector(
    (state) => state?.ModulesReducer?.formbyModuleName
  );
  const [showRows, setShowRows] = useState(
    localStorage.getItem(`pagelimit`) || 10
  );
  const [search, setSearch] = useState("");
  const [formbyModuleNameState, setFormbyModuleNameState] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFilter, setselectedFilter] = useState(
    getdefaultFilter(moduleName) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const data = useSelector((state) => state.user.data);
  const filter = useSelector((state) => state.commanvar.filter);
  const pagination = useSelector((state) => state.user.pagination);
  let tableHeader = useSelector((state) => state.user.tableHeader) || [];
  const filters = useSelector((state) => state.user.filters);
  const form = useSelector((state) => state.user.form);
  const loading = useSelector((state) => state.user.loading);
  const sideBar = useSelector((state) => state.sideBarReducer.sideBar);

  const getData = () => {
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
          buttonType: filter == "All" ? filter : "All",
        })
      )
    );
    Promise.all(promisAll).then(() => { });

    SET_LOADER(false);
  };

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
        moduleName === "Contacts"
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
          console.log("inputInfo===>", inputInfo)
          if (inputInfo?.value?.includes("owner")) {
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
              type: inputInfo?.value?.toLowerCase()?.includes("lookup")
                ? "lookup"
                : inputInfo?.type,
            });
          }
        }
      }
    }
    console.log("newFormbyModuleName===>", sidefilterUpdate, newFormbyModuleName);
    setFormbyModuleNameState(newFormbyModuleName);
    if (sidefilterUpdate?.length > 0) {
      console.log("sidefilterUpdate", sidefilterUpdate);
      let flt = sidefilterUpdate.filter(
        (item) => item.name != "lastActivityTime"
      );
      setselectedFilter(flt);
    }
    // console.log("formbyModuleName===>", formbyModuleName);
  }, [formbyModuleName]);

  useEffect(() => {
    getData();
  }, [dispatch, filter]);

  const handlePagination = (page) => {
    applyFilter(page.selected + 1, showRows);
    setCurrentPage(page.selected + 1);
  };

  const handleselectedFilter = (data) => {
    var temp = [...selectedFilter];

    let getValue = temp.filter((item, index) => item.apply == true);
    if (getValue?.length > 0) {
      temp?.forEach((element) => {
        if (element.name === data.name) {
          element.value = data.value;
          element.apply = data.apply;
          element.filter = data?.filter;
        }
      });
      setselectedFilter(temp);
    } else {
      ClearFilter();
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

  // console.log(selectedFilter)
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
  // console.log(selectedFilter)
  const applyFilter = (offset = 1, limit = showRows) => {
    let payload = {
      offset,
      limit,
      buttonType: "All",
    };
    let search = [];
    // var temp = [...selectedFilter];
    for (let el of selectedFilter) {
      // console.log(el, "--->>>el console");
      if (el?.apply) {
        if (el?.name === "Owner") {
          search.push({
            field: `${moduleName}${el?.name}Id`,
            data: el?.value,
            filter: el?.filter,
            type: el?.type,
          });
        } else {
          search.push({
            field: el?.name,
            data: el?.value,
            filter: el?.filter ? el?.filter : "IS",
            type: el?.type ? el?.type : "text",
          });
        }
      }
    }
    if (search?.length > 0) {
      payload["search"] = search;
    }
    // console.log("payloadpayload", payload, "==>", selectedFilter);
    dispatch(GET_ALL_DATA_FILTER(api.getApi, payload));
    SET_LOADER(false);
    setShowRows(10);
  };

  const ClearFilter = async () => {
    console.log("before", filters);
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
    // console.log("value===>", value);
    if (typeof value !== "object") {
      // console.log("value==444=>", value);

      let titleis = value
        ?.replace(/([A-Z])/g, " $1")
        ?.replace(/^./, function (str) {
          return str.toUpperCase();
        });
      return titleis?.replace(/_/g, "");
    }
  };

  useEffect(() => {
    if (selectedFilter?.length > 0) {
      const debounceTimer = setTimeout(() => {
        localStorage.setItem(
          "defaultFilter" + moduleName,
          JSON.stringify(selectedFilter)
        );
      }, 2000);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [selectedFilter]);
  const mobuleType = ["Opportunities", "Accounts", "Contacts", "Leads"];
  const renderTabel = () => {
    let tempArry = [];
    // let newarray = tableHeader?.filter(
    //   (item) => !hideFilterList?.includes(item)
    // );
    console.log("newarraynewarray", tableHeader);
    // return;
    tableHeader
      ?.filter((item) => !hideFilterList?.includes(item))
      ?.forEach((element) => {
        if (element) {
          let temp = {};
          temp = {
            name: getTitle(element),
            selector: (row) => {
              console.log("rowrowrow===>", row, element);
              const formatDate = (date) => moment(date).format("DD-MM-YYYY HH:mm:ss") === "Invalid date" ? "" : moment(date).format("DD-MM-YYYY HH:mm:ss");
              const formatDateWithoutTime = (date) => moment(date).format("DD-MM-YYYY") === "Invalid date" ? "" : moment(date).format("DD-MM-YYYY");

              const dateElementsWithTime = [
                "createdTime", "start_date", "end_date",
                "SiteVisitEndTime", "SiteVisitStartTime",
                "MeetingEndTime", "MeetingStartTime", "updatedTime",
                "ClosedTime", "From", "To", "CallEndTime", "CallStartTime", "ClosingDate"
              ];

              const dateElementsWithoutTime = [
                "DueDate", "ExpectedClosingDate", "QuoteDate", "InvoiceDate", "SalesOrderDate", "LOIDate", "ValidUntil", "Golive", "ActualClosureDate", "AgrrementDate", "FacilityHandoverDate", "ExpectedGo-LiveDate",
                "CentreGoliveDate", "CentreLockinExpiryDate", "CentreFitoutStartDate",
                "ExpectedPayment", "ProposedAvailability", "NextPaymentDate",
                "PaymentRealisation", "CentreLeaseAgreementDate"
              ];

              if (dateElementsWithTime.includes(element)) {
                return formatDate(row[element]);
              } else if (dateElementsWithoutTime.includes(element)) {
                return formatDateWithoutTime(row[element]);
              }

              const customElements = {
                // "LeadType": row?.LeadType,
                // "LeadStatus": () => moduleName === "Accounts" ? row?.stageData?.stageTitle : row?.LeadStatus,
                "Stage": () => row?.stageData?.stageTitle,
                "Pipeline": () => row?.pipelineData?.pipelineTitle,
                "Host": () => row?.hostData?.firstName ? row?.hostData?.firstName + ' ' + row?.hostData?.lastName : row?.Host,
                "ChannelPartnerName": () => row?.channelPartnerData?.ChannelPartnerName || row?.ChannelPartnerName,
                "ProposedInventory": () =>

                  (row?.contactData && row?.contactData.length > 0)
                    ? `${row?.contactData[0]?.InventoryName} `
                    : row?.ProposedInventory,

                "ContactName": () =>
                  row?.ContactData?.length > 0
                    ? row?.ContactData[0]?.Company ? row?.ContactData[0]?.Company :
                      `${row?.ContactData[0]?.FirstName} ${row?.ContactData[0]?.LastName}`
                    : (row?.contactData && row?.contactData?.length > 0)
                      ? `${row?.contactData[0]?.FirstName} ${row?.contactData[0]?.LastName}`
                      : row?.ContactName,

                "RelatedTo": () => {
                  if (row?.accountData && row?.accountData.length > 0) {
                    return row?.accountData[0]?.LastName ? `${row?.accountData[0]?.FirstName} ${row?.accountData[0]?.LastName}` : row.accountData[0]?.Company ? row.accountData[0]?.Company : row?.accountData[0]?.AccountName;
                  }
                  else if (row?.accountData1 && row?.accountData1.length > 0) {
                    return row?.accountData1[0]?.LastName ? `${row?.accountData1[0]?.FirstName} ${row?.accountData1[0]?.LastName}` : row.accountData1[0]?.Company ? row.accountData1[0]?.Company : row?.accountData1[0]?.AccountName;
                  } else if (row?.accountData2 && row?.accountData2.length > 0) {
                    return row.accountData2[0]?.OpportunityName ? row.accountData2[0]?.OpportunityName : row?.accountData2[0]?.LastName ? `${row?.accountData2[0]?.FirstName} ${row?.accountData2[0]?.LastName}` : row?.accountData2[0]?.AccountName;
                  } else if (row?.accountData3 && row?.accountData3.length > 0) {
                    return row?.accountData3[0]?.LastName ? `${row?.accountData3[0]?.FirstName} ${row?.accountData3[0]?.LastName}` : row.accountData3[0]?.Company ? row.accountData3[0]?.Company : row?.accountData3[0]?.AccountName;
                  }
                  else {
                    return row?.RelatedTo
                  }
                },

                "AccountName": () => {
                  if (row?.accountData && row.accountData?.AccountName) {
                    return row.accountData?.AccountName ? row.accountData?.AccountName : row.accountData?.Company;
                  } else if (row?.AccountData?.length > 0) {
                    return row.AccountData[0]?.Company ? row.AccountData[0]?.Company : row.AccountData[0]?.AccountName;
                  } else {
                    return row?.AccountName;
                  }
                },
                "OpportunityName": () => {
                  if (row?.OpportunitiesData) {
                    return row.OpportunitiesData[0]?.OpportunityName;
                  } else if (row?.OpportunitiesData?.length > 0) {
                    return row.OpportunitiesData[0]?.OpportunityName;
                  } else {
                    return row?.OpportunityName ? row?.OpportunityName : row?.OpportunityName;
                  }
                },
                "CentreName": () => {
                  if (row?.OpportunitiesData) {
                    return row.OpportunitiesData[0]?.OpportunityName;
                  } else if (row?.OpportunitiesData?.length > 0) {
                    return row.OpportunitiesData[0]?.OpportunityName;
                  } else {
                    return row?.CentreName ? row?.CentreName : null;
                  }
                },
                "OccupantName": () => {
                  if (row?.AccountData) {
                    return row.AccountData[0]?.AccountName ? row.AccountData[0]?.AccountName : row.AccountData[0]?.Company;
                  } else if (row?.AccountData?.length > 0) {
                    return row.AccountData[0]?.AccountName ? row.AccountData[0]?.AccountName : row.AccountData[0]?.Company;
                  } else {
                    return row?.OccupantName ? row?.OccupantName : row?.AccountName ? row?.AccountName : row?.Company;
                  }
                },
                "AgreementSubject": () => {
                  if (row?.SaleOrdersData) {
                    return row.SaleOrdersData[0]?.Subject;
                  } else if (row?.SaleOrdersData?.length > 0) {
                    return row.SaleOrdersData[0]?.Subject;
                  } else {
                    return row?.AgreementSubject ? row?.AgreementSubject : row?.Subject
                  }
                },
                "CompanyName": () => {
                  if (row?.AccountData) {
                    return row.AccountData[0]?.AccountName ? row.AccountData[0]?.AccountName : row.AccountData[0]?.Company;
                  } else if (row?.AccountData?.length > 0) {
                    return row.AccountData[0]?.AccountName ? row.AccountData[0]?.AccountName : row.AccountData[0]?.Company;
                  } else {
                    return row?.CompanyName ? row?.CompanyName : row?.AccountName;
                  }
                },
                "CPCompanyName": () => {
                  if (row?.AccountData?.length > 0) {
                    return row.AccountData[0]?.AccountName ? row.AccountData[0]?.AccountName : row?.CPCompanyName;
                  } else if (row?.AccountData?.length > 0) {
                    return row.AccountData[0]?.Company;
                  } else {
                    return row?.CPCompanyName ? row?.CPCompanyName : row?.AccountName;
                  }
                },
              };

              if (customElements[element]) {
                return customElements[element]();
              } else {
                return getValueOfItemTypeIsSelect(form?.sections, element === "TeamSize" ? "" : element, row[element]);

              }

            },

            // selector: (row) => {
            //   console.log("row==ncnc=> ", row[element]);
            //   if (element === "createdTime" || element === "start_date" || element ==="end_date" || element ==="AgrrementDate" || element ==="FacilityHandoverDate" || element ==="Golive" || element ==="LOIDate" || element ==="SiteVisitEndTime" || element ==="SiteVisitStartTime" || element ==="SalesOrderDate" || element ==="ValidUntil" || element ==="MeetingEndTime" || element ==="MeetingStartTime" || element ==="QuoteDate" || element === "InvoiceDate") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "updatedTime") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "DueDate") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY");
            //   } else if (element === "ClosedTime") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "From") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "To") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "CallEndTime") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "CallStartTime") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "ExpectedClosingDate") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY");
            //   } else if (element === "ActualClosureDate") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY");
            //   } else if (element === "ClosingDate") {
            //     return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //       "Invalid date"
            //       ? ""
            //       : moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
            //   } else if (element === "ExpectedGo-LiveDate") {
            //     if (row[element] != "") {
            //       return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //         "Invalid date"
            //         ? ""
            //         : moment(row[element]).format("DD-MM-YYYY");
            //     }
            //   } else if (element === "CentreGoliveDate" || element === "CentreLockinExpiryDate" || element === "CentreFitoutStartDate" || element === "ExpectedPayment" || element ==="ProposedAvailability" || element ==="NextPaymentDate" || element === "PaymentRealisation" || element === "CentreLeaseAgreementDate") {
            //     if (row[element] != "") {
            //       return moment(row[element]).format("DD-MM-YYYY HH:mm:ss") ==
            //         "Invalid date"
            //         ? ""
            //         : moment(row[element]).format("DD-MM-YYYY");
            //     }
            //   } else {
            //   }
            //   console.log("form?.sections=====><", form?.sections);
            //   console.log("element=====><", element);
            //   console.log("row[element]=====><", row[element]);
            //   if (moduleName == "Accounts" && element == "LeadStatus") {
            //     return row?.stageData?.stageTitle;
            //   }
            //   if (element == "Stage" || element == "Stage") {
            //     return row?.stageData?.stageTitle;
            //   }
            //   if (element == "Pipeline" || element == "pipeline") {
            //     return row?.pipelineData?.pipelineTitle;
            //   }
            //   if (element == "ChannelPartnerName" || element == "ChannelPartnerName") {
            //     return row?.channelPartnerData?.ChannelPartnerName ? row?.channelPartnerData?.ChannelPartnerName : row?.ChannelPartnerName;
            //   }
            //   // channelPartnerData ChannelPartnerName
            //   if (
            //     row?.ContactData &&
            //     row?.ContactData?.length > 0 &&
            //     (element == "ContactName" || element == "ContactName")
            //   ) {
            //     return row?.ContactData[0]?.Company;
            //   }
            //   if (
            //     row?.contactData &&
            //     (element == "ContactName" || element == "ContactName")
            //   ) {
            //     return (
            //       row?.contactData ? row?.contactData?.FirstName + " " + row?.contactData?.LastName : row?.ContactName
            //     );
            //   }
            //   if (row && (element == "RelatedTo" || element == "RelatedTo")) {
            //     return row?.FirstName ? row?.FirstName + " " + row?.LastName : row?.RelatedTo;
            //   }
            //   if (
            //     row?.accountData &&
            //     (element == "AccountName" || element == "AccountName")
            //   ) {
            //     return row?.accountData ? row?.accountData?.AccountName : row?.AccountName
            //   }
            //   if (
            //     row?.AccountData &&
            //     row?.ContactData?.length > 0 &&
            //     (element == "AccountName" || element == "AccountName")
            //   ) {
            //     return row?.AccountData[0]?.Company;
            //   } else {
            //     return getValueOfItemTypeIsSelect(
            //       form?.sections,
            //       element == "TeamSize" ? "" : element,
            //       row[element]
            //     );
            //   }
            // },
            keyname: element,
            minWidth: "200px",
            sortable: true,
            header: <AlignJustify />,
          };
          tempArry.push(temp);
        }
      });
    // console.log("tempArry=oo==>", tempArry);
    return [
      mobuleType?.includes(moduleName) && {
        minWidth: "150px",
        maxWidth: "150px",
        sortable: true,
        style: {
          paddingLeft: "0",
        },
        cell: (row) => {
          var date1 = moment(new Date());
          var date2 = row?.tasksData
            ? moment(row?.tasksData[0]?.DueDate || new Date())
            : moment(new Date());
          var diff = date2.diff(date1, "days");
          var dateCall2 = row?.callsData
            ? moment(row?.callsData[0]?.DueDate || new Date())
            : moment(new Date());
          var diffCall = dateCall2.diff(date1, "days");
          return (
            <div>
              {row?.callsData?.length !== 0 && (
                <div className="flex " key={String(row?._id)}>
                  <TablePhoneIcon />
                  <div
                    className={` pr-4 tableElement  relative  ${diffCall < 0
                      ? "bg-[#F14949]"
                      : diffCall === 0
                        ? "bg-[#FC9F00]"
                        : "bg-[#12aa67]"
                      }   ml-1`}
                    onClick={() => {
                      //calldetail(row._id)
                      let name = "";
                      if (moduleName == "Leads" || moduleName == "Contacts") {
                        name =
                          (row?.FirstName ? row?.FirstName : "") +
                          " " +
                          (row?.LastName ? row?.LastName : "N/A");
                        calldetail(row._id, name);
                      } else if (moduleName == "Accounts") {
                        name = row?.AccountName;
                        calldetail(row._id, name);
                      } else if (moduleName == "Opportunities") {
                        name = row?.OpportunityName;
                        calldetail(row._id, name);
                      } else if (
                        moduleName == "Tasks" ||
                        moduleName == "Calls" ||
                        moduleName == "Note" ||
                        moduleName == "Meeting"
                      ) {
                        name = row?.Subject ? row?.Subject : row?.NoteTitle;
                        calldetail(row._id, name);
                      } else if (moduleName == "channelPartner") {
                        name = row?.ChannelPartnerName;
                        calldetail(row._id, name);
                      } else if (moduleName == "Vendor") {
                        name = row?.VendorName;
                        calldetail(row._id, name);
                      } else if (moduleName == "Inventory") {
                        name = row?.InventoryName;
                        calldetail(row._id, name);
                      } else if (moduleName == "siteVisit" || props.formTitle == "siteVisit") {
                        name = row?.Subject;
                        calldetail(row._id, name);
                      } else {
                        name = row?.Subject;
                        calldetail(row._id, name);
                      }
                    }}
                  >
                    <p className="text-xs  flex  text-white ml-1">
                      {diffCall < 0
                        ? dateCall2.format("MMMM d")
                        : diffCall === 0
                          ? "Today"
                          : dateCall2.format("MMMM d")}
                    </p>
                  </div>
                </div>
              )}
              {row?.tasksData?.length !== 0 && (
                <div className="flex  mt-1">
                  <TableCheckIcon />
                  <div
                    className={`pr-4 tableElement w-auto relative  ${diff < 0
                      ? "bg-[#F14949]"
                      : diff === 0
                        ? "bg-[#FC9F00]"
                        : "bg-[#12aa67]"
                      }   ml-1`}
                    onClick={() => {
                      //calldetail(row._id)
                      let name = "";
                      if (moduleName == "Leads" || moduleName == "Contacts") {
                        name =
                          (row?.FirstName ? row?.FirstName : "") +
                          " " +
                          (row?.LastName ? row?.LastName : "N/A");
                        calldetail(row._id, name);
                      } else if (moduleName == "Accounts") {
                        name = row?.AccountName;
                        calldetail(row._id, name);
                      } else if (moduleName == "Opportunities") {
                        name = row?.OpportunityName;
                        calldetail(row._id, name);
                      } else if (
                        moduleName == "Tasks" ||
                        moduleName == "Calls" ||
                        moduleName == "Note" ||
                        moduleName == "Meeting"
                      ) {
                        name = row?.Subject ? row?.Subject : row?.NoteTitle;
                        calldetail(row._id, name);
                      } else if (moduleName == "channelPartner") {
                        name = row?.ChannelPartnerName;
                        calldetail(row._id, name);
                      } else if (moduleName == "Vendor") {
                        name = row?.VendorName;
                        calldetail(row._id, name);
                      } else if (moduleName == "Inventory") {
                        name = row?.InventoryName;
                        calldetail(row._id, name);
                      } else if (moduleName == "siteVisit") {
                        name = row?.Subject;
                        calldetail(row._id, name);
                      } else {
                        name = row?.Subject;
                        calldetail(row._id, name);
                      }
                    }}
                  >
                    <p className="text-xs  flex  text-white ml-1">
                      {diff < 0
                        ? date2.format("MMMM d")
                        : diff === 0
                          ? "Today"
                          : date2.format("MMMM d")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        },
      },

      ...tempArry,
      {
        name: "Owner",
        minWidth: "100px",
        sortable: true,
        cell: (row) => (
          <span>
            {row?.ownerData
              ? row?.ownerData?.firstName + " " + row?.ownerData?.lastName
              : ""}
          </span>
        ),
      },
      {
        name: "Modified By",
        minWidth: "100px",
        sortable: true,
        cell: (row) => (
          <span>
            {row?.Modified_By
              ? row?.Modified_By?.firstName + " " + row?.Modified_By?.lastName
              : ""}
          </span>
        ),
      },
      {
        name: "Action",
        minWidth: "100px",
        sortable: true,
        cell: (row) => (
          <span
            role="button"
            onClick={() => {
              // calldetail(row["_id"]);
              // calldetail(row["_id"], row["FirstName"], row["LastName"]);
              let name = "";
              if (moduleName == "Leads" || moduleName == "Contacts") {
                name =
                  (row?.FirstName ? row?.FirstName : "") +
                  " " +
                  (row?.LastName ? row?.LastName : "N/A");
                calldetail(row._id, name);
              } else if (moduleName == "Accounts") {
                name = row?.AccountName;
                calldetail(row._id, name);
              } else if (moduleName == "Opportunities") {
                name = row?.OpportunityName;
                calldetail(row._id, name);
              } else if (
                moduleName == "Tasks" ||
                moduleName == "Calls" ||
                moduleName == "Note" ||
                moduleName == "Meeting"
              ) {
                name = row?.Subject ? row?.Subject : row?.NoteTitle;

                calldetail(row._id, name);
              } else if (moduleName == "channelPartner") {
                name = row?.ChannelPartnerName;
                calldetail(row._id, name);
              } else if (moduleName == "Vendor") {
                name = row?.VendorName;
                calldetail(row._id, name);
              } else if (moduleName == "Inventory") {
                name = row?.InventoryName;
                calldetail(row._id, name);
              } else if (moduleName == "siteVisit") {
                name = row?.Subject;
                calldetail(row._id, name);
              } else {
                name = row?.Subject;
                calldetail(row._id, name);
              }
            }}
            className="font-semibold text-[#191242]"
          >
            View
          </span>
        ),
      },
      {
        name:
          data && data?.length > 0 ? (
            <span className="ml-2">
              <FilterTableModel api={api} moduleName={moduleName} />
            </span>
          ) : (
            ""
          ),
        maxWidth: "0",
        ignoreRowClick: true,
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

  const handleShowRows = (value) => {
    localStorage.setItem(`pagelimit`, value);
    dispatch(GET_ALL_DATA(1, value, api.getApi));
    setShowRows(value);
  };

  const calldetail = (_id, name) => {
    // alert(firstName + LastName)
    navigate(api.detialUrl + _id + "/?fullName=" + name);
    // navigate(api.detialUrl + _id);
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

  useEffect(() => {
    dispatch(GET_FOMR_LAYOUT_BY_MODULE(1, 100, moduleName));
    dispatch(SELECT_CHECKBOX({ selectRow: [], pagename: moduleName }));
    dispatch({ type: "SET_CHECKBOX_OF_LISTING_DATA", data: [] });
  }, []);

  const handleCheckRows = (rows) => {
    dispatch(SELECT_CHECKBOX({ selectRow: rows, pagename: moduleName }));
    dispatch({ type: "SET_CHECKBOX_OF_LISTING_DATA", data: rows });
  };

  if (loading) {
    return <PageLoader title="Loading" />;
  }
  return (
    <>
      {form?.sections ? (
        <div className="w-full">
          <div className="flex justify-between items-center my-2">
            <div className="text-sm font-medium text-[#18181B]">
              Total Records{" "}
              <span className="text-sm font-semibold text-[#18181B]">
                {pagination?.total ? pagination?.total : "0"}
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
          <div className="flex justify-start items-start w-full overflow-x-hidden  gap-5 overflow-y-auto">
            {sideBar && (
              <div className="pl-1 pr-1 py-3 bg-white rounded-xl h-full col-span-3 xl:col-span-2 w-[270px] min-w-[270px] ">
                <div>
                  <div className="cardbodyMain px-3">
                    <div className="cardbody">
                      <div className="text-[#191242] font-medium mb-2">
                        Filter by
                      </div>
                      <div className="relative mb-2 flex justify-start items-center">
                        <div className="absolute left-3 top-3">
                          <SearchIcon className="w-5 h-5" />
                        </div>
                        <input
                          type="search"
                          className="border pl-11 border-[#E6E6EB] rounded-md px-3 w-full py-2 focus:outline-none"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => {
                            let result = e.target.value.replace(
                              /(^\w{1})|(\s+\w{1})/g,
                              (letter) => letter.toUpperCase()
                            );
                            setSearch(result);
                          }}
                        />
                      </div>

                      <div
                        className={`overflow-y-auto  max-h-[46vh]  -mr-4 `}
                      // className={`overflow-y-auto  ${
                      //   showFilter()
                      //     ? "h-[calc(100vh-529px)]"
                      //     : "h-[calc(100vh-475px)]"
                      // } -mr-4 `}
                      >
                        {/* {console.log("searchsearchsearch", selectedFilter)} */}

                        {selectedFilter
                          ?.filter((it) => it?.name?.includes(search))
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
                                      className="text-xs "
                                      htmlFor={filter.name}
                                    >
                                      {/* {getTitle(
                                        "lastActivityTime" === filter.name
                                          ? "lastActivity"
                                          : filter.name
                                      )} */}
                                      {filter.name ? (filter.name) : ""}
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
                      className="w-full bg-primary rounded-2xl text-white p-2"
                      onClick={() => {
                        applyFilter();
                      }}
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
            <TableMain
              className={`bg-white cstm-table col-span-9 xl:col-span-10 ${sideBar ? "w-[calc(100%-295px)]" : "w-full"
                } rounded-xl flex flex-col leads-table h-full`}
              data={data || []}
            >
              {console.log("data ===> 1234", data)}
              <DataTable
                noHeader={false}
                pagination={false}
                subHeader={false}
                responsive
                onRowClicked={(row) => {
                  // calldetail(row._id);
                  // alert(moduleName)
                  // return
                  let name = "";
                  if (moduleName == "Leads" || moduleName == "Contacts") {
                    name =
                      (row?.FirstName ? row?.FirstName : "") +
                      " " +
                      (row?.LastName ? row?.LastName : "N/A");
                    calldetail(row._id, name);
                  } else if (moduleName == "Accounts") {
                    name = row?.AccountName;
                    calldetail(row._id, name);
                  } else if (moduleName == "Opportunities") {
                    name = row?.OpportunityName;
                    calldetail(row._id, name);
                  } else if (
                    moduleName == "Tasks" ||
                    moduleName == "Calls" ||
                    moduleName == "Note" ||
                    moduleName == "Meeting"
                  ) {
                    name = row?.Subject ? row?.Subject : row?.NoteTitle;

                    calldetail(row._id, name);
                  } else if (moduleName == "channelPartner") {
                    name = row?.ChannelPartnerName;
                    calldetail(row._id, name);
                  } else if (moduleName == "Vendor") {
                    name = row?.VendorName;
                    calldetail(row._id, name);
                  } else if (moduleName == "Inventory") {
                    name = row?.InventoryName;
                    calldetail(row._id, name);
                  } else if (moduleName == "siteVisit") {
                    name = row?.Subject;
                    calldetail(row._id, name);
                  } else {
                    name = row?.Subject;
                    calldetail(row._id, name);
                  }
                  // else if (moduleName == "Tasks" || moduleName == "Calls" || moduleName == "Meeting") {
                  //   name = row?.Subject
                  //   calldetail(row._id, name);
                  // }
                }}
                customStyles={customStyles}
                sortable={true}
                defaultSortAsc={true}
                noDataComponent={
                  <div className="text-center ">
                    <h5 className="mt-2">Sorry! No Results matching your search.</h5>
                    <p className="text-muted mb-0">


                    </p>
                  </div>
                }
                primaryKey="_id"
                id="_id"
                columns={renderTabel()}
                selectableRows
                onSelectedRowsChange={handleCheckRows}
                sortIcon={
                  <>
                    <Arrowdowns></Arrowdowns>
                    {/* <svg
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
                    </svg> */}
                  </>
                }
                theme="solarized"
                className="react-dataTable dataTables_wrapper"
                data={data || []}
              />
            </TableMain>
          </div>
        </div>
      ) : (
        <ModuleNotFound moduleName={moduleName} />
      )}
    </>
  );
};
export default TableList;

const hideFilterList = [

  "Channel Partner Owner Id",

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
  // "CreatedBy",
  "read",
  // "Pipeline",
  // "Stage",
  "Accounts",
  "accounts",
  "Lookup",
  "file",
  "File",
  "Lookup1",
  "Lead I D",
  "LeadID",
  "status",
  "Status",
  "channelPartnerOwnerId",
  "Channel Partner Owner Id",
];
