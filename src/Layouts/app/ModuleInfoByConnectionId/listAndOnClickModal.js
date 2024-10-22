import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


const notToRender = ['organizationData', 'callOwnerId', 'meetingHostId','sentEmailData',
    'connectionId', 'organizationId', 'ownerData', 'taskOwnerId', '_id',
    'orderedItems', 'salesOrderOwnerId', 'purchaseOrderOwnerId', 'quoteOwnerOwnerId', 
    'sentWhatsappData'
]
const getTitle = (value) => {
    let titleis = value
        ?.replace(/([A-Z])/g, " $1")
        ?.replace(/^./, function (str) {
            return str.toUpperCase();
        });
    return titleis.replace(/_/g, "");
};

function MyModal({ isOpen, setIsOpen, item }) {

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div role="button" onClick={openModal} >
                {Object.keys(item)?.slice(0, 4).map((key, i) => {
                    return <Fragment key={i}>
                        {!notToRender.includes(key) ? <div className="mb-2 flex justify-between items-center">
                            <p className="text-primary">{getTitle(key)}</p>
                            <p className="text-gray-500">{item[key] || 'N/A'}</p>
                        </div>
                            : ''}
                    </Fragment>
                })}
            </div>
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Template Detail
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {Object.keys(item)?.map((key, i) => {
                                                return <Fragment key={i}>
                                                    {!notToRender.includes(key) ? <div className="mb-2 flex justify-between items-center">
                                                        <p className="text-primary">{getTitle(key)}</p>
                                                        <p className="text-gray-500">{item[key] || 'N/A'}</p>
                                                    </div>
                                                        : ''}
                                                </Fragment>
                                            })}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
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


const ListAndOnClickModal = ({ data }) => {

    let [isOpen, setIsOpen] = useState(false)
    return (
        <div className="p-5 bg-white rounded-xl  min-h-[200px]">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data?.map((item) => {
                    return (
                        <div key={item?._id} className="bg-gray-50 border p-3 rounded-md">
                            <MyModal
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                item={item}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListAndOnClickModal;