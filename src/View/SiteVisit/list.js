import React from "react";
import TableList from "../../Components/table";
import { useSelector } from "react-redux";
import SiteVisitSubHeader from "./SiteVisitSubHeader";

function SiteVisitList() {
  const form = useSelector((state) => state.user.form);

  return (
    <>
      <SiteVisitSubHeader form={form?.sections} />
      <div className="flex gap-3 items-center  flex-col w-full px-3">
        <TableList key="siteVisit" moduleName="siteVisit" />
      </div>
    </>
  );
}

export default SiteVisitList;
