import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_FORM_LEAD,
  GET_FORM_CONTACT,
  GET_FORM_ACCOUNT,
  GET_FORM_OPPORTUNITY,
  UPDATE_FORM_LEAD,
  UPDATE_FORM_CONTACT,
  UPDATE_FORM_ACCOUNT,
  UPDATE_FORM_OPPORTUNITY,
} from "../../../Redux/actions/fieldMap";
import { Link } from "react-router-dom";

function FieldMap() {
  const dispatch = useDispatch();
  const leadFields = useSelector((state) => state.FieldMap.leadFields);
  const contactFields = useSelector((state) => state.FieldMap.contactFields);
  const accountFields = useSelector((state) => state.FieldMap.accountFields);
  const opportunityFields = useSelector(
    (state) => state.FieldMap.opportunityFields
  );
  const [tableData, setTableData] = useState([]);
  const [contactInputs, setContactInputs] = useState([]);
  const [accountInputs, setAccountInputs] = useState([]);
  const [opportunityInputs, setOpportunityInputs] = useState([]);
  const [leadInputs, setLeadInputs] = useState([]);
  const [result, setResult] = useState({});
  console.log(
    "tableData",
    tableData,
    "contactInputs",
    contactInputs,
    "accountInputs",
    accountInputs
  );
  useEffect(() => {
    let promisAll = [];
    promisAll.push(dispatch(GET_FORM_LEAD()));
    promisAll.push(dispatch(GET_FORM_CONTACT()));
    promisAll.push(dispatch(GET_FORM_ACCOUNT()));
    promisAll.push(dispatch(GET_FORM_OPPORTUNITY()));
    Promise.all(promisAll);
  }, []);

  useEffect(() => {
    if (
      leadFields?.sections &&
      contactFields?.sections &&
      accountFields?.sections &&
      opportunityFields?.sections
    ) {
      var fields = [];

      leadFields.sections.map((section, key) => {
        Object.keys(section.inputs).map((field) => {
          fields.push({
            value: section.inputs[field].value,
            type: section.inputs[field].type,
          });
        });
      });

      setLeadInputs(fields);
      var fields = [];
      fields.push({
        id: "none",
        value: "none",
        type: "none",
      });

      contactFields.sections.map((section, key) => {
        Object.keys(section.inputs).map((field) => {
          var temp = {};
          temp.id = section.inputs[field].value;
          temp.value = section.inputs[field].label;
          temp.type = section.inputs[field].type;

          fields.push(temp);
        });
      });
      setContactInputs(fields);
      var fields = [];
      fields.push({
        id: "none",
        value: "none",
        type: "none",

      });
      accountFields.sections.map((section, key) => {
        Object.keys(section.inputs).map((field) => {
          var temp = {};
          temp.id = section.inputs[field].value;
          temp.value = section.inputs[field].label;
          temp.type = section.inputs[field].type;
          fields.push(temp);
        });
      });
      setAccountInputs(fields);
      var fields = [];
      fields.push({
        id: "none",
        value: "none",
        type: "none",
      });

      opportunityFields.sections.map((section, key) => {
        Object.keys(section.inputs).map((field) => {
          var temp = {};
          temp.id = section.inputs[field].value;
          temp.value = section.inputs[field].label;
          temp.type = section.inputs[field].type;
          fields.push(temp);
        });
      });
      setOpportunityInputs(fields);
    }
  }, [leadFields, contactFields, accountFields, opportunityFields]);
  console.log("leadInputs", leadInputs, contactInputs, accountInputs, opportunityInputs);
  useEffect(() => {
    var temp = [];
    for (let i = 0; i < leadInputs.length; i++) {
      temp.push({
        lead: leadInputs[i]?.value,
        opportunity: leadInputs[i]?.value,
        account: leadInputs[i]?.value,
        contact: leadInputs[i]?.value,
        type: leadInputs[i]?.type
      });
    }
    setTableData(temp);
  }, [leadInputs, contactInputs, accountInputs, opportunityInputs]);

  const updateContact = (leadFieldName, value, field) => {
    contactFields.sections.map((section, key) => {
      Object.keys(section.inputs).map((field) => {
        if (section.inputs[field].value === value) {
          section.inputs[field].value = leadFieldName;
        }
      });
    });
  };

  const updateAccount = (leadFieldName, value, field) => {
    accountFields.sections.map((section, key) => {
      Object.keys(section.inputs).map((field) => {
        if (section.inputs[field].value === value) {
          section.inputs[field].value = leadFieldName;
        }
      });
    });
  };

  const updateOpportunity = (leadFieldName, value, field) => {
    opportunityFields.sections.map((section, key) => {
      Object.keys(section.inputs).map((field) => {
        if (section.inputs[field].value === value) {
          section.inputs[field].value = leadFieldName;
        }
      });
    });
  };
  const checkFieldInContact = (leadFieldName) => {
    console.log("contactFields", leadFieldName, contactFields);
    let alreadyExist = false;
    contactFields.sections.map((section, key) => {
      Object.keys(section.inputs).map((field) => {
        if (section.inputs[field].value === leadFieldName) {
          alreadyExist = true;
        }
      });
    });
    return alreadyExist;
  };

  const checkFieldInAccount = (leadFieldName) => {
    console.log("accountFields", leadFieldName, accountFields);

    let alreadyExist = false;
    accountFields.sections.map((section, key) => {
      Object.keys(section.inputs).map((field) => {
        if (section.inputs[field].value === leadFieldName) {
          alreadyExist = true;
        }
      });
    });
    return alreadyExist;
  };

  const checkFieldInOpportunity = (leadFieldName) => {
    console.log("opportunityFields", leadFieldName, opportunityFields);

    let alreadyExist = false;
    opportunityFields.sections.map((section, key) => {
      Object.keys(section.inputs).map((field) => {
        if (section.inputs[field].value === leadFieldName) {
          alreadyExist = true;
        }
      });
    });
    return alreadyExist;
  };
  // console.log(result)

  const updatetableDataField = (module, value, Select) => {
    console.log("jenis", module, value);
    let afterUpdate = tableData?.map((data) => {
      if (data?.lead === module) {
        data["displayField"] = value;
        data[Select] = value;
      }
      return data;
    });
    console.log("afterUpdate", afterUpdate);
    setTableData(afterUpdate);
  };

  const handleSelect = (leadFieldName, Select, value, e, index) => {
    let temp = { ...result };
    let alreadyExist = false;
    console.log("check-maping issue------", leadFieldName, Select, value, e);
    Object.keys(temp).map((leadFieldName) => {
      if (temp[leadFieldName][Select] === value) {
        alreadyExist = true;
      }
    });
    // if (alreadyExist) {
    //   alert("This field is already mapped");

    //   e.target.value = "none";
    // } else {
    if (Select === "contact") {
      // if (checkFieldInContact(leadFieldName)) {
      //   alert("This field is already mapped");
      //   e.target.value = "none";
      // } else {
      updatetableDataField(leadFieldName, value, Select);
      if (!temp[leadFieldName]) {
        temp[leadFieldName] = {};
        temp[leadFieldName][Select] = value;
      } else {
        temp[leadFieldName][Select] = value;
      }
      setResult(temp);
      // }
    }
    if (Select === "account") {
      // if (checkFieldInAccount(leadFieldName)) {
      //   alert("This field is already mapped");
      //   e.target.value = "none";
      // } else {
      updatetableDataField(leadFieldName, value, Select);
      if (!temp[leadFieldName]) {
        temp[leadFieldName] = {};
        temp[leadFieldName][Select] = value;
      } else {
        temp[leadFieldName][Select] = value;
      }
      console.log("temp----->>>", temp);
      setResult(temp);
      // }
    }
    if (Select === "opportunity") {
      // if (checkFieldInOpportunity(leadFieldName)) {
      //   alert("This field is already mapped");
      //   e.target.value = "none";
      // } else {
      updatetableDataField(leadFieldName, value, Select);
      if (!temp[leadFieldName]) {
        temp[leadFieldName] = {};
        temp[leadFieldName][Select] = value;
      } else {
        temp[leadFieldName][Select] = value;
      }
      setResult(temp);
      // }
    }
    // }
  };
  const onSaved = () => {
    console.log("result-->>", result);
    //debugger;
    Object.keys(result).map((leadFieldName) => {
      Object.keys(result[leadFieldName]).map((Select) => {
        if (result[leadFieldName][Select] !== "none") {
          if (Select === "contact") {
            updateContact(
              leadFieldName,
              result[leadFieldName][Select],
              leadFieldName
            );
          }
          if (Select === "account") {
            updateAccount(
              leadFieldName,
              result[leadFieldName][Select],
              leadFieldName
            );
          }
          if (Select === "opportunity") {
            updateOpportunity(
              leadFieldName,
              result[leadFieldName][Select],
              leadFieldName
            );
          }
        }
      });
    });

    delete leadFields.formOwnerId;
    delete leadFields.organizationId;
    delete leadFields.ModifiedBy;
    delete leadFields.updatedAt;
    delete leadFields.createdAt;

    delete contactFields.formOwnerId;
    delete contactFields.organizationId;
    delete contactFields.ModifiedBy;
    delete contactFields.updatedAt;
    delete contactFields.createdAt;

    delete accountFields.formOwnerId;
    delete accountFields.organizationId;
    delete accountFields.ModifiedBy;
    delete accountFields.updatedAt;
    delete accountFields.createdAt;

    delete opportunityFields.formOwnerId;
    delete opportunityFields.organizationId;
    delete opportunityFields.ModifiedBy;
    delete opportunityFields.updatedAt;
    delete opportunityFields.createdAt;

    dispatch(UPDATE_FORM_LEAD(leadFields));
    dispatch(UPDATE_FORM_CONTACT(contactFields));
    dispatch(UPDATE_FORM_ACCOUNT(accountFields));
    dispatch(UPDATE_FORM_OPPORTUNITY(opportunityFields));
  };
  console.log("contactInputs", tableData);
  return (
    <>
      {tableData?.length > 0 && (
        <div className="flex gap-3 justify-end mt-5">
          <Link
            to={"/crm/setup"}
            className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
          >
            <i data-feather="mail" className=""></i>Back
          </Link>

          <button
            className=" bg-primary rounded-2xl text-white py-2 px-10"
            onClick={onSaved}
          >
            Save
          </button>
        </div>
      )}
      <div className="flex rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex-row justify-center items-center m-6 md:flex-row">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {tableData?.length > 0 ? (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Leads
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Contacts
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Accounts
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Opportunities
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("tableData====>", tableData, contactInputs, accountInputs, opportunityInputs)}
                  {tableData?.map((data, key) => {
                    return (
                      <tr key={key} className="border-b ">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {data.lead}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <select
                            // value={data?.lead || ""}
                            className="min-w-[210px]"
                            value={data?.contact || ""}
                            onChange={(e) =>
                              handleSelect(
                                data.lead,
                                "contact",
                                e.target.value,
                                e,
                                key
                              )
                            }
                          >
                            {[...contactInputs.filter(item => item.type === "none" ? true : item.type === data.type)].map((input, key) => {
                              return (
                                <option key={key} value={input.id}>
                                  {input.value}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <select
                            className="min-w-[210px]"
                            value={data?.account || ""}
                            onChange={(e) =>
                              handleSelect(
                                data.lead,
                                "account",
                                e.target.value,
                                e,
                                key
                              )
                            }
                          >
                            {[...accountInputs.filter(item => item.type === "none" ? true : item.type === data.type)].map((input, key) => {
                              return (
                                <option key={key} value={input.id}>
                                  {input.value}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <select
                            className="min-w-[210px]"
                            value={data?.opportunity || ""}
                            onChange={(e) =>
                              handleSelect(
                                data.lead,
                                "opportunity",
                                e.target.value,
                                e,
                                key
                              )
                            }
                          >
                            {[...opportunityInputs.filter(item => item.type === "none" ? true : item.type === data.type)].map((input, key) => {
                              return (
                                <option key={key} value={input.id}>
                                  {input.value}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center items-center h-96">
                <div className="p-2 w-full min-h-[70dvh] flex justify-center flex-col items-center">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Module Not Found
                  </h3>
                  <p className="font-normal text-gray-700 ">
                    If you need Fiedl Map, please create all module ( Leads ,
                    Contacts , Accounts , Opportunities ) first
                  </p>
                  <Link
                    to="/crm/modules"
                    type="button"
                    className="text-white mt-4 bg-primary hover:bg-priamry/20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
                  >
                    Create New module
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FieldMap;
