import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Creatable from "react-select/creatable";
import { ADD_PIPELINE } from "../../../Redux/actions/pipeline";
import { toast } from "react-toastify";

const PipelineModal = ({
  modal,
  setModal,
  handleClose,
  setStageModal,
  getAllPipelines,
}) => {
  const [data, setData] = useState({
    pipelineTitle: "",
    Layout: "standard",
    Default: false,
  });
  const [stageArray, setStageArray] = useState();
  const dispatch = useDispatch();

  const { stageList } = useSelector((store) => store?.pipelineReducer);
  const { pipelineModal } = useSelector((store) => store?.pipelineReducer);

  const postPipeline = async () => {
    if (stageArray?.length && data?.pipelineTitle) {
      const newData = { ...data };
      // newData.stages = stageArray?.map((item) => item?.value);
      newData.stages = stageArray
        ?.map((item) => {
          return stageList?.data?.pipelineData?.find((ele, i) => {
            if (ele?._id === item?.value) {
              return true;
            }
          });
        })
        ?.map((item, index) => {
          return {
            ...item,
            order: index + 1,
          };
        });

      const response = await dispatch(ADD_PIPELINE(newData));
      if (response === 200) {
        setData({
          pipelineTitle: "",
          Layout: "standard",
          Default: false,
        });
        setStageArray();
        getAllPipelines();
        handleClose();
        dispatch({
          type: "PIPELINE_MODAL",
          data: false,
        });
      }
    } else {
      toast.warn("Pipeline title and stages are mandatory! ");
    }
  };
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          handleClose();
          if (!pipelineModal) {
            setData({
              pipelineTitle: "",
              Layout: "standard",
              Default: false,
            });
            setStageArray();
          }
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
                  className="text-md font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB] text-center"
                >
                  Create New Pipeline
                </Dialog.Title>
                <div className="my-10">
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="Pipeline"
                      className="col-sm-3 text-md w-[160px] text-[#929296] font-medium col-form-label whitespace-nowrap"
                    >
                      Pipeline Name <span className="text-red-800 ">*</span>
                    </label>
                    <div className="col-sm-6 w-full">
                      <input
                        name="pipelineTitle"
                        type="text"
                        placeholder="Enter Pipeline Name"
                        className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#fff] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                        onChange={(e) =>
                          setData({ ...data, pipelineTitle: e.target.value })
                        }
                        value={data?.pipelineTitle}
                      />
                    </div>
                  </div>

                  <div className="form-group row  flex mb-3 items-center">
                    <label
                      htmlFor="roleId"
                      className="col-sm-3 text-md w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Layout
                    </label>
                    <div className="col-sm-6 w-full py-[10px] px-4 border-[1.5px] bg-[#fff] border-[#dce2eb] rounded-[10px]">
                      <select
                        className="form-control w-full placeholder-opacity-100 focus:outline-0 text-base"
                        placeholder="Select Module"
                        name="Layout"
                        onChange={(e) =>
                          setData({ ...data, Layout: e.target.value })
                        }
                      >
                        <option value="">Select</option>
                        <option value="standard">Standard</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row  flex mb-3 items-center">
                    <label
                      htmlFor="stages"
                      className="col-sm-3 text-md w-[160px] text-[#929296] font-medium col-form-label"
                    >
                      Stages <span className="text-red-800">*</span>
                    </label>
                    <div className="col-sm-6 w-full bg-[#fff] border rounded-xl">
                      <Creatable
                        options={stageList?.data?.pipelineData?.map(
                          (item, index) => {
                            return {
                              label: item?.stageTitle,
                              value: item?._id,
                            };
                          }
                        )}
                        defaultValue={stageArray}
                        createOptionPosition="first"
                        formatCreateLabel={() => "Create new  Stage"}
                        onCreateOption={() => {
                          setModal(false);
                          dispatch({
                            type: "PIPELINE_MODAL",
                            data: true,
                          });
                          setStageModal(true);
                        }}
                        isMulti
                        onChange={
                          (e) => setStageArray(e)
                          // console.log("dddddd", e)
                        }
                      />
                    </div>
                  </div>

                  <div className="hover:bg-gray-50 flex gap-2 items-center">
                    <label htmlFor="default">Set Default</label>
                    <input
                      type="checkbox"
                      id="default"
                      checked={data?.Default}
                      onChange={(e) => {
                        setData({ ...data, Default: e.target.checked });
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] w-full"
                    onClick={() => {
                      handleClose();
                      if (!pipelineModal) {
                        setData({
                          pipelineTitle: "",
                          Layout: "standard",
                          Default: false,
                        });
                        setStageArray();
                      }
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => postPipeline()}
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

export default PipelineModal;
