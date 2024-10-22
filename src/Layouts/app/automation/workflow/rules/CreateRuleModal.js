import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";
import { list } from "../../../../../Components/module";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRuleModal = ({ modal, handleClose }) => {
  const [module, setModule] = useState();
  const [text, setText] = useState({ rules: "", desc: "" });
  const navigate = useNavigate();

  const handleCreate = () => {
    if (module && text?.rules) {
      navigate(`/crm/workflow-rules/create?module=${module}`, {
        state: { rulesName: text?.rules, rulesDesc: text?.desc || "" },
      });
    } else {
      toast.warning("Please enter rules name and  module name");
    }
  };
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB] text-center"
                >
                  Create New Rule
                </Dialog.Title>
                {/* <div className="container min-h-[140px]">
                  <div className="grid lg:grid-cols-1 text-center">
                    <h3 className="font-medium text-semibold">
                      Are you sure you want to delete the selected records?
                    </h3>
                    <p className="text-sm">
                      <span className="font-medium text-semibold"> Note:</span>{" "}
                      Any associated Activities, Visits, Drafts will also be
                      deleted{" "}
                    </p>
                  </div>
                </div> */}
                <div className="my-10">
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Rule Name <span className="text-red-800">*</span>
                    </label>
                    <div className="col-sm-6 w-full">
                      <input
                        name="roleTitle"
                        type="text"
                        placeholder="Enter Rule Name"
                        className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                        onChange={(e) =>
                          setText({ ...text, rules: e.target.value })
                        }
                        // value={sharingRuleName}
                      />
                    </div>
                  </div>

                  <div className="form-group row  flex mb-3 items-center">
                    <label
                      htmlFor="roleId"
                      className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Module <span className="text-red-800">*</span>
                    </label>
                    <div className="col-sm-6 w-full py-[10px] px-4 border-[1.5px] bg-[#fff] border-[#dce2eb] rounded-[10px]">
                      <select
                        className="form-control w-full placeholder-opacity-100 focus:outline-0 text-base"
                        placeholder="Select Module"
                        name="parent_id"
                        onChange={(e) => setModule(e.target.value)}
                      >
                        <option value="">Choose module</option>
                        {Object.keys(list)?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row flex mb-3 ">
                    <label
                      htmlFor="firstName"
                      className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-6 w-full">
                      <textarea
                        name="roleTitle"
                        type="text"
                        placeholder="Enter Description"
                        className={`form-control rounded-[10px] w-full border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb] p-2 text-base`}
                        onChange={(e) =>
                          setText({ ...text, desc: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] w-full"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleCreate}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center w-full"
                  >
                    Create
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

export default CreateRuleModal;
