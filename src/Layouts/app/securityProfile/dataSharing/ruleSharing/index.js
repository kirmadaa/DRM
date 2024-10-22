import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  CREATE_RULE_SHARING_PERMISSIONS,
  DELETE_RULE_SHARING_PERMISSIONS,
  UPDATE_RULE_SHARING_PERMISSIONS,
} from "../../../../../Redux/actions/security-control";
import RulesList from "./list";
import { Dialog, Transition } from "@headlessui/react";

export default function RuleSharing({
  moduleName,
  reloadAllData,
  roles,
  groups,
}) {
  let dispatch = useDispatch();

  const selectData = {
    Roles: [...roles],
    Groups: [...groups],
  };

  const defaultPermission = {
    view: true,
    read: true,
    write: true,
    delete: true,
  };
  const [editId, setEditId] = useState("");
  const [modal, showModal] = useState(false);
  const [sharingRuleName, setSharingRuleName] = useState("");
  const [permission, setPermission] = useState(defaultPermission);
  const [superiorsAllowed, setSuperiorsAllowed] = useState(false);
  const [permissionValue, setPermissionValue] = useState("0");
  const [recordsSharedFrom, setRecordsSharedFrom] = useState("Roles");
  const [recordsSharedTo, setRecordsSharedTo] = useState("Roles");
  const defaultRoles = roles && roles.length > 0 ? roles[0]?._id : "";
  const [recordsSharedFromObjectId, setRecordsSharedFromObjectId] =
    useState(defaultRoles);
  const [recordsSharedFromObjectData, setRecordsSharedFromObjectData] =
    useState(roles);
  const [recordsSharedToObjectId, setRecordsSharedToObjectId] =
    useState(defaultRoles);
  const [recordsSharedToObjectData, setRecordsSharedToObjectData] =
    useState(roles);
  const [currentModule, setCurrentModule] = useState("");
  const [editMode, setEditMode] = useState(false);

  const saveData = async () => {
    const data = {
      SharingRuleName: sharingRuleName,
      moduleTitle: currentModule,
      RecordsSharedFrom: recordsSharedFrom,
      RecordsSharedTo: recordsSharedTo,
      RecordsSharedFromObjectId: recordsSharedFromObjectId,
      RecordsSharedToObjectId: recordsSharedToObjectId,
      Permission: permission,
      SuperiorsAllowed: superiorsAllowed,
    };
    if (!editMode) {
      await dispatch(CREATE_RULE_SHARING_PERMISSIONS(data)).then((response) => {
        if (response?.status === 200) {
          handleClose();
        }
      });
    } else {
      await dispatch(UPDATE_RULE_SHARING_PERMISSIONS(editId, data)).then(
        (response) => {
          if (response?.status === 200) {
            handleClose();
          }
        }
      );
    }
    reloadAllData();
  };

  const handleClose = () => {
    showModal(false);
  };

  const addHandler = async (e) => {
    setRecordsSharedFromObjectData(selectData["Roles"]);
    setRecordsSharedToObjectData(selectData["Roles"]);
    const module = e.target.name;
    setCurrentModule(module);
    showModal(true);
  };

  const editHandler = async (data) => {
    setEditMode(true);
    setEditId(data._id);
    setCurrentModule(data.moduleTitle);
    setSharingRuleName(data.SharingRuleName);
    setPermission(data.Permission);
    setPermissionValue(permissionShow(data.Permission));
    setRecordsSharedFrom(data.RecordsSharedFrom);
    setRecordsSharedFromObjectData(selectData[data.RecordsSharedFrom]);
    setRecordsSharedToObjectData(selectData[data.RecordsSharedTo]);
    setRecordsSharedTo(data.RecordsSharedTo);
    setRecordsSharedFromObjectId(data.RecordsSharedFromObjectId);
    setRecordsSharedToObjectId(data.RecordsSharedToObjectId);
    setSuperiorsAllowed(data.SuperiorsAllowed);
    showModal(true);
  };

  const deleteHandler = async (data) => {
    await dispatch(DELETE_RULE_SHARING_PERMISSIONS(data._id)).then(
      (response) => {
        if (response?.status === 200) {
          handleClose();
          reloadAllData();
        }
      }
    );
  };

  const changeHandlerOfRecordFrom = (e) => {
    const module = e.target.value;
    setRecordsSharedFromObjectData(selectData[module]);
    const defaultData =
      selectData[module] && selectData[module].length > 0
        ? selectData[module][0]?._id
        : "";
    setRecordsSharedFromObjectId(defaultData);
    setRecordsSharedFrom(e.target.value);
  };

  const changeHandlerOfRecordTo = (e) => {
    const module = e.target.value;
    setRecordsSharedToObjectData(selectData[module]);
    const defaultData =
      selectData[module] && selectData[module].length > 0
        ? selectData[module][0]?._id
        : "";
    setRecordsSharedToObjectId(defaultData);
    setRecordsSharedTo(e.target.value);
  };

  const handleChangePermission = (e) => {
    const { value } = e?.target;
    setPermissionValue(value);
    let perm = { ...defaultPermission };
    if (value === "0") {
      perm = {
        view: true,
        read: true,
        write: true,
        delete: true,
      };
    } else if (value === "1") {
      perm = {
        view: false,
        read: true,
        write: true,
        delete: false,
      };
    } else if (value === "2") {
      perm = {
        view: false,
        read: true,
        write: false,
        delete: false,
      };
    }

    setPermission(perm);
  };

  const permissionShow = (permission) => {
    if (permission.delete && permission.write && permission.read) {
      return `0`;
    } else if (permission.write && permission.read) {
      return `1`;
    } else {
      return `2`;
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <div>
        <div className="mt-[37px]">
          <div className="flex justify-between items-center mb-[37px]">
            <p className="font-medium text-black">{moduleName} :</p>
            <div>
              <button
                type="button"
                className="inline-flex justify-center rounded-lg border border-[#B2B2B6] bg-white px-8 py-2 text-sm font-medium text-[#B2B2B6] "
              >
                Return
              </button>
              <button
                type="button"
                name={moduleName}
                onClick={(e) => addHandler(e)}
                className="inline-flex ml-2 justify-center rounded-lg border border-transparent bg-primary px-8 py-2 text-sm font-medium text-white "
              >
                New Sharing Rule
              </button>
            </div>
          </div>
        </div>
      </div>
      <RulesList
        moduleName={moduleName}
        changeDispatch={dispatch}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
      
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            handleClose();
          }}
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
                <Dialog.Panel className="w-[1200px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl  mb-4 font-medium leading-6 text-gray-900"
                  >
                    {editMode
                      ? `Update Rule - ${currentModule}`
                      : `Create Rule - ${currentModule}`}
                  </Dialog.Title>
                  <div className="grid lg:grid-cols-1">
                    <div className="form-group row flex mb-3 items-center">
                      <label
                        htmlFor="firstName"
                        className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                      >
                        Sharing Rule Name
                      </label>
                      <div className="col-sm-6">
                        <input
                          name="SharingRuleName"
                          type="text"
                          placeholder="Enter Sharing Rule Name"
                          className={`form-control rounded-[10px] w-[270px]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                          onChange={(e) => setSharingRuleName(e.target.value)}
                          value={sharingRuleName}
                        />
                      </div>
                    </div>
                    <div className="form-group row  flex mb-3 items-center">
                      <label
                        htmlFor="roleId"
                        className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                      >
                        Records Shared From
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                          placeholder="Select Records Shared From"
                          name="RecordsSharedFrom"
                          value={recordsSharedFrom}
                          defaultValue={recordsSharedFrom}
                          onChange={(e) => changeHandlerOfRecordFrom(e)}
                        >
                          <option value="Roles">Roles</option>
                          <option value="Groups">Groups</option>
                        </select>
                        <select
                          className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                          placeholder="Select Records Shared"
                          name="RecordsSharedFromObjectId"
                          value={recordsSharedFromObjectId}
                          defaultValue={recordsSharedFromObjectId}
                          onChange={(e) =>
                            setRecordsSharedFromObjectId(e.target.value)
                          }
                        >
                          {recordsSharedFromObjectData.map((valueData) => {
                            return (
                              <option value={valueData._id}>
                                {recordsSharedFrom === "Roles"
                                  ? valueData.roleTitle
                                  : valueData.groupTitle}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row  flex mb-3 items-center">
                      <label
                        htmlFor="roleId"
                        className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                      >
                        Records Shared To
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                          placeholder="Select Records Shared To"
                          name="RecordsSharedTo"
                          value={recordsSharedTo}
                          defaultValue={recordsSharedTo}
                          onChange={(e) => changeHandlerOfRecordTo(e)}
                        >
                          <option value="Roles">Roles</option>
                          <option value="Groups">Groups</option>
                        </select>
                        <select
                          className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                          placeholder="Select Records Shared"
                          name="RecordsSharedToObjectId"
                          value={recordsSharedToObjectId}
                          defaultValue={recordsSharedToObjectId}
                          onChange={(e) =>
                            setRecordsSharedToObjectId(e.target.value)
                          }
                        >
                          {recordsSharedToObjectData.map((valueData) => {
                            return (
                              <option value={valueData._id}>
                                {recordsSharedTo === "Roles"
                                  ? valueData.roleTitle
                                  : valueData.groupTitle}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row  flex mb-3 items-center">
                      <label
                        htmlFor="roleId"
                        className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                      >
                        Permission
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                          placeholder="Select permission"
                          name="permission"
                          value={permissionValue}
                          defaultValue={permissionValue}
                          onChange={(e) => handleChangePermission(e)}
                        >
                          <option value="0">Read/Write/Delete</option>
                          <option value="1">Read/Write</option>
                          <option value="2">Read Only</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row  flex mb-3 items-center">
                      <label
                        htmlFor="roleId"
                        className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                      >
                        Superiors Allowed
                      </label>
                      <div className="col-sm-6">
                        <input
                          name="SuperiorsAllowed"
                          onChange={(e) =>
                            setSuperiorsAllowed(!superiorsAllowed)
                          }
                          value="0"
                          type="checkbox"
                          checked={superiorsAllowed}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center gap-3">
                      <button
                        type="submit"
                        className="bg-white text-base w-1/2 py-[10px] px-8 rounded-2xl border border-[#B2B2B6] text-[#B2B2B6] font-bold"
                        name="save"
                        onClick={() => saveData()}
                      >
                        {" "}
                        {editMode ? "Update" : "Create"}
                      </button>
                      <div
                        className="bg-[#191242] text-center text-base w-1/2 py-[10px] px-8 rounded-2xl border border-[#B2B2B6] text-white font-bold"
                        onClick={() => handleClose()}
                      >
                        <button
                          variant="secondary"
                          type="button"
                          onClick={() => handleClose()}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
