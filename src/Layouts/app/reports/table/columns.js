import moment from "moment/moment";
import StarReport from "./startreport";
import { Link } from "react-router-dom";

export const columns = [
  {
    name: "Report Name",
    sortable: true,
    sortField: "name",
    selector: (row) => (
      <Link to={`/crm/report/edit/${row?._id}`} className="text-primary hover:underline font-[400] flex justify-start items-center space-x-1">
        <StarReport />
        <span>
          {row?.name || row?.reportName || "N/A"}
        </span>
      </Link>
    ),
  },
  {
    name: "Description",
    sortable: true,
    sortField: "description",
    selector: (row) => row?.description || row?.reportDescription || "N/A",
  },
  {
    name: "Created At",
    sortable: true,
    sortField: "createdTime",
    selector: (row) => (
      <div className="w-full text-center p-2 rounded-lg">
        {moment(row?.createdTime).format('DD/MM/YYYY hh:mm a') || "N/A"}
      </div>
    ),
  },
  {
    name: "Genrate Report",
    sortable: true,
    sortField: "name",
    selector: (row) => (
      <Link to={`/crm/genrate/report/${row?._id}`} className="text-primary hover:underline font-[400] flex justify-start items-center space-x-1">
        <span>
          {row?.name || row?.reportName || "N/A"}
        </span>
      </Link>
    ),
  },
  {
    name: "Action",
    sortable: true,
    sortField: "",
    selector: (row) => (
      <Link className="text-primary font-[400] hover:underline" to={`/crm/report/edit/${row?._id}`} >
        Edit
      </Link>
    ),
  },
];
