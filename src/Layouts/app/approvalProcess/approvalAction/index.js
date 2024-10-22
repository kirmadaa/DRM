import { useState } from "react";
import { Addicon, Arrowblue, Arrowdowns, Charticon, Checkicon, Closeicon, DeleteIcon, EditIcon, Mailicon, Plusicon, SearchIcon, Staricon, Taskicon, Updateicon } from "../../../../assets/svgIcons";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Menu } from "react-feather";
import { useDispatch } from "react-redux";

const hideFilterList = [
    "_id",
    "LeadOwnerId",
    "Owner",
    "LeadsOwnerId",
    "organizationId",
    "DealOwnerId",
    "DealsOwnerId",
    "ContactOwnerId",
    "ContactsOwnerId",
    "AccountOwnerId",
    "AccountsOwnerId",
    "TaskOwnerId",
    "TasksOwnerId",
    "MeetingOwnerId",
    "MeetingsOwnerId",
    "callOwnerId",
    "CallsOwnerId",
    "OpportunitiesOwnerId",
    "Id",
    "id",
    "connectionId",
    "taskOwnerId",
    "connectionId",
    "ModifiedBy",
    "id",
    "SmsOwnerId",
    "WhatsappOwnerId",
    "templateOwner",
    "siteVisitOwnerId",
    "meetingHostId",
    "_id",
    "ContactOwnerId",
    "organizationId",
    "EmailOwnerId",
    "noteOwnerId",
    "createdAt",
    "updatedAt",
];

