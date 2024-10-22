import React, { useMemo, useState } from "react";
import TableList from "../../Components/table";
import AccountSubHeader from "./AccountSubHeader";
import { useSelector } from "react-redux";
import ListingCanvasViewLayout from "../../Components/canvasview";
import KanbanView from "../kanbanView";

const defaultView = () => {
  return localStorage.getItem("Accounts-module-view");
};

function AccountList() {
  const [view, setView] = useState(defaultView());
  const form = useSelector((state) => state.user.form);

  const getDataView = useMemo(() => {
    if (view === "canvas") {
      return (
        <ListingCanvasViewLayout
          key="Accounts"
          moduleName="Accounts"
          filterSHow={true}
        />
      );
    } else if (view === "list" || view === null) {
      return (
        <div className="flex gap-3 items-center  flex-col w-full">
          <TableList key="Accounts" moduleName="Accounts" />
        </div>
      );
    } else {
      return <KanbanView moduleName="Accounts" />;
    }
  }, [view]);

  return (
    <>
      <AccountSubHeader
        setView={setView}
        moduleName="Accounts"
        form={form?.sections}
      />
      <div className="px-4">{getDataView}</div>
    </>
  );
}

export default AccountList;
