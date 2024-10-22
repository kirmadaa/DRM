import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Edit2 } from 'react-feather'
import { useDispatch } from 'react-redux'
import { UPDATE_TEMPLATE_WHATSAPP, GET_TEMPLATE_WHATSAPP_LIST } from '../../../../Redux/actions/serviceControl'

export default function EditTemplate({ item, currentPage }) {
    let [isOpen, setIsOpen] = useState(false)
    let [payload, setPayload] = useState({})
    let dispatch = useDispatch()

    useEffect(() => {
        setPayload({
            templateImage: item?.templateImage,
            templateName: item?.templateName,
            message: item?.message
        })
    }, [item])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function handleChange(e) {
        let { name, value } = e.target
        setPayload({ ...payload, [name]: value })

    }

    async function handleUpdate() {
        let res = await dispatch(UPDATE_TEMPLATE_WHATSAPP(payload, item?._id))
        if (res) {
            dispatch(GET_TEMPLATE_WHATSAPP_LIST({ limit: 10, offset: currentPage }))
        }
        setIsOpen(false)
    }

    return (
        <>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Edit2 size={17} color='#191242' onClick={openModal} />
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
                                        Edit ({item?.templateName})
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="w-full">
                                            <div className="my-4 w-full flex justify-between">
                                                <input onChange={handleChange} type='url' value={payload?.templateImage} name='templateImage' className="bg-blue-50 w-full border rounded-md font-[200] focus:outline-none  p-3" placeholder="Template image url" />
                                            </div>
                                            <div className="my-4 w-full flex justify-between">
                                                <input onChange={handleChange} value={payload?.templateName} name='templateName' className="bg-blue-50 w-full border rounded-md font-[200] focus:outline-none  p-3" placeholder="Template name" />
                                            </div>
                                            <div className="my-4 w-full flex justify-between">
                                                <textarea rows={3} onChange={handleChange} value={payload?.message} name='message' className="bg-blue-50 w-full border rounded-md font-[200] focus:outline-none  p-2" placeholder="Message..." />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center text-white rounded-md border border-transparent bg-primary/90 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleUpdate}
                                        >
                                            Update
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
