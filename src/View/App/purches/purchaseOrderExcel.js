import React, { Fragment, useEffect } from "react";
import { FileIcon } from "../../../assets/svgIcons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as XLSX from "xlsx";
import { IMPORT_BULK_EXCEL } from "../../../Redux/actions/impoprtBulk";
import { Dialog, Transition } from "@headlessui/react";
import {
  GET_ALL_DATA_FILTER_PURCHASE,
  GET_FILTERS_SaleOrder,
} from "../../../Redux/actions/purchaseOrder";
import { toast } from "react-toastify";
import ConfirmationExcelModal from "../../../Components/excel/ConfirmationModal";
import convertToSystemTimeZone from "../../../excelDateFormatCorrections";

const PurchaseOrderExcel = () => {
  const [excelData, setExcelData] = useState([{ data: "" }]);
  const [show, setShow] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.Saleorder.List);
  const filters = useSelector((state) => state.Saleorder.Filters);
  const [valueChangeForDropdownLabel, setValueChangeForDropdownLabel] = useState({});
  const hideFilterList = [
    "_id",
    "organizationId",
    "salesOrderOwnerId",
    "organizationId",
    "connectionId",
    "ModifiedBy",
    "id",
  ];
  const handleCSV = async (e) => {
    const file = e.target.files[0];

    if (
      ![
        ".csv",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.ms-office",
        "application/x-excel",
        "application/x-msexcel",
        "application/x-ms-excel",
        "application/x-dos_ms_excel",
        "application/xls",
        "application/xlt",
        "application/x-xls",
        "application/x-xlt",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        "application/vnd.ms-excel.sheet.macroEnabled.12",
        "application/vnd.ms-excel.template.macroEnabled.12",
        "application/vnd.ms-excel.addin.macroEnabled.12",
        "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
      ]?.includes(file?.type)
    ) {
      return toast.error("Please only upload file of excel and csv");
    }

    setFile(file);
    setModal(true);
  };

  const handleStatus = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const arrayOfObjects = XLSX.utils.sheet_to_json(sheet);

        const excelData = arrayOfObjects.map((obj) => {
          const newObj = {};
          for (const key in obj) {
            console.log("key==>", key, obj[key]);
            switch (key) {
              case "From":
              case "createdTime":
              case "updatedTime":
              case "start_date":
              case "end_date":
              case "CallStartTime":
              case "CallEndTime":
              case "To":
              case "ClosedTime":
              case "ClosingDate":
              case "SiteVisitEndTime":
              case "SiteVisitStartTime":
              case "MeetingEndTime":
              case "MeetingStartTime":
                obj[key] = convertToSystemTimeZone(obj[key].toString(), true);
                break;
              case "DueDate":
              case "QuoteDate":
              case "InvoiceDate":
              case "SalesOrderDate":
              case "ValidUntil":
              case "AgrrementDate":
              case "FacilityHandoverDate":
              case "Golive":
              case "LOIDate":
              case "ExpectedGo-LiveDate":
              case "ActualClosureDate":
              case "ExpectedClosingDate":
              case "CentreGoliveDate":
              case "CentreLockinExpiryDate":
              case "CentreFitoutStartDate":
              case "ExpectedPayment":
              case "ProposedAvailability":
              case "NextPaymentDate":
              case "PaymentRealisation":
              case "CentreLeaseAgreementDate":
              case "ExpectedGoLiveDate":
                // default:
                obj[key] = convertToSystemTimeZone(obj[key].toString(), false);
                break;
            }

            console.log("key==>Modified", key, obj[key]);
            if (valueChangeForDropdownLabel[key]) {
              valueChangeForDropdownLabel[key].options.map((option) => {
                if (option.label === obj[key].toString()) {
                  newObj[key] = option.value;
                  return;
                }
              });
            } else {
              newObj[key] = obj[key].toString();
            }
          }
          return newObj;
        });

        if (excelData?.length > 3000) {
          return toast.error("Please enter data less than 3000");
        }
        const res = await dispatch(
          IMPORT_BULK_EXCEL("add-purchaseOrder-excel", excelData)
        );

        let array = res?.filter((item) => item?.error);
        if (array?.length > 0) {
          setErrorArray([...array]);
          setShow(true);
        } else {
          navigate(-1);
        }
      };
      reader.readAsArrayBuffer(file);
    }
    setModal(false);
    setFile();
  };

  const handleCloseModal = () => {
    setFile();
    setModal(false);
  };

  const handleClose = () => {
    setShow(false);
    setErrorArray([]);
  };

  useEffect(() => {
    dispatch(GET_FILTERS_SaleOrder());

    dispatch(
      GET_ALL_DATA_FILTER_PURCHASE({
        offset: 1,
        limit: 10,
      })
    );
  }, []);

  useEffect(() => {
    if (data?.length > 0 && filters) {
      const filteredArray = filters
        ?.filter((filter) => !hideFilterList.includes(filter))
        ?.reduce(
          (obj, item) => Object.assign(obj, { [item]: data?.[0][item] }),
          {}
        );
      setExcelData([filteredArray]);
    }
  }, [data, filters]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, 'samplefile' + ".xlsx");
  };

  return (
    <>
      <div
        className="flex items-center justify-center "
        style={{ height: "calc(100vh - 170px)" }}
      >
        <div className="w-full md:w-5/12 md:mx-auto">
          <div className="border border-[#191242] rounded p-10">
            <div className="flex items-center gap-5">
              <div className="p-3 border-2 border-[#191242] rounded-full">
                <FileIcon />
              </div>
              <p className="text-xl lg:text-2xl font-semibold">From File</p>
            </div>
            <div className="mt-5">
              <p className="text-lg text-[#808080] text-center">
                Drag and drop your file here.
              </p>
              <p className="text-lg text-[#808080] text-center mt-2">- or -</p>
              <div className="flex justify-center mt-5">
                <button
                  className="bg-[#191242] rounded-2xl p-3 text-[#fff] w-full md:w-1/2 lg:w-3/12 border-none "
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  Browse
                </button>
                <input
                  type="file"
                  id="file-input"
                  onChange={(e) => handleCSV(e)}
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                  className="hidden"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </div>
              <div className="my-10 flex justify-center items-center">
                <button className="text-primary" onClick={exportToExcel}>
                  Download .XLSX
                </button>
              </div>

              <p className="text-base text-[#808080] text-center">
                You can import up to 5000 record through an .xls .xlsx .vcf or
                .csv file. To import more than 5000 record at a time, use a .csv
                file.
              </p>
            </div>
          </div>
        </div>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => handleClose()}
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
                  <Dialog.Panel className="w-full max-w-md h-full rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-[#18181B] pb-3 border-b-[1.5px] border-[#E6E6EB] mb-6"
                    >
                      Following data will not be entered for some issues
                    </Dialog.Title>
                    {errorArray?.map((item, index) => (
                      <div
                        key={index}
                        className="custom-control mb-1 flex items-center gap-2"
                      >
                        <p key={index}>{item?.Message}</p> On{" "}
                        <p>Row {item?.raw}</p>
                      </div>
                    ))}
                    <div className="text-center mt-3">
                      <button
                        className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                        onClick={() => handleClose()}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <ConfirmationExcelModal
        modal={modal}
        handleClose={handleCloseModal}
        handleStatus={handleStatus}
      />
    </>
  );
};

export default PurchaseOrderExcel;
