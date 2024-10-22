import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Addicon, Closeicon, Staricon } from "../../../../../assets/svgIcons";
import { useNavigate } from "react-router-dom";

const FieldUpdateModal = ({
  modal,
  setModal,
  assignData,
  setAssignData,
  moduleFilters,
  users,
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
                    Field Update for{" "}
                    {modal?.type === "instantAction"
                      ? "Instant action"
                      : "Scheduled Action"}
                  </Dialog.Title>
                  {/* <div className="grid lg:grid-cols-1 mt-4"> */}
                  <div className="flex items-center gap-4 m-3">
                    {/* <p className="text-base font-semibold mb-3">Transfer To</p> */}
                    <label>Name</label>
                    <input
                      type="text"
                      className="bg-[#F9F9FB] border border-[#191242] rounded-xl px-4 py-3 focus:outline-none w-5/12"
                      value={
                        modal?.type === "instantAction"
                          ? assignData?.instantAction?.name
                          : assignData?.scheduledAction?.name
                      }
                      onChange={(e) =>
                        modal?.type === "instantAction"
                          ? setAssignData({
                              ...assignData,
                              instantAction: {
                                ...assignData?.instantAction,
                                name: e.target.value,
                              },
                            })
                          : setAssignData({
                              ...assignData,
                              scheduledAction: {
                                ...assignData?.scheduledAction,
                                name: e.target.value,
                              },
                            })
                      }
                    />
                  </div>
                  <div className="my-5">
                    {/* <div className="grid grid-cols-3 py-2 border-b border-[#E5E5E5]"> */}
                    {/* <h6 className="col-span-1 font-semibold">To</h6> */}
                    <div className="flex items-center gap-4">
                      {/* <p className="text-base font-semibold mb-3">Transfer To</p> */}
                      <div className="border border-[#E6E6EB] rounded-xl p-3">
                        <select
                          className="form-control pe-3 focus:outline-none"
                          name="condition"
                          value={
                            modal?.type === "instantAction"
                              ? assignData?.instantAction?.field
                              : assignData?.scheduledAction?.field
                          }
                          onChange={(e) =>
                            modal?.type === "instantAction"
                              ? setAssignData({
                                  ...assignData,
                                  instantAction: {
                                    ...assignData?.instantAction,
                                    field: e.target.value,
                                  },
                                })
                              : setAssignData({
                                  ...assignData,
                                  scheduledAction: {
                                    ...assignData?.scheduledAction,
                                    field: e.target.value,
                                  },
                                })
                          }
                        >
                          <option value="">Select condition</option>

                          {moduleFilters?.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <input
                        type="text"
                        className="bg-[#F9F9FB] border border-[#191242] rounded-xl px-4 py-3 focus:outline-none w-5/12"
                        value={
                          modal?.type === "instantAction"
                            ? assignData?.instantAction?.data
                            : assignData?.scheduledAction?.data
                        }
                        onChange={(e) =>
                          modal?.type === "instantAction"
                            ? setAssignData({
                                ...assignData,
                                instantAction: {
                                  ...assignData?.instantAction,
                                  data: e.target.value,
                                },
                              })
                            : setAssignData({
                                ...assignData,
                                scheduledAction: {
                                  ...assignData?.scheduledAction,
                                  data: e.target.value,
                                },
                              })
                        }
                      />
                    </div>
                    {/* </div> */}
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
                  {/* </div> */}
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FieldUpdateModal;
