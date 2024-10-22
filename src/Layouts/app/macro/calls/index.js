import { Dialog, Transition } from "@headlessui/react";
import {
  DeleteIcon,
  EditIcon,
  Plusicon,
  Taskicon,
} from "../../../../assets/svgIcons";
import { useState } from "react";
import { Fragment } from "react";
import FormBuilderForMacro from "../form/Formbuiilder";
import FormEditorForMacro from "../form/FormEditor";

const CallMacro = ({
  callDataHandler,
  callData,
  callEditDataHandler,
  callDeleteDataHandler,
}) => {
  let [openCallModal, setOpenCallModal] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editData, setEditData] = useState({});
  const [editDataIndex, setEditDataIndex] = useState(0);

  function closeModalOfCall() {
    setOpenCallModal(false);
    setEditModel(false);
  }

  function openModalOfCall() {
    setEditModel(false);
    setOpenCallModal(true);
  }

  function editHandler(data, index) {
    setEditData(data);
    setEditDataIndex(index);
    setEditModel(true);
  }

  return (
    <div className="rounded-[20px] w-[720px] border border-[#E6E6EB]">
      <div className="flex items-center justify-between rounded-[20px] bg-[#F8F8FC] px-6 py-4">
        <div className="flex items-center ">
          <Taskicon />
          <p className="text-[#6A6A6D] text-lg ml-2 font-semibold leading-6">
            Calls
          </p>
        </div>
        <div>
          <button
            onClick={openModalOfCall}
            className="bg-[#FFF7BE] h-12 flex items-center text-base font-medium text-[#FC9F00] py-[14px] px-4 rounded-[10px] w-[169px] justify-center m-auto"
          >
            <Plusicon className="ml-[10px]" />
            Add Call
          </button>
        </div>
      </div>

      <div>
        <div className="m-4">
          <table className="table table-dashboard mg-b-0 w-full border-[1.5px] border-[#E6E6EB] rounded-2xl overflow-hidden">
            <thead className="text-sm text-gray-900 font-medium bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 w-[30%]  text-left font-medium "
                ></th>
                <th scope="col" className="px-6 py-3  text-left font-medium">
                  Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {callData.map((calls, index) => (
                <tr
                  key={index}
                  className="bg-white border-b-[1.5px] border-[#E6E6EB]  cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-5 py-2  font-medium text-sm text-primary whitespace-nowrap text-left"
                  >
                    <div className="flex">
                      <span
                        className="p-2 rounded bg-[#DCFCE7]"
                        onClick={() => editHandler(calls, index)}
                      >
                        <EditIcon />
                      </span>{" "}
                      <span
                        className="p-2 ml-2 rounded bg-[#FFEAEF]"
                        onClick={() => callDeleteDataHandler(index)}
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-2 font-medium text-[#929296] text-sm whitespace-nowrap text-left"
                  >
                    {calls?.Subject || ""}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Transition appear show={openCallModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalOfCall}>
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
              <FormBuilderForMacro
                formType="Calls"
                dataHandler={callDataHandler}
                closeModal={closeModalOfCall}
              />
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={editModel} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalOfCall}>
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
                formType="Calls"
                data={editData}
                editDataIndex={editDataIndex}
                editDataHandler={callEditDataHandler}
                closeModal={closeModalOfCall}
              />
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CallMacro;
