import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import SelectSearch from './selectSearch'

const getValue = (item, keyname) => {
    try {
        return item[keyname];
    } catch (error) {
        return 'please select'
    }
}

export default function SendMessage({ options, title, keyname, handleSend, isOpen, setIsOpen }) {
    const [selected, setSelected] = useState(options[0])

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={()=>setIsOpen(true)}
                className="bg-primary p-2 rounded-lg text-white">
                Send {title}
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg mb-3 text-center leading-6 text-gray-900"
                                    >
                                        Send {title} Message
                                    </Dialog.Title>
                                    <div className="mt-2 h-64 ">
                                        <SelectSearch
                                            keyname={keyname}
                                            selected={selected}
                                            setSelected={setSelected}
                                            options={options} />
                                            <div className='mt-2 text-gary-400 font-[300]'>
                                                {getValue(selected, keyname) ? <p>{getValue(selected, keyname)}</p> : <p>Message not available</p>}
                                            </div>
                                    </div>
                                    <div className="mt-4 space-x-2 flex justify-end ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none "
                                            onClick={()=>{
                                                handleSend(selected?._id)
                                            }}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
