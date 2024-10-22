import React from "react";
import { useSelector } from "react-redux";
import LeadSubHeader from "./LeadSubHeader";
import ListingCanvasViewLayout from "../../Components/canvasview/lead";

function CanvasLeadList() {
  const form = useSelector((state) => state.user.form);

  return (
    <>
      <LeadSubHeader form={form?.sections} moduleName="Leads" />
      <ListingCanvasViewLayout
        key="Leads"
        moduleName="Leads"
        filterSHow={true}
      />
    </>
  );
}

export default CanvasLeadList;
