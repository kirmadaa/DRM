import React, { Fragment, useState } from "react";
import {
  Addicon,
  Arrowblue,
  Arrowdowns,
  Charticon,
  Checkicon,
  Closeicon,
  DeleteIcon,
  EditIcon,
  Mailicon,
  Microicon,
  Plusicon,
  SearchIcon,
  Staricon,
  Updateicon,
} from "../../../../assets/svgIcons";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_TEMPLATE_EMAIL_LIST } from "../../../../Redux/actions/serviceControl";
import { useSelector } from "react-redux";
import { GET_FILTERS, SET_LOADER } from "../../../../Redux/actions/user";
import TaskMacro from "../tasks";
import CallMacro from "../calls";
import MeetingMacro from "../meetings";
import SiteVisitsMacro from "../sitevisits";
import {
  CREATE_MACRO,
  GET_MACRO_DETAILS,
  UPDATE_MACRO,
} from "../../../../Redux/actions/comman";
import PageLoader from "../../../../Components/pageLoader";

const hideFilterList = [
  "ModuleTitle",
  "createdTime",
  "updatedTime",
  "tuch",
  "deletedAt",
  "0",
  "_id",
  "LeadOwnerId",
  "tuch",
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
  "VendorOwnerId",
  "InventoryOwnerId",
  "CreatedBy",
  "read"
];

