import React, { useMemo, useState } from "react";
import TableList from "../../../../Components/table";
import { useSelector } from "react-redux";
import VendorSubHeader from "../../../../View/App/vendor/VendorSubHeader";
import ListingCanvasViewLayout from "../../../../Components/canvasview";
import KanbanView from "../../../../View/kanbanView";

const defaultView = () => {
  return localStorage.getItem("Vendor-module-view");
};

function VendorList() {
  const [view, setView] = useState(defaultView());
  const form = useSelector((state) => state.user.form);

  const getDataView = useMemo(() => {
    if (view === "canvas") {
      return (
        <ListingCanvasViewLayout
          key="vendor"
          moduleName="Vendor"
          filterSHow={true}
        />
      );
    } else if (view === "list" || view === null) {
      return (
        <div className="flex gap-3 items-center  flex-col w-full">
          <TableList key="vendor" moduleName="Vendor" />
        </div>
      );
    } else {
      return <KanbanView moduleName="Inventory" />;
    }
  }, [view]);

  return (
    <>
      <VendorSubHeader
        setView={setView}
        moduleName="Vendor"
        form={form?.sections}
      />
      <div className="px-4">{getDataView}</div>
      {/* <TableList key="vendor" moduleName="Vendor" /> */}
    </>
  );
}

export default VendorList;
