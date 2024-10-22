import { Dialog, Transition } from "@headlessui/react";
import { Fragment, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  ADD_NEW_REPORT,
  CREATE_NEW_FOLDER,
  GET_LIST_OF_FOLDERS,
} from "../../../../Redux/actions/reports";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateReportButton = ({
  parentModuleItem,
  valueByIndex,
  isMultiSelect,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportState = useSelector((state) => state?.reports);
  const { listOfFolders } = reportState;
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenFolder, setIsOpenFolder] = useState(false);
  let [loading, setLoading] = useState(false);
  const [payloadFolder, setPayloadFolder] = useState({});

  const [payload, setPayload] = useState({
    name: "",
    description: "",
    folderId: "",
  });

  useEffect(() => {
    dispatch(GET_LIST_OF_FOLDERS());
    // eslint-disable-next-line
  }, []);

  function closeModalFolder() {
    setIsOpenFolder(false);
  }

  function openModalFolder() {
    setIsOpenFolder(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleInputChange = (e) => {
    let { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payload?.name?.trim() === "") {
      toast.error("Name is required !");
      return;
    } else if (payload?.description?.trim() === "") {
      toast.error("Description is required !");
      return;
    } else if (payload?.folderId?.trim() === "") {
      toast.error("Select Folder !");
      return;
    }

    setLoading(true);
    let reportModules = [parentModuleItem, ...valueByIndex];
    let res = await dispatch(
      ADD_NEW_REPORT({ ...payload, reportModules, isMultiSelect })
    );
    console.log("eeeee", res)
    if (res.res === "true") {
      setLoading(false);
      setIsOpen(false);
      console.log(">>>>>>>", res.data._id);
      navigate(`/crm/genrate/report/${res.data._id}`)
    } else {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setPayloadFolder({ ...payloadFolder, [name]: value });
  };

  const addNewFolder = async () => {
    let res = await dispatch(CREATE_NEW_FOLDER(payloadFolder));
    if (res?.status === 200) {
      closeModalFolder(false);
      openModal();
      dispatch(GET_LIST_OF_FOLDERS());
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={openModalFolder}
        className="ml-[4px] rounded-md bg-primary  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Create Folder
      </button>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-primary  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Save Report
      </button>

      <Transition appear show={isOpenFolder} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalFolder}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create New Folder
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>Name</p>
                    <input
                      onChange={handleChange}
                      name="name"
                      className="border p-1 w-full rounded-md px-1 focus:outline-none"
                      placeholder="Folder name "
                    />

                    <p className="mt-3">Description</p>
                    <textarea
                      rows={2}
                      onChange={handleChange}
                      name="description"
                      className="border p-1 w-full rounded-md px-1 focus:outline-none"
                      placeholder="Description ...."
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={addNewFolder}
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new Report
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="mt-2">
                      <p>Report Name</p>
                      <input
                        required
                        name="name"
                        onChange={handleInputChange}
                        className="border rounded-md px-2 py-1 w-full mb-2 mt-1"
                        placeholder="Name"
                      />
                      <p>Description</p>
                      <textarea
                        required
                        name="description"
                        onChange={handleInputChange}
                        rows={2}
                        className="border rounded-md px-2 py-1 w-full mb-2 mt-1"
                        placeholder="Name"
                      />
                      <div className="flex items-center">
                        <select
                          name="folderId"
                          required
                          onChange={handleInputChange}
                          className="border rounded-md px-2 py-2 w-64"
                        >
                          <option>Select Folder</option>
                          {listOfFolders?.map((folder) => (
                            <option key={folder?._id} value={folder?._id}>
                              {folder?.folderName}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={openModalFolder}
                          className="ml-[8px] rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          Create Folder
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        disabled={loading}
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      >
                        {loading ? "Processing..." : "Create Report "}
                      </button>

                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default memo(CreateReportButton);
