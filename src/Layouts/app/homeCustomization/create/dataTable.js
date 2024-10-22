import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { list } from "../../../../Components/module";
import {
  GET_ALL_DATA,
  GET_FILTERS,
  GET_TABLE_HEADER,
  SET_LOADER,
  GET_ALL_DATA_FILTER,
  GET_FORM,
  RESET_STATE,
} from "../../../../Redux/actions/user";
import ModuleNotFound from "../../../../Components/moduleNotFound";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, AlignJustify } from "react-feather";
import {
  HeaderFilterIcon,
  TableCheckIcon,
  TablePhoneIcon,
} from "../../../../assets/svgIcons";
import moment from "moment";
import PageLoader from "../../../../../src/Components/pageLoader";
import { styled } from "styled-components";

const TableMain = styled.div`
  .epRaQS {
    ${({ data }) =>
    data?.length === 0 &&
    `height: 100%;
display: flex;
align-items: center;`}
  }
`;

const TableView = (props) => {
  const { moduleName, name, buttonType } = props;
  const api = list[moduleName] || {};
  const [showRows, setShowRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setshowModal] = useState(false);

  // const data = useSelector((state) => state.user.data);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  let [tableHeader, setTableaHeader] = useState([]);
  const [filters, setFilters] = useState([]);
  const [form, setForm] = useState({});

  const loading = useSelector((state) => state.user.loading);

  const hideFilterList = [
    "_id",
    "LeadOwnerId",
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
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = () => {
    dispatch(RESET_STATE());
    SET_LOADER(true);
    let promisAll = [];
    dispatch(GET_FORM(api.formApi)).then((res) => {
      if (res) {
        setForm(res);
      }
      dispatch({ type: "LOADING", data: false });
    });
    dispatch(GET_TABLE_HEADER(api.tableHeaderApi)).then((res) => {
      if (res?.data.length) {
        setTableaHeader(res?.data);
      }
    });
    dispatch(GET_FILTERS(api.filterApi)).then((res) => {
      if (res) {
        setFilters(res?.data);
      }
    });
    promisAll.push(
      dispatch(
        GET_ALL_DATA_FILTER(api.getApi, {
          offset: currentPage,
          limit: showRows,
          buttonType: buttonType,
        })
      ).then((res) => {
        if (res) {
          const keys = Object.keys(res);
          setData(res[keys[0]]);
          setPagination(res[keys[1]]);
        }
      })
    );
    Promise.all(promisAll).then(() => { });
    SET_LOADER(false);
  };

  const tableData = () => {
    dispatch(GET_TABLE_HEADER(api.tableHeaderApi)).then((res) => {
      if (res?.data.length) {
        setTableaHeader(res?.data);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    tableData();
  }, [showModal]);

  const handlePagination = (page) => {
    // check if selected checkbox is true then apply filter
    dispatch(GET_ALL_DATA(page.selected + 1, showRows, api.getApi)).then(
      (res) => {
        if (res) {
          const keys = Object.keys(res);
          setData(res[keys[0]]);
          setPagination(res[keys[1]]);
        }
      }
    );
    setCurrentPage(page.selected + 1);
  };

  const getTitle = (value) => {
    let titleis = value
      ?.replace(/([A-Z])/g, " $1")
      ?.replace(/^./, function (str) {
        return str.toUpperCase();
      });
    return titleis.replace(/_/g, "");
  };

  const mobuleType = ["Opportunities", "Accounts", "Contacts", "Leads"];

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
      };

      tempArry.push(temp);
    });

    return [
      mobuleType.includes(moduleName) && {
        minWidth: "150px",
        maxWidth: "150px",
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
                <div className="flex ">
                  <TablePhoneIcon />
                  <div
                    className={` pr-4 tableElement  relative  ${diffCall < 0
                        ? "bg-[#F14949]"
                        : diffCall === 0
                          ? "bg-[#FC9F00]"
                          : "bg-[#12aa67]"
                      }   ml-1`}
                    onClick={() => calldetail(row._id)}
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
                    onClick={() => calldetail(row._id)}
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
        name: "Action",
        selector: "_id",
        sortable: true,
        minWidth: "200px",
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
        name: data && data?.length > 1 ? <HeaderFilterIcon /> : "",
        maxWidth: "0",
        sortFunction: () => {
          setshowModal(true);
        },
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
    setShowRows(value);
    dispatch(GET_ALL_DATA(1, value, api.getApi)).then((res) => {
      if (res) {
        const keys = Object.keys(res);
        setData(res[keys[0]]);
        setPagination(res[keys[1]]);
      }
    });
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
        maxWidth: "18px",
      },
    },
  };

  if (loading) {
    return <PageLoader title="Loading" />;
  }
  return (
    <>
      {form?.sections ? (
        <div className="w-full p-5">
          <div className="flex justify-between items-center my-4">
            <h1>{name}</h1>
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
          <div className="flex justify-start items-start w-full overflow-x-hidden  gap-5 overflow-y-auto">
            <TableMain
              className={`bg-white col-span-9 xl:col-span-10 w-full
                 rounded-xl flex flex-col leads-table h-full`}
              data={data || []}
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
                  <div className="text-center ">
                    <h5 className="mt-2">Sorry! No Results matching your search.</h5>
                    <p className="text-muted mb-0">
                      
                     
                    </p>
                  </div>
                }
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
export default TableView;
