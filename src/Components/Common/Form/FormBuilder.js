import React, { memo, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  GET_DETAIL,
  GET_USER_PROFILE,
  SAVE,
  SET_LOADER,
} from "../../../Redux/actions/user.js";
import { list } from "../../module";
import { TRACK_TOUCH } from "../../../Redux/actions/comman";
import { GET_FORM } from "../../../Redux/actions/user";
import BreadCrumb from "../../breadcrumb";
import { CustomSelect } from "../Form/CustomSelect";
import { CustomLookup } from "../Form/CustomLookup";
import { GET_ALL_ACTIVE_USER } from "../../../Redux/actions/userList";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { GET_ALL_PIPELINES } from "../../../Redux/actions/pipeline";
import LookupModuleField from "../lookupModuleField";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FileUpload from "./FileUpload";
import TextInputChanges from "./textInputChanegs";
import GetFormByModuleName from "../getFormsByModuleName";
import moment from "moment";
import QuickAdd from "../QuickAdd/index";
import "../EditForm/formeditor.css";
import PageLoader from "../../pageLoader";

const getTitle = (value) => {
  let titleis = value
    ?.replace(/([A-Z])/g, " $1")
    ?.replace(/^./, function (str) {
      return str.toUpperCase();
    });
  return titleis.replace(/_/g, "");
};

