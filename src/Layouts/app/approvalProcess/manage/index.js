import { useState } from "react";
import { Microicon } from "../../../../assets/svgIcons";
import { list } from "../../../../Components/module";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_FILTERS, GET_USER_PROFILE } from "../../../../Redux/actions/user";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "feather-icons-react/build/IconComponents";
import { GET_ALL_ACTIVE_USER, GET_GROUP_LIST } from "../../../../Redux/actions/userList";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";
import TaskMacro from "../../macro/tasks";
import { GET_TEMPLATE_EMAIL_LIST } from "../../../../Redux/actions/serviceControl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CREATE_APPROVAL_PROCESS, GET_APPROVAL_PROCESS_DETAILS, UPDATE_APPROVAL_PROCESS } from "../../../../Redux/actions/approvalProcess";
import ApprovalAction from "../approvalAction";
import RejectionAction from "../rejectionAction";

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

const ApprovalProcessManageLayout = () => {
  const [query] = useSearchParams();
  const processId = query.get("id");

  const navigate = useNavigate()
  const defaultData = {
    ModuleTitle: "Leads",
    status: true,
    ProcessName: "",
    Description: "",
    when: {
      create: true,
      edit: false
    },
    Criteria: [
      {
        field: "0",
        filter: "",
        data: ""
      },
    ],
    WhoApprove: {
      assignTask: false,
      assignTaskValue: "",
      assignTaskIndex: "",
      data: [{ "type": "Users", "value": "" }],
      tasks: []
    },
    ApprovalAction: {
      EachStage: {
        ActionName: "updatefield",
        field: "0",
        data: ""
      },
      FinalStage: {
        assignTask: "",
        assignTaskIndex: "",
        emailTemplate: {
          Name: "",
          To: [],
          TemplateId: ""
        },
      }
    },
    RejectionAction: {
      emailTemplate: {
        Name: "",
        To: [],
        TemplateId: ""
      },
      updateField: {
        ActionName: "updatefield",
        field: "0",
        data: ""
      }
    },
  }
  const [data, setData] = useState(defaultData)

  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedRejectionTemplate, setSelectedRejectionTemplate] = useState({});

  const dispatch = useDispatch()
  const fields = useSelector((state) => state.user.filters);
  const groups = useSelector((state) => state?.profile?.groupList)
  const templates = useSelector(
    (state) =>
      state?.ServiceControlReducer?.emailTemplates?.data?.EmailData || []
  );
  const [selectWhoApproveOptionData, setselectWhoApproveOptionData] = useState({})
  const roles = useSelector((store) => store.role?.roledata);
  const [activeUsers, setActiveUsers] = useState([])

  const selectData = {
    Users: [...activeUsers],
    Roles: [...roles],
    Groups: [...groups]
  };

  const onChangeHandler = (e) => {
    const { name, value } = e?.target
    setData({ ...data, [name]: value })
    if (name === "ModuleTitle") {
      dispatch(GET_FILTERS(list[value].filterApi))
    }
  }


  const onExecuteCheckBoxHandler = (e) => {
    const { name } = e?.target
    const checkBoxData = data?.when
    checkBoxData[name] = !checkBoxData[name]
    setData({ ...data, when: checkBoxData })
  }

  const assignTaskCheckBoxHandler = (e) => {
    setData({
      ...data,
      WhoApprove: {
        ...data?.WhoApprove,
        assignTask: !data?.WhoApprove?.assignTask,
      }
    })
  }

  const assignTaskValueHandler = (e) => {
    setData({
      ...data,
      WhoApprove: {
        ...data?.WhoApprove,
        assignTaskValue: e?.target?.value,
        assignTaskIndex: e?.target?.value,
      }
    })
  }

  const changeHandlerUpdateCriteria = (e, index) => {
    const { name, value } = e?.target
    const dataUpdate = { ...data }
    dataUpdate["Criteria"][index] = { ...dataUpdate["Criteria"][index], [name]: value }
    setData(dataUpdate)
  }

  const addHandler = () => {
    const updateData = { ...data }
    const conditionUp = updateData["Criteria"]
    conditionUp.push({
      field: "0",
      data: "",
      filter: "="
    })
    const upData = {
      ...data,
      Criteria: conditionUp
    }
    setData(upData)
  }

  const deleteHandler = (index) => {
    const updateData = { ...data }
    const conditionUp = updateData["Criteria"]
    if (conditionUp.length > 1) {
      conditionUp.splice(index, 1)
      const upData = {
        ...data,
        Criteria: conditionUp
      }
      setData(upData)
    }
  }


  const addHandlerWhoApprove = () => {
    const updateData = { ...data?.WhoApprove }
    const conditionUp = updateData["data"]
    conditionUp.push({
      type: "Users",
      value: "",
    })
    const upData = {
      ...data,
      WhoApprove: {
        ...data?.WhoApprove,
        data: conditionUp
      }
    }
    setData(upData)
    setselectWhoApproveOptionData({
      ...selectWhoApproveOptionData,
      [conditionUp.length - 1]: activeUsers
    })
  }

  const deleteHandlerWhoApprove = (index) => {
    const updateData = { ...data?.WhoApprove }
    const conditionUp = updateData["data"]
    if (conditionUp.length > 1) {
      conditionUp.splice(index, 1)
      const upData = {
        ...data,
        WhoApprove: {
          ...data?.WhoApprove,
          data: conditionUp
        }
      }
      setData(upData)
    }
  }


  const changeHandlerWhenApprovalType = (e, index) => {
    const { name, value } = e?.target
    const dataUpdate = { ...data?.WhoApprove }
    dataUpdate.data[index][name] = value
    setData({ ...data, WhoApprove: dataUpdate })
    if (name === "type") {
      setselectWhoApproveOptionData({
        ...selectWhoApproveOptionData,
        [index]: selectData[value]
      })
    }
  };


  const taskDataHandler = (value) => {
    const updata = { ...data };
    updata?.WhoApprove?.tasks?.push(value);
    setData(updata);
    if (!data?.WhoApprove?.assignTaskValue)
      setData({
        ...data,
        WhoApprove: {
          ...data?.WhoApprove,
          assignTaskValue: 0,
          assignTaskIndex: 0
        }
      })
  };

  const taskEditDataHandler = (value, index) => {
    const updata = data?.WhoApprove?.tasks;
    updata[index] = value;
    setData({ ...data, WhoApprove: { ...data.WhoApprove, tasks: updata } });
  };

  const taskDeleteDataHandler = (index) => {
    const updata = { ...data };
    updata?.WhoApprove?.tasks.splice(index, 1);
    setData(updata);
  };


  useEffect(() => {
    dispatch(GET_FILTERS(list["Leads"].filterApi))
    dispatch(GET_GROUP_LIST(1, 100))
    dispatch(GET_USER_PROFILE()).then((res) => {
      const resData = res?.data?.data[0];
      const options = activeUsers;
      options.push({
        _id: resData?.userId,
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      setActiveUsers(options)
      setselectWhoApproveOptionData({ 0: options })
    })
    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
      (data) => {
        const res = data?.data?.data?.usersData;
        const options = activeUsers;
        if (res?.length > 0) {
          res?.map((item) => {
            options.push({
              _id: item?._id,
              value: item?._id,
              label: `${item?.firstName} ${item?.lastName}`,
            });
          });
          setActiveUsers(options)
          setselectWhoApproveOptionData({ 0: options })
        }
      }
    )
    dispatch(GET_ALL_ROLE_DATA(1, 100));
    dispatch(
      GET_TEMPLATE_EMAIL_LIST({
        limit: 100,
        offset: 1,
      })
    );
  }, [])

  const operator = [
    {
      name: "is",
      value: "is"
    },
    {
      name: "isn't",
      value: "isn't"
    },
  ]

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

  const labelGeneratorForOptions = (type, field) => {
    if (type === "Roles") {
      return field.roleTitle
    } else if (type === "Groups") {
      return field.groupTitle
    }
    return field.label
  }

  const saveHandler = () => {
    let upCriteria = []
    data?.Criteria?.map(e => {
      if (e.field !== "0") {
        upCriteria.push(e)
      }
    })
    const finalData = {
      ...data,
      Criteria: upCriteria,
      WhoApprove: {
        ...data?.WhoApprove,
        assignTaskValue: data?.WhoApprove?.tasks[data?.WhoApprove?.assignTaskValue] || {}
      },
      ApprovalAction: {
        ...data?.ApprovalAction,
        EachStage: {
          ...data?.ApprovalAction?.EachStage,
          field: data?.ApprovalAction?.EachStage?.field === "0" ? "" : data?.ApprovalAction?.EachStage?.field
        },
        FinalStage: {
          ...data?.ApprovalAction.FinalStage,
          assignTask: data?.WhoApprove?.tasks[data?.ApprovalAction?.FinalStage?.assignTask] || {},
          emailTemplate: {
            ...data?.ApprovalAction?.FinalStage?.emailTemplate,
            ToForOption: data?.ApprovalAction?.FinalStage?.emailTemplate?.To,
            To: data?.ApprovalAction?.FinalStage?.emailTemplate?.To?.length ?
              data?.ApprovalAction?.FinalStage?.emailTemplate?.To?.map((e) => { return e.value }) : []
          }
        }
      },
      RejectionAction: {
        ...data?.RejectionAction,
        updateField: {
          ...data?.RejectionAction?.updateField,
          field: data?.RejectionAction?.updateField?.field === "0" ? "" : data?.RejectionAction?.updateField?.field
        },
        emailTemplate: {
          ...data?.RejectionAction?.emailTemplate,
          ToForOption: data?.RejectionAction?.emailTemplate?.To,
          To: data?.RejectionAction?.emailTemplate?.To?.length ?
            data?.RejectionAction?.emailTemplate?.To?.map((e) => { return e.value }) : []
        }
      }
    }
    if (processId) {
      dispatch(UPDATE_APPROVAL_PROCESS(processId, finalData)).then(res => {
        if (res?.status === 200) {
          navigate(-1)
        }
      })
    } else {
      dispatch(CREATE_APPROVAL_PROCESS(finalData)).then(res => {
        if (res?.status === 200) {
          navigate(-1)
        }
      })
    }
  }

  useEffect(() => {
    if (processId) {
      dispatch(GET_APPROVAL_PROCESS_DETAILS(processId)).then((res) => {
        const getData = res?.data
        let obj = {}
        getData?.WhoApprove?.data?.map((whoValue, index) => {
          obj[index] = selectData[whoValue?.type]
        })
        setselectWhoApproveOptionData(obj)
        setData({
          ...getData,
          Criteria: getData?.Criteria?.length ? getData?.Criteria : defaultData?.Criteria,
          ApprovalAction: {
            ...getData?.ApprovalAction,
            EachStage: {
              ...getData?.ApprovalAction?.EachStage,
              field: getData?.ApprovalAction?.EachStage?.field !== "" ?
                getData?.ApprovalAction?.EachStage?.field : "0"
            },
            FinalStage: {
              ...getData?.ApprovalAction.FinalStage,
              assignTask: getData?.ApprovalAction?.FinalStage?.assignTaskIndex || "",
              emailTemplate: {
                ...getData?.ApprovalAction.FinalStage?.emailTemplate,
                To: getData?.ApprovalAction.FinalStage?.emailTemplate?.ToForOption
              }
            }
          },
          WhoApprove: {
            ...getData?.WhoApprove,
            assignTaskValue: getData?.WhoApprove?.assignTaskIndex || ""
          },
          RejectionAction: {
            ...getData?.RejectionAction,
            updateField: {
              ...getData?.RejectionAction?.updateField,
              field: getData?.RejectionAction?.updateField?.field !== "" ?
                getData?.RejectionAction?.updateField?.field : "0"
            },
            emailTemplate: {
              ...getData?.RejectionAction?.emailTemplate,
              To: getData?.RejectionAction?.emailTemplate?.ToForOption
            }
          }
        })
        dispatch(
          GET_TEMPLATE_EMAIL_LIST({
            limit: 100,
            offset: 1,
          })
        ).then((res) => {
          const templatedData = res?.data?.EmailData;
          templatedData.map((template) => {
            if (template._id === getData?.ApprovalAction?.FinalStage?.emailTemplate?.TemplateId) {
              setSelectedTemplate({
                ...template,
                finalTitle: template.emailTitle,
              });
            }
            if (template._id === getData?.RejectionAction?.emailTemplate?.TemplateId) {
              setSelectedRejectionTemplate({
                ...template,
                finalTitle: template.emailTitle,
              });
            }
          });
        });
      });
    }
  }, [processId]);

  return (
    <div>
     <>
          <div className="mt-5 rounded-xl flex items-center justify-between py-[22px] text-lg font-semibold leading-6 px-[60px] bg-white">
            {processId ? "Update" : "Create"} Approval Process
            <Microicon />
          </div>
          <div className="bg-[#F8F8FC] pt-[32px]">
            <div className="bg-white  p-10 rounded-2xl">
              <div className="gap-6 pb-8 grid grid-cols-2 ">
                <div className="form flex flex-col">
                  <label className="text-[#1D1D1E] mb-[10px] text-base leading-[22px] font-semibold">
                    Name
                  </label>
                  <input
                    className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                    placeholder="Enter Your Name"
                    name="ProcessName"
                    value={data.ProcessName}
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="form flex flex-col">
                  <label className="text-[#1D1D1E] mb-[10px] text-base leading-[22px] font-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                    placeholder="Enter Description"
                    name="Description"
                    value={data.Description}
                    onChange={(e) => onChangeHandler(e)}
                  ></textarea>
                </div>
              </div>
              <div className="gap-6  grid grid-cols-2  pb-8">
                <div>
                  <h1 className="font-semibold">Module</h1>
                  <select
                    className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-white focus:outline-0 py-[0.7rem] px-2  border-[#dce2eb]   p-2 text-base"
                    placeholder="Select Module"
                    name="ModuleTitle"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    value={data.ModuleTitle}
                  >
                    {Object.keys(list)?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h1 className="ml-2 font-semibold">When to Execute</h1>
                  <div className="grid grid-cols-2  ">
                    <div className="flex justify-start items-center">
                      <input
                        type="checkbox"
                        name="create"
                        value={data?.when?.create}
                        checked={data?.when?.create}
                        onChange={(e) => {
                          onExecuteCheckBoxHandler(e);
                        }}
                      />
                      <h3 className="ml-2">Record Creation</h3>
                    </div>
                    <div className="flex justify-start items-center">
                      <input
                        type="checkbox"
                        name="edit"
                        value={data?.when?.edit}
                        checked={data?.when?.edit}
                        onChange={(e) => {
                          onExecuteCheckBoxHandler(e);
                        }}
                      />
                      <h3 className="ml-2">Record Edit</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-[24px]">
                <p className="text-lg font-semibold leading-[26px] mb-5">
                  1. Rule Criteria
                </p>
                {
                  data?.Criteria?.map((value, index) => {
                    return (
                      <div className="form-group row flex mb-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="bg-[#E4E6EE] rounded-[32px] p-2 inline-block ">
                              <span className="bg-[#191242] w-[28px] h-[28px] rounded-[32px] text-[#fff] inline-block px-2 py-1  text-center">
                                {index + 1}
                              </span>
                            </span>
                          </div>

                          <div className="px-4">
                            <select
                              className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Field"
                              name="field"
                              value={data?.Criteria[index]?.field}
                              onChange={(e) =>
                                changeHandlerUpdateCriteria(e, index)
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
                          <div className="px-4">
                            <select
                              className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="filter"
                              name="filter"
                              value={data?.Criteria[index]?.filter}
                              onChange={(e) =>
                                changeHandlerUpdateCriteria(e, index)
                              }
                              disabled={data?.Criteria[index]?.field === "0" ? true : false}
                            >
                              {operator
                                ?.map((field) => {
                                  return (
                                    <option value={field.value}>
                                      {field.name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div>
                            <input
                              name="data"
                              type="text"
                              value={data?.Criteria[index]?.data}
                              onChange={(e) =>
                                changeHandlerUpdateCriteria(e, index)
                              }
                              disabled={data?.Criteria[index]?.field === "0" ? true : false}
                              className={`form-control  rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                            />
                          </div>
                          <div className="space-x-2 ">
                            <button className=" bg-[#FFEAEF] rounded-lg text-[#F95250] p-1"
                              onClick={() => deleteHandler(index)}
                            >
                              <Minus />
                            </button>
                            <button
                              className="bg-[#DCFCE7] rounded-lg text-[#22C55E] p-1"
                              onClick={() => addHandler()}
                            >
                              <Plus />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className="pb-[24px]">
                <p className="text-lg font-semibold leading-[26px] mb-5">
                  2. Who should approve
                </p>
                {data?.WhoApprove?.data?.map((value, index) => {
                  return (
                    <div className="form-group row flex mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="bg-[#E4E6EE] rounded-[32px] p-2 inline-block ">
                            <span className="bg-[#191242] w-[28px] h-[28px] rounded-[32px] text-[#fff] inline-block px-2 py-1  text-center">
                              {index + 1}
                            </span>
                          </span>
                        </div>

                        <div className="px-4">
                          <select
                            className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Type"
                            name="type"
                            value={data?.WhoApprove?.data[index]?.type}
                            onChange={(e) =>
                              changeHandlerWhenApprovalType(e, index)
                            }
                          >
                            <option value="Users">Users</option>
                            <option value="Roles">Roles</option>
                            <option value="Groups">Groups</option>
                          </select>
                        </div>
                        <div className="px-4">
                          <select
                            className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="value"
                            name="value"
                            value={data?.WhoApprove?.data[index]?.value}
                            onChange={(e) =>
                              changeHandlerWhenApprovalType(e, index)
                            }
                          >
                            <option key={index} value="">
                              None
                            </option>
                            {selectWhoApproveOptionData[index]
                              ?.map((field) => {
                                return (
                                  <option value={field._id}>
                                    {labelGeneratorForOptions(
                                      data?.WhoApprove?.data[index]?.type,
                                      field)}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="ml-4 space-x-2">
                          <button className=" bg-[#FFEAEF] rounded-lg text-[#F95250] p-1"
                            onClick={() => deleteHandlerWhoApprove(index)}
                          >
                            <Minus />
                          </button>
                          <button
                            className="bg-[#DCFCE7] rounded-lg text-[#22C55E] p-1"
                            onClick={() => addHandlerWhoApprove()}
                          >
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="pb-[24px]">
                <div className="flex gap-[17px]">
                  <div className="rounded-xl py-3 w-[360px] border border-[#E6E6EB] overflow-hidden">
                    <div className="flex justify-start items-center space-x-1">
                      <input
                        type="checkbox"
                        name="assignTasks"
                        value={data?.WhoApprove?.assignTask}
                        checked={data?.WhoApprove?.assignTask}
                        onChange={(e) => {
                          assignTaskCheckBoxHandler(e);
                        }}
                      />
                      <h3>Assign Task</h3>
                    </div>
                    {data?.WhoApprove?.assignTask && <select
                      className="form-control rounded-[10px] m-2 w-[270px] placeholder-opacity-100   border-[1.5px] bg-white focus:outline-0 py-[0.7rem] px-4  border-[#dce2eb]   p-2 text-base"
                      placeholder="Select Task"
                      name="assignTaskValue"
                      onChange={(e) => {
                        assignTaskValueHandler(e);
                      }}
                      value={data?.WhoApprove?.assignTaskValue}
                    >
                      {data?.WhoApprove?.tasks?.map((item, index) => (
                        <option key={index} value={index}>
                          {Object.values(item)[1]}
                        </option>
                      ))}
                    </select>}
                  </div>
                  {data?.WhoApprove?.assignTask && <div className="rounded-[20px] w-[720px] border border-[#E6E6EB] overflow-hidden">
                    <TaskMacro
                      taskDataHandler={taskDataHandler}
                      taskData={data?.WhoApprove?.tasks}
                      taskEditDataHandler={taskEditDataHandler}
                      taskDeleteDataHandler={taskDeleteDataHandler}
                    />
                  </div>}
                </div>
              </div>

              <ApprovalAction
                data={data}
                setData={setData}
                fields={fields}
                searchHandler={searchHandler}
                templates={templates}
                activeUsers={activeUsers}
                processId={processId}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />

              <RejectionAction
                data={data}
                setData={setData}
                fields={fields}
                searchHandler={searchHandler}
                templates={templates}
                activeUsers={activeUsers}
                selectedRejectionTemplate={selectedRejectionTemplate}
                setSelectedRejectionTemplate={setSelectedRejectionTemplate}
              />

              <div className="pb-[24px]">
                <div className="flex space-x-2">
                  <button
                    className="h-[48px] text-base text-white font-medium w-[132px] rounded-[10px] bg-[#191242]"
                    onClick={saveHandler}
                  >
                    {processId ? "Update" : "Create"}
                  </button>
                  <button className="h-[48px] border border-[#E4E4E7] text-base font-medium w-[132px] rounded-[10px] bg-white" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
    </div >
  );
};

export default ApprovalProcessManageLayout;
