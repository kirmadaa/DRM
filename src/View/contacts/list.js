import React, { useMemo, useState } from "react";
import TableList from "../../Components/table";
import { useSelector } from "react-redux";
import FilterHeader from "../../Components/filterHeader";
import ListingCanvasViewLayout from "../../Components/canvasview";
import KanbanView from "../kanbanView";

const defaultView = () => {
  return localStorage.getItem("Contacts-module-view");
};

function ContactList() {
  const form = useSelector((state) => state.user.form);
  const [view, setView] = useState(defaultView());

  const getDataView = useMemo(() => {
    if (view === 'canvas') {
      return <ListingCanvasViewLayout
        key="Contacts"
        moduleName="Contacts"
        filterSHow={true}
      />
    } else if (view === 'list' || view === null) {
      return <div className="flex gap-3 items-center  flex-col w-full">
        <TableList key="Contacts" moduleName="Contacts" />
      </div>
    } else {
      return <KanbanView moduleName="Contacts" />
    }
  }, [view])

  return (
    <>
      <FilterHeader
        setView={setView}
        module="Contacts"
        form={form?.sections}
      />
      <div className="px-4">
        {getDataView}
      </div>
    </>
  );
}

export default ContactList;
