import React from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import { useDispatch } from "react-redux";
import { SAMPLE_DATA_DELETE } from "../../../Redux/actions/removesampleData";
import useAccessibleRole from "../../../hooks/useAccessibleRole";

const RemoveSample = () => {
  const dispatch = useDispatch();

  const { read } = useAccessibleRole("sampleData");

  const handleDeleteData = () => {
    dispatch(SAMPLE_DATA_DELETE("sample-data-delete"));
  };

  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <h2 className="font-semibold">Remove sample data</h2>
        <p className="text-xs mt-1">
          All changes that you made to the sample data will be lost. Are you
          sure of removing them?
        </p>
        <div className="mt-6 flex">
          <button
            onClick={() => handleDeleteData()}
            className=" bg-primary rounded-2xl text-white py-2 px-10"
            disabled={!read}
          >
            Yes,Proceed
          </button>
          <button
            disabled={!read}
            className=" py-2 px-10 ml-2  border-1 border-blue-100 text-black bg-[#EDF2F8] rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSample;
