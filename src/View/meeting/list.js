import React, { useState } from "react";
import TableList from "../../Components/table";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MeetingSubHeader from "./MeetingSubHeader";
import ListingCanvasViewLayout from '../../Components/canvasview'
import MeetingReminder from "./reminder";

const defaultView = () => {
  return localStorage.getItem('Meeting-module-view')
}

function MeetingList() {
  const [view, setView] = useState(defaultView())
  const form = useSelector((state) => state.user.form);

  return (
    <>
      <MeetingSubHeader setView={setView} form={form?.sections} moduleName='Meeting' />
      <div className="px-2">
      {view === 'canvas' ? <ListingCanvasViewLayout key="Meeting" moduleName="Meeting" filterSHow={true} /> : <div className="flex gap-3 items-center  flex-col w-full">
        <TableList key="Meeting" moduleName="Meeting" />
      </div>}
      </div>
      <MeetingReminder />
    </>
  );
}

export default MeetingList;
