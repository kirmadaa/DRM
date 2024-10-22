import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";

const EditProperties = ({ modal, setModal, sourceData, 
  // formValue, 
  updateModalsData }) => {
  const defaultData = {
    ...sourceData
  }
  const [selectHandler, setSelectHandler] = useState(defaultData)

  const handleChange = (event) => {
    const { name, value } = event.target
    setSelectHandler({
      ...selectHandler,
      [name]: value
    })
  };

  const saveFunction = () => {
    updateModalsData(selectHandler)
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Edit Properties
                </Dialog.Title>
                <div className="container min-h-[140px]">
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Character Length:</label>
                    <input
                      name="maxLength"
                      type="number"
                      onChange={e => handleChange(e)}
                      value={selectHandler?.maxLength}
                      className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex justify-end">
                      <button
                        className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                        onClick={() => setModal(false)}
                      >
                        Don't save this field
                      </button>
                      <button
                        onClick={() => saveFunction()}
                        className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  );
};

export default EditProperties;
