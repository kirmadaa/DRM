import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { ADD_STAGE } from "../../../Redux/actions/pipeline";
import { ErrorMessage } from "formik";

const StageModal = ({
  modal,
  // setModal,
  handleClose,
  getAllStages,
  // setPipelineModal,
}) => {
  const [data, setData] = useState({
    stageTitle: "",
    Probability: "",
    DealCategory: "Open",
    ForecastCategory: "Pipeline",
    colour: "",
  });
  const [stageError, setStageError] = useState("")

  const dispatch = useDispatch();
  const postStage = async () => {
    if (data.stageTitle && data.Probability) {
      let newData = { ...data };
      const res = await dispatch(ADD_STAGE(newData));
      if (res === 200) {
        setData({
          stageTitle: "",
          Probability: "",
          DealCategory: "Open",
          ForecastCategory: "Pipeline",
          colour: "",
        });
        getAllStages();
        handleClose();
      }
    } else {
      setStageError("Stage Title and Probability is required field.")

      setTimeout(() => {
        setStageError("")
      }, 5000);
    }

  };

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          handleClose();
          setData({
            stageTitle: "",
            Probability: "",
            DealCategory: "Open",
            ForecastCategory: "Pipeline",
            colour: "",
          });
        }}
      >
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
              <Dialog.Panel className="w-full max-w-4xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB] text-center"
                >
                  Create New Stage
                </Dialog.Title>
                <div className="my-10">
                  <div className="mb-2 flex justify-start items-center space-x-2">
                    <div className="flex justify-start items-center space-x-2">
                      <label
                        htmlFor="firstName"
                        className="text-lg  w-40 text-[#929296] font-medium"
                      >
                        Stage Name<span className="text-red-800 ml-2">*</span>
                      </label>

                    </div>

                    <div>
                      <input
                        name="stageTitle"
                        type="text"
                        placeholder="Enter Stage Name"
                        className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                        onChange={(e) =>
                          setData({ ...data, stageTitle: e.target.value })
                        }
                        value={data?.stageTitle}
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex justify-start items-end space-x-2">
                    <div className="flex justify-start items-center space-x-2">
                      <label
                        htmlFor="firstName"
                        className="text-lg  w-40 text-[#929296] font-medium"
                      >
                        Probability %<span className="text-red-800 ml-2">*</span>
                      </label>

                    </div>
                    <div className="w-full">
                      <input
                        name="Probability"
                        type="number"
                        placeholder="Enter Probability"
                        className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                        value={data?.Probability}
                        onChange={(e) =>
                          setData({ ...data, Probability: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-2 flex items-center justify-start space-x-2">
                    <div className="flex justify-start items-center space-x-2">
                      <div
                        htmlFor="roleId"
                        className="text-lg w-40 text-[#929296] font-medium"
                      >
                        Deal Category<span className="text-red-800">*</span>
                      </div>

                    </div>
                    <div className="w-full py-[10px] px-4 border-[1.5px] bg-[#fff] border-[#dce2eb] rounded-[10px]">
                      <select
                        className="form-control w-full placeholder-opacity-100 focus:outline-0 text-base"
                        placeholder="Select Module"
                        name="DealCategory"
                        onChange={(e) =>
                          setData({ ...data, DealCategory: e.target.value })
                        }
                      >
                        <option value="Open">Open</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row  flex mb-3 items-center">
                    <div className="flex justify-start items-center space-x-2">
                      <label
                        htmlFor="roleId"
                        className="text-md w-44 text-[#929296] font-medium Forecast Category"
                      >
                        Forecast Category<span className="text-red-800 px-2">*</span>
                      </label>

                    </div>
                    <div className="col-sm-6 w-full py-[10px] px-4 border-[1.5px] bg-[#fff] border-[#dce2eb] rounded-[10px]">
                      <select
                        className="form-control w-full placeholder-opacity-100 focus:outline-0 text-base"
                        placeholder="Select Module"
                        name="parent_id"
                        onChange={(e) =>
                          setData({ ...data, ForecastCategory: e.target.value })
                        }
                      >
                        {data?.DealCategory === "Closed Won" ? (
                          <>
                            <option value="Closed">Closed</option>
                          </>
                        ) : data?.DealCategory === "Closed Lost" ? (
                          <option value="Omitted">Omitted</option>
                        ) : (
                          <>
                            <option value="Commited">Commited</option>
                            <option value="Pipeline">Pipeline</option>
                            <option value="Best Case">Best Case</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row  flex mb-3 items-center">
                    <label
                      htmlFor="colour"
                      className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Select Colour
                    </label>
                    <div className="col-sm-6 w-full py-[10px] px-4 border-[1.5px] bg-[#fff] border-[#dce2eb] rounded-[10px]">
                      <select
                        className="form-control w-full placeholder-opacity-100 focus:outline-0 text-base"
                        placeholder="Select Module"
                        name="colour"
                        onChange={(e) =>
                          setData({ ...data, colour: e.target.value })
                        }
                      >
                        <option value="">Select Colour</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                      </select>
                    </div>
                  </div>
                </div>
                {stageError && <div className="m-4 flex justify-center text-red-500">{stageError}</div>}
                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] w-full"
                    onClick={() => {
                      handleClose();
                      setData({
                        stageTitle: "",
                        Probability: "",
                        DealCategory: "Open",
                        ForecastCategory: "Pipeline",
                        colour: "",
                      });
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={postStage}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center w-full"
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StageModal;
