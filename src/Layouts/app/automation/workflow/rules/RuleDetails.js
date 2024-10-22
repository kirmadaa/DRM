import React, { useEffect, useState } from "react";
import { BackIcon } from "../../../../../assets/svgIcons";
import { LockIcon } from "../../../../../assets/svgIcons";
import { ActionIcon } from "../../../../../assets/svgIcons";
import { PlusWhite } from "../../../../../assets/svgIcons";
import { SandClock } from "../../../../../assets/svgIcons";
import {
  GET_FILTERS,
  GET_USER_PROFILE,
} from "../../../../../Redux/actions/user";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import EnumFilter from "../../../../../Components/enumFilter";
import { list } from "../../../../../Components/module";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { Edit, MinusCircle, PlusCircle } from "react-feather";
import EmailNotificationModal from "./emailModal";
import { GET_TEMPLATE_EMAIL_LIST } from "../../../../../Redux/actions/serviceControl";
import { GENERATE_NEW_WORKFLOW } from "../../../../../Redux/actions/workflow";
import { GET_ALL_ACTIVE_USER } from "../../../../../Redux/actions/userList";
import ActionModal from "./ActionModal";
import ActionEditModal from "./ActionEditModal";
import AssignOwnerModal from "./AssignOwnerMOdal";
import FieldUpdateModal from "./FieldUpdateMOdal";

