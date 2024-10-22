import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { GET_USER_PROFILE } from "../../../../Redux/actions/user";
import { list } from "../../../../Components/module";
import { GET_FORM, GET_FORM_CONVERT } from "../../../../Redux/actions/user";
import { CustomSelect } from "../../../../Components/Common/Form/CustomSelect";
import { CustomLookup } from "../../../../Components/Common/Form/CustomLookup";
import { GET_ALL_ACTIVE_USER } from "../../../../Redux/actions/userList";
import { GET_ALL_PIPELINES } from "../../../../Redux/actions/pipeline";
import LookupModuleField from "../../../../Components/Common/lookupModuleField";
import QuickAdd from "../../../../Components/Common/QuickAdd";

function OppotunityForm(props) {
  const { formType, quickform, handleSubmit, setShow } = props;

  const api = list[formType] || {};
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({});
  const [yupSchema, setYupSchema] = useState(null); // Add yupSchema state
  const [userOptions, setUserOptions] = useState([]);
  const [pipelineData, setPipelineData] = useState();
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [open, setOpen] = useState(false);
  const [quickAddInput, setQuickAddInput] = useState({});

  const generateYupSchema = (quickformInput) => {
    let schema = {};
    let fields = {};

    for (const fieldName in quickformInput) {
      const input = quickformInput[fieldName];
      const { type, required, placeholder, min, maxLength, value } = input;

      let fieldSchema = yup.string().trim();

      if (required === false) {
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
        fields[value] = [];
        schema[value] = yup
          .array()
          .min(0, `Please select a value for ${placeholder}`);
      } else if (type === "Lookup") {
        fields[value] = "";
      } else if (type === "Owner") {
        fields[`${formType}OwnerId`] = userOptions[0]?.value || "";
        optionsForOwner();
      } else {
        fields[value] = "";
      }
    }

    setFormdata(fields);
    return yup.object().shape(schema);
  };

  const getAllPipelines = async () => {
    let data = {
      offset: 1,
      limit: 10,
      search: [],
    };
    let response = await dispatch(GET_ALL_PIPELINES(data));
    setPipelineData(response?.data);
  };

  useEffect(() => {
    // console.log("formApi--->", api.formApi);
    dispatch(GET_FORM_CONVERT(api.formApi));
    getAllPipelines();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (quickform) {
      if (Object.keys(quickform)?.length > 0) {
        const schema = generateYupSchema(quickform);
        setYupSchema(schema);
      }
    }
    // eslint-disable-next-line
  }, [quickform]);

  const optionsForOwner = () => {
    let options = [];
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      const data = {
        ...formdata,
        [`${formType}OwnerId`]: resData?.userId,
      };
      setFormdata(data);
      // setUserOptions(options);
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

  const handlechange = (type, value, name) => {
    switch (type) {
      case "date":
        if (value?.length === 10) {
          setFormdata({ ...formdata, [name]: value });
        }
        break;
      default:
        break;
    }
  };

  const fieldGenerator = (input) => {
    // console.log("input===>", input);
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
                  values={formdata}
                  setValues={setFormdata}
                  className="custom-select"
                  name={input?.value || ""}
                  options={input?.options}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={true}
                  disabled
                />
              </div>
            </div>
          </div>
        );

      case "Select":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.value}>
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={formdata}
                  setValues={setFormdata}
                  className="custom-select"
                  menuPlacement="top"
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
          </div>
        );

      case "Lookup":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.lookupModule[0]}>
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                {/* <LookupModuleField
                  values={formdata}
                  setValues={setFormdata}
                  formType={formType}
                  input={input}
                  editable={false}
                  CustomLookup={CustomLookup}
                /> */}
                <LookupModuleField
                  changeModuleOption={
                    formType
                      ? formType
                      : input?.label?.toLowerCase().includes("related") ||
                      (formType === "Tasks" &&
                        input?.label?.toLowerCase().includes("contact"))
                  }
                  labelType={
                    input?.label?.toLowerCase().includes("contact")
                      ? "contacts"
                      : input?.label?.toLowerCase().includes("account")
                        ? "accounts"
                        : input?.label
                  }
                  values={formdata}
                  //changeModuleOption={true}
                  formType={formType}
                  setValues={setFormdata}
                  input={input}
                  editable={false}
                  CustomLookup={CustomLookup}
                  open={open}
                />
                {/* <button
                  className="modal__addBtn inline-block bg-zinc-200 text-black py-2 px-2 rounded"
                  style={{ borderRadius: "0", padding: "0 10px" }}
                  onClick={() => {
                    setQuickAddInput(input);
                    setOpen(true);
                  }}
                  data-dismiss="modal"
                  data-toggle="modal"
                  type="button"
                >
                  {" "}
                  Add{" "} 
                </button>*/}
                {open &&
                  quickAddInput?.value === input.value &&
                  quickAddInput?.id === input.id && (
                    <QuickAdd modal={open} input={input} setModal={setOpen} />
                  )}
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
              <input
                type={type}
                value={formdata[input?.value] || ""}
                onChange={(e) =>
                  handlechange(type, e.target.value, input?.value)
                }
                className="custom-select border w-full p-2 rounded-lg"
                name={input?.value}
                placeholder={input?.label}
              />
            </div>
          </div>
        );

      case "Owner":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={`${formType}OwnerId`}>
              <label className="ml-2">
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={formdata}
                  setValues={setFormdata}
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
                  // className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  name={input?.value || ""}
                  placeholder={input?.label}
                  type={input?.type}
                  component={input?.type}
                  rows="2"
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
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div
                className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"}`}
              >
                <input
                  name={input?.value || ""}
                  onChange={(e) => {
                    setFormdata({
                      ...formdata,
                      [input?.value]: e.target.value,
                    });
                  }}
                  placeholder={input?.label}
                  type={input?.type}
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

  console.log(quickform, "quickform");
  // return (
  //   <h1>helooo</h1>

  // )
  return (
    <div>
      {yupSchema && (
        <Formik
          initialValues={formdata}
          validationSchema={yupSchema}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            handleSubmit(values);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="grid grid-cols-2 gap-5">
                {console.log("quickform====>", quickform)}
                {Object.entries(quickform).map(([fieldName, input]) => (
                  <div key={fieldName}>
                    {fieldGenerator(input)}
                    {errors[input?.value] && (
                      <small className="text-red-400">
                        {errors[input?.value]}
                      </small>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-center space-x-2">
                <button
                  className="bg-gray-300 p-2 rounded-lg shadow min-w-[100px] text-primary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary p-2 rounded-lg shadow min-w-[100px] text-white"
                  type="submit"
                >
                  Convert
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default OppotunityForm;
