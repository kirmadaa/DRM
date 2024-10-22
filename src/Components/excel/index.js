import React, { Fragment, useEffect } from "react";
import { FileIcon } from "../../assets/svgIcons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GET_ALL_DATA_FILTER,
  GET_FILTERS,
  GET_FORM,
  GET_TABLE_HEADER,
} from "../../Redux/actions/user";
//import { list } from "../Components/module";
import { list } from "../module";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as XLSX from "xlsx";
import { IMPORT_BULK_EXCEL } from "../../Redux/actions/impoprtBulk";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import ConfirmationExcelModal from "./ConfirmationModal";
import moment from "moment";
import 'moment-timezone';
import convertToSystemTimeZone from "../../excelDateFormatCorrections";
const ExcelComponent = () => {
  const [excelData, setExcelData] = useState([{ data: "" }]);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [errorArray, setErrorArray] = useState([]);
  const [valueChangeForDropdownLabel, setValueChangeForDropdownLabel] =
    useState({});

  const location = useLocation();
  const importPageIs = location?.search?.split("?module=");
  const api = list[importPageIs[1]] || {};
  //const apiheader = list[moduleName] || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.user.data);
  const filters = useSelector((state) => state.user.filters);
  const sections = useSelector((state) => state.user.form.sections);

  // // Function to check if the input is a valid Excel serial date
  // const isValidExcelSerial = (serial) => {
  //   // Check if the input is a number and within the range of valid Excel serial dates
  //   return typeof serial === 'number' && serial > 0 && serial < 2958465; // Valid range for Excel dates
  // };

  // // Function to convert Excel serial date to a readable date
  // const excelSerialToDate = (serial) => {
  //   // Excel serial date starts from 1899-12-30
  //   var excelStartDate = new Date(1899, 11, 30);
  //   var convertedDate = new Date(excelStartDate.getTime() + serial * 86400000);
  //   return moment(convertedDate).format("DD/MM/YYYY HH:mm");
  // };

  // const formatsToCheck = [
  //   // 24-hour time formats without seconds
  //   "DD/MM/YY HH:mm",
  //   "DD-MM-YYYY hh:mm:ss A",
  //   "MM-DD-YYYY hh:mm:ss A",
  //   "YYYY-MM-DD hh:mm:ss A",
  //   "YYYY-DD-MM hh:mm:ss A",
  //   "DD/MM/YYYY hh:mm:ss A",
  //   "MM/DD/YYYY hh:mm:ss A",
  //   "YYYY/MM/DD hh:mm:ss A",
  //   "YYYY/DD/MM hh:mm:ss A",
  //   "DD-MM-YY hh:mm:ss A",
  //   "MM-DD-YY hh:mm:ss A",
  //   "YY-MM-DD hh:mm:ss A",
  //   "YY-DD-MM hh:mm:ss A",
  //   "DD/MM/YY hh:mm:ss A",
  //   "MM/DD/YY hh:mm:ss A",
  //   "YY/MM/DD hh:mm:ss A",
  //   "YY/DD/MM hh:mm:ss A",

  //   // 12-hour time formats without seconds
  //   "DD-MM-YYYY hh:mm A",
  //   "MM-DD-YYYY hh:mm A",
  //   "YYYY-MM-DD hh:mm A",
  //   "YYYY-DD-MM hh:mm A",
  //   "DD/MM/YYYY hh:mm A",
  //   "MM/DD/YYYY hh:mm A",
  //   "YYYY/MM/DD hh:mm A",
  //   "YYYY/DD/MM hh:mm A",
  //   "DD-MM-YY hh:mm A",
  //   "MM-DD-YY hh:mm A",
  //   "YY-MM-DD hh:mm A",
  //   "YY-DD-MM hh:mm A",
  //   "DD/MM/YY hh:mm A",
  //   "MM/DD/YY hh:mm A",
  //   "YY/MM/DD hh:mm A",
  //   "YY/DD/MM hh:mm A",

  //   // 24-hour time formats with seconds
  //   "DD-MM-YYYY HH:mm:ss",
  //   "MM-DD-YYYY HH:mm:ss",
  //   "YYYY-MM-DD HH:mm:ss",
  //   "YYYY-DD-MM HH:mm:ss",
  //   "DD/MM/YYYY HH:mm:ss",
  //   "MM/DD/YYYY HH:mm:ss",
  //   "YYYY/MM/DD HH:mm:ss",
  //   "YYYY/DD/MM HH:mm:ss",
  //   "DD-MM-YY HH:mm:ss",
  //   "MM-DD-YY HH:mm:ss",
  //   "YY-MM-DD HH:mm:ss",
  //   "YY-DD-MM HH:mm:ss",
  //   "DD/MM/YY HH:mm:ss",
  //   "MM/DD/YY HH:mm:ss",
  //   "YY/MM/DD HH:mm:ss",
  //   "YY/DD/MM HH:mm:ss",

  //   // 24-hour time formats without seconds
  //   "DD-MM-YYYY HH:mm",
  //   "MM-DD-YYYY HH:mm",
  //   "YYYY-MM-DD HH:mm",
  //   "YYYY-DD-MM HH:mm",
  //   "DD/MM/YYYY HH:mm",
  //   "MM/DD/YYYY HH:mm",
  //   "YYYY/MM/DD HH:mm",
  //   "YYYY/DD/MM HH:mm",
  //   "DD-MM-YY HH:mm",
  //   "MM-DD-YY HH:mm",
  //   "YY-MM-DD HH:mm",
  //   "YY-DD-MM HH:mm",
  //   "DD/MM/YY HH:mm",
  //   "MM/DD/YY HH:mm",
  //   "YY/MM/DD HH:mm",
  //   "YY/DD/MM HH:mm",

  //   // Date formats without time
  //   "DD-MM-YYYY",
  //   "MM-DD-YYYY",
  //   "YYYY-MM-DD",
  //   "YYYY-DD-MM",
  //   "DD/MM/YYYY",
  //   "MM/DD/YYYY",
  //   "YYYY/MM/DD",
  //   "YYYY/DD/MM",
  //   "DD-MM-YY",
  //   "MM-DD-YY",
  //   "YY-MM-DD",
  //   "YY-DD-MM",
  //   "DD/MM/YY",
  //   "MM/DD/YY",
  //   "YY/MM/DD",
  //   "YY/DD/MM"
  // ];

  // const convertToSystemTimeZone = (dateStr, isTime) => {
  //   let detectedFormat = null;

  //   // Check each format
  //   for (const format of formatsToCheck) {
  //     if (moment(dateStr, format, true).isValid()) {
  //       detectedFormat = format;
  //       break;
  //     }
  //   }
  //   const systemTimeZone = moment.tz.guess();
  //   const utcTimeZone = 'UTC';
  //   // If format is detected, convert and return; otherwise, return original date string
  //   if (detectedFormat) {
  //     // Get the current system or server timezone

  //     console.log("Detected format:", detectedFormat, systemTimeZone, utcTimeZone);
  //     // Convert to system timezone and format to "YYYY-MM-DD HH:mm:ss.SSSZ"
  //     if (isTime)
  //       return moment.tz(dateStr, detectedFormat, utcTimeZone).format("YYYY-MM-DDTHH:mm:ss");
  //     else
  //       return moment.tz(dateStr, detectedFormat, utcTimeZone).format("YYYY-MM-DD");
  //   } else {
  //     if (dateStr > 0) {
  //       let d = excelSerialToDate(dateStr);
  //       console.log("Invalid date:", d);
  //       let updateDate = "";
  //       if (isTime) {
  //         updateDate = moment.tz(d, 'DD/MM/YYYY HH:mm:ss', utcTimeZone).format("YYYY-MM-DDTHH:mm:ss");
  //       } else {
  //         updateDate = moment.tz(d, 'DD/MM/YYYY HH:mm:ss', utcTimeZone).format("YYYY-MM-DD");
  //       }

  //       if (updateDate !== "Invalid date") {
  //         return updateDate;
  //       } else {
  //         return dateStr;
  //       }
  //     } else {
  //       return dateStr; // Return original date string if format not detected
  //     }
  //   }
  // };


  const handleStatus = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const arrayOfObjects = XLSX.utils.sheet_to_json(sheet);

        // const excelData = arrayOfObjects.map(obj => {
        //   const newObj = {};
        //   for (const key in obj) {
        //     newObj[key] = (obj[key]).toString();
        //   }
        //   return newObj;
        // });

        // console.log("arrayOfObjects==11==>", excelData);

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
        console.log("arrayOfObjects==11==>new", excelData);

        if (excelData?.length > 3000) {
          return toast.error("Please enter data less than 3000");
        }
        const res = await dispatch(IMPORT_BULK_EXCEL(api.excelUrl, excelData));

        let array = res?.filter((item) => item?.error);
        if (array?.length > 0) {
          setErrorArray([...array]);
          setShow(true);
          return toast.error("unable to load data");
        } else {
          // handleFileUpload()
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

  const hideFilterList = [
    "ContactName",
    "AccountName",
    "ModuleTitle",
    "createdTime",
    "updatedTime",
    "tuch",
    "deletedAt",
    "0",
    "_id",
    "LeadOwnerId",
    "tuch",
    "Owner",
    "LeadsOwnerId",
    "organizationId",
    "DealOwnerId",
    "DealsOwnerId",
    "ContactOwnerId",
    "ContactsOwnerId",
    "AccountOwnerId",
    "AccountsOwnerId",
    "TaskOwnerId",
    "TasksOwnerId",
    "MeetingOwnerId",
    "MeetingsOwnerId",
    "callOwnerId",
    "CallsOwnerId",
    "OpportunitiesOwnerId",
    "Id",
    "id",
    "connectionId",
    "taskOwnerId",
    "connectionId",
    "ModifiedBy",
    "id",
    "SmsOwnerId",
    "WhatsappOwnerId",
    "templateOwner",
    "siteVisitOwnerId",
    "meetingHostId",
    "_id",
    "ContactOwnerId",
    "organizationId",
    "EmailOwnerId",
    "noteOwnerId",
    "VendorOwnerId",
    "InventoryOwnerId",
    "CreatedBy",
    "read",
    "Pipeline",
    "Stage",
    "Lookup",
    "SalesOrderOwnerId",
    "NoteOwnerId",
  ];

  const handleFileUpload = async (e) => {
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
    // toast.success("Uploaded successfully !");
    setFile(file);
    setModal(true);
  };

  const handleClose = () => {
    setShow(false);
    setErrorArray([]);
  };

  useEffect(() => {
    dispatch(GET_FILTERS(api.filterApi));
    //GET_TABLE_HEADER(api.tableHeaderApi
    console.log("api.filterApi", api.formApi);
    // dispatch(
    //   GET_TABLE_HEADER(api.formApi, {
    //     offset: 1,
    //     limit: 10,
    //     buttonType: "All",
    //   })
    // );

    dispatch(
      GET_ALL_DATA_FILTER(api.getApi, {
        offset: 1,
        limit: 10,
        buttonType: "All",
      })
    );
    dispatch(GET_FORM(api.formApi));
  }, []);

  useEffect(() => {
    if (data?.length > 0 && filters) {
      console.log("filters>>>>>>", filters);
      console.log("sections===>", sections);
      var headercollect = [];
      sections?.forEach((element) => {
        var resultinput = Object.keys(element.inputs).map((key) => [
          key,
          element.inputs[key],
        ]);
        console.log("element.inputs length ===>", resultinput.length);
        for (var i = 0; i < resultinput.length; i++) {
          //console.log(resultinput[i][1]);
          headercollect.push(resultinput[i][1].value);
        }
      });

      // const filteredArray = filters
      //   ?.filter((filter) => !hideFilterList.includes(filter))
      //   ?.reduce(
      //     (obj, item) => Object.assign(obj, { [item]: data?.[0][item] }),
      //     {}
      //   );
      // filteredArray[`${importPageIs[1]}OwnerId`] = "";
      const newhideFilterList = [
        "ModuleTitle",
        "createdTime",
        "CreatedBy",
        "InvoiceDate",
      ];
      delete filters[0];
      const filteredArray = headercollect
        ?.filter((filter) => !newhideFilterList.includes(filter))
        ?.reduce((obj, item) => Object.assign(obj, { [item]: "" }), {});
      filteredArray[`${importPageIs[1]}OwnerId`] = "";

      // const header = ["a", "b", "c"];
      //const valuesheader = filters.map((value, key) => header.push(value));

      // const header = filters.filter(function (value, arrIndex) {
      //   return value;
      // });

      // const header = function (filters, index) {
      //   return filters.filter(function (value, arrIndex) {
      //     return index !== arrIndex;
      //   });
      // };

      console.log("filteredArray", filteredArray);

      setExcelData([filteredArray]);
    } else {
      let array = [];

      sections?.length &&
        Object.entries(sections)?.map(([sectionTitle, section]) => {
          Object.entries(section.inputs).map(([fieldName, input]) => {
            array.push(input?.value);
          });
        });
      const newhideFilterList = [];
      delete array[0];
      const filteredArray = array
        ?.filter((filter) => !newhideFilterList.includes(filter))
        ?.reduce((obj, item) => Object.assign(obj, { [item]: "" }), {});
      filteredArray[`${importPageIs[1]}OwnerId`] = "";

      setExcelData([filteredArray]);
    }

    if (sections) {
      const obj = {};
      sections?.length &&
        Object.entries(sections)?.map(([sectionTitle, section]) => {
          Object.entries(section?.inputs).map(([fieldName, input]) => {
            if (["Select", "Multiselect"].includes(input?.type)) {
              obj[input.value] = { options: input?.options };
            }
          });
        });
      setValueChangeForDropdownLabel(obj);
    }
  }, [data, filters, sections]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "samplefile" + ".xlsx");
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
                  onChange={(e) => handleFileUpload(e)}
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

export default ExcelComponent;
