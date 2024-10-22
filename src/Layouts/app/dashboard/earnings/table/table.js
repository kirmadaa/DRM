// ** React Imports
import { Fragment } from "react";
// ** Store & Actions

import { columns } from "./columns";
import DataTable from "react-data-table-component";

const data = [
  {
    date: "03/05/2018",
    salesCount: 1050,
    grossEarning: "$32580",
    taxWithfield: "$12523",
    netEarn: {
      total: "$254850",
      parseint: 48,
    },
  },
  {
    date: "03/05/2018",
    salesCount: 1050,
    grossEarning: "$32580",
    taxWithfield: "$12523",
    netEarn: {
      total: "$254850",
      parseint: 0.8,
    },
  },
  {
    date: "03/05/2018",
    salesCount: 1050,
    grossEarning: "$32580",
    taxWithfield: "$12523",
    netEarn: {
      total: "$254850",
      parseint: 48,
    },
  },
  {
    date: "03/05/2018",
    salesCount: 1050,
    grossEarning: "$32580",
    taxWithfield: "$12523",
    netEarn: {
      total: "$254850",
      parseint: 48,
    },
  },
  {
    date: "03/05/2018",
    salesCount: 1050,
    grossEarning: "$32580",
    taxWithfield: "$12523",
    netEarn: {
      total: "$254850",
      parseint: 0.8,
    },
  },
];

// const customRowStyles = [
//   {
//     when: (row) => row.date,
//     style: {
//       color: "blue",
//     },
//   },
//   {
//     when: (row) => row.salesCount >= 30,
//     style: {
//       color: "blue",
//     },
//   },
//   {
//     when: (row) => row.grossEarning >= 30,
//     style: {
//       // backgroundColor: "lightblue",
//       color: "red",
//     },
//   },
// ];

const EarningTable = () => {
  return (
    <Fragment>
      {/* end page title */}
      <div className="row shadow-xl rounded-2xl">
        <div className="col-lg-12">
          <div className="">
            {/* end card header */}
            <div className="rounded-lg transactiontable">
              <DataTable
                noHeader={false}
                subHeader={false}
                responsive
                noDataComponent={
                  <div className="text-center">
                    <h5 className="mt-2">Sorry! No Results matching your search.</h5>
                    <p className="text-muted mb-0">
                      
                     
                    </p>
                  </div>
                }
                // paginationServer
                id="_id"
                columns={columns}
                sortIcon={
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      />
                    </svg>
                  </>
                }
                className="react-dataTable"
                // conditionalRowStyles={customRowStyles}
                data={data || []}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EarningTable;
