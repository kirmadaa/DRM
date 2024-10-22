import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDown } from "react-feather";

const Enum = [
  { label: "IS", condition: "IS" },
  { label: "IS NOT", condition: "IS_NOT" },
  { label: "CONTAINS", condition: "CONTAINS" },
  { label: "DOES NOT CONTAINS", condition: "DOES_NOT_CONTAINS" },
  { label: "END WITH", condition: "END_WITH" },
  { label: "START WITH", condition: "START_WITH" },
  { label: "IS EMPTY", condition: "IS_EMPTY" },
  { label: "IS NOT EMPTY", condition: "IS_NOT_EMPTY" },
];

const EnumOwner = [
  { label: "IS", condition: "IS" },
  { label: "IS NOT", condition: "IS_NOT" },
  { label: "IS EMPTY", condition: "IS_EMPTY" },
  { label: "IS NOT EMPTY", condition: "IS_NOT_EMPTY" },
];

const EnumWithNumber = [
  { label: "<", condition: "<" },
  { label: ">", condition: ">" },
  { label: "<=", condition: "<=" },
  { label: ">=", condition: ">=" },
  { label: "=", condition: "=" },
  { label: "!=", condition: "!=" }
];

export default function EnumFilter({ setCondition, name, filter, comp, typeIs }) {
  let foundMatch = false;

  const getList = () => {
    if (name == "Mobile" && (typeIs === 'number' || typeIs === 'Number')) {

      return Enum
    }
    else if (typeIs === 'number' || typeIs === 'Number') {
      console.log("name, filter, comp, typeIs===>", name, filter, comp, typeIs);

      return EnumWithNumber
    } else if (typeIs === 'Owner' || typeIs === 'lookup') {
      return EnumOwner
    } else {
      return Enum
    }
  }

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left pe-4">
        <Menu.Button className="inline-flex text-primary text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {comp ? (
            <div>
              <Menu.Button className="inline-flex items-center gap-3 w-full justify-center rounded-lg border-[1.5px] px-4 py-3 text-sm font-medium bg-white text-grey hover:bg-opacity-90">
                {((typeIs === 'number' || typeIs === 'Number') ? EnumWithNumber : ((typeIs === 'Owner' || typeIs === 'lookup') ? EnumOwner : Enum))?.map((item) => {
                  if (item?.condition === filter) {
                    foundMatch = true;
                    return item?.label;
                  }
                })}
                {(!foundMatch && "IS") || null}
                <ChevronDown size={16} />
              </Menu.Button>
            </div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            style={{ zIndex: 1000 }}
            className="absolute right-1 mb-2 w-44 max-h-48 overflow-scroll origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="px-1 py-1 ">
              {getList()?.map((item) => {
                return (
                  <Menu.Item key={item?.label}>
                    {({ active }) => (
                      <button
                        onClick={() => setCondition(name, item?.condition)}
                        className={`${filter === item?.condition
                          ? "text-primary font-bold bg-primary/10"
                          : "text-gray-500"
                          } hover:text-primary group flex w-full items-center px-2 py-1.5 text-xs`}
                      >
                        {item?.label}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
