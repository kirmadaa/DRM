import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const AssignOwnerModal = ({
  modal,
  setModal,
  users,
  assignData,
  setAssignData,
}) => {

  return (
    <Transition appear show={modal?.show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          setModal({ ...modal, show: false });
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
              <Dialog.Panel className="w-[50%] max-w-4xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <>
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
                  >
                    Assign owner for{" "}
                    {modal?.type === "instantAction"
                      ? "Instant action"
                      : "Scheduled Action"}
                  </Dialog.Title>
                  <div className="grid lg:grid-cols-1 mt-4">
                    <div className="my-5">
                      <div className="grid grid-cols-3 py-2 border-b border-[#E5E5E5]">
                        <h6 className="col-span-1 font-semibold">To</h6>
                        <div className="col-span-2">
                          {" "}
                          <select
                            className=" placeholder-opacity-100 focus:outline-0 text-base border-2 border-[#191242] m-3 rounded-lg"
                            name="when_selector"
                            onChange={(e) => {
                              modal?.type === "instantAction"
                                ? setAssignData({
                                    ...assignData,
                                    instantAction: e.target.value,
                                  })
                                : setAssignData({
                                    ...assignData,
                                    scheduledAction: e.target.value,
                                  });
                            }}
                            value={
                              modal?.type === "instantAction"
                                ? assignData?.instantAction
                                : assignData?.scheduledAction
                            }
                            // defaultValue={permissionValue}
                          >
                            <option>Choose User</option>
                            {users?.usersData?.map((item, index) => (
                              <option
                                value={item?._id}
                                key={index}
                              >{`${item?.firstName} ${item?.lastName}`}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-3">
                      <button
                        className=" border-[#191242] border rounded-2xl px-5 py-3 "
                        onClick={() => {
                          setModal({ type: "", show: false });
                        }}
                      >
                        Close
                      </button>
                      <button
                        onClick={() => setModal({ ...modal, show: false })}
                        className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                        // disabled={editable}
                      >
                        Save and Associate
                      </button>
                    </div>
                  </div>
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AssignOwnerModal;
