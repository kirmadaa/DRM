import { Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import InnerFieldsOfSection from "./innerFieldsOfSection";
import ActionBar from "./actionBar";

const DeleteIcon = () => {
  return (
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
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  borderRadius: 6,
  padding: "6px",
  margin: "0 0 8px 0",
  border: `2px dashed ${isDragging ? "#60a5fa" : "white"}`,
  backgroundColor: "white",
  ...draggableStyle,
});

const LayoutOfSection = ({
  setFormValue,
  error,
  setError,
  handleFieldChange,
  handleDelete,
  onChangeTitle,
  formValue,
}) => {
  return (
    <div className="w-full">
      <ActionBar formValue={formValue} setError={setError} />
      <Droppable droppableId="sections" type="SECTION" direction="vertical">
        {(provided, snapshot) => (
          <div
            // className="px-2"
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3"
            ref={provided.innerRef}
          >
            {formValue?.sections?.map((section, index) => {
              return (
                <Draggable
                  key={String(section?.id)}
                  draggableId={String(section?.id)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="mt-3 w-full bg-white rounded-md hover:shadow-md p-2 hover:border"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className="w-full flex items-center justify-between"
                        style={{ cursor: "grab" }}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type="text"
                          placeholder="Add Section name"
                          name={section?.formTitle}
                          value={section?.formTitle}
                          className="bg-blue-100 rounded-md px-2 py-1 focus:outline-none"
                          onChange={(e) => onChangeTitle(e, index)}
                        />
                        <button
                          title="Delete"
                          className="rounded-full h-10 w-10 "
                          onClick={() => handleDelete(index)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                      <Droppable
                        direction="vertical"
                        droppableId={String(section?.id)}
                        type="ITEM"
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`relative ${snapshot.isDraggingOver
                              ? "bg-blue-50 border-2 border-blue-400 border-dashed "
                              : "border-2 bg-gray-200"
                              } min-h-[120px] rounded-md border-[2px] p-2 border-dashed w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3`}
                            ref={provided.innerRef}
                          >
                            {section?.inputs?.map((item, i) => {
                              // console.log("hello999yy===>", item, section?.inputs)
                              // if (!item?.value) {
                              //   console.log("hello999yy===>",)
                              //   Object.entries(item).map(([filedName, itemm]) => {
                              //     return (
                              //       <Draggable
                              //         key={
                              //           Math.random().toString(36).substring(2, 9) +
                              //           new Date().getTime().toString(36)
                              //         }
                              //         draggableId={item?.id}
                              //         index={i}
                              //       >
                              //         {(provided, snapshot) => (
                              //           <div
                              //             className="flex h-12 justify-start items-center"
                              //             ref={provided.innerRef}
                              //             {...provided.draggableProps}
                              //             {...provided.dragHandleProps}
                              //             style={getItemStyle(
                              //               snapshot.isDragging,
                              //               provided.draggableProps.style
                              //             )}
                              //           >
                              //             <InnerFieldsOfSection
                              //               formValue={formValue}
                              //               item={itemm}
                              //               sectionId={String(section?.id)}
                              //               handleFieldChange={handleFieldChange}
                              //               setFormValue={setFormValue}
                              //               section={section}
                              //               index={i}
                              //               sectionIndex={index}
                              //               error={error}
                              //             />
                              //           </div>
                              //         )}
                              //       </Draggable>
                              //     )

                              //   })

                              // } else {
                              return (
                                <Draggable
                                  key={
                                    Math.random().toString(36).substring(2, 9) +
                                    new Date().getTime().toString(36)
                                  }
                                  draggableId={item?.id}
                                  index={i}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      className="flex h-12 justify-start items-center"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                                    >
                                      <InnerFieldsOfSection
                                        formValue={formValue}
                                        item={item}
                                        sectionId={String(section?.id)}
                                        handleFieldChange={handleFieldChange}
                                        setFormValue={setFormValue}
                                        section={section}
                                        index={i}
                                        sectionIndex={index}
                                        error={error}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              )
                              // }
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default LayoutOfSection;