const RuleDetails = () => {
  const [when, setWhen] = useState({
    value: "",
    selected: false,
    repeat: false,
  });
  const [emailRadio, setEmailRadio] = useState();
  const [emailInfo, setEmailInfo] = useState({
    info: null,
    show: false,
    toMail: "",
  });
  const [emailRadioScheduled, setEmailRadioScheduled] = useState();
  const [emailInfoScheduled, setEmailInfoScheduled] = useState({
    info: null,
    show: false,
    toMail: "",
  });

  const [conditionArray, setConditionArray] = useState([
    {
      condition: "",
      enum: "",
      text: "",
    },
  ]);
  const [userId, setUserId] = useState();
  const [schedule, setSchedule] = useState({
    count: "",
    time: "",
  });
  const [emailModal, setEmailModal] = useState(false);
  const [emailModalType, setEmailModalType] = useState();
  const [actionModal, setActionModal] = useState(false);
  const [searchParams] = useSearchParams();
  // console.log("heyhhydyfbfbe", );
  const [assignModal, setAssignModal] = useState({ show: false, type: "" });
  const [fieldModal, setFieldModal] = useState({ show: false, type: "" });
  const [assignData, setAssignData] = useState({
    scheduledAction: "",
    instantAction: "",
  });
  const [fieldData, setFieldData] = useState({
    scheduledAction: {
      name: "",
      field: "",
      data: "",
    },
    instantAction: {
      name: "",
      field: "",
      data: "",
    },
  });
  const [actionEditModal, setActionEditModal] = useState(false);
  const [desc, setDesc] = useState();
  const [descEdit, setDescEdit] = useState(false);
  const [moduleFilters, setModuleFilters] = useState([]);
  const [conditionShow, setConditionShow] = useState(true);
  const [users, setUsers] = useState();
  const [modalType, setModalType] = useState({ type: "", actionType: "" });
  const [selectedFilter, setselectedFilter] = useState({
    filter: "",
  });
  const [actionData, setActionData] = useState([]);
  const [actionScheduledData, setActionScheduledData] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const importPageIs = searchParams.get("module");
  const handleChange = (i, name, value) => {
    let newArray = [...conditionArray]?.map((item, index) => {
      if (index === i) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setConditionArray(newArray);
  };

  const hideFilterList = [
    "_id",
    "LeadOwnerId",
    "organizationId",
    "DealOwnerId",
    "ContactOwnerId",
    "AccountOwnerId",
    "TaskOwnerId",
    "MeetingOwnerId",
    "callOwnerId",
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
    "VendorOwnerId",
  ];

  const removeCondition = (index) => {
    let array = [...conditionArray]?.filter((ele, i) => i !== index);
    setConditionArray(array);
  };

  const closeEditModal = () => {
    setModalType(null);
    setActionEditModal(false);
  };

  const allInstantActionData = () => {
    let array = [];
    if (emailRadio?.name && emailRadio?.value && emailRadio?.toMail) {
      array.push({
        ActionName: "sendEmail",
        Name: emailRadio?.name,
        To: [emailInfo?.toMail],
        TemplateId: emailRadio?.value,
      });
    }
    if (assignData?.instantAction) {
      array.push({
        ActionName: "assignowner",
        data: {
          OwnerId: assignData?.instantAction,
        },
      });
    }
    if (fieldData?.instantAction) {
      array.push({
        ActionName: "fieldupdate",
        Name: fieldData?.instantAction?.name,
        data: {
          [fieldData?.instantAction?.field]: fieldData?.instantAction?.data,
        },
      });
    }

    if (actionData?.length > 0) {
      array.push(...actionData);
    }

    return {
      InstantActions: array,
    };
  };
  const allScheduledActionData = () => {
    let array = [];
    if (
      emailRadioScheduled?.name &&
      emailRadioScheduled?.value &&
      emailRadioScheduled?.toMail
    ) {
      array.push({
        ActionName: "sendEmail",
        Name: emailRadioScheduled?.name,
        To: [emailInfoScheduled?.toMail],
        TemplateId: emailRadioScheduled?.value,
      });
    }

    if (assignData?.scheduledAction) {
      array.push({
        ActionName: "assignowner",
        data: {
          OwnerId: assignData?.scheduledAction,
        },
      });
    }
    if (fieldData?.scheduledAction) {
      array.push({
        ActionName: "fieldupdate",
        Name: fieldData?.scheduledAction?.name,
        data: {
          [fieldData?.scheduledAction?.field]: fieldData?.scheduledAction?.data,
        },
      });
    }

    if (actionScheduledData?.length > 0) {
      array.push(...actionScheduledData);
    }

    return {
      scheduledActions: {
        time: {
          ActionName: "scheduleTime",
          time: schedule?.time,
          count: schedule?.count,
        },
        action: array,
      },
    };
  };

  const handlePost = async () => {
    let newValue = {
      WorkFlowsOwnerId: userId,
      status: true,
      ModuleTitle: importPageIs,
      RuleName: location?.state?.rulesName,
      Description: desc,
      when: {
        ExecuteType: "RecordAction",
        ExecuteAction: {
          create: when?.value === "Create" || when?.value === "Create or Edit",
          edit: when?.value === "Edit" || when?.value === "Create or Edit",
        },
        Repeat: when?.repeat,
      },
      condition: {
        all: !conditionShow,
        certain: {
          cond1: {
            key: conditionArray?.[0]?.condition,
            oprator: conditionArray?.[0]?.enum,
            value: conditionArray?.[0]?.text,
          },

          cond2: {
            key: conditionArray?.[1]?.condition,
            oprator: conditionArray?.[1]?.enum,
            value: conditionArray?.[1]?.text,
          },
          CriteriaPattern: "( 1 and 2 )",
        },
      },

      ...allInstantActionData(),
      ...allScheduledActionData(),
      // InstantActions: [
      //   {
      //     ActionName: "sendEmail",
      //     Name: emailRadio?.name,
      //     To: [emailInfo?.toMail],
      //     TemplateId: emailRadio?.value,
      //   },
      //   ...actionData,
      // ],
    };
    const res = await dispatch(GENERATE_NEW_WORKFLOW(newValue));
    if (res?.success) {
      navigate("/crm/workflow-rules");
    }
  };

  const taskDataHandler = (values) => {
    if (modalType?.actionType === "instantAction") {
      let newData = [...actionData];
      const existingIndex = newData.findIndex(
        (ele) => ele.ActionName === modalType?.type
      );
      if (existingIndex !== -1) {
        newData[existingIndex].data = { ...values };
      } else {
        newData.push({ ActionName: modalType?.type, data: { ...values } });
      }
      setActionData(newData);
    } else {
      let newData = [...actionScheduledData];

      const existingIndex = newData.findIndex(
        (ele) => ele.ActionName === modalType?.type
      );
      if (existingIndex !== -1) {
        newData[existingIndex].data = { ...values };
      } else {
        newData.push({ ActionName: modalType?.type, data: { ...values } });
      }
      setActionScheduledData(newData);
    }
  };
  const closeModal = () => {
    setModalType(null);
    setActionModal(false);
  };

  useEffect(() => {
    if (importPageIs) {
      dispatch(GET_FILTERS(list[importPageIs]?.filterApi)).then((res) => {
        if (res) {
          setModuleFilters(res?.data);
        }
      });
    }
  }, [location]);

  useEffect(() => {
    dispatch(GET_USER_PROFILE()).then((res) => {
      if (res?.success) {
        setUserId(res?.data?.data[0]?.userId);
      }
    });

    dispatch(
      GET_TEMPLATE_EMAIL_LIST({
        limit: 30000,
        offset: 1,
        buttonType: "All",
        search: [],
      })
    );

    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 10000)).then(
      (res) => {
        if (res?.status === 200) {
          setUsers(res?.data?.data);
        }
      }
    );
  }, []);
  useEffect(() => {
    if (location?.state?.rulesDesc) {
      setDesc(location?.state?.rulesDesc);
    }
  }, [location]);

  return (
    <>
      <div className="h-full">
        <div className="my-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackIcon />
              <h6 className="text-[#191242] text-xl font-semibold ">
                {location?.state?.rulesName} - @{importPageIs || ""}
              </h6>
              <LockIcon />
            </div>
            {/* <div className="flex items-center gap-3">
              <button className=" bg-[#FFEAEF] border rounded-3xl py-2 px-3 text-[#FE3F34] font-semibold border-none">
                Deactivate
              </button>
              <button className=" bg-[#191242] border rounded-3xl py-2 px-3 text-[#fff] font-semibold border-none">
                View Usage
              </button>
              <button className=" bg-[#FCF2CE] border rounded-xl p-2 border-none">
                <MoreIcon />
              </button>
            </div> */}
          </div>
          <div className="my-5 xl:w-8/12">
            {!descEdit ? (
              <p
                className="text-[#20B8B0] font-semibold"
                onClick={() => setDescEdit(true)}
              >
                {desc || "Add Description"}
              </p>
            ) : (
              <textarea
                name="description"
                rows="4"
                cols="50"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                onBlur={() => setDescEdit(false)}
              />
            )}
          </div>
          <div className="my-5 xl:w-8/12">
            <div className="py-8">
              <div className="flex items-center  relative z-30">
                <div className="flex items-center">
                  <span className="h-32 w-32 bg-[#191242] text-white flex items-center justify-center rounded-full">
                    When
                  </span>
                  <div>
                    <span className="h-1 w-40  inline-block  bg-[#191242]"></span>
                  </div>
                </div>
                {!when?.selected ? (
                  <p className="border-2 border-[#191242] bg-[#ffffff] rounded-lg text-[#000000] p-3 w-max">
                    <p>Execute this workflow rule based on</p>
                    <div>
                      <select
                        className=" placeholder-opacity-100 focus:outline-0 text-base border-2 border-[#191242] m-3 rounded-lg"
                        name="when_selector"
                        onChange={(e) =>
                          setWhen({ ...when, value: e.target.value })
                        }
                        value={when?.value}
                        // defaultValue={permissionValue}
                      >
                        <option>Choose condition</option>
                        <option value="Create">Create</option>
                        <option value="Edit">Edit</option>
                        <option value="Create or Edit">Create or Edit</option>
                      </select>
                    </div>
                    {(when?.value === "Create or Edit" ||
                      when?.value === "Edit") && (
                      <div className="custom-control custom-checkbox mb-1 flex items-center gap-2 m-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          onChange={(e) =>
                            setWhen({ ...when, repeat: e.target.checked })
                          }
                          checked={when?.repeat}
                        />
                        <label className="custom-control-label text-base font-medium text-[#929296]">
                          Repeat this workflow whenever a Lead is edited
                        </label>
                      </div>
                    )}
                    <div className="text-right">
                      <button
                        className=" text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[38px] text-center w-[110px]"
                        onClick={() => {
                          when?.value === "Create"
                            ? setWhen({
                                ...when,
                                selected: true,
                                repeat: false,
                              })
                            : setWhen({ ...when, selected: true });
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </p>
                ) : (
                  <>
                    <div className="border-2 border-[#E6E6EB] bg-[#FFFCE4] rounded-lg flex justify-between items-center">
                      <p className="text-[#929296] p-3 whitespace-normal">
                        This rule will be executed when a deal is{" "}
                        <span className="font-semibold">
                          {when?.value === "Create"
                            ? "created "
                            : when?.value === "Edit"
                            ? "edited "
                            : "Created or Edited "}
                        </span>
                        to meet the condition (if any).
                      </p>
                      <div className="-mt-4 pe-1">
                        <Edit
                          onClick={() => setWhen({ ...when, selected: false })}
                        />{" "}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {when?.selected && (
              <>
                <div className="py-8 pt-12 ps-4">
                  <div className="relative">
                    <span className="absolute h-36 w-1 -top-24 left-[62px] z-0 bg-[#191242]"></span>
                  </div>
                  <div>
                    <div className="flex items-start ">
                      <div className="flex items-center">
                        <span className="h-32 w-32 bg-[#191242] text-white flex items-center justify-center rounded-lg rotate-45">
                          <span className="-rotate-45">Condition 1</span>
                        </span>
                        <div className="">
                          <span className="inline-block  h-1 w-40 bg-[#191242] "></span>
                        </div>
                      </div>
                      <div className="p-6 bg-[#fff] rounded-lg w-[700px]">
                        <div className="">
                          <p>
                            Which {importPageIs} would you like to apply the
                            rule to?
                          </p>
                          <div>
                            <div className="flex items-center  gap-[18px] m-3 ">
                              <input
                                type="radio"
                                name="radio"
                                onChange={(e) => setConditionShow(true)}
                                checked={conditionShow}
                              />
                              <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                  {importPageIs} matching certain conditions
                                </span>
                              </p>
                              <input
                                type="radio"
                                name="radio"
                                onChange={(e) => setConditionShow(false)}
                                checked={!conditionShow}
                              />
                              <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                  All {importPageIs}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        {conditionShow && (
                          <>
                            {conditionArray?.map((item, index) => (
                              <div className="flex items-center justify-start gap-5 mb-5">
                                <p className="p-2 bg-[#191242] h-5 w-5 ring-offset-2 ring-4  ring-[#E4E6EE] text-[#fff] font-semibold flex items-center justify-center rounded-full text-sm">
                                  {index + 1}
                                </p>
                                <p className="test-xs ">
                                  <div className="flex items-center gap-4">
                                    {/* <p className="text-base font-semibold mb-3">Transfer To</p> */}
                                    <div className="border border-[#E6E6EB] rounded-xl p-3">
                                      <select
                                        className="form-control pe-3 focus:outline-none"
                                        name="condition"
                                        onChange={(e) =>
                                          handleChange(
                                            index,
                                            "condition",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="">
                                          Select condition
                                        </option>

                                        {moduleFilters
                                          ?.filter(
                                            (filter) =>
                                              !hideFilterList.includes(filter)
                                          )
                                          ?.map((item, index) => (
                                            <option value={item} key={index}>
                                              {item}
                                            </option>
                                          ))}
                                      </select>
                                    </div>
                                    <EnumFilter
                                      filter={conditionArray[index]?.enum}
                                      setCondition={(e, value) =>
                                        handleChange(index, "enum", value)
                                      }
                                      name={selectedFilter?.key}
                                      comp
                                    />
                                    <input
                                      type="text"
                                      className="bg-[#F9F9FB] border border-[#191242] rounded-xl px-4 py-3 focus:outline-none w-5/12"
                                      onChange={(e) =>
                                        handleChange(
                                          index,
                                          "text",
                                          e.target.value
                                        )
                                      }
                                    />
                                    {conditionArray?.length !== 1 && (
                                      <MinusCircle
                                        className="text-2xl"
                                        onClick={() => removeCondition(index)}
                                      />
                                    )}
                                    <PlusCircle
                                      className="text-2xl"
                                      onClick={() =>
                                        setConditionArray([
                                          ...conditionArray,
                                          {
                                            condition: "",
                                            enum: "",
                                            text: "",
                                          },
                                        ])
                                      }
                                    />
                                  </div>
                                </p>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-8">
                  <div className="flex">
                    <div className="" style={{ minWidth: "295px" }}>
                      {/* <p className="text-center w-fit text-[#20B8B0] font-semibold cursor-pointer">
                        + Add another <br /> Condition
                      </p> */}
                    </div>

                    <div className="flex  ">
                      <div className="relative">
                        <span className="absolute h-32 w-1 -top-24 left-12 -z-50 bg-[#191242]"></span>
                      </div>
                      <div className="p-5 bg-[#F7FFFF] rounded-lg whitespace-nowrap w-80">
                        <div className="flex items-center gap-5">
                          <ActionIcon />
                          <p className="whitespace-nowrap">Instant Actions</p>
                        </div>
                        <div className="mt-3">
                          {emailRadio?.name && (
                            <h6
                              className="font-semibold"
                              onClick={() => {
                                setEmailModal(true);
                              }}
                            >
                              Email - {emailRadio?.name}
                            </h6>
                          )}
                          {fieldData?.instantAction?.field &&
                            fieldData?.instantAction?.data && (
                              <h6
                                className="font-semibold"
                                onClick={() => {
                                  setFieldModal({
                                    show: true,
                                    type: "instantAction",
                                  });
                                }}
                              >
                                Field - {fieldData?.instantAction?.field} -{" "}
                                {fieldData?.instantAction?.data}
                              </h6>
                            )}
                          {assignData?.instantAction && (
                            <h6
                              className="font-semibold"
                              onClick={() => {
                                setAssignModal({
                                  show: true,
                                  type: "instantAction",
                                });
                              }}
                            >
                              Owner -{" "}
                              {users?.usersData?.map((item, index) => {
                                if (item?._id === assignData?.instantAction) {
                                  return (
                                    <p
                                      key={index}
                                    >{`${item?.firstName} ${item?.lastName}`}</p>
                                  );
                                }
                              })}
                            </h6>
                          )}

                          {actionData?.map((item, index) => (
                            <h6
                              className="font-semibold"
                              onClick={() => {
                                setModalType({
                                  type: item?.ActionName,
                                  actionType: "instantAction",
                                });
                                setActionEditModal(true);
                              }}
                              key={index}
                            >
                              {item?.ActionName}
                            </h6>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Menu as="div" className="relative inline-block z-50">
                            <Menu.Button className="inline-flex items-center  w-full justify-center px-4 py-3 ">
                              <button className="flex items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90 w-full">
                                <PlusWhite /> Action
                              </button>
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setEmailModalType("instantAction");
                                        setEmailModal(true);
                                      }}
                                    >
                                      Email Notification
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Tasks",
                                          actionType: "instantAction",
                                        });
                                        setActionModal(true);
                                      }}
                                    >
                                      Tasks
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Contacts",
                                          actionType: "instantAction",
                                        });
                                        setActionModal(true);
                                      }}
                                    >
                                      Contacts
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Calls",
                                          actionType: "instantAction",
                                        });
                                        setActionModal(true);
                                      }}
                                    >
                                      Calls
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Meeting",
                                          actionType: "instantAction",
                                        });
                                        setActionModal(true);
                                      }}
                                    >
                                      Meeting
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setAssignModal({
                                          show: true,
                                          type: "instantAction",
                                        });
                                      }}
                                    >
                                      Assign Owner
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setFieldModal({
                                          show: true,
                                          type: "instantAction",
                                        });
                                      }}
                                    >
                                      Field Update
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </div>
                      </div>
                      <div>
                        <span className="h-1 w-28 inline-block bg-[#191242]"></span>
                      </div>
                      <div className="p-3 border-dashed border-2 rounded-xl border-[#191242]  gap-5 h-fit">
                        <div className="flex items-center justify-center my-3">
                          <SandClock />
                          <p className="text-[#18181B] font-semibold text-base">
                            Scheduled Action
                          </p>
                        </div>
                        <div className="test-xs ">
                          <div className="flex items-center gap-4">
                            {/* <p className="text-base font-semibold mb-3">Transfer To</p> */}
                            <div className="border border-[#E6E6EB] rounded-xl p-3">
                              <input
                                type="number"
                                className="bg-[#F9F9FB] border border-[#191242] rounded-xl  py-3 focus:outline-none w-3/12"
                                onChange={(e) =>
                                  setSchedule({
                                    ...schedule,
                                    count: e.target.value,
                                  })
                                }
                                value={schedule?.count}
                              />
                              <select
                                className="form-control pe-3 focus:outline-none"
                                name="condition"
                                onChange={(e) =>
                                  setSchedule({
                                    ...schedule,
                                    time: e.target.value,
                                  })
                                }
                                value={schedule?.time}
                              >
                                <option value="">Select Timeline</option>
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                                <option value="month">Month</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          {emailRadioScheduled?.name && (
                            <h6
                              className="font-semibold"
                              onClick={() => {
                                setEmailModal(true);
                              }}
                            >
                              Email - {emailRadioScheduled?.name}
                            </h6>
                          )}
                          {fieldData?.scheduledAction?.field &&
                            fieldData?.scheduledAction?.data && (
                              <h6
                                className="font-semibold"
                                onClick={() => {
                                  setFieldModal({
                                    show: true,
                                    type: "scheduledAction",
                                  });
                                }}
                              >
                                Field - {fieldData?.scheduledAction?.field} -{" "}
                                {fieldData?.scheduledAction?.data}
                              </h6>
                            )}

                          {assignData?.scheduledAction && (
                            <h6
                              className="font-semibold"
                              onClick={() => {
                                setAssignModal({
                                  show: true,
                                  type: "scheduledAction",
                                });
                              }}
                            >
                              Owner -{" "}
                              {users?.usersData?.map((item, index) => {
                                if (item?._id === assignData?.scheduledAction) {
                                  return (
                                    <p
                                      key={index}
                                    >{`${item?.firstName} ${item?.lastName}`}</p>
                                  );
                                }
                              })}
                            </h6>
                          )}

                          {actionScheduledData?.map((item, index) => (
                            <h6
                              className="font-semibold"
                              onClick={() => {
                                setModalType({
                                  type: item?.ActionName,
                                  actionType: "scheduledAction",
                                });
                                setActionEditModal(true);
                              }}
                              key={index}
                            >
                              {item?.ActionName}
                            </h6>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <Menu as="div" className="relative inline-block z-50">
                            <Menu.Button className="inline-flex items-center  w-full justify-center px-4 py-3 ">
                              <button className="flex items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90 w-full">
                                <PlusWhite /> Action
                              </button>
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setEmailModalType("scheduledAction");
                                        setEmailModal(true);
                                      }}
                                    >
                                      Email Notification
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Tasks",
                                          actionType: "scheduledAction",
                                        });
                                        setActionModal(true);
                                      }}
                                    >
                                      Tasks
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Contacts",
                                          actionType: "scheduledAction",
                                        });

                                        setActionModal(true);
                                      }}
                                    >
                                      Contacts
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Calls",
                                          actionType: "scheduledAction",
                                        });

                                        setActionModal(true);
                                      }}
                                    >
                                      Calls
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setModalType({
                                          type: "Meeting",
                                          actionType: "scheduledAction",
                                        });

                                        setActionModal(true);
                                      }}
                                    >
                                      Meeting
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setAssignModal({
                                          show: true,
                                          type: "scheduledAction",
                                        });
                                      }}
                                    >
                                      Assign Owner
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Fragment>
                                    <button
                                      className={`hover:bg-primary hover:text-white  ${
                                        active
                                          ? "bg-primary text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                                      onClick={() => {
                                        setFieldModal({
                                          show: true,
                                          type: "scheduledAction",
                                        });
                                      }}
                                    >
                                      Field Update
                                    </button>
                                  </Fragment>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-8">
                  <div className="flex justify-start gap-5">
                    <button
                      className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] w-[150px]"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center w-[150px]"
                      onClick={() => handlePost()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}
            <EmailNotificationModal
              setModal={setEmailModal}
              modal={emailModal}
              emailRadio={
                emailModalType === "instantAction"
                  ? emailRadio
                  : emailRadioScheduled
              }
              setEmailRadio={
                emailModalType === "instantAction"
                  ? setEmailRadio
                  : setEmailRadioScheduled
              }
              emailInfo={
                emailModalType === "instantAction"
                  ? emailInfo
                  : emailInfoScheduled
              }
              setEmailInfo={
                emailModalType === "instantAction"
                  ? setEmailInfo
                  : setEmailInfoScheduled
              }
              users={users}
            />
            {/* Action modal here - All modal  here */}
            <ActionModal
              type={modalType?.type}
              setActionModal={setActionModal}
              actionModal={actionModal}
              taskDataHandler={taskDataHandler}
              closeModal={closeModal}
            />
            <ActionEditModal
              type={modalType?.type}
              setActionModal={setActionEditModal}
              actionModal={actionEditModal}
              taskDataHandler={taskDataHandler}
              closeModal={closeEditModal}
              data={
                modalType?.actionType === "instantAction"
                  ? actionData
                  : actionScheduledData
              }
            />
            <AssignOwnerModal
              setModal={setAssignModal}
              modal={assignModal}
              users={users}
              assignData={assignData}
              setAssignData={setAssignData}
            />
            <FieldUpdateModal
              setModal={setFieldModal}
              modal={fieldModal}
              users={users}
              moduleFilters={moduleFilters?.filter(
                (filter) => !hideFilterList.includes(filter)
              )}
              assignData={fieldData}
              setAssignData={setFieldData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RuleDetails;
