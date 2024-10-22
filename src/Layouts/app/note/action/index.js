import { Menu } from "@headlessui/react";
import { ChevronDown } from "react-feather";
import { Link, useNavigate } from "react-router-dom";

const NoteAction = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Link
                        to="/crm/create-note"
                        className="inline-flex items-center gap-3 w-full justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
                    >
                        Create Note
                    </Link>
                </div>
            </Menu>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex items-center gap-3 w-full justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90">
                        Action
                        <ChevronDown size={16} />
                    </Menu.Button>
                </div>
                <Menu.Items
                    style={{ zIndex: 1000 }}
                    className="absolute left-0 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? "bg-primary text-white" : "text-gray-900"
                                    } group flex w-full items-center px-5 py-[10px] text-sm`}
                                onClick={() =>
                                    navigate("/crm/note/mass-module?type=delete")
                                }
                            >
                                Bulk Delete
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? "bg-primary text-white" : "text-gray-900"
                                    } group flex w-full items-center px-5 py-[10px] text-sm`}
                                onClick={() =>
                                    navigate("/crm/note/mass-module?type=update")
                                }
                            >
                                Bulk Update
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? "bg-primary text-white" : "text-gray-900"
                                    } group flex w-full items-center px-5 py-[10px] text-sm`}
                                onClick={() =>
                                    navigate("/crm/note/mass-module?type=transfer")
                                }
                            >
                                Bulk Transfer
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default NoteAction;