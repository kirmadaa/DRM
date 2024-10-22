


import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const sizeList = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
const Textsize = ({ textSize, handletextDecoration }) => {
    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button className={`px-2 border border-primary flex justify-start rounded-md items-center mx-1 focus:ring-0 focus:outline-none p-1 text-primary`}>
                    <div className="flex justify-start items-center">
                        <span
                            className="text-sm"
                        >
                            {textSize} px
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 mt-2 min-w-[200px] h-[302px] overflow-scroll origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-0 py-1 ">
                        {
                            sizeList?.map((size) => {
                                return (
                                    <Menu.Item key={size}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handletextDecoration(size, 'fontSize')}
                                                className={`border-b ${textSize === size ? "text-white bg-primary" : "text-gray-500"
                                                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                                            >
                                                {size} px
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Textsize;
