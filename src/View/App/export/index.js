import React, { useEffect, useState } from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { GET_ALL_EXPORT_DATA } from "../../../Redux/actions/exportData";
import useAccessibleRole from "../../../hooks/useAccessibleRole";

const ExportUserData = () => {
  const [selectValue, setSelectValue] = useState("search-leads");
  const dispatch = useDispatch();
  const [data, setData] = useState([{ data: "" }]);

  const { read } = useAccessibleRole("dataExport");

  const selectData = [
    {
      label: "Leads",
      value: "search-leads",
    },
    {
      label: "Accounts",
      value: "search-accounts",
    },
    {
      label: "Contacts",
      value: "search-contacts",
    },
    {
      label: "Opportunities",
      value: "search-deals",
    },
    {
      label: "Tasks",
      value: "search-tasks",
    },
    {
      label: "Meeting",
      value: "search-meetings",
    },
    {
      label: "Sale Order",
      value: "search-sale-orders",
    },
    {
      label: "Purchase Order",
      value: "search-purchase-orders",
    },
    {
      label: "Invoices",
      value: "search-invoices",
    },
    {
      label: "Quotes",
      value: "search-quotes",
    },
    {
      label: "Inventory",
      value: "search-inventory",
    },
    {
      label: "Notes",
      value: "search-notes",
    },
    {
      label: "Site Visit",
      value: "search-siteVisit",
    },
  ];
  const handleChangeExport = (e) => {
    setSelectValue(e.target.value);

    dispatch(GET_ALL_EXPORT_DATA(1, 3000, e.target.value, "Post")).then(
      (res) => {
        if (res) {
          setData(res[Object.keys(res)[0]]);
        }
      }
    );
  };
  useEffect(() => {
    dispatch(GET_ALL_EXPORT_DATA(1, 3000, selectValue, "Post")).then((res) => {
      if (res) {
        setData(res[Object.keys(res)[0]]);
      }
    });
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, 'exportUserData' + ".xlsx");
  };

  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <div className="flex justify-between">
          <h2 className="font-semibold">Export Data</h2>
          <div>
            <p>Help</p>
          </div>
        </div>
        <p className="text-xs mt-1">
          This page helps you export data as a .CSV file (maximum: 3000 records)
          from your Zoho CRM account. If you want to export
          <br />
          your data to analyze it further or back it up, please use the{" "}
          <a href="/" className="text-[#009AFE]">
            Request Data Backup
          </a>{" "}
          option.
        </p>
        <div className="ml-5 my-3 flex items-center	">
          <label className=" text-[#1D1D1E] mr-2 ">Select Export Module</label>
          <select
            value={selectValue}
            onChange={(e) => handleChangeExport(e)}
            className="form-control px-2 py-2 border border-[#E6E6EB] rounded-xl w-[30%] focus:outline-none"
          >
            {selectData.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex">
          <button
            onClick={exportToExcel}
            className=" bg-primary rounded-2xl text-white py-2 px-10"
            disabled={!read}
          >
            Export
          </button>
          <button className="py-1 px-3 ml-2 border-1 border-blue-100 text-black bg-[#EDF2F8] rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportUserData;
