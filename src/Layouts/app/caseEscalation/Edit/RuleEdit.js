import React, { useEffect, useState } from "react";
import { MinusCircle, PlusCircle } from "react-feather";
import EnumFilter from "../../../../Components/enumFilter";
import { UPDATE_CASE_ESCALATION } from "../../../../Redux/actions/caseEscalation";
import { useDispatch } from "react-redux";

const RuleEdit = ({
  setEditShow,
  data,
  getData,
  ruleEditData,
  setRuleEditData,
}) => {
  const [conditionArray, setConditionArray] = useState([
    {
      condition: "",
      enum: "IS",
      text: "",
    },
  ]);
  const [entryDetail, setEntryDetail] = useState("CaseCreatedTime");
  const dispatch = useDispatch();

  const removeCondition = (index) => {
    let array = [...conditionArray]?.filter((ele, i) => i !== index);
    setConditionArray(array);
  };

  const handleChange = (i, name, value) => {
    let newArray = [...conditionArray]?.map((item, index) => {
      if (index === i) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setConditionArray(newArray);
  };
  const handleClick = async () => {
    let newObj = {};

    let newArray = conditionArray?.map((item, index) => {
      let key = `cond${index + 1}`;
      return {
        [key]: {
          key: item?.condition,
          oprator: item?.enum,
          value: item?.text,
        },
      };
    });
    // if (ruleEditData) {
    //   newArray = newArray?.filter();
    // }

    let abc = Object.assign({}, ...newArray);
    if (data?.Rule?.length) {
      newObj.Rule = [
        ...data?.Rule,
        {
          Criteria: {
            ...abc,
            CriteriaPattern: "( 1 and 2 )",
          },
          Details: entryDetail,
        },
      ];
    } else {
      newObj.Rule = [
        {
          Criteria: {
            ...abc,
            CriteriaPattern: "( 1 and 2 )",
          },
          Details: entryDetail,
        },
      ];
    }

    if (ruleEditData) {
      newObj.Rule = newObj?.Rule?.filter(
        (ele) => JSON.stringify(ele) !== JSON.stringify(ruleEditData)
      );
    }

    newObj.CaseEscalationTitle = data?.CaseEscalationTitle;
    newObj.Active = data?.Active;


    const res = await dispatch(UPDATE_CASE_ESCALATION(data?._id, newObj));
    if (res?.success) {
      getData();
      setRuleEditData();
      setEditShow(false);
    }
  };

  useEffect(() => {
    if (ruleEditData) {
      let newArray = Object.entries(ruleEditData?.Criteria)
        ?.map(([key, value], index) => {
          if (key.includes("cond")) {
            return {
              condition: value?.key,
              enum: value?.oprator,
              text: value?.value,
            };
          }
        })
        ?.filter((ele) => ele !== undefined);

      setConditionArray([...newArray]);
    }
  }, [ruleEditData]);

  return (
    <div className="rounded-2xl bg-[white] w-full p-6">
      <div className="flex justify-between m-3">
        <h2 className="font-semibold text-lg text-primary">Rule Entry</h2>
        <div>
          <p>Help</p>
        </div>
      </div>
      <p className="text-sm mt-1 bg-[#e2e8f7] rounded-lg p-4 w-3/4">
        Your organization's Case escalation rule entries are listed here. The
        escalation process will begin when the rule criteria is met. The Case
        will be escalated if it is not closed within the specified escalation
        time.
        <ul className="list-disc p-4">
          <li> View criteria pattern below.</li>
          <li>
            Execute rules based on business hours to escalate Cases when your
            personnel are in office.If not,cases will be escalated regardless of
            your operational hours
          </li>
          <li>
            Set the escalation time to determine when Cases will be passed to
            the next level for resolution.
          </li>
        </ul>
      </p>
      <div>
        <p className="font-medium text-primary   py-6 rounded-2xl">
          1. Specify Criteria
        </p>

        <div>
          {conditionArray?.map((item, index) => (
            <div className="flex items-center justify-start gap-5 mb-5">
              <p className="p-2 bg-[#191242] h-5 w-5 ring-offset-2 ring-4  ring-[#E4E6EE] text-[#fff] font-semibold flex items-center justify-center rounded-full text-sm">
                {index + 1}
              </p>
              <p className="test-xs ">
                <div className="flex items-center gap-4">
                  {/* <p className="text-base font-semibold mb-3">Transfer To</p> */}
                  <div className="border border-[#E6E6EB] rounded-xl p-3">
                    <select
                      className="form-control pe-3 focus:outline-none"
                      name="condition"
                      onChange={(e) =>
                        handleChange(index, "condition", e.target.value)
                      }
                      value={item?.condition}
                    >
                      <option value="">Select condition</option>
                      <option value="Account Name">Account Name</option>
                      <option value="Lead Name">Lead Name</option>
                      <option value="Contact Name">Contact Name</option>
                      <option value="Opportunity Name">Opportunity Name</option>
                      <option value="Call Name">Call Name</option>
                      <option value="Task Name">Task Name</option>
                      <option value="Case Name">Case Name</option>
                      <option value="Case Origin">Case Origin</option>
                      <option value="Case Owner">Case Owner</option>
                      <option value="Case Reason">Case Reason</option>
                    </select>
                  </div>
                  <EnumFilter
                    filter={item?.enum}
                    setCondition={(e, value) =>
                      handleChange(index, "enum", value)
                    }
                    name="enumFilter"
                    comp
                  />
                  <input
                    type="text"
                    className="bg-[#F9F9FB] border border-[#191242] rounded-xl px-4 py-3 focus:outline-none w-5/12"
                    onChange={(e) =>
                      handleChange(index, "text", e.target.value)
                    }
                    value={item?.text}
                  />
                  {conditionArray?.length !== 1 && (
                    <MinusCircle
                      className="text-2xl"
                      onClick={() => removeCondition(index)}
                    />
                  )}
                  <PlusCircle
                    className="text-2xl"
                    onClick={() =>
                      setConditionArray([
                        ...conditionArray,
                        {
                          condition: "",
                          enum: "",
                          text: "",
                        },
                      ])
                    }
                  />
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium text-primary   py-6 rounded-2xl">
          2. Rule Entry Details
        </p>

        <div>
          <div className="flex items-center justify-start gap-5 mb-5">
            <p>Escalation times are set by</p>
            <p className="test-xs ">
              <div className="flex items-center gap-4">
                {/* <p className="text-base font-semibold mb-3">Transfer To</p> */}
                <div className="border border-[#E6E6EB] rounded-xl p-3">
                  <select
                    className="form-control pe-3 focus:outline-none"
                    name="condition"
                    onChange={(e) => setEntryDetail(e.target.value)}
                    value={entryDetail}
                  >
                    <option value="CaseCreatedTime">Case Created Time</option>
                    <option value="CaseModifiedTime">Case Modified Time</option>
                  </select>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start gap-4 mt-4">
        <button
          type="button"
          className="font-medium text-white bg-primary  px-8 py-2 rounded-2xl"
          onClick={() => handleClick()}
        >
          Save
        </button>
        <button
          type="button"
          className="font-medium text-primary bg-white border border-primary px-8 py-2 rounded-2xl"
          onClick={() => {
            setRuleEditData();
            setEditShow(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RuleEdit;
