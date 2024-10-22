import { Dialog, Transition } from "@headlessui/react";
import React, { memo, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import LookupModuleField from "../lookupModuleField";
import { Fragment } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GET_QUICK_FORM_LAYOUT_BY_MODULE } from "../../../Redux/actions/modules";
import { CustomLookup } from "../Form/CustomLookup";
import { CustomSelect } from "../Form/CustomSelect";
import { X } from "feather-icons-react/build/IconComponents";
import { list } from "../../module";
import moment from "moment";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { GET_ALL_ACTIVE_USER } from "../../../Redux/actions/userList";
import { GET_ALL_PIPELINES } from "../../../Redux/actions/pipeline";
import { GET_USER_PROFILE, SAVE } from "../../../Redux/actions/user";
import TextInputChanges from "../Form/textInputChanegs";
import FileUpload from "../Form/FileUpload";

const getTitle = (value) => {
  let titleis = value
    ?.replace(/([A-Z])/g, " $1")
    ?.replace(/^./, function (str) {
      return str.toUpperCase();
    });
  return titleis.replace(/_/g, "");
};

const Index = ({ modal, setModal, input }) => {
  const formType = input.lookupModule;
  const api = list[input.lookupModule] || {};
  const queryParams = new URLSearchParams(window.location.search);
  const callType = queryParams.get("callType");
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [yupSchema, setYupSchema] = useState(null);
  const formbyModuleName = useSelector(
    (state) => state?.ModulesReducer?.quickFormbyModuleName?.formData[0]
  );
  const ownerData = {
    Owner: {
      name: "Owner",
      type: "Owner",
      placeholder: "owner",
      id: "Owner",
      value: `${formType}OwnerId`,
      maxLength: "255",
      duplicated: false,
      required: true,
      FieldName: "Owner",
      label: "Owner",
      remove: true,
    },
  };
  const detail = useSelector((state) => state.user.detail);

  const [userOptions, setUserOptions] = useState([]);
  const [pipelineData, setPipelineData] = useState();
  const [selectFromDate, setSelectFromDate] = useState(new Date());
  const [selectmeetingMin, setSelectmeetingMin] = useState(0);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const { write } = useAccessibleRole(input.lookupModule);

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
    });

    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
      (data) => {
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

  useEffect(() => {
    dispatch(GET_QUICK_FORM_LAYOUT_BY_MODULE(1, 200, input.lookupModule));
    getAllPipelines();
  }, []);

  const generateYupSchema = (quickCreateFields) => {
    let schema = {};
    let fields = {};
    for (const fieldName in quickCreateFields) {
      const input = quickCreateFields[fieldName];

      const { type, required, placeholder, maxLength, min, value } = input;

      let fieldSchema = yup.string().trim();

      if (required === true) {
        fieldSchema = fieldSchema.required(
          `Please enter a value for ${placeholder}`
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

    const valueKey = Object.keys(fields);
    let obj = {};
    Object.entries(detail).forEach((item) => {
      if (valueKey.includes(item[0])) {
        obj[item[0]] = item[1];
      }
    });
    setValues({ ...fields, ...obj });
    return yup.object().shape(schema);
  };
  const onSubmit = async (values) => {
    let payload = {
      ...values,
      ModuleTitle: formType,
    };
    await dispatch(SAVE(api.saveApi, payload, false));
    setModal(false);
  };

  useEffect(() => {
    if (formbyModuleName?.quickCreateFieldsForUpdate) {
      if (
        Object.keys(formbyModuleName?.quickCreateFieldsForUpdate)?.length > 0
      ) {
        const schema = generateYupSchema({
          ...ownerData,
          ...formbyModuleName?.quickCreateFieldsForUpdate,
        });
        setYupSchema(schema);
      }
    }
  }, [formbyModuleName]);

  const getAllPipelines = async () => {
    let data = {
      offset: 1,
      limit: 10,
      search: [],
    };
    let response = await dispatch(GET_ALL_PIPELINES(data));
    setPipelineData(response?.data);
  };

  const getDataForNormalOrByCondition = (type, defaulData) => {
    if (type?.toLowerCase().includes("pipeline")) {
      let items = pipelineData?.pipelineData;
      let newValue = items?.map((item) => {
        return {
          label: item?.pipelineTitle,
          value: item?._id,
        };
      });
      return newValue;
    } else if (type?.toLowerCase().includes("stage")) {
      let findItem = pipelineData?.pipelineData?.find(
        (_it) => _it?._id === selectedPipeline?.value
      );
      return findItem?.stages?.map((item) => {
        return {
          label: item?.stageTitle,
          value: item?._id,
        };
      });
    } else {
      return defaulData;
    }
  };

  const autoSelectTodate = (minutes) => {
    setSelectmeetingMin(minutes);
    const newDate = new Date(selectFromDate.getTime() + minutes * 60000); // 30 minutes in milliseconds
    setValues({ ...values, From: selectFromDate, To: newDate });
  };

  useEffect(() => {
    if (values?.CallEndTime && values?.CallStartTime && callType === "log") {
      let callEndTime = new Date(values?.CallEndTime);
      let callStartTime = new Date(values?.CallStartTime);
      let timeDifferenceMs = callEndTime - callStartTime;
      let hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
      let minutes = Math.floor(
        (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      setValues({ ...values, CallDuration: `${hours}: ${minutes} ` });
    }
  }, [values?.CallEndTime, values?.CallStartTime]);

  const fieldGenerator = (input) => {
    const { type } = input;
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
              <div className="mt-2 widthfull" style={{ display: "flex" }}>
                <LookupModuleField
                  changeModuleOption={
                    input?.label?.toLowerCase().includes("related") ||
                    (formType === "Tasks" &&
                      input?.label?.toLowerCase().includes("contact"))
                  }
                  labelType={
                    input?.label?.toLowerCase().includes("related")
                      ? "related"
                      : input?.label?.toLowerCase().includes("contact")
                        ? "contact"
                        : ""
                  }
                  values={values}
                  formType={formType}
                  setValues={setValues}
                  input={input}
                  editable={false}
                  CustomLookup={CustomLookup}
                />
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
                  <input
                    type={type}
                    value={values[input?.value] || ""}
                    onChange={(e) =>
                      setValues({ ...values, [input?.value]: e.target.value })
                    }
                    max="3099-12-31 00:00:00"
                    className="custom-select border w-full p-2 rounded-lg"
                    name={input?.value}
                    placeholder={input?.label}
                  />
                </div>
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
                {getTitle(formType)} {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select "
                  name={`${formType}OwnerId`}
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
                    moment(values[input?.value]).format("YYYY-MM-DD") || ""
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
                }`}
              key={input?.value}
            >
              {input?.label}{" "}
              {input.label.includes("Duration") ? "( In Seconds)" : ""}
              {input?.required && <span>{" *"}</span>}
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
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModal(true)}
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
                    className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB] flex items-center justify-between"
                  >
                    Quick Add
                    <X
                      size={20}
                      onClick={() => {
                        setModal(false);
                        dispatch({
                          type: "GET_QUICK_FORM_LAYOUT_BY_MODULE",
                          data: null,
                        });
                      }}
                      className="cursor-pointer"
                    />
                  </Dialog.Title>
                  {formbyModuleName?.quickCreateFieldsForUpdate &&
                    Object.keys(formbyModuleName?.quickCreateFieldsForUpdate)
                      .length ? (
                    <div>
                      {yupSchema && (
                        <Formik
                          initialValues={values}
                          validationSchema={yupSchema}
                          validateOnChange={false}
                          validateOnBlur={false}
                          enableReinitialize={true}
                          onSubmit={(formValueIs) => {
                            onSubmit(formValueIs);
                          }}
                        >
                          {({ isSubmitting, errors, touched }) => (
                            <Form>
                              <div className="container h-[50vh] overflow-y-scroll p-3">
                                {Object.entries({
                                  ...ownerData,
                                  ...formbyModuleName?.quickCreateFieldsForUpdate,
                                }).map(([fieldName, input]) =>
                                  input?.value !== "CallEndTime" ||
                                    (callType === "log" &&
                                      input?.value === "CallEndTime") ? (
                                    <div key={fieldName}>
                                      {fieldGenerator(input)}
                                      {errors[input?.value] &&
                                        input?.required && (
                                          <small className="text-red-400">
                                            {errors[input?.value]}
                                          </small>
                                        )}
                                    </div>
                                  ) : (
                                    ""
                                  )
                                )}
                              </div>
                              <div className="flex justify-end">
                                <Link
                                  onClick={() => {
                                    setModal(false);
                                    dispatch({
                                      type: "GET_QUICK_FORM_LAYOUT_BY_MODULE",
                                      data: null,
                                    });
                                  }}
                                  className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
                                >
                                  Back
                                </Link>
                                {write && (
                                  <button
                                    className=" bg-primary rounded-2xl text-white py-2 px-10 ml-6"
                                    type="submit"
                                    disabled={isSubmitting}
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  ) : (
                    <div className="container h-[50vh] overflow-y-scroll flex items-center justify-center">
                      <h2 className="text-[20px]">
                        There is no quick create fields for update.
                      </h2>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default memo(Index);
