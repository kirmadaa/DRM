import { Tab } from "@headlessui/react";
import React from "react";
import request from "../../../assets/images/complaince/request.png";
import processing from "../../../assets/images/complaince/processing.png";
import collection from "../../../assets/images/complaince/collection.png";
const ComplainceDetail = () => {
  const data = [
    {
      image: collection,
      title: "Data Collection",
      des: "Data collected through various sources will be captured",
    },
    {
      image: processing,
      title: "Data Processing",
      des: "Manage personal data of customers inside CRM",
    },
    {
      image: request,
      title: "Data Request",
      des: "Handle data requests of customers inside CRM",
    },
  ];
  return (
    <div>
      <Tab.Group>
        <div className="border-b-[1px] border-[#E6E6EB]  py-3">
          <Tab.List className="flex space-x-1 w-max  p-1">
            <Tab className={"focus-visible:outline-none whitespace-nowrap"}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 "
                      : "text-[#6A6A6D] text-[16px] font-semibold py-2 px-4  hover:bg-white/[0.12]"
                  }
                >
                  GDPR Compliance
                </button>
              )}
            </Tab>
            <Tab className={"focus-visible:outline-none whitespace-nowrap"}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-white border-b-2 border-[#191242]   text-[#191242] py-2 px-4  text-[16px] font-semibold leading-5 "
                      : "text-[#6A6A6D] text-[16px] font-semibold py-2 px-4  hover:bg-white/[0.12]"
                  }
                >
                  NDMC Compliance
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <div className="py-3">
            <Tab.Panel>
              <TabSection
                data={data}
                mainTitle={"Enable GDPR Compliance Settings"}
                btnText={"Enable GDPR Compliance"}
              />
            </Tab.Panel>
            <Tab.Panel>
              {" "}
              <TabSection
                data={data}
                mainTitle={"Enable NDMC Compliance Settings"}
                btnText={"Enable GDPR Compliance"}
              />
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ComplainceDetail;

const TabSection = ({ data, mainTitle, btnText }) => {
  return (
    <div>
      <p className="text-[#6A6A6D] text-[14px] font-medium">
        This page helps you decide how you want to handle, manage, and process
        personal data of your customers to comply with GDPR for your
        organization.
      </p>
      <div>
        <h2 className="my-6 text-[#000000] text-[18px] font-semibold">
          {mainTitle}
        </h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white border-[1px] text-center rounded-2xl py-5 px-6"
            >
              <div className="text-center my-[40px]">
                <img className="inline-block" src={item?.image} />
              </div>
              <h2 className="text-[18px] font-semibold text-center">
                {item?.title}
              </h2>
              <p className="my-4">{item?.des}</p>
              <button className="w-full py-2 rounded-full bg-[#FFF9C3] text-[#FAA81A]">
                Know More
              </button>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className=" mt-[54px]  items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};
