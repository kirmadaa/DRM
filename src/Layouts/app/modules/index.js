
// import DataTable from 'react-data-table-component';

// const columns = [
//   {
//     name: 'Title',
//     selector: row => row.title,
//     sortable: true,
//   },
//   {
//     name: 'Year',
//     selector: row => row.year,
//     sortable: true,
//   },
// ];

// const data = [
//   {
//     id: 1,
//     title: 'Beetlejuice',
//     year: '1988',
//   },
//   {
//     id: 2,
//     title: 'Ghostbusters',
//     year: '1984',
//   },
// ]

// function ModulesListing() {
//   return (
//     <DataTable
//       columns={columns}
//       data={data}
//     />
//   );
// };
import { ArrowIcon } from "../../../assets/svgIcons";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GET_ALL_FORMS } from "../../../Redux/actions/modules";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Settings } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { getTitle } from "../../../utility/serviceMethod";
import { menuItems } from "../../../../src/Components/appbar/menuItems";


const ModulesListing = () => {
  const listOfForms = useSelector(
    (state) => state?.ModulesReducer?.listOfForms
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    edit,
    read,
    write,
    delete: deleteValue,
  } = useAccessibleRole("settings");

  useEffect(() => {
    dispatch(GET_ALL_FORMS(1, 20));
  }, [dispatch]);

  const handlePagination = (page) => {
    dispatch(GET_ALL_FORMS(page.selected + 1, 20));
    setCurrentPage(page.selected + 1);
  };

  const reorderData = (menuItems, data) => {
    const filteredMenuItems = menuItems?.reduce((result, menu) => {
      if (menu.hamburger) {
        // const filteredHamburger = menu.hamburger
        //   ?.filter((item) =>
        //     data?.some((d) => d?._id?.toLowerCase() === item?.id?.toLowerCase())
        //   )
        //   ?.map((item) => (item?.label ? { _id: item?.label, label: item?.label?.toLowerCase().replace(/\s/g, "") } : { _id: item?.id }));
        // if (filteredHamburger?.length > 0) {
        //   result.push(...filteredHamburger);
        // }
      }
      else {
        const existsInData = data?.some(
          (d) => d?._id === menu?.label
        );
        if (existsInData) {
          result.push({ _id: menu?.label, label: menu?.label?.toLowerCase().trim() });
        }
      }
      return result;
    }, []);

    const unmatchedData = data?.filter(
      (d) => !filteredMenuItems?.some((item) => item?.label === d?._id?.toLowerCase().replace(/\s/g, ""))
    );
    if (unmatchedData && unmatchedData?.length) {
      filteredMenuItems.push(...unmatchedData?.map((item) => ({ _id: item?._id })));
    }

    return filteredMenuItems;
  };


  const columns = [
    {
      name: "Module ",
      width: "50%",
      selector: (row) => row.formTitle,
      cell: (row) => getTitle(row?._id) || "N/A",
      sortable: true,
    },
    {
      name: "Setting",
      width: "50%",
      cell: (row) => (
        <div
          className="text-primary"
          // to={`${edit ? `/crm/form-layout-by-module/${row?._id}` : "/crm/modules"
          //   }`}
          onClick={() => {
            if (edit) {
              let URL
              if (row?._id && (row?._id).includes(" ")) {
                URL = (row?._id).split(" ")
                URL = URL[0]?.toLowerCase() + URL[1]
                console.log("URL-->", URL);
                navigate("/crm/form-layout-by-module/" + URL)
              } else {
                navigate("/crm/form-layout-by-module/" + row?._id)

              }

            }
            else {
              navigate("/crm/modules")
            }
          }}
        >
          <Settings />
        </div>
      ),
      sortable: true,
    },
  ];

  const CustomPagination = () => {
    const count = Number(Math.ceil(listOfForms?.pagination?.total / 20));
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
      <div className="flex justify-between gap-2">
        <h3 className="mt-6 mb-2 text-primary text-base font-semibold">
          Modules
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="text-primary bg-white-900 border border-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "

        >
          Go Back
        </button>
      </div>

      <div>
        {console.log(" listOfForms?.formData)==>", menuItems, listOfForms?.formData, reorderData(menuItems, listOfForms?.formData))}
        <DataTable
          noHeader={false}
          data={reorderData(menuItems, listOfForms?.formData) || []}
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
