
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
//import { list } from "../../module";

import { useFormik } from "formik";
//import * as Yup from "yup";
//import { useDispatch } from "react-redux";
import { CREATE__DATA_SaleOrder } from "../../../Redux/actions/saleOrder";
import { TRACK_TOUCH } from "../../../Redux/actions/comman";
import { Plus } from "react-feather";
import { DeleteIcon } from "../../../assets/svgIcons";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { GET_USER_PROFILE } from "../../../Redux/actions/user";
import { GET_FORM } from "../../../Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { list } from "../../../Components/module";
import CustomSelect from "../../../Components/Common/Form/CustomSelect";
import TextInputChanges from "../../../Components/Common/Form/textInputChanegs";
import FileUpload from "../../../Components/Common/Form/FileUpload";
import moment from "moment";
// import LookupModuleField from "../../../Components/Common/lookupModuleField";
import LookupModuleFieldEdit from "../../../Components/Common/lookupModuleFieldEdit";

import CustomLookup from "../../../Components/Common/Form/CustomLookup";
import { GET_ALL_ACTIVE_USER } from "../../../Redux/actions/userList";


import { useParams } from "react-router-dom";
import {
  UPDATE__DATA_SaleOrder,
  GET_DATA_BY_ID_SaleOrder,
} from "../../../Redux/actions/saleOrder";

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
export const SaleOrderDetail = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { formType } = props;
  const { formType = "SalesOrder" } = props;

  const api = list["salesOrder"] || {};
  const { edit, write } = useAccessibleRole("saleorders");

  const sectionForm = useSelector((state) => state.user.form.sections);
  const [sections, setSectionsForm] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const parentModule = queryParams.get("parentModule");
  const [editable, setEditable] = useState(true);
  const location = useLocation();
  const [userOptions, setUserOptions] = useState([]);
  // const detail = useSelector((state) => state.user.detail);
  const [values, setValues] = useState({});
  const [yupSchema, setYupSchema] = useState(null);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [open, setOpen] = useState(false);
  const [moduleName, setModuleName] = useState("SalesOrder");

  const detail = useSelector((state) => state.Saleorder.Detail);
  const { id } = useParams();




  const getConnectionId = location?.search
    ?.split("?connectionId=")[1]
    ?.split("?prePathname=");

  const detailPageIs = location?.search?.split("&detailPageIs=");
  // const SignupSchema = yup.object().shape({
  //   Subject: yup.string().required("Subject is Required"),
  // });
  const formik = useFormik({
    initialValues: {
      Subject: "",
      SaleorderOwnerId: "",
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
    dispatch(GET_DATA_BY_ID_SaleOrder(id));
  }, []);


  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
    // getAllPipelines();
    // eslint-disable-next-line
  }, []);

  const generateYupSchema = (sections, detail) => {
    let schema = {};
    let fields = {};
    let TableHeading = []
    let TableHeadingObj = []
    let arrayformdata = [];
    let myarrayy
    sections.map((section, sectionTitle) => {
      if (Array.isArray(section?.inputs)) {
        console.log("section?.inputs)?.length--630256023--> ", detail, (detail?.orderedItems)?.length);


        if ((detail?.orderedItems)?.length > 0) {
          // console.log("section?.inputs)?.length----> ", sectionTitle, detail, (section?.inputs)?.length);

          // for (let index = 1; index < (detail?.orderedItems)?.length; index++) {
          sections[sectionTitle].inputs = (sections[sectionTitle].inputs).concat([sections[sectionTitle].inputs[0]])
          //}
        } else {
          // console.log("section?.inputs)?.length----> ", sectionTitle, detail, (section?.inputs)?.length);

          sections[sectionTitle].inputs = ([]).concat([sections[sectionTitle].inputs[0]])
        }

        myarrayy = (sections[sectionTitle].inputs).map((itemm, indexx) => {
          Object.entries(itemm).map(([itemmm, indexxx]) => {
            if (indexx == 0) {
              TableHeading.push(indexxx.label)
            }
            if (Object.entries(itemm)?.length > TableHeadingObj?.length) {
              TableHeadingObj.push({ [indexxx.value]: indexxx.type == "number" ? 0 : "" })
            }
          });
        })

        // for (let index = 0; index < (section?.inputs)?.length; index++) {
        //   arrayformdata.push(Object.assign({}, ...TableHeadingObj))
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
          }
          // else if (type === "Lookup") {
          //   fields[value] = "";
          // } 
          else if (type === "Owner") {
            fields[`${formType}OwnerId`] = userOptions[0]?.value || "";
            optionsForOwner();
          }
          // else if (type === "Select") {
          //   input?.options?.map((item, i) => {
          //     if (item.isDefault) {
          //       fields[value] = item.value;
          //     }
          //   });
          // } 
          else {
            fields[value] = "";
          }
        }
      }










      console.log("arrayformdata==myarrayy=>", arrayformdata, TableHeading, TableHeadingObj, myarrayy);


      setValues({
        ...detail,
        orderedItems: detail?.orderedItems ? [...detail?.orderedItems] : null,
        // TableHeading: values?.TableHeading ? values.TableHeading : TableHeading
        TableHeading: TableHeading

        //[input?.value]: e.target.value
      })
      console.log("ganpati====>", {
        ...detail,
        orderedItems: [...arrayformdata],
        TableHeading: TableHeading
        //[input?.value]: e.target.value
      });




    })
















    console.log("fields---sections->", sections, detail, (fields), values);
    setSectionsForm(sections)
    const valueKey = Object.keys(fields);
    let obj = {};
    // Object.entries(detail).forEach((item) => {
    //   if (valueKey?.includes(item[0])) {
    //     obj[item[0]] = item[1];
    //   }
    // });
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

  useEffect(() => {
    if (sections && detail?._id) {
      if (Object.keys(sections)?.length > 0) {
        const schema = generateYupSchema(sections, detail);
        // console.log("schema====>", sections, schema);

        setYupSchema(schema);
      }
    }
    // eslint-disable-next-line
  }, [sections, detail]);

  // const deleteItem = (index) => {
  //   const values = [...formik.values?.orderedItems];
  //   values.splice(index, 1);
  //   formik.setFieldValue("orderedItems", values);
  // };

  const deleteItem = (sections, index, sectionTitle) => {
    console.log("newValue==> before", values, sections, index, sectionTitle);
    let newArr = (sections[sectionTitle].inputs).splice(index, 1)
    let newArr1 = values.orderedItems.splice(index, 1)
    console.log("newValue==> after", values, newArr1, sections, index, sectionTitle);
    // setSectionsForm([...sections])
    setValues({
      ...values,
      orderedItems: values.orderedItems
    })
    // return

    // console.log("newValue==> b", newArr, sections);
    // sections[sectionTitle].inputs = (sections[sectionTitle].inputs).splice(index, 1);
    // const schema = generateYupSchema(sections);

    // setYupSchema(schema);
    // setSectionsForm([...sections])

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
    console.log("newValue==>", sections, sectionTitle, section);
    // sections[sectionTitle].inputs = (sections[sectionTitle].inputs).concat([sections[sectionTitle].inputs[0]])
    // // console.log("sections, sectionTitle, section", sections[sectionTitle].inputs.push(section.inputs), sections, sectionTitle, [...(section?.inputs), ...(section.inputs)]);
    // console.log("newValue==>", sections, newValue);
    // console.log("newValue==>", sections);
    const schema = generateYupSchema(sections, values);
    // let TableHeading = []
    // let TableHeadingObj = []
    // let myarrayy = (sections[sectionTitle].inputs).map((itemm, indexx) => {
    //   console.log("itemm, indexx===>p", itemm, indexx);
    //   Object.entries(itemm).map(([itemmm, indexxx]) => {
    //     if (indexx) {
    //       TableHeading.push(indexxx.label)
    //     }
    //     if (Object.entries(itemm).length > TableHeadingObj.length) {
    //       TableHeadingObj.push({ [indexxx.value]: indexxx.type == "number" ? 0 : "" })
    //     }
    //   });

    // })

    setYupSchema(schema);
    // setSectionsForm([...sections])
    // let arrayformdata = [];
    // for (let index = 0; index < (sections[sectionTitle].inputs).length; index++) {
    //   arrayformdata.push(Object.assign({}, ...TableHeadingObj))

    // }
    // setValues({
    //   ...values,
    //   orderedItems: [...arrayformdata],
    //   // TableHeading: TableHeading
    //   //[input?.value]: e.target.value
    // })
    // console.log("shema===myarrayfygs=>c", values, myarrayy, TableHeading, TableHeadingObj, arrayformdata);
    // console.log("TableHeadingObj--->", Object.assign({}, ...TableHeadingObj))

  }
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
      console.log("=={ ...values, data }===>", { ...values, ...data });
      setTimeout(() => {
        setValues({ ...values, ...data });

        // setValuesOwner(data);
      }, 3000);
      // setValues({ ...values, data });
      // setValues({ ...values, ...data });

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
        formik.setFieldValue({ formType } + "OwnerId", res?.data?.data[0]?.userId);
      }
    });
  }, []);
  // useEffect(() => {
  //   setValues(detail);
  // }, [detail]);

  // useEffect(() => {
  //   if (detail?._id) {
  //     setValues({ ...detail, [`SalesOrderOwnerId`]: detail?.SalesOrderOwnerId });
  //   }
  // }, [detail]);
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
        ModuleTitle: "saleOrders",
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
        navigate("/crm/saleorder");
      }, 3000);
    } else {
      let payload = {
        ...values,
        ModuleTitle: "saleOrders",
        ...(parentModule ? { parentModule: parentModule } : {}),
      };
      if (getConnectionId?.length > 1) {
        payload["connectionId"] = getConnectionId[0];
      }
      console.log("payload--dfs->", payload);

      dispatch(UPDATE__DATA_SaleOrder(payload)).then(async () => {
        if (getConnectionId?.length > 1) {
          await dispatch(
            TRACK_TOUCH({
              id: getConnectionId[0],
              module: detailPageIs[1],
            })
          );
          navigate(getConnectionId[1]);
        } else {
          navigate("/crm/saleorder");
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
                <LookupModuleFieldEdit
                  // changeModuleOption={
                  //   moduleName
                  //     ? moduleName
                  //     : input?.value?.toLowerCase().includes("related") ||
                  //     (formType === "Tasks" &&
                  //       input?.value?.toLowerCase().includes("contact"))
                  // }
                  // labelType={input?.lookupModule ? input?.lookupModule :
                  //   moduleName
                  //     ? moduleName
                  //     : input?.value?.toLowerCase().includes("related")
                  //       ? "related"
                  //       : input?.value?.toLowerCase().includes("contact")
                  //         ? "contacts"
                  //         : input?.value
                  // }
                  // values={values}
                  // //changeModuleOption={true}
                  // formType={formType}
                  // setValues={setValues}
                  // input={input}
                  // editable={false}
                  // CustomLookup={CustomLookup}
                  // open={open}


                  labelType={values?.RelatedTitle ? values?.RelatedTitle : input?.lookupModule ? input?.lookupModule :
                    moduleName
                      ? moduleName
                      : input?.label?.toLowerCase().includes("related")
                        ? "related"
                        : input?.value?.toLowerCase().includes("contact")
                          ? "contacts"
                          : input?.value
                  }
                  values={values}
                  formType={formType}
                  setValues={setValues}
                  detail={detail}
                  input={input}
                  editable={false}
                  open={open}
                  CustomLookup={CustomLookup}
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
                    value={
                      values[input?.value] ? moment(values[input?.value]).format("YYYY-MM-DD") : ""
                    }
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
                  // values={values}
                  // setValues={setValues}
                  // className="custom-select "
                  // name={`${formType}OwnerId`}
                  // options={userOptions}
                  // component={CustomSelect}
                  // placeholder={input?.label}
                  // isMulti={false}
                  values={values}
                  setValues={setValues}
                  className="custom-select " name={`${formType}OwnerId` || ""}
                  options={userOptions}
                  component={CustomSelect}
                  placeholder={input?.label}
                  isMulti={false}
                  disabled={false}

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
                <LookupModuleFieldEdit
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
  return (
    <>
      {console.log("fields=12345==>", sections, values, yupSchema)}
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
          values._id = id;
          // values.orderedItems = formik.values.orderedItems;
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
                    to="/crm/saleorder"
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
                        <p className="font-semibold mb-3">{section.formTitle}</p>}
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
                                                <LookupModuleFieldEdit
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
                                                value={values?.orderedItems && (values?.orderedItems).length > 0 ? values?.orderedItems[index]?.[input?.value] : null}

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

export default SaleOrderDetail;

// import { React, useEffect, useState } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import {
//   UPDATE__DATA_SaleOrder,
//   GET_DATA_BY_ID_SaleOrder,
// } from "../../../Redux/actions/saleOrder";
// import { DeleteIcon } from "../../../assets/svgIcons";
// import { Plus } from "react-feather";
// import useAccessibleRole from "../../../hooks/useAccessibleRole";
// export const SaleOrderDetail = (props) => {
//   const data = useSelector((state) => state.Saleorder.Detail);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [editable, setEditable] = useState(false);
//   const [disabled, setDisabled] = useState(false);
//   const [Load, setLoad] = useState(false);
//   const { edit, write } = useAccessibleRole("saleorders");

//   const navigatetoClone = () => {
//     navigate("/crm/saleOrder-clone/" + id);
//   };

//   useEffect(() => {
//     dispatch(GET_DATA_BY_ID_SaleOrder(id));
//     //   setLoad(true);
//     // });
//   }, []);

//   const SignupSchema = Yup.object().shape({
//     Subject: Yup.string().required("Subject is Required"),
//   });
//   const deleteItem = (index) => {
//     const values = [...formik.values?.orderedItems];
//     values.splice(index, 1);
//     formik.setFieldValue("orderedItems", values);
//   };
//   const addItem = () => {
//     const values = formik?.values?.orderedItems
//       ? [...formik?.values?.orderedItems]
//       : [];
//     values.push({
//       InventoryName: "",
//       Quantity: "",
//       ListPrice: "",
//       Amount: "",
//       Discount: "",
//       Tax: "",
//       Total: "",
//     });
//     formik.setFieldValue("orderedItems", values);
//   };
//   const handleItemChange = (e, index) => {
//     const { name, value } = e.target;
//     const values = [...formik.values?.orderedItems];
//     values[index][name] = value;
//     formik.setFieldValue("orderedItems", values);
//   };

//   const calculateSum = (index) => {
//     const sum =
//       formik.values.orderedItems[index].tax +
//       formik.values?.orderedItems[index].amount -
//       formik.values?.orderedItems[index].discount;
//     formik.setFieldValue("orderedItems[${index}].total", sum); // Update field3 value
//     return sum;
//   };
//   const calculateAutoTotal = (values) => {
//     const { Amount, Discount, Tax } = values;
//     const DiscountedAmount = Amount - Discount;
//     const totalWithTax = DiscountedAmount + (DiscountedAmount * Tax) / 100;
//     return totalWithTax.toFixed(2);
//   };
//   const calculateTotal = (values) => {
//     const { orderedItems } = formik.values;
//     let subTotal = 0;
//     let discount = 0;
//     let tax = 0;
//     let grandTotal = 0;
//     orderedItems.forEach((item) => {
//       subTotal += Number(item.Amount);
//       discount += Number(item.Discount);
//       tax += Number(item.Tax);
//       grandTotal += Number(item.Total);
//     });
//     formik.setFieldValue("SubTotal", subTotal.toFixed(2));
//     formik.setFieldValue("Discount", discount.toFixed(2));
//     formik.setFieldValue("Tax", tax.toFixed(2));
//     formik.setFieldValue("GrandTotal", grandTotal.toFixed(2));
//   };
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       Subject: data.Subject,
//       CustomerNo: data.CustomerNo,
//       QuoteName: data.QuoteName,
//       Carrier: data.Carrier,
//       SalesCommission: data.SalesCommission,
//       AccountName: data.AccountName,
//       DealName: data.DealName,
//       PurchaseOrder: data.PurchaseOrder,
//       DueDate: data.DueDate?.slice(0, 10) || "",

//       ContactName: data.ContactName,
//       ExciseDuty: data.ExciseDuty,
//       Status: data.Status,
//       BillingStreet: data.BillingStreet,
//       BillingCity: data.BillingCity,
//       BillingState: data.BillingState,
//       BillingCode: data.BillingCode,
//       BillingCountry: data.BillingCountry,
//       ShippingStreet: data.ShippingStreet,
//       ShippingCity: data.ShippingCity,
//       ShippingState: data.ShippingState,
//       ShippingCode: data.ShippingCode,
//       ShippingCountry: data.ShippingCountry,
//       orderedItems: data.orderedItems,
//       SubTotal: data.SubTotal,
//       Discount: data.Discount,
//       Tax: data.Tax,
//       Adjustment: data.Adjustment,
//       GrandTotal: data.GrandTotal,
//       TermsAndConditions: data.TermsAndConditions,
//       Description: data.Description,
//     },
//   });

//   return (
//     <>
//       {data?.Subject && (
//         <Formik
//           initialValues={{
//             Subject: data.Subject,
//             CustomerNo: data.CustomerNo,
//             QuoteName: data.QuoteName,
//             Carrier: data.Carrier,
//             SalesCommission: data.SalesCommission,
//             AccountName: data.AccountName,
//             DealName: data.DealName,
//             PurchaseOrder: data.PurchaseOrder,
//             DueDate: data.DueDate?.slice(0, 10) || "",
//             ContactName: data.ContactName,
//             ExciseDuty: data.ExciseDuty,
//             Status: data.Status,
//             BillingStreet: data.BillingStreet,
//             BillingCity: data.BillingCity,
//             BillingState: data.BillingState,
//             BillingCode: data.BillingCode,
//             BillingCountry: data.BillingCountry,
//             ShippingStreet: data.ShippingStreet,
//             ShippingCity: data.ShippingCity,
//             ShippingState: data.ShippingState,
//             ShippingCode: data.ShippingCode,
//             ShippingCountry: data.ShippingCountry,
//             orderedItems: data.orderedItems,
//             SubTotal: data.SubTotal,
//             Discount: data.Discount,
//             Tax: data.Tax,
//             Adjustment: data.Adjustment,
//             GrandTotal: data.GrandTotal,
//             TermsAndConditions: data.TermsAndConditions,
//             Description: data.Description,
//           }}
//           validationSchema={SignupSchema}
//           onSubmit={(values, { setSubmitting }) => {
//             setSubmitting(false);
//             values._id = id;
//             values.orderedItems = formik.values.orderedItems;
//             dispatch(
//               UPDATE__DATA_SaleOrder({ ...values, ModuleTitle: "saleOrders" })
//             ).then(() => {
//               navigate("/crm/saleorder");
//             });
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="flex items-center  flex-col">
//                 <div className="container">
//                   <div className="flex gap-3 justify-end mt-5">
//                     <Link
//                       className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
//                       to="/crm/saleorder"
//                     >
//                       Back
//                     </Link>
//                     {editable && (
//                       <button
//                         className=" bg-primary rounded-2xl text-white py-2 px-10"
//                         type="submit"
//                         disabled={isSubmitting || !edit || !write}
//                       >
//                         Save
//                       </button>
//                     )}
//                     {!editable && (
//                       <button
//                         className=" bg-primary rounded-2xl text-white py-2 px-10"
//                         onClick={() => {
//                           setEditable(!editable);
//                         }}
//                         id="edit-button"
//                         type="button"
//                         disabled={!edit}
//                       >
//                         Edit
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="container">
//                   <div>
//                     <div className="bg-white rounded-md shadow p-4 my-2">
//                       <p className="text-[#142D6C] font-semibold ">
//                         Order Information
//                       </p>
//                       <div className="p-4">
//                         <div className="grid grid-cols-3 gap-3">
//                           <div>
//                             <label className="text-gray-600">Subject</label>
//                             <div className="mt-2">
//                               <Field
//                                 name="Subject"
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Subject"
//                                 disabled={!editable}
//                               />
//                               <ErrorMessage name="Subject">
//                                 {(msg) => (
//                                   <div className="text-red-500">{msg}</div>
//                                 )}
//                               </ErrorMessage>
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600 ">
//                               Customer No
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Customer No"
//                                 name="CustomerNo"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">Quote Name</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Quote Name"
//                                 name="QuoteName"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">Carrier</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Carrier"
//                                 name="Carrier"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Sales Commission
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Sales Commission"
//                                 name="SalesCommission"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Account Name
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Account Name"
//                                 name="AccountName"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">Deal Name</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Deal Name"
//                                 name="DealName"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Purchase Order
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Purchase Order"
//                                 name="PurchaseOrder"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">Due Date</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="date"
//                                 max={"3099-12-31"}
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Due Date"
//                                 name="DueDate"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Contact Name
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Contact Name"
//                                 name="ContactName"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">Excise Duty</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Excise Duty"
//                                 name="ExciseDuty"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">Status</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Status"
//                                 name="Status"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Billing Street
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Billing Street"
//                                 name="BillingStreet"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Billing City
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Billing City"
//                                 name="BillingCity"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Billing State
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Billing State"
//                                 name="BillingState"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Billing Code
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Billing Code"
//                                 name="BillingCode"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Billing Country
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Billing Country"
//                                 name="BillingCountry"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Shipping Street
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Shipping Street"
//                                 name="ShippingStreet"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Shipping City
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Shipping City"
//                                 name="ShippingCity"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Shipping State
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Shipping State"
//                                 name="ShippingState"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Shipping Code
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Shipping Code"
//                                 name="ShippingCode"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="text-gray-600">
//                               Shipping Country
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Shipping Country"
//                                 name="ShippingCountry"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="container ">
//                   <div className="bg-white rounded-md shadow p-4 my-2">
//                     <div className="flex justify-between ">
//                       <p className="text-[#142D6C] font-semibold ">
//                         Items Details
//                       </p>
//                       {editable && (
//                         <button
//                           type="button"
//                           className="btn adduser hover:bg-[#142D6C] focus:shadow-none font-medium gap-3 bg-[#142D6C] flex items-center text-white py-[14px] px-4 rounded-2xl btn-primary"
//                           onClick={addItem}
//                         >
//                           <Plus />
//                           Add Item
//                         </button>
//                       )}
//                     </div>
//                     <div className="p-4">
//                       <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
//                         <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
//                           <thead className="text-sm text-gray-900 font-medium bg-gray-200">
//                             <tr>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 Inventory Name
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 Quantity
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 List Price
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 Amount
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 Discount
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 Tax
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 Total
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3  text-left font-medium"
//                               >
//                                 Action
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {formik.values?.orderedItems?.map((item, index) => (
//                               <tr
//                                 key={index}
//                                 className="bg-white cursor-pointer"
//                               >
//                                 <td className="px-5 py-4">
//                                   <Field
//                                     type="text"
//                                     className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                     placeholder="Enter Inventory Name"
//                                     name={`orderedItems[${index}].inventoryName`}
//                                     value={
//                                       formik.values.orderedItems[index]
//                                         .inventoryName
//                                     }
//                                   />
//                                 </td>
//                                 <td className="px-5 py-4">
//                                   <Field
//                                     type="number"
//                                     className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                     placeholder="Enter Quantity"
//                                     name={`orderedItems[${index}].quantity`}
//                                     value={
//                                       formik.values.orderedItems[index].quantity
//                                     }
//                                   />
//                                 </td>
//                                 <td className="px-5 py-4">
//                                   <Field
//                                     type="number"
//                                     className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                     placeholder="Enter List Price"
//                                     name={`orderedItems[${index}].listPrice`}
//                                     value={
//                                       formik.values.orderedItems[index]
//                                         .listPrice
//                                     }
//                                   />
//                                 </td>
//                                 <td className="px-5 py-4">
//                                   <Field
//                                     type="number"
//                                     className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                     placeholder="Enter Amount"
//                                     name={`orderedItems[${index}].amount`}
//                                     value={
//                                       formik.values.orderedItems[index].amount
//                                     }
//                                   />
//                                 </td>
//                                 <td className="px-5 py-4">
//                                   <Field
//                                     type="number"
//                                     className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                     placeholder="Enter Discount"
//                                     name={`orderedItems[${index}].discount`}
//                                     value={
//                                       formik.values.orderedItems[index].discount
//                                     }
//                                   />
//                                 </td>
//                                 <td className="px-5 py-4">
//                                   <Field
//                                     type="number"
//                                     className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                     placeholder="Enter Tax"
//                                     name={`orderedItems[${index}].tax`}
//                                     value={
//                                       formik.values.orderedItems[index].tax
//                                     }
//                                   />
//                                 </td>
//                                 <td className="px-5 py-4">
//                                   <Field
//                                     className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                     type="number"
//                                     placeholder="Enter Total"
//                                     name={`orderedItems[${index}].total`}
//                                     disabled={editable}
//                                     value={
//                                       formik.values.orderedItems[index].amount -
//                                       formik.values.orderedItems[index]
//                                         .discount +
//                                       formik.values.orderedItems[index].tax
//                                     }
//                                   />
//                                 </td>
//                                 <td className="px-5 py-4 text-center">
//                                   {formik.values.orderedItems.length > 1 && (
//                                     <span
//                                       className="p-2 ml-2 inline-block rounded bg-[#FFEAEF]"
//                                       onClick={() => deleteItem(index)}
//                                     >
//                                       <DeleteIcon />
//                                     </span>
//                                   )}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="container">
//                   <div>
//                     <div className="bg-white rounded-md shadow p-4 my-2">
//                       <p className="text-[#142D6C] font-semibold ">Total</p>
//                       <div className="p-4">
//                         <div className="grid gap-3 grid-cols-4">
//                           <div className="mt-2">
//                             <label className="text-gray-600">Subtotal</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="number"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Subtotal"
//                                 name="SubTotal"
//                                 disabled={!editable}
//                                 value={formik.values.orderedItems?.reduce(
//                                   (acc, item) => acc + Number(item.amount),
//                                   0
//                                 )}
//                               />
//                             </div>
//                           </div>
//                           <div className="mt-2">
//                             <label className="text-gray-600">Discount</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="number"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Discount"
//                                 name="Discount"
//                                 disabled={!editable}
//                                 value={formik.values.orderedItems?.reduce(
//                                   (acc, item) => acc + Number(item.discount),
//                                   0
//                                 )}
//                               />
//                             </div>
//                           </div>

//                           <div className="mt-2">
//                             <label className="text-gray-600">Adjustment</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="number"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Adjustment"
//                                 name="Adjustment"
//                               />
//                             </div>
//                           </div>
//                           <div className="mt-2">
//                             <label className="text-gray-600">
//                               Terms and Conditions
//                             </label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Terms and Conditions"
//                                 name="TermsAndConditions"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-4 gap-3">
//                           <div className="mt-2">
//                             <label className="text-gray-600">Grand Total</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="number"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Grand Total"
//                                 name="GrandTotal"
//                                 disabled={!editable}
//                                 value={formik.values.orderedItems?.reduce(
//                                   (acc, item) =>
//                                     acc +
//                                     Number(item.amount) -
//                                     Number(item.discount) +
//                                     Number(item.tax),
//                                   0
//                                 )}
//                               />
//                             </div>
//                           </div>
//                           <div className="mt-2">
//                             <label className="text-gray-600">Tax</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="number"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Tax"
//                                 name="Tax"
//                                 disabled={!editable}
//                                 value={formik.values.orderedItems?.reduce(
//                                   (acc, item) => acc + Number(item.tax),
//                                   0
//                                 )}
//                               />
//                             </div>
//                           </div>
//                           <div className="mt-2">
//                             <label className="text-gray-600">Description</label>
//                             <div className="mt-2">
//                               <Field
//                                 type="text"
//                                 className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
//                                 placeholder="Enter Description"
//                                 name="Description"
//                                 disabled={!editable}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       )}
//     </>
//   );
// };

// export default SaleOrderDetail;