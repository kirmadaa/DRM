import React from "react";
import { DealMeeting } from "../../../Layouts/app/modules/dealMeeting";
import SetupSidebar from "../../../Layouts/app/setupSidebar";

const DealMeetingView = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="w-full">
        <DealMeeting />
      </div>
    </div>
  );
};

export default DealMeetingView;
