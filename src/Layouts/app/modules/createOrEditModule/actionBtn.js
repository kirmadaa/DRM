import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Check, Info } from "react-feather";
import { useState } from "react";
import PermissionModal from "./permissionModal";
import SelectOptionsModal from "./selectsOptionsModal";
import FormulaModal from "./formulaModal";
import LookupModal from "./lookupModal";
import EditProperties from "./proparties";
import Tooltip from '../../../../Components/toolTip'

const MenuIcon = () => {
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
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      />
    </svg>
  );
};

const ActionButtonDropDown = ({
  field,
  formValue,
  setFormValue,
  id,
  sectionIndex,
  index,
}) => {
  const [modal, setModal] = useState(false);
  const [modalOfEditPickList, setModalOfEditPickList] = useState(false);
  const [modalOfFormula, setModalOfFormula] = useState(false);
  const [modalOfLookup, setModalOfLookup] = useState(false);
  const [propartiesModal, setPropartiesModal] = useState(false);


  // console.log("actionBTN", field)

  const handleDelete = () => {
    setFormValue((prevFormValue) => {

      const updatedFormValue = id
        ? JSON.parse(JSON.stringify(prevFormValue))
        : { ...prevFormValue };
      let myValue = (updatedFormValue?.sections[sectionIndex]?.inputs)?.splice(index, 1)
      // console.log("prevFormValue==>", myValue, updatedFormValue, sectionIndex, index);


      // updatedFormValue?.sections?.forEach((section) => {
      //   let newinputs = (section?.inputs).filter((item, indexI) => indexI !== index)
      //   // let newinputs1 = newinputs.splice(index, 1);
      //   // // alert(index)
      //   console.log("newinputs---l->", newinputs, updatedFormValue?.sections[sectionIndex]);
      //   // return updatedFormValue?.sections[sectionIndex].newinputs;

      //   return updatedFormValue?.sections[sectionIndex]?.newinputs;
      //   // console.log("updatedFormValue?.sections[sectionIndex]", newinputs);
      //   // Object.keys(newinputs).forEach((inputKey) => {
      //   //   console.log("inputKey--->-->", inputKey);
      //   //   //  console.log("inputKey && newinputs[inputKey]?.id === field?.id", newinputs[inputKey]?.id, field?.id);
      //   //   // if (inputKey && newinputs[inputKey]?.id === field?.id) {
      //   //   //   delete newinputs[inputKey];
      //   //   // }
      //   // });

      // });

      return updatedFormValue;
    });
  };

  const changeRequired = () => {
    setFormValue((prevFormValue) => {
      const updatedFormValue = { ...prevFormValue };

      const newValues = updatedFormValue?.sections?.map((section) => {
        if (section?.id === id) {
          return {
            ...section,
            inputs: section?.inputs?.map((input) => {
              if (input?.id === field?.id) {
                return {
                  ...input,
                  required: !input?.required,
                };
              }
              return input;
            }),
          };
        }
        return { ...section };
      });
      return { ...updatedFormValue, sections: newValues };
    });
  };


  const changeRequiredForQuickCreate = () => {
    setFormValue((prevFormValue) => {
      const updatedFormValue = { ...prevFormValue };

      const newValues = updatedFormValue?.sections?.map((section) => {
        if (section?.id === id) {
          return {
            ...section,
            inputs: section?.inputs?.map((input) => {
              if (input?.id === field?.id) {
                return {
                  ...input,
                  quickCreate: !input?.quickCreate,
                };
              }
              return input;
            }),
          };
        }
        return { ...section };
      });

      const quickCreateFields = { ...updatedFormValue?.quickCreateFieldsForUpdate }
      if (quickCreateFields[field?.id]) {
        delete quickCreateFields[field?.id]

      } else {
        quickCreateFields[field?.id] = field
      }
      return { ...updatedFormValue, sections: newValues, quickCreateFieldsForUpdate: quickCreateFields };
    });
  };

  const changePermissions = (permission) => {
    setFormValue((prevFormValue) => {
      const updatedFormValue = id
        ? JSON.parse(JSON.stringify(prevFormValue))
        : { ...prevFormValue };

      const newValues = updatedFormValue?.sections?.map((section) => {
        if (section?.id === id) {
          return {
            ...section,
            inputs: section?.inputs?.map((input) => {
              if (input?.id === field?.id) {
                return {
                  ...input,
                  permisstion: permission,
                };
              }
              return input;
            }),
          };
        }
        return { ...section };
      });
      return { ...updatedFormValue, sections: newValues };
    });
    setModal(false);
  };

  const updateModalsData = (data) => {
    // console.log("updateModalsData", data)
    setFormValue((prevFormValue) => {
      const updatedFormValue = id
        ? JSON.parse(JSON.stringify(prevFormValue))
        : { ...prevFormValue };

      const newValues = updatedFormValue?.sections?.map((section) => {
        if (section?.id === id) {
          return {
            ...section,
            inputs: section?.inputs?.map((input) => {
              if (input?.id === field?.id) {
                return {
                  ...data,
                };
              }
              return input;
            }),
          };
        }
        return { ...section };
      });

      return { ...updatedFormValue, sections: newValues };
    });
    setModalOfEditPickList(false);
    setModalOfFormula(false);
    setModalOfLookup(false);
    setPropartiesModal(false)
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={`px-1 md:px-2 lg:px-2 flex justify-start rounded-xl items-center mx-1 focus:ring-0 focus:outline-none p-1 `}
      >
        <div className="flex justify-start items-center space-x-2">
          <MenuIcon />
        </div>
        {field?.quickCreate && <Tooltip title='✔ Quick Create '>
          {field?.quickCreate && <span className="font-[300] text-blue-400">✔</span>}
        </Tooltip>}

      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-50 absolute right-0 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-0 py-1 ">
            {field?.remove !== true && (
              <Menu.Item
                onClick={handleDelete}
                disabled={field?.type === "Owner" ? true : false}
              >
                {({ active }) => (
                  <span
                    className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                      } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    Remove
                  </span>
                )}
              </Menu.Item>
            )}
            <Menu.Item
              onClick={() => changeRequired()}
              disabled={field?.type === "Owner" ? true : false}
            >
              {({ active }) => (
                <span
                  className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                >
                  {field?.required && <Check />} Set Required
                </span>
              )}
            </Menu.Item>
            <Menu.Item
              onClick={() => setPropartiesModal(true)}
              disabled={field?.type === "Owner" ? true : false}
            >
              {({ active }) => (
                <span
                  className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                >
                  Edit Properties
                </span>
              )}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setModal(true);
              }}
              disabled={field?.type === "Owner" ? true : false}
            >
              {({ active }) => (
                <span
                  className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                    } group flex w-full items-center px-2 py-1.5 text-sm`}
                >
                  Permissions
                </span>
              )}
            </Menu.Item>
            {(field?.type === "Select" || field?.type === "Multiselect") && (
              <Menu.Item
                onClick={() => {
                  setModalOfEditPickList(true);
                }}
              >
                {({ active }) => (
                  <span
                    className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                      } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    Edit Picklist Properties
                  </span>
                )}
              </Menu.Item>
            )}
            {field?.type === "Formula" && (
              <Menu.Item
                onClick={() => {
                  setModalOfFormula(true);
                }}
              >
                {({ active }) => (
                  <span
                    className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                      } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    Edit Formula Properties
                  </span>
                )}
              </Menu.Item>
            )}
            {field?.type === "Lookup" && (
              <Menu.Item
                onClick={() => {
                  setModalOfLookup(true);
                }}
              >
                {({ active }) => (
                  <span
                    className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                      } group flex w-full items-center px-2 py-1.5 text-sm`}
                  >
                    Edit Lookup Properties
                  </span>
                )}
              </Menu.Item>
            )}
          </div>
          <Menu.Item
            onClick={() => changeRequiredForQuickCreate()}
            disabled={field?.type === "Owner" ? true : false}
          >
            {({ active }) => (
              <span
                className={`border-b ${active ? "text-white bg-primary" : "text-gray-500"
                  } group flex w-full items-center px-2 py-1.5 text-sm`}
              >
                {field?.quickCreate && <Check />} Quick Created Field
              </span>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
      <PermissionModal
        modal={modal}
        setModal={setModal}
        field={field?.permisstion || []}
        saveFunction={changePermissions}
      />
      <SelectOptionsModal
        modal={modalOfEditPickList}
        setModal={setModalOfEditPickList}
        sourceData={field}
        updateSelectOptionModelData={(e) => updateModalsData(e)}
        type="update"
      />
      <LookupModal
        modal={modalOfLookup}
        setModal={setModalOfLookup}
        sourceData={field}
        updateModalsData={(e) => updateModalsData(e)}
        type="update"
      />
      <FormulaModal
        modal={modalOfFormula}
        setModal={setModalOfFormula}
        sourceData={field}
        formValue={formValue}
        updateModalsData={(e) => updateModalsData(e)}
        type="update"
      />
      <EditProperties
        modal={propartiesModal}
        setModal={setPropartiesModal}
        sourceData={field}
        formValue={formValue}
        updateModalsData={(e) => updateModalsData(e)}
      />
    </Menu>
  );
};

export default ActionButtonDropDown;
