import { Settings } from "react-feather";
import { Link } from "react-router-dom";

export const columns = [
  {
    name: "Title ",
    width: "50%",
    selector: (row) => row.formTitle,
    cell: (row) => row?.formTitle || "N/A",
    sortable: true,
  },
  {
    name: "Setting",
    width: "50%",
    cell: (row) => (
      <Link className="text-primary" to={`/crm/module/${row?._id}`}>
        <Settings />
      </Link>
    ),
    sortable: true,
  },
];
