import React, { useState } from "react";
import { Edit, PenTool, Trash, Trash2 } from "react-feather";
import RuleEdit from "./RuleEdit";
import AddCase from "../Add/AddCase";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_CASE_ESCALATION_BY_ID,
  UPDATE_CASE_ESCALATION,
} from "../../../../Redux/actions/caseEscalation";
import moment from "moment";

const EditLayout = () => {
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState();
  const [addCase, setAddCase] = useState(false);
  const [editOrder, setEditOrder] = useState(false);
  const [ruleEditData, setRuleEditData] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();
  const data = {
    accountName: "King's Man",
    phone: "555-555-5555",
    accountType: "Vendor",
    annualRevenue: "$ 850,000.00",
    territories: "",
  };
  const handleDelete = (item) => {
    let newData = editData?.Rule?.filter(
      (ele) => JSON.stringify(ele) !== JSON.stringify(item)
    );
    dispatch(UPDATE_CASE_ESCALATION(id, { ...editData, Rule: newData }))?.then(
      (res) => {
        if (res?.success) {
          setEditData({
            ...editData,
            Rule: newData,
          });
        }
      }
    );
  };
  const getEditData = () => {
    dispatch(GET_CASE_ESCALATION_BY_ID(id))?.then((res) =>
      setEditData(res?.data?.data)
    );
  };

  useEffect(() => {
    if (id) {
      getEditData();
    }
  }, [id]);
  return (
    <div className="rounded-2xl bg-[white] w-full p-6">
      {editShow ? (
        <>
          <RuleEdit
            setEditShow={setEditShow}
            data={editData}
            getData={getEditData}
            ruleEditData={ruleEditData}
            setRuleEditData={setRuleEditData}
          />
        </>
      ) : addCase ? (
        <>
          <AddCase
            SetShowCase={setAddCase}
            editData={editData}
            getData={getEditData}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between m-3">
            <h2 className="font-semibold text-lg text-primary">
              Case Escalation Rules
            </h2>
            <div>
              <p>Help</p>
            </div>
          </div>
          <p className="text-sm mt-1">
            Your organization's Case escalation rule entries are listed here.
            The escalation process will begin when the rule criteria is met.
            <br /> The Case will be escalated if it is not closed within the
            specified escalation time.
          </p>
          <div className="grid grid-cols-4 mt-6">
            <div className="col-span-1">
              <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                Case Escalation Rule Name :
              </h6>
              <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                Created By :
              </h6>
              <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                Active :
              </h6>
            </div>
            <div className="col-span-3 ">
              <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                {editData?.CaseEscalationTitle}{" "}
                <span
                  className="text-primary mx-2 font-medium cursor-pointer"
                  onClick={() => setAddCase(true)}
                >
                  {" "}
                  Rename
                </span>{" "}
              </p>
              <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                {" "}
                {moment(editData?.createdTime).format("DD-MM-YYYY")}
              </p>
              <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                {" "}
                {editData?.Active ? "Active" : "inactive"}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <p className="font-medium text-primary  px-8 py-2 rounded-2xl">
              Rule Entries
            </p>
            <button
              className="font-medium text-primary bg-white border border-primary px-8 py-2 rounded-2xl"
              type="button"
              onClick={() => setEditOrder(!editOrder)}
            >
              {!editOrder ? "Reorder" : "Done"}
            </button>
          </div>
          <div className="mt-4">
            <div>
              {200 === 200 ? (
                <div className="w-full border-[1.5px] border-[#E6E6EB] rounded-2xl">
                  <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
                    <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium "></th>
                        <th className="px-6 py-3 text-left font-medium ">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left font-medium ">
                          Criteria
                        </th>
                        <th className="px-6 py-3 text-left font-medium ">
                          Escalation times are set by
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {editData?.Rule?.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white cursor-pointer border-b border-[1.5px]-[#E6E6EB]"
                        >
                          <th
                            scope="row"
                            className="th-main px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left"
                          >
                            <div className=" menu-item ">
                              <div className="flex justify-center gap-2">
                                <div
                                  onClick={() => {
                                    setRuleEditData(item);
                                    setEditShow(true);
                                  }}
                                >
                                  <Edit size={16} />
                                </div>
                                <div onClick={() => handleDelete(item)}>
                                  <Trash2 size={16} />
                                </div>
                              </div>
                            </div>
                          </th>
                          <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                            <input
                              type="number"
                              value={index + 1}
                              className="w-1/4"
                              disabled={!editOrder}
                            />
                          </td>
                          <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                            {Object.entries(item?.Criteria)?.map(
                              ([key, value], index) => {
                                if (key.includes("cond")) {
                                  return (
                                    <div>
                                      {`${value?.key} ${value?.oprator} ${value?.value}`}
                                      ;
                                    </div>
                                  );
                                }
                              }
                            )}
                          </td>
                          <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                            {item?.Details}
                          </td>

                          {/* <td>Delete</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : 400 === 400 ? (
                <p className="text-center">No data found</p>
              ) : 500 === 500 ? (
                <p className="text-center">Internal server error</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-start mt-4">
            <button
              className="font-medium text-white bg-primary  px-8 py-2 rounded-2xl"
              onClick={() => setEditShow(true)}
            >
              Add Another Rule
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditLayout;
