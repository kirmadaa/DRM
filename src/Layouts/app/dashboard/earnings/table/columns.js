export const columns = [
  {
    name: "Date",
    width: "243.5px",
    sortable: true,
    sortField: "date",
    selector: (row) => row.date || "N/A",
  },
  {
    name: "Sales Count",
    width: "243.5px",
    sortable: true,
    sortField: "salesCount",
    selector: (row) => row.salesCount || "N/A",
  },
  {
    name: "Gross Earning",
    width: "243.5px",
    sortable: true,
    sortField: "grossEarning",
    selector: (row) => (
      <div className="bg-[#E2F2FF] text-center text-[#008EFF] p-2 rounded-lg">
        + {row.grossEarning || "N/A"}
      </div>
    ),
    // cell: (row) => <div className="jenis">{row.grossEarning}</div>,
  },
  {
    name: "Tax Withheld",
    width: "243.5px",
    sortable: true,
    sortField: "taxWithfield",
    selector: (row) => (
      <div className="bg-[#DCFCE7] w-full text-center text-[#22C55E] p-2 rounded-lg">
        - {row.taxWithfield || "N/A"}
      </div>
    ),
    // selector: (row) => row.taxWithfield || "N/A",
  },
  {
    name: "Net Earnings",
    width: "243.5px",
    sortable: true,
    sortField: "netEarn",
    selector: (row) => (
      <div>
        {row.netEarn.total || "N/A"}
        <span
          className={`${
            row?.netEarn?.parseint > 20
              ? "bg-[#FFF9C3] text-[#FAA81A]"
              : "text-[#FE3F34] bg-[#FFEAEF] "
          }  p-2 ml-2 rounded-[20px]`}
        >
          {row?.netEarn?.parseint}%
        </span>
      </div>
    ),
    // selector: (row) => row.netEarn || "N/A",
  },
];
