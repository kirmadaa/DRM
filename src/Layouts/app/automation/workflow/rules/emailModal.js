import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Addicon, Closeicon, Staricon } from "../../../../../assets/svgIcons";
import { useNavigate } from "react-router-dom";

const EmailNotificationModal = ({
  modal,
  setModal,
  setEmailRadio,
  emailRadio,
  emailInfo,
  setEmailInfo,
  users,
}) => {
  const { emailTemplates } = useSelector(
    (store) => store.ServiceControlReducer
  );
  const navigate = useNavigate();

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          setModal(false);
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
                {!emailInfo?.show ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
                    >
                      Select Template
                      <button
                        onClick={() => {
                          setModal(false);
                        }}
                        className="bg-[#FDD100] flex items-center justify-center h-[32px] w-[32px] rounded"
                      >
                        <Closeicon />
                      </button>
                    </Dialog.Title>
                    <div className="grid lg:grid-cols-1 mt-4">
                      <div className="mt-8 flex justify-end">
                        <div>
                          <button
                            onClick={() => {
                              navigate("/crm/service-control/email");
                            }}
                            className="w-[200px] bg-[#191242] py-4  px-[14px] text-white text-base flex gap-[10px] items-center justify-center h-[52px] rounded-2xl font-medium"
                          >
                            <Addicon /> Create Template
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        {emailTemplates?.data?.EmailData.length &&
                          emailTemplates?.data?.EmailData.map((item, index) => {
                            return (
                              <div className="flex group border-b hover:bg-[#F0F0F5] border-[#E6E6EB] py-[9px] px-2 items-center">
                                <div className="flex items-center  gap-[18px] w-1/2">
                                  <input
                                    type="radio"
                                    name="radio"
                                    className=""
                                    onChange={(e) =>
                                      setEmailRadio({
                                        value: e.target.value,
                                        name: item?.emailTitle,
                                      })
                                    }
                                    value={item?._id}
                                    checked={emailRadio?.value === item?._id}
                                  />
                                  <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                    <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                      {item?.emailTitle}
                                    </span>
                                  </p>
                                  <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                    <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                      {item?.emailDescription}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      {/* {emailTemplates?.data?.EmailData?.map((item, index) => (
                  <>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="radio"
                        className=""
                        onChange={(e) => setEmailRadio(e.target.value)}
                        value={item?._id}
                        checked={emailRadio === item?._id}
                      />
                      <p>{item?.emailTitle}</p>
                      <p>{item?.emailDescription}</p>
                    </div>
                  </>
                ))} */}

                      <div className="flex justify-end mt-3">
                        <button
                          className=" border-[#191242] border rounded-2xl px-5 py-3 "
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          Close
                        </button>
                        <button
                          onClick={() => {
                            setEmailInfo({ ...emailInfo, show: true });
                          }}
                          className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                          // disabled={editable}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
                    >
                      Edit Email Notification
                      <button
                        onClick={() => {
                          setEmailRadio();
                          setModal(false);
                        }}
                        className="bg-[#FDD100] flex items-center justify-center h-[32px] w-[32px] rounded"
                      >
                        <Closeicon />
                      </button>
                    </Dialog.Title>
                    <div className="grid lg:grid-cols-1 mt-4">
                      {/* <div className="mt-8">
                        {emailTemplates?.data?.EmailData.length &&
                          emailTemplates?.data?.EmailData.map((item, index) => {
                            return (
                              <div className="flex group border-b hover:bg-[#F0F0F5] border-[#E6E6EB] py-[9px] px-2 items-center">
                                <div className="flex items-center  gap-[18px] w-1/2">
                                  <input
                                    type="radio"
                                    name="radio"
                                    className=""
                                    onChange={(e) =>
                                      setEmailRadio({
                                        value: e.target.value,
                                        name: item?.emailTitle,
                                      })
                                    }
                                    value={item?._id}
                                    checked={emailRadio?.value === item?._id}
                                  />
                                  <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                    <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                      {item?.emailTitle}
                                    </span>
                                  </p>
                                  <p className="text-[#18181B] text-base font-medium roup-hover:rate  leading-[20px]">
                                    <span className="text-[#929296] text-sm font-medium leading-[22px] ml-2">
                                      {item?.emailDescription}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div> */}

                      <div className="my-5">
                        <div className="grid grid-cols-3 py-2 border-b border-[#E5E5E5]">
                          <h6 className="col-span-1 font-semibold">Name</h6>
                          <p className="col-span-2">
                            {" "}
                            <input
                              value={emailRadio?.name}
                              onChange={(e) =>
                                setEmailRadio({
                                  ...emailInfo,
                                  name: e.target.value,
                                })
                              }
                            />{" "}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 py-2 border-b border-[#E5E5E5]">
                          <h6 className="col-span-1 font-semibold">To</h6>
                          <div className="col-span-2">
                            {" "}
                            <select
                              className=" placeholder-opacity-100 focus:outline-0 text-base border-2 border-[#191242] m-3 rounded-lg"
                              name="when_selector"
                              onChange={(e) =>
                                setEmailInfo({
                                  ...emailInfo,
                                  toMail: e.target.value,
                                })
                              }
                              // value={when?.value}
                              // defaultValue={permissionValue}
                            >
                              <option>Choose User</option>
                              {users?.usersData?.map((item, index) => (
                                <option
                                  value={item?._id}
                                >{`${item?.firstName} ${item?.lastName}`}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 py-2 border-b border-[#E5E5E5]">
                          <h6 className="col-span-1 font-semibold">
                            Email Template
                          </h6>
                          <div className="col-span-2 flex gap-5 items-center">
                            <button
                              className="text-white bg-primary cursor-pointer font-medium rounded text-sm px-5 py-2  text-center"
                              onClick={() => {
                                setEmailInfo({ info: null, show: false });
                              }}
                            >
                              Select Template
                            </button>
                            <p>{emailRadio?.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* {emailTemplates?.data?.EmailData?.map((item, index) => (
                    <>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="radio"
                          className=""
                          onChange={(e) => setEmailRadio(e.target.value)}
                          value={item?._id}
                          checked={emailRadio === item?._id}
                        />
                        <p>{item?.emailTitle}</p>
                        <p>{item?.emailDescription}</p>
                      </div>
                    </>
                  ))} */}

                      <div className="flex justify-end mt-3">
                        <button
                          className=" border-[#191242] border rounded-2xl px-5 py-3 "
                          onClick={() => {
                            setEmailRadio();
                            setModal(false);
                          }}
                        >
                          Close
                        </button>
                        <button
                          onClick={() => setModal(false)}
                          className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                          // disabled={editable}
                        >
                          Save and Associate
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EmailNotificationModal;
