import { Tab } from "@headlessui/react";
import React from "react";
import EmailNotificationLayout from "./emailNotifications";

const ActionTabs = () => {
  return (
    <div>
      <Tab.Group>
        <div className="border-b-[1px] border-[#E6E6EB]  py-3">
          <Tab.List className="flex space-x-1 w-full  p-1">
            <Tab
              className={"focus-visible:outline-none whitespace-nowrap w-full"}
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 w-full "
                      : "text-[#6A6A6D] text-[16px] font-semibold py-2 px-4  hover:bg-white/[0.12] border-[white]"
                  }
                >
                  Email Notification
                </button>
              )}
            </Tab>
            <Tab
              className={"focus-visible:outline-none whitespace-nowrap w-full"}
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 w-full "
                      : "text-[#6A6A6D] text-[16px] font-semibold py-2 px-4  hover:bg-white/[0.12] border-b-2 border-[white]"
                  }
                >
                  Tasks
                </button>
              )}
            </Tab>
            <Tab
              className={"focus-visible:outline-none whitespace-nowrap w-full"}
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 w-full "
                      : "text-[#6A6A6D] text-[16px] font-semibold py-2 px-4  hover:bg-white/[0.12] border-b-2 border-[white]"
                  }
                >
                  Field Updates
                </button>
              )}
            </Tab>
            <Tab
              className={"focus-visible:outline-none whitespace-nowrap w-full"}
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 w-full "
                      : "text-[#6A6A6D] text-[16px] font-semibold py-2 px-4  hover:bg-white/[0.12] border-b-2 border-[white]"
                  }
                >
                  Functions
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <div className="py-3">
            <Tab.Panel>
              <EmailNotificationLayout />
            </Tab.Panel>
            <Tab.Panel>New tab</Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ActionTabs;
