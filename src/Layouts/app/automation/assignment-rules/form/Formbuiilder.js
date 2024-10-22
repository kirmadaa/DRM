import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { GET_USER_PROFILE } from "../../../../../Redux/actions/user";
import { list } from "../../../../../Components/module";
import { GET_FORM, GET_LOOKUP } from "../../../../../Redux/actions/user";
import { CustomSelect } from "../../../../../Components/Common/Form/CustomSelect";
import { CustomLookup } from "../../../../../Components/Common/Form/CustomLookup";
import { GET_ALL_ACTIVE_USER } from "../../../../../Redux/actions/userList";
import LookupModuleField from '../../../../../Components/Common/lookupModuleField'

function FormBuilderForAssignmentRules(props) {
  const { formType, dataHandler, closeModal } = props;
  const api = list[formType] || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [values, setValues] = useState({});
  const [yupSchema, setYupSchema] = useState(null);
  const getConnectionId = location?.search
    ?.split("?connectionId=")[1]
    ?.split("?prePathname=");

  const redriect = useSelector((state) => state.user.redriect);
  const sections = useSelector((state) => state.user.form.sections);
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
          fields[`${formType}OwnerId`] = userOptions[0]?.value || "";
          optionsForOwner();
        } else {
          fields[value] = "";
        }
      }
    }
    setValues(fields);
    return yup.object().shape(schema);
  };

  const onSubmit = async (values) => {
    let payload = { ...values };
    dataHandler(payload);
    closeModal();
  };

  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
  }, []);

  useEffect(() => {
    if (sections) {
      if (Object.keys(sections)?.length > 0) {
        const schema = generateYupSchema(sections);
        setYupSchema(schema);
      }
    }
  }, [sections]);

  useEffect(() => {
    if (redriect) {
      if (getConnectionId?.length > 1) {
        navigate(getConnectionId[1]);
      } else {
        navigate(api.redirectUrl);
      }
    }
  }, [redriect]);


  const options = (lookupModule) => {
    let module = lookupModule;
    const items = [];
    dispatch(GET_LOOKUP(list[module]?.getApi)).then((res) => {
      if (res?.length > 0) {
        for (let item of res) {
          let _i = {
            value: item?._id,
            label: `${item?.FirstName} ${item?.LastName}`,
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
      const data = {
        ...values,
        [`${formType}OwnerId`]: resData?.userId,
      };
      setValues(data);
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
    const { type } = input;
    switch (type) {
      case "Multiselect":
        return (
          <div key={input?.id} className="mb-3">
            <div
              className="form-group1 flex justify-between items-center"
              key={input?.value}
            >
              <label className="mx-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select formbuilder-select "
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
              <label className=" text-lg mx-2 text-[#929296] font-medium col-form-label">
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
                  name={`${formType}OwnerId`}
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
              <div className="mt-2 ">
                <Field
                  name={input?.value}
                  placeholder={input?.placeholder}
                  type={input?.type}
                  className={
                    input?.type === "checkbox"
                      ? "custom-control custom-checkbox"
                      : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  }
                  autoFocus={true}
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
    <>
      {sections && (
        <div className="min-h-screen">
          {yupSchema && (
            <Formik
              initialValues={values}
              validationSchema={yupSchema}
              validateOnChange={false}
              validateOnBlur={false}
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                onSubmit(values);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className="p-5 bg-white rounded-xl mb-4">
                    <h5 className="font-semibold pb-4 border-b border-[#E6E6EB]">
                      Create {formType}
                    </h5>

                    {Object.entries(sections)?.map(
                      ([sectionTitle, section]) => (
                        <div key={sectionTitle}>
                          <div className="p-5 bg-white rounded-xl mb-4">
                            <p className="font-semibold text-left mb-3">
                              {section.formTitle}
                            </p>
                            <div className="grid md:grid-cols-1 ">
                              {Object.entries(section.inputs).map(
                                ([fieldName, input]) => fieldGenerator(input)
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
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
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      )}
    </>
  );
}

export default FormBuilderForAssignmentRules;