const ApprovalAction = ({
    data,
    setData,
    fields,
    searchHandler,
    templates,
    activeUsers,
    processId,
    selectedTemplate,
    setSelectedTemplate
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [aprovalUpdateFieldModel, setAprovalUpdateFieldModel] = useState(false)
    const [assignTaskApprovalModal, setassignTaskApprovalModal] = useState(false)
    let [openTemplateModal, setOpenTemplateModal] = useState(false);
    let [openSelectedTemplateModal, setOpenSelectedTemplateModal] =
        useState(false);

    function openModalOfEmailTemplate() {
        setOpenTemplateModal(true);
    }

    const editTemplateHandler = () => {
        setOpenSelectedTemplateModal(true);
    };

    function closeSelectedTemplateModal() {
        setOpenSelectedTemplateModal(false);
    }
    const closeAprovalUpdateFieldModel = () => {
        setAprovalUpdateFieldModel(false)
    }

    const closeAssignTaskApprovalHandler = () => {
        setassignTaskApprovalModal(false)
    }

    function closeModalOfEmailTemplate() {
        setOpenTemplateModal(false);
    }

    const deleteAprovalUpdateFieldModel = () => {
        setData({
            ...data, ApprovalAction: {
                ...data?.ApprovalAction,
                EachStage: {
                    ActionName: "updatefield",
                    field: "0",
                    data: ""
                }
            }
        })
    }

    const changeMultiUserForEmailApprovalAction = (value) => {
        setData({
            ...data,
            ApprovalAction: {
                ...data?.ApprovalAction,
                FinalStage: {
                    ...data?.ApprovalAction?.FinalStage,
                    emailTemplate: {
                        ...data?.ApprovalAction?.FinalStage?.emailTemplate,
                        To: value
                    }
                },
            }
        })
    }

    const approvalEachStageChanegHanlder = (e) => {
        const { name, value } = e?.target
        setData({
            ...data, ApprovalAction: {
                ...data?.ApprovalAction,
                EachStage: {
                    ...data?.ApprovalAction?.EachStage,
                    [name]: value
                }
            }
        })
    }

    const saveApprovalUpdateField = (e) => {
        setAprovalUpdateFieldModel(false)
    }

    function setSelectedTemplateModal(template) {
        setSelectedTemplate({ ...selectedTemplate, ...template });
        closeModalOfEmailTemplate();
        setOpenSelectedTemplateModal(true);
    }

    const saveAssignTaskAction = (module) => {
        if (data?.WhoApprove?.tasks?.length) {
            if (!data[module]?.FinalStage?.assignTask) {
                setData({
                    ...data,
                    [module]: {
                        ...data[module],
                        FinalStage: {
                            ...data[module]?.FinalStage,
                            assignTask: "0",
                            assignTaskIndex: "0"
                        }
                    }
                })
            }
        }
        setassignTaskApprovalModal(false)
    }


    const saveFinalTemplate = (module) => {
        setData({
            ...data,
            [module]: {
                ...data[module],
                FinalStage: {
                    ...data[module].FinalStage,
                    emailTemplate: {
                        ...data[module].FinalStage.emailTemplate,
                        TemplateId: selectedTemplate._id
                    }

                }
            }
        })

        setSelectedTemplate({
            ...selectedTemplate,
            finalTitle: selectedTemplate.emailTitle,
        });
        setOpenSelectedTemplateModal(false);
        setOpenTemplateModal(false);
    };

    const deleteTemplateHandler = (module) => {
        setData({
            ...data,
            [module]: {
                ...data[module],
                FinalStage: {
                    ...data[module].FinalStage,
                    emailTemplate: {
                        Name: "",
                        To: [],
                        TemplateId: ""
                    }
                }
            }
        });
        setSelectedTemplate({});
    };

    const deleteAssignTaskApprovalModal = (module) => {
        setData({
            ...data,
            [module]: {
                ...data[module],
                FinalStage: {
                    ...data[module]?.FinalStage,
                    assignTask: "",
                    assignTaskIndex: ""
                }
            }
        })
    }

    const assignTaskValueHandlerForAction = (e, module) => {
        setData({
            ...data,
            [module]: {
                ...data[module],
                FinalStage: {
                    ...data[module].FinalStage,
                    assignTask: e?.target?.value,
                    assignTaskIndex: e?.target?.value,
                }
            }
        })
    }

    return (
        <>
            <div className="pb-[24px]">
                <p className="text-lg font-semibold leading-[26px] mb-5">
                    3. Action(s) upon Approval
                </p>
                <h1>Configure Action After Each Approval Stage</h1>
                <div className="rounded-[20px] w-[720px] border border-[#E6E6EB] overflow-hidden p-2">
                    <div className="flex  justify-between bg-[#F8F8FC] rounded-xl px-2 py-2">
                        <div className="flex items-center ">
                            <Updateicon />
                            <p className="text-[#6A6A6D] text-lg ml-2 font-semibold leading-6">
                                Update Field
                            </p>
                        </div>
                        {!aprovalUpdateFieldModel &&
                            (data?.ApprovalAction?.EachStage?.field === "0") && < div >
                                <button
                                    onClick={() => setAprovalUpdateFieldModel(true)}
                                    className="bg-[#FFF7BE] h-12 flex items-center text-base font-medium text-[#FC9F00] py-[14px] px-4 rounded-[10px] w-[169px] justify-center m-auto"
                                >
                                    <Plusicon className="ml-[10px]" />
                                    Add Field
                                </button>
                            </div>}
                    </div>
                    <div className="bg-white p-[25px] rounded-b-[20px]">
                        <table>
                            <th className="text-left">
                                <p className="text-left text-[#6A6A6D] text-lg font-semibold leading-6">
                                    Field
                                </p>
                            </th>
                            {!aprovalUpdateFieldModel &&
                                (data?.ApprovalAction?.EachStage?.field !== "0") && <tbody>
                                    <tr>
                                        <td
                                        ><h1>Field Name:</h1>
                                        </td>
                                        <td>
                                            <h3>{data?.ApprovalAction?.EachStage?.field}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h1>On 1st approval:</h1>
                                        </td>
                                        <td>
                                            <h3>{data?.ApprovalAction?.EachStage?.data}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div
                                            className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                            onClick={() => setAprovalUpdateFieldModel(true)}
                                        >
                                            <EditIcon />
                                        </div>
                                        </td>
                                        <td>
                                            <div
                                                className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                                onClick={() => deleteAprovalUpdateFieldModel()}
                                            >
                                                <DeleteIcon />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>}
                        </table>
                    </div>
                </div>

            </div>
            <div className="pb-[24px]">
                <h1>Configure Action After Final Approval</h1>
                <div className="flex gap-[17px]">
                    <div className="rounded-[20px] w-[360px] border border-[#E6E6EB] overflow-hidden p-2">
                        <div className="flex rounded-xl  justify-between bg-[#F8F8FC] px-4 py-2">
                            <div className="flex items-center ">
                                <Taskicon />
                                <p className="text-[#6A6A6D] text-lg ml-2 font-semibold leading-6">
                                    Assign Task
                                </p>
                            </div>
                            {!data?.ApprovalAction?.FinalStage?.assignTask &&
                                !assignTaskApprovalModal &&
                                < div >
                                    <button
                                        onClick={() => setassignTaskApprovalModal(true)}
                                        className="bg-[#FFF7BE] h-12 flex items-center text-base font-medium text-[#FC9F00] px-4 rounded-[10px] justify-center m-auto"
                                    >
                                        <Plusicon className="ml-[10px]" />
                                        Task
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="bg-white p-[25px] rounded-b-[20px]">
                            <table>
                                <th className="text-left">
                                    <p className="text-left text-[#6A6A6D] text-lg font-semibold leading-6">
                                        Task
                                    </p>
                                </th>
                                {!assignTaskApprovalModal &&
                                    data?.ApprovalAction?.FinalStage?.assignTask && <tbody>
                                        <tr>
                                            <td
                                            ><h1>{Object.keys(data?.WhoApprove?.tasks[data?.ApprovalAction?.FinalStage?.assignTask])[1]}</h1>
                                            </td>
                                            <td>
                                                <h3>{Object.values(data?.WhoApprove?.tasks[data?.ApprovalAction?.FinalStage?.assignTask])[1]}</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                        </tr>
                                        <tr>
                                            <td> <div
                                                className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                                onClick={() => setassignTaskApprovalModal(true)}
                                            >
                                                <EditIcon />
                                            </div>
                                            </td>
                                            <td>
                                                <div
                                                    className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                                    onClick={() => deleteAssignTaskApprovalModal("ApprovalAction")}
                                                >
                                                    <DeleteIcon />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>}
                            </table>
                        </div>

                    </div>
                    <div className="rounded-[20px] w-[360px] border border-[#E6E6EB] p-2 overflow-hidden">
                        <div className="flex items-center bg-[#F8F8FC] px-4 rounded-xl py-4">
                            <Mailicon />
                            <p className="text-[#6A6A6D] text-lg ml-2 font-semibold leading-6">
                                Email Notification
                            </p>
                        </div>
                        <div className="bg-white p-[25px] rounded-b-[20px]">
                            <p className="mb-[27px] text-base font-medium">
                                Email Template
                            </p>
                            <div className="flex items-center">
                                {!data?.ApprovalAction?.FinalStage?.emailTemplate?.TemplateId && (
                                    <button
                                        type="button"
                                        onClick={openModalOfEmailTemplate}
                                        className="bg-[#191242] h-12 flex items-center text-base font-medium text-white py-[14px] px-4 rounded-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    >
                                        Select Template
                                    </button>
                                )}
                                {data?.ApprovalAction?.FinalStage?.emailTemplate?.TemplateId && (
                                    <>
                                        <h5>{selectedTemplate.finalTitle}</h5>
                                        <div
                                            className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                            onClick={editTemplateHandler}
                                        >
                                            <EditIcon />
                                        </div>
                                        <div
                                            className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                            onClick={() => deleteTemplateHandler("ApprovalAction")}
                                        >
                                            <DeleteIcon />
                                        </div>
                                    </>
                                )}
                            </div>


                        </div>
                    </div>

                    <Transition
                        appear
                        show={aprovalUpdateFieldModel}
                        as={Fragment}
                    >
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={closeAprovalUpdateFieldModel}
                        >
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
                                        <Dialog.Panel className="w-full max-w-[717px] transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg mb-2 flex items-center justify-between font-medium leading-6 text-gray-900"
                                            >
                                                Update Fields
                                                <button
                                                    onClick={closeAprovalUpdateFieldModel}
                                                    className="bg-[#FDD100] flex items-center justify-center h-[32px] w-[32px] rounded"
                                                >
                                                    <Closeicon />
                                                </button>
                                            </Dialog.Title>
                                            <hr className="bg-[#E6E6EB] mb-8"></hr>
                                            <div className="flex gap-3 items-center">
                                                <label className="text-[#929296] text-lg w-[300px] font-medium leading-[22px]">
                                                    Choose a field to update:
                                                </label>
                                                <div className="border mb-6 flex w-full items-center gap-2 rounded-xl border-[#E6E6EB] p-2">
                                                    <select
                                                        className="form-control rounded-[10px] w-[300px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                                        placeholder="Field"
                                                        name="field"
                                                        value={data?.ApprovalAction?.EachStage?.field}
                                                        onChange={(e) =>
                                                            approvalEachStageChanegHanlder(e)
                                                        }
                                                    >
                                                        <option value="0">None</option>
                                                        {fields
                                                            .filter(
                                                                (item) =>
                                                                    !hideFilterList?.includes(item)
                                                            )
                                                            ?.map((field) => {
                                                                return (
                                                                    <option value={field}>
                                                                        {field}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 items-center">
                                                <div className="flex gap-3 items-center">
                                                    <label className="text-[#929296] text-lg w-[300px] font-medium leading-[22px]">
                                                        Value of 1st Approval
                                                    </label>
                                                    <div className="border mb-6 flex w-full items-center gap-2 rounded-xl border-[#E6E6EB] p-2">
                                                        <input
                                                            className="form-control rounded-[10px] w-[300px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                                            placeholder="data"
                                                            name="data"
                                                            value={data?.ApprovalAction?.EachStage?.data}
                                                            onChange={(e) =>
                                                                approvalEachStageChanegHanlder(e)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={closeAprovalUpdateFieldModel}
                                                    className="border w-1/2 border-[#B2B2B6] py-[18px] text-[#B2B2B6] bg-white rounded-2xl text-base font-medium leading-[20px]"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => saveApprovalUpdateField()}
                                                    className="border w-1/2 border-[#B2B2B6] text-white py-[18px] bg-[#191242] rounded-2xl text-base font-medium leading-[20px]"
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                    <Transition
                        appear
                        show={assignTaskApprovalModal}
                        as={Fragment}
                    >
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={closeAssignTaskApprovalHandler}
                        >
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
                                        <Dialog.Panel className="w-full max-w-[717px] transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg mb-2 flex items-center justify-between font-medium leading-6 text-gray-900"
                                            >
                                                Assign Task
                                                <button
                                                    onClick={closeAssignTaskApprovalHandler}
                                                    className="bg-[#FDD100] flex items-center justify-center h-[32px] w-[32px] rounded"
                                                >
                                                    <Closeicon />
                                                </button>
                                            </Dialog.Title>
                                            <hr className="bg-[#E6E6EB] mb-8"></hr>
                                            <div className="flex gap-3 items-center">
                                                <label className="text-[#929296] text-lg w-[300px] font-medium leading-[22px]">
                                                    Assign Task:
                                                </label>
                                                <div className="border mb-6 flex w-full items-center gap-2 rounded-xl border-[#E6E6EB] p-2">
                                                    <select
                                                        className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-white focus:outline-0 py-[0.7rem] px-4  border-[#dce2eb]   p-2 text-base"
                                                        placeholder="Select Task"
                                                        name="value"
                                                        onChange={(e) => {
                                                            assignTaskValueHandlerForAction(e, "ApprovalAction");
                                                        }}
                                                        value={data?.ApprovalAction?.FinalStage?.assignTask}
                                                    >
                                                        {data?.WhoApprove?.tasks?.map((item, index) => (
                                                            <option key={index} value={index}>
                                                                {Object.values(item)[1]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={closeAssignTaskApprovalHandler}
                                                    className="border w-1/2 border-[#B2B2B6] py-[18px] text-[#B2B2B6] bg-white rounded-2xl text-base font-medium leading-[20px]"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => saveAssignTaskAction("ApprovalAction")}
                                                    className="border w-1/2 border-[#B2B2B6] text-white py-[18px] bg-[#191242] rounded-2xl text-base font-medium leading-[20px]"
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                    <Transition appear show={openTemplateModal} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={closeModalOfEmailTemplate}
                        >
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
                                        <Dialog.Panel className="w-full max-w-[969px] transform rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
                                            >
                                                Select Template
                                                <button
                                                    onClick={closeModalOfEmailTemplate}
                                                    className="bg-[#FDD100] flex items-center justify-center h-[32px] w-[32px] rounded"
                                                >
                                                    <Closeicon />
                                                </button>
                                            </Dialog.Title>
                                            <div className="mt-8 flex items-center justify-between">
                                                <div className="flex gap-3">
                                                    <Menu
                                                        as="div"
                                                        className="relative inline-block"
                                                    >
                                                        <div>
                                                            <Menu.Button className="inline-flex justify-between border border-[#E4E4E7] rounded-2xl items-center px-[16px] py-[13px] w-[233px] text-sm text-[#929296] font-medium bg-white">
                                                                All Templates
                                                                <Arrowdowns />
                                                            </Menu.Button>
                                                        </div>
                                                        <Menu.Items className="absolute z-[99] right-0 mt-2 left-0 origin-top-right divide-y divide-gray-100 overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-[10px] w-[265px]">
                                                            <Menu.Item>
                                                                <Fragment>
                                                                    <button className="py-[9px] flex gap-3 text-white text-[14px] pl-5 text-left font-medium leading-[22px] bg-[#191242] w-full">
                                                                        <Checkicon /> All Templates
                                                                    </button>
                                                                    <button className="py-[10px] text-[#6A6A6D] text-[14px] text-left font-medium leading-[22px] w-full pl-5 flex gap-3">
                                                                        <Checkicon />
                                                                        Favorites
                                                                    </button>
                                                                    <button className="py-[10px] text-[#6A6A6D] text-[14px] text-left font-medium leading-[22px] w-full pl-5 flex gap-3">
                                                                        <Checkicon />
                                                                        Associated Templates
                                                                    </button>
                                                                    <button className="py-[10px] text-[#6A6A6D] text-[14px] text-left font-medium leading-[22px] w-full pl-5 flex gap-3">
                                                                        <Checkicon />
                                                                        Created by me
                                                                    </button>
                                                                    <button className="py-[10px] text-[#6A6A6D] text-[14px] text-left font-medium leading-[22px] w-full pl-5 flex gap-3">
                                                                        <Checkicon />
                                                                        Shared with me
                                                                    </button>
                                                                    <button className="py-[10px] text-[#6A6A6D] text-[14px] text-left font-medium leading-[22px] w-full pl-5 flex gap-3">
                                                                        <Checkicon />
                                                                        Public Email Templates
                                                                    </button>
                                                                </Fragment>
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Menu>
                                                    <div className="relative">
                                                        <input
                                                            type="search"
                                                            className="border border-[#E4E4E7] rounded-2xl items-center px-[16px] py-[13px] w-[233px] relative text-sm pl-[50px] pr-[18px] text-[#929296] focus:outline-0 font-medium bg-white"
                                                            placeholder="Search Template"
                                                            name="emailTitle"
                                                            onChange={(e) => searchHandler(e)}
                                                        />
                                                        <div className="absolute left-[20px] top-[16px]">
                                                            <SearchIcon />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="flex flex-col text-[#008EFF] text-xs font-medium leading-[14px]">
                                                            A<span>Z</span>
                                                        </p>
                                                        <Arrowblue />
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            navigate(
                                                                "/crm/service-control/email"
                                                            );
                                                        }}
                                                        className="w-[200px] bg-[#191242] py-4  px-[14px] text-white text-base flex gap-[10px] items-center justify-center h-[52px] rounded-2xl font-medium"
                                                    >
                                                        <Addicon /> Create Template
                                                    </button>
                                                </div>
                                            </div>
                                            <hr className="bg-[#E6E6EB] mt-[16px] mb-[24px]"></hr>
                                            <div className="mt-8">
                                                {templates?.length &&
                                                    templates?.map((template) => {
                                                        return (
                                                            <div className="flex group border-b hover:bg-[#F0F0F5] border-[#E6E6EB] py-[9px] px-2 items-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setSelectedTemplateModal(
                                                                            template
                                                                        );
                                                                    }}
                                                                    className="flex group w-full border-b hover:bg-[#F0F0F5] border-[#E6E6EB] py-[9px] px-2 items-center"
                                                                >
                                                                    <div className="flex items-center  gap-[18px] w-1/2">
                                                                        <Staricon />
                                                                        <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                                                            {template.emailTitle} |
                                                                            <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                                                                Public Email Templaes
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-[#191242] invisible  flex group-hover:visible items-center gap-2 w-1/2 text-sm font-medium leading-[22px]">
                                                                        <Charticon /> Open rate:66.7%
                                                                        Preview
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                    <Transition
                        appear
                        show={openSelectedTemplateModal}
                        as={Fragment}
                    >
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={closeSelectedTemplateModal}
                        >
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
                                        <Dialog.Panel className="w-full max-w-[717px] transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg mb-2 flex items-center justify-between font-medium leading-6 text-gray-900"
                                            >
                                                Select Template
                                                <button
                                                    onClick={closeSelectedTemplateModal}
                                                    className="bg-[#FDD100] flex items-center justify-center h-[32px] w-[32px] rounded"
                                                >
                                                    <Closeicon />
                                                </button>
                                            </Dialog.Title>
                                            <hr className="bg-[#E6E6EB] mb-8"></hr>
                                            <div className="flex gap-3 items-center">
                                                <label className="text-[#929296] text-lg w-[200px] font-medium leading-[22px]">
                                                    Name
                                                </label>
                                                <div className="border mb-6 flex w-full items-center gap-2 rounded-xl border-[#E6E6EB] p-2">
                                                    <input type="text"
                                                        name="Name"
                                                        value={data?.ApprovalAction?.FinalStage?.emailTemplate?.Name}
                                                        onChange={(e) => setData({
                                                            ...data,
                                                            ApprovalAction: {
                                                                ...data?.ApprovalAction,
                                                                FinalStage: {
                                                                    ...data?.ApprovalAction?.FinalStage,
                                                                    emailTemplate: {
                                                                        ...data?.ApprovalAction?.FinalStage?.emailTemplate,
                                                                        Name: e?.target?.value
                                                                    }
                                                                },
                                                            }
                                                        })}
                                                        placeholder="Type Name" />
                                                </div>
                                            </div>
                                            <div className="flex gap-3 items-center">
                                                <label className="text-[#929296] text-lg w-[200px] font-medium leading-[22px]">
                                                    Users
                                                </label>
                                                <div className="border mb-6 flex w-full items-center gap-2 rounded-xl border-[#E6E6EB] p-2">
                                                    <Select
                                                        className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                                        value={data?.ApprovalAction?.FinalStage?.emailTemplate?.To}
                                                        onChange={changeMultiUserForEmailApprovalAction}
                                                        placeholder="Select Users"
                                                        options={activeUsers}
                                                        isMulti
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-3 items-center">
                                                <label className="text-[#929296] text-lg w-[200px] font-medium leading-[22px]">
                                                    Email Template*
                                                </label>
                                                <div className="border mb-6 flex w-full items-center gap-2 rounded-xl border-[#E6E6EB] p-2">
                                                    <button
                                                        className="bg-[#F8F8FC] text-[#18181B] text-base font-medium leading-[20px] py-[14px] px-4 w-[163px]"
                                                        onClick={() => {
                                                            setOpenSelectedTemplateModal(false);
                                                            setOpenTemplateModal(true);
                                                        }}
                                                    >
                                                        Select Template
                                                    </button>
                                                    <p className="text-[#191242] pl-3 text-base font-medium leading-[20px]">
                                                        {selectedTemplate.emailTitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={closeSelectedTemplateModal}
                                                    className="border w-1/2 border-[#B2B2B6] py-[18px] text-[#B2B2B6] bg-white rounded-2xl text-base font-medium leading-[20px]"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => saveFinalTemplate("ApprovalAction")}
                                                    className="border w-1/2 border-[#B2B2B6] text-white py-[18px] bg-[#191242] rounded-2xl text-base font-medium leading-[20px]"
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                </div>
            </div>
        </>
    );
};

export default ApprovalAction;
