import { ArrowIcon } from "../../../assets/svgIcons";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GET_FOMR_LAYOUT_BY_MODULE } from "../../../Redux/actions/modules";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Settings } from "react-feather";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { getTitle } from "../../../utility/serviceMethod";

const ModulesListing = () => {
  const navigate = useNavigate()
  const formbyModuleName = useSelector((state) => state?.ModulesReducer?.formbyModuleName);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { modulename } = useParams()

  const {
    edit,
    // read,
    // write,
    delete: deleteValue,
  } = useAccessibleRole("settings");

  useEffect(() => {
    dispatch(GET_FOMR_LAYOUT_BY_MODULE(1, 10, modulename));
  }, [dispatch]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(GET_FOMR_LAYOUT_BY_MODULE(page.selected + 1, 10, modulename));
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: "Title ",
      width: "50%",
      selector: (row) => row.formTitle,
      cell: (row) => getTitle(row?.remark || row?.formTitle) || "N/A",
      sortable: true,
    },
    {
      name: "Setting",
      width: "50%",
      cell: (row) => (
        <Link
          className="text-primary"
          to={`${edit ? `/crm/module/${row?._id}` : "/crm/modules"}`}
        >
          <Settings />
        </Link>
      ),
      sortable: true,
    },
  ];

  const CustomPagination = () => {
    const count = Number(Math.ceil(formbyModuleName?.pagination?.total / 10));

    return (
      <div className="px-2">
        <ReactPaginate
          previousLabel={<ArrowLeft />}
          nextLabel={<ArrowRight />}
          pageCount={count || 1}
          breakLabel=".."
          pageRangeDisplayed={0}
          marginPagesDisplayed={1}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          containerClassName="pagination react-paginate text-sm gap-2 flex justify-end my-2 rounded-full"
        />
      </div>
    );
  };
  return (
    <div className="mt-4 rounded-md  bg-white p-2">
      <div className="flex justify-between items-center">
        <h3 className=" mb-2 text-primary text-base font-semibold">
          Form layout of {getTitle(modulename)}
        </h3>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-primary bg-white-900 border border-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "

          >
            Go Back
          </button>
          <Link to={`/crm/createModule?name=${modulename}`} type="button" className="text-white bg-primary hover:bg-priamry/20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none " >
            Create module
          </Link>
        </div>
      </div>
      <div>
        <DataTable
          noHeader={false}
          data={formbyModuleName?.formData || []}
          pagination={false}
          subHeader={false}
          responsive
          selectableRows={false}
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
          className="w-[80%] overflow-hidden overflow-x-auto overflow-y-auto rounded-lg react-dataTable dataTables_wrapper"
        />
      </div>
      <div className="flex justify-end">{CustomPagination()}</div>
    </div>
  );
};

export default ModulesListing;
