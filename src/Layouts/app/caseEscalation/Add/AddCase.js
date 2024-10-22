import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GENRATE_NEW_CASE_ESCALATION,
  UPDATE_CASE_ESCALATION,
} from "../../../../Redux/actions/caseEscalation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddCase = ({ SetShowCase, editData, getData }) => {
  const [data, setData] = useState({
    CaseEscalationTitle: "",
    Active: "",
  });
  const dispatch = useDispatch();
  const handleAdd = async () => {
    if (data?.CaseEscalationTitle) {
      if (editData) {
        const res = await dispatch(UPDATE_CASE_ESCALATION(editData?._id, data));
        if (res?.success) {
          getData();
          SetShowCase(false);
        }
      } else {
        const res = await dispatch(GENRATE_NEW_CASE_ESCALATION(data));
        if (res?.success) {
          getData({
            offset: 1,
            limit: 10,
            search: [],
          });
          SetShowCase(false);
        }
      }
    } else {
      toast.warn("Please enter CaseEscalation Title");
    }
  };
  useEffect(() => {
    if (editData) {
      setData({
        ...data,
        CaseEscalationTitle: editData?.CaseEscalationTitle,
        Active: editData?.Active,
      });
    }
  }, [editData]);
  return (
    <div className="rounded-2xl bg-[white] w-full p-6">
      <div className="flex justify-between m-3">
        <h2 className="font-semibold text-lg text-primary">
          Case Escalation Rule Information
        </h2>
      </div>
      <div className="form-group row flex mb-3 items-center max-w-2xl gap-5 mt-5">
        <label
          htmlFor="firstName"
          className="col-sm-3 text-lg text-[#929296] font-medium col-form-label whitespace-nowrap"
        >
          Case Escalation Rule Name <span className="text-red-800">*</span>
        </label>

        <div className="col-sm-6 w-full">
          <input
            name="CaseEscalationTitle"
            type="text"
            placeholder="Enter CaseEscalation Title"
            className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
            onChange={(e) =>
              setData({ ...data, CaseEscalationTitle: e.target.value })
            }
            value={data?.CaseEscalationTitle}
          />
        </div>
      </div>
      <div className="flex gap-2 text-start mt-4">
        <label htmlFor="Active" className="min-w-[266px]">
          Active
        </label>
        <input
          type="checkbox"
          id="Active"
          name="Active"
          checked={data?.Active}
          value={data?.Active}
          onChange={(e) => {
            setData({ ...data, Active: e.target.checked });
          }}
        />
      </div>
      <div className="flex justify-start gap-3 mt-4">
        <button
          className="font-medium text-[#FFFDEE] bg-[#191242] px-8 py-2 rounded-2xl flex gap-2"
          onClick={() => handleAdd()}
        >
          Save
        </button>
        <button
          className="font-medium text-primary bg-white border border-primary px-8 py-2 rounded-2xl"
          onClick={() => SetShowCase(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCase;
