import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const TrustedDomainModal = ({ modal, setModal }) => {
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
              <Dialog.Panel className="w-[40%] max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Create New Trusted Domain
                </Dialog.Title>
                <div className="grid lg:grid-cols-1 mt-4">
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" text-lg col-sm-6 w-[30%] text-[#929296] font-medium col-form-label"
                    >
                      Name<span className="text-red-800">*</span>
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <input
                        name="roleTitle"
                        // value={data?.roleTitle}
                        type="text"
                        className={`form-control rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                        // onChange={(e) => handleChange(e)}
                        // value={sharingRuleName}
                      />
                    </div>
                  </div>
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" text-lg col-sm-6 w-[30%] text-[#929296] font-medium col-form-label"
                    >
                      Domain<span className="text-red-800">*</span>
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <input
                        name="roleTitle"
                        // value={data?.roleTitle}
                        type="text"
                        className={`form-control rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                        // onChange={(e) => handleChange(e)}
                        // value={sharingRuleName}
                      />
                    </div>
                  </div>
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" text-lg col-sm-6 w-[30%] text-[#929296] font-medium col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <textarea
                        id="message"
                        name="description"
                        rows="2"
                        placeholder="Enter description"
                        className="block w-[100%]  my-2 p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:bg-gray-100 "
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      className=" border-[#191242] border rounded-2xl px-5 py-3 "
                      onClick={() => setModal(false)}
                    >
                      Close
                    </button>
                    <button
                      // onClick={saveHandler}
                      className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                      // disabled={editable}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TrustedDomainModal;
