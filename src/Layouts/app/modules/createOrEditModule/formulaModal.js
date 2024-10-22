import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Plus } from "react-feather";

const functions = [
  {
    name: "Abs",
    value: "Abs()"
  },
  {
    name: "Ceil",
    value: "Ceil()"
  },
  {
    name: "Floor",
    value: "Floor()"
  },
  {
    name: "Naturallog",
    value: "Naturallog()"
  },
  {
    name: "Base10log",
    value: "Base10log()"
  },
  {
    name: "Max",
    value: "Max()"
  },
  {
    name: "Min",
    value: "Min()"
  },
  {
    name: "Sqrt",
    value: "Sqrt()"
  },
  {
    name: "If",
    value: "If()"
  },
  {
    name: "Len",
    value: "Len()"
  },
  {
    name: "Find",
    value: "Find()"
  },
  {
    name: "Dayofmonth",
    value: "Dayofmonth()"
  },
  {
    name: "Hour",
    value: "Hour()"
  },
  {
    name: "Minute",
    value: "Minute()"
  },
  {
    name: "Month",
    value: "Month()"
  },
  {
    name: "Year",
    value: "Year()"
  },
  {
    name: "Weekday",
    value: "Weekday()"
  },
  {
    name: "And",
    value: "And()"
  },
  {
    name: "Or",
    value: "Or()"
  },
  {
    name: "Not",
    value: "Not()"
  },
  {
    name: "Concat",
    value: "Concat()"
  },
  {
    name: "Contains",
    value: "Contains()"
  },
  {
    name: "Startswith",
    value: "Startswith()"
  },
  {
    name: "Endswith",
    value: "Endswith()"
  },
  {
    name: "Lower",
    value: "Lower()"
  },
  {
    name: "Upper",
    value: "Upper()"
  },
  {
    name: "Trim",
    value: "Trim()"
  },
  {
    name: "Substring",
    value: "Substring()"
  },
  {
    name: "Tostring",
    value: "Tostring()"
  },
  {
    name: "Replace",
    value: "Replace()"
  },
  {
    name: "Newdate",
    value: "Newdate()"
  },
  {
    name: "Datepart",
    value: "Datepart()"
  },
  {
    name: "Timepart",
    value: "Timepart()"
  },
  {
    name: "Adddate",
    value: "Adddate()"
  },
  {
    name: "Subdate",
    value: "Subdate()"
  },
  {
    name: "Now",
    value: "Now()"
  },
  {
    name: "Datecomp",
    value: "Datecomp()"
  },
  {
    name: "Tonumber",
    value: "Tonumber()"
  },
]


const operators = [
  {
    name: "Add",
    value: "+",
  },
  {
    name: "Subtract",
    value: "-",
  },
  {
    name: "Multiply",
    value: "*",
  },
  {
    name: "Divide",
    value: "/",
  },
  {
    name: "Remainder",
    value: "%",
  },
  {
    name: "Exponentiation",
    value: "^",
  },
  {
    name: "Open parenthesis",
    value: "(",
  },
  {
    name: "Close parenthesis",
    value: ")",
  },
  {
    name: "Not Equal",
    value: "!=",
  },
  {
    name: "Equals",
    value: "=",
  },
  {
    name: "Less than",
    value: "<",
  },
  {
    name: "Greater than",
    value: ">",
  },
  {
    name: "Less than or equal",
    value: "<=",
  },
  {
    name: "Greater than or equal",
    value: ">=",
  },

]

const FormulaModal = ({ modal, setModal, sourceData, formValue, saveFormulaModelData, type = "create", updateModalsData }) => {
  const fieldData = formValue.sections
  const defaultData = {
    title: sourceData?.label || "",
    required: sourceData?.required || false,
    expression: sourceData?.expression || ""
  }

  const [title, setTitle] = useState(defaultData.title)
  const [expression, setExpression] = useState(defaultData.expression)
  const [required, setRequired] = useState(defaultData.required)

  const defaultValue = {
    function: functions[0].value,
    operator: operators[0].value,
    field: fieldData[0]?.inputs[0]?.label
  }
  const [selectHandler, setSelectHandler] = useState(defaultValue)


  const handleChange = (event) => {
    const { name, value } = event.target
    setSelectHandler({
      ...selectHandler,
      [name]: value
    })
  };

  const saveFunction = () => {
    const data = {
      ...sourceData,
      name: title,
      label: title,
     
      value: title,
      expression,
      required
    }
    if (type === "update") {
      updateModalsData(data)
    } else {
      saveFormulaModelData(data)
    }
    setModal(false)
  }

  const AddHandler = (value) => {
    const newExpression = expression + selectHandler[value]
    setExpression(newExpression)
  }

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Formula Properties
                </Dialog.Title>
                <div className="container min-h-[140px]">
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Field Label:</label>
                    <input
                      name="name"
                      type="text"
                      onChange={e => setTitle(e.target.value)}
                      value={title}
                      className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                    />
                  </div>
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Formula Expression:</label>
                    <input
                      name="expression"
                      type="text"
                      onChange={e => setExpression(e.target.value)}
                      value={expression}
                      className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                    />
                  </div>
                  <div className="flex justify-between">
                    <label className="font-semibold mt-3">Select Function:</label>
                    <select
                      className="border borber-grey rounded px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                      onChange={(e) => handleChange(e)}
                      name="function"
                      value={selectHandler?.function}
                    >

                      {functions.map((functionData, index) => {
                        return <option value={functionData.value} id={index}>{functionData?.name}</option>
                      })}
                    </select>
                    <Plus
                      className="rounded-full h-9 w-9"
                      name="function"
                      onClick={(e) => AddHandler("function")}
                    />
                  </div>
                  <div className="flex justify-between">
                    <label className="font-semibold mt-3">Select Operator:</label>
                    <select
                      className="border borber-grey rounded px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                      onChange={(e) => handleChange(e)}
                      name="operator"
                      value={selectHandler?.operator}
                    >

                      {operators.map((operator, index) => {
                        return <option value={operator.value} id={index}>{`${operator?.name}(${operator.value})`}</option>
                      })}
                    </select>
                    <Plus
                      name="operator"
                      onClick={(e) => AddHandler("operator")}
                      className="rounded-full h-9 w-9"
                    />
                  </div>
                  <div className="flex justify-between">
                    <label className="font-semibold mt-3">Select Field:</label>
                    <select
                      className="border borber-grey rounded px-3 py-2 focus:outline-none hover:bg-gray-100 rounded"
                      onChange={(e) => handleChange(e)}
                      name="field"
                      value={selectHandler?.field}
                    >

                      {fieldData?.map((section, index) => {
                        return <optgroup label={section.formTitle}>
                          {section?.inputs
                            .map((input, index) => {
                              return <option value={input?.label} id={index}>{input?.label}</option>
                            })}
                        </optgroup>
                      })}
                    </select>
                    <Plus
                      name="field"
                      onClick={(e) => AddHandler("field")}
                      className="rounded-full h-9 w-9"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <label>Required:</label>
                  <input
                    name="required"
                    onChange={(e) => setRequired(!required)}
                    type="checkbox"
                    value={required}
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
    </Transition >
  );
};

export default FormulaModal;
