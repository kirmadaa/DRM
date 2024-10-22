import DataTable from "react-data-table-component";
import { columns } from "./columns";
import { SELECT_CHECKBOX } from "../../../../Redux/actions/user";
import { useDispatch } from "react-redux";

const TableReport = ({ data }) => {
  const dispatch = useDispatch();

  const handleCheckRows = (rows) => {
    dispatch(SELECT_CHECKBOX({ selectRow: rows, pagename: "reports" }));
  };

  return (
    <div className="rounded-md bg-white overflow-scroll border min-h-[80vh]">
      <DataTable
        noHeader={false}
        pagination={true}
        subHeader={false}
        responsive
        sortable={true}
        noDataComponent={
          <div className="text-center">
            <h5 className="mt-2">Sorry! No Results matching your search.</h5>
            <p className="text-muted mb-0">
               orders
              for you search.
            </p>
          </div>
        }
        id="_id"
        columns={columns}
        defaultSortFieldId="Reportname"
        defaultSortAsc={true}
        selectableRows={true}
        onSelectedRowsChange={handleCheckRows}
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
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          </>
        }
        theme="solarized"
        className="react-dataTable dataTables_wrapper"
        data={data}
      />
    </div>
  );
};

export default TableReport;
