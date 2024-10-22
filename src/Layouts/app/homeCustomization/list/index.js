import React, { Fragment, useEffect, useState } from "react";
import { DeleteIcon, EditIcon, PlusWhite } from "../../../../assets/svgIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DELETE_CUSTOMIZATION_DASHBOARD, GET_CUSTOMIZATION_DASHBOARD } from "../../../../Redux/actions/customizeDashboard";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";


const HomeCustomizationLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [deleteModel, showDeleteModel] = useState(false)
    const [usedRoles, setUsedRoles] = useState([])
    const [modalErr, setModalErr] = useState(false)
    const [deleteData, setDeleteData] = useState({})
    const data = useSelector(state => state?.CustomizationDashboard?.list)
    const roles = useSelector((state) => state?.role?.roledata);


    const deleteHandler = () => {
        dispatch(DELETE_CUSTOMIZATION_DASHBOARD(deleteData?._id)).then(res => {
            showDeleteModel(false)
            setDeleteData({})
            dispatch(GET_CUSTOMIZATION_DASHBOARD())
        })
    }

    useEffect(() => {
        dispatch(GET_CUSTOMIZATION_DASHBOARD())
        dispatch(GET_ALL_ROLE_DATA(1, 100))
    }, [])


    useEffect(() => {
        let array = []
        data.map(list => {
            array.push(list.roles)
        })
        setUsedRoles(array.flat())
    }, [data])


    return (
        <>
            <div>
                <h6 className="text-[#191242] text-xl font-semibold mb-1">
                    Customize Home page
                </h6>
                <p className="text-[#6A6A6D] text-[14px] font-medium">
                    You can create custom homepage layouts for each role, making it easier for employees to complete their daily task efficiently.
                </p>
                <div className="flex items-center justify-between my-10">
                    <div className="flex items-center justify-between p-3 gap-3 lg:w-[30%]">
                    </div>
                    <div>
                        <button
                            className="flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
                            onClick={() => {
                                if (usedRoles?.length !== roles?.length) {
                                    navigate("/crm/home-customization/manage")
                                }
                                else {
                                    setModalErr(true)
                                }
                            }}
                        >
                            <PlusWhite /> New Home Page
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
                            <tr>
                                <td>
                                    <h2>{value.name}</h2>
                                </td>
                                {/* <td>
                                    <h3>{value.description}</h3>
                                </td> */}

                                <td>
                                    <div
                                        className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                        onClick={() => navigate(`/crm/home-customization/manage?id=${value._id}`)}
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
                                        Delete Home page
                                    </Dialog.Title>
                                    <h5>Are you sure want to delete this Home page?</h5>
                                    <div className="mt-4 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                                            onClick={deleteHandler}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                                            onClick={() => {
                                                showDeleteModel(false)
                                                setDeleteData(null)
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >

            < Transition appear show={modalErr} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {
                    setModalErr(false)
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
                                        You do not have any role left to share this home page with.
                                    </Dialog.Title>
                                    <h5>Note: A role can only have one home page.</h5>
                                    <div className="mt-4 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                                            onClick={() => {
                                                setModalErr(false)
                                            }}
                                        >
                                            OK, got it
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

export default HomeCustomizationLayout;
