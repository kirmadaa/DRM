import React, { Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import countryJson from "../../../../assets/country.json";
import { ChevronDown } from "react-feather";
import { useDispatch } from "react-redux";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "../../../../Redux/actions/user";
import { useState } from "react";

const MobileModal = ({ modal, data, setData, setModal }) => {
  const dispatch = useDispatch()
  const [mobile, setMobile] = useState(data?.mobile || "")
  const updateData = { ...data, mobile: parseInt(mobile) }

  const saveHandler = () => {
    dispatch(UPDATE_USER_PROFILE({ ...updateData })).then((res) => {
      if (res?.success) {
        setModal(false)
      }
    });
    dispatch(GET_USER_PROFILE()).then((res) => {
      setData(res?.data?.data?.[0]);
    });
  }
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
                  Add Mobile Number
                </Dialog.Title>
                <div className="container">
                  <fieldset className="form-fieldset pt-2">
                    <h5 className="text-[#6A6A6D] font-medium">
                      A one-time password will be sent to your mobile number.
                    </h5>
                  </fieldset>
                  <div className="flex flex-wrap items-center gap-5 my-5 justify-center">
                    <h3 className="text-lg text-[#929296] font-medium">
                      Mobile Numbers
                    </h3>
                    <div className="border border-[#E6E6EB] rounded-xl p-4 flex items-center">
                      {/* <select>
                        <option>
                        
                          {countryJson?.images[76]?.dialingCode}
                        </option>
                        {countryJson?.images?.map((item, index) => (
                          <option>
                         
                            {item?.dialingCode}
                            
                          </option>
                        ))}
                      </select> */}
                      <Menu
                        as="div"
                        className="relative inline-block items-center text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex items-center gap-3 w-full justify-center text-sm font-medium text-gray-900 hover:bg-opacity-30">
                            <img
                              className="h-5 w-auto"
                              src={countryJson?.images[76]?.imageLink || ""}
                              alt={countryJson?.images[76]?.name || ""}
                            />
                            <ChevronDown size={16} />
                          </Menu.Button>
                        </div>
                        <Menu.Items className="absolute left-0 mt-2 h-24 overflow-y-scroll w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {countryJson?.images?.map((item, index) => (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active
                                    ? "bg-primary text-white"
                                    : "text-gray-900"
                                    } group flex w-full items-center px-5 py-[10px] text-sm`}
                                >
                                  <img
                                    className="h-5 w-auto"
                                    src={item?.imageLink || ""}
                                    alt={item?.name || ""}
                                  />
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>
                      <input
                        className="focus:outline-none pl-4"
                        type="number"
                        maxlength="10"
                        onChange={(e) => { setMobile(e.target.value) }}
                        value={mobile}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-3 w-full"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={saveHandler}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3 w-full text-center"
                  // disabled={editable}
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

export default MobileModal;
