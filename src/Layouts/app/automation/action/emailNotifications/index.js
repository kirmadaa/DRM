import React from "react";
import DataTable from "react-data-table-component";
import { SearchIcon } from "../../../../../assets/svgIcons";
import { PlusWhite } from "../../../../../assets/svgIcons";
import { useState } from "react";

const EmailNotificationLayout = () => {
  const [showForm, setShowForm] = useState(false);
  const columns = [
    {
      name: "Title ",
      width: "50%",
      selector: (row) => row?.formTitle,
      cell: (row) => row?.formTitle || "N/A",
      sortable: true,
    },
    {
      name: "Title 2",
      width: "50%",
      selector: (row) => row?.formTitle,
      cell: (row) => row?.formTitle || "N/A",
      sortable: true,
    },
  ];

  const data = [];
  return (
    <>
      {!showForm ? (
        <div>
          <h6 className="text-[#191242] text-xl font-semibold mb-1">
            Workflow Rules
          </h6>
          <p className="text-[#6A6A6D] text-[14px] font-medium">
            Workflow rules allow you to perform certain automatic actions on
            specific records based on filter criteria. Workflow automations can
            send emails, update fields, create records and much more.
          </p>
          <div className="flex items-center justify-between my-10">
            <div className="flex items-center justify-between p-3 gap-3 border border-[#E6E6EB] rounded-xl lg:w-[30%]">
              <input
                type="text"
                placeholder="Search All Reports"
                className="focus:outline-none w-full"
              />
              <SearchIcon />
            </div>
            <div>
              <button
                className="flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
                onClick={() => setShowForm(true)}
              >
                <PlusWhite /> Create Rule
              </button>
            </div>
          </div>
          <div className=" bg-white cstm-table rounded-xl flex flex-col col-span-6 leads-table h-full">
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
              className="react-dataTable dataTables_wrapper"
              data={data || []}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className="p-5">
              <h1 className="text-[#191242] text-xl font-semibold ">
                New Email Notifications
              </h1>
              <div className="my-10">
                <div className="grid grid-cols-12 mb-3 items-center gap-10">
                  <label
                    htmlFor="firstName"
                    className="col-span-3 xl:col-span-2 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                  >
                    Name <span className="text-red-800">*</span>
                  </label>
                  <div className="col-span-9 xl:col-span-6 w-full">
                    <input
                      name="roleTitle"
                      type="text"
                      placeholder="Enter Rule Name"
                      className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                    // value={sharingRuleName}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 mb-3 items-center gap-10">
                  <div className="col-span-3 xl:col-span-2"></div>
                  <div className="col-span-9 xl:col-span-6 flex gap-3 items-center">
                    <input type="checkbox" className="default:ring-2 ..." />
                    <p className="text-xs text-[#929296]">
                      Send this notification as a single mass email with all
                      recipients displayed
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <button className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] w-[150px]">
                  Cancel
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center w-[150px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EmailNotificationLayout;
