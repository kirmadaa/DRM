import React, { useMemo, useState } from "react";
import TableList from "../../Components/table";
import { useSelector } from "react-redux";
import OpportunitiesSubHeader from "./OpportunitiesSubHeader";
import ListingCanvasViewLayout from '../../Components/canvasview'
import KanbanView from "../kanbanView";

const defaultView = () => {
  return localStorage.getItem('Opportunities-module-view')
}

function OpportunitiesList() {
  const [view, setView] = useState(defaultView())
  const form = useSelector((state) => state.user.form);

  const getDataView = useMemo(() => {
    if (view === 'canvas') {
      return <ListingCanvasViewLayout key="Opportunities" moduleName="Opportunities" filterSHow={true} />
    } else if (view === 'list' || view === null) {
      return <TableList key="Opportunities" moduleName="Opportunities" />
    } else {
      return <KanbanView moduleName="Opportunities" />
    }
  }, [view])

  return (
    <>
      <OpportunitiesSubHeader setView={setView} form={form?.sections} moduleName="Opportunities" />
      <div className="px-4">
        {getDataView}
      </div>
    </>
  );
}

export default OpportunitiesList;