const updateFieldKeyAPIs = {
  Leads: "/get-leads-filter-field",
  Contacts: "/get-contacts-filter-field",
  Opportunites: "/get-deals-filter-field",
  Accounts: "/get-accounts-filter-field",
};

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const templates = useSelector(
    (state) =>
      state?.ServiceControlReducer?.emailTemplates?.data?.EmailData || []
  );
  const fields = useSelector((state) => state.user.filters);

  let [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [loader, setLoader] = useState(false);
  let [openSelectedTemplateModal, setOpenSelectedTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [callData, setCallData] = useState([]);
  const [meetingsData, setMeetingsData] = useState([]);
  const [siteVisitsData, setSiteVisitsData] = useState([]);

  const [query] = useSearchParams();
  const module = query.get("module");
  const macroId = query.get("id");

  const defaultData = {
    module,
    title: "",
    description: "",
    emailTemplateId: "",
    fieldUpdate: [],
    tasks: [],
    calls: [],
    meetings: [],
    sitevisits: [],
  };

  const fieldUpdateDefault = {
    0: "",
  };

  const fieldUpdateInputDefault = {
    0: "",
  };

  const fieldUpdateValueDefault = [
    {
      0: "",
    },
  ];
  const [data, setData] = useState(defaultData);
  const [fieldUpdateData, setFieldUpdateData] = useState(fieldUpdateDefault);
  const [fieldUpdateInput, setFieldUpdateInput] = useState(
    fieldUpdateInputDefault
  );
  const [fieldUpdateValue, setFieldUpdateValue] = useState(
    fieldUpdateValueDefault
  );

  function closeModalOfEmailTemplate() {
    setOpenTemplateModal(false);
  }

  function openModalOfEmailTemplate() {
    setOpenTemplateModal(true);
  }

  function closeSelectedTemplateModal() {
    setOpenSelectedTemplateModal(false);
  }

  function setSelectedTemplateModal(template) {
    setSelectedTemplate({ ...selectedTemplate, ...template });
    closeModalOfEmailTemplate();
    setOpenSelectedTemplateModal(true);
  }

  const taskDataHandler = (data) => {
    const tasks = taskData;
    tasks.push(data);
    setTaskData(tasks);
  };
  const taskEditDataHandler = (data, index) => {
    const tasks = taskData;
    tasks[index] = data;
    setTaskData(tasks);
  };
  const taskDeleteDataHandler = (index) => {
    const tasks = taskData;
    tasks.splice(index, 1);
    setTaskData([...tasks]);
  };

  const callDataHandler = (data) => {
    const calls = callData;
    calls.push(data);
    setCallData(calls);
  };
  const callEditDataHandler = (data, index) => {
    const calls = callData;
    calls[index] = data;
    setCallData(calls);
  };
  const callDeleteDataHandler = (index) => {
    const calls = callData;
    calls.splice(index, 1);
    setCallData([...calls]);
  };

  const meetingsDataHandler = (data) => {
    const meetings = meetingsData;
    meetings.push(data);
    setMeetingsData(meetings);
  };
  const meetingsEditDataHandler = (data, index) => {
    const meetings = meetingsData;
    meetings[index] = data;
    setMeetingsData(meetings);
  };
  const meetingsDeleteDataHandler = (index) => {
    const meetings = meetingsData;
    meetings.splice(index, 1);
    setMeetingsData([...meetings]);
  };

  const siteVisitsDataHandler = (data) => {
    const sitevisits = siteVisitsData;
    sitevisits.push(data);
    setSiteVisitsData(sitevisits);
  };
  const siteVisitsEditDataHandler = (data, index) => {
    const sitevisits = siteVisitsData;
    sitevisits[index] = data;
    setCallData(sitevisits);
  };
  const siteVisitsDeleteDataHandler = (index) => {
    const sitevisits = siteVisitsData;
    sitevisits.splice(index, 1);
    setCallData([...sitevisits]);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e?.target;
    setData({ ...data, [name]: value });
  };

  const searchHandler = (e) => {
    const { name, value } = e?.target;

    dispatch(
      GET_TEMPLATE_EMAIL_LIST({
        limit: 100,
        offset: 1,
        buttonType: "All",
        search: [
          {
            filter: "REGEX",
            field: name,
            data: value,
          },
        ],
      })
    );
  };

  const saveFinalTemplate = () => {
    setData({
      ...data,
      emailTemplateId: selectedTemplate._id,
    });
    setSelectedTemplate({
      ...selectedTemplate,
      finalTitle: selectedTemplate.emailTitle,
    });
    setOpenSelectedTemplateModal(false);
    setOpenTemplateModal(false);
  };

  const saveHandler = () => {
    const finalData = {
      ...data,
      fieldUpdate: fieldUpdateValue,
      tasks: taskData,
      calls: callData,
      meetings: meetingsData,
      sitevisits: siteVisitsData,
    };
    console.log("finalData===>", finalData);

    setLoader(true);
    if (macroId) {
      dispatch(UPDATE_MACRO(macroId, finalData)).then(() => {
        setLoader(false);

        navigate(-2);
      });
    } else {
      dispatch(CREATE_MACRO(finalData)).then(() => {
        setLoader(false);

        navigate(-1);
      });
    }
  };

  const addFieldUpdate = () => {
    const fieldUpdateDataLength = Object.keys(fieldUpdateData).length++;
    const updatedData = { ...fieldUpdateData, [fieldUpdateDataLength]: "" };
    setFieldUpdateData(updatedData);
    const updatedInput = { ...fieldUpdateInput, [fieldUpdateDataLength]: "" };
    setFieldUpdateInput(updatedInput);
    const updatedValue = fieldUpdateValue;
    fieldUpdateValue.push({ [fieldUpdateDataLength]: "" });
    setFieldUpdateValue(updatedValue);
  };

  const deleteFieldUpdate = (index) => {
    const update = fieldUpdateData;
    delete update[index];
    setFieldUpdateData({ ...update });
    const updatedValue = fieldUpdateValue;
    updatedValue.splice(index, 1);
    setFieldUpdateValue(updatedValue);
  };
  const editTemplateHandler = () => {
    setOpenSelectedTemplateModal(true);
  };
  const deleteTemplateHandler = () => {
    setData({
      ...data,
      emailTemplateId: "",
    });
    setSelectedTemplate({});
  };
  const changeHandlerUpdateField = (e, index) => {
    const { value } = e?.target;
    const updatedData = { ...fieldUpdateData, [index]: value };
    setFieldUpdateData(updatedData);
  };
  const onFieldUpdateValueChangeHandler = (e, index) => {
    const { name, value } = e?.target;
    const updatedValue = fieldUpdateValue;
    updatedValue[index] = { [name]: value };
    setFieldUpdateValue(updatedValue);
    const update = { ...fieldUpdateInput, [index]: value };
    setFieldUpdateInput(update);
  };

  useEffect(() => {
    if (macroId) {
      dispatch(GET_MACRO_DETAILS(macroId)).then((res) => {
        const updatedData = res.data[0];
        setTaskData(updatedData?.tasks);
        setCallData(updatedData?.calls);
        setMeetingsData(updatedData?.meetings);
        setSiteVisitsData(updatedData?.sitevisits);
        setFieldUpdateValue(updatedData?.fieldUpdate);
        if (updatedData?.fieldUpdate.length) {
          const dataField = {};
          const inputValue = {};
          updatedData?.fieldUpdate.map((value, index) => {
            dataField[index] = Object.keys(value)[0];
            inputValue[index] = Object.values(value)[0];
          });
          setFieldUpdateData(dataField);
          setFieldUpdateInput(inputValue);
        }
        setData({
          ...data,
          emailTemplateId: updatedData?.emailTemplateId,
          module: updatedData?.module,
          title: updatedData?.title,
          description: updatedData?.description,
        });
        dispatch(
          GET_TEMPLATE_EMAIL_LIST({
            limit: 100,
            offset: 1,
          })
        ).then((res) => {
          const templatedData = res?.data?.EmailData;
          templatedData?.map((template) => {
            if (template._id === updatedData?.emailTemplateId) {
              setSelectedTemplate({
                ...template,
                finalTitle: template.emailTitle,
              });
            }
          });
        });
      });
    }
  }, [macroId]);

  useEffect(() => {
    dispatch(
      GET_TEMPLATE_EMAIL_LIST({
        limit: 100,
        offset: 1,
      })
    );
    console.log("updateFieldKeyAPIs", updateFieldKeyAPIs, module);
    dispatch(GET_FILTERS(updateFieldKeyAPIs[module]));
    SET_LOADER(false);
  }, [dispatch, module]);

  return (
    <div>
      {loader ? (
        <>
          {" "}
          <PageLoader title="Loading" />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between py-[22px] text-lg font-semibold leading-6 px-[60px] bg-white">
            {macroId ? "Update" : "Create"} Macro
            <Microicon />
          </div>
          <div className="bg-[#F8F8FC] pt-[32px] px-[60px]">
            {/* h-[823px] */}
            <div className="bg-white  p-10 rounded-2xl">
              <div className="flex gap-6 pb-8">
                <div className="form flex flex-col w-[479px]">
                  <label className="text-[#1D1D1E] mb-[10px] text-base leading-[22px] font-semibold">
                    Name
                  </label>
                  <input
                    className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                    placeholder="Enter Your Name"
                    name="title"
                    value={data?.title}
                    onChange={(e) => onChangeHandler(e)}
                  ></input>
                </div>
                <div className="form flex flex-col w-[479px]">
                  <label className="text-[#1D1D1E] mb-[10px] text-base leading-[22px] font-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                    placeholder="Enter Description"
                    name="description"
                    value={data?.description}
                    onChange={(e) => onChangeHandler(e)}
                  ></textarea>
                </div>
              </div>
              <div className="pb-[24px]">
                <p className="text-lg font-semibold leading-[26px] mb-5">
                  Criteria
                </p>
                <div className="flex gap-[17px]">
                  <div className="rounded-[20px] w-[360px] border border-[#E6E6EB] overflow-hidden">
                    <div className="flex items-center bg-[#F8F8FC] px-6 py-4">
                      <Mailicon />
                      <p className="text-[#6A6A6D] text-lg ml-2 font-semibold leading-6">
                        Send Email
                      </p>
                    </div>
                    <div className="bg-white p-[25px] rounded-b-[20px]">
                      <p className="mb-[27px] text-base font-medium">
                        Email Template
                      </p>
                      <div className="flex items-center">
                        {!data?.emailTemplateId && (
                          <button
                            type="button"
                            onClick={openModalOfEmailTemplate}
                            className="bg-[#191242] h-12 flex items-center text-base font-medium text-white py-[14px] px-4 rounded-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            Select Template
                          </button>
                        )}
                        {data?.emailTemplateId && (
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
                              onClick={deleteTemplateHandler}
                            >
                              <DeleteIcon />
                            </div>
                          </>
                        )}
                      </div>

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
                                    {templates.length &&
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
                                  {/* <div className="flex items-center  gap-[18px] w-1/2">
                                <Staricon />
                                <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                  BD Email 3 |
                                  <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                    Public Email Templaes
                                  </span>
                                </p>
                              </div>

                              <div className="text-[#191242] invisible  flex group-hover:visible items-center gap-2 w-1/2 text-sm font-medium leading-[22px]">
                                <Charticon /> Open rate:66.7% Preview
                              </div>  */}
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </Dialog>
                      </Transition>
                    </div>
                  </div>
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
                                    {selectedTemplate?.emailTitle}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="flex items-center gap-3 pb-20 mb-3">
                                            <label className="text-[#929296] text-lg w-[200px] font-medium leading-[22px]">
                                              From
                                            </label>
                                            <div className="w-full">
                                              <Menu
                                                as="div"
                                                className="relative inline-block w-full"
                                              >
                                                <div>
                                                  <Menu.Button className="inline-flex justify-between border border-[#E4E4E7] rounded-2xl items-center px-[16px] py-[13px] w-full text-sm text-[#929296] font-medium bg-white">
                                                    All Templates
                                                    <Arrowdowns />
                                                  </Menu.Button>
                                                </div>
                                                <Menu.Items className="absolute right-0 mt-2 z-[99] left-0 origin-top-right divide-y divide-gray-100 overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-[10px] w-[265px]">
                                                  <Menu.Item>
                                                    <Fragment>
                                                      <button className="py-[9px] flex gap-3 text-white text-[14px] pl-5 text-left font-medium leading-[22px] bg-[#191242] w-full">
                                                        isha.saini@brantfordindia.com
                                                      </button>
                                                    </Fragment>
                                                  </Menu.Item>
                                                </Menu.Items>
                                              </Menu>
                                              <p className="text-[#191242] mt-2 text-base font-medium leading-[20px]">
                                                Add Reply To
                                              </p>
                                            </div>
                                          </div> */}
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={closeSelectedTemplateModal}
                                  className="border w-1/2 border-[#B2B2B6] py-[18px] text-[#B2B2B6] bg-white rounded-2xl text-base font-medium leading-[20px]"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveFinalTemplate}
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
                  <div className="rounded-[20px] w-[720px] border border-[#E6E6EB] overflow-hidden">
                    <div className="flex  justify-between bg-[#F8F8FC] px-6 py-4">
                      <div className="flex items-center ">
                        <Updateicon />
                        <p className="text-[#6A6A6D] text-lg ml-2 font-semibold leading-6">
                          Update Field
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={addFieldUpdate}
                          className="bg-[#FFF7BE] h-12 flex items-center text-base font-medium text-[#FC9F00] py-[14px] px-4 rounded-[10px] w-[169px] justify-center m-auto"
                        >
                          <Plusicon className="ml-[10px]" />
                          Add Field
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-[25px] rounded-b-[20px]">
                      <table>
                        <th className="text-left">
                          <p className="text-left text-[#6A6A6D] text-lg font-semibold leading-6">
                            Field
                          </p>
                        </th>
                        <th></th>
                        <th className="text-left">
                          {Object.values(fieldUpdateData)[0] && (
                            <p className="text-left text-[#6A6A6D] text-lg font-semibold leading-6">
                              New Value
                            </p>
                          )}
                        </th>
                        {/* <div
                          className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                          onClick={addFieldUpdate}
                        >
                          <Plusicon className="bg-[#FDD100] flex items-center justify-center h-[32px] w-[32px] rounded" />
                        </div> */}
                        <tbody>
                          {Object.keys(fieldUpdateData)?.map(
                            (fieldUpdate, index) => {
                              return (
                                <tr className="mb-4">
                                  <td>
                                    <select
                                      className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                      placeholder="Select Field"
                                      name={fieldUpdate?.name}
                                      value={fieldUpdateData[index]}
                                      // defaultValue={fieldUpdate?.name}
                                      onChange={(e) =>
                                        changeHandlerUpdateField(e, index)
                                      }
                                    >
                                      <option value="0">Choose a Field</option>
                                      {fields
                                        .filter(
                                          (item) =>
                                            !hideFilterList?.includes(item)
                                        )
                                        .map((field) => {
                                          return (
                                            <option value={field}>
                                              {field}
                                            </option>
                                          );
                                        })}
                                    </select>
                                  </td>
                                  {fieldUpdateData[index] && (
                                    <>
                                      <td>
                                        <h5 className="mx-2">=</h5>
                                      </td>

                                      <td>
                                        <input
                                          className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                          placeholder="Enter Value"
                                          name={fieldUpdateData[index]}
                                          value={fieldUpdateInput[index]}
                                          onChange={(e) =>
                                            onFieldUpdateValueChangeHandler(
                                              e,
                                              index
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <div
                                          className="ml-4 flex items-center gap-2 py-2 px-[10px] bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                                          onClick={(e) =>
                                            deleteFieldUpdate(index)
                                          }
                                        >
                                          <DeleteIcon />
                                        </div>
                                      </td>
                                    </>
                                  )}
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-[24px]">
                <div className="flex gap-[17px]">
                  <TaskMacro
                    taskDataHandler={taskDataHandler}
                    taskData={taskData}
                    taskEditDataHandler={taskEditDataHandler}
                    taskDeleteDataHandler={taskDeleteDataHandler}
                  />
                </div>
              </div>
              <div className="pb-[24px]">
                <div className="flex gap-[17px]">
                  <CallMacro
                    callDataHandler={callDataHandler}
                    callData={callData}
                    callEditDataHandler={callEditDataHandler}
                    callDeleteDataHandler={callDeleteDataHandler}
                  />
                </div>
              </div>
              <div className="pb-[24px]">
                <div className="flex gap-[17px]">
                  <MeetingMacro
                    meetingDataHandler={meetingsDataHandler}
                    meetingData={meetingsData}
                    meetingEditDataHandler={meetingsEditDataHandler}
                    meetingDeleteDataHandler={meetingsDeleteDataHandler}
                  />
                </div>
              </div>
              <div className="pb-[24px]">
                <div className="flex gap-[17px]">
                  <SiteVisitsMacro
                    siteVisitsDataHandler={siteVisitsDataHandler}
                    siteVisitsData={siteVisitsData}
                    siteVisitsEditDataHandler={siteVisitsEditDataHandler}
                    siteVisitsDeleteDataHandler={siteVisitsDeleteDataHandler}
                  />
                </div>
              </div>
              <div className="pb-[24px]">
                <div className="flex space-x-2 ">
                  <button
                    className="h-[48px] text-base text-white font-medium w-[132px] rounded-[10px] bg-[#191242]"
                    onClick={saveHandler}
                  >
                    {macroId ? "Update" : "Create"}
                  </button>
                  <button className="h-[48px] border border-[#E4E4E7] text-base font-medium w-[132px] rounded-[10px] bg-white" onClick={() => { macroId ? navigate(- 2) : navigate(-1) }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }
    </div >
  );
};

export default Index;
