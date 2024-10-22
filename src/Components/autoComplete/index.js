import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { SearchIcon } from "../../assets/svgIcons";

const AutoComplete = ({
  showData,
  handleChange,
  query,
  setSearchData,
  setQuery,
  handleopen,
}) => {
  return (
    <Combobox value={showData}>
      <div className="relative">
        <div className=" cursor-default overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <div className="absolute right-3 top-[15px]">
            <SearchIcon className="w-5 h-5" />
          </div>
          <Combobox.Input
            className="border  w-full  pr-11 border-[#E6E6EB] rounded-2xl px-4 py-3.5 focus:outline-none"
            displayValue={(el) => query}
            // placeholder="Search For Building/Location/Developer"
            placeholder="Search"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {showData.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              showData?.map((filter, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative  
                 cursor-pointer select-none py-2 px-10  ${
                   active ? "bg-primary text-white" : "text-gray-900"
                 }`
                  }
                  onClick={() => handleopen(filter?.link)}
                  value={filter}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {filter.label}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default AutoComplete;
