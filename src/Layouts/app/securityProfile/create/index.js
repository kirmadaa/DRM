import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import {
  CREATE_SECURITY_PROFILE,
  GET_ALL_SECURITY_PROFILE,
  UPDATE_SECURITY_PROFILE,
} from "../../../../Redux/actions/security-control";

export default function SecurityProfileCreate({
  currentPage,
  showRows,
  modalCreateProfileShow,
  setModalCreateProfileShow,
  editMode,
  data,
}) {
  let dispatch = useDispatch();

  const functionForAllChangeData = () => {
    let defaulAllChangeHandler = {
      allRead: false,
      allWrite: false,
      allEdit: false,
      allDelete: false,
      allAutoResponders: false,
      allExcelSheet: false
    };
    if (editMode) {
      const defaultCount = {
        read: 0,
        write: 0,
        edit: 0,
        delete: 0,
        autoResponders: 0,
        excelSheet: 0
      };
      data?.permission.map((value) => {
        for (let key in defaultCount) {
          if (value.module_permission[key]) {
            defaultCount[key]++;
          }
        }
      });
      if (data?.permission.length === defaultCount.read) {
        defaulAllChangeHandler['allRead'] = true;
      }
      if (data?.permission.length === defaultCount.write) {
        defaulAllChangeHandler['allWrite'] = true;
      }
      if (data?.permission.length === defaultCount.edit) {
        defaulAllChangeHandler['allEdit'] = true;
      }
      if (data?.permission.length === defaultCount.delete) {
        defaulAllChangeHandler['allDelete'] = true;
      } if (data?.permission.length === defaultCount.autoResponders) {
        defaulAllChangeHandler['allAutoResponders'] = true;
      }
      if (data?.permission.length === defaultCount.excelSheet) {
        defaulAllChangeHandler['allExcelSheet'] = true;
      }
    }
    return defaulAllChangeHandler;
  };

  const [allChangeHandler, setAllChangeHandler] = useState(functionForAllChangeData());
  // const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(editMode ? data?.profileTitle : "");
  const [desc, setDesc] = useState(editMode ? data?.profileDescription : "");
  const [permission, setPermission] = useState(
    editMode ? data?.permission : permissions
  );

  const handleCreateRole = async () => {
    setLoading(true);
    let payload = {
      profileTitle: profile,
      profileDescription: desc,
      permission,
    };
    if (editMode) {
      payload.profileId = data._id;
      await dispatch(UPDATE_SECURITY_PROFILE(payload)).then((response) => {
        if (response?.status === 200) {
          dispatch(GET_ALL_SECURITY_PROFILE(currentPage, showRows));
          setModalCreateProfileShow();
          setLoading(false);
        }
      });
    } else {
      await dispatch(CREATE_SECURITY_PROFILE(payload)).then((response) => {
        if (response?.status === 200) {
          dispatch(GET_ALL_SECURITY_PROFILE(currentPage, showRows));
          setModalCreateProfileShow();
          setLoading(false);
        }
      });
    }
  };

  const nameModuleHandler = (name, repeat = false) => {
    if (repeat) {
      let nameModule = "allRead";
      if (name === "write") {
        nameModule = "allWrite";
      } else if (name === "edit") {
        nameModule = "allEdit";
      } else if (name === "delete") {
        nameModule = "allDelete";
      } else if (name === "autoResponders") {
        nameModule = "allAutoResponders";
      } else if (name === "excelSheet") {
        nameModule = "allExcelSheet";
      }
      return nameModule;
    } else {
      let nameModule = "read";
      if (name === "allWrite") {
        nameModule = "write";
      } else if (name === "allEdit") {
        nameModule = "edit";
      } else if (name === "allDelete") {
        nameModule = "delete";
      } else if (name === "allAutoResponders") {
        nameModule = "autoResponders";
      } else if (name === "allExcelSheet") {
        nameModule = "excelSheet";
      }
      return nameModule;
    }
  };

  const allChangeModulehandler = (e) => {
    const { name, checked } = e?.target;
    const value = { ...allChangeHandler, [name]: checked };
    setAllChangeHandler(value);
    const nameOfField = nameModuleHandler(name);
    const updatedPermission = permission.map((item) => {
      return {
        ...item,
        module_permission: {
          ...item.module_permission,
          [nameOfField]: checked,
        },
      };
    });
    setPermission(updatedPermission);
  };

  const handleChange = (moduleName, e) => {
    const { name, checked } = e?.target;
    const updatedPermission = permission.map((item) => {
      if (item.module_title === moduleName) {
        return {
          ...item,
          module_permission: {
            ...item.module_permission,
            [name]: checked,
          },
        };
      }
      return item;
    });
    setPermission(updatedPermission);
    let count = 0;
    updatedPermission.map((value) => {
      if (value.module_permission[name]) {
        count++;
      }
    });
    if (count === permission.length && checked) {
      const nameOfField = nameModuleHandler(name, true);
      setAllChangeHandler({ ...allChangeHandler, [nameOfField]: checked });
    } else if (count < permission.length && !checked) {
      const nameOfField = nameModuleHandler(name, true);
      setAllChangeHandler({ ...allChangeHandler, [nameOfField]: checked });
    }
  };

  return (
    <>
      <Transition appear show={modalCreateProfileShow} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalCreateProfileShow(false)}
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

          <div className="fixed inset-0 overflow-y-auto w-[90%] h-[80%] m-auto">
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
                {/* max-w-3xl lg:max-w-5xl */}
                <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {editMode ? "Update" : "Create"} Security Profile
                  </Dialog.Title>
                  <div className="flex gap-3 mt-3 ">
                    <div className="w-1/2 ">
                      <input
                        type="text"
                        placeholder="title.."
                        value={profile}
                        className="titleadd bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        onChange={(e) => {
                          setProfile(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <textarea
                        id="message"
                        name="description"
                        rows="2"
                        placeholder="description.."
                        className="block w-[100%]  mb-2 p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:bg-gray-100 "
                        value={desc}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />

                    </div>
                  </div>
                  <form className="bg-gray-200 rounded-md p-0.5 flex flex-wrap items-center text-sm">
                    <div className="flex justify-start items-center m-0.5">
                      <input
                        name="allRead"
                        onChange={(e) => allChangeModulehandler(e)}
                        type="checkbox"
                        checked={allChangeHandler?.allRead}
                      />
                      <p className="mb-0 p-1">All Read</p>
                    </div>
                    <div className="flex justify-start items-center m-0.5">
                      <input
                        name="allWrite"
                        onChange={(e) => allChangeModulehandler(e)}
                        type="checkbox"
                        checked={allChangeHandler?.allWrite}
                      />
                      <p className="mb-0 p-1">All Write</p>
                    </div>
                    <div className="flex justify-start items-center m-0.5">
                      <input
                        name="allEdit"
                        onChange={(e) => allChangeModulehandler(e)}
                        checked={allChangeHandler?.allEdit}
                        type="checkbox"
                      />
                      <p className="mb-0 p-1">All Edit</p>
                    </div>
                    <div className="flex justify-start items-center m-0.5">
                      <input
                        name="allDelete"
                        onChange={(e) => allChangeModulehandler(e)}
                        checked={allChangeHandler?.allDelete}
                        type="checkbox"
                      />
                      <p className="mb-0 p-1">All Delete</p>
                    </div>
                    <div className="flex justify-start items-center m-0.5">
                      <input
                        name="allAutoResponders"
                        onChange={(e) => allChangeModulehandler(e)}
                        checked={allChangeHandler?.allAutoResponders}
                        type="checkbox"
                      />
                      <p className="mb-0 p-1">All Auto Responders</p>
                    </div>
                    <div className="flex justify-start items-center m-0.5">
                      <input
                        name="allExcelSheet"
                        onChange={(e) => allChangeModulehandler(e)}
                        checked={allChangeHandler?.allExcelSheet}
                        type="checkbox"
                      />
                      <p className="mb-0 p-1">All Excel Sheet</p>
                    </div>
                  </form>
                  <div className=" h-72 overflow-y-scroll grid lg:grid-cols-2 gap-4">
                    {permission?.map((item) => {
                      return (
                        <div className="text-sm" key={item?.module_title}>
                          <div>
                            <p className="m-0.5 px-2 mt-2 font-semibold text-primary checkread uppercase min-w-[140px]">
                              {item?.module_title}
                            </p>
                            <form className="flex flex-wrap items-center ">
                              <div className="flex justify-start items-center m-0.5">
                                <input
                                  name="read"
                                  onChange={(e) =>
                                    handleChange(item?.module_title, e)
                                  }
                                  type="checkbox"
                                  checked={item?.module_permission?.read}
                                />
                                <p className="mb-0 p-1">Read</p>
                              </div>
                              <div className="flex justify-start items-center m-0.5">
                                <input
                                  name="write"
                                  onChange={(e) =>
                                    handleChange(item?.module_title, e)
                                  }
                                  type="checkbox"
                                  checked={item?.module_permission?.write}
                                />
                                <p className="mb-0 p-1">write</p>
                              </div>
                              <div className="flex justify-start items-center m-0.5">
                                <input
                                  name="edit"
                                  onChange={(e) =>
                                    handleChange(item?.module_title, e)
                                  }
                                  type="checkbox"
                                  checked={item?.module_permission?.edit}
                                />
                                <p className="mb-0 p-1">Edit</p>
                              </div>
                              <div className="flex justify-start items-center m-0.5">
                                <input
                                  name="delete"
                                  onChange={(e) =>
                                    handleChange(item?.module_title, e)
                                  }
                                  type="checkbox"
                                  checked={item?.module_permission?.delete}
                                />
                                <p className="mb-0 p-1">Delete</p>
                              </div>
                              <div className="flex justify-start items-center m-0.5">
                                <input
                                  name="autoResponders"
                                  onChange={(e) =>
                                    handleChange(item?.module_title, e)
                                  }
                                  type="checkbox"
                                  checked={item?.module_permission?.autoResponders}
                                />
                                <p className="mb-0 p-1">Auto Responders</p>
                              </div>
                              <div className="flex justify-start items-center m-0.5">
                                <input
                                  name="excelSheet"
                                  onChange={(e) =>
                                    handleChange(item?.module_title, e)
                                  }
                                  type="checkbox"
                                  checked={item?.module_permission?.excelSheet}
                                />
                                <p className="mb-0 p-1">Excel Sheet</p>
                              </div>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                      onClick={handleCreateRole}
                    >
                      {loading
                        ? "Process.."
                        : editMode
                          ? "Update Profile"
                          : "Add Profile"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg bg-gray-100 text-primary px-4 py-2 text-sm font-medium border border-primary "
                      onClick={() => {
                        setProfile("");
                        setModalCreateProfileShow(false);
                      }}
                    >
                      {loading ? "Process.." : "Cancel"}
                    </button>
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
const permissions = [
  {
    module_title: "home",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "leads",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "contacts",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "accounts",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "opportunities",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "tasks",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "Calls",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "meeting",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "saleOrders",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "purchaseOrders",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "invoices",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "quotes",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "inventory",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  // {
  //   module_title: "quotes",
  //   module_permission: {
  //     read: false,
  //     write: false,
  //     delete: false,
  //     edit: false,
  //     autoResponders: false,
  //     excelSheet: false
  //   },
  // },
  {
    module_title: "vendor",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "channelPartner",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "siteVisit",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "whatsapp",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "sms",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "Note",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "settings",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "dataBackup",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "dataExport",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "sampleData",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "storage",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "recycleBin",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
  {
    module_title: "auditLog",
    module_permission: {
      read: false,
      write: false,
      delete: false,
      edit: false,
      autoResponders: false,
      excelSheet: false
    },
  },
];
