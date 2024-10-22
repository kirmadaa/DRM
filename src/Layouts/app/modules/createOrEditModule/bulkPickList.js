import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function BulkPickList({ options, setOptions }) {
    let [isOpen, setIsOpen] = useState(false)
    const [values, setValues] = useState('')

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    // console.log(options)
    const handleSubmit = (e) => {
        e.preventDefault()
        let items = []
        for (let item of values.trim().split('\n')) {
            items.push({ label: item, value: item })
        }
        setOptions([...options, ...items])
        setIsOpen(false)
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-primary px-4 py-1 text-sm font-[400] text-white"
            >
                Add Bulk Picklist
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add List
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <textarea onChange={(e) => setValues(e.target.value)} rows={7} className='w-full border p-3 rounded-md focus:outline-none ' />
                                        </div>

                                        <div className="mt-4 space-x-2">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="inline-flex bg-gray-200 text-primary justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
