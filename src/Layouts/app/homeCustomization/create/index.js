import React, { useState } from "react";
import ActionBarHomeCustom from "./actionBar";
import { list } from "../../../../Components/module";
import TableView from "./dataTable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const HomeCustomizationManageLayout = () => {
  const [module, setModule] = useState(Object.keys(list)[0]);
  const [data, setData] = useState([]);
  const [checkBox, setCheckBox] = useState({});

  const checkBoxHandler = (e) => {
    const { name, value } = e?.target;
    setCheckBox({ ...checkBox, [name]: !checkBox[name] });
    if (!checkBox[name]) {
      const updateData = [...data];
      updateData.push({ name, value, module });
      setData(updateData);
    } else {
      const updateData = [...data];
      setData(updateData.filter((obj) => obj.name !== name));
    }
  };

  const publicViewData = [
    { name: `All ${module}`, value: "All", optionValue: `All${module}` },
    {
      name: `Touched ${module}`,
      value: "Tuch",
      optionValue: `Touched${module}`,
    },
    {
      name: `Untouched ${module}`,
      value: "UnTuch",
      optionValue: `Untouched${module}`,
    },
    {
      name: `Converted ${module}`,
      value: "Convert",
      optionValue: `Converted${module}`,
    },
    { name: `My ${module}`, value: "My", optionValue: `My${module}` },
    {
      name: `My Converted ${module}`,
      value: "MyConvert",
      optionValue: `MyConverted${module}`,
    },
    {
      name: `UnRead ${module}`,
      value: "UnRead",
      optionValue: `UnRead${module}`,
    },
    { name: `Read ${module}`, value: "Read", optionValue: `Read${module}` },
  ];

  const updateViewHandler = (data) => {
    if (data?.length) {
      setData(data);
      let newObj = {};
      data.map((updateCheck) => {
        newObj[updateCheck.name] = true;
      });
      setCheckBox(newObj);
    } else {
      setData([]);
      setCheckBox({});
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  return (
    <>
      <ActionBarHomeCustom data={data} updateViewHandler={updateViewHandler} />
      <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
        <div className="rounded-2xl bg-white h-full p-6 w-[300px] min-w-[300px]">
          <div className="py-6">
            <div className="mb-2">
              <h1>Module</h1>
              <select
                className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-white focus:outline-0 py-[0.7rem] px-4  border-[#dce2eb]   p-2 text-base"
                placeholder="Select Module"
                name="ChooseModule"
                onChange={(e) => {
                  setModule(e.target.value);
                }}
                value={module}
              >
                {Object.keys(list)?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {publicViewData.map((valueData) => (
                <div
                  key={valueData.name}
                  className="hover:bg-gray-50 flex gap-2 items-center py-1"
                >
                  <input
                    type="checkbox"
                    checked={checkBox[valueData.name]}
                    name={valueData.name}
                    value={valueData.value}
                    onChange={(e) => checkBoxHandler(e)}
                  />
                  <label>{valueData.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-[white] w-[calc(100%-300px)] p-6 mb-[50px]">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2"
                >
                  {data?.map((value, index) => (
                    <div className="border border-dashed border-x-primary">
                      <Draggable
                        key={value.name}
                        draggableId={value.name}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: snapshot.isDragging
                                ? "lightblue"
                                : "white",
                              boxShadow: snapshot.isDragging
                                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                                : "none",
                            }}
                          >
                            <TableView
                              id={index}
                              buttonType={value.value}
                              moduleName={value.module}
                              name={value.name}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default HomeCustomizationManageLayout;
