import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ExcelDownloadButton from "./sampleDownloadFile";
import * as XLSX from "xlsx";
import { Plus } from "react-feather";
import { errorSuccess } from "../../../utility/api";

export default function AddHolidayExcelFile({ editable, setHoliday }) {
  let [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const fileUploadChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileData = e.target.result;
      const workbook = XLSX.read(fileData, { type: "binary", cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Skip the first row and convert the remaining rows to key-value pairs
      let keyValueData = [];
      for (let row of jsonData.slice(1)) {
        if (row?.length > 1) {
          const nextDay = new Date(row[1]);
          console.log(nextDay,'next day --->>');
          nextDay.setDate(nextDay.getDate() + 1);
          nextDay.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC
          const formattedDate = nextDay.toISOString().split("T")[0];
          keyValueData.push({
            name: row[0], // Assuming the key is in the first column
            date: formattedDate, // Assuming the value is in the second column
          });
        }
      }

      errorSuccess("Uploaded successfully!");
      setHoliday(keyValueData);
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <>
      <button
        type="button"
        disabled={editable}
        onClick={openModal}
        className="rounded-md disabled:bg-gray-200 inline-flex items-center space-x-1 disabled:text-primary/40 bg-primary px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <Plus size={15} /> <span>Holiday Excel File</span>
      </button>

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
                    Upload Holiday xlsx file
                  </Dialog.Title>
                  <div className="mt-2">
                    <ExcelDownloadButton />
                  </div>
                  {file?.name && (
                    <p className="text-md my-4">
                      {" "}
                      <span className="text-green-500 font-[500] ">
                        {file?.name}{" "}
                      </span>{" "}
                      Uploaded
                    </p>
                  )}
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 "
                          aria-hidden={true}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 ">.xlsx</p>
                      </div>
                      <input
                        onChange={fileUploadChange}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Next
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
