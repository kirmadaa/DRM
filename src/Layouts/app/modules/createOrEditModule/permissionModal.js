import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const PermissionModal = ({ modal, setModal, saveFunction, field }) => {
  const dispatch = useDispatch();
  const [permission, setPermission] = useState([]);
  const { roledata } = useSelector((store) => store?.role);

  const keyIncluded = (name, i) => {
    return permission[i]?.access?.includes(name);
  };

  const handleChange = (item, e, i) => {
    const { name, checked } = e?.target;
    const updatedPermission = [...permission];
    if (checked) {
      updatedPermission[i].access?.push(name);
    } else {
      updatedPermission[i].access = updatedPermission[i].access?.filter(
        (ele) => name !== ele
      );
    }

    setPermission(updatedPermission);
  };

  useEffect(() => {
    if (modal) {
      dispatch(GET_ALL_ROLE_DATA(1, 200));
    }
  }, [dispatch, modal]);

  useEffect(() => {
    if (field?.length !== 0) {
      setPermission([...field]);
    } else {
      setPermission(
        roledata?.map((item) => {
          return {
            roleId: item?._id,
            access: [],
          };
        })
      );
    }
  }, [roledata]);
  
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModal(false)}
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Permissions
                </Dialog.Title>
                <div className="container min-h-[140px]">
                  <div className="grid lg:grid-cols-1">
                    {roledata?.map((item, index) => {
                      return (
                        <div className="w-1/2" key={index}>
                          <div className="flex mt-2 items-center gap-2">
                            <p className="mb-0 text-primary checkread uppercase min-w-[140px]">
                              {item?.roleTitle}
                            </p>
                            <form className="flex justify-start gap-5 items-center ">
                              <div className="flex justify-start gap-1 items-center m-1">
                                <input
                                  name="Add"
                                  onChange={(e) => handleChange(item, e, index)}
                                  type="checkbox"
                                  defaultChecked={keyIncluded("Add", index)}
                                />
                                <p className="mb-0 p-1">Add</p>
                              </div>
                              <div className="flex justify-start gap-1 items-center m-1">
                                <input
                                  name="Edit"
                                  onChange={(e) => handleChange(item, e, index)}
                                  type="checkbox"
                                  defaultChecked={keyIncluded("Edit", index)}
                                />
                                <p className="mb-0 p-1">Edit</p>
                              </div>
                              <div className="flex justify-start gap-1 items-center m-1">
                                <input
                                  name="Delete"
                                  onChange={(e) => handleChange(item, e, index)}
                                  type="checkbox"
                                  defaultChecked={keyIncluded("Delete", index)}
                                />
                                <p className="mb-0 p-1">Delete</p>
                              </div>
                              <div className="flex justify-start gap-1 items-center m-1">
                                <input
                                  name="Read"
                                  onChange={(e) => handleChange(item, e, index)}
                                  type="checkbox"
                                  defaultChecked={keyIncluded("Read", index)}
                                />
                                <p className="mb-0 p-1">Read</p>
                              </div>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => saveFunction(permission)}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                  >
                    Save
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

export default PermissionModal;
