import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { list } from "../../../../Components/module";
import { Minus, Plus } from "react-feather";
import { useDispatch } from "react-redux";
import { GET_FILTERS, GET_USER_PROFILE } from "../../../../Redux/actions/user";
import { useSelector } from "react-redux";
import { GET_ALL_ACTIVE_USER } from "../../../../Redux/actions/userList";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";
import FormBuilderForAssignmentRules from "./form/Formbuiilder";
import FormEditorForAssignmentRules from "./form/FormEditor";
import { DeleteIcon, EditIcon } from "../../../../assets/svgIcons";

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

const CreateAssignmentRuleModal = ({ modal, editData, handleClose, saveHandler, editSaveHandler }) => {

  const roles = useSelector((store) => store.role?.roledata);
  const [activeUsers, setActiveUsers] = useState([])
  const selectData = {
    Users: [...activeUsers],
    Roles: [...roles],
  };

  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [editModelTask, setEditModelTask] = useState(false)
  const [editDataTask, setEditTaskData] = useState({})

  const [userField, setUserField] = useState([])
  const dispatch = useDispatch()
  const fields = useSelector((state) => state.user.filters);
  const [selectCategoryOptionData, setSelectCategoryOptionData] = useState(selectData["Users"])

  const defaultData = {
    RuleName: "",
    description: "",
    ChooseModule: "Leads",
    applyRuleTo: {
      data: "allRecords",
      condition: [{
        field: "0",
        value: "",
        operator: "="
      }]
    },
    assignRecordTo: {
      data: "category",
      categoryData: "Users",
      categoryDataId: "",
      condition: [{
        field: "0",
        value: "",
        operator: "="
      }]
    },
    task: null
  }
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    setData({
      RuleName: editData?.RuleName,
      description: editData?.description,
      ChooseModule: editData?.ChooseModule || "Leads",
      applyRuleTo: {
        data: editData?.applyRuleTo?.data || "allRecords",
        condition: editData?.applyRuleTo?.condition &&
          editData?.applyRuleTo?.condition.length ?
          editData?.applyRuleTo?.condition :
          [{
            field: "0",
            value: "",
            operator: "="
          }]
      },
      assignRecordTo: {
        data: editData?.assignRecordTo?.data || "category",
        categoryData: editData?.assignRecordTo?.categoryData || "Users",
        categoryDataId: editData?.assignRecordTo?.categoryDataId || "",
        condition: editData?.assignRecordTo?.condition &&
          editData?.assignRecordTo?.condition.length ?
          editData?.assignRecordTo?.condition : [{
            field: "0",
            value: "",
            operator: "="
          }]
      },
      task: editData?.task || null
    });

  }, [editData]);


  const onChangeHandler = (e) => {
    const { name, value } = e?.target
    setData({ ...data, [name]: value })
    if (name === "ChooseModule") {
      dispatch(GET_FILTERS(list[value].filterApi))
    }
  }


  useEffect(() => {
    dispatch(GET_FILTERS(list["Leads"].filterApi))
    dispatch(GET_USER_PROFILE()).then((res) => {
      const resData = res?.data?.data[0];
      const options = activeUsers;
      setUserField(res?.data?.data[0])
      options.push({
        _id: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      setActiveUsers(options)
      setSelectCategoryOptionData(options)
    })
    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
      (data) => {
        const res = data?.data?.data?.usersData;
        const options = activeUsers;
        if (res?.length > 0) {
          res?.map((item) => {
            options.push({
              _id: item?._id,
              label: `${item?.firstName} ${item?.lastName}`,
            });
          });
          setActiveUsers(options)
          setSelectCategoryOptionData(options)
        }
      }
    )
    dispatch(GET_ALL_ROLE_DATA(1, 100));
  }, [])

  const radioHandler = (e) => {
    const { name, value } = e?.target
    setData({ ...data, [name]: { ...data[name], data: value } })
  }

  const changeHandlerUpdateRules = (e, index, module) => {
    const { name, value } = e?.target
    const dataUpdate = { ...data }
    dataUpdate[module].condition[index] = { ...dataUpdate[module].condition[index], [name]: value }
    setData(dataUpdate)
  }


  const changeHandlerCategory = (e) => {
    const { name, value } = e?.target
    const dataUpdate = { ...data }
    dataUpdate.assignRecordTo[name] = value
    setData(dataUpdate)
    if (name === "categoryData") {
      setSelectCategoryOptionData(selectData[value])
      dataUpdate.assignRecordTo.categoryDataId = ""
    }
  };

  const addHandler = (module) => {
    const updateData = { ...data }
    const conditionUp = updateData[module]?.condition
    conditionUp.push({
      field: "0",
      value: "",
      operator: "="
    })
    const upData = {
      ...data,
      [module]: {
        ...data[module],
        condition: conditionUp
      }
    }
    setData(upData)
  }

  const deleteHandler = (module, index) => {
    const updateData = { ...data }
    const conditionUp = updateData[module]?.condition
    if (conditionUp.length > 1) {
      conditionUp.splice(index, 1)
      const upData = {
        ...data,
        [module]: {
          ...data[module],
          condition: conditionUp
        }
      }
      setData(upData)
    }
  }

  const saveDataHandler = () => {
    if (editData) {
      editSaveHandler(data)
    } else {
      saveHandler(data)
    }
    setData(defaultData)
  }

  const closeModalOfTask = () => {
    setEditModelTask(false)
    setOpenTaskModal(false)
  }


  const taskDataHandler = (taskData) => {
    setData({ ...data, task: taskData })
  }


  const operator = [
    {
      name: "is",
      value: "="
    },
    {
      name: "isn't",
      value: "!="
    },
  ]

  return (

    <Transition appear show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
              <Dialog.Panel className="w-[1200px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl  mb-4 font-medium leading-6 text-gray-900"
                >
                  {editData ? "Update" : "Create"} Assignment Rule
                </Dialog.Title>
                <div className="my-10">
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Rule Name <span className="text-red-800">*</span>
                    </label>
                    <div className="col-sm-6 w-full">
                      <input
                        name="RuleName"
                        type="text"
                        placeholder="Enter Rule Name"
                        className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                        value={data.RuleName}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
                  </div>

                  <div className="form-group row  flex mb-3 items-center">
                    <label
                      htmlFor="roleId"
                      className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Module <span className="text-red-800">*</span>
                    </label>
                    <div className="col-sm-6 w-full py-[10px] px-4 border-[1.5px] bg-[#fff] border-[#dce2eb] rounded-[10px]">
                      <select
                        className="form-control w-full placeholder-opacity-100 focus:outline-0 text-base"
                        placeholder="Select Module"
                        name="ChooseModule"
                        onChange={(e) => onChangeHandler(e)}
                        value={data.ChooseModule}
                      >
                        {Object.keys(list)?.map((item, index) => {
                          return (
                            <option key={index+item} value={item}>
                            {item}
                          </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row flex mb-3 ">
                    <label
                      htmlFor="firstName"
                      className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-6 w-full">
                      <textarea
                        name="description"
                        type="text"
                        placeholder="Enter Description"
                        className={`form-control rounded-[10px] w-full border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb] p-2 text-base`}
                        value={data.description}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group row flex mb-3 ">
                    <label
                      htmlFor="firstName"
                      className="col-sm-4 text-lg w-[200px] text-[#929296] font-medium col-form-label"
                    >
                      Apply this rule to
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          id="allRecords"
                          name="applyRuleTo"
                          type="radio"
                          checked={data?.applyRuleTo?.data === "allRecords"}
                          value="allRecords"
                          onChange={(e) => radioHandler(e)}
                          className="w-4 h-4 cursor-pointer text-primary accent-primary bg-gray-100 border-gray-300"
                        />
                        <label
                          htmlFor="allrecords"
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          All Records
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="matchCondition"
                          name="applyRuleTo"
                          type="radio"
                          value="matchCondition"
                          onChange={(e) => radioHandler(e)}
                          checked={data?.applyRuleTo?.data === "matchCondition"}
                          className="w-4 h-4 cursor-pointer text-primary accent-primary bg-gray-100 border-gray-300"
                        />
                        <label
                          htmlFor="matchCondition"
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Records matching certain conditions
                        </label>
                      </div>
                    </div>
                  </div>
                  {data?.applyRuleTo.data === "matchCondition" &&
                    data?.applyRuleTo?.condition.map((value, index) => {
                      return (
                        <div key={index} className="form-group row flex mb-3">
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
                                value={data?.applyRuleTo?.condition[index].field}
                                onChange={(e) =>
                                  changeHandlerUpdateRules(e, index, "applyRuleTo")
                                }
                              >
                                <option value="0">None</option>
                                {fields
                                  .filter(
                                    (item) =>
                                      !hideFilterList?.includes(item)
                                  )
                                  .map((field,i) => {
                                    return (
                                      <option key={field+i} value={field}>
                                        {field}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div className="px-4">
                              <select
                                className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="operator"
                                name="operator"
                                value={data.applyRuleTo?.condition[index].operator}
                                onChange={(e) =>
                                  changeHandlerUpdateRules(e, index, "applyRuleTo")
                                }
                                disabled={data?.applyRuleTo?.condition[index].field === "0" ? true : false}
                              >
                                {operator
                                  .map((field, i) => {
                                    return (
                                      <option key={field.value+i} value={field.value}>
                                        {field.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div>
                              <input
                                name="value"
                                type="text"
                                value={data?.applyRuleTo?.condition[index].value}
                                onChange={(e) =>
                                  changeHandlerUpdateRules(e, index, "applyRuleTo")
                                }
                                disabled={data.applyRuleTo?.condition[index].field === "0" ? true : false}
                                className={`form-control  rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                              />
                            </div>
                            <div className="ml-4">
                              <button className=" bg-[#FFEAEF] rounded-lg text-[#F95250] p-1"
                                onClick={() => deleteHandler("applyRuleTo", index)}
                              >
                                <Minus />
                              </button>
                              <button
                                className="bg-[#DCFCE7] rounded-lg text-[#22C55E] p-1"
                                onClick={() => addHandler("applyRuleTo")}
                              >
                                <Plus />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  <div className="form-group row flex mb-3 ">
                    <label
                      htmlFor="assignRecordTo"
                      className="col-sm-3 text-lg w-[200px] text-[#929296] font-medium col-form-label"
                    >
                      Assign record to
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          id="category"
                          name="assignRecordTo"
                          type="radio"
                          value="category"
                          onChange={(e) => radioHandler(e)}
                          checked={data?.assignRecordTo?.data === "category"}
                          className="w-4 h-4 cursor-pointer text-primary accent-primary bg-gray-100 border-gray-300"
                        />
                        <label
                          htmlFor="category"
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Category
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="matchUserCondition"
                          name="assignRecordTo"
                          type="radio"
                          value="matchUserCondition"
                          onChange={(e) => radioHandler(e)}
                          checked={data?.assignRecordTo?.data === "matchUserCondition"}
                          className="w-4 h-4 cursor-pointer text-primary accent-primary bg-gray-100 border-gray-300"
                        />
                        <label
                          htmlFor="matchUserCondition"
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          Records matching certain conditions
                        </label>
                      </div>
                    </div>
                  </div>
                  {data?.assignRecordTo.data === "category" &&
                    data?.assignRecordTo?.condition.map((value, index) => {
                      return (
                        <div key={index} className="form-group row flex mb-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <span className="bg-[#E4E6EE] rounded-[32px] p-2 inline-block ">
                                <span className="bg-[#191242] w-[28px] h-[28px] rounded-[32px] text-[#fff] inline-block px-2 py-1  text-center">
                                </span>
                              </span>
                            </div>

                            <div className="px-4">
                              <select
                                className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Category Data"
                                name="categoryData"
                                value={data?.assignRecordTo?.categoryData}
                                onChange={(e) =>
                                  changeHandlerCategory(e)
                                }
                              >
                                <option value="Users">Users</option>
                                <option value="Roles">Roles</option>
                              </select>
                            </div>
                            <div className="px-4">
                              <select
                                className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="categoryDataId"
                                name="categoryDataId"
                                value={data?.assignRecordTo?.categoryDataId}
                                onChange={(e) =>
                                  changeHandlerCategory(e)
                                }
                              >
                                <option key={index} value="">
                                  None
                                </option>
                                {selectCategoryOptionData?.map((field) => {
                                    return (
                                      <option key={value?._id} value={field._id}>
                                        {data?.assignRecordTo?.categoryData === "Roles" ?
                                          field.roleTitle :
                                          field.label
                                        }
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  {data?.assignRecordTo.data === "matchUserCondition" &&
                    data?.assignRecordTo?.condition.map((value, index) => {
                      return (
                        <div key={index} className="form-group row flex mb-3">
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
                                value={data?.assignRecordTo?.condition[index].field}
                                onChange={(e) =>
                                  changeHandlerUpdateRules(e, index, "assignRecordTo")
                                }
                              >
                                <option value="0">None</option>
                                {Object.keys(userField)?.map((item, index) => (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="px-4">
                              <select
                                className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="operator"
                                name="operator"
                                value={data?.assignRecordTo?.condition[index].operator}
                                onChange={(e) =>
                                  changeHandlerUpdateRules(e, index, "assignRecordTo")
                                }
                                disabled={data?.assignRecordTo?.condition[index].field === "0" ? true : false}
                              >
                                {operator
                                  .map((field, i) => {
                                    return (
                                      <option key={field.value+i} value={field.value}>
                                        {field.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div>
                              <input
                                name="value"
                                type="text"
                                value={data?.assignRecordTo?.condition[index].value}
                                onChange={(e) =>
                                  changeHandlerUpdateRules(e, index, "assignRecordTo")
                                }
                                disabled={data?.assignRecordTo?.condition[index].field === "0" ? true : false}
                                className={`form-control  rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                              />
                            </div>
                            <div className="ml-4">
                              <button className=" bg-[#FFEAEF] rounded-lg text-[#F95250] p-1"
                                onClick={() => deleteHandler("assignRecordTo", index)}
                              >
                                <Minus />
                              </button>
                              <button
                                className="bg-[#DCFCE7] rounded-lg text-[#22C55E] p-1"
                                onClick={() => addHandler("assignRecordTo")}
                              >
                                <Plus />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className="form-group row flex mb-3 ">
                  <label
                    htmlFor="assignRecordTo"
                    className="col-sm-3 text-lg w-[200px] text-[#929296] font-medium col-form-label"
                  >
                    Followup Task
                  </label>
                  <div className="flex items-center gap-3">
                    {!data.task &&  <button
                        className="bg-[#DCFCE7] space-x-2 flex justify-start px-2 rounded-lg text-[#22C55E] p-1"
                        onClick={() => setOpenTaskModal(true)}
                      >
                        <Plus />
                        <span>Task</span>
                      </button>}

                    {data.task && <tr>
                      <td>{Object.values(data.task)[1]}</td>
                      <td>
                        <div
                          className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                          onClick={() => {
                            setEditTaskData(data.task)
                            setEditModelTask(true)
                          }}
                        >
                          <EditIcon />
                        </div>
                      </td>
                      <td>
                        <div
                          className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                          onClick={() => {
                            setData({ ...data, task: null })
                          }}
                        >
                          <DeleteIcon />
                        </div>
                      </td>
                    </tr>}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] w-full"
                    onClick={() => {
                      handleClose()
                      setData(defaultData)
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => saveDataHandler()}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center w-full"
                  >
                    {editData ? "Update" : "Create"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>


        <Transition appear show={openTaskModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setOpenTaskModal(false)}>
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
                <FormBuilderForAssignmentRules
                  formType="Tasks"
                  dataHandler={taskDataHandler}
                  closeModal={closeModalOfTask}
                />
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={editModelTask} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setEditModelTask(false)}>
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
                <FormEditorForAssignmentRules
                  formType="Tasks"
                  data={editDataTask}
                  dataHandler={taskDataHandler}
                  closeModal={closeModalOfTask}
                />
              </div>
            </div>
          </Dialog>
        </Transition>
      </Dialog >
    </Transition >
  );
};

export default CreateAssignmentRuleModal;
