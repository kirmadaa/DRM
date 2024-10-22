import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import {
  GET_DETAIL,
  GET_USER_PROFILE,
  SET_LOADER,
  UPDATE,
} from "../../../Redux/actions/user";
import { list } from "../../module";
import { GET_FORM } from "../../../Redux/actions/user";
import { CustomSelect } from "../Form/CustomSelect";
import { CustomLookup } from "../Form/CustomLookup";
import Convert from "../../../Layouts/app/ModuleInfoByConnectionId/convert";
import Overview from "../../../Layouts/app/ModuleInfoByConnectionId/overview";
import { GET_ALL_ACTIVE_USER } from "../../../Redux/actions/userList";
import { MASS_DELETE } from "../../../Redux/actions/massModule";
import MassDeleteModal from "../../massDeleteModal";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { GET_ALL_PIPELINES } from "../../../Redux/actions/pipeline";
import { useLocation } from "react-router-dom/dist";
import LookupModuleFieldEdit from "../lookupModuleFieldEdit";
import moment from "moment";
import PageLoader from "../../pageLoader";
import FileUpload from "../Form/FileUpload";
import QuickAdd from "../QuickAdd/index";
import "./formeditor.css";

function FormEditor(props) {
  const navigate = useNavigate();
  const { formType, id, OverviewCheck = false } = props;
  const api = list[formType] || {};
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const [quickAddInput, setQuickAddInput] = useState({});
  const sections = useSelector((state) => state.user.form.sections);
  const [values, setValues] = useState({});
  const [open, setOpen] = useState(false);
  const [pipelineData, setPipelineData] = useState();
  const [yupSchema, setYupSchema] = useState(null); // Add yupSchema state
  const [editable, setEditable] = useState(true);
  const [userOption, setUserOptions] = useState([]);
  const [modal, setModal] = useState(false);
  const detail = useSelector((state) => state.user.detail);
  const loading = useSelector((state) => state.user.loading);
  const [moduleName, setModuleName] = useState();
  const [getConnectionId, setGetConnectionId] = useState();
  const [searchParams] = useSearchParams();
  const [maxDate, setMaxDate] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm'));
  const [selectmeetingMin, setSelectmeetingMin] = useState(0);
  const [selectFromDate, setSelectFromDate] = useState(new Date());

  const listOfTags = useSelector((state) =>
    state?.user?.listOfTags ? state.user?.listOfTags : []
  );
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const { edit, write, delete: deleteValue } = useAccessibleRole(formType);
  // const getConnectionId = location?.search?.split("?prePathname=");
  const [currentOwner, setCurrentOwner] = useState("");
  // console.log("listOfTags<<<+++++>>>", listOfTags);

  const callType = queryParams.get("callType");


  useEffect(() => {
    if (
      JSON.stringify(listOfTags) !== JSON.stringify(detail?.listOfTags || [])
    ) {
      const debounceTimer = setTimeout(() => {
        dispatch(
          UPDATE(api.updateApi, {
            ...detail,
            listOfTags,
            id,
            ModuleTitle: formType,
          })
        );
      }, 800);

      return () => {
        clearTimeout(debounceTimer);
      };
    } else {
    }
  }, [listOfTags]);

  useEffect(() => {
    // console.log("detail===>", detail);
    SET_LOADER(false);

    if (detail && detail?.connectionId) {
      // const { getConnectionId, moduleName, prePathname } =
      //   location && location?.state;

      // const type = searchParams.get("type");
      // let typeName = type ? type : moduleName;
      SET_LOADER(false);
      const apiLink = list[detail?.ModuleTitle] || {};
      // console.log(
      //   "apiLink.detailApi, getConnectionId", location?.state,
      //   apiLink.detailApi,
      //   getConnectionId
      // );
      // if ((type || moduleName) && getConnectionId) {
      // dispatch(GET_DETAIL(apiLink.detailApi, detail?.connectionId)).then((res) => {
      //   setValues({ ...values, ...res?.data })
      //   SET_LOADER(false)

      //   // setGetConnectionId(detail?.connectionId);
      //   // setModuleName(moduleName)
      //   console.log("res-GET_DETAIL-->>>", values, res, apiLink);
      // });
      // SET_LOADER(false)

      // }
    }
  }, [detail]);

  useEffect(() => {
    if (location && location?.state) {
      const { getConnectionId, moduleName, prePathname } =
        location && location?.state;

      const type = searchParams.get("type");
      let typeName = type ? type : moduleName;
      const apiLink = list[typeName] || {};
      // console.log(
      //   "apiLink.detailApi, getConnectionId",
      //   location?.state,
      //   apiLink.detailApi,
      //   getConnectionId
      // );
      // if ((type || moduleName) && getConnectionId) {
      //   dispatch(GET_DETAIL(apiLink.detailApi, getConnectionId)).then((res) => {
      //     setValues({ ...values, ...res?.data });
      setGetConnectionId(getConnectionId);
      setModuleName(moduleName);
      //     console.log("res-GET_DETAIL-->>>", values, res);
      //   });
      // }
    } else {
      // setGetConnectionId("");
      //  setModuleName("");
    }
  }, [dispatch, location, detail]);

  const navigateToClone = () => {
    navigate(api.cloneUrl + id);
  };

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
        if (value === "CallDuration" && callType == "log") {
          fieldSchema = fieldSchema
            .required("ERROR: The number is required!")
            .test(
              "Is positive?",
              "ERROR: The number must be greater than 0!",
              (value) => value >= 0
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
        }
        else if (type === "Lookup") {
          fields[value] = "";
        }
        else if (type === "Owner") {
          fields[value] = "";
          // optionsForOwner();
        } else {
          if (value === "ChannelPartnerName") {
            // fields["ChannelPartnerName"] = "";
          } else {
            fields[value] = "";
          }

        }
      }
    }
    setValues({
      ...values,
      ChannelPartnerName: values.ChannelPartnerName ?? ""
    });

    return yup.object().shape(schema);
  };

  // const optionsForOwner = () => {
  //   let options = [];
  //   dispatch(GET_USER_PROFILE()).then((profile) => {
  //     const resData = profile?.data?.data[0];
  //     options.push({
  //       value: resData?.userId,
  //       label: `${resData?.firstName} ${resData?.lastName}`,
  //     });
  //     const data = {
  //       ...values,
  //       [`${formType}OwnerId`]: resData?.userId,
  //     };
  //     setValues(data);
  //     setUserOptions(options);
  //   });

  //   dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
  //     (data) => {
  //       // const options = userOptions;
  //       const res = data?.data?.data?.usersData;
  //       if (res?.length > 0) {
  //         res?.map((item) => {
  //           options.push({
  //             value: item?._id,
  //             label: `${item?.firstName} ${item?.lastName}`,
  //           });
  //         });
  //       }
  //     }
  //   );
  //   setUserOptions(options);
  // };

  const handleMassDelete = () => {
    dispatch(MASS_DELETE(api.deleteUrl, { dataList: [detail?._id] })).then(
      (res) => {
        if (res?.status === 200) {
          setModal(false);
          navigate(api.redirectUrl);
        }
      }
    );
  };

  const onSubmit = async (values) => {
    // const { getConnectionId, moduleName, prePathname } =
    //   location && location?.state;
    values.id = id;
    SET_LOADER(false);
    await dispatch(
      UPDATE(api.updateApi, {
        ...values,

        ModuleTitle: formType, listOfTags
      })
    );
    SET_LOADER(false);
    window.location.reload();
    // if (getConnectionId) {
    //   //navigate(getConnectionId[1]);
    //   window.location.reload();
    // } else {
    //   window.location.reload();
    //   // navigate(api.redirectUrl);
    // }
    SET_LOADER(false);
  };

  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValues(detail);
  }, [detail]);

  useEffect(() => {
    dispatch(GET_DETAIL(api.detailApi, id));
    // eslint-disable-next-line
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

    // eslint-disable-next-line
  }, [sections]);

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

  useMemo(() => {
    if (sections && pipelineData?.pipelineData) {
      Object.entries(sections)?.map(([sectionTitle, section]) =>
        Object.entries(section.inputs).map(([fieldName, input]) => {
          if (input?.label?.toLowerCase().includes("pipeline")) {
            let items = pipelineData?.pipelineData;
            let itemis = items?.find((_it) => _it?._id === detail[input?.name]);
            setSelectedPipeline({
              label: itemis?.pipelineTitle,
              value: itemis?._id,
            });
          }
        })
      );
    }
  }, [sections, pipelineData]);

  useEffect(() => {
    let options = [];
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      console.log("resData==new===>", options, resData);
      setCurrentOwner(resData?.userId);
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
  }, []);

  useEffect(() => {
    // let currentOwnerName =
    //   detail && detail.ContactsOwnerId &&  formType == "Opportunities")
    //     ? detail.ContactsOwnerId
    // : detail.LeadsOwnerId &&  formType == "Opportunities")
    //       ? detail.LeadsOwnerId
    //       : detail.AccountsOwnerId && formType == "Opportunities")
    //         ? detail.AccountsOwnerId
    //         : (detail.OpportunitiesOwnerId && formType =="Opportunities")
    //           ? detail?.OpportunitiesOwnerId
    //           : detail?.MeetingOwnerId
    //             ? detail?.MeetingOwnerId
    //             : detail?.CallsOwnerId
    //               ? detail?.CallsOwnerId
    //               : detail?.TasksOwnerId;

    //CallsOwnerId TasksOwnerId
    console.log("detail=formType=>", detail[`${formType}OwnerId`]);
    // alert(JSON.stringify({ [`${formType}OwnerId`]: currentOwnerName }))
    if (detail?._id) {
      setValues({ ...detail, [`${formType}OwnerId`]: detail[`${formType}OwnerId`] });
    }
  }, [currentOwner, detail]);

  function convertTimeFormat(inputValue) {
    if (inputValue?.length > 16) {
      let first16Chars = inputValue.substring(0, 16);
      return first16Chars;
    }
    return inputValue;
  }
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
  // console.log(values)
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
                    className="custom-select-edit disabled:bg-[#f2f2f2]"
                    name={input?.value}
                    values={values}
                    setValues={setValues}
                    options={input?.options}
                    component={CustomSelect}
                    placeholder={input?.label}
                    isMulti={true}
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
                      className="custom-select-edit disabled:bg-[#f2f2f2]"
                      name={input?.value || ""}
                      options={getDataForNormalOrByCondition(
                        input?.label,
                        input?.options
                      )}
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

      // case "Lookup":
      //   return (
      //     <div key={input?.id} className="mb-3">
      //       <div className="form-group1" key={input?.lookupModule[0]}>
      //         <label className="ml-2">{getTitle(input?.label)}</label>
      //         {input?.required && <span>{" *"}</span>}
      //         {console.log("input?.label==values=>", values)}
      //         <div className="mt-2 widthfull" style={{ display: "flex" }}>
      //           <LookupModuleField
      //             changeModuleOption={moduleName ? moduleName :
      //               input?.label?.toLowerCase().includes("related") ||
      //               (formType === "Tasks" &&
      //                 input?.label?.toLowerCase().includes("contact"))
      //             }
      //             labelType={
      //               moduleName ? moduleName : input?.label?.toLowerCase().includes("related")
      //                 ? "related"
      //                 : input?.label?.toLowerCase().includes("contact")
      //                   ? "contacts"
      //                   : ""
      //             }
      //             values={values}
      //             //changeModuleOption={true}
      //             formType={formType}
      //             setValues={setValues}
      //             input={input}
      //             editable={false}
      //             CustomLookup={CustomLookup}
      //             open={open}
      //           />

      //           <button
      //             className="modal__addBtn inline-block bg-zinc-200 text-black py-2 px-2 rounded"
      //             style={{ borderRadius: "0", padding: "0 10px" }}
      //             onClick={() => {
      //               setQuickAddInput(input);
      //               setOpen(true);
      //             }}
      //             type="button"
      //           >
      //             Add
      //           </button>
      //           {open &&
      //             quickAddInput?.value === input.value &&
      //             quickAddInput?.id === input.id && (
      //               <QuickAdd modal={open} input={input} setModal={setOpen} />
      //             )}
      //         </div>
      //       </div>
      //     </div>
      //   );

      case "Lookup":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1" key={input?.lookupModule[0]}>
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2" style={{ display: "flex" }}>
                <LookupModuleFieldEdit

                  // labelType={
                  //   input?.label?.toLowerCase().includes("related")
                  //     ? "related"
                  //     : input?.label?.toLowerCase().includes("contact")
                  //       ? "contacts"
                  //       : ""
                  // }
                  // changeModuleOption={
                  //   input?.label?.toLowerCase().includes("related") ||
                  //   (formType === "Tasks" &&
                  //     input?.label?.toLowerCase().includes("contact"))
                  // }

                  // labelType={input?.label?.toLowerCase().includes("contact") ? "contacts" : moduleName}
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
                  editable={editable}
                  open={open}
                  CustomLookup={CustomLookup}
                />
                <button
                  disabled={editable}
                  className="modal__addBtn inline-block bg-zinc-200 text-black py-2 px-2 rounded"
                  style={{ borderRadius: "0", padding: "0 10px" }}
                  onClick={() => {
                    setQuickAddInput(input);
                    setOpen(true);
                  }}
                  type="button"
                >
                  {" "}
                  Add{" "}
                </button>
                {open && (
                  <QuickAdd modal={open} input={input} setModal={setOpen} />
                )}
                {/* quickAddInput?.value === input.value && quickAddInput?.id === */}
                {/* input.id && */}
              </div>
            </div>
          </div>
        );

      // case "datetime-local":
      //   return (
      //     <div key={input?.id} className="mb-3">
      //       <div className="form-group1" key={input?.label}>
      //         <label className="ml-2">{input?.label}</label>
      //         {input?.required && <span>{" *"}</span>}
      //         <div className="w-full">
      //           <input
      //             type={type}
      //             max="3099-12-31 00:00:00"
      //             min={
      //               values && values?.CallStartTime
      //                 ? values?.CallStartTime
      //                 : null
      //             }
      //             disabled={editable}
      //             value={convertTimeFormat(values[input?.value]) || ""}
      //             onChange={(e) =>
      //               setValues({ ...values, [input?.value]: e.target.value })
      //             }
      //             setValues={setValues}
      //             className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg"
      //             name={input?.value}
      //             placeholder={input?.label}
      //           />
      //         </div>
      //       </div>
      //     </div>
      //   );

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
                      disabled={editable}
                      onChange={(e) => {
                        // setSelectmeetingMin(0);
                        setValues({
                          ...values,
                          [input?.value]: e.target.value,
                        });
                      }}
                      // disabled={
                      //   selectmeetingMin && input?.label === "To" ? true : false
                      // }
                      // max="3099-12-31 00:00:00"

                      className="custom-select border w-full p-2 rounded-lg"
                      name={input?.value}
                      placeholder={input?.label}
                    />
                  ) : (
                    <input
                      type={type}

                      value={
                        values[input?.value] ? moment(values[input?.value]).format("YYYY-MM-DD HH:mm") : ""
                      }
                      onChange={(e) => {
                        // setSelectmeetingMin(0);
                        setValues({
                          ...values,
                          [input?.value]: e.target.value,
                        });
                      }}
                      disabled={editable}
                      //max="2099-12-31 00:00:00"
                      // min={
                      //   values && values?.CallStartTime
                      //     ? values?.CallStartTime
                      //     : values?.From
                      //       ? values?.From
                      //       : moment().format("DD/MM/YYYY HH:mm")
                      // }
                      min={values.OutgoingCallStatus == "Completed" ? null : callType == "schedule" ? maxDate : ""}

                      // max={moment().format("DD/MM/YYYY HH:mm")}
                      // max={(moment("YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")).toString()}
                      max={values.OutgoingCallStatus == "Completed" ? maxDate : (callType == "log") ? maxDate : "2099-12-31 00:00:00"}

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
                {input?.label}
              </label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                {console.log("values==userOption=>", userOption)}

                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select-edit disabled:bg-[#f2f2f2]"
                  name={`${formType}OwnerId` || ""}
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
            <div className="form-group1">
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <Field
                  values={values}
                  setValues={setValues}
                  className="custom-select disabled:bg-[#f2f2f2]"
                  name={input?.value}
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
      case "date":
        return (
          <div key={input?.id} className="mb-3">
            <div className="form-group1">
              <label className="ml-2">{input?.label}</label>
              {input?.required && <span>{" *"}</span>}
              <div className="mt-2">
                <input
                  type={type}
                  disabled={editable}
                  max={"3099-12-31"}
                  value={
                    values[input?.value] ? moment(values[input?.value]).format("YYYY-MM-DD") : ""
                  }
                  onChange={(e) =>
                    setValues({ ...values, [input?.value]: e.target.value })
                  }
                  setValues={setValues}
                  className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg"
                  name={input?.value}
                  placeholder={input?.label}
                />
              </div>
            </div>
          </div>
        );
      // case "date":
      //   return (
      //     <div key={input?.id} className="mb-3">
      //       <div className="form-group1">
      //         <label className="ml-2">{input?.label}</label>
      //         {input?.required && <span>{" *"}</span>}
      //         <div className="mt-2">
      //           <input
      //             type={type}
      //             disabled={editable}
      //             max={"3099-12-31"}
      //             // defaultValue={
      //             //   values[input?.value] ? moment(values[input?.value]).format("DD/MM/YYYY HH:mm") : ""
      //             // }
      //             value={
      //               values[input?.value] ? moment(values[input?.value]).format("DD/MM/YYYY") : ""
      //             }
      //             onChange={(e) =>
      //               setValues({ ...values, [input?.value]: e.target.value })
      //             }
      //             setValues={setValues}
      //             className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg"
      //             name={input?.value}
      //             placeholder={input?.label}
      //           />
      //         </div>
      //       </div>
      //     </div>
      //   );

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
                    values={values}
                    setValues={setValues}
                    className="form-control w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-0 focus:border-primary"
                    name={input?.value}
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
                  className="custom-select disabled:bg-[#f2f2f2]"
                  name={input?.value}
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
                <label className="ml-2">
                  {input?.label}{" "}
                  {input.label.includes("Duration") ? "( In Seconds)" : ""}
                </label>
                {input?.required && <span>{" *"}</span>}
                <div
                  className={`${input?.type === "checkbox" ? "ml-3" : "mt-2"}`}
                >
                  <input
                    type={type}
                    disabled={editable}
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
              </>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (values?.CallEndTime !== "" && values?.CallStartTime) {
      let callEndTime = new Date(convertTimeFormat(values?.CallEndTime));
      let callStartTime = new Date(convertTimeFormat(values?.CallStartTime));
      var timestamp1 = new Date(callEndTime);
      var timestamp2 = new Date(callStartTime);
      var timeDifference = timestamp1 - timestamp2;
      var minutesDifference = Math.floor(timeDifference / (1000 * 60));
      setValues({ ...values, CallDuration: minutesDifference });
      // let hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
      // let minutes = Math.floor(
      //   (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
      // );
      // setValues({ ...values, CallDuration: `${hours}: ${minutes} ` });
      setValues({ ...values, CallDuration: `${timeDifference / 1000}` });
    }
  }, [values?.CallEndTime, values?.CallStartTime]);
  // console.log("values", values);

  if (loading) {
    return <PageLoader title="Loading" />;
  }
  return (
    <>
      {values?._id ? (
        <div className="p-[10px] h-screen overflow-y-auto">
          {yupSchema && (
            <Formik
              initialValues={values}
              validationSchema={yupSchema}
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                // console.log("valuesvalues", values);
                setSubmitting(false);
                setEditable(true);
                onSubmit(values);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="min-h-screen mt-[-65px]">
                  <div className="my-3">
                    <div
                      className="flex justify-end items-center"
                      style={{ display: "none" }}
                    >
                      {!editable ? (
                        <div className="flex justify-start gap-2">
                          <button
                            className="bg-primary text-white px-2 py-2 w-[70px] rounded-lg"
                            type="submit"
                            disabled={isSubmitting}
                            id="save-button"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <>
                          {formType === "Leads" && (
                            <Convert
                              id={id}
                              sections={sections}
                              values={values}
                            />
                          )}
                          <button
                            className="bg-primary text-white px-2 py-2 w-[70px] rounded-lg"
                            onClick={() => {
                              setEditable(!editable);
                            }}
                            id="edit-button"
                            type="button"
                            disabled={!edit}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-primary text-white px-2 py-2 w-[70px] rounded-lg"
                            onClick={() => {
                              navigateToClone();
                            }}
                            id="clone-edit"
                            type="button"
                            disabled={!edit || !write}
                          >
                            Clone
                          </button>
                          <button
                            className="bg-primary text-white px-2 py-2 w-[70px] rounded-lg"
                            onClick={() => {
                              // navigateToClone();
                              // handleMassDelete();
                              setModal(true);
                            }}
                            id="delete-button-id"
                            type="button"
                            disabled={!deleteValue}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className="px-5 py-1 mt-6 bg-white rounded-xl"
                    id="details"
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="text-base font-semibold leading-5">
                        Show Details
                      </h5>
                    </div>

                    {Object.entries(sections)?.map(
                      ([sectionTitle, section]) => (
                        <div
                          key={sectionTitle}
                          className="bg-[#F8F8FC] border-[1.5px] border-[#E6E6EB] p-5 rounded-2xl my-3"
                          id="section-to-print"
                        >
                          <div className="p-5  rounded-xl">
                            <h1 className="text-sm font-semibold leading-[22px]">
                              {section?.formTitle}
                            </h1>
                            <hr className="my-2 w-full bg-[#D6D6DA] h-[2px]" />
                            <div className="text-gray-700">
                              <div className="grid md:grid-cols-2 break-words gap-5">
                                {Object.entries(section.inputs).map(
                                  ([fieldName, input]) => (
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
                                  )
                                )}
                                {/* {Object.entries(section.inputs).map(
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
                                )} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {OverviewCheck && (
                    <Overview
                      detailPageIs={props?.detailPageIs}
                      editable={editable}
                      sections={sections}
                      formType={formType}
                    />
                  )}
                </Form>
              )}
            </Formik>
          )}
          <MassDeleteModal
            setModal={setModal}
            modal={modal}
            deleteFun={handleMassDelete}
          />
        </div>
      ) : (
        <PageLoader title="Fetching info" />
      )}
    </>
  );
}

export default FormEditor;

// import React from 'react';
// import { Field, Form, Formik, FormikProps } from 'formik';

// const MyInput = ({ field, form, ...props }) => {
//   console.log("test==>", field, form, props);
//   return <input {...field} {...props} />;
// };

// const FormEditor = () => {
//   const [values, setValues] = React.useState({ name: "hh", values: "ajskfk", value: "sadfa" });

//   return (
//     <div>
//       <h1>My Form</h1>
//       <Formik
//         initialValues={{ email: '', color: 'red', firstName: '', lastName: 'dcvsf' }}
//         onSubmit={(values, actions) => {
//           console.log("<values>", values);
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             actions.setSubmitting(false);
//           }, 1000);
//         }}
//       >
//         {(props) => (
//           <Form>
//             <Field type="email" name="email" placeholder="Email" />
//             <Field as="select" name="color">
//               <option value="red">Red</option>
//               <option value="green">Green</option>
//               <option value="blue">Blue</option>
//             </Field>

//             <Field name="lastName">
//               {({
//                 field, // { name, value, onChange, onBlur }
//                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//                 meta,
//               }) => (
//                 <div>
//                   <input type="text" placeholder="Email" {...field} />
//                   {meta.touched && meta.error && (
//                     <div className="error">{meta.error}</div>
//                   )}
//                 </div>
//               )}
//             </Field>
//             <Field name="lastName" values={"values"}

//               component={MyInput}
//             />
//             <button type="submit">Submit</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }
// export default FormEditor;
