import { Menu, Transition } from "@headlessui/react";
import { Fragment, memo, useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_FOLDER, GET_LIST_OF_FOLDERS } from "../../../../Redux/actions/reports";
import EditFolder from "./editFolder";

const FolderAction = ({ folderid, folder }) => {
    let [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const deleteFolder = async () => {
        let payload = {
            folderId: folderid,
        }
        let res = await dispatch(DELETE_FOLDER(payload))
        if (res?.status === 200) {
            dispatch(GET_LIST_OF_FOLDERS())
        }
    }

    return (
        <>
            <Menu as="div" className="relative">
                <div>
                    <Menu.Button className={`px-1 flex justify-start rounded-xl items-center mx-1 focus:ring-0 focus:outline-none`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
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
                    <Menu.Items className="z-50 absolute left-0 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-0 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className={`${active ? "text-white bg-primary" : "text-gray-500"
                                            } group flex w-full items-center px-2 py-1.5 text-sm`}
                                    >
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={deleteFolder}
                                        className={`${active ? "text-white bg-primary" : "text-gray-500"
                                            } group flex w-full items-center px-2 py-1.5 text-sm`}
                                    >
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <EditFolder
                valueHooks={{ folder, isOpen, setIsOpen }}
            />
        </>
    )
}

export default memo(FolderAction);