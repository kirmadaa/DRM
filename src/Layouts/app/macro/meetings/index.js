import { Dialog, Transition } from "@headlessui/react";
import {
  DeleteIcon,
  EditIcon,
  Plusicon,
  Taskicon,
} from "../../../../assets/svgIcons";
import { Fragment, useState } from "react";
import FormBuilderForMacro from "../form/Formbuiilder";
import FormEditorForMacro from "../form/FormEditor";

const MeetingMacro = ({
  meetingDataHandler,
  meetingData,
  meetingEditDataHandler,
  meetingDeleteDataHandler,
}) => {
  let [openmeetingModal, setOpenmeetingModal] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editData, setEditData] = useState({});
  const [editDataIndex, setEditDataIndex] = useState(0);

  function closeModalOfmeeting() {
    setOpenmeetingModal(false);
    setEditModel(false);
  }

  function openModalOfmeeting() {
    setEditModel(false);
    setOpenmeetingModal(true);
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
            Meetings
          </p>
        </div>
        <div>
          <button
            onClick={openModalOfmeeting}
            className="bg-[#FFF7BE] h-12 flex items-center text-base font-medium text-[#FC9F00] py-[14px] px-4 rounded-[10px] w-[169px] justify-center m-auto"
          >
            <Plusicon className="ml-[10px]" />
            Add Meeting
          </button>
        </div>
      </div>

      <div className="">
        <div className="m-4">
          <table className="table table-dashboard mg-b-0 w-full border-[1.5px] border-[#E6E6EB] rounded-2xl overflow-hidden">
            <thead className="text-sm text-gray-900 font-medium bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 w-[30%]  text-left font-medium "
                ></th>
                <th scope="col" className="px-6 py-3  text-left font-medium">
                  Title
                </th>
              </tr>
            </thead>
            <tbody>
              {meetingData.map((meetings, index) => (
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
                        onClick={() => editHandler(meetings, index)}
                      >
                        <EditIcon />
                      </span>{" "}
                      <span
                        className="p-2 ml-2 rounded bg-[#FFEAEF]"
                        onClick={() => meetingDeleteDataHandler(index)}
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-2 font-medium text-[#929296] text-sm whitespace-nowrap text-left"
                  >
                    {meetings?.Title || ""}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Transition appear show={openmeetingModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModalOfmeeting}
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
              <FormBuilderForMacro
                formType="Meeting"
                dataHandler={meetingDataHandler}
                closeModal={closeModalOfmeeting}
              />
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={editModel} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModalOfmeeting}
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
              <FormEditorForMacro
                formType="Meeting"
                data={editData}
                editDataIndex={editDataIndex}
                editDataHandler={meetingEditDataHandler}
                closeModal={closeModalOfmeeting}
              />
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MeetingMacro;
