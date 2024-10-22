import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { QuestionMarkRadioIcon, SearchIcon } from "../../../assets/svgIcons";
import { Minus, Plus, X } from "react-feather";
import { useState } from "react";
import { useEffect } from "react";

const KanbanViewSettingModal = ({
  modal,
  setModal,
  handleSubmit,
  moduleName,
  id,
  sections,
  byModuleData,
  moduleData,
  error,
}) => {
  
  const HeaderStyleList = ["Mono Color", "Multi Color"];
  const [AggregateList, setAggregateList] = useState([]);
  const [CategorizeList, setCategorizeList] = useState([]);
  const [selectFiled, setSelectFiled] = useState([]);

  const [kanbanFiledData, setKanbanFiledData] = useState({
    KanbanViewsOwnerId: id,
    ModuleName: moduleData.find((ele) => ele.label === moduleName)
      ?.value,
    KanbanViewTitle: "",
    CategorizeBy: "",
    AggregateBy: "",
    HeaderStyle: "",
    fields: [],
  });

  const handleSelectFiled = (filed, index) => {
    let demoSelectFiled = [...selectFiled];
    demoSelectFiled.splice(index, 1);
    setSelectFiled(demoSelectFiled);
    setKanbanFiledData({
      ...kanbanFiledData,
      fields: [...kanbanFiledData.fields, filed],
    });
  };

  const handleRemoveSelectFiled = (filed, index) => {
    // if (index !== 0) {
    let demoSelectFiled = [...kanbanFiledData?.fields];
    demoSelectFiled.splice(index, 1);
    setKanbanFiledData({
      ...kanbanFiledData,
      fields: demoSelectFiled,
    });
    setSelectFiled([...selectFiled, filed]);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKanbanFiledData({ ...kanbanFiledData, [name]: value });
  };

  const handleChangeSearch = (e) => {
    const querys = e.target.value;
    if(querys?.trim().length === 0){
      setSelectFiled(
        Object.entries(sections[0].inputs).map((item) => {
          return { label: item[1]?.label, value: item[1]?.value };
        })
      );
      return 
    }
    var updatedList = [...selectFiled];
    updatedList = updatedList.filter((ele) => {
      return ele?.label?.toLowerCase()
        ?.replace(/\s+/g, "")
        ?.includes(querys.toLowerCase().replace(/\s+/g, ""));
    });
    if (updatedList.length !== 0) {
      setSelectFiled([...updatedList]);
    } else {
      setSelectFiled(
        Object.entries(sections[0].inputs).map((item) => {
          return { label: item[1]?.label, value: item[1]?.value };
        })
      );
    }
  };

  useEffect(() => {
    if (id) {
      setKanbanFiledData({ ...kanbanFiledData, KanbanViewsOwnerId: id });
    }

  }, [id]);

  useEffect(() => {
    if (sections) {
      let Currency = []
      let picklist = []
      for (let item of sections) {
        Object.entries(item.inputs).map(([keyname, input]) => {
          if (input?.FieldName === "Pick List") {
            picklist.push(input?.value)
          } else if (input?.FieldName === "Currency") {
            Currency.push(input?.value)
          }
        })
      }
      setAggregateList(Currency);
      setCategorizeList(picklist);
      setSelectFiled(
        Object.entries(sections[0].inputs).map((item) => {
          return { label: item[1]?.label, value: item[1]?.value };
        })
      );
    }
  }, [sections]);

  useEffect(() => {
    if (byModuleData?.ModuleName) {
      setKanbanFiledData({
        KanbanViewsOwnerId: byModuleData?.KanbanViewsOwnerId || id,
        ModuleName: moduleData.find(
          (ele) => ele.label === moduleName
        )?.value,
        KanbanViewTitle: byModuleData?.KanbanViewTitle || "",
        CategorizeBy: byModuleData?.CategorizeBy || "",
        AggregateBy: byModuleData?.AggregateBy || "",
        HeaderStyle: byModuleData?.HeaderStyle || "",
        fields: byModuleData?.fields || [],
      });
    }
   
  }, [byModuleData]);

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (error !== 400) {
            setModal(false);
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

        <div className="fixed inset-0 overflow-y-auto  w-[120%] h-[80%] m-auto">
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
              <Dialog.Panel className="w-[50%] max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  <div className="flex justify-between">
                    <div>
                      <span>Kanban View - Settings</span>
                      <span className="ml-4">
                        <QuestionMarkRadioIcon />
                      </span>
                    </div>
                   
                  </div>
                </Dialog.Title>
                <div className="grid grid-cols-1 mt-4">
                  <div className="form-group  flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" text-lg col-sm-6 w-[100%] text-[#929296] font-medium col-form-label"
                    >
                      Kanban View Name{" "}
                      <span className="ml-2">
                        <QuestionMarkRadioIcon />
                      </span>
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <input
                        name="KanbanViewTitle"
                        className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                        value={kanbanFiledData.KanbanViewTitle}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group  flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" text-lg col-sm-6 w-[100%] text-[#929296] font-medium col-form-label"
                    >
                      Categorize By
                      <span className="ml-2">
                        <QuestionMarkRadioIcon />
                      </span>
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <select
                        name="CategorizeBy"
                        value={kanbanFiledData.CategorizeBy}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                      >
                        <option>Please select</option>
                        {CategorizeList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group  flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" text-lg col-sm-6 w-[100%] text-[#929296] font-medium col-form-label"
                    >
                      Aggregate By
                      <span className="ml-2">
                        <QuestionMarkRadioIcon />
                      </span>
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <select
                        name="AggregateBy"
                        value={kanbanFiledData.AggregateBy}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                      >
                        <option>Please select</option>
                        {AggregateList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group  flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" text-lg col-sm-6 w-[100%] text-[#929296] font-medium col-form-label"
                    >
                      Header Style
                      <span className="ml-2">
                        <QuestionMarkRadioIcon />
                      </span>
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <select
                        name="HeaderStyle"
                        value={kanbanFiledData.HeaderStyle}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                      >
                        <option>Please select</option>
                        {HeaderStyleList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-[24px]">
                    <h3 className="text-[#18181B] text-[18px] font-semibold">
                      Select Fields
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="border-2 p-4 rounded-lg ">
                        <p className="text-[#6A6A6D] mb-4">Available</p>
                        <div className="relative">
                          <div className="absolute right-3 top-[15px]">
                            <SearchIcon className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            onChange={(e) => handleChangeSearch(e)}
                            className="border  w-full border-[#E6E6EB] rounded-2xl px-4 py-3.5 focus:outline-none"
                          />
                        </div>
                        <div className="mt-4 ">
                          {selectFiled?.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleSelectFiled(item, index)}
                              className="flex w-full justify-between rounded-xl bg-white text-[#B2B2B6] hover:bg-primary hover:text-white  p-[13px]"
                            >
                              <span>{item?.label}</span>
                              <span>
                                <Plus />
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="border-2 p-4 rounded-lg ">
                        <p className="text-[#6A6A6D] mb-4">Selected</p>
                        {kanbanFiledData.fields.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between cursor-pointer"
                            onClick={() => handleRemoveSelectFiled(item, index)}
                          >
                            <label className=" text-lg col-sm-6  text-[#929296] font-medium col-form-label">
                              {item?.label}
                            </label>
                            <span className="text-[#B2B2B6]">
                              <Minus />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      className="w-full border-[#191242] border rounded-2xl px-5 py-3 "
                      onClick={() => {
                        setModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSubmit(kanbanFiledData)}
                      className="w-full text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                    // disabled={editable}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default KanbanViewSettingModal;
