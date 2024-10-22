import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import FormEditorForMacro from "../../../macro/form/FormEditor";

const ActionEditModal = ({
  actionModal,
  setActionModal,
  taskDataHandler,
  closeModal,
  type,
  data,
}) => {
  let newData = {};
  let newObj = data?.forEach((ele) => {
    if (ele?.ActionName === type) {
      newData = ele?.data;
    }
  });
  return (
    <>
      <Transition appear show={actionModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
              <FormEditorForMacro
                formType={type}
                editDataHandler={taskDataHandler}
                closeModal={closeModal}
                editDataIndex={0}
                data={newData}
              />
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ActionEditModal;
