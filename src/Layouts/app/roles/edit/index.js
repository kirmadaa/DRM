import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_ALL_DATA,
  GET_ALL_ROLE_DATA,
  UPDATE_ROLE_DATA,
} from "../../../../Redux/actions/role";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";

const EditRoleLayout = ({
  selectRole,
  setSelectRole,
  setModalShow,
  modalShow,
  roleByIdData,
  currentPage
}) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role);
  const [permission, setPermission] = useState([]);
  const [roleTitle, setRoleTitle] = useState(selectRole?.roleTitle);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (selectRole?.permission) {
      setPermission(roleByIdData?.permission);
      setRoleTitle(roleByIdData?.roleTitle);
      setSelectedValue(roleByIdData?.parent_id);
    }
  }, [selectRole, roleByIdData]);

  const HandleSave = async () => {
    let payload = {
      roleId: roleByIdData._id,
      roleTitle: roleTitle,
      parent_id: selectedValue,
      permission,
    };
    const res = await dispatch(UPDATE_ROLE_DATA(payload));
    if (res === 200) {
      dispatch(GET_ALL_ROLE_DATA(currentPage+1, 10));
      setSelectRole(null);
      closeModal();
    }
  };

  // const handleChange = (moduleName, e) => {
  //   const { name, checked } = e?.target;
  //   const updatedPermission = permission.map((item) => {
  //     if (item.module_title === moduleName) {
  //       return {
  //         ...item,
  //         module_permission: {
  //           ...item.module_permission,
  //           [name]: checked || true,
  //         },
  //       };
  //     }
  //     return item;
  //   });
  //   setPermission(updatedPermission);
  // };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  function closeModal() {
    setModalShow(false);
  }
  useEffect(() => {
    if(modalShow){
    dispatch(GET_ALL_DATA(1,50));}
  }, [modalShow]);
  return (
    <Transition appear show={modalShow} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  Update Role
                </Dialog.Title>
                <div className="flex gap-3 items-center mt-4">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  id="demo-simple-select"
                  value={selectedValue || ""}
                  defaultValue={selectedValue || ""}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Role</option>
                  {roles?.roledetail?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.roleTitle}
                    </option>
                  ))}
                </select>

                <input
                  value={roleTitle}
                  type="text"
                  name="roleTitle"
                  className="titleadd bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
                </div>

               
                {roles?.getidloading ? <div className="text-center">...loading</div> :
                <>
                <div className="grid lg:grid-cols-2">
                  {/* {permission?.map((item) => {
                    return (
                      <div className="w-1/2" key={item?.module_title}>
                        <div className="flex mt-2 items-center gap-2">
                          <p className="mb-0 text-primary checkread uppercase min-w-[140px]">
                            {item?.module_title}
                          </p>
                          <form className="flex justify-start items-center ">
                            <div className="flex justify-start items-center m-1">
                              <input
                                name="read"
                                type="checkbox"
                                checked={item.module_permission.read}
                                onChange={(e) =>
                                  handleChange(item?.module_title, e)
                                }
                                disableUnderline
                                inputProps={{ "aria-label": "checkbox" }}
                              />
                              <p className="mb-0 p-1">Read</p>
                            </div>
                            <div className="flex justify-start items-center m-1">
                              <input
                                name="write"
                                checked={item.module_permission.write === true}
                                onChange={(e) =>
                                  handleChange(item?.module_title, e)
                                }
                                type="checkbox"
                                disableUnderline
                              />
                              <p className="mb-0 p-1">write</p>
                            </div>
                            <div className="flex justify-start items-center m-1">
                              <input
                                name="edit"
                                checked={item.module_permission.edit === true}
                                onChange={(e) =>
                                  handleChange(item?.module_title, e)
                                }
                                type="checkbox"
                                disableUnderline
                              />
                              <p className="mb-0 p-1">Edit</p>
                            </div>
                            <div className="flex justify-start items-center m-1">
                              <input
                                name="delete"
                                checked={item.module_permission.delete === true}
                                onChange={(e) =>
                                  handleChange(item?.module_title, e)
                                }
                                type="checkbox"
                                disableUnderline
                              />
                              <p className="mb-0 p-1">Delete</p>
                            </div>
                          </form>
                        </div>
                      </div>
                    );
                  })} */}
                </div></>}
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                    onClick={HandleSave}
                  >
                    {"Add Role"}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                    onClick={() => {
                      setModalShow(false);
                      setSelectedValue("");
                    }}
                  >
                    {"Cancel"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditRoleLayout;