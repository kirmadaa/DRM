import { Dialog, Tab, Transition } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect, Fragment } from "react";
import {
  GET_COMPANY_DATA_BY_ID,
  UPDATE_COMPANY_DETAILS,
} from "../../../Redux/actions/company";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ChevronLeft, Delete, Edit, Plus } from "react-feather";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TabComponent from "../../../Components/tabsName";
import Edits from "../../../assets/images/user/Edits.svg";
import { InfoIcon, TableDelete } from "../../../assets/svgIcons";
import AddHolidayExcelFile from './addHolidayFile'
import noHolidayimg from '../../../assets/noHoliday.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CompanyLayout = () => {
  const company = useSelector((state) => state?.companyReducer?.Company?.data);

  const [editable, setEditable] = useState(true);
  const [selected, setSelected] = useState(company?.fiscalYear?.beginsIn);

  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [holidayModalShow, setHolidayModalShow] = useState(false);
  const [index, setEditIndex] = useState(null);

  const [deleteIndex, setDeleteIndex] = useState(null);

  const [deleteModalHandler, setDeleteModalHandler] = useState(false);
  const [deleteShiftModalHandler, setShiftDeleteModalHandler] = useState(false);

  const handleShow = () => {
    setEditMode(false);
    setShow(true);
  };

  const handleHolidayModalShow = () => {
    setEditMode(false);
    setHolidayModalShow(true);
  };

  const handleClose = () => {
    setSelectShift(initialShift);
    setCheckboxValues([]);
    setShow(false);
  };
  const handleHolidayModalClose = () => {
    setHolidayDate(null);
    setHolidayName("");
    setHolidayModalShow(false);
  };

  const shift = [];
  const [checkboxValues, setCheckboxValues] = useState(shift);

  // checkbox handler for bussiness hours
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckboxValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckboxValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };

  const selectAllDaysForShift = (event) => {
    const { checked } = event.target;
    if (checked) {
      setCheckboxValues(listOfDays);
      let updateShiftTime = {}
      for (let day of listOfDays) {
        updateShiftTime[`${day.toLowerCase()}.from`] = selectShift['monday.from']
        updateShiftTime[`${day.toLowerCase()}.to`] = selectShift['monday.to']

      }
      setSelectShift(updateShiftTime)
    } else {
      setCheckboxValues([]);
    }

  }

  const initialShift = {
    shiftName: "",
    timeZone: "",
    breakHours: "",
    shiftDays: [],
    "monday.from": "00:00",
    "monday.to": "00:00",
    "tuesday.from": "00:00",
    "tuesday.to": "00:00",
    "wednesday.from": "00:00",
    "wednesday.to": "00:00",
    "thursday.from": "00:00",
    "thursday.to": "00:00",
    "friday.from": "00:00",
    "friday.to": "00:00",
    "saturday.from": "00:00",
    "saturday.to": "00:00",
    "sunday.from": "00:00",
    "sunday.to": "00:00",
  };

  // bussiness hour in add shift
  const [selectShift, setSelectShift] = useState(initialShift);
  const tab = ["Basic information", "Fiscal year", "Business Hours", "Holiday"];
  const shifts = company?.shift || [];
  const [data, setData] = useState(shifts);

  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState();

  const dispatch = useDispatch();

  const Schema = Yup.object().shape({
    // organizationName: Yup.string().required("Name is required"),
    // mobile: Yup.string().required("Mobile is Required"),
    website: Yup.string().url("Please enter valid url"),
  });

  // fiscalYear for dropdown selection handler
  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const [holiday, setHoliday] = useState(company?.holiday);

  // VIEW: Shift Edit handler in bussiness hour
  const handleEdit = (index) => {
    const showData = data[index];
    setSelectShift({
      shiftName: showData.shiftName,
      timeZone: showData.timeZone,
      breakHours: showData.breakHours,
      shiftDays: showData.shiftDays,
      "monday.from": showData.shiftTimings?.monday?.from,
      "monday.to": showData.shiftTimings?.monday?.to,
      "tuesday.from": showData.shiftTimings?.tuesday?.from,
      "tuesday.to": showData.shiftTimings?.tuesday?.to,
      "wednesday.from": showData.shiftTimings?.wednesday?.from,
      "wednesday.to": showData.shiftTimings?.wednesday?.to,
      "thursday.from": showData.shiftTimings?.thursday?.from,
      "thursday.to": showData.shiftTimings?.thursday?.to,
      "friday.from": showData.shiftTimings?.friday?.from,
      "friday.to": showData.shiftTimings?.friday?.to,
      "saturday.from": showData.shiftTimings?.saturday?.from,
      "saturday.to": showData.shiftTimings?.saturday?.to,
      "sunday.from": showData.shiftTimings?.sunday?.from,
      "sunday.to": showData.shiftTimings?.sunday?.to,
    });
    setCheckboxValues(showData.shiftDays);
    setShow(true);
    setEditMode(true);
    setEditIndex(index);
  };

  // VIEW: Holiday Edit handler
  const handleEditHoliday = (index) => {
    const showData = holiday[index];
    setHolidayName(showData.name);
    setHolidayDate(showData.date);
    setHolidayModalShow(true);
    setEditMode(true);
    setEditIndex(index);
  };

  // Shift Select handler in bussiness hour
  const shiftSelectHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const obj = { ...selectShift };
    obj[name] = value;
    setSelectShift(obj);
  };

  // ACTION: Shift Add And Edit handler in bussiness hour
  const AddShiftHandler = () => {
    const currentshift = {
      shiftName: selectShift["shiftName"],
      timeZone: selectShift["timeZone"],
      shiftDays: checkboxValues,
      shiftTimings: {
        monday: {
          from: selectShift["monday.from"],
          to: selectShift["monday.to"],
        },
        tuesday: {
          from: selectShift["tuesday.from"],
          to: selectShift["tuesday.to"],
        },
        wednesday: {
          from: selectShift["wednesday.from"],
          to: selectShift["wednesday.to"],
        },
        thursday: {
          from: selectShift["thursday.from"],
          to: selectShift["thursday.to"],
        },
        friday: {
          from: selectShift["friday.from"],
          to: selectShift["friday.to"],
        },
        saturday: {
          from: selectShift["saturday.from"],
          to: selectShift["saturday.to"],
        },
        sunday: {
          from: selectShift["sunday.from"],
          to: selectShift["sunday.to"],
        },
      },
      breakHours: selectShift["breakHours"],
    };

    if (editMode) {
      const currentData = data?.length ? [...data] : [];
      currentData[index] = currentshift;
      setData([...currentData]);
      handleClose();
      setEditMode(false);
    } else {
      const currentData = data?.length ? [...data] : [];
      currentData.push(currentshift);
      setData([...currentData]);
      handleClose();
    }
  };

  // ACTION: Holiday Add And Edit handler in bussiness hour
  const AddHoliday = () => {
    const currentHoliday = {
      name: holidayName,
      date: holidayDate,
    };

    if (editMode) {
      const currentData = holiday?.length ? [...holiday] : [];
      currentData[index] = currentHoliday;
      setHoliday([...currentData]);
      handleHolidayModalClose();
      setEditMode(false);
    } else {
      const currentData = holiday?.length ? [...holiday] : [];
      currentData.push(currentHoliday);
      setHoliday([...currentData]);
      handleHolidayModalClose();
    }
    setHolidayDate(null);
    setHolidayName("");
  };

  // ACTION: Shift Delete handler in bussiness hour
  const deleteHandler = () => {
    const currentData = data?.length ? [...data] : [];
    currentData.splice(deleteIndex, 1);
    setData([...currentData]);
    setShiftDeleteModalHandler(false);
  };

  // ACTION: Shift Delete handler in bussiness hour
  const deleteHandlerHoliday = () => {
    const currentData = holiday?.length ? [...holiday] : [];
    currentData.splice(deleteIndex, 1);
    setHoliday([...currentData]);
    setDeleteModalHandler(false);
  };

  function dateFormat(addDate) {
    const date = new Date(addDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function tConvert(time) {
    // Check correct time format and split into components
    time = String(time)?.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
      time,
    ];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  //dispatch
  useEffect(() => {
    dispatch(GET_COMPANY_DATA_BY_ID());
  }, [dispatch]);

  useEffect(() => {
    setHoliday(company?.holiday);
    setData(company?.shift);
    setSelected(company?.fiscalYear?.beginsIn);
  }, [company]);


  const handleDeleteHolidays = (selected) => {
    let newItems = holiday?.filter((item => `${item?.name}${item?.date}` !== selected))
    setHoliday(newItems)
    setEditable(false);
  }

  return (
    <>
      <div className="w-[calc(100%-270px)]">
        <div className="bg-white  rounded-2xl p-5 pt-5 2xl:col-span-5 relative">
          <Formik
            initialValues={{
              _id: company?._id || "",
              organizationName: company?.organizationName || "",
              alias: company?.alias || "",
              employeeCount: company?.employeeCount || "",
              phone: company?.phone || "",
              mobile: company?.mobile || "",
              fax: company?.fax || "",
              website: company?.website || "",
              description: company?.description || "",
              street: company?.street || "",
              city: company?.city || "",
              state: company?.state || "",
              zip: company?.zip || "",
              country: company?.country || "",
              fiscalYear: {
                beginsIn: company?.fiscalYear?.beginsIn || "",
                basedOn: company?.fiscalYear?.basedOn || "",
              },
              businessHours: {
                hours: {
                  from: company?.businessHours?.hours?.from || "",
                  to: company?.businessHours?.hours?.to || "",
                },
                weekStart: company?.businessHours?.weekStart || "",
                businessTiming: {
                  from: company?.businessHours?.businessTiming?.from || "",
                  to: company?.businessHours?.businessTiming?.to || "",
                },
              },

              businessDays: {
                from: company?.businessDays?.from || "",
                to: company?.businessDays?.to || "",
              },
              shift: {
                shiftName: company?.shift?.shiftName || "",
                timeZone: company?.shift?.timeZone || "",
                shiftHours: {
                  from: company?.shift?.shiftHours?.from || "",
                  to: company?.shift?.shiftHours?.to || "",
                },
                shiftDays: {
                  from: company?.shift?.shiftDays?.from || "",
                  to: company?.shift?.shiftDays?.to || "",
                },
                breakHours: company?.shift?.breakHours || "",
                assignUsers: company?.shift?.assignUsers || "",
              },

              holiday: {
                year: company?.holiday?.year || "",
                applyTo: company?.holiday?.applyTo || "",
              },
              currencies: {
                homeCurrencies: company?.currencies?.homeCurrencies || "",
                formate: company?.currencies?.formate || "",
              },
            }}
            enableReinitialize
            validationSchema={Schema}
            onSubmit={(values, { setSubmitting }) => {
              values.fiscalYear.beginsIn = selected;
              values.shift = data;
              values.holiday = holiday;
              setSubmitting(false);
              dispatch(UPDATE_COMPANY_DETAILS({ ...values })).then((res) => {
                dispatch(GET_COMPANY_DATA_BY_ID());
                setEditable(false);
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="content  bd-b homembl absolute right-[10px] top-[57px]">
                  <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 mx-auto">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <div className="flex justify-end">
                        {!editable ? (
                          <>
                            <button
                              className="flex items-center h-[36px] gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer mr-2"
                              type="button"
                              onClick={() => {
                                setEditable(!editable);
                              }}
                            >
                              <ChevronLeft /> Back
                            </button>
                            <button
                              className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                              type="button"
                              onClick={() => {
                                setEditable(!editable);
                              }}
                            >
                              <img alt="edit icon" src={Edits} /> Edit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Tab.Group>
                  <div>
                    <TabComponent tabs={tab} />
                  </div>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel className={classNames("bg-white py-5 px-6")}>
                      <div className="container mx-auto">
                        <fieldset className="form-fieldset">
                          <legend className="mb-3 font-medium">
                            Basic Information
                          </legend>
                          <div className="w-full">
                            <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50">
                              <div className="pd-t-20 wd-100p">
                                <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                                  <div className="form-group row">
                                    <label
                                      htmlFor="organizationName"
                                      className="font-medium"
                                    >
                                      Organization
                                    </label>
                                    <div className="mt-2">
                                      <Field
                                        name="organizationName"
                                        type="text"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter Organization Name"
                                        disabled={editable}
                                      />
                                      <ErrorMessage name="organizationName">
                                        {(msg) => (
                                          <div className="errordisplay">
                                            {msg}
                                          </div>
                                        )}
                                      </ErrorMessage>
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label
                                      htmlFor="employeeCount"
                                      className="font-medium"
                                    >
                                      Total Employee
                                    </label>
                                    <div className="mt-2">
                                      <Field
                                        as="select"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        name="employeeCount"
                                        disabled={editable}
                                      >
                                        <option value="10"> 1 to 10</option>
                                        <option value="50">10 to 50</option>
                                        <option value="100">50 to 100</option>
                                        <option value="500">100 to 500</option>
                                        <option value="500+">500+</option>
                                      </Field>
                                    </div>
                                  </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                                  <div className="form-group row">
                                    <label
                                      htmlFor="phone"
                                    >
                                      Enter Phone
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        type="number"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter Phone"
                                        name="phone"
                                        disabled={editable}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label
                                      htmlFor="mobile"
                                    >
                                      Mobile
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name="mobile"
                                        type="number"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter Mobile Number"
                                        disabled={editable}
                                      />
                                      <ErrorMessage name="mobile">
                                        {(msg) => (
                                          <div className="errordisplay">
                                            {msg}
                                          </div>
                                        )}
                                      </ErrorMessage>
                                    </div>
                                  </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                                  <div className="form-group row">
                                    <label
                                      htmlFor="website"
                                    >
                                      Website
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        type="text"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter Website"
                                        name="website"
                                        disabled={editable}
                                      />
                                      <ErrorMessage name="website">
                                        {(msg) => (
                                          <div className="errordisplay">
                                            {msg}
                                          </div>
                                        )}
                                      </ErrorMessage>
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label
                                      htmlFor="description"
                                    >
                                      Description
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        type="text"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter Description"
                                        name="description"
                                        disabled={editable}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                                  <div className="form-group row">
                                    <label
                                      htmlFor="street"
                                    >
                                      Street
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        type="text"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter Street"
                                        name="street"
                                        disabled={editable}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label
                                      htmlFor="city"
                                    >
                                      City
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        type="text"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter City"
                                        name="city"
                                        disabled={editable}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                                  <div className="form-group row">
                                    <label
                                      htmlFor="state"
                                    >
                                      State
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        type="text"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter State"
                                        name="state"
                                        disabled={editable}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label
                                      htmlFor="zip"
                                    >
                                      Enter PIN Code
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        type="text"
                                        className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                        placeholder="Enter PIN Code"
                                        name="zip"
                                        disabled={editable}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50">
                              <div className="pd-t-20 wd-100p">
                                <div className="form-group row">
                                  <label
                                    htmlFor="country"
                                  >
                                    Country
                                  </label>
                                  <div className="col-sm-9">
                                    <Field
                                      type="text"
                                      className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                      placeholder="Enter Country"
                                      name="country"
                                      disabled={editable}
                                    />
                                  </div>
                                </div>

                                <div className="form-group row"></div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel
                      className={classNames("bg-white rounded-2xl pt-6 -mt-1")}
                    >
                      <div className="container">
                        <fieldset className="form-fieldset">
                          <div className="flex justify-between items-center gap-4">
                            <div className="items-center mb-3">
                              <h5 className="font-semibold text-base text-primary">
                                Fiscal Year
                              </h5>
                              <p className="text-[#929296] text-sm">
                                This page enables you to set the start month for
                                your fiscal year.
                              </p>
                            </div>
                            <InfoIcon />
                          </div>
                          <div className="media align-items-stretch w-full">
                            <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 pt-6 w-50">
                              <div className="flex w-max items-center gap-6">
                                <label
                                  htmlFor="countries"
                                  className="whitespace-nowrap text-lg font-semibold text-[#929296] min-w-[230px]"
                                >
                                  Fiscal Year begins in
                                </label>
                                <select
                                  name="fiscalYear.beginsIn"
                                  className="min-w-[300px] bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2 py-[17px]"
                                  value={selected}
                                  onChange={handleSelectChange}
                                  disabled={editable}
                                >
                                  <option value="">Select a month</option>
                                  <option value="January">January</option>
                                  <option value="February">February</option>
                                  <option value="March">March</option>
                                  <option value="April">April</option>
                                  <option value="May">May</option>
                                  <option value="June">June</option>
                                  <option value="July">July</option>
                                  <option value="August">August</option>
                                  <option value="September">September</option>
                                  <option value="October">October</option>
                                  <option value="November">November</option>
                                  <option value="December">December</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-6 mt-3">
                                <label
                                  htmlFor="countries"
                                  className="whitespace-nowrap text-lg font-semibold text-[#929296]"
                                >
                                  Display Fiscal Year Based On
                                </label>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <input
                                      id="start-month"
                                      name="Fiscal-Year"
                                      type="radio"
                                      className="w-4 h-4 cursor-pointer text-primary accent-primary bg-gray-100 border-gray-300"
                                    />
                                    <label
                                      htmlFor="start-month"
                                      className="text-sm font-medium text-gray-900 cursor-pointer"
                                    >
                                      Start Month
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      id="Fiscal-year"
                                      name="Fiscal-Year"
                                      type="radio"
                                      className="w-4 h-4 cursor-pointer text-primary accent-primary bg-gray-100 border-gray-300"
                                    />
                                    <label
                                      htmlFor="Fiscal-year"
                                      className="text-sm font-medium text-gray-900 cursor-pointer"
                                    >
                                      End Month
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className={classNames("bg-white pt-6 -mt-1")}>
                      <div className="flex items-center gap-4 justify-between">
                        <div className="items-center mb-3">
                          <h5 className="font-semibold text-base text-primary">
                            Business Hours
                          </h5>
                          <p className="text-[#929296] text-sm">
                            Business hours define the operational hours of your
                            organization. Set business hours to help your
                            employees ensure that the activities are carried out
                            at the operational hours of your organization.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between py-6">
                        <div className="items-center mb-3">
                          <h5 className="font-semibold text-base text-primary">
                            Shift Hours
                          </h5>
                          <p className="text-[#929296] text-sm">
                            Create shift hours and assign shifts based on
                            employee's work hours or time zone. Shift Hours
                            enables you to assign activities based on user's
                            availability.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-white gap-3 whitespace-nowrap flex items-center bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2.5"
                          onClick={handleShow}
                          disabled={editable}
                        >
                          <Plus />
                          New Shift
                        </button>
                      </div>

                      <div className="row d-flex justify-content-center">
                        <div className="col-md-12 mt-3 border-[1.5px] border-[#E6E6EB] rounded-2xl overflow-hidden">
                          <table className="table w-full text-left ">
                            <thead className="bg-[#E6E6EB] border-[1.5px] border-[#E6E6EB]">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                ></th>
                                <th
                                  scope="col"
                                  className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                >
                                  Shift Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                >
                                  Time Zone
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                >
                                  Timing
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                >
                                  Edit
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                >
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.length
                                ? data?.map((shift, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className="border-b border-[1.5px] border-[#E6E6EB]"
                                    >
                                      <td className="whitespace-nowrap text-[#929296] font-medium text-sm w-16 px-4 py-4">
                                        <div className="cursor-pointer">
                                          <TableDelete />
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px]">
                                        {shift.timeZone}
                                      </td>
                                      <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px]">
                                        {shift?.shiftDays?.map(
                                          (value, index) => {
                                            return (
                                              <div
                                                key={index}
                                                className="text-[#929296] font-medium text-sm"
                                              >
                                                {value}:{" "}
                                                {`${tConvert(
                                                  shift?.shiftTimings[
                                                  value?.toLowerCase()
                                                  ]["from"]
                                                )} - ${tConvert(
                                                  shift?.shiftTimings[
                                                  value?.toLowerCase()
                                                  ]["to"]
                                                )}`}
                                              </div>
                                            );
                                          }
                                        )}
                                      </td>
                                      <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px] m-auto ">
                                        <Edit
                                          display={
                                            editable ? true : false
                                          }
                                          className="col-sm-2 cursor-pointer p-0 m-auto"
                                          onClick={() => handleEdit(index)}
                                        />
                                      </td>
                                      <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px]">
                                        <Delete
                                          display={
                                            editable ? true : false
                                          }
                                          className="col-sm-2 cursor-pointer m-auto p-0"
                                          onClick={() => {
                                            setDeleteIndex(index);
                                            setShiftDeleteModalHandler(true);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel
                      className={classNames(
                        "bg-white rounded-2xl -mt-1 focus-visible:outline-none"
                      )}
                    >
                      <div className="container">
                        <fieldset className="form-fieldset">
                          <div className="flex items-center gap-4 justify-between py-6">
                            <div className="items-center mb-3">
                              <h5 className="font-semibold text-base text-primary">
                                Holiday Details
                              </h5>
                              <p className="text-[#929296] text-sm">
                                Create a list of holidays based on your
                                organization
                              </p>
                            </div>
                            <div className=" space-x-2 flex justify-start items-center">
                              <AddHolidayExcelFile
                                setHoliday={setHoliday}
                                editable={editable} />
                              <button
                                type="button"
                                className="text-white disabled:bg-gray-200 disabled:text-primary/40 gap-3 whitespace-nowrap flex items-center bg-primary cursor-pointer font-medium rounded-md text-sm px-5 py-2.5"
                                onClick={handleHolidayModalShow}
                                disabled={editable}
                              >
                                Create Holiday List
                              </button>
                            </div>
                          </div>
                          <div className="text-[#008EFF] mb-5 text-xs font-bold bg-[#E2F2FF] py-1 px-[10px] rounded-full w-max">
                            Holiday List {new Date().getFullYear()}
                          </div>

                          <div className="row mr-2 d-flex justify-content-center pt-5">
                            <div className="col-md-12 mt-3 border-[1.5px] border-[#E6E6EB] rounded-2xl overflow-hidden">
                              <table className="table border-none w-full text-left">
                                <thead className="bg-[#E6E6EB] border-[1.5px] border-[#E6E6EB]">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                    ></th>
                                    <th
                                      scope="col"
                                      className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                    >
                                      Date
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                    >
                                      Edit
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-4 py-[17px] font-medium text-sm text-gray-900"
                                    >
                                      Delete
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="border-none">
                                  {holiday?.map((value, index) => {
                                    return (
                                      <tr
                                        key={`${value?.name}${index}${value?.date}`}
                                        className="border-b border-[1.5px] border-[#E6E6EB]"
                                      >
                                        <td className="whitespace-nowrap text-[#929296] font-medium text-sm w-16 px-4 py-4">
                                          <button onClick={() => handleDeleteHolidays(`${value?.name}${value?.date}`)} className="cursor-pointer">
                                            <TableDelete />
                                          </button>
                                        </td>
                                        <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px]">
                                          {value?.name}
                                        </td>
                                        <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px]">
                                          {value?.date
                                            ? dateFormat(value?.date)
                                            : ""}
                                        </td>
                                        <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px]">
                                          <Edit
                                            disabled={editable}
                                            className="col-sm-2 cursor-pointer m-auto p-0"
                                            onClick={() =>
                                              handleEditHoliday(index)
                                            }
                                          />
                                        </td>
                                        <td className="whitespace-nowrap text-[#929296] font-medium text-sm px-4 py-[21px]">
                                          <Delete
                                            disabled={editable}
                                            className="col-sm-2 cursor-pointer m-auto p-0"
                                            onClick={() => {
                                              setDeleteIndex(index);
                                              setDeleteModalHandler(true);
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                              {
                                holiday?.length === 0 && <div>
                                  <div className="flex justify-center items-center w-full">
                                    <img alt="noHolidayimg icon" className=" w-[200px] " src={noHolidayimg} />
                                  </div>
                                  <center>No Holiday record found </center>
                                </div>
                              }
                            </div>
                          </div>
                          {!editable && <div className="flex items-center gap-3 mt-4">
                            <button className="text-[#B2B2B6] border-[1px] border-[#B2B2B6] gap-3 whitespace-nowrap flex items-center bg-white cursor-pointer font-normal rounded-md text-base px-4 py-2">
                              Cancel
                            </button>
                            <button className="bg-primary border-[1px] border-[#B2B2B6] gap-3 whitespace-nowrap flex items-center text-white cursor-pointer font-normal rounded-md text-base px-4 py-2">
                              Save
                            </button>
                          </div>}
                        </fieldset>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <Transition appear show={show} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={handleClose}
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
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              {editMode ? "Update Shift" : "Add New Shift"}
                            </Dialog.Title>
                            <div className=" h-[65vh] overflow-y-scroll ">
                              <div className="my-5 grid grid-cols-3 gap-2">
                                <div className="mb-4">
                                  <label
                                    htmlFor="shift[0].shiftName"
                                  >
                                    Shift Name
                                  </label>
                                  <div className="col-sm-9 pt-2">
                                    <Field
                                      name="shiftName"
                                      type="text"
                                      className="px-4 py-3 bg-[#F9F9FB] rounded-lg border w-full focus:outline-0"
                                      placeholder="Enter Shift Name"
                                      value={selectShift["shiftName"]}
                                      onChange={shiftSelectHandler}
                                      disabled={editable}
                                    />
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="timeZone"
                                  >
                                    Time Zone
                                  </label>
                                  <div className="col-sm-9 pt-2">
                                    <Field
                                      as="select"
                                      className="px-4 py-3 bg-[#F9F9FB] rounded-lg border w-full focus:outline-0"
                                      name="timeZone"
                                      value={selectShift["timeZone"]}
                                      onChange={shiftSelectHandler}
                                      disabled={editable}
                                    >
                                      <option value="" disabled>
                                        Select Time Zone
                                      </option>
                                      <option value="America/New_York">
                                        America/New_York
                                      </option>
                                      <option value="Europe/London">
                                        Europe/London
                                      </option>
                                      <option value="Asia/Tokyo">
                                        Asia/Tokyo
                                      </option>
                                      <option value="America/Los_Angeles">
                                        America/Los_Angeles
                                      </option>
                                      <option value="Europe/Paris">
                                        Europe/Paris
                                      </option>
                                      <option value="Asia/Dubai">
                                        Asia/Dubai
                                      </option>
                                      <option value="America/Chicago">
                                        America/Chicago
                                      </option>
                                      <option value="Europe/Berlin">
                                        Europe/Berlin
                                      </option>
                                      <option value="Asia/Shanghai">
                                        Asia/Shanghai
                                      </option>
                                      <option value="Australia/Sydney">
                                        Australia/Sydney
                                      </option>
                                      <option value="Africa/Johannesburg">
                                        Africa/Johannesburg
                                      </option>
                                      <option value="Asia/Kolkata">
                                        Asia/Kolkata
                                      </option>
                                      <option value="America/Toronto">
                                        America/Toronto
                                      </option>
                                      <option value="Europe/Madrid">
                                        Europe/Madrid
                                      </option>
                                      {/* Add more time zone options as needed */}
                                    </Field>
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="breakHours"
                                  >
                                    Break Hours
                                  </label>
                                  <div className="col-sm-9 pt-2">
                                    <Field
                                      as="select"
                                      className="px-4 py-3 bg-[#F9F9FB] rounded-lg border w-full focus:outline-0"
                                      name="breakHours"
                                      value={selectShift["breakHours"]}
                                      onChange={shiftSelectHandler}
                                      disabled={editable}
                                    >
                                      <option value="" disabled>
                                        Select Break Hours
                                      </option>
                                      <option value="0">No Break</option>
                                      <option value="1">1 hour</option>
                                      <option value="2">2 hours</option>
                                    </Field>
                                  </div>
                                </div>
                              </div>
                              <div >

                                <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60">
                                  <div className="pd-t-20 wd-100p">
                                    <div className="form-group row">
                                      {/* selectAllDaysForShift */}
                                      <div className="flex space-x-4 justify-start items-center">
                                        <p
                                          htmlFor="businessDays"
                                          className="font-medium"
                                        >
                                          Shift Days
                                        </p>
                                        <div className="flex justify-start items-center space-x-2">
                                          <Field
                                            className="form-check-input input-checks"
                                            type="checkbox"
                                            name="allDayShift"
                                            value="allDayShift"
                                            checked={checkboxValues?.length === 7}
                                            onChange={selectAllDaysForShift}
                                            id="allDayShiftCheckbox"
                                            disabled={editable}
                                            style={{
                                              width: "15px !important",
                                            }}
                                          />
                                          <label
                                            className="form-check-label ml-3"
                                            htmlFor="allDayShiftCheckbox"
                                          >
                                            All Days
                                          </label>
                                        </div>
                                      </div>

                                      <div className="mt-2">
                                        <div>
                                          {
                                            listOfDays?.map((day) => {
                                              return (
                                                <div key={day} className="grid grid-cols-3 gap-2 mb-2">
                                                  <div className="border h-12 mt-6 rounded-lg flex justify-start items-center space-x-2">
                                                    <Field
                                                      className="form-check-input input-checks"
                                                      type="checkbox"
                                                      name={day?.toLowerCase()}
                                                      value={day}
                                                      checked={checkboxValues.includes(
                                                        day
                                                      )}
                                                      onChange={handleCheckboxChange}
                                                      id={`${day?.toLowerCase()}Checkbox`}
                                                      disabled={editable}
                                                      style={{
                                                        width: "15px !important",
                                                      }}
                                                    />
                                                    <label
                                                      className="form-check-label ml-3"
                                                      htmlFor={`${day?.toLowerCase()}Checkbox`}
                                                    >
                                                      {day}
                                                    </label>
                                                  </div>
                                                  <div>
                                                    <label
                                                      htmlFor={`${day?.toLowerCase()}From`}
                                                      className="ml-3"
                                                    >
                                                      From:
                                                    </label>
                                                    <Field
                                                      as="select"
                                                      name={`${day?.toLowerCase()}.from`}
                                                      value={
                                                        selectShift[`${day?.toLowerCase()}.from`]
                                                      }
                                                      onChange={shiftSelectHandler}
                                                      className="px-4 py-3 bg-[#F9F9FB] border rounded-lg w-full focus:outline-0"
                                                      id={`${day?.toLowerCase()}From`}
                                                      disabled={
                                                        editable ||
                                                        !checkboxValues.includes(
                                                          day
                                                        )
                                                      }
                                                    >
                                                      <option value="" disabled>
                                                        Select From Time
                                                      </option>
                                                      <option value="00:00">
                                                        12:00 AM
                                                      </option>
                                                      <option value="01:00">
                                                        1:00 AM
                                                      </option>
                                                      <option value="02:00">
                                                        2:00 AM
                                                      </option>
                                                      <option value="03:00">
                                                        3:00 AM
                                                      </option>
                                                      <option value="04:00">
                                                        4:00 AM
                                                      </option>
                                                      <option value="05:00">
                                                        5:00 AM
                                                      </option>
                                                      <option value="06:00">
                                                        6:00 AM
                                                      </option>
                                                      <option value="07:00">
                                                        7:00 AM
                                                      </option>
                                                      <option value="08:00">
                                                        8:00 AM
                                                      </option>
                                                      <option value="09:00">
                                                        9:00 AM
                                                      </option>
                                                      <option value="10:00">
                                                        10:00 AM
                                                      </option>
                                                      <option value="11:00">
                                                        11:00 AM
                                                      </option>
                                                      <option value="12:00">
                                                        12:00 PM
                                                      </option>
                                                      <option value="13:00">
                                                        1:00 PM
                                                      </option>
                                                      <option value="14:00">
                                                        2:00 PM
                                                      </option>
                                                      <option value="15:00">
                                                        3:00 PM
                                                      </option>
                                                      <option value="16:00">
                                                        4:00 PM
                                                      </option>
                                                      <option value="17:00">
                                                        5:00 PM
                                                      </option>
                                                      <option value="18:00">
                                                        6:00 PM
                                                      </option>
                                                      <option value="19:00">
                                                        7:00 PM
                                                      </option>
                                                      <option value="20:00">
                                                        8:00 PM
                                                      </option>
                                                      <option value="21:00">
                                                        9:00 PM
                                                      </option>
                                                      <option value="22:00">
                                                        10:00 PM
                                                      </option>
                                                      <option value="23:00">
                                                        11:00 PM
                                                      </option>
                                                      {/* Add all hours */}
                                                    </Field>
                                                  </div>
                                                  <div>
                                                    <label
                                                      htmlFor={`${day?.toLowerCase()}To`}
                                                      className="ml-3"
                                                    >
                                                      To:
                                                    </label>
                                                    <Field
                                                      as="select"
                                                      name={`${day?.toLowerCase()}.to`}
                                                      className="border px-4 py-3 bg-[#F9F9FB] rounded-lg w-full focus:outline-0"
                                                      value={
                                                        selectShift[`${day?.toLowerCase()}.to`]
                                                      }
                                                      onChange={shiftSelectHandler}
                                                      id={`${day?.toLowerCase()}To`}
                                                      disabled={
                                                        editable ||
                                                        !checkboxValues.includes(
                                                          day
                                                        )
                                                      }
                                                    >
                                                      <option value="" disabled>
                                                        Select To Time
                                                      </option>
                                                      {/* Add time options for Monday */}
                                                      {/* Example: */}
                                                      <option value="00:00">
                                                        12:00 AM
                                                      </option>
                                                      <option value="01:00">
                                                        1:00 AM
                                                      </option>
                                                      <option value="02:00">
                                                        2:00 AM
                                                      </option>
                                                      <option value="03:00">
                                                        3:00 AM
                                                      </option>
                                                      <option value="04:00">
                                                        4:00 AM
                                                      </option>
                                                      <option value="05:00">
                                                        5:00 AM
                                                      </option>
                                                      <option value="06:00">
                                                        6:00 AM
                                                      </option>
                                                      <option value="07:00">
                                                        7:00 AM
                                                      </option>
                                                      <option value="08:00">
                                                        8:00 AM
                                                      </option>
                                                      <option value="09:00">
                                                        9:00 AM
                                                      </option>
                                                      <option value="10:00">
                                                        10:00 AM
                                                      </option>
                                                      <option value="11:00">
                                                        11:00 AM
                                                      </option>
                                                      <option value="12:00">
                                                        12:00 PM
                                                      </option>
                                                      <option value="13:00">
                                                        1:00 PM
                                                      </option>
                                                      <option value="14:00">
                                                        2:00 PM
                                                      </option>
                                                      <option value="15:00">
                                                        3:00 PM
                                                      </option>
                                                      <option value="16:00">
                                                        4:00 PM
                                                      </option>
                                                      <option value="17:00">
                                                        5:00 PM
                                                      </option>
                                                      <option value="18:00">
                                                        6:00 PM
                                                      </option>
                                                      <option value="19:00">
                                                        7:00 PM
                                                      </option>
                                                      <option value="20:00">
                                                        8:00 PM
                                                      </option>
                                                      <option value="21:00">
                                                        9:00 PM
                                                      </option>
                                                      <option value="22:00">
                                                        10:00 PM
                                                      </option>
                                                      <option value="23:00">
                                                        11:00 PM
                                                      </option>
                                                      {/* Add all hours */}
                                                    </Field>
                                                  </div>
                                                </div>
                                              )
                                            })
                                          }

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end ">
                                <button
                                  className=" border-[#191242] border rounded-2xl px-5 py-3 "
                                  onClick={handleClose}
                                >
                                  Close
                                </button>
                                <button
                                  onClick={AddShiftHandler}
                                  className="text-white ml-2 flex items-center bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3"
                                  disabled={editable}
                                >
                                  {editMode ? "Update" : "Add"}
                                </button>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
                <Transition appear show={holidayModalShow} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={handleHolidayModalClose}
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
                              className="text-lg font-medium leading-6 text-gray-900 mb-2"
                            >
                              {editMode ? "Update Holiday" : "Add Holiday"}
                            </Dialog.Title>
                            <div className="container h-[50dvh]">
                              <fieldset>
                                <div className="media align-items-stretch  ht-100p">
                                  <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50">
                                    <div className="mt-6 max-w-[500px] border-[1.5px] border-[#FFF192] bg-[#FFFCE4] rounded-xl py-[13px] px-3 text-sm text-gray-700 font-normal">
                                      Note: Holidays added will influence other
                                      CRM features.
                                    </div>
                                    <div className="w-7/12">
                                      <div className="flex w-full items-center gap-6 mb-4 mt-7">
                                        <label
                                          htmlFor="countries"
                                          className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                        >
                                          Select Month
                                        </label>
                                        <select
                                          className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full p-2.5 py-3 focus-visible:outline-none"
                                          name="fiscalYear.beginsIn"
                                        >
                                          <option value="">
                                            Select a month
                                          </option>
                                          <option value="January">
                                            January
                                          </option>
                                          <option value="February">
                                            February
                                          </option>
                                          <option value="March">March</option>
                                          <option value="April">April</option>
                                          <option value="May">May</option>
                                          <option value="June">June</option>
                                          <option value="July">July</option>
                                          <option value="August">August</option>
                                          <option value="September">
                                            September
                                          </option>
                                          <option value="October">
                                            October
                                          </option>
                                          <option value="November">
                                            November
                                          </option>
                                          <option value="December">
                                            December
                                          </option>
                                        </select>
                                      </div>
                                      <div className="flex w-full items-center gap-6 mb-4">
                                        <label
                                          htmlFor="countries"
                                          className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                        >
                                          Apply to
                                        </label>
                                        <select
                                          className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full p-2.5 py-3 focus-visible:outline-none"
                                          name="fiscalYear.beginsIn"
                                        >
                                          <option value="">
                                            Click to select shifts
                                          </option>
                                          <option value="January">One</option>
                                          <option value="February">Two</option>
                                          <option value="March">Three</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="pd-t-20 wd-100p">
                                      <div className="form-group row">
                                        <label
                                          htmlFor="Name"
                                        >
                                          Holiday Name
                                        </label>
                                        <div className="col-sm-9">
                                          <Field
                                            name="name"
                                            type="text"
                                            className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                                            placeholder="Enter Holiday Name"
                                            value={holidayName || ""}
                                            onChange={(e) =>
                                              setHolidayName(e.target.value)
                                            }
                                            disabled={editable}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60 w-50 mb-2">
                                    <div className="pd-t-20 wd-400p  h-[300px]">
                                      <div className="form-group row">
                                        <label
                                          htmlFor="date"
                                        >
                                          Date
                                        </label>
                                        <div className="col-sm-9">
                                          <ReactDatePicker
                                            name="date"
                                            className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0 "
                                            placeholderText="Date"
                                            selected={
                                              holidayDate
                                                ? new Date(holidayDate)
                                                : null
                                            }
                                            onChange={(date) => {
                                              setHolidayDate(date);
                                            }}
                                            disabled={editable}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>

                            <div className="flex justify-end ">
                              <button
                                className=" border-[#191242] border rounded-2xl px-5 py-3 "
                                onClick={handleHolidayModalClose}
                              >
                                Close
                              </button>
                              <button
                                onClick={AddHoliday}
                                className="text-white ml-2 flex items-center bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3"
                                disabled={editable}
                              >
                                {editMode ? "Update" : "Add"}
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
                <Transition appear show={deleteModalHandler} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setDeleteModalHandler(false)}
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
                              className="text-lg font-medium leading-6 text-gray-900 "
                            >
                              Delete Holiday
                            </Dialog.Title>
                            <div className="container">
                              <fieldset className="form-fieldset">
                                <h5>Are you sure want to Delete?</h5>
                              </fieldset>
                            </div>

                            <div className="flex justify-end ">
                              <button
                                className=" border-[#191242] border rounded-2xl px-5 py-3 "
                                onClick={() => setDeleteModalHandler(false)}
                              >
                                Close
                              </button>
                              <button
                                onClick={() => deleteHandlerHoliday()}
                                className="text-white ml-2 flex items-center bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3"
                                disabled={editable}
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
                <Transition appear show={deleteShiftModalHandler} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setShiftDeleteModalHandler(false)}
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
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Delete Shift
                            </Dialog.Title>
                            <div className="container">
                              <fieldset className="form-fieldset">
                                <h5>Are you sure want to Delete?</h5>
                              </fieldset>
                            </div>

                            <div className="flex justify-end ">
                              <button
                                className=" border-[#191242] border rounded-2xl px-5 py-3 "
                                onClick={() =>
                                  setShiftDeleteModalHandler(false)
                                }
                              >
                                Close
                              </button>
                              <button
                                onClick={() => deleteHandler()}
                                className="text-white ml-2 flex items-center bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3"
                                disabled={editable}
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
              </Form>
            )}
          </Formik>
        </div>
        {tab[2] !== "Business Hours" ||
          (tab[3] !== "Holiday" && (
            <div className="bg-white border-[1.5px] mt-6 border-[#E6E6EB] p-5 rounded-2xl">
              <div className="flex items-center gap-3 justify-between mb-4">
                <div className="w-full">
                  <h1 className="text-sm font-semibold leading-[22px]">
                    Locale Information
                  </h1>
                  <hr className="mt-2 w-full bg-gray-200 h-[1px]" />
                </div>
                <div className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer">
                  <img alt="edit icon" src={Edits} />
                  Edit
                </div>
              </div>
              <div className="text-gray-700">
                <div className="grid lg:grid-cols-2 text-sm">
                  <div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 font-semibold text-primary">
                        Country Locale :
                      </div>
                      <div className="px-4 py-2 text-gray-500 text-sm font-medium">
                        India
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 font-semibold text-primary">
                        Time Zone :
                      </div>
                      <div className="px-4 py-2 text-gray-500 text-sm font-medium">
                        (GMT 5:30) India Standard Time (Asia/Kolkata)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CompanyLayout;


const listOfDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];