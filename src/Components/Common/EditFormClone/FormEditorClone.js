import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  GET_DETAIL,
  GET_USER_PROFILE,
  SAVE,
  UPDATE,
} from "../../../Redux/actions/user";
import { list } from "../../module";
import { GET_FORM } from "../../../Redux/actions/user";
import BreadCrumb from "../../breadcrumb";
import { CustomSelect } from "../Form/CustomSelect";
import { CustomLookup } from "../Form/CustomLookup";
import { GET_ALL_ACTIVE_USER } from "../../../Redux/actions/userList";
// import useAccessibleRole from "../../../hooks/useAccessibleRole";
import CustomDatePicker from "../Form/CustomDatePicker";
import LookupModuleFieldEdit from "../lookupModuleFieldEdit";
import FileUpload from "../Form/FileUpload";
import moment from "moment";
import { GET_ALL_PIPELINES } from "../../../Redux/actions/pipeline";
import GetFormByModuleName from "../getFormsByModuleName";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Leads", path: "/crm/leads" },
];

function FormEditorClone(props) {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const { formType, id, OverviewCheck = false } = props;
  const api = list[formType] || {};
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.user.form.sections);
  const [values, setValues] = useState({});
  const [pipelineData, setPipelineData] = useState();
  const [yupSchema, setYupSchema] = useState(null); // Add yupSchema state
  const editable = false
  const [userOption, setUserOptions] = useState([]);
  const detail = useSelector((state) => state.user.detail);
  // const listOfTags = useSelector((state) => state.user.listOfTags);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  // const { edit, write, delete: deleteValue } = useAccessibleRole(formType);
  // const location = useLocation();
  // const getConnectionId = location?.search?.split("?prePathname=");
  const [selectFromDate, setSelectFromDate] = useState(new Date());
  const [currentOwner, setCurrentOwner] = useState('')
  const [selectedLayout, setSelectedLayout] = useState({})

  const generateYupSchema = (sections) => {
    let schema = {};
    let fields = {};

    for (const section of sections) {
      for (const fieldName in section.inputs) {
        const input = section.inputs[fieldName];

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
          fields[value] = [];
          schema[value] = yup
            .array()
            .min(0, `Please select a value for ${placeholder}`);
        } else if (type === "Lookup") {
          fields[value] = "";
        } else if (type === "Owner") {
          fields[value] = "";
          // optionsForOwner();
        }
        else {
          fields[value] = "";
        }
      }
    }
    setValues(values);

    return yup.object().shape(schema);
  };

  const onSubmit = (values) => {
    values.id = id;
    dispatch(SAVE(api.saveApi, { ...values, [`${formType}FormId`]: selectedLayout?._id  }));
    navigate(-1)
  };

  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
  }, []);

  useEffect(() => {
    setValues(detail);
  }, [detail]);

  useEffect(() => {
    dispatch(GET_DETAIL(api.detailApi, id));
  }, [dispatch]);

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
    getAllPipelines();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (sections) {
      if (Object.keys(sections)?.length > 0) {
        const schema = generateYupSchema(sections);
        setYupSchema(schema);
      }
    }
  }, [sections]);

  const getDataForNormalOrByCondition = (type, defaulData) => {
    if (type?.toLowerCase().includes('pipeline')) {
      let items = pipelineData?.pipelineData
      let newValue = items?.map((item) => {
        return {
          label: item?.pipelineTitle,
          value: item?._id,
        };
      })
      return newValue
    } else if (type?.toLowerCase().includes('stage')) {
      let findItem = pipelineData?.pipelineData?.find(_it => _it?._id === selectedPipeline?.value)
      return findItem?.stages?.map((item) => {
        return {
          label: item?.stageTitle,
          value: item?._id,
        };
      })
    } else {
      return defaulData
    }
  }

  useEffect(() => {
    let options = [];
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      setCurrentOwner(resData?.userId)
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
  }, [])

  useEffect(() => {
    if (detail?._id) {
      setValues({ ...detail, [`${formType}OwnerId`]: currentOwner })
    }
  }, [currentOwner, detail])

  const fieldGenerator = (input) => {
    const { type } = input;
    switch (type) {
      case "Multiselect":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.value}>
              <>
                <label className="ml-2">{input?.label}</label>
                {input?.required && <span>{" *"}</span>}
                <div className="mt-2">
                  <Field
                    className="custom-select-edit"
                    name={input?.value}
                    values={values}
                    setValues={setValues}
                    options={input?.options}
                    component={CustomSelect}
                    placeholder={input?.label}
                    isMulti={false}
                    disabled={editable}
                  />
                </div>
              </>
            </div>
          </div>
        );

      case "Select":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.value}>
              <div key={input?.id} className="mb-3">
                <div className="form-group1" key={input?.value}>
                  <label className="ml-2">{input?.label}</label>
                  {input?.required && <span>{" *"}</span>}
                  <div className="mt-2">
                    <Field
                      values={values}
                      setValues={setValues}
                      className="custom-select-edit"
                      name={input?.value || ''}
                      options={getDataForNormalOrByCondition(input?.label, input?.options)}
                      setSelectedPipeline={setSelectedPipeline}
                      component={CustomSelect}
                      placeholder={input?.label}
                      isMulti={false}
                      disabled={editable}
                    />
                  </div>
                </div>
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
                <LookupModuleFieldEdit
                  values={values}
                  formType={formType}
                  setValues={setValues}
                  detail={detail}
                  input={input}
                  editable={editable}
                  CustomLookup={CustomLookup}
                />
              </div>
            </div>
          </div>
        );

      case "datetime-local":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.label}>
              {editable ? (
                <div>
                  <div className="px-2 font-semibold text-primary">
                    {input?.label} :
                  </div>
                  <div className="rounded-lg mt-2 p-2 bg-gray-50 flex justify-start items-center border">
                    {
                      values[input?.value]
                        ?
                        moment(new Date(values[input?.value])).format("MMMM Do YYYY, h:mm:ss a")
                        : values[input?.value]
                    }

                  </div>
                </div>
              ) : (
                <>
                  <label className="ml-2">{input?.label}</label>
                  {input?.required && <span>{" *"}</span>}
                  <div className="mt-3 rounded-lg p-0.5 bg-white flex justify-start items-center border">
                    <Field
                      setSelectFromDate={setSelectFromDate}
                      className="w-full"
                      values={values}
                      setValues={setValues}
                      name={input?.value || ''}
                      options={input?.options}
                      component={CustomDatePicker}
                      placeholder={input?.label}
                      isMulti={true}
                      disabled={editable}
                    />
                  </div>
                </>
              )}
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
                  values={values}
                  setValues={setValues}
                  className="custom-select-edit"
                  name={`${formType}OwnerId` || ''}
                  options={userOption}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={false}
                  disabled={editable}
                />
              </div>
            </div>
          </div>
        );
      case "user":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" >
              <label className="ml-2">
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  className="custom-select "
                  name={input?.value}
                  values={values}
                  setValues={setValues}
                  options={userOption}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={false}
                  disabled={editable}
                />
              </div>
            </div>
          </div>
        );

      case "textarea":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key="textarea">
              <>
                <label className="px-2 py-2 font-semibold text-primary">
                  {input?.label}
                </label>
                {input?.required && <span>{" *"}</span>}

                <div className="mt-2">
                  <Field
                    className="form-control w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-0 focus:border-primary"
                    name={input?.value}
                    values={values}
                    setValues={setValues}
                    placeholder={input?.label}
                    type={input?.type}
                    component={input?.type}
                    disabled={editable}
                    rows="2"
                  />
                </div>
              </>
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
                  className="custom-select"
                  name={input?.value}
                  values={values}
                  setValues={setValues}
                  component={FileUpload}
                  placeholder={input?.label}
                  isMulti={false}
                  dataValue={detail[input?.value]}
                  disabled={editable}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={input?.id} className="mb-3">
            <div
              className={`form-group1 ${input?.type === "checkbox" && !editable ? "flex" : ""
                }`}
              key={input?.value}
            >
              <>
                <label className="font-semibold text-primary">
                  {input?.label}
                </label>
                {input?.required && <span>{" *"}</span>}
                <div
                  className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"
                    }`}
                >
                  <Field
                    name={input?.value}
                    placeholder={input?.label}
                    type={input?.type}
                    disabled={editable}
                    className={
                      input?.type === "checkbox"
                        ? "custom-control custom-checkbox"
                        : "form-control w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-0 focus:border-primary"
                    }
                  />

                </div>
              </>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {yupSchema && (
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
            <Form className="min-h-screen container mx-auto">
              <div className="my-3">
                <div className="my-3 flex items-center justify-between">
                  <BreadCrumb
                    mainTitle="Clone Lead"
                    active={id}
                    breadcrumblist={breadcrumblist}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <GetFormByModuleName
                    selected={selectedLayout}
                    setSelected={setSelectedLayout}
                    modulename={formType} />
                  <div className="flex justify-end items-center">
                    <div className="flex justify-start gap-2">
                      <Link
                        to={api.redirectUrl}
                        className="px-2 bg-primary py-1.5 rounded text-white"
                      >
                        <div className="w-[40px]">Back</div>
                      </Link>
                      <button
                        className="bg-primary text-white px-2 py-2 w-[70px] rounded-lg"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {Object.entries(sections)?.map(([sectionTitle, section]) => (
                <div key={sectionTitle}>
                  <div className="p-5 bg-white rounded-xl mb-3">
                    <p className="font-semibold mb-3">{section?.formTitle}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(section.inputs).map(
                        ([fieldName, input]) => fieldGenerator(input)
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
  );
}

export default FormEditorClone;
