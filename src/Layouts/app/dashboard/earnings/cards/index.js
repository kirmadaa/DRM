import React from "react";
import { Tab } from "@headlessui/react";
import growEarning from "../../../../../assets/images/dashboard/grow-earning.svg";
import Tax from "../../../../../assets/images/dashboard/tax.svg";
import NetErning from "../../../../../assets/images/dashboard/net-earning.svg";
import EarningTable from "../table/table";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EarningCards = () => {
  return (
    <>
      <div className="grid gap-5 grid-flow-col-dense	 grid-cols-3 lg:grid-cols-1">
        <div className="bg-white border-[1px] rounded-2xl p-5 mt-6 col-span-2 lg:col-span-1">
          <Tab.Group>
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-gray-900">
                Your most Recent Earnings
              </div>
              <Tab.List className="flex space-x-1 rounded-2xl bg-white border-[1.5px] p-2 w-max">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "rounded-lg py-4 px-6 text-sm font-medium leading-5 text-gray-500",
                      selected ? "bg-primary text-white" : "text-gray-500 "
                    )
                  }
                >
                  Range
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "rounded-lg py-4 px-6 text-sm font-medium leading-5 text-gray-500",
                      selected ? "bg-primary text-white" : "text-gray-500 "
                    )
                  }
                >
                  Two
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels className="mt-2">
              <Tab.Panel className={classNames("bg-white py-5 px-6")}>
                <div className="grid lg:grid-cols-3 gap-4">
                  <div className="bg-white border-[1px] rounded-2xl py-5 px-6 w-full">
                    <div className="flex gap-3 items-center text-gray-800 font-semibold text-sm mb-3">
                      <img src={growEarning} alt="grow-earning" />
                      Gross Earnings
                    </div>
                    <div className="text-2xl text-gray-900 font-medium">
                      $1,958,104
                    </div>
                  </div>
                  <div className="bg-white border-[1px] rounded-2xl py-5 px-6 w-full">
                    <div className="flex gap-3 items-center text-gray-800 font-semibold text-sm mb-3">
                      <img src={Tax} alt="grow-earning" />
                      Tax Withheld
                    </div>
                    <div className="text-2xl text-gray-900 font-medium">
                      $234,769.50
                    </div>
                  </div>
                  <div className="bg-white border-[1px] rounded-2xl py-5 px-6 w-full">
                    <div className="flex gap-3 items-center text-gray-800 font-semibold text-sm mb-3">
                      <img src={NetErning} alt="grow-earning" />
                      Net Earnings
                    </div>
                    <div className="text-2xl text-gray-900 font-medium">
                      $1,608,469.50
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <EarningTable />
                </div>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white border-[1px] rounded-2xl py-5 px-6"
                )}
              >
                Two
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className=" bg-white border-[1px] rounded-2xl p-5 mt-6 col-span-1">
          <div className="text-lg font-semibold text-gray-900 mb-6">
            Transaction History
          </div>
          <div>
            <div className="p-5 flex justify-between items-center border-b border-[#D6D6DA]">
              <div className="flex gap-2">
                <p className="h-14 w-14 bg-[#191242] rounded-lg"></p>
                <div className="flex flex-col justify-between">
                  <h6 className="text-lg font-semibold">Payment from #10322</h6>
                  <p className="text-sm text-[#929296]">Mar 21, 2023, 3:30pm</p>
                </div>
              </div>
              <div>
                <p className="text-black text-right mb-1 font-medium">
                  + $250.00
                </p>
                <p className="py-2 px-4 bg-[#DCFCE7] text-[#22C55E] rounded-lg">
                  Completed
                </p>
              </div>
            </div>
            <div className="p-5 flex justify-between items-center border-b border-[#D6D6DA]">
              <div className="flex gap-2">
                <p className="h-14 w-14 bg-[#F87FBA] rounded-lg"></p>
                <div className="flex flex-col justify-between">
                  <h6 className="text-lg font-semibold">
                    Process Refund to #00910
                  </h6>
                  <p className="text-sm text-[#929296]">Mar 21, 2023, 1:00pm</p>
                </div>
              </div>
              <div>
                <p className="text-black text-right mb-1 font-medium">
                  - $16.50
                </p>
                <p className="py-2 px-4 bg-[#DCFCE7] text-[#22C55E] rounded-lg">
                  Completed
                </p>
              </div>
            </div>
            <div className="p-5 flex justify-between items-center border-b border-[#D6D6DA]">
              <div className="flex gap-2">
                <p className="h-14 w-14 bg-[#99C3FD] rounded-lg"></p>
                <div className="flex flex-col justify-between">
                  <h6 className="text-lg font-semibold">
                    Process Delivery to #00910
                  </h6>
                  <p className="text-sm text-[#929296]">
                    Mar 20, 2023, 11:40am
                  </p>
                </div>
              </div>
              <div>
                <p className="text-black text-right mb-1 font-medium">
                  3 Items
                </p>
                <p className="py-2 px-4 bg-[#E2F2FF] text-[#008EFF] rounded-lg">
                  For pickup
                </p>
              </div>
            </div>
            <div className="p-5 flex justify-between items-center border-b border-[#D6D6DA]">
              <div className="flex gap-2">
                <p className="h-14 w-14 bg-[#FEE500] rounded-lg"></p>
                <div className="flex flex-col justify-between">
                  <h6 className="text-lg font-semibold">
                    Payment Failed from #087651
                  </h6>
                  <p className="text-sm text-[#929296]">
                    Mar 19, 2023, 12:54pm
                  </p>
                </div>
              </div>
              <div>
                <p className="text-black text-right mb-1 font-medium">
                  $150.00
                </p>
                <p className="py-2 px-4 bg-[#FFEAEF] text-[#FE3F34] rounded-lg">
                  Declined
                </p>
              </div>
            </div>
            <div className=" mt-6">
              <button className="bg-[#191242] rounded-2xl p-3 text-[#fff] w-full border-none">
                View All Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarningCards;
