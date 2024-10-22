import React from "react";
import DataTable from "react-data-table-component";
import { SearchIcon } from "../../../../assets/svgIcons";
import { PlusWhite } from "../../../../assets/svgIcons";
import { useState } from "react";
import CreateRuleModal from "./rules/CreateRuleModal";

const Usage = () => {
  const [modal, setModal] = useState(false);
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

  const handleClose = () => {
    setModal(false);
  };

  const data = [];
  return (
    <>
      <div>
        <h6 className="text-[#191242] text-xl font-semibold mb-1">Usage</h6>
        <p className="text-[#6A6A6D] text-[14px] font-medium">
          Top Performing Workflow Rules by Email Open Rate - Last 7days.
        </p>

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
      <CreateRuleModal modal={modal} handleClose={handleClose} />
    </>
  );
};

export default Usage;
