import { Tab } from "@headlessui/react";
import { Fragment } from "react";

const tab = ["Overview", "Timeline"];

const TabComponent = ({ tabs = tab }) => {
  return (
    <Tab.List className="p-5 bg-white  rounded-2xl my-3">
      <div className="flex space-x-1 w-max rounded-[32px] bg-white border-[1.5px] border-[#E6E6EB] p-1">
        {tabs?.map((item) => {
          return (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-[#191242] rounded-[32px] text-white py-2 px-4 min-w-[100px] text-sm font-normal leading-5 "
                      : "text-[#6A6A6D] text-sm font-normal py-2 px-4 min-w-[100px] hover:bg-white/[0.12]"
                  }
                >
                  {item}
                </button>
              )}
            </Tab>
          );
        })}
      </div>
    </Tab.List>
  );
};

export default TabComponent;
