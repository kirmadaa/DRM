import { Tab } from "@headlessui/react";
import React from "react";
import TerritoryHierarchy from "./territoryHierarchy";
import AssignTerritory from "./assignTerritory";
import TerritoryRule from "./territoriesRule";

const TerritoruDetails = () => {
  return (
    <div>
      <Tab.Group>
        <div className="  py-3">
          <Tab.List className="grid grid-cols-3 space-x-1  p-1">
            <Tab
              className={
                "focus-visible:outline-none whitespace-nowrap  !ml-[0px] !mr-[0px]"
              }
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white w-full border-b-2 border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 "
                      : "text-[#6A6A6D] border-b-2 border-[#6A6A6D] w-full text-[16px] font-semibold py-2 px-4  leading-5 hover:bg-white/[0.12]"
                  }
                >
                  Territories
                </button>
              )}
            </Tab>
            <Tab
              className={
                "focus-visible:outline-none whitespace-nowrap !ml-[0px] !mr-[0px]"
              }
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 border-[#191242] w-full   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 "
                      : "text-[#6A6A6D]  border-b-2 border-[#6A6A6D]  w-full text-[16px] font-semibold py-2 px-4 leading-5 hover:bg-white/[0.12]"
                  }
                >
                  Territory Rules
                </button>
              )}
            </Tab>
            <Tab
              className={
                "focus-visible:outline-none whitespace-nowrap !ml-[0px] !mr-[0px]"
              }
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 w-full border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 "
                      : "text-[#6A6A6D]  border-b-2 border-[#6A6A6D] w-full text-[16px] font-semibold py-2 px-4  leading-5 hover:bg-white/[0.12]"
                  }
                >
                  Assign Territories
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <div className="py-3">
            <Tab.Panel>
              <TerritoryHierarchy />
            </Tab.Panel>
            <Tab.Panel>
              <TerritoryRule />
            </Tab.Panel>
            <Tab.Panel>
              <AssignTerritory />
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TerritoruDetails;
