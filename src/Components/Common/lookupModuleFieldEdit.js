import { Field } from "formik"
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { GET_LOOKUP } from "../../Redux/actions/user"
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

const modulesList = [
    { name: "Leads", lookup: "Leads" },
    { name: "Contacts", lookup: "Contacts" },
    { name: "Accounts", lookup: "Accounts" },
    { name: "Opportunity", lookup: "deals" },
    // { name: "Calls", lookup: "calls" },
    { name: "Vendor", lookup: "Vendor" },
    // { name: "Tasks", lookup: "Tasks" },
    { name: "Inventory", lookup: "inventory" },
    // { name: "Meeting", lookup: "meetings" },
    { name: "Site Visit", lookup: "siteVisit" },
    { name: "Invoice", lookup: "invoices" },
    { name: "Sale orders", lookup: "sale-orders" },
    { name: "Purchase orders", lookup: "purchase-orders" },
    { name: "Purchase orders", lookup: "purchase-orders" },
    { name: "Quotes", lookup: "quotes" },
];

function SelectModule({
    lookupDataType,
    setLookupDataType,
    labelType,
    editable,
    values,
    setValues,
    disabled,
    contactTitle,
    edit
}) {
    const [selected, setSelected] = useState(
        modulesList.find(
            (it) =>
                it?.lookup?.toLocaleLowerCase() === lookupDataType?.toLocaleLowerCase()
        )
    );
    return (
        <div>
            {console.log("e?.lookup====>", labelType)}
            <Listbox
                value={selected}
                // disabled={(editable && edit) ? disabled : editable}
                // disabled={editable ? true : false}

                onChange={(e) => {
                    //  console.log("e?.lookup====>", e?.lookup);

                    setSelected(e);
                    setLookupDataType(e?.lookup);
                    if (labelType === "contacts" || labelType === "Contacts") {
                        setValues({ ...values, ["contactTitle"]: e?.lookup });
                        // alert(selected?.name)
                    } else if (labelType === "Related") {
                        // alert(selected?.name)
                        setValues({
                            ...values,
                            ["RelatedTitle"]:
                                e?.lookup == "deals" ? "Opportunity" : e?.lookup,
                        });
                    }
                }}
            >
                {/* {console.log("editeditableable", editable)} */}

                <div className="relative min-w-[120px] mt-1">
                    <Listbox.Button editable={editable}
                        className="relative border w-full cursor-default rounded-lg bg-white p-2.5 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected?.name || "Select"} </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            style={{ zIndex: 1 }}
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            {(labelType === "contact" || labelType === "contacts" || labelType === "Contacts")
                                ? modulesList
                                    .filter((item, index) => index <= 1)
                                    ?.map((person, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none p-2 ${active
                                                    ? "bg-blue-100 text-primary"
                                                    : "text-gray-900"
                                                }`
                                            }
                                            value={person}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                            }`}
                                                    >
                                                        {person?.name}
                                                    </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))
                                : modulesList?.filter((item, index) => index <= 3)
                                    .map((person, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none p-2 ${active ? "bg-blue-100 text-primary" : "text-gray-900"
                                                }`
                                            }
                                            value={person}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                            }`}
                                                    >
                                                        {person?.name}
                                                    </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
const LookupModuleFieldEdit = ({
    input,
    editable,
    CustomLookup,
    detail,
    setValues,
    formType,
    values,
    open,
    labelType,
    changeModuleOption = false
}) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const [fulldata, setFulldata] = useState([])
    const [lookupDataType, setLookupDataType] = useState(labelType);

    //  console.log("labelType===>", labelType);

    const canChangeModuleName = () => {
        if (formType === "Calls" || formType === "tasks" || formType === "Tasks") {
            return true;
        } else if (formType === "Meeting" || formType === "siteVisit") {
            return true;
        } else {
            return false;
        }
    };

    useMemo(async () => {
        if (!lookupDataType) {
            return null
        }
        const items = [];
        let urlEndPoint = () => {
            if (
                lookupDataType === "Opportunities" ||
                lookupDataType === "Opportunity" ||
                lookupDataType === "deals"
            ) {
                return "deals";
            }
            return lookupDataType;
        };
        console.log("lookupDataType-uuu-->", lookupDataType);
        // let lookupDataType = lookupDataType ? lookupDataType : input?.lookupModule
        await dispatch(GET_LOOKUP(`/search-${urlEndPoint()}`)).then((res) => {
            setFulldata(res)
            if (res?.length > 0) {
                for (let item of res) {
                    if (lookupDataType === 'Accounts' || lookupDataType === "accounts") {
                        let _i = {
                            value: item?._id,
                            label: item?.AccountName ? item?.AccountName : item.Company ? item.Company : item.CompanyName || "(Quick Create)",
                        }

                        items.push(_i);
                    } else if (lookupDataType === 'Vendor') {
                        let _i = {
                            value: item?._id,
                            label: item?.VendorName,
                        }

                        items.push(_i);
                    } else if (lookupDataType === 'Contacts' || lookupDataType === "contacts" || labelType === "Contacts") {
                        let _i = {
                            value: item?._id,
                            label: `${item?.FirstName ? item?.FirstName : "N/A"} ${item?.LastName ? item?.LastName : "N/A"}`,
                        }
                        items.push(_i);
                    } else if (
                        lookupDataType === "opportunities" ||
                        lookupDataType === "Opportunities" ||
                        lookupDataType === "deals"
                    ) {
                        let _i = {
                            value: item?._id,
                            label: item?.OpportunityName || "N/A",
                        }

                        items.push(_i);
                    } else if (lookupDataType === 'leads' || lookupDataType === 'Leads') {
                        let _i = {
                            value: item?._id,
                            label: `${item?.FirstName ? item?.FirstName : "N/A"} ${item?.LastName ? item?.LastName : "N/A"}`,
                        }

                        items.push(_i);
                    } else if (lookupDataType === 'call') {
                        let _i = {
                            value: item?._id,
                            label: item?.ContactName,
                        }

                        items.push(_i);
                    } else if (lookupDataType === 'tasks' || lookupDataType === "Tasks") {
                        let _i = {
                            value: item?._id,
                            label: item?.Subject || 'N/A',
                        }

                        items.push(_i);
                    } else if (lookupDataType === 'inventory') {
                        let _i = {
                            value: item?._id,
                            label: item?.InventoryName,
                        }

                        items.push(_i);
                    }
                    else if (lookupDataType === "channel-partner") {
                        let _i = {
                            value: item?._id,
                            label: item.ChannelPartnerName ? item.ChannelPartnerName : item?.ChannerPartnerName,
                        };

                        items.push(_i);
                    }
                    else {
                        let _i = {
                            value: item?._id,
                            label: item?.Subject || item?.ContactName,
                        }

                        items.push(_i);
                    }

                }
            }
        });
        setData(items);
    }, [input?.lookupModule, lookupDataType, open])

    return (
        <>
            {canChangeModuleName() && changeModuleOption && (
                <SelectModule
                    // lookupDataType={lookupDataType || "lookupDataType"}
                    lookupDataType={
                        labelType == "Opportunities"
                            ? "deals"
                            : labelType || "lookupDataType"
                    }
                    setLookupDataType={setLookupDataType}
                    labelType={
                        labelType == "Opportunities" ? "Opportunity" : labelType
                    }
                    // labelType={"Select"}
                    values={values}
                    setValues={setValues}
                    // disabled={true}
                    editable={editable}

                    disabled={
                        values?.contactTitle == "Leads" &&
                            values.ContactName &&
                            labelType == "related"
                            ? true
                            : false
                    }
                // edit={true}

                />
            )}
            {/* {canChangeModuleName() && changeModuleOption && (
                <SelectModule
                    // lookupDataType={lookupDataType || "lookupDataType"}
                    lookupDataType={labelType == "Opportunities" ? "deals" : labelType || "lookupDataType"}
                    setLookupDataType={setLookupDataType}
                    labelType={labelType == "Opportunities" ? "Opportunity" : labelType || "Select"}
                    // labelType={"Select"} 
                    editable={editable}
                />
            )} */}
            {console.log("lookupDataTypelookupDataType ==", data, values, input)}

            {(labelType === "contact" || labelType === "contacts" || labelType === "Contacts") &&
                values?.contactTitle == "Leads" &&
                values.ContactName ? (
                <Field
                    values={values}
                    fulldata={fulldata}
                    formType={formType}
                    setValues={setValues}
                    value={input?.value}
                    className="custom-select-edit w-full"
                    name={input?.value}
                    options={data}
                    component={CustomLookup}
                    placeholder={input?.label}
                    disabled={editable}
                    edit={true}
                    labelType={labelType}

                />
            ) : (
                <Field
                    values={values}
                    fulldata={fulldata}
                    formType={formType}
                    setValues={setValues}
                    value={input?.value}
                    className="custom-select-edit w-full"
                    name={input?.value}
                    // name={input?.label}
                    options={data}
                    component={CustomLookup}
                    placeholder={input?.label}
                    disabled={
                        values?.contactTitle == "Leads" && values.ContactName ? true : false
                    }
                    edit={true}
                    labelType={labelType}

                />
            )}   {/* <Field
                values={values}
                fulldata={fulldata}
                formType={formType}
                setValues={setValues}
                value={input?.value}
                className="custom-select-edit disabled:bg-[#f2f2f2]"
                name={input?.value}
                options={data}
                component={CustomLookup}
                placeholder={input?.label}
                disabled={editable}
                edit={true}
            /> */}
        </>
    )
}

export default LookupModuleFieldEdit