import React from "react";
import TableList from "../../../../Components/table";
import { useSelector } from "react-redux";
import NotesSubHeader from "../../../../View/App/notes/NotesSubHeader";

function NoteList() {
  const form = useSelector((state) => state.user.form);

  return (
    <>
      <NotesSubHeader form={form?.sections} moduleName="Note" />
      <div className="flex gap-3 items-center  flex-col w-full">
        <TableList key="note" moduleName="Note" />
      </div>
    </>
  );
}

export default NoteList;
