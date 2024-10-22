import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment, useState } from "react";
import { list, list1 } from "../../../../Components/module";



const LookupModal = ({ modal, setModal, sourceData, saveLookupModelData, type = "create", updateModalsData }) => {
  const defaultData = {
    title: sourceData?.label || "",
    required: sourceData?.required || false,
    lookupModule: sourceData?.lookupModule || list1[0] || Object.entries(list)[0][0],
    relatedListTitle: sourceData?.relatedListTitle || "Related List Name 1"
  }

  const [title, setTitle] = useState(defaultData.title)
  const [relatedListTitle, setRelatedListTitle] = useState(defaultData.relatedListTitle)
  const [lookupModule, setLookupModule] = useState(defaultData.lookupModule)
  const [required, setRequired] = useState(defaultData.required)


  const saveFunction = () => {
    const data = {
      ...sourceData,
      name: title,
      label: title,
      value: title,
      lookupModule: lookupModule == "lookupModule" ? "Opportunities" : lookupModule,
      relatedListTitle,
      required
    }
    if (type === "update") {
      updateModalsData(data)
    } else {
      saveLookupModelData(data)
    }
    setModal(false)
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
                  Lookup Properties
                </Dialog.Title>
                <div className="container min-h-[140px]">
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Field Label:</label>
                    <input
                      name="name"
                      type="text"
                      onChange={e => setTitle(e.target.value)}
                      value={title}
                      className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                    />
                  </div>
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Lookup Module:</label>
                    <select
                      className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                      onChange={(e) => setLookupModule(e.target.value)}
                      value={lookupModule}
                    >
                      {/* {console.log("Object.entries(list)=====>",list1, list, Object.entries(list))} */}
                      {/* {Object.entries(list).map(([key]) => {
                        return <option value={key} id={key}>{key}</option>
                      })} */}
                      {(list1).map((item, index) => {
                        return <option value={item} id={item}>{item}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className="grid lg:grid-cols-1">
                  <label className="font-semibold mt-3">Related List Title:</label>
                  <input
                    name="relatedListTitle"
                    type="text"
                    onChange={e => setRelatedListTitle(e.target.value)}
                    value={relatedListTitle}
                    className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <label>Required:</label>
                  <input
                    name="required"
                    onChange={(e) => setRequired(!required)}
                    type="checkbox"
                    value={required}
                    checked={required}
                  />
                </div>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  );
};

export default LookupModal;
