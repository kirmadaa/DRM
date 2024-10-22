import React, { Fragment, useEffect, useState } from "react";
import { DeleteIcon, EditIcon, PlusWhite } from "../../../../assets/svgIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { DELETE_APPROVAL_PROCESS, GET_APPROVAL_PROCESS } from "../../../../Redux/actions/approvalProcess";
import { GET_GROUP_LIST } from "../../../../Redux/actions/userList";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";


const ApprovalProcessLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [deleteModel, showDeleteModel] = useState(false)
    const [deleteData, setDeleteData] = useState({})
    const data = useSelector(state => state?.approvalProcess?.list)

    const deleteHandler = () => {
        dispatch(DELETE_APPROVAL_PROCESS(deleteData?._id)).then(res => {
            showDeleteModel(false)
            setDeleteData({})
            dispatch(GET_APPROVAL_PROCESS())
        })
    }

    useEffect(() => {
        dispatch(GET_APPROVAL_PROCESS())
        dispatch(GET_GROUP_LIST(1, 100))
        dispatch(GET_ALL_ROLE_DATA(1, 100));
    }, [])

    return (
        <>
            <div>
                <h6 className="text-[#191242] text-xl font-semibold mb-1">
                    Approval Process
                </h6>
                <p className="text-[#6A6A6D] text-[14px] font-medium">
                    Automate the submission of records for approval from one or more managers using approval process.
                </p>
                <div className="flex items-center justify-between my-10">
                    <div className="flex items-center justify-between p-3 gap-3 lg:w-[30%]">
                    </div>
                    <div>
                        <button
                            class="flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
                            onClick={() => {
                                navigate("/crm/approval-process/manage")
                            }}
                        >
                            <PlusWhite /> New Approval Process
                        </button>
                    </div>
                </div>
                <div className=" bg-white rounded-xl flex flex-col col-span-6 leads-table h-full">
                    <th>
                        <td>Name</td>
                        {/* <td>Description</td> */}
                        <td>Edit</td>
                        <td>Delete</td>
                    </th>
                    {data?.map((value) => {
                        return (
                            <tr key={value?._id}>
                                <td>
                                    <h2>{value?.ProcessName || 'N/A'}</h2>
                                </td>
                                <td>
                                    <div
                                        className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                        onClick={() => navigate(`/crm/approval-process/manage?id=${value._id}`)}
                                    >
                                        <EditIcon />
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                        onClick={() => {
                                            setDeleteData(value)
                                            showDeleteModel(true)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </div></td>
                            </tr>
                        )
                    })}
                </div>
            </div >

            < Transition appear show={deleteModel} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {
                    showDeleteModel(false)
                }}>
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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Delete Approval Process
                                    </Dialog.Title>
                                    <h5>Are you sure want to delete this Approval Process?</h5>
                                    <div className="mt-4 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-primary "
                                            onClick={() => {
                                                showDeleteModel(false)
                                                setDeleteData(null)
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                                            onClick={deleteHandler}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >

        </>
    );
};

export default ApprovalProcessLayout;
