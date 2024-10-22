import React, { useMemo, useState } from "react";
import TableList from "../../../../Components/table";
import { useSelector } from "react-redux";
import InventorySubHeader from "../InventorySubHeader";
import ListingCanvasViewLayout from "../../../../Components/canvasview";
import KanbanView from "../../../../View/kanbanView";

const defaultView = () => {
  return localStorage.getItem("Inventory-module-view");
};

function InventoryList() {
  const [view, setView] = useState(defaultView());
  const form = useSelector((state) => state.user.form);

  const getDataView = useMemo(() => {
    if (view === "canvas") {
      return (
        <ListingCanvasViewLayout
          key="Inventory"
          moduleName="Inventory"
          filterSHow={true}
        />
      );
    } else if (view === "list" || view === null) {
      return (
        <div className="flex gap-3 items-center  flex-col w-full">
          <TableList key="Inventory" moduleName="Inventory" />
        </div>
      );
    } else {
      return <KanbanView moduleName="Inventory" />;
    }
  }, [view]);

  return (
    <>
      <InventorySubHeader
        setView={setView}
        moduleName="Inventory"
        form={form?.sections}
      />
      <div className="px-4">{getDataView}</div>
      {/* <TableList key="inventory" moduleName="Inventory" /> */}
    </>
  );
}

export default InventoryList;
