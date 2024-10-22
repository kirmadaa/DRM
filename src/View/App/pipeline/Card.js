import React from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Circle, X } from "react-feather";

const Card = ({ index, task, removeStageFromPipeline }) => {
  const [show, setShow] = useState(false);
  const isDragDisabled = false;
  return (
    <>
      <Draggable
        draggableId={task?.id}
        isDragDisabled={isDragDisabled}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            //   isDragging={snapshot.isDragging}
            //   isDragDisabled={isDragDisabled}
            className={`mt-1 bg-[#FFFFFF] border  border-[#D8D6D6] ${
              snapshot.isDragging ? "border-primary" : "border-white"
            }  py-2 px-3 rounded-lg`}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <div {...provided.dragHandleProps}>
              <div className="flex justify-evenly">
                {task?.colour && (
                  <div className="flex justify-start">
                    <Circle
                      className={`fill-${task?.colour}-500 mx-2`}
                      size={14}
                    />
                  </div>
                )}
                <p>{task?.id}</p>
                {show && (
                  <div
                    className="cursor-pointer"
                    onClick={() => removeStageFromPipeline(task)}
                  >
                    {" "}
                    <X fill="fill-red-200" />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;

export const NoDataCard = () => {
  return (
    <div className="mt-[8px]  bg-[#F0F0F5] p-[16px] rounded-lg  justify-center flex items-center">
      <p className="">No Stages Found.</p>
    </div>
  );
};
