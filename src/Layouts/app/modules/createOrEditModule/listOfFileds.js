import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const CustomDragIcon = () => {
  return (
    <div className="flex justify-start items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 -mr-4 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    </div>
  );
};

const ListOfFields = ({ getItemStyle, LeftsideContent, addSection }) => {
  return (
    <div className="w-full bg-gray-100 shadow">
      <Droppable isDropDisabled droppableId="items" type="ITEM">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <div className="my-2  font-medium flex justify-between items-center">
              <h3 className="text-primary">Select Fields</h3>
              <button
                className="bg-primary text-white font-[300] px-2 py-1 rounded-md shadow"
                onClick={addSection}
              >
                Add Section
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LeftsideContent?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="p-1 shadow bg-white mt-2 flex justify-between items-center"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <span>{item?.name}</span>
                      <CustomDragIcon />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ListOfFields;
