import { Dialog, Transition } from "@headlessui/react";
import React, { memo } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Plus } from "react-feather";
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import BulkPickList from './bulkPickList'
import { object } from "yup";

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9) + new Date().getTime().toString(36)
}

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

const SelectOptionsModal = ({
  modal,
  setModal,
  sourceData,
  saveSelectOptionModelData,
  type = "create",
  updateSelectOptionModelData,
}) => {
  const defaultData = {
    title: type === "create" ? "" : sourceData?.label || "",
    required: type === "create" ? false : sourceData?.required || false,
    options:
      type === "create"
        ? [
          { label: "Option 1", value: getUniqueId(), isDefault: true},
          { label: "Option 2", value: getUniqueId(), isDefault: false},
        ]
        : sourceData?.options || [
          { label: "Option 1", value: getUniqueId(), isDefault: true},
          { label: "Option 2", value: getUniqueId(), isDefault: false },
        ],
  };

  const [title, setTitle] = useState(defaultData.title);
  const [required, setRequired] = useState(defaultData.required);
  const [options, setOptions] = useState(defaultData.options);
  const handleChange = (event, optionId) => {
    const { value } = event.target;
    const updatedOptions = options.map((option, index) =>
      index === optionId ? { ...option, label: value } : option
    );
    setOptions(updatedOptions);
  };

  const saveFunction = () => {
    const data = {
      ...sourceData,
      name: title,
      label: title,
      value: title,
      options,
      required,
    };
    if (type === "update") {
      updateSelectOptionModelData(data);
    } else {
      saveSelectOptionModelData(data);
    }
    setModal(false);
  };

  const AddOptions = () => {
    const updatedOptions = [...options];
    const newOptions = {
      label: `Option ${parseInt(updatedOptions?.length) + 1}`,
      value: getUniqueId(),
    };
    updatedOptions.push(newOptions);
    setOptions(updatedOptions);
  };

  const handleDelete = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // Dragged outside the droppable area
    }

    const reorderedOptions = Array.from(options);
    const [removed] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, removed);

    setOptions(reorderedOptions);
  };

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModal(false)}
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Pick List Properties
                </Dialog.Title>
                <div className="container h-[50vh] overflow-y-scroll ">
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Field Label:</label>
                    <input
                      name="name"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title || ''}
                      className="border border-grey my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                    />
                  </div>
                  <div className="flex justify-between items-center my-4">
                    <label>Pick List Option:</label>
                    <div className="flex justify-start items-center space-x-2">
                      <button
                        type="button"
                        className="text-white ml-auto gap-3 flex items-center bg-primary cursor-pointer font-medium rounded-lg text-sm p-2"
                        onClick={AddOptions}
                      >
                        <Plus size={13} />
                      </button>
                      <BulkPickList options={options} setOptions={setOptions} />
                    </div>
                  </div>
                  <div className="relative flex justify-start w-full  ">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable
                        style={{
                          height: '100px', // Set your desired height
                          overflowY: 'auto', // Set overflow property to allow scrolling if needed
                        }}
                        direction="vertical"
                        droppableId="droppable-options">
                        {(provided) => (
                          <ul className="p-2 w-full" ref={provided.innerRef} {...provided.droppableProps}>
                            {options?.map((option, index) => (
                              <Draggable key={option?.value} draggableId={option?.value} index={index}>
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={option?.value}
                                    className="flex bg-white my-2 px-2 shadow justify-between items-center gap-5"
                                  >
                                    <spna>
                                    <input type="radio" id={index} name="option" value={option.isDefault} checked={option.isDefault} className="mr-3" onChange={(e)=> setOptions(pre => [...pre.map((ele,i) => ({...ele, isDefault: i === index ? true : false}))])}/>
                                    <input
                                      id={index}
                                      name="name"
                                      value={option?.label || ''}
                                      onChange={(event) => handleChange(event, index)}
                                      className="mb-2 border border-grey px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                                      type="text"
                                    />
                                    </spna>
                                    <button
                                      title="Delete"
                                      className="rounded-full h-10 w-10"
                                      onClick={() => handleDelete(index)}
                                    >
                                      <DeleteIcon style={{ fill: "red" }} />
                                    </button>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <label>Required:</label>
                  <input
                    name="required"
                    onChange={(e) => setRequired(!required)}
                    type="checkbox"
                    value={required || ''}
                    checked={required}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                    onClick={() => setModal(false)}
                  >
                    Don't save this field
                  </button>
                  <button
                    onClick={() => saveFunction()}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                  >
                    Save
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

export default memo(SelectOptionsModal);
