
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ item, currentpath }) => {
    return (
        <div className="text-right ">
            <Menu as="div" className="relative">
                <div>
                    <Menu.Button className={`px-1 md:px-2 lg:px-2 flex justify-start rounded-xl items-center mx-1 focus:ring-0 focus:outline-none p-1 ${currentpath?.includes(item?.path) ? 'bg-primary text-white' : ''}`}>
                        {item?.icon}
                        <span className="hidden lg:block md:block ">
                            {item?.title}
                        </span>
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
                    <Menu.Items className="z-50 absolute right-0 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-0 py-1 ">
                            {
                                item?.children?.map((el, i) => {
                                    return (
                                        <Menu.Item key={i}>
                                            {({ active }) => (
                                                <Link
                                                    to={el?.path}
                                                    className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                                                        } group flex w-full items-center px-2 py-1.5 text-sm`}
                                                >
                                                    {el?.title}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default Dropdown;
