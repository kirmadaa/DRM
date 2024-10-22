import React from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";

const Telephony = () => {
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <div className="flex justify-center">
          <div className="w-[70%] text-center">
            <h1 className="text-center leading-tight text-[#111] text-[1.714rem]">
              Integrate your phone system with AltRr to get business context for
              every call.
            </h1>
            <p className="my-4">
              A few simple steps is all it takes to automate your call logging,
              get contextual information for calls, view comprehensive reports,
              and more.
            </p>
            <button
              type="button"
              className="btn mx-auto adduser hover:bg-[#191242] focus:shadow-none font-medium gap-3 bg-[#191242] flex items-center text-white py-[14px] px-4 rounded-2xl btn-primary"
            >
              Enable Telephony
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telephony;
