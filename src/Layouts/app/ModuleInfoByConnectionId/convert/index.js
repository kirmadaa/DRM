import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  GET_FORM_BY_TITLE,
  CONVERT_BY_CONNECTION_ID,
  CHECK_BY_ACCOUNT_NAME,
} from "../../../../Redux/actions/comman";
import { Info } from "react-feather";
import { CheckObjectValidation } from "../../../../utility/validation";
import OppotunityForm from "./opportunityForm";
import { SET_LOADER } from "../../../../Redux/actions/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import QuickAdd from "../QuickAdd/index";
import QuickAdd from "../../../../Components/Common/QuickAdd";
const CreatRedirect = ({ path, name }) => {
  return (
    <Link to={path} className="text-primary underline">
      First Create Module for {name}
    </Link>
  );
};

const Convert = ({ id, sections, values }) => {
  const navigate = useNavigate();
  console.log("sections-->>", sections, values);
  const [opportunities, setOpportunities] = useState(false);
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState(true);
  const [accountMessage, setAccountMessage] = useState(null);
  const [contactMessage, setContactMessage] = useState(null);
  const [accoutName, setAccountName] = useState("");
  const [accoutId, setAccountId] = useState("");
  const [newData, setValues] = useState({
    companyAction: "skipe",
    addExist: false,
    createCompany: false,
    newCompanyName: "",
    email: "",
    mobile: "",
    accoutName: "",
    accoutId: ""
  });
  // useEffect(()=>{console.log("newData",newData,accoutName)},[newData,accoutName])
  const [state, setState] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const handleInputChange = (e, field) => {
    if (field === "companyAction") {
      setValues({ ...newData, ["accoutName"]: "" });
      setValues({ ...newData, ["accoutId"]: "" });
      setValues({ ...newData, [field]: e.target.value });
    } else if (field === "mergeExist") {
      setIsChecked(!isChecked);
      setValues({ ...newData, [field]: !isChecked });
    } else {
      setValues({ ...newData, [field]: e.target.value });
    }

  };
  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const optionValue = selectedOption.value;
    const optionText = selectedOption.text.split("|")[0];
    console.log("Values", optionText);
    setValues({
      ...newData,
      ["accoutName"]: optionText,
      ["accoutId"]: optionValue
    });
  };
  useEffect(() => {
    console.log("NeData", newData)
  }, [newData]);
  //  const [open, setOpen] = useState(false);
  // const [oppPayload, setOppPayload] = useState({
  //   leadType: "",
  //   dealName: "",
  //   closingDate: "",
  //   campaignSource: "",
  //   Pipeline: "",
  //   stage: "",
  // });
  const [contact, setContact] = useState(false);
  const [checkuniquaccount, setcheckuniquaccount] = useState(true);
  const [account, setAccount] = useState(false);
  const [quickForm, setQuickForm] = useState(false);
  const dispatch = useDispatch();
  let [isOpen, setShow] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  // const detail = useSelector((state) => state.user.detail);

  function closeModal() {
    // setShow(false);
  }

  function openModal() {
    setShow(true);
  }
  const [errorSelectAccount, setErrorSelectAccount] = useState(null);
  const [errorMergeRequired, setErrorMergeRequired] = useState(null);
  const handleSubmit = (formdata) => {
    // debugger
    console.log("formdata==========><<<", formdata, newData);
    if (accountMessage != null) {
      if (newData?.companyAction === "add" && newData?.accoutName === "" && newData?.accoutId === "") {
        setErrorSelectAccount("Please select company");
        return;
      } else if (contactMessage != null) {
        if (newData?.mergeExist === "" || newData?.mergeExist === undefined) {
          if (newData?.email === "" || newData?.email === undefined || newData?.mobile === "" || newData?.mobile === undefined) {
            setErrorMergeRequired("Please enter new email and mobile to create new contact");
            return;
          }
        }
      }
    } else if (contactMessage != null) {
      if (newData?.mergeExist === "" || newData?.mergeExist === undefined) {
        setErrorMergeRequired("Please select Merge to exisit");
        return;
      }

    }

    let payload = {
      leadId: id,
      opportunities,
      opportunitiesData: formdata,
      newData: newData ?? null,
    };
    console.log("payload==========><<<", payload);
    let isvalid = CheckObjectValidation(payload, []);
    //dispatch(CHECK_BY_ACCOUNT_NAME("testacc"));
    //let checkuniquaccount = true;
    dispatch(CHECK_BY_ACCOUNT_NAME(values?.Company)).then((res) => {
      console.log("res==========><<<", res);
      if (res?.msg == "Request Success") {
        //checkuniquaccount = false;
        //setcheckuniquaccount(false);
        toast.error("Please add unique account");
      } else {
        if (isvalid?.isvalid) {
          SET_LOADER(true);
          dispatch(CONVERT_BY_CONNECTION_ID(payload)).then((resp) => {
            // debugger;
            console.log("res==========><<<123", resp?.data?.data?.companyList);
            if (resp?.data?.data) {
              if (resp?.data?.data?.account && resp?.data?.data?.companyList) {
                setAccountMessage(resp?.data?.data?.account);
                setCompanyList(resp?.data?.data?.companyList);
              }else{
                setAccountMessage("");
              }
              setContactMessage(resp?.data?.data?.contact);
              setState(resp?.data?.data?.state);
            } else {
              SET_LOADER(false);
              setShow(false);
              setTimeout(() => {
                navigate(-2);
              }, 3000);
            }
          });

        }
      }
      //const data = res.data?.data ? false : true;
      //setNewModule(data);
    });
    console.log("checkuniquaccounts==========><<<", checkuniquaccount);
  };

  const asyncCheckModules = () => {
    // dispatch(GET_FORM_BY_TITLE("Opportunities")).then((res) => {
    //   let data = res?.data?.data ? true : false;
    //   setOpportunity(data);
    // });
    dispatch(GET_FORM_BY_TITLE("Accounts")).then((res) => {
      let data = res?.data?.data ? true : false;
      setAccount(data);
    });
    dispatch(GET_FORM_BY_TITLE("Contacts")).then((res) => {
      let data = res?.data?.data ? true : false;
      setContact(data);
    });
    dispatch(GET_FORM_BY_TITLE("Opportunities")).then((res) => {
      let data = res?.data?.data;
      setQuickForm(data);
    });
  };

  useEffect(() => {
    asyncCheckModules();
  }, [dispatch]);

  const handleChange = (e) => {
    // const { checked } = e.target
    setOpportunities(e ? false : true);
  };

  console.log("CompanyList", companyList);

  const options = companyList.map((value) => (
    <option value={value?._id}>{value?.AccountName}|{value?.FirstName}_{value?.LastName} </option>
  ));

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-lg border bg-primary h-1-0 shadow-lg  px-2 py-1 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        id="convert-button"
      >
        Convert
      </button>

      {isOpen ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                  <Dialog.Panel className="w-full max-w-[1100px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Convert Lead
                    </Dialog.Title>
                    <div className="h-[70vh] overflow-scroll p-10">
                      <div className="h-full">
                        <div className="flex justify-start items-center">
                          <div className="mb-0 flex justify-start items-center ">
                            <Info size={16} color="gray" />
                            <span className={`mx-1 text-gray-600 font-[200]`}>
                              Create New Account{" "}
                              {values?.Company ? `(${values?.Company})` : ""}
                            </span>

                          </div>

                          {account ? (
                            ""
                          ) : (
                            <CreatRedirect name="Account" path="/crm/modules" />
                          )}


                        </div>
                        {accountMessage ? (
                          <div className="mb-3">
                            <p>
                              <small className="text-red-400">{accountMessage}</small>
                            </p>

                            <div className="grid grid-cols-2 gap-5">
                              <div className="form-group1  ">
                                <input required type="radio" id="add_existing" name="company_action" value={"add"} onClick={(e) => handleInputChange(e, 'companyAction')} /> Add to existing account ({values?.Company})
                                <div className="grid grid-cols-1 gap-5">
                                  {newData?.companyAction === "add" ? (
                                    <div className="form-group1  ">
                                      <label className="ml-2">Company List *</label>
                                      <select required className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base" onChange={(e) => { handleSelectChange(e) }}>
                                        <option>Select Account</option>
                                        {options}
                                      </select>
                                      <span> <small className="text-red-400">{errorSelectAccount}</small></span>
                                    </div>
                                  ) : ("")}
                                </div>
                              </div>
                              <div className="form-group1  ">
                                <input required type="radio" id="create_new" name="company_action" value={"create"} onClick={(e) => handleInputChange(e, 'companyAction')} /> Create New Account ({values?.Company})

                              </div>

                            </div>
                          </div>
                        ) : null}
                        <div className="flex justify-start items-center">
                          <div className="flex justify-start items-center ">
                            {" "}
                            <Info size={16} color="gray" />{" "}
                            <span className="mx-1 text-gray-600 font-[200]">
                              Create New Contact{" "}
                              {values?.FirstName
                                ? `(${values?.FirstName} ${values?.LastName})`
                                : ""}
                            </span>

                          </div>
                          {contact ? (
                            ""
                          ) : (
                            <CreatRedirect
                              name="Contact"
                              path="/crm/createModule?name=Contacts"
                            />
                          )}
                        </div>
                        {contactMessage ? (
                          <div className="mb-3">
                            <p>
                              <small className="text-red-400">{contactMessage}</small>
                            </p>
                            <div className="form-group1  ">
                              <input required type="checkbox" checked={isChecked} onClick={(e) => handleInputChange(e, 'mergeExist')} /> Merge to existing contact ({values?.FirstName} {values?.LastName})<strong>({values?.Email} and {values?.Mobile})</strong>
                            </div>

                            <span> <small className="text-red-400">{errorMergeRequired}</small></span>
                            {!isChecked ? (
                              <div className="grid grid-cols-2 gap-5">
                                <div className="form-group1">
                                  <label className="ml-2">Email</label>
                                  <div className="mt-2">
                                    <input
                                      type="email"
                                      required={true}
                                      className="form-control rounded-[10px] w-full border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4 border-[#dce2eb] p-2 text-base"
                                      placeholder="Email"
                                      defaultValue={""}
                                      onChange={(e) => handleInputChange(e, 'email')}
                                    />
                                  </div>
                                </div>
                                <div className="form-group1">
                                  <label className="ml-2">Mobile</label>
                                  <div className="mt-2">
                                    <input
                                      type="tel"
                                      className="form-control rounded-[10px] w-full border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4 border-[#dce2eb] p-2 text-base"
                                      placeholder="Mobile"
                                      required={true}
                                      defaultValue={""}
                                      onChange={(e) => handleInputChange(e, 'mobile')}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : ("")}
                          </div>
                        ) : null}

                        {quickForm?.quickCreateFieldsForUpdate ? (
                          <div
                            className="mt-2 text-gray-400 font-[200] flex justify-start items-center"
                            onClick={(e) => handleChange(opportunities)}
                          >
                            {console.log("opportunities===>", opportunities)}
                            <input
                              checked={opportunities}
                              // onChange={(e) => {
                              //   console.log("eeee", e.target.checked)
                              //   setOpportunities(e.target.checked ? false : true)
                              // }}
                              className="mx-2"
                              type="checkbox"
                              readOnly
                            />

                            {/* <input type="checkbox"
                            checked={opportunities}
                            //onChange={e => handleChange(e)}
                            value={true}
                          // defaultChecked={opportunities}
                          /> */}

                            <p className="mb-1">
                              Create a new Opportunity for this Account.
                            </p>
                          </div>
                        ) : (
                          <div className="flex justify-start items-center space-x-2">
                            <span>
                              You don't have Quick form please create it
                            </span>
                            <CreatRedirect
                              name="Opportunities"
                              path="/crm/modules"
                            />
                          </div>
                        )}
                        <br />
                        <div>
                          {opportunities ? (
                            <>
                              {console.log(
                                "quickForm?.quickCreateFieldsForUpdat",
                                quickForm,
                                quickForm?.quickCreateFieldsForUpdate
                              )}
                              <OppotunityForm
                                formType="Leads"
                                handleSubmit={handleSubmit}
                                setShow={setShow}
                                quickform={
                                  quickForm?.quickCreateFieldsForUpdate
                                }
                              />
                              {/* <QuickAdd
                                modal={open}
                                input={input}
                                setModal={setOpen}
                              /> */}
                            </>
                          ) : (
                            <div className="flex justify-end items-center space-x-2">
                              <button
                                className="bg-gray-300 p-2 rounded-lg shadow min-w-[100px] text-primary"
                                onClick={() => setShow(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-primary p-2 rounded-lg shadow min-w-[100px] text-white"
                                onClick={() => handleSubmit({})}
                              >
                                Convert
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : null}
    </>
  );
};

export default Convert;
