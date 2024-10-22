import React, { useEffect, useState } from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import ReactPaginate from "react-paginate";
import { Plus } from "react-feather";
import Menus from "../../../assets/images/dashboard/menus.svg";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AddCase from "../../../Layouts/app/caseEscalation/Add/AddCase";
import { useDispatch } from "react-redux";
import {
  DELETE_CASE_ESCALATION,
  GET_ALL_CASE_ESCALATION,
} from "../../../Redux/actions/caseEscalation";
import moment from "moment";

const CaseEscalation = () => {
  const [showCase, SetShowCase] = useState(false);
  const [data, setData] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [escalation, setEscalation] = useState({
    show: false,
    value: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async (limit) => {
    const res = await dispatch(GET_ALL_CASE_ESCALATION(limit));
    if (res?.success) {
      setPageCount(Math.ceil(res?.data?.pagination?.total / limit?.limit));
      setData(res?.data);
    } else {
      setData([]);
    }
  };

  const handlePagination = (page) => {
    getData({
      offset: page.selected + 1,
      limit: 10,
      search: [],
    })
    setCurrentPage(page.selected + 1);

  };

  const handleDelete = async (id) => {
    const res = await dispatch(DELETE_CASE_ESCALATION(id));
    if (res?.success) {
      getData({
        offset: 1,
        limit: 10,
        search: [],
      });
    }
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
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      {!showCase ? (
        <div className="rounded-2xl bg-[white] w-full p-6">
          <div className="flex justify-between m-3">
            <h2 className="font-semibold text-lg text-primary">
              Case Escalation Rules
            </h2>
            <div>
              <p>Help</p>
            </div>
          </div>
          <p className="text-sm mt-1">
            If Cases aren't being solved quickly, Case escalation rules help you
            send them to the next level. If you want to apply rules to your
            existing open Cases , <br /> then enable the escalation scheduler.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="font-medium text-[#FFFDEE] bg-[#191242] px-8 py-2 rounded-2xl flex gap-2"
              onClick={() => SetShowCase(true)}
            >
              <Plus /> New Case Escalation Rule
            </button>
            <button
              className="font-medium text-primary bg-white border border-primary px-8 py-2 rounded-2xl"
              onClick={() =>
                setEscalation({
                  ...escalation,
                  show: true,
                  value: !escalation?.value,
                })
              }
            >
              {escalation?.value ? "Disable" : "Enable"} Escalation Scheduler
            </button>
          </div>
          {escalation?.show && (
            <div
              className="bg-[#F8F8FC] border border-[#E6E6EB] text-[#929296] px-4 py-3 rounded-xl relative mt-6"
              role="alert"
            >
              <span className="block sm:inline">
                Escalation Scheduler has been{" "}
                {escalation?.value ? "Enabled" : "Disabled"}.
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setEscalation({ ...escalation, show: false })}
              >
                <svg
                  className="fill-current h-6 w-6 text-[#929296]"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          <div className="mt-6">
            <div>
              {data?.CaseEscalationData?.length ? (
                <div className="w-full border-[1.5px] border-[#E6E6EB] rounded-2xl">
                  <table className="table table-dashboard mg-b-0 w-full rounded-2xl">
                    <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium ">
                          Case Escalation Rule Name
                        </th>
                        <th className="px-6 py-3 text-left font-medium ">
                          Active
                        </th>
                        <th className="px-6 py-3 text-left font-medium ">
                          Created By
                        </th>
                        <th className="px-6 py-3 text-left font-medium ">
                          Created On
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.CaseEscalationData?.length &&
                        data?.CaseEscalationData?.map((item) => (
                          <tr
                            key={item?._id}
                            className="bg-white cursor-pointer border-b border-[1.5px]-[#E6E6EB]"
                          >
                            <th
                              scope="row"
                              className="th-main px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left"
                            >
                              <div className="flex ">
                                <div> {item?.CaseEscalationTitle}</div>
                                <div className="relative z-10 ml-6 ">
                                  <Menu>
                                    <Menu.Button>
                                      <img
                                        src={Menus}
                                        alt="menu "
                                        className="cursor-pointer menu-item rotate-90"
                                      />
                                    </Menu.Button>
                                    <Menu.Items className=" w-max absolute bg-white z-10 border-[1.5px] border-[#EBEBEB] rounded-[10px]">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <Fragment>
                                            <button
                                              onClick={() =>
                                                navigate(
                                                  `/crm/case-escalation-rules/${item?._id}`
                                                )
                                              }
                                              className={`hover:bg-primary hover:text-white ${active
                                                  ? "bg-primary text-white"
                                                  : "text-[#6A6A6D]"
                                                } group flex w-full border-b-[1.5px] border-[#EBEBEB] items-center font-medium px-5 py-2 text-sm`}
                                            >
                                              Edit
                                            </button>
                                          </Fragment>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <Fragment>
                                            <button
                                              onClick={() =>
                                                handleDelete(item?._id)
                                              }
                                              className={`hover:bg-primary hover:text-white ${active
                                                  ? "bg-primary text-white"
                                                  : "text-[#6A6A6D]"
                                                } group flex w-full items-center font-medium border-b-[1.5px] border-[#EBEBEB] px-5 py-2 text-sm`}
                                            >
                                              Delete
                                            </button>
                                          </Fragment>
                                        )}
                                      </Menu.Item>
                                    </Menu.Items>
                                  </Menu>
                                </div>
                              </div>
                            </th>
                            <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                              {item?.Active ? "Active" : "inactive"}
                            </td>
                            <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                              {`${item?.ownerData?.firstName} ${item?.ownerData?.lastName}`}
                            </td>

                            <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                              {moment(item?.createdTime).format("DD-MM-YYYY")}
                            </td>

                            {/* <td>Delete</td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">No data found</p>
              )}
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
            ) : ''}
          </div>
        </div>
      ) : (
        <AddCase SetShowCase={SetShowCase} getData={getData} />
      )}
    </div>
  );
};

export default CaseEscalation;
