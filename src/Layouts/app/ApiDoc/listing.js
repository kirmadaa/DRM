import { ArrowIcon } from "../../../assets/svgIcons";
import DataTable from "react-data-table-component";
import { columns } from "./colsList";
import { useSelector } from "react-redux";

const ApiDocListing = () => {
  const apiList = useSelector((state) => state?.apiDocReducer?.apiList);

  return (
    <div className=" min-h-[80dvh] cstm-table rounded-md  bg-white p-2">
      <DataTable
        noHeader={false}
        data={apiList || []}
        pagination
        subHeader={false}
        responsive
        noDataComponent={
          <div className="text-center rounded-2xl">
            <h5 className="mt-2">Sorry! No Results matching your search.</h5>
            <p className="text-gray-400 mb-0">
               orders
              for you search.
            </p>
          </div>
        }
        id="_id"
        columns={columns}
        sortIcon={<ArrowIcon />}
        className="w-full rounded-lg react-dataTable dataTables_wrapper"
      />
    </div>
  );
};

export default ApiDocListing;
