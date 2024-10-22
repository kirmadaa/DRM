

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { UPDATE_REPORT_BY_ID, GET_LIST_OF_FOLDERS, GET_REPORT_BY_ID } from '../../../../Redux/actions/reports'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EditReportButton = ({ valueByIndex, data, reportId, loopdata }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reportState = useSelector(state => state?.reports)
    const { listOfFolders } = reportState
    let [isOpen, setIsOpen] = useState(false)
    let [loading, setLoading] = useState(false)
    const [payload, setPayload] = useState({ name: '', description: '', folderId: '' })
    const [folderId, setFolderId] = useState('')

    const gerReportById = async () => {
        let res = await dispatch(GET_REPORT_BY_ID(reportId))
        setPayload({
            name: res?.name,
            description: res?.description,
        })
        setFolderId(res?.folderId)
    }

    useEffect(() => {
        dispatch(GET_LIST_OF_FOLDERS())
        gerReportById()
        // eslint-disable-next-line 
    }, [])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleInputChange = (e) => {
        let { value, name } = e.target
        setPayload({ ...payload, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (payload?.name?.trim() === '') {
            toast.error('Name is required !')
            return
        } else if (payload?.description?.trim() === '') {
            toast.error('Description is required !')
            return
        } else if (payload?.folderId?.trim() === '') {
            toast.error('Select Folder !')
            return
        }
        if (loopdata?.length === 0) {
            toast.error('Select Modules ... ')
            return
        }
        setLoading(true)
        let reportModules = []
        for (let it of loopdata) {
            let name = Object.keys(it)[0]
            reportModules?.push(name)
        }

        let finalPay = { ...payload, reportId, reportModules }
        if (data?.isMultiSelect) {
            finalPay['reportModules'] = valueByIndex
        }
        let res = await dispatch(UPDATE_REPORT_BY_ID(finalPay))
        if (res) {
            navigate('/crm/reports')
        } else {
            setLoading(false)
        }

    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-primary  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                Update Report
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
                                        Update Report
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit} className='w-full'>
                                        <div className="mt-2">
                                            <p>Report Name</p>
                                            <input value={payload?.name} required name='name' onChange={handleInputChange} className='border rounded-md px-2 py-1 w-full mb-2 mt-1' placeholder='Name' />
                                            <p>Description</p>
                                            <textarea value={payload?.description} required name='description' onChange={handleInputChange} rows={2} className='border rounded-md px-2 py-1 w-full mb-2 mt-1' placeholder='Name' />
                                            <select name='folderId' value={folderId} disabled={true} required onChange={handleInputChange} className='border rounded-md px-2 py-2 w-full mb-2 mt-1' >
                                                <option>
                                                    Select Folder
                                                </option>
                                                {
                                                    listOfFolders?.map((folder) => {
                                                        return <option key={folder?._id} value={folder?._id}>{folder?.folderName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                            >
                                                {loading ? 'Processing...' : 'Update Report '}
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


export default memo(EditReportButton)