import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { GET_USER_PROFILE } from "../../../../../Redux/actions/user";
import { list } from "../../../../../Components/module";
import { GET_FORM, GET_LOOKUP } from "../../../../../Redux/actions/user";
import { CustomSelect } from "../../../../../Components/Common/Form/CustomSelect";
import { CustomLookup } from "../../../../../Components/Common/Form/CustomLookup";
import LookupModuleField from '../../../../../Components/Common/lookupModuleField'
import { GET_ALL_ACTIVE_USER } from "../../../../../Redux/actions/userList";

function FormEditorForAssignmentRules(props) {
  const { formType, data, dataHandler, closeModal } = props;
  const api = list[formType] || {};
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.user.form.sections);
  const [values, setValues] = useState(data);
  const [yupSchema, setYupSchema] = useState(null); // Add yupSchema state
  const [userOptions, setUserOptions] = useState([]);

  const generateYupSchema = (sections) => {
    let schema = {};
    let fields = {};

    for (const section of sections) {
      for (const fieldName in section.inputs) {
        const input = section.inputs[fieldName];

        const { type, required, placeholder, min, max, value } = input;

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

        if (max !== undefined) {
          fieldSchema = fieldSchema.max(
            max,
            `${placeholder} must be at most ${max} characters`
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
          options(input?.lookupModule);
        } else if (type === "Owner") {
          fields[value] = "";
          optionsForOwner();
        } else {
          fields[value] = "";
        }
      }
    }
    setValues(values);
    return yup.object().shape(schema);
  };

  const onSubmit = async (values) => {
    let payload = { ...values };
    dataHandler(payload);
    closeModal();
  };

  useEffect(() => {
    if (sections) {
      if (Object.keys(sections)?.length > 0) {
        const schema = generateYupSchema(sections);
        setYupSchema(schema);
      }
    }
  }, [sections]);

  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
  }, []);

  const options = (lookupModule) => {
    let module = lookupModule;
    const items = [];
    dispatch(GET_LOOKUP(list[module]?.getApi)).then((res) => {
      if (res?.length > 0) {
        for (let item of res) {
          let _i = {
            value: item?._id,
            label: `${item?.ownerData?.firstName} ${item?.ownerData?.lastName}`,
          }
          items.push(_i);
        }
      }
    });
    return items;
  };

  const optionsForOwner = () => {
    let options = [];
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile.data.data[0];
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
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
        setUserOptions(options);
      }
    );
  };

  const fieldGenerator = (input) => {
    const { type, placeholder, value } = input;
    switch (type) {
      case "Multiselect":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1 flex justify-between items-center">
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mx-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select formbuilder-select"
                  name={input?.value}
                  options={input?.options}
                  component={CustomSelect}
                  placeholder={input?.placeholder}
                  isMulti={true}
                />
                <ErrorMessage
                  name={input?.value}
                  component="div"
                  className="errordisplay"
                />
              </div>
            </div>
          </div>
        );

      case "Select":
        return (
          <div key={input?.id} className="mb-3">
            <div
              className="form-group1 flex justify-between items-center"
              key={input?.value}
            >
              <label className="text-lg mx-2 text-[#929296] font-medium col-form-label">
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}

              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select formbuilder-select"
                  name={input?.value}
                  options={input?.options}
                  component={CustomSelect}
                  placeholder={input?.placeholder}
                  isMulti={false}
                />
                <ErrorMessage
                  name={input?.value}
                  component="div"
                  className="errordisplay"
                />
              </div>
            </div>
          </div>
        );

      case "Lookup":
        return (
          <div key={input?.id} className="mb-3">
            <div
              className="form-group1 flex justify-between items-center"
              key={input?.lookupModule[0]}
            >
              <label className=" text-lg mx-2 text-[#929296] font-medium col-form-label">
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <LookupModuleField
                  values={values}
                  setValues={setValues}
                  input={input}
                  editable={false}
                  CustomLookup={CustomLookup}
                />
                <ErrorMessage
                  name={input?.value}
                  component="div"
                  className="errordisplay"
                />
              </div>
            </div>
          </div>
        );

      case "Owner":
        return (
          <div key={input?.id} className="mb-3">
            <div
              className="form-group1 flex justify-between items-center"
              key={`${formType}OwnerId`}
            >
              <label className=" text-lg mx-2 text-[#929296] font-medium col-form-label">
                {" "}
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}

              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select formbuilder-select"
                  name={`${formType}OwnerId`}
                  options={userOptions}
                  component={CustomSelect}
                  placeholder={input?.placeholder}
                  isMulti={false}
                />
                <ErrorMessage
                  name={input?.value}
                  component="div"
                  className="errordisplay"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={input?.id} className="mb-3">
            <div
              className="form-group1 flex justify-between items-center"
              key={input?.value}
            >
              <label className=" text-lg mx-2  text-[#929296] font-medium col-form-label">
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  name={input?.value}
                  placeholder={input?.placeholder}
                  type={input?.type}
                  className={
                    input?.type === "checkbox"
                      ? "custom-control custom-checkbox"
                      : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  }
                />

                <ErrorMessage
                  name={input?.value}
                  component="div"
                  className="errordisplay"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {yupSchema && (
        <div className="min-h-screen">
          <Formik
            initialValues={values}
            validationSchema={yupSchema}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              onSubmit(values);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="p-5 bg-white rounded-xl mb-4" id="details">
                  <h5 className="font-semibold pb-4 border-b border-[#E6E6EB]">
                    Update {formType}
                  </h5>
                  {Object.entries(sections)?.map(([sectionTitle, section]) => (
                    <div
                      key={sectionTitle}
                      id="section-to-print"
                    // className="bg-[#F8F8FC] border-[1.5px] border-[#E6E6EB] p-5 rounded-2xl my-3"
                    >
                      <div className="p-5 bg-white rounded-xl mb-4">
                        <h1 className="font-semibold text-left mb-3">
                          {section?.formTitle}
                        </h1>
                        {/* <hr className="my-2 w-full bg-[#D6D6DA] h-[2px]" /> */}
                        {/* <div className="text-gray-700"> */}
                        <div className="grid md:grid-cols-1 ">
                          {Object.entries(section.inputs).map(
                            ([fieldName, input]) => fieldGenerator(input)
                          )}
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  ))}
                  <div className="my-5">
                    <div className="container mx-auto">
                      <div>
                        <div className="flex gap-3 justify-end mt-5">
                          <button
                            className="max-w-20 bg-primary rounded-2xl text-white py-2 px-10"
                            onClick={() => closeModal()}
                            type="button"
                          >
                            Back
                          </button>

                          <button
                            className="max-w-20 bg-primary rounded-2xl text-white py-2 px-10"
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default FormEditorForAssignmentRules;
