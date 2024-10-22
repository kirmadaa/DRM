import React, { Fragment } from "react";
import Card, { NoDataCard } from "./Card";
import { Droppable } from "react-beautiful-dnd";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Menus from "../../../assets/images/dashboard/menus.svg";
import { CheckCircle } from "react-feather";
import { useSelector } from "react-redux";

const Column = ({
  column,
  isDropDisabled,
  stages,
  tasks,
  setStageModal,
  buttonState,
  updatePipeline,
  handleCancel,
  makeDefault,
  handlePipelineDelete,
  handleClone,
  addStageIntoPipeline,
  removeStageFromPipeline,
}) => {
  const { stageList } = useSelector((store) => store?.pipelineReducer);


  // let abc = stageList?.data?.pipelineData?.filter(function(val) {
  //   return column?.stages.indexOf(val?.stageTitle) == -1;
  // });

  let intactStageList = stageList?.data?.pipelineData?.filter(function (cv) {
    return !column?.stages?.find(function (e) {
      return e.stageTitle == cv.stageTitle;
    });
  });

  return (
    <div className="w-full bg-[#F0F0F5] p-1 rounded-lg">
      <div className="p-3 flex justify-between">
        {/* Carissa Kidman */}
        <div className="flex justify-start">
          <p className="text-[#18181B]  text-[14px] font-medium mb-[6px] mx-1">
            {column.title}
          </p>
          {column?.Default && <CheckCircle />}
        </div>
        <div>
          <Menu as="div" className="relative">
            <div>
              <Menu.Button>
                <img
                  src={Menus}
                  alt="menu "
                  className="rounded-md cursor-pointer mt-2"
                />
              </Menu.Button>
            </div>
            <Menu.Items
              style={{ zIndex: 1000 }}
              className="absolute right-0  mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                    onClick={() => {
                      makeDefault(column);
                    }}
                    type="button"
                  >
                    <span className="ml-2">Set As Default</span>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                    type="button"
                    onClick={() => {
                      handleClone(column);
                    }}
                  >
                    <span className="ml-2">Clone</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center px-5 py-[10px] text-sm`}
                    type="button"
                    onClick={() => {
                      handlePipelineDelete(column?._id);
                    }}
                  >
                    <span className="ml-2">Delete</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

      </div>
      <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          // isDraggingOver={snapshot.isDraggingOver}
          // className={`border-2 border-dashed ${
          //   snapshot.isDraggingOver ? "border-primary" : "border-white"
          // } `}
          >
            {tasks?.length !== 0 ? (
              tasks?.map((task, index) => {
                return (
                  <Card
                    key={task?.id}
                    task={task}
                    index={index}
                    removeStageFromPipeline={(taskData) =>
                      removeStageFromPipeline(taskData, column)
                    }
                  // byModuleData={byModuleData}
                  />
                );
              })
            ) : (
              <NoDataCard />
            )}
          </div>
        )}
      </Droppable>
      {buttonState?.includes(column.id) && (
        <div className="text-right">
          <button
            onClick={() => handleCancel()}
            className="inline-flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-white text-primary border-b border-primary hover:bg-opacity-90 m-2"
          >
            Cancel
          </button>
          <button
            onClick={() => updatePipeline(column)}
            className="inline-flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90 m-2"
          >
            Save
          </button>
        </div>
      )}
      <div className="text-center">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button>
              <div className=" p-2 text-blue-700 font-medium">Add Stages</div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-50 absolute right-0 mt-2 w-[200px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-0 py-1 ">
                {/* {stageList?.data?.pipelineData?.map((item, index) => (
                  <>
                    {column?.stages?.map((ele, i) => {
                      if (ele?.stageTitle === item?.stageTitle)
                        return (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`border-b ${
                                    active
                                      ? "text-white bg-primary"
                                      : "text-gray-500"
                                  } group flex w-full items-center px-2 py-1.5 text-sm`}
                                  // onClick={() => setStageModal(true)}
                                >
                                  {item?.stageTitle}
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        );
                    })}
                  </>
                ))} */}
                {/* {console.log("intactStageList===>", intactStageList)} */}
                {intactStageList?.map((item, index) => (
                  (item.stageTitle ? <Menu.Item key={item._id}>
                    {({ active }) => (
                      <button
                        className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                          } group flex w-full items-center px-2 py-1.5 text-sm`}
                        onClick={() => addStageIntoPipeline(item, column)}
                      >
                        {item?.stageTitle}
                      </button>
                    )}
                  </Menu.Item>
                    :
                    null)

                ))}

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                        } group flex w-full items-center px-2 py-1.5 text-sm`}
                      onClick={() => setStageModal(true)}
                    >
                      Create new Stage
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div >
  );
};

export default Column;
