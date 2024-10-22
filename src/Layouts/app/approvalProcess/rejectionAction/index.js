import { useState } from "react";
import { Addicon, Arrowblue, Arrowdowns, Charticon, Checkicon, Closeicon, DeleteIcon, EditIcon, Mailicon, Plusicon, SearchIcon, Staricon, Taskicon, Updateicon } from "../../../../assets/svgIcons";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Menu } from "react-feather";

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

const RejectionAction = ({
    data,
    setData,
    fields,
    searchHandler,
    templates,
    activeUsers,
    selectedRejectionTemplate,
    setSelectedRejectionTemplate
}) => {
    const navigate = useNavigate()
    const [rejectionUpdateFieldModel, setRejectionUpdateFieldModel] = useState(false)
    let [openRejectionTemplateModal, setRejectiontOpenTemplateModal] = useState(false);
    let [openRejectionSelectedTemplateModal, setRejectionOpenSelectedTemplateModal] =
        useState(false);


    const deleteTemplateHandler = (module) => {
        setData({
            ...data,
            [module]: {
                ...data[module],
                emailTemplate: {
                    Name: "",
                    To: [],
                    TemplateId: ""
                }
            }
        });
        setSelectedRejectionTemplate({})
    };

    const deleteRejectionUpdateFieldModel = () => {
        setData({
            ...data, RejectionAction: {
                ...data?.RejectionAction,
                updateField: {
                    ActionName: "updatefield",
                    field: "0",
                    data: ""
                }
            }
        })
    }

    function setRejectionSelectedTemplateModal(template) {
        setSelectedRejectionTemplate({ ...selectedRejectionTemplate, ...template });
        setRejectiontOpenTemplateModal(false)
        setRejectionOpenSelectedTemplateModal(true)
    }

    const changeMultiUserForEmailRejectionAction = (value) => {
        setData({
            ...data,
            RejectionAction: {
                ...data?.RejectionAction,
                emailTemplate: {
                    ...data?.RejectionAction?.emailTemplate,
                    To: value
                }
            }
        })
    }

    const saveFinalTemplate = (module) => {

        setData({
            ...data,
            [module]: {
                ...data[module],
                emailTemplate: {
                    ...data[module].emailTemplate,
                    TemplateId: selectedRejectionTemplate._id
                }
            }
        })

        setSelectedRejectionTemplate({
            ...selectedRejectionTemplate,
            finalTitle: selectedRejectionTemplate.emailTitle,
        });
        setRejectionOpenSelectedTemplateModal(false)
        setRejectiontOpenTemplateModal(false)
    };

    const rejectionEachStageChanegHanlder = (e) => {
        const { name, value } = e?.target
        setData({
            ...data,
            RejectionAction: {
                ...data?.RejectionAction,
                updateField: {
                    ...data?.RejectionAction?.updateField,
                    [name]: value
                }
            }
        })
    }

    const saveRejectionUpdateField = (e) => {
        setRejectionUpdateFieldModel(false)
    }

    return (
        <>
            <div className="pb-[24px]">
                <p className="text-lg font-semibold leading-[26px] mb-5">
                    4. Action(s) upon Rejection
                </p>
                <h1>Configure Action After Rejection</h1>
                <div className="flex gap-[17px]">
                    <div className="rounded-xl w-[360px] border border-[#E6E6EB] p-2 overflow-hidden">
                        <div className="flex items-center rounded-xl bg-[#F8F8FC] px-4 py-4">
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
                                {!data?.RejectionAction?.emailTemplate?.TemplateId && (
                                    <button
                                        type="button"
                                        onClick={() => setRejectiontOpenTemplateModal(true)}
                                        className="bg-[#191242] h-12 flex items-center text-base font-medium text-white py-[14px] px-4 rounded-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    >
                                        Select Template
                                    </button>
                                )}
                                {data?.RejectionAction?.emailTemplate?.TemplateId && (
                                    <>
                                        <h5>{selectedRejectionTemplate?.finalTitle}</h5>
                                        <div
                                            className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                            onClick={() => setRejectionOpenSelectedTemplateModal(true)}
                                        >
                                            <EditIcon />
                                        </div>
                                        <div
                                            className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                            onClick={() => deleteTemplateHandler("RejectionAction")}
                                        >
                                            <DeleteIcon />
                                        </div>
                                    </>
                                )}
                            </div>


                        </div>
                    </div>

                    <div className="rounded-[20px] w-[360px] border border-[#E6E6EB] overflow-hidden p-2">
                        <div className="flex  justify-between bg-[#F8F8FC] px-2 py-4 rounded-xl">
                            <div className="flex items-center ">
                                <Updateicon />
                                <p className="text-[#6A6A6D] ml-1 text-lg font-semibold leading-6">
                                    Update Field
                                </p>
                            </div>
                            {!rejectionUpdateFieldModel &&
                                (data?.RejectionAction?.updateField?.field === "0") && < div >
                                    <button
                                        onClick={() => setRejectionUpdateFieldModel(true)}
                                        className="bg-[#FFF7BE] ml-1 h-12 flex items-center text-base font-medium text-[#FC9F00] py-[14px] px-4 rounded-[10px] justify-center m-auto"
                                    >
                                        <Plusicon />
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
                                {!rejectionUpdateFieldModel &&
                                    (data?.RejectionAction?.updateField?.field !== "0") && <tbody>
                                        <tr>
                                            <td
                                            ><h1>Field Name:</h1>
                                            </td>
                                            <td>
                                                <h3 className="px-2">{data?.RejectionAction?.updateField?.field}</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h1>On 1st approval:</h1>
                                            </td>
                                            <td>
                                                <h3 className="px-2">{data?.RejectionAction?.updateField?.data}</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> 
                                            <div
                                                className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                                onClick={() => setRejectionUpdateFieldModel(true)}
                                            >
                                                <EditIcon />
                                            </div>
                                            </td>
                                            <td>
                                                <div
                                                    className="ml-2 flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                                    onClick={() => deleteRejectionUpdateFieldModel()}
                                                >
                                                    <DeleteIcon />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>}
                            </table>
                        </div>

                        <Transition appear show={openRejectionTemplateModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={() => setRejectiontOpenTemplateModal(false)}
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
                                                        onClick={() => setRejectiontOpenTemplateModal(false)}
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
                                                                            setRejectionSelectedTemplateModal(
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
                            show={openRejectionSelectedTemplateModal}
                            as={Fragment}
                        >
                            <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={() => setRejectionOpenSelectedTemplateModal(false)}
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
                                                        onClick={() => setRejectionOpenSelectedTemplateModal(false)}
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
                                                            value={data?.RejectionAction?.emailTemplate?.Name}
                                                            onChange={(e) => setData({
                                                                ...data,
                                                                RejectionAction: {
                                                                    ...data?.RejectionAction,
                                                                    emailTemplate: {
                                                                        ...data?.RejectionAction?.emailTemplate,
                                                                        Name: e?.target?.value
                                                                    }
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
                                                            value={data?.RejectionAction?.emailTemplate?.To}
                                                            onChange={changeMultiUserForEmailRejectionAction}
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
                                                                setRejectionOpenSelectedTemplateModal(false);
                                                                setRejectiontOpenTemplateModal(true);
                                                            }}
                                                        >
                                                            Select Template
                                                        </button>
                                                        <p className="text-[#191242] pl-3 text-base font-medium leading-[20px]">
                                                            {selectedRejectionTemplate.emailTitle}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => setRejectionOpenSelectedTemplateModal(false)}
                                                        className="border w-1/2 border-[#B2B2B6] py-[18px] text-[#B2B2B6] bg-white rounded-2xl text-base font-medium leading-[20px]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveFinalTemplate("RejectionAction")}
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
                            show={rejectionUpdateFieldModel}
                            as={Fragment}
                        >
                            <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={() => setRejectionUpdateFieldModel(false)}
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
                                                        onClick={() => setRejectionUpdateFieldModel(false)}
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
                                                            value={data?.RejectionAction?.updateField?.field}
                                                            onChange={(e) =>
                                                                rejectionEachStageChanegHanlder(e)
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
                                                                value={data?.RejectionAction?.updateField?.data}
                                                                onChange={(e) =>
                                                                    rejectionEachStageChanegHanlder(e)
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => setRejectionUpdateFieldModel(false)}
                                                        className="border w-1/2 border-[#B2B2B6] py-[18px] text-[#B2B2B6] bg-white rounded-2xl text-base font-medium leading-[20px]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveRejectionUpdateField()}
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
            </div>
        </>
    );
};

export default RejectionAction;
