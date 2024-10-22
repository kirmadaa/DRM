import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";


const SelectParentModule = ({ valuehooks }) => {
    const { parentModuleItem, setParentModuleItem, list } = valuehooks
    return (
        <div className="p-4 border w-96 rounded-md bg-blue-100/40">
            <Listbox value={parentModuleItem} onChange={setParentModuleItem}>
                <div className="relative mt-2 cursor-pointer">
                    <Listbox.Button className="relative w-1/2 rounded-lg bg-yellow-100/50 py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{parentModuleItem || 'Select Module'}</span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-36 w-1/2 overflow-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {Object.keys(list)?.map((item, itemIdx) => (
                                <Listbox.Option
                                    key={itemIdx}
                                    className={({ active }) =>
                                        `relative select-none py-2 px-2 ${active ? 'bg-amber-100 text-primary' : 'text-gray-900'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            <h1 className="mt-1 text-sm">Module Title</h1>
        </div>
    )
}

export default SelectParentModule;