import React, { Fragment, useEffect, useState } from "react";
import { TreeItem, TreeView } from "../../../../Components/TerritoryTreeView";
import { Check, ChevronDown, Minus, Plus, X } from "react-feather";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { GET_ALL_ACTIVE_USER } from "../../../../Redux/actions/userList";
import { GET_FILTERS, GET_USER_PROFILE } from "../../../../Redux/actions/user";
import Select from "react-select";
import { useSelector } from "react-redux";
import { CREATE_TERRITORY, DELETE_TERRITORY, GET_TERRITORY, UPDATE_TERRITORY } from "../../../../Redux/actions/territory";

const hideFilterList = [
  "_id",
  "Owner",
  "AccountOwnerId",
  "AccountsOwnerId",
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
  "createdTime",
  "updatedTime"
];

const TerritoryHierarchy = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const terriory = useSelector((state) => state?.territoryReducer?.List);
  const fields = useSelector((state) => state.user.filters);
  const [activeUsers, setActiveUsers] = useState([])
  const [terrioryByIdData, setTerriotryByIdData] = useState(null);

  const [deleteTerritory, setDeleteTerritory] = useState(null)
  const [deleteTerritoryModal, setDeleteTerritoryModal] = useState(false)


  const dispatch = useDispatch()
  const [tree, setTree] = useState([]);
  const optionsForActiveUsers = () => {
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      const options = activeUsers;
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      setActiveUsers(options)
    });

    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
      (data) => {
        const res = data?.data?.data?.usersData;
        const options = activeUsers;
        if (res?.length > 0) {
          res?.map((item) => {
            options.push({
              value: item?._id,
              label: `${item?.firstName} ${item?.lastName}`,
            });
          });
          setActiveUsers(options)
        }
      }
    );

  };


  const territoryList = () => {
    dispatch(GET_TERRITORY(1, 100))
  }

  useEffect(() => {
    optionsForActiveUsers()
    territoryList()
    dispatch(GET_FILTERS("/get-accounts-filter-field"));
  }, [])

  useEffect(() => {
    const nodeMap = {};
    for (const item of terriory) {
      const { _id, patentTerritory } = item;
      item.subTree = [];
      nodeMap[_id] = item;

      if (patentTerritory) {
        const parentNode = nodeMap[patentTerritory];
        if (parentNode) {
          parentNode.subTree.push(item);
        }
      }
    }

    const rootNodes = terriory.filter((item) => item.patentTerritory === null);
    setTree(rootNodes);
  }, [terriory]);


  const handleSubmit = async (data) => {
    await dispatch(CREATE_TERRITORY(data)).then((response) => {
      if (response === 200) {
        setActiveBtn(0);
        dispatch(GET_TERRITORY(1, 100));
      }
    });
  };

  const handleEditSubmit = async (data) => {
    await dispatch(UPDATE_TERRITORY(terrioryByIdData?._id, data)).then((response) => {
      if (response === 200) {
        setActiveBtn(0);
        dispatch(GET_TERRITORY(1, 100));
        setTerriotryByIdData(null);
      }
    });
  };


  const handleDeleteTerritory = async () => {
    await dispatch(DELETE_TERRITORY(deleteTerritory?._id)).then((response) => {
      if (response === 200) {
        dispatch(GET_TERRITORY(1, 100));
        setDeleteTerritory(null);
      }
    });
  }

  const handleActive = (index) => {
    setActiveBtn(index);
    if (index === 2) {
      setIsOpen(false);
    } else if (index === 3) {
      setIsOpen(true);
    }
  };

  const renderSubtrees = (trees) => {
    return trees.map((tree) => {
      if (!tree.subTree?.length) {
        return (
          <TreeItem
            key={tree._id}
            id={tree._id}
            title={tree.name}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            handleActive={handleActive}
            tree={tree}
            setTerriotryByIdData={setTerriotryByIdData}
            setDeleteTerritoryModal={setDeleteTerritoryModal}
            setDeleteTerritory={setDeleteTerritory}
            type="createTerritory"
          />
        );
      }

      return (
        <>
          <TreeItem
            key={tree._id}
            id={tree._id}
            title={tree.name}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            handleActive={handleActive}
            tree={tree}
            setTerriotryByIdData={setTerriotryByIdData}
            setDeleteTerritoryModal={setDeleteTerritoryModal}
            setDeleteTerritory={setDeleteTerritory}
            type="createTerritory"
          >
            {renderSubtrees(tree.subTree)}
          </TreeItem>

          < Transition appear show={deleteTerritoryModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { setDeleteTerritoryModal(false) }}>
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
                        Delete Territory
                      </Dialog.Title>
                      <h5>Are you sure want to delete this terriory?</h5>
                      <div className="mt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                          onClick={handleDeleteTerritory}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                          onClick={() => {
                            setDeleteTerritoryModal(false)
                            setDeleteTerritory(null)
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
        </>
      )
    });
  };
  return (
    <div>
      <h2 className="text-primary text-base font-semibold">
        Territory Hierarchy
      </h2>
      <div>
        {activeBtn === 0 || activeBtn === 2 || activeBtn === 3 ? (
          <div>
            <div className="my-[24px]">
              <button
                onClick={() => handleActive(1)}
                className={
                  activeBtn === 1
                    ? "text-white  border-transparent border bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                    : " border-[#191242]  text-sm font-medium  border cursor-pointer rounded-2xl px-5 py-3"
                }
              >
                New Territory
              </button>
              <button
                className={
                  activeBtn === 3
                    ? "text-white mx-2 border-transparent border bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                    : " border-[#191242] mx-2 text-sm font-medium  border cursor-pointer rounded-2xl px-5 py-3"
                }
                onClick={() => handleActive(3)}
              >
                Expand All
              </button>
              <button
                className={
                  activeBtn === 2
                    ? "text-white  border-transparent border bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                    : " border-[#191242]  text-sm font-medium  border cursor-pointer rounded-2xl px-5 py-3"
                }
                onClick={() => handleActive(2)}
              >
                Collapse All
              </button>
            </div>
            <div className="ml-6">
              <TreeView>{renderSubtrees(tree)}</TreeView>
            </div>
          </div>
        ) : (
          <TerritoryAddEdit
            activeUsers={activeUsers}
            handleActive={handleActive}
            terriory={terriory}
            handleSubmit={handleSubmit}
            handleEditSubmit={handleEditSubmit}
            accountFields={fields}
            setTerriotryByIdData={setTerriotryByIdData}
            terrioryByIdData={terrioryByIdData}
          />
        )}
      </div>
    </div>
  );
};

export default TerritoryHierarchy;

const TerritoryAddEdit = ({ handleActive, activeUsers, terriory, handleSubmit, handleEditSubmit, accountFields, terrioryByIdData, setTerriotryByIdData }) => {
  const defaultData = {
    name: "",
    description: "",
    manager: activeUsers.length ? activeUsers[0].value : null,
    patentTerritory: null,
    permissions: 0,
    rules: [{
      field: "0",
      value: "",
      operator: "="
    }]
  }
  const [data, setData] = useState(defaultData)
  const [multiSelectedUsersForOptions, setmultiSelectedUsersForOptions] = useState([])

  useEffect(() => {
    if (terrioryByIdData) {
      if (terrioryByIdData?.permissions) {
        var perm = 0
        if (terrioryByIdData?.permissions.read && terrioryByIdData?.permissions.write) {
          perm = 1
        }
      }
      setData({
        name: terrioryByIdData.name,
        description: terrioryByIdData.description,
        manager: terrioryByIdData.manager,
        patentTerritory: terrioryByIdData.patentTerritory,
        permissions: perm,
        rules: terrioryByIdData?.rules &&
          terrioryByIdData?.rules.length ?
          terrioryByIdData?.rules :
          [{
            field: "0",
            value: "",
            operator: "="
          }]
      });
      if (terrioryByIdData.users?.length) {
        const options = []
        activeUsers.map((users) => {
          if (terrioryByIdData?.users.includes(users.value)) {
            options.push(users)
          }
        })
        setmultiSelectedUsersForOptions(options)
      }
    }
  }, [terrioryByIdData]);

  const onChangeSelect = (data) => {
    setmultiSelectedUsersForOptions(data)
  };

  const permissionOption = [
    {
      name: "Read Only",
      value: {
        read: true,
        write: false,
        edit: false,
        delete: false
      },
      optionValue: 0
    },
    {
      name: "Read/Write/Delete",
      value: {
        read: true,
        write: true,
        edit: true,
        delete: true
      },
      optionValue: 1
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e?.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleTerritory = () => {
    const finalData = { ...data }
    if (finalData.permissions === "1") {
      finalData.permissions = permissionOption[1].value
    }
    else {
      finalData.permissions = permissionOption[0].value
    }
    finalData.users = multiSelectedUsersForOptions?.map(data => { return data.value })
    if (finalData.rules.length > 0) {
      const rules = []
      finalData.rules.map((rule) => {
        if (rule.field !== "0") {
          rules.push(rule)
        }
      })
      finalData.rules = rules
    }
    if (terrioryByIdData) {
      handleEditSubmit(finalData)
    } else {
      handleSubmit(finalData);
    }
    // setData(defaultData);
    // setmultiSelectedUsersForOptions([])
  };


  const changeHandlerUpdateRules = (e, index) => {
    const { name, value } = e?.target
    const dataUpdate = { ...data }
    dataUpdate.rules[index] = { ...dataUpdate.rules[index], [name]: value }
    setData(dataUpdate)
  }

  const addHandler = () => {
    const updateData = { ...data }
    const rules = [...updateData.rules]
    rules.push({
      field: "0",
      value: "",
      operator: "="
    })
    setData({ ...data, rules })
  }

  const deleteHandler = (index) => {
    const updateData = { ...data }
    const rules = [...updateData.rules]
    if (rules.length > 1) {
      rules.splice(index, 1)
      setData({ ...data, rules })
    }
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
    <div>
      <div className="my-[40px]">
        <span className="px-[14px] py-[12px] rounded-lg border-[#FCB900] border-2 bg-[#FFFCE4]">
          To automatically assign accounts to this territory, please fill out
          the rule criteria.
        </span>
      </div>
      <div className="grid lg:grid-cols-1">
        <div className="form-group row flex mb-3 items-center">
          <label
            htmlFor="name"
            className=" text-lg col-sm-6 w-[30%] text-[#929296] font-medium col-form-label"
          >
            Territory Name<span className="text-red-800">*</span>
          </label>
          <div className="col-sm-6">
            <input
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
              value={data.name}
              className={`form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4 border-[#dce2eb] p-2 text-base`}
            />
          </div>
        </div>

        <div className="form-group row  flex mb-3 items-center">
          <label
            htmlFor="manager"
            className="col-sm-6 text-lg w-[30%]  text-[#929296] font-medium col-form-label"
          >
            Territory Manager
          </label>
          <div className="col-sm-6">
            <select
              className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
              placeholder="Territory Manager"
              name="manager"
              value={data?.manager}
              onChange={(e) => handleChange(e)}
            >
              {activeUsers.map((item, index) => (
                <option key={index} value={item?.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row  flex mb-3 items-center">
          <label
            htmlFor="patentTerritory"
            className="col-sm-6 text-lg  w-[30%] text-[#929296] font-medium col-form-label"
          >
            Parent Territory<span className="text-red-800">*</span>
          </label>
          <div className="col-sm-6">
            <select
              className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
              placeholder="Select Parent Territory"
              name="patentTerritory"
              value={data?.patentTerritory}
              onChange={(e) => handleChange(e)}
            >
              <option value={null}>Select Parent</option>
              {terriory.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row  flex mb-3 items-center">
          <label
            htmlFor="roleId"
            className="col-sm-6 w-[30%] text-lg text-[#929296] font-medium col-form-label"
          >
            Add Users
          </label>
          <div className="col-sm-6">
            <Select
              className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
              value={multiSelectedUsersForOptions}
              onChange={onChangeSelect}
              placeholder="Select Users"
              options={activeUsers}
              isMulti
            />
          </div>
        </div>
        <div className="form-group row  flex mb-3 items-center">
          <label
            htmlFor="roleId"
            className="col-sm-6  w-[30%] text-lg  text-[#929296] font-medium col-form-label"
          >
            Permissions
          </label>
          <div className="col-sm-6">
            <select
              className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
              placeholder="Select permission"
              name="permissions"
              value={data?.permissions}
              onChange={(e) => handleChange(e)}
            >
              {permissionOption.map((item, index) => (
                <option key={index} value={item.optionValue}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-[#1D1D1E]  text-[18px] font-semibold">
          Account Rule
        </h2>
        {data.rules.map((rule, index) => {
          return (
            <div className="my-6 flex items-center">
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
                  value={data.rules[index].field}
                  onChange={(e) =>
                    changeHandlerUpdateRules(e, index)
                  }
                >
                  <option value="0">None</option>
                  {accountFields
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
              </div>
              <div className="px-4">
                <select
                  className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  placeholder="operator"
                  name="operator"
                  value={data.rules[index].operator}
                  onChange={(e) =>
                    changeHandlerUpdateRules(e, index)
                  }
                  disabled={data.rules[index].field === "0" ? true : false}
                >
                  {operator
                    .map((field) => {
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
                  name="value"
                  type="text"
                  value={data.rules[index].value}
                  onChange={(e) =>
                    changeHandlerUpdateRules(e, index)
                  }
                  disabled={data.rules[index].field === "0" ? true : false}
                  className={`form-control  rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                />
              </div>
              <div className="ml-4">
                <button className=" bg-[#FFEAEF] rounded-lg text-[#F95250] p-1"
                  onClick={() => deleteHandler(index)}
                >
                  <Minus />
                </button>
                <button
                  className="bg-[#DCFCE7] rounded-lg text-[#22C55E] p-1"
                  onClick={addHandler}
                >
                  <Plus />
                </button>
              </div>
            </div>
          )
        })}
        {/* <div className="ml-14">
          <div className="flex items-center">
            <p className="text-[#929296] text-[16px]">Criteria Pattern</p>
            {!criteriaPEdite ? (
              <div className="mx-4">(1 and 2)</div>
            ) : (
              <div className="flex ml-2">
                <input
                  type="text"
                  value={"(1 and 2)"}
                  className={`form-control rounded-[10px] w-[270px]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                />
                <div className="flex ml-4">
                  <button className="p-1 rounded-full bg-[#F0F0F5] text-[#929296] ">
                    <Check />
                  </button>
                  <button className=" ml-2 p-1 rounded-full bg-[#F0F0F5] text-[#929296]">
                    <X />
                  </button>
                </div>
              </div>
            )}
            {!criteriaPEdite && (
              <div>
                <button
                  onClick={() => setCriteriaPEdite(!criteriaPEdite)}
                  className="px-4 py-2 rounded bg-[#E2F2FF] text-[#008EFF] text-lg"
                >
                  Edit Pattern
                </button>
              </div>
            )}
          </div>
        </div> */}
        <div className="my-4">
          <div className="form-group row flex mb-3 ">
            <label
              htmlFor="firstName"
              className=" text-lg col-sm-6 w-[30%] text-[#929296] font-medium col-form-label"
            >
              Description
            </label>
            <div className="col-sm-6">
              <textarea
                id="message"
                name="description"
                rows="2"
                onChange={(e) => handleChange(e)}
                value={data.description}
                placeholder="Enter description"
                className="block w-[270px]  my-2 p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:bg-gray-100 "
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-start items-center gap-3">
        <button
          type="button"
          onClick={() => {
            handleActive(0);
            setData(defaultData);
            setTerriotryByIdData(null);
          }}
          className="inline-flex justify-center rounded-lg border border-[#B2B2B6] bg-white px-8 py-2 text-sm font-medium text-[#B2B2B6] "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={(e) => {
            handleTerritory();
          }}
          className="inline-flex ml-2 justify-center rounded-lg border border-transparent bg-primary px-8 py-2 text-sm font-medium text-white "
        >
          Add Territory
        </button>
      </div>
    </div >
  );
};
