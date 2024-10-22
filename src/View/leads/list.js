import React, { useMemo, useState } from "react";
import TableList from "../../Components/table";
import { useSelector } from "react-redux";
import LeadSubHeader from "./LeadSubHeader";
import ListingCanvasViewLayout from "../../Components/canvasview";
import KanbanView from "../kanbanView";
const defaultView = () => {
  return localStorage.getItem("lead-module-view");
};

function LeadList() {
  const [view, setView] = useState(defaultView() || null);
  const form = useSelector((state) => state.user.form);

  const getDataView = useMemo(() => {
    if (view === "canvas") {
      return (
        <ListingCanvasViewLayout
          key="Leads"
          moduleName="Leads"
          filterSHow={true}
        />
      );
    } else if (view === "list" || view === null) {
      return (
        <div className="flex gap-3 items-center  flex-col w-full">
          <TableList key="Leads" moduleName="Leads" />
        </div>
      );
    } else {
      return <KanbanView moduleName="Leads" />;
    }
  }, [view]);

  return (
    <>
      <LeadSubHeader
        setView={setView}
        form={form?.sections}
        moduleName="Leads"
      />
      <div className="px-4">{getDataView}</div>
    </>
  );
}

export default LeadList;