function FormBuilder(props) {
  const { formType } = props;
  // console.log("formType", formType);
  const api = list[formType] || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [quickAddInput, setQuickAddInput] = useState({});
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryParams = new URLSearchParams(window.location.search);
  const callType = queryParams.get("callType");
  const parentModule = queryParams.get("parentModule");
  const [values, setValues] = useState({});
  const [yupSchema, setYupSchema] = useState(null); // Add yupSchema state
  const [getConnectionId, setGetConnectionId] = useState();
  const [moduleName, setModuleName] = useState();

  // const getConnectionId = location?.search
  //   ?.split("?connectionId=")[1]
  //   ?.split("?prePathname=");
  const detailPageIs = new URLSearchParams(window.location.search);
  const loading = useSelector((state) => state.user.loading);

  const redriect = useSelector((state) => state.user.redriect);
  const sections = useSelector((state) => state.user.form.sections);
  const [userOptions, setUserOptions] = useState([]);
  const [pipelineData, setPipelineData] = useState();
  const [selectFromDate, setSelectFromDate] = useState(new Date());
  const [selectmeetingMin, setSelectmeetingMin] = useState(0);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState({});
  const [maxDate, setMaxDate] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm'));


  const detail = useSelector((state) => state.user.detail);
  console.log("detail", detail);
  const breadcrumblist = [
    { name: "Dashboard", path: "/crm/dashboard" },
    { name: formType, path: api.redirectUrl },
  ];
  const { write } = useAccessibleRole(formType);

  const generateYupSchema = (sections) => {
    console.log(sections, "test sections ::");
    let schema = {};
    let fields = {};

    for (const section of sections) {
      for (const fieldName in section.inputs) {
        const input = section.inputs[fieldName];
        // console.log("input===>", input);
        const { type, required, placeholder, min, maxLength, value } = input;
        console.log(
          "type, required, placeholder, min, maxLength, value",
          type,
          required,
          placeholder,
          min,
          maxLength,
          value
        );
        let fieldSchema = yup.string().trim();

        if (required === true) {
          fieldSchema = fieldSchema.required(
            `Please enter a value for ${placeholder}`
          );
        }
        if (value === "CallDuration" && callType == "log") {
          fieldSchema = fieldSchema
            .required("ERROR: The number is required!")
            .test(
              "Is positive?",
              "ERROR: The number must be greater than 0!",
              (value) => value > 0
            );
        }
        if (min !== undefined) {
          fieldSchema = fieldSchema.min(
            min,
            `${placeholder} must be at least ${min} characters`
          );
        }

        if (maxLength !== undefined) {
          fieldSchema = fieldSchema.max(
            maxLength,
            `${placeholder} must be at most ${maxLength} characters`
          );
        }

        schema[value] = fieldSchema;
        if (type === "Multiselect") {
          input?.options?.map((item, i) => {
            if (item.isDefault) {
              fields[value] = [item.value];
            }
          });
          schema[value] = yup
            .array()
            .min(0, `Please select a value for ${placeholder}`);
        } else if (type === "Lookup") {
          fields[value] = "";
        } else if (type === "Owner") {
          fields[`${formType}OwnerId`] = userOptions[0]?.value || "";
          optionsForOwner();
        } else if (type === "Select") {
          input?.options?.map((item, i) => {
            if (item.isDefault) {
              fields[value] = item.value;
            }
          });
        } else {
          fields[value] = "";
        }
      }
    }
    console.log("fields", fields);
    const valueKey = Object.keys(fields);
    let obj = {};
    Object.entries(detail).forEach((item) => {
      if (valueKey.includes(item[0])) {
        obj[item[0]] = item[1];
      }
    });
    // setValues({ ...fields, ...obj });
    setValues({});

    return yup.object().shape(schema);
  };
  const onSubmit = async (values) => {
    if (location && location?.state) {
      const { getConnectionId, moduleName, prePathname } =
        location && location?.state;

      let payload = {
        ...values,
        ModuleTitle: formType,
        ...(parentModule ? { parentModule: parentModule } : {}),
        [`${formType}FormId`]: selectedLayout?._id,
      };
      if (getConnectionId?.length > 1) {
        payload["connectionId"] = getConnectionId;
      }
      SET_LOADER(true);

      await dispatch(SAVE(api.saveApi, payload));

      if (getConnectionId?.length > 1) {
        await dispatch(
          TRACK_TOUCH({ id: getConnectionId, module: detailPageIs })
        );
      }
      setTimeout(() => {
        setValues({});
        SET_LOADER(false);
        // navigate(-2);
        navigate(prePathname)
        // navigate(api.redirectUrl);
      }, 3000);
    } else {
      let payload = {
        ...values,
        ModuleTitle: formType,
        ...(parentModule ? { parentModule: parentModule } : {}),
        [`${formType}FormId`]: selectedLayout?._id,
      };
      // console.log("payload", payload);
      SET_LOADER(true);
      console.log("=============api", api);
      await dispatch(SAVE(api.saveApi, payload));

      setTimeout(() => {
        setValues({});

        SET_LOADER(false);

        navigate(api.redirectUrl);
        // navigate(-2);
      }, 3000);
    }
  };

  const getAllPipelines = async () => {
    let data = {
      offset: 1,
      limit: 10,
      search: [],
    };
    let response = await dispatch(GET_ALL_PIPELINES(data));
    console.log("JSON.stringif", response);

    setPipelineData(response?.data);
  };
  console.log("location---", location);
  useEffect(() => {

    dispatch(GET_FORM(api.formApi));
    getAllPipelines();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (sections) {
      if (Object.keys(sections)?.length > 0) {
        const schema = generateYupSchema(sections);
        console.log("schema====>", schema);
        setYupSchema(schema);
      }
    }
    // eslint-disable-next-line
  }, [sections]);

  useEffect(() => {
    console.log("locationlocation", location);
    if (location && location?.state) {
      const { getConnectionId, moduleName, prePathname } =
        location && location?.state;

      if (redriect) {
        if (getConnectionId?.length > 1) {
          navigate(getConnectionId);
        } else {
          navigate(api.redirectUrl);
        }
      }
    }

    // eslint-disable-next-line
  }, [redriect, location]);

  const getDataForNormalOrByCondition = (type, defaulData) => {
    console.log("test<<<<=====", type, defaulData, pipelineData);
    if (type?.toLowerCase().includes("pipeline")) {
      let items = pipelineData?.pipelineData;
      let newValue = items?.map((item) => {
        return {
          label: item?.pipelineTitle,
          value: item?._id,
        };
      });
      return newValue;
    } else if (
      type?.toLowerCase().includes("Stage") ||
      type?.toLowerCase().includes("stage")
    ) {
      if (pipelineData) {
        let findItem = pipelineData?.pipelineData?.find(
          (_it) => _it?._id === selectedPipeline?.value
        );
        if (findItem) {
          return findItem?.stages?.map((item) => {
            return {
              label: item?.stageTitle,
              value: item?._id,
            };
          });
        } else {
          return defaulData?.map((item) => {
            return {
              label: item?.label,
              value: item?.value,
            };
          });
        }
      } else {
        return defaulData?.map((item) => {
          return {
            label: item?.label,
            value: item?.value,
          };
        });
      }
    } else {
      return defaulData;
    }
  };

  const optionsForOwner = () => {
    let options = [];
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      const data = {
        ...values,
        [`${formType}OwnerId`]: resData?.userId,
      };
      setValues(data);
      setUserOptions(options);
    });

    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
      (data) => {
        // const options = userOptions;
        const res = data?.data?.data?.usersData;
        if (res?.length > 0) {
          res?.map((item) => {
            options.push({
              value: item?._id,
              label: `${item?.firstName} ${item?.lastName}`,
            });
          });
        }
      }
    );
    setUserOptions(options);
  };

  const autoSelectTodate = (minutes) => {
    setSelectmeetingMin(minutes);
    let oldDateObj = new Date();
    var newDate = moment(oldDateObj).add(minutes, "m").toDate();

    // const newDate = new Date(selectFromDate.getTime() + minutes * 60000); // 30 minutes in milliseconds
    setValues({
      ...values,
      From: selectFromDate,
      // To: moment(newDate).format("DD/MM/YYYY HH:mm")
      To: new Date(newDate),
    });
  };

  useEffect(() => {
    if (values?.CallEndTime && values?.CallStartTime && callType === "log") {
      let callEndTime = new Date(values?.CallEndTime);
      let callStartTime = new Date(values?.CallStartTime);
      let timeDifferenceMs = callEndTime - callStartTime;
      // let hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
      // let minutes = Math.floor(
      //   (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
      // );
      // setValues({ ...values, CallDuration: `${hours}: ${minutes} ` });
      setValues({ ...values, CallDuration: `${timeDifferenceMs / 1000}` });
    }
  }, [values?.CallEndTime, values?.CallStartTime]);

  const changeFormLayout = (item) => {
    // setSelectedLayout(item);
    // dispatch({ type: "GET_FORM", data: item });
  };

  useEffect(() => {
    if (location && location?.state) {
      const { getConnectionId, moduleName, prePathname } =
        location && location?.state;

      const type = searchParams.get("type");
      let typeName = type ? type : moduleName;
      const apiLink = list[typeName] || {};
      console.log(
        "apiLink.detailApi, getConnectionId",
        location?.state,
        apiLink.detailApi,
        getConnectionId
      );
      if ((type || moduleName) && getConnectionId) {
        dispatch(GET_DETAIL(apiLink.detailApi, getConnectionId)).then((res) => {
          if (moduleName == "Leads") {
            if (callType == "log" || callType == "schedule") {
              setValues({
                ...values,
                ...res?.data,
                "ContactName": values?.LastName ? values?.FirstName + ' ' + values?.LastName : "",
                "RelatedTo": values?.LastName ? values?.FirstName + ' ' + values?.LastName : "",
                OutgoingCallStatus: callType == "log" ? "Completed" : callType == "schedule" ? "Scheduled" : "",
              });
            } else {
              setValues({
                ...values,
                ...res?.data,
                "ContactName": values?.LastName ? values?.FirstName + ' ' + values?.LastName : "",
                "RelatedTo": values?.LastName ? values?.FirstName + ' ' + values?.LastName : ""
              });
            }


          } else if (moduleName == "Contacts") {
            if (callType == "log" || callType == "schedule") {
              setValues({
                ...values,
                ...res?.data,
                "ContactName": values?.LastName ? values?.FirstName + ' ' + values?.LastName : "",
                "RelatedTo": values?.LastName ? values?.FirstName + ' ' + values?.LastName : "",
                OutgoingCallStatus: callType == "log" ? "Completed" : callType == "schedule" ? "Scheduled" : "",
              });
            } else {
              setValues({
                ...values,
                ...res?.data,
                "ContactName": values?.LastName ? values?.FirstName + ' ' + values?.LastName : "",
                "RelatedTo": values?.LastName ? values?.FirstName + ' ' + values?.LastName : ""
              });
            }

            console.log("valueswwwwwwwwwwwww", values);
          } else if (moduleName == "Accounts") {
            if (callType == "log" || callType == "schedule") {
              setValues({
                ...values,
                ...res?.data,
                // "ContactName": "",
                "RelatedTo": values?.Company ? values?.Company : values?.AccountName ? values?.AccountName : "",
                OutgoingCallStatus: callType == "log" ? "Completed" : callType == "schedule" ? "Scheduled" : ""
              });
            } else {
              setValues({
                ...values,
                ...res?.data,
                // "ContactName": "",
                "RelatedTo": values?.Company ? values?.Company : values?.AccountName ? values?.AccountName : ""
              });
            }



          } else if (moduleName == "Opportunities") {
            if (callType == "log" || callType == "schedule") {
              setValues({
                ...values,
                ...res?.data,
                // "ContactName": values.FirstName + ' ' + values.LastName,
                "RelatedTo": values?.OpportunityName ? values?.OpportunityName : "",
                OutgoingCallStatus: callType == "log" ? "Completed" : callType == "schedule" ? "Scheduled" : "",
              });
            } else {
              setValues({
                ...values,
                ...res?.data,
                // "ContactName": values.FirstName + ' ' + values.LastName,
                "RelatedTo": values?.OpportunityName ? values?.OpportunityName : "",
              });
            }


          } else {
            if (callType == "log" || callType == "schedule") {
              setValues({
                ...values,
                ...res?.data,
                OutgoingCallStatus: callType == "log" ? "Completed" : callType == "schedule" ? "Scheduled" : "",
              });
            } else {
              setValues({
                ...values,
                ...res?.data,
              });
            }


          }
          setGetConnectionId(getConnectionId);
          setModuleName(moduleName);
          console.log("res-GET_DETAIL-moduleName->>>", moduleName, values, res);
        });
      }
    } else {
      if (formType == "Calls") {
        setValues({
          ...values,
          // ...res?.data,
          // "ContactName": values.FirstName + ' ' + values.LastName,
          // "RelatedTo": values.FirstName + ' ' + values.LastName,
          OutgoingCallStatus: callType == "log" ? "Completed" : callType == "schedule" ? "Scheduled" : "",
        });
      } else {

        // setGetConnectionId("");
        //  setModuleName("");
        setValues({
          ...values,
          // ...res?.data,
          // "ContactName": values.FirstName + ' ' + values.LastName,
          // "RelatedTo": values.FirstName + ' ' + values.LastName,
        });
      }
    }
  }, [dispatch, location]);

  const fieldGenerator = (input) => {
    const { type, FieldName } = input;

    switch (type) {
      case "Multiselect":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.value}>
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  className="custom-select"
                  name={input?.value || ""}
                  values={values}
                  setValues={setValues}
                  options={input?.options}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={true}
                // disabled
                />
              </div>
            </div>
          </div>
        );

      case "Select":
        return (
          <div
            key={input?.id}
            className={`${values["Repeat"] === "5" ? "flex" : ""}`}
          >
            <div className="form-group1 w-full" key={input?.value}>
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select"
                  name={input?.value || ""}
                  options={getDataForNormalOrByCondition(
                    input?.label,
                    input?.options
                  )}
                  setSelectedPipeline={setSelectedPipeline}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={false}
                />
              </div>
            </div>
            {input.value === "Repeat" && values["Repeat"] === "5" && (
              <div key={input?.id} className="mb-3">
                <div className="form-group1 ml-3 w-full">
                  <label className="ml-2">Date</label>
                  <span>{" *"}</span>
                  <div className="mt-2">
                    <input
                      type={"datetime-local"}
                      value={values["CustomDate"] || ""}
                      max="3099-12-31 00:00:00"
                      onChange={(e) =>
                        setValues({ ...values, CustomDate: e.target.value })
                      }
                      className="custom-select border w-full p-2 rounded-lg"
                      name={"CustomDate"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "Lookup":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.lookupModule[0]}>
              <label className="ml-2">{getTitle(input?.label)}</label>
              {input?.required && <span>{" *"}</span>}
              {console.log("input?.label==values=>", values)}
              <div className="mt-2 widthfull" style={{ display: "flex" }}>
                <LookupModuleField
                  // changeModuleOption={
                  //   moduleName
                  //     ? moduleName
                  //     : input?.label?.toLowerCase().includes("related") ||
                  //     (formType === "Tasks" &&
                  //       input?.label?.toLowerCase().includes("contact"))
                  // }
                  // labelType={
                  //   moduleName
                  //     ? moduleName
                  //     : input?.label?.toLowerCase().includes("related")
                  //       ? "related"
                  //       : input?.label?.toLowerCase().includes("contact")
                  //         ? "contacts"
                  //         : ""
                  // }
                  changeModuleOption={
                    input?.label?.includes("Related") ||
                    (formType === "Tasks" ?
                      input?.value?.toLowerCase().includes("contact")
                      : input?.value === "ProposedInventory" ? "" : input.label)
                  }
                  // labelType={
                  //   input?.label?.toLowerCase().includes("related")
                  //     ? "related"
                  //     : input?.label?.toLowerCase().includes("contact")
                  //       ? "contacts"
                  //       : moduleName
                  // }
                  labelType={
                    (moduleName == "Leads" || moduleName == "Accounts" || moduleName == "Contacts" || moduleName == "Opportunities")
                      ? input?.value?.toLowerCase().includes("contact")
                        ? "contacts" : moduleName == "Opportunities"
                          ? "Opportunities" : input?.lookupModule ? input?.lookupModule : moduleName :
                      input?.lookupModule ? input?.lookupModule :
                        moduleName
                          ? moduleName
                          : input?.label?.toLowerCase().includes("related")
                            ? "related"
                            : input?.label?.toLowerCase().includes("contact")
                              ? "contacts"
                              : input?.value
                  }
                  values={values}
                  //changeModuleOption={true}
                  formType={formType}
                  setValues={setValues}
                  input={input}
                  editable={false}
                  CustomLookup={CustomLookup}
                  open={open}
                />

                <button
                  className="modal__addBtn inline-block bg-zinc-200 text-black py-2 px-2 rounded"
                  style={{ borderRadius: "0", padding: "0 10px" }}
                  onClick={() => {
                    setQuickAddInput(input);
                    setOpen(true);
                  }}
                  type="button"
                >
                  Add
                </button>
                {open &&
                  quickAddInput?.value === input.value &&
                  quickAddInput?.id === input.id && (
                    <QuickAdd modal={open} input={input} setModal={setOpen} />
                  )}
              </div>
            </div>
          </div>
        );

      case "datetime-local":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={`${formType}OwnerId`}>
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2 flex justify-start items-center w-full space-x-3">
                <div className="w-full">
                  {selectmeetingMin && input?.label === "To" ? (
                    <input
                      // type={selectmeetingMin ? "" : type}
                      type={
                        selectmeetingMin && input?.label === "To" ? "" : type
                      }
                      // type={type}
                      // value={values?.To ?  values?.To : "" || ""}
                      value={
                        values?.To
                          ? moment(values?.To).format("DD/MM/YYYY HH:mm")
                          : ""
                      }
                      // value={JSON.stringify(values?.To)}

                      onChange={(e) => {
                        setSelectmeetingMin(0);
                        setValues({
                          ...values,
                          [input?.value]: e.target.value,
                        });
                      }}
                      disabled={
                        selectmeetingMin && input?.label === "To" ? true : false
                      }
                      // max="3099-12-31 00:00:00"

                      className="custom-select border w-full p-2 rounded-lg"
                      name={input?.value}
                      placeholder={input?.label}
                    />
                  ) : (
                    <input
                      type={type}
                      value={values[input?.value] || ""}
                      onChange={(e) => {
                        setSelectmeetingMin(0);
                        setValues({
                          ...values,
                          [input?.value]: e.target.value,
                        });
                      }}
                      disabled={false}
                      //max="2099-12-31 00:00:00"
                      // min={
                      //   values && values?.CallStartTime
                      //     ? values?.CallStartTime
                      //     : values?.From
                      //       ? values?.From
                      //       : moment().format("DD/MM/YYYY HH:mm")
                      // }
                      min={callType == "schedule" ? maxDate : ""}

                      // max={moment().format("DD/MM/YYYY HH:mm")}
                      // max={(moment("YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")).toString()}
                      max={(callType == "log") ? maxDate : "2099-12-31 00:00:00"}

                      className="custom-select border w-full p-2 rounded-lg"
                      name={input?.value}
                      placeholder={input?.label}
                    />
                  )}
                </div>
                {console.log("===values=>", values)}
                {input?.label === "From" && (
                  <div className="flex justify-start items-center w-full space-x-3">
                    <div className="flex justify-start space-x-1">
                      <p>30 min </p>
                      <input
                        checked={selectmeetingMin === 30}
                        type="checkbox"
                        onChange={() => autoSelectTodate(30)}
                      />
                    </div>
                    <div className="flex justify-start space-x-1">
                      <p>1 Hour </p>
                      <input
                        checked={selectmeetingMin === 60}
                        type="checkbox"
                        onChange={() => autoSelectTodate(60)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "Owner":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={`${formType}OwnerId`}>
              <label className="ml-2">
                {input?.label === "Host" ? input?.label : getTitle(formType) + ' ' + input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select "
                  name={FieldName == "Host" ? FieldName : `${formType}OwnerId`}
                  options={userOptions}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={false}
                />
              </div>
            </div>
          </div>
        );
      case "user":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1">
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select "
                  name={input?.value}
                  options={userOptions}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={false}
                />
              </div>
            </div>
          </div>
        );
      case "date":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1">
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <input
                  type={type}
                  value={
                    values[input?.value]
                      ? moment(values[input?.value]).format("YYYY-MM-DD")
                      : "" || ""
                  }
                  onChange={(e) =>
                    setValues({ ...values, [input?.value]: e.target.value })
                  }
                  max={"3099-12-31"}
                  className="custom-select border w-full p-2 rounded-lg"
                  name={input?.value}
                  placeholder={input?.label}
                />
              </div>
            </div>
          </div>
        );
      case "textarea":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key="textarea">
              <label className="ml-2">
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  rows="2"
                  input={input}
                  // name={input?.value || ''}
                  placeholder={input?.label}
                  type={input?.type}
                  values={values}
                  formType={formType}
                  setValues={setValues}
                  component={TextInputChanges}
                  className={
                    input?.type === "checkbox"
                      ? "custom-control custom-checkbox"
                      : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  }
                />
              </div>
            </div>
          </div>
        );

      case "file":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={`${formType}OwnerId`}>
              <label className="ml-2">
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  className="custom-select "
                  name={input?.value}
                  component={FileUpload}
                  placeholder={input?.label}
                  isMulti={false}
                  dataValue={values[input?.value]}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={input?.id} className="mb-3">
            <div
              className={`form-group1  ${input?.type === "checkbox" ? "flex" : ""
                } flex-column`}
              key={input?.value}
            >
              {input?.label}{" "}
              {input.label.includes("Duration") ? "( In Seconds)" : ""}
              {input?.required && <span>{" *"}</span>}
              {input?.type === "checkbox" ? (
                <div
                  className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"}`}
                >
                  <input
                    type={type}
                    value={values[input?.value] || ""}
                    onChange={(e) =>
                      setValues({ ...values, [input?.value]: e.target.value })
                    }
                    setValues={setValues}
                    className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg"
                    name={input?.value}
                    placeholder={input?.label}
                  />
                </div>
              ) : (
                <div
                  className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"}`}
                >
                  <Field
                    input={input}
                    placeholder={input?.label}
                    type={input?.type}
                    values={values}
                    formType={formType}
                    setValues={setValues}
                    component={TextInputChanges}
                    className={
                      input?.type === "checkbox"
                        ? "custom-control custom-checkbox"
                        : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                    }
                  />
                </div>
              )}
              {/* <div
                className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"}`}
              >
                <Field
                  input={input}
                  placeholder={input?.label}
                  type={input?.type}
                  values={values}
                  formType={formType}
                  setValues={setValues}
                  component={TextInputChanges}
                  className={
                    input?.type === "checkbox"
                      ? "custom-control custom-checkbox"
                      : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  }
                />
              </div> */}
            </div>
          </div>
        );
    }
  };
  if (loading) {
    return <PageLoader title="Loading" />;
  }
  return (
    <>
      {console.log("fields===>", values, yupSchema)}

      <div className="min-h-screen pb-40 ">
        {yupSchema && (
          <Formik
            initialValues={values}
            validationSchema={yupSchema}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            onSubmit={(formValueIs, { setSubmitting }) => {
              console.log("formValueIsformValueIs==>", values.formValueIs, sections);

              setSubmitting(false);
              onSubmit(formValueIs);
            }}
          >
            {({ isSubmitting, errors, values, touched }) => (
              <Form>
                {console.log("initialVavalueslues11", values)}
                <div className="px-10 my-5">
                  <div>
                    <div>
                      <BreadCrumb
                        mainTitle={"Create " + formType}
                        active={"Create " + formType}
                        breadcrumblist={breadcrumblist}
                      />

                      <div className="flex justify-end items-center">
                        {/* <GetFormByModuleName
                          selected={selectedLayout}
                          setSelected={changeFormLayout}
                          modulename={formType}
                        /> */}

                        <div className="flex gap-3 justify-end mt-5">
                          <div
                            //to={location && location?.state && location?.state?.prePathname ? '../..' : api.redirectUrl}
                            onClick={(e) => {
                              if (formType == "siteVisit") {
                                navigate("/crm/sitevisit")
                              } else {
                                navigate(api.redirectUrl);
                                // navigate(-2)
                              }

                              // navigate(api.redirectUrl);

                              // console.log(e);
                              // alert("jj")
                              // navigate("crm/sitevisit")

                              // return
                              // const hasPrePathname = location && location.state && location.state.prePathname;

                              // if (hasPrePathname) {
                              //   e.preventDefault();
                              //   navigate(-2);
                              // } else {
                              //   const isCreateSiteVisit = location?.pathname === "/crm/create-sitevisit";
                              //   const targetPath = isCreateSiteVisit ? "/crm/sitevisit" : -2;
                              //   if (targetPath === -2) {
                              //     if (isCreateSiteVisit) {
                              //       navigate("/crm/create-sitevisit")
                              //     } else {
                              //       navigate(-2);
                              //     }

                              //   } else {
                              //     navigate(-3);
                              //   }
                              // }
                            }}
                            className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
                          >
                            Back
                            {/* <div
                            onClick={() => {

                              console.log("location---->", location);
                              if (location && location?.state && location?.state?.prePathname) {
                                navigate(prePathname)
                                // navigate(-2);
                              } else {
                                navigate(api.redirectUrl);
                              }


                            }}
                            //to={api.redirectUrl}
                            className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
                          >
                            Back
                          </div> */}
                          </div>
                          {/* {write && (
                            <button
                              className=" bg-primary rounded-2xl text-white py-2 px-10"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Save
                            </button>
                          )} */}
                          <button
                            className=" bg-primary rounded-2xl text-white py-2 px-10"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {} */}
                {/* {console.log("input==>", sections)} */}
                {Object.entries(sections)?.map(([sectionTitle, section]) => (
                  <div key={sectionTitle + section}>
                    <div className="p-5 bg-white rounded-xl mb-4">
                      <p className="font-semibold mb-3">{section.formTitle}</p>
                      <div className="grid md:grid-cols-2 gap-5">
                        {Object.entries(section.inputs).map(
                          ([fieldName, input]) =>
                            input?.value !== "CallEndTime" ||
                              (callType === "log" &&
                                input?.value === "CallEndTime") ? (
                              <div key={fieldName}>
                                {fieldGenerator(input)}
                                {errors[input?.value] && input?.required ? (
                                  <small className="text-red-400">
                                    {errors[input?.value]}
                                  </small>
                                ) : (
                                  errors[input?.value] && (
                                    <small className="text-red-400">
                                      {errors[input?.value]}
                                    </small>
                                  )
                                )}
                              </div>
                            ) : (
                              ""
                            )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

export default memo(FormBuilder);


