import React from "react";
import TableList from "../../Components/table";
import { useSelector } from "react-redux";
import CallSubHeader from "./CallSubHeader";
import CallReminder from './reminder'

function CallList() {
  const form = useSelector((state) => state.user.form);

  return (
    <>
      <CallSubHeader form={form?.sections} />
      <div className="flex gap-3 px-2 items-center  flex-col w-full">
        <TableList key="Calls" moduleName="Calls" />
      </div>
      <CallReminder />
    </>
  );
}

export default CallList;
