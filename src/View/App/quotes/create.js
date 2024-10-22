
import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
//import { list } from "../../module";

import { useFormik } from "formik";
//import * as Yup from "yup";
//import { useDispatch } from "react-redux";
import { CREATE__DATA_SaleOrder } from "../../../Redux/actions/quotes";
import { TRACK_TOUCH } from "../../../Redux/actions/comman";
import { Plus } from "react-feather";
import { DeleteIcon } from "../../../assets/svgIcons";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { useEffect } from "react";
import { GET_USER_PROFILE, SET_LOADER } from "../../../Redux/actions/user";
import { GET_FORM } from "../../../Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { list } from "../../../Components/module";
import CustomSelect from "../../../Components/Common/Form/CustomSelect";
import TextInputChanges from "../../../Components/Common/Form/textInputChanegs";
import FileUpload from "../../../Components/Common/Form/FileUpload";
import moment from "moment";
import LookupModuleField from "../../../Components/Common/lookupModuleField";
import CustomLookup from "../../../Components/Common/Form/CustomLookup";
import { GET_ALL_ACTIVE_USER } from "../../../Redux/actions/userList";
import PageLoader from "../../../Components/pageLoader";

let newFormValue;
const getTitle = (value) => {
  // console.log("value====>", value);
  let titleis = value ? value
    ?.replace(/([A-Z])/g, " $1")
    ?.replace(/^./, function (str) {
      return str?.toUpperCase();
    })
    :
    ""
  return titleis.replace(/_/g, "");
};
export const CreateQuotes = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { formType } = props;
  const { formType = "Quote" } = props;

  const api = list["Quotes"] || {};
  const { edit, write } = useAccessibleRole("Quotes");

  const sectionForm = useSelector((state) => state.user.form.sections);
  const [sections, setSectionsForm] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);

  const loading = useSelector((state) => state.user.loading);
  const parentModule = queryParams.get("parentModule");
  const [editable, setEditable] = useState(true);
  const location = useLocation();
  const [userOptions, setUserOptions] = useState([]);
  const detail = useSelector((state) => state.user.detail);
  const [values, setValues] = useState({});
  const [valuesOwner, setValuesOwner] = useState({});


  const [yupSchema, setYupSchema] = useState(null);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [open, setOpen] = useState(false);
  const [moduleName, setModuleName] = useState("quotes");

  const getConnectionId = location?.search
    ?.split("?connectionId=")[1]
    ?.split("?prePathname=");
  const detailPageIs = location?.search?.split("&detailPageIs=");
  const SignupSchema = yup.object().shape({
    Subject: yup.string().required("Subject is Required"),
  });
  const formik = useFormik({
    initialValues: {
      Subject: "",
      QuotesOwnerId: "",
      CustomerNo: "",
      QuoteName: "",
      Carrier: "",
      SalesCommission: "",
      AccountName: "",
      DealName: "",
      PurchaseOrder: "",
      DueDate: "",
      ContactName: "",
      ExciseDuty: "",
      Status: "",
      BillingStreet: "",
      BillingCity: "",
      BillingState: "",
      BillingCode: "",
      BillingCountry: "",
      ShippingStreet: "",
      ShippingCity: "",
      ShippingState: "",
      ShippingCode: "",
      ShippingCountry: "",
      orderedItems: [
        {
          inventoryName: "",
          quantity: "",
          listPrice: "",
          amount: "",
          discount: "",
          tax: "",
          total: "",
        },
      ],
      SubTotal: 0,
      Discount: 0,
      Tax: 0,
      Adjustment: 0,
      GrandTotal: 0,
      TermsAndConditions: "",
      Description: "",
    },
  });

  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
    // getAllPipelines();
    // eslint-disable-next-line
  }, []);

  const generateYupSchema = (sections) => {
    let schema = {};
    let fields = {};

    for (const section of sections) {

      let newArrayForms = [];

      if ((section?.inputs).length == 1) {
        //console.log("section?.inputs===g1g>", section?.inputs);
        // 
        // return;
        let TableHeading = []
        let TableHeadingObj = []
        // console.log("section?.inputs===gg>1", sections[0]);

        let myarrayy = (section?.inputs).map((itemm, indexx) => {
          console.log("itemm, indexx===>p", itemm, indexx);
          Object.entries(itemm).map(([itemmm, indexxx]) => {
            if (indexx == 0) {
              TableHeading.push(indexxx.label)
            }
            if (Object.entries(itemm).length > TableHeadingObj.length) {
              TableHeadingObj.push({ [indexxx.value]: indexxx.type == "number" ? 0 : "" })
            }
          });

        })
        console.log("TableHeading----->", TableHeading);
        let arrayformdata = [];
        for (let index = 0; index < (section?.inputs).length; index++) {
          arrayformdata.push(Object.assign({}, ...TableHeadingObj))

        }
        // console.log("valuesOwner===>", valuesOwner);
        setValues({
          ...values,
          orderedItems: [...arrayformdata],
          TableHeading: TableHeading,
          // ...valuesOwner
          //[input?.value]: e.target.value
        })
        // console.log("ganpati====>", {
        //   ...values,
        //   orderedItems: [...arrayformdata]
        //   //[input?.value]: e.target.value
        // });
        // End the code for table
        // for (let fieldName of section.inputs) {
        //   // console.log("fieldName===>", fieldName);
        //   for (let fieldNamek in fieldName) {
        //     const input = fieldName[fieldNamek];
        //     const { type, required, placeholder, min, maxLength, value } = input;
        //     //  console.log("fieldNamek--->", value, type, required, placeholder, min, maxLength);
        //     newArrayForms = [...newArrayForms, value]
        //     // newArrayForms = [...newArrayForms, [value] = ""]

        //     // newArrayForms = { fieldName[fieldNamek]: fieldName[fieldNamek].value };

        //     //  console.log("input===jshajdfd>11", newArrayForms);

        //     // const { type, required, placeholder, min, maxLength, value } = input;
        //     // let fieldSchema = yup.string().trim();

        //     // // newArrayForms.push(input[value]);
        //     // console.log("input===jshajdfd>--------", fields[value]);

        //   }
        //   const mappedObject = {};
        //   newArrayForms.map((item, index) => (mappedObject[item] = ""));
        //   // fields["newArrayForms"] = [...newArrayForms, mappedObject]
        //   fields["newArrayForms"] = [mappedObject]

        //   // const input = section.inputs[fieldName];
        //   // console.log("input==jkhkj=fd>", fieldName);

        //   // const { type, required, placeholder, min, maxLength, value } = input;

        //   //  let fieldSchema = yup.string().trim();


        //   // if (maxLength !== undefined) {
        //   //   fieldSchema = fieldSchema.max(
        //   //     maxLength,
        //   //     `${placeholder} must be at most ${maxLength} characters`
        //   //   );

        //   // } else {
        //   //   fields[value] = "";
        //   // }
        // }
      } else {


        for (const fieldName in section.inputs) {

          const input = section.inputs[fieldName];
          // console.log("input===fd>", input, input?.length, fieldName);

          const { type, required, placeholder, min, maxLength, value } = input;
          // console.log(
          //   "type, required, placeholder, min, maxLength, value",
          //   type,
          //   required,
          //   placeholder,
          //   min,
          //   maxLength,
          //   value
          // );
          let fieldSchema = yup.string().trim();

          if (required === true) {
            fieldSchema = fieldSchema.required(
              `Please enter a value for ${placeholder}`
            );
          }
          if (value === "CallDuration") {
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
          //  console.log("fieldSchema--<<<", fieldSchema);

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
    }

    console.log("fields---->", detail, (fields), values);
    const valueKey = Object.keys(fields);
    let obj = {};
    Object.entries(detail).forEach((item) => {
      if (valueKey?.includes(item[0])) {
        obj[item[0]] = item[1];
      }
    });
    console.log("...fields, ...obj===>", fields, obj);
    // setValues({ ...values });
    // console.log("objYUP", obj);
    return yup.object().shape(schema);
  };
  useEffect(() => {
    if (sectionForm) {

      setSectionsForm(sectionForm)

    }
    // eslint-disable-next-line
  }, [sectionForm]);

  // useEffect(() => {
  //   if (valuesOwner && values) {
  //     console.log("valuesOwner===fs=>", valuesOwner, values)

  //     setValues({
  //       ...values,
  //       ...valuesOwner
  //     })
  //   }
  // }, [values, valuesOwner])

  useEffect(() => {
    if (sections) {
      if (Object.keys(sections)?.length > 0) {
        const schema = generateYupSchema(sections);

        // console.log("schema====>", sections, schema);

        setYupSchema(schema);

      }
    }
    // eslint-disable-next-line
  }, [sections]);

  // const deleteItem = (index) => {
  //   const values = [...formik.values?.orderedItems];
  //   values.splice(index, 1);
  //   formik.setFieldValue("orderedItems", values);
  // };

  const deleteItem = (sections, index, sectionTitle) => {
    let newArr = (sections[sectionTitle].inputs).splice(index, 1)
    console.log("newValue==> b", newArr, sections);
    // sections[sectionTitle].inputs = (sections[sectionTitle].inputs).splice(index, 1);
    // console.log("newValue==> a", sections, index, sectionTitle);
    // const schema = generateYupSchema(sections);

    // setYupSchema(schema);
    setSectionsForm([...sections])

  };
  // const addItem = () => {
  //   const values = [...formik.values?.orderedItems];
  //   values.push({
  //     inventoryName: "",
  //     quantity: "",
  //     listPrice: "",
  //     amount: "",
  //     discount: "",
  //     tax: "",
  //     total: "",
  //   });
  //   formik.setFieldValue("orderedItems", values);
  // };
  const addItem = (sections, sectionTitle, section) => {
    // console.log("newValue==>", (sections[sectionTitle].inputs).concat(sections[sectionTitle].inputs));

    sections[sectionTitle].inputs = (sections[sectionTitle].inputs).concat([sections[sectionTitle].inputs[0]])
    // // console.log("sections, sectionTitle, section", sections[sectionTitle].inputs.push(section.inputs), sections, sectionTitle, [...(section?.inputs), ...(section.inputs)]);
    // console.log("newValue==>", sections, newValue);
    // console.log("newValue==>", sections);
    const schema = generateYupSchema(sections);
    let TableHeading = []
    let TableHeadingObj = []
    let myarrayy = (sections[sectionTitle].inputs).map((itemm, indexx) => {
      console.log("itemm, indexx===>p", itemm, indexx);
      Object.entries(itemm).map(([itemmm, indexxx]) => {
        if (indexx) {
          TableHeading.push(indexxx.label)
        }
        if (Object.entries(itemm).length > TableHeadingObj.length) {
          TableHeadingObj.push({ [indexxx.value]: indexxx.type == "number" ? 0 : "" })
        }
      });

    })

    setYupSchema(schema);
    setSectionsForm([...sections])
    let arrayformdata = [];
    for (let index = 0; index < (sections[sectionTitle].inputs).length; index++) {
      arrayformdata.push(Object.assign({}, ...TableHeadingObj))

    }
    setValues({
      ...values,
      orderedItems: [...arrayformdata],
      // TableHeading: TableHeading
      //[input?.value]: e.target.value
    })
    console.log("schema===myarrayyfgs=>", myarrayy, TableHeading, TableHeadingObj, arrayformdata);
    console.log("TableHeadingObj--->", Object.assign({}, ...TableHeadingObj))

  }
  const optionsForOwner = () => {
    let options = [];
    SET_LOADER(true)
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      const data = {
        ...values,
        [`${formType}OwnerId`]: resData?.userId,
        "QuotesOwnerId": resData?.userId
      };
      console.log("=={ ...values, data }===>", values.data);
      // setValues({ ...values, data });
      // setValues({ ...values, ...data });
      setTimeout(() => {
        setValues({ ...values, ...data });
        SET_LOADER(false)
        // setValuesOwner(data);

      }, 3000);
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
  useEffect(() => {
    dispatch(GET_USER_PROFILE()).then((res) => {
      if (res?.success) {
        formik.setFieldValue("QuotesOwnerId", res?.data?.data[0]?.userId);
      }
    });
  }, []);


  const getDataForNormalOrByCondition = (type, defaulData) => {
    // console.log("test<<<<=====", type, defaulData, pipelineData);
    // if (type?.toLowerCase().includes("pipeline")) {
    //   let items = pipelineData?.pipelineData;
    //   let newValue = items?.map((item) => {
    //     return {
    //       label: item?.pipelineTitle,
    //       value: item?._id,
    //     };
    //   });
    //   return newValue;
    // } else if (
    //   type?.toLowerCase().includes("Stage") ||
    //   type?.toLowerCase().includes("stage")
    // ) {
    //   if (pipelineData) {
    //     let findItem = pipelineData?.pipelineData?.find(
    //       (_it) => _it?._id === selectedPipeline?.value
    //     );
    //     if (findItem) {
    //       return findItem?.stages?.map((item) => {
    //         return {
    //           label: item?.stageTitle,
    //           value: item?._id,
    //         };
    //       });
    //     } else {
    //       return defaulData?.map((item) => {
    //         return {
    //           label: item?.label,
    //           value: item?.value,
    //         };
    //       });
    //     }
    //   } else {
    //     return defaulData?.map((item) => {
    //       return {
    //         label: item?.label,
    //         value: item?.value,
    //       };
    //     });
    //   }
    // } else {
    return defaulData;
    // }
  };
  const onSubmit = async (values) => {
    if (location && location?.state) {
      const { getConnectionId, moduleName, prePathname } =
        location && location?.state;

      let payload = {
        ...values,
        ModuleTitle: "quotes",
        ...(parentModule ? { parentModule: parentModule } : {}),
      };
      if (getConnectionId?.length > 1) {
        payload["connectionId"] = getConnectionId;
      }
      // console.log("payload===>", payload);
      await dispatch(CREATE__DATA_SaleOrder(payload));

      if (getConnectionId?.length > 1) {
        await dispatch(
          TRACK_TOUCH({ id: getConnectionId, module: detailPageIs })
        );
      }
      setTimeout(() => {
        navigate("/crm/quotes");
      }, 3000);
    } else {

      let orderedItems = values?.orderedItems.filter((item) => item["SrNo"])
      console.log("orderedItems===>", orderedItems)
      let payload = {
        ...values,
        "orderedItems": orderedItems,
        ModuleTitle: "quotes",
        ...(parentModule ? { parentModule: parentModule } : {}),
      };
      // let payload = {
      //   ...values,
      //   ModuleTitle: "quotes",
      //   ...(parentModule ? { parentModule: parentModule } : {}),
      // };
      if (getConnectionId?.length > 1) {
        payload["connectionId"] = getConnectionId[0];
      }
      console.log("payload--->", payload);

      dispatch(CREATE__DATA_SaleOrder(payload)).then(async () => {
        if (getConnectionId?.length > 1) {
          await dispatch(
            TRACK_TOUCH({
              id: getConnectionId[0],
              module: detailPageIs[1],
            })
          );
          navigate(getConnectionId[1]);
        } else {
          navigate("/crm/quotes");
        }
      });
    }
  };

  const fieldGenerator = (input, sectionTitle, fieldName, isArray) => {
    // console.log("inputinputinput555", input)

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
                    moduleName
                      ? moduleName
                      : input?.label?.toLowerCase().includes("related") ||
                      (formType === "Tasks" &&
                        input?.label?.toLowerCase().includes("contact"))
                  }
                  labelType={input?.lookupModule ? input?.lookupModule :
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

                {/* <button
                  className="modal__addBtn inline-block bg-zinc-200 text-black py-2 px-2 rounded"
                  style={{ borderRadius: "0", padding: "0 10px" }}
                  onClick={() => {
                    setQuickAddInput(input);
                    setOpen(true);
                  }}
                  type="button"
                >
                  Add
                </button> */}
                {/* {open &&
                  quickAddInput?.value === input.value &&
                  quickAddInput?.id === input.id && (
                    <QuickAdd modal={open} input={input} setModal={setOpen} />
                  )} */}
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
                    onChange={(e) => {
                      setValues({
                        ...values,
                        [input?.value]: e.target.value,
                      });
                    }}
                    disabled={false}
                    max="3099-12-31 00:00:00"
                    min={
                      values && values?.CallStartTime
                        ? values?.CallStartTime
                        : values?.From
                          ? values?.From
                          : null
                    }
                    className="custom-select border w-full p-2 rounded-lg"
                    name={input?.value}
                    placeholder={input?.label}
                  />

                </div>

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
              {input?.label?.includes("Duration") ? "( In Seconds)" : ""}
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
                    isArray={isArray}
                    sections={sections}
                    setValues={setValues}
                    component={TextInputChanges}
                    sectionTitleIndex={sectionTitle}
                    fieldNameIndex={fieldName}
                    className={
                      input?.type === "checkbox"
                        ? "custom-control custom-checkbox"
                        : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                    }
                  />
                </div>
              )}

            </div>
          </div>
        );
    }
  };
  const fieldArrayGenerator = (input, sectionTitle, fieldName, isArray) => {
    // console.log("inputinputinput555", input)

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
                    moduleName
                      ? moduleName
                      : input?.label?.toLowerCase().includes("related") ||
                      (formType === "Tasks" &&
                        input?.label?.toLowerCase().includes("contact"))
                  }
                  labelType={input?.lookupModule ? input?.lookupModule :
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

                {/* <button
                  className="modal__addBtn inline-block bg-zinc-200 text-black py-2 px-2 rounded"
                  style={{ borderRadius: "0", padding: "0 10px" }}
                  onClick={() => {
                    setQuickAddInput(input);
                    setOpen(true);
                  }}
                  type="button"
                >
                  Add
                </button> */}
                {/* {open &&
                  quickAddInput?.value === input.value &&
                  quickAddInput?.id === input.id && (
                    <QuickAdd modal={open} input={input} setModal={setOpen} />
                  )} */}
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
                    onChange={(e) => {
                      setValues({
                        ...values,
                        [input?.value]: e.target.value,
                      });
                    }}
                    disabled={false}
                    max="3099-12-31 00:00:00"
                    min={
                      values && values?.CallStartTime
                        ? values?.CallStartTime
                        : values?.From
                          ? values?.From
                          : null
                    }
                    className="custom-select border w-full p-2 rounded-lg"
                    name={input?.value}
                    placeholder={input?.label}
                  />

                </div>

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
              {input?.label?.includes("Duration") ? "( In Seconds)" : ""}
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
                    isArray={isArray}
                    sections={sections}
                    setValues={setValues}
                    component={TextInputChanges}
                    sectionTitleIndex={sectionTitle}
                    fieldNameIndex={fieldName}
                    className={
                      input?.type === "checkbox"
                        ? "custom-control custom-checkbox"
                        : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                    }
                  />
                </div>
              )}

            </div>
          </div>
        );
    }
  };
  const tableHeading = (input) => {
    console.log("input===>", input);
    let newArr = []
    newArr.push(input)
    console.log("newArr===>", newArr)
    return (
      newArr.map((item, index) => {
        <th
          scope="col"
          className="px-6 py-3  text-left font-medium"
        >
          {item?.input?.label}
        </th>
      })
    );

  }
  if (loading) {
    return <PageLoader title="Loading" />;
  }

  return (
    <>
      {console.log("fields===>", values, yupSchema)}
      <Formik
        enableReinitialize={true}
        // initialValues={formik.values}
        // validationSchema={SignupSchema}
        initialValues={values}
        validationSchema={yupSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values===>", values);
          // return
          setSubmitting(false);
          onSubmit(values);
        }}
      >
        {({ isSubmitting, errors, values, touched, handleChange, handleBlur, isValid }) => (

          <Form>
            {

              console.log("initialVavaluesvalueslues11", values)}

            <div className="flex items-center  flex-col">
              <div className="container">
                <div className="flex gap-3 justify-end mt-5">
                  <Link
                    className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
                    to="/crm/quotes"
                  >
                    Back
                  </Link>
                  {write && (
                    <button
                      className=" bg-primary rounded-2xl text-white py-2 px-10"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>

              <div className="container w-full">
                {sections && Object.entries(sections)?.map(([sectionTitle, section]) => (
                  <div key={sectionTitle + section} >
                    {/* {console.log("sectionTitle, section===>", sectionTitle, section)} */}
                    <div className="p-5 bg-white rounded-xl mb-4" style={{
                      backgroundColor: Array.isArray(section?.inputs) ? "" : "",
                      paddingBottom: Array.isArray(section?.inputs) ? "130px" : "0px"
                    }}>
                      {Array.isArray(section.inputs) ? null
                        :
                        <p className="font-semibold mb-3">{section?.formTitle}</p>}
                      <div className={Array.isArray(section?.inputs) ? "" : "grid md:grid-cols-2 gap-5"}>
                        {Array.isArray(section.inputs) ? <div className="bg-white rounded-md  p-4 my-2">
                          <div className="flex justify-between ">
                            <p className="mb-3 font-semibold capitalize">
                              {section?.formTitle}
                            </p>
                            <button
                              type="button"
                              className="btn adduser hover:bg-[#191242]   font-medium gap-3 bg-[#191242]   flex items-center text-white py-[14px] px-4 rounded-2xl btn-primary"
                              onClick={() => addItem(sections, sectionTitle, section)}
                            >
                              <Plus />
                              Add Item
                            </button>
                          </div>
                        </div> :
                          null}
                        {Array.isArray(section?.inputs) ?


                          <div className="container w-full">
                            <div className="flex flex-row w-full bg-gray-200 ">
                              {values?.TableHeading && values?.TableHeading?.map((item, index) => {
                                return (
                                  <div className="container w-full p-2 rounded-lg whitespace-wrap text-sm">
                                    <p
                                      className="font-semibold whitespace-wrap	 m-0.41 text-center	text-sm capitalize"
                                    //className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg whitespace-wrap text-sm"
                                    >   {item}</p>
                                  </div>
                                )
                              })}
                              <div className="container w-full p-2 rounded-lg whitespace-wrap text-sm">

                                <p
                                  className="font-semibold whitespace-wrap	 m-0.41 text-center	text-sm capitalize"
                                >{"Action"}</p>
                              </div>
                            </div>
                            <FieldArray name="people" className="container w-full bg-green-500 ">
                              {({ push, remove }) => (
                                <div className="container w-full">

                                  {/* {console.log("p, index-hhgds-->", values, section?.inputs)} */}
                                  {section?.inputs?.map((p, index) => {
                                    newFormValue = p;
                                    return (
                                      <div
                                        //className="flex flex-row bg-gray-200 w-20px	"
                                        className={`flex flex-row  w-400px  `}
                                      >
                                        {Object.entries(p).map(([fieldName, input]) => {
                                          console.log("p, index--gggdfvaluessg->", values)
                                          // { fieldArrayGenerator(input, index) }
                                          if (input.type == "Lookup") {
                                            return (
                                              <div
                                                className="  w-full rounded-lg  text-sm h-100px "

                                                // className="mt-2 widthfull"
                                                style={{ display: "flex", minWidth: "150px" }}
                                              >
                                                <LookupModuleField
                                                  changeModuleOption={
                                                    moduleName
                                                      ? moduleName
                                                      : input?.label?.toLowerCase().includes("related") ||
                                                      (formType === "Tasks" &&
                                                        input?.label?.toLowerCase().includes("contact"))
                                                  }
                                                  labelType={input?.lookupModule ? input?.lookupModule :
                                                    moduleName
                                                      ? moduleName
                                                      : input?.label?.toLowerCase().includes("related")
                                                        ? "related"
                                                        : input?.label?.toLowerCase().includes("contact")
                                                          ? "contacts"
                                                          : input?.value
                                                  }
                                                  // values={values?.orderedItems && (values?.orderedItems).length > 0 && values?.orderedItems[index]}
                                                  values={values}
                                                  //changeModuleOption={true}
                                                  formType={formType}
                                                  setValues={setValues}
                                                  input={input}
                                                  editable={false}
                                                  CustomLookup={CustomLookup}
                                                  open={open}
                                                  arrIndex={index}
                                                />
                                              </div>
                                            )
                                          } else {
                                            return (
                                              <input
                                                type={input.type}
                                                // type="number"
                                                // id="default-search"
                                                // className="block w-auto		 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg m-2 text-sm h-60px capitalize"
                                                placeholder={input?.label}
                                                name={input.value}

                                                // value={input.value}
                                                // value={values?.orderedItems[input?.value] || ""}
                                                // value={values?.orderedItems[index]?.[input?.value] || ""}

                                                // onChange={handleChange}
                                                onChange={(e) => {
                                                  // console.log("e.target.value--->", values.orderedItems, values.orderedItems[index], index, [input?.value], e.target.value)
                                                  values.orderedItems[index][input?.value] = e.target.value
                                                  setValues({
                                                    ...values,
                                                    // orderedItems: [{ [input?.value]: e.target.value }],
                                                    orderedItems: values.orderedItems,
                                                    //[input?.value]: e.target.value
                                                  })
                                                }}
                                              // onBlur={handleBlur}

                                              />

                                            )
                                          }
                                        })
                                        }
                                        {values?.orderedItems?.length > 1 ? (
                                          <div className="container w-full m-2">
                                            <span
                                              className="p-2 ml-2 inline-block rounded bg-[#FFEAEF]"
                                              onClick={() => deleteItem(sections, index, sectionTitle)}
                                            >
                                              <DeleteIcon />
                                            </span>
                                          </div>
                                        ) :
                                          <div className="container w-full">
                                            <span
                                              className="p-2 ml-2 inline-block rounded "
                                            >
                                            </span>
                                          </div>
                                        }
                                      </div>

                                    )




                                  })}

                                  {/* <button
                                    type="button"
                                    // className="text-red absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() =>
                                      addItem(sections, sectionTitle, section)

                                      // setSectionsForm("")
                                      // push(newFormValue)
                                      //push({ id: Math.random(), firstName: "", lastName: "" })
                                    }
                                  >Add
                                    {JSON.stringify(values)}
                                  </button> */}
                                </div>

                              )}

                            </FieldArray>
                          </div>

                          :
                          Object.entries(section.inputs).map(
                            ([fieldName, input]) =>
                              input?.value !== "CallEndTime" ||
                                (
                                  input?.value === "CallEndTime") ? (
                                <div key={fieldName}>
                                  {/* {input?.value ? fieldGenerator(input) : ""} */}
                                  {input?.value ? fieldGenerator(input) :
                                    (Object.entries(input).map(
                                      ([fieldName, input]) => (
                                        fieldGenerator(input)
                                      )
                                    ))
                                  }

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
                          )
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Form>
        )}
      </Formik >
    </>
  );
};

export default CreateQuotes;

// import { React, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// //import { list } from "../../module";

// import { useFormik } from "formik";
// //import * as Yup from "yup";
// //import { useDispatch } from "react-redux";
// import { CREATE__DATA_SaleOrder } from "../../../Redux/actions/quotes";
// import { TRACK_TOUCH } from "../../../Redux/actions/comman";
// import { Plus } from "react-feather";
// import { DeleteIcon } from "../../../assets/svgIcons";
// import useAccessibleRole from "../../../hooks/useAccessibleRole";
// import { useEffect } from "react";
// import { GET_USER_PROFILE } from "../../../Redux/actions/user";
// import { GET_FORM } from "../../../Redux/actions/user";
// import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";

// import { list } from "../../../Components/module";
// import CustomSelect from "../../../Components/Common/Form/CustomSelect";
// import TextInputChanges from "../../../Components/Common/Form/textInputChanegs";
// import FileUpload from "../../../Components/Common/Form/FileUpload";
// import moment from "moment";
// import LookupModuleField from "../../../Components/Common/lookupModuleField";
// import CustomLookup from "../../../Components/Common/Form/CustomLookup";
// import { GET_ALL_ACTIVE_USER } from "../../../Redux/actions/userList";

// const getTitle = (value) => {
//   // console.log("value====>", value);
//   let titleis = value ? value
//     ?.replace(/([A-Z])/g, " $1")
//     ?.replace(/^./, function (str) {
//       return str?.toUpperCase();
//     })
//     :
//     ""
//   return titleis.replace(/_/g, "");
// };
// export const CreateQuotes = (props) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { formType = "Quote" } = props;
//   // const { formType  } = props;

//   const api = list["Quote"] || {};
//   // const sections = useSelector((state) => state.user.form.sections);
//   const sectionForm = useSelector((state) => state.user.form.sections);
//   const [sections, setSectionsForm] = useState([]);

//   const queryParams = new URLSearchParams(window.location.search);
//   const parentModule = queryParams.get("parentModule");
//   const [editable, setEditable] = useState(true);
//   const location = useLocation();
//   const { edit, write } = useAccessibleRole("quotes");
//   const [userOptions, setUserOptions] = useState([]);
//   const detail = useSelector((state) => state.user.detail);
//   const [values, setValues] = useState({});
//   const [yupSchema, setYupSchema] = useState(null);
//   const [selectedPipeline, setSelectedPipeline] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [moduleName, setModuleName] = useState("quotes");

//   const getConnectionId = location?.search
//     ?.split("?connectionId=")[1]
//     ?.split("?prePathname=");
//   const detailPageIs = location?.search?.split("&detailPageIs=");
//   const SignupSchema = yup.object().shape({
//     Subject: yup.string().required("Subject is Required"),
//   });
//   const formik = useFormik({
//     initialValues: {
//       Subject: "",
//       QuotesOwnerId: "",
//       CustomerNo: "",
//       QuoteName: "",
//       Carrier: "",
//       SalesCommission: "",
//       AccountName: "",
//       DealName: "",
//       PurchaseOrder: "",
//       DueDate: "",
//       ContactName: "",
//       ExciseDuty: "",
//       Status: "",
//       BillingStreet: "",
//       BillingCity: "",
//       BillingState: "",
//       BillingCode: "",
//       BillingCountry: "",
//       ShippingStreet: "",
//       ShippingCity: "",
//       ShippingState: "",
//       ShippingCode: "",
//       ShippingCountry: "",
//       orderedItems: [
//         {
//           inventoryName: "",
//           quantity: "",
//           listPrice: "",
//           amount: "",
//           discount: "",
//           tax: "",
//           total: "",
//         },
//       ],
//       SubTotal: 0,
//       Discount: 0,
//       Tax: 0,
//       Adjustment: 0,
//       GrandTotal: 0,
//       TermsAndConditions: "",
//       Description: "",
//     },
//   });

//   useEffect(() => {
//     dispatch(GET_FORM(api.formApi));
//     // getAllPipelines();
//     // eslint-disable-next-line
//   }, []);

//   const generateYupSchema = (sections) => {
//     let schema = {};
//     let fields = {};

//     for (const section of sections) {
//       // console.log("section?.inputs===>1", section?.inputs);
//       let newArrayForms = [];
//       if (section?.inputs?.length > 0) {
//         // console.log("section?.inputs===>", section);
//         for (let fieldName of section.inputs) {
//           // console.log("fieldName===>", fieldName);
//           for (let fieldNamek in fieldName) {
//             const input = fieldName[fieldNamek];
//             const { type, required, placeholder, min, maxLength, value } = input;
//             //  console.log("fieldNamek--->", value, type, required, placeholder, min, maxLength);
//             newArrayForms = [...newArrayForms, value]
//             // newArrayForms = [...newArrayForms, [value] = ""]

//             // newArrayForms = { fieldName[fieldNamek]: fieldName[fieldNamek].value };

//             //  console.log("input===jshajdfd>11", newArrayForms);

//             // const { type, required, placeholder, min, maxLength, value } = input;
//             // let fieldSchema = yup.string().trim();

//             // // newArrayForms.push(input[value]);
//             // console.log("input===jshajdfd>--------", fields[value]);

//           }
//           const mappedObject = {};
//           newArrayForms.map((item, index) => (mappedObject[item] = ""));
//           // fields["newArrayForms"] = [...newArrayForms, mappedObject]
//           fields["newArrayForms"] = [mappedObject]

//           // const input = section.inputs[fieldName];
//           // console.log("input==jkhkj=fd>", fieldName);

//           // const { type, required, placeholder, min, maxLength, value } = input;

//           //  let fieldSchema = yup.string().trim();


//           // if (maxLength !== undefined) {
//           //   fieldSchema = fieldSchema.max(
//           //     maxLength,
//           //     `${placeholder} must be at most ${maxLength} characters`
//           //   );

//           // } else {
//           //   fields[value] = "";
//           // }
//         }
//       } else {


//         for (const fieldName in section.inputs) {

//           const input = section.inputs[fieldName];
//           // console.log("input===fd>", input, input?.length, fieldName);

//           const { type, required, placeholder, min, maxLength, value } = input;
//           // console.log(
//           //   "type, required, placeholder, min, maxLength, value",
//           //   type,
//           //   required,
//           //   placeholder,
//           //   min,
//           //   maxLength,
//           //   value
//           // );
//           let fieldSchema = yup.string().trim();

//           if (required === true) {
//             fieldSchema = fieldSchema.required(
//               `Please enter a value for ${placeholder}`
//             );
//           }
//           if (value === "CallDuration") {
//             fieldSchema = fieldSchema
//               .required("ERROR: The number is required!")
//               .test(
//                 "Is positive?",
//                 "ERROR: The number must be greater than 0!",
//                 (value) => value > 0
//               );
//           }
//           if (min !== undefined) {
//             fieldSchema = fieldSchema.min(
//               min,
//               `${placeholder} must be at least ${min} characters`
//             );
//           }
//           //  console.log("fieldSchema--<<<", fieldSchema);

//           if (maxLength !== undefined) {
//             fieldSchema = fieldSchema.max(
//               maxLength,
//               `${placeholder} must be at most ${maxLength} characters`
//             );
//           }

//           schema[value] = fieldSchema;
//           if (type === "Multiselect") {
//             input?.options?.map((item, i) => {
//               if (item.isDefault) {
//                 fields[value] = [item.value];
//               }
//             });
//             schema[value] = yup
//               .array()
//               .min(0, `Please select a value for ${placeholder}`);
//           } else if (type === "Lookup") {
//             fields[value] = "";
//           } else if (type === "Owner") {
//             fields[`${formType}OwnerId`] = userOptions[0]?.value || "";
//             optionsForOwner();
//           } else if (type === "Select") {
//             input?.options?.map((item, i) => {
//               if (item.isDefault) {
//                 fields[value] = item.value;
//               }
//             });
//           } else {
//             fields[value] = "";
//           }
//         }
//       }
//     }

//     console.log("fields---->", (fields), values);
//     const valueKey = Object.keys(fields);
//     let obj = {};
//     Object.entries(detail).forEach((item) => {
//       if (valueKey?.includes(item[0])) {
//         obj[item[0]] = item[1];
//       }
//     });
//     // setValues({ ...fields, ...obj });
//     setValues({});
//     // console.log("objYUP", obj);
//     return yup.object().shape(schema);
//   };

//   useEffect(() => {
//     if (sections) {
//       if (Object.keys(sections)?.length > 0) {
//         const schema = generateYupSchema(sections);
//         // console.log("schema====>", sections, schema);

//         setYupSchema(schema);
//       }
//     }
//     // eslint-disable-next-line
//   }, [sections]);

//   useEffect(() => {
//     if (sectionForm) {

//       setSectionsForm(sectionForm)
//     }
//     // eslint-disable-next-line
//   }, [sectionForm]);
//   // const deleteItem = (index) => {
//   //   const values = [...formik.values?.orderedItems];
//   //   values.splice(index, 1);
//   //   formik.setFieldValue("orderedItems", values);
//   // };

//   const deleteItem = (sections, index, sectionTitle) => {
//     let newArr = (sections[sectionTitle].inputs).splice(index, 1)
//     console.log("newValue==> b", newArr, sections);
//     // sections[sectionTitle].inputs = (sections[sectionTitle].inputs).splice(index, 1);
//     // console.log("newValue==> a", sections, index, sectionTitle);
//     // const schema = generateYupSchema(sections);

//     // setYupSchema(schema);
//     setSectionsForm([...sections])

//   };
//   // const addItem = () => {
//   //   const values = [...formik.values?.orderedItems];
//   //   values.push({
//   //     inventoryName: "",
//   //     quantity: "",
//   //     listPrice: "",
//   //     amount: "",
//   //     discount: "",
//   //     tax: "",
//   //     total: "",
//   //   });
//   //   formik.setFieldValue("orderedItems", values);
//   // };
//   const addItem = (sections, sectionTitle, section) => {
//     // console.log("newValue==>", (sections[sectionTitle].inputs).concat(sections[sectionTitle].inputs));

//     sections[sectionTitle].inputs = (sections[sectionTitle].inputs).concat([sections[sectionTitle].inputs[0]])
//     // // console.log("sections, sectionTitle, section", sections[sectionTitle].inputs.push(section.inputs), sections, sectionTitle, [...(section?.inputs), ...(section.inputs)]);
//     // console.log("newValue==>", sections, newValue);
//     // console.log("newValue==>", sections);
//     const schema = generateYupSchema(sections);
//     console.log("schema====>", sections, schema);

//     setYupSchema(schema);
//     setSectionsForm([...sections])

//   }
//   const optionsForOwner = () => {
//     let options = [];
//     dispatch(GET_USER_PROFILE()).then((profile) => {
//       const resData = profile?.data?.data[0];
//       options.push({
//         value: resData?.userId,
//         label: `${resData?.firstName} ${resData?.lastName}`,
//       });
//       const data = {
//         ...values,
//         [`${formType}OwnerId`]: resData?.userId,
//       };
//       setValues(data);
//       setUserOptions(options);
//     });

//     dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
//       (data) => {
//         // const options = userOptions;
//         const res = data?.data?.data?.usersData;
//         if (res?.length > 0) {
//           res?.map((item) => {
//             options.push({
//               value: item?._id,
//               label: `${item?.firstName} ${item?.lastName}`,
//             });
//           });
//         }
//       }
//     );
//     setUserOptions(options);
//   };
//   useEffect(() => {
//     dispatch(GET_USER_PROFILE()).then((res) => {
//       if (res?.success) {
//         formik.setFieldValue("QuotesOwnerId", res?.data?.data[0]?.userId);
//       }
//     });
//   }, []);


//   const getDataForNormalOrByCondition = (type, defaulData) => {
//     // console.log("test<<<<=====", type, defaulData, pipelineData);
//     // if (type?.toLowerCase().includes("pipeline")) {
//     //   let items = pipelineData?.pipelineData;
//     //   let newValue = items?.map((item) => {
//     //     return {
//     //       label: item?.pipelineTitle,
//     //       value: item?._id,
//     //     };
//     //   });
//     //   return newValue;
//     // } else if (
//     //   type?.toLowerCase().includes("Stage") ||
//     //   type?.toLowerCase().includes("stage")
//     // ) {
//     //   if (pipelineData) {
//     //     let findItem = pipelineData?.pipelineData?.find(
//     //       (_it) => _it?._id === selectedPipeline?.value
//     //     );
//     //     if (findItem) {
//     //       return findItem?.stages?.map((item) => {
//     //         return {
//     //           label: item?.stageTitle,
//     //           value: item?._id,
//     //         };
//     //       });
//     //     } else {
//     //       return defaulData?.map((item) => {
//     //         return {
//     //           label: item?.label,
//     //           value: item?.value,
//     //         };
//     //       });
//     //     }
//     //   } else {
//     //     return defaulData?.map((item) => {
//     //       return {
//     //         label: item?.label,
//     //         value: item?.value,
//     //       };
//     //     });
//     //   }
//     // } else {
//     return defaulData;
//     // }
//   };
//   const onSubmit = async (values) => {
//     if (location && location?.state) {
//       const { getConnectionId, moduleName, prePathname } =
//         location && location?.state;

//       let payload = {
//         ...values,
//         ModuleTitle: "quotes",
//         ...(parentModule ? { parentModule: parentModule } : {}),
//       };
//       if (getConnectionId?.length > 1) {
//         payload["connectionId"] = getConnectionId;
//       }
//       console.log("payload===>", payload);
//       await dispatch(CREATE__DATA_SaleOrder(payload));

//       if (getConnectionId?.length > 1) {
//         await dispatch(
//           TRACK_TOUCH({ id: getConnectionId, module: detailPageIs })
//         );
//       }
//       setTimeout(() => {
//         navigate("/crm/quotes");
//       }, 3000);
//     } else {
//       let payload = {
//         ...values,
//         ModuleTitle: "quotes",
//         ...(parentModule ? { parentModule: parentModule } : {}),
//       };
//       if (getConnectionId?.length > 1) {
//         payload["connectionId"] = getConnectionId[0];
//       }
//       console.log("payload--->", payload);
//       dispatch(CREATE__DATA_SaleOrder(payload)).then(async () => {
//         if (getConnectionId?.length > 1) {
//           await dispatch(
//             TRACK_TOUCH({
//               id: getConnectionId[0],
//               module: detailPageIs[1],
//             })
//           );
//           navigate(getConnectionId[1]);
//         } else {
//           navigate("/crm/quotes");
//         }
//       });
//     }
//   };
//   const fieldGenerator1 = (input) => {
//     console.log("fieldGenerator1===>", Object.entries(input))
//   }
//   const fieldGenerator = (input) => {
//     // console.log("inputinputinput555", input)

//     const { type } = input;

//     switch (type) {
//       case "Multiselect":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1" key={input?.value}>
//               <label className="ml-2">{input?.label}</label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2">
//                 <Field
//                   className="custom-select"
//                   name={input?.value || ""}
//                   values={values}
//                   setValues={setValues}
//                   options={input?.options}
//                   component={CustomSelect}
//                   placeholder={input?.label}
//                   isMulti={true}
//                 // disabled
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case "Select":
//         return (
//           <div
//             key={input?.id}
//             className={`${values["Repeat"] === "5" ? "flex" : ""}`}
//           >
//             <div className="form-group1 w-full" key={input?.value}>
//               <label className="ml-2">{input?.label}</label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2">
//                 <Field
//                   values={values}
//                   setValues={setValues}
//                   className="custom-select"
//                   name={input?.value || ""}
//                   options={getDataForNormalOrByCondition(
//                     input?.label,
//                     input?.options
//                   )}
//                   setSelectedPipeline={setSelectedPipeline}
//                   component={CustomSelect}
//                   placeholder={input?.label}
//                   isMulti={false}
//                 />
//               </div>
//             </div>
//             {input.value === "Repeat" && values["Repeat"] === "5" && (
//               <div key={input?.id} className="mb-3">
//                 <div className="form-group1 ml-3 w-full">
//                   <label className="ml-2">Date</label>
//                   <span>{" *"}</span>
//                   <div className="mt-2">
//                     <input
//                       type={"datetime-local"}
//                       value={values["CustomDate"] || ""}
//                       max="3099-12-31 00:00:00"
//                       onChange={(e) =>
//                         setValues({ ...values, CustomDate: e.target.value })
//                       }
//                       className="custom-select border w-full p-2 rounded-lg"
//                       name={"CustomDate"}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       case "Lookup":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1" key={input?.lookupModule[0]}>
//               <label className="ml-2">{getTitle(input?.label)}</label>
//               {input?.required && <span>{" *"}</span>}
//               {console.log("input?.label==values=>", values)}
//               <div className="mt-2 widthfull" style={{ display: "flex" }}>
//                 <LookupModuleField
//                   changeModuleOption={
//                     moduleName
//                       ? moduleName
//                       : input?.label?.toLowerCase().includes("related") ||
//                       (formType === "Tasks" &&
//                         input?.label?.toLowerCase().includes("contact"))
//                   }
//                   labelType={
//                     moduleName
//                       ? moduleName
//                       : input?.label?.toLowerCase().includes("related")
//                         ? "related"
//                         : input?.label?.toLowerCase().includes("contact")
//                           ? "contacts"
//                           : ""
//                   }
//                   values={values}
//                   //changeModuleOption={true}
//                   formType={formType}
//                   setValues={setValues}
//                   input={input}
//                   editable={false}
//                   CustomLookup={CustomLookup}
//                   open={open}
//                 />

//                 {/* <button
//                   className="modal__addBtn inline-block bg-zinc-200 text-black py-2 px-2 rounded"
//                   style={{ borderRadius: "0", padding: "0 10px" }}
//                   onClick={() => {
//                     setQuickAddInput(input);
//                     setOpen(true);
//                   }}
//                   type="button"
//                 >
//                   Add
//                 </button> */}
//                 {/* {open &&
//                   quickAddInput?.value === input.value &&
//                   quickAddInput?.id === input.id && (
//                     <QuickAdd modal={open} input={input} setModal={setOpen} />
//                   )} */}
//               </div>
//             </div>
//           </div>
//         );

//       case "datetime-local":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1" key={`${formType}OwnerId`}>
//               <label className="ml-2">{input?.label}</label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2 flex justify-start items-center w-full space-x-3">
//                 <div className="w-full">
//                   <input
//                     type={type}
//                     value={values[input?.value] || ""}
//                     onChange={(e) => {
//                       setValues({
//                         ...values,
//                         [input?.value]: e.target.value,
//                       });
//                     }}
//                     disabled={false}
//                     max="3099-12-31 00:00:00"
//                     min={
//                       values && values?.CallStartTime
//                         ? values?.CallStartTime
//                         : values?.From
//                           ? values?.From
//                           : null
//                     }
//                     className="custom-select border w-full p-2 rounded-lg"
//                     name={input?.value}
//                     placeholder={input?.label}
//                   />

//                 </div>

//               </div>
//             </div>
//           </div>
//         );

//       case "Owner":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1" key={`${formType}OwnerId`}>
//               <label className="ml-2">
//                 {getTitle(formType)} {input?.label}
//               </label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2">
//                 <Field
//                   values={values}
//                   setValues={setValues}
//                   className="custom-select "
//                   name={`${formType}OwnerId`}
//                   options={userOptions}
//                   component={CustomSelect}
//                   placeholder={input?.label}
//                   isMulti={false}
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case "user":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1">
//               <label className="ml-2">{input?.label}</label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2">
//                 <Field
//                   values={values}
//                   setValues={setValues}
//                   className="custom-select "
//                   name={input?.value}
//                   options={userOptions}
//                   component={CustomSelect}
//                   placeholder={input?.label}
//                   isMulti={false}
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case "date":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1">
//               <label className="ml-2">{input?.label}</label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2">
//                 <input
//                   type={type}
//                   value={
//                     values[input?.value]
//                       ? moment(values[input?.value]).format("YYYY-MM-DD")
//                       : "" || ""
//                   }
//                   onChange={(e) =>
//                     setValues({ ...values, [input?.value]: e.target.value })
//                   }
//                   max={"3099-12-31"}
//                   className="custom-select border w-full p-2 rounded-lg"
//                   name={input?.value}
//                   placeholder={input?.label}
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case "textarea":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1" key="textarea">
//               <label className="ml-2">
//                  {input?.label}
//               </label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2">
//                 <Field
//                   rows="2"
//                   input={input}
//                   // name={input?.value || ''}
//                   placeholder={input?.label}
//                   type={input?.type}
//                   values={values}
//                   formType={formType}
//                   setValues={setValues}
//                   component={TextInputChanges}
//                   className={
//                     input?.type === "checkbox"
//                       ? "custom-control custom-checkbox"
//                       : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case "file":
//         return (
//           <div key={input?.id} className="mb-3">
//             <div className="form-group1" key={`${formType}OwnerId`}>
//               <label className="ml-2">
//                  {input?.label}
//               </label>
//               {input?.required && <span>{" *"}</span>}
//               <div className="mt-2">
//                 <Field
//                   className="custom-select "
//                   name={input?.value}
//                   component={FileUpload}
//                   placeholder={input?.label}
//                   isMulti={false}
//                   dataValue={values[input?.value]}
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div key={input?.id} className="mb-3">
//             <div
//               className={`form-group1  ${input?.type === "checkbox" ? "flex" : ""
//                 } flex-column`}
//               key={input?.value}
//             >
//               {input?.label}{" "}
//               {input?.label?.includes("Duration") ? "( In Seconds)" : ""}
//               {input?.required && <span>{" *"}</span>}
//               {input?.type === "checkbox" ? (
//                 <div
//                   className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"}`}
//                 >
//                   <input
//                     type={type}
//                     value={values[input?.value] || ""}
//                     onChange={(e) =>
//                       setValues({ ...values, [input?.value]: e.target.value })
//                     }
//                     setValues={setValues}
//                     className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg"
//                     name={input?.value}
//                     placeholder={input?.label}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"}`}
//                 >
//                   <Field
//                     input={input}
//                     placeholder={input?.label}
//                     type={input?.type}
//                     values={values}
//                     formType={formType}
//                     setValues={setValues}
//                     component={TextInputChanges}
//                     className={
//                       input?.type === "checkbox"
//                         ? "custom-control custom-checkbox"
//                         : "form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                     }
//                   />
//                 </div>
//               )}

//             </div>
//           </div>
//         );
//     }
//   };
//   return (
//     <>
//       <Formik
//         enableReinitialize={true}
//         // initialValues={formik.values}
//         // validationSchema={SignupSchema}
//         initialValues={values}
//         validationSchema={yupSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           setSubmitting(false);
//           onSubmit(values);
//         }}
//       >
//         {({ isSubmitting, errors }) => (
//           <Form>
//             <div className="flex items-center  flex-col">
//               <div className="container">
//                 <div className="flex gap-3 justify-end mt-5">
//                   <Link
//                     className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
//                     to="/crm/quotes"
//                   >
//                     Back
//                   </Link>
//                   {write && (
//                     <button
//                       className=" bg-primary rounded-2xl text-white py-2 px-10"
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                       Save
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="container">
//                 {sections && Object.entries(sections)?.map(([sectionTitle, section]) => (
//                   <div key={sectionTitle + section}>
//                     {/* {console.log("sectionTitle, section===>", sectionTitle, section)} */}
//                     <div className="p-5 bg-white rounded-xl mb-4">
//                       {Array.isArray(section.inputs) ? <p className="font-semibold mb-3"
//                         onClick={() => addItem(sections, sectionTitle, section)}
//                       >{section.formTitle} {`    `}
//                         <div
//                           // className=" bg-primary rounded-2xl text-white py-2 px-10 mx-2"
//                           className="bg-primary rounded-2xl text-white py-2 px-10 mx-2"
//                           style={{ width: "200px" }}

//                         >
//                           <b>Add Items</b>
//                         </div>
//                       </p>
//                         :
//                         <p className="font-semibold mb-3">{section.formTitle}</p>}
//                       <div className="grid md:grid-cols-2 gap-5">
//                         {Array.isArray(section?.inputs) ?
//                           // console.log("dfgfd.inputs==>", section.inputs)
//                           (section.inputs).map((input, fieldName) => {
//                             return (
//                               <div key={fieldName + "test"}>
//                                 {/* {input?.value ? fieldGenerator(input) : ""} */}
//                                 {
//                                   (Object.entries(input).map(
//                                     ([fieldName_e, input]) => (
//                                       <>
//                                         {fieldGenerator(input, sectionTitle, fieldName)}



//                                       </>
//                                     )
//                                   ))
//                                 }



//                                 {(section.inputs)?.length > 1 ? <div className="flex flex-row"
//                                   onClick={() => deleteItem(sections, fieldName, sectionTitle)}
//                                 >
//                                   <div
//                                     className=" bg-primary rounded-2xl text-white py-2 px-10"
//                                   >
//                                     Remove
//                                   </div>

//                                 </div>
//                                   : null
//                                 }

//                               </div>
//                             )
//                           })
//                           :
//                           Object.entries(section.inputs).map(
//                             ([fieldName, input]) =>
//                               input?.value !== "CallEndTime" ||
//                                 (
//                                   input?.value === "CallEndTime") ? (
//                                 <div key={fieldName}>
//                                   {/* {input?.value ? fieldGenerator(input) : ""} */}
//                                   {input?.value ? fieldGenerator(input) :
//                                     (Object.entries(input).map(
//                                       ([fieldName, input]) => (
//                                         // <div className="flex flex-row">
//                                         fieldGenerator(input)
//                                         // </div>
//                                       )
//                                     ))
//                                   }

//                                   {/* {errors[input?.value] && input?.required ? (
//                                 <small className="text-red-400">
//                                   {errors[input?.value]}
//                                 </small>
//                               ) : (
//                                 errors[input?.value] && (
//                                   <small className="text-red-400">
//                                     {errors[input?.value]}
//                                   </small>
//                                 )
//                               )} */}
//                                 </div>
//                               ) : (
//                                 ""
//                               )
//                           )
//                         }
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default CreateQuotes;

// import React from "react";
// import FormBuilder from "../../../Components/Common/Form/FormBuilder";

// function CreateQuotes() {
//   return <FormBuilder formType="Quote" />;
// }

// export default CreateQuotes;
