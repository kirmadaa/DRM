import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const MassDeleteModal = ({ modal, setModal, deleteFun }) => {
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
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB] text-center"
                >
                  Delete Records
                </Dialog.Title>
                <div className="container min-h-[140px]">
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
                </div>

                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => deleteFun()}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                  >
                    Delete
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

export default MassDeleteModal;
