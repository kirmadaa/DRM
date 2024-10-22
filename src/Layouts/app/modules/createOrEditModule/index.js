import LayoutOfSection from "./layoutOfSection";
import ListOfFields from "./listOfFileds";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FormJson, LeftsideContent } from "./inputJson";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectOptionsModal from "./selectsOptionsModal";
import LookupModal from "./lookupModal";
import FormulaModal from "./formulaModal";

// styles functiond for drag and drop
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: "10px",
  margin: "0 0 8px 0",
  backgroundColor: isDragging ? "#60a5fa" : "white",
  color: isDragging ? "white" : "black",
  width: isDragging ? "100%" : "auto",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: "8px",
  width: "250px",
});

const CreateModule = () => {
  const [formValue, setFormValue] = useState(FormJson);
  const [error, setError] = useState({});
  const [sourceDataForModal, setSourceDataForModal] = useState({});
  const [destinationDataForSelectModal, setDestinationDataForSelectModal] =
    useState({});
  const [modal, setModal] = useState(false);
  const [lookupModal, setLookupModal] = useState(false);
  const [formulaModal, setFormulaModal] = useState(false);
  const getModuleById = useSelector(
    (state) => state?.ModulesReducer?.getModuleById
  );
  const location = useLocation();

  useEffect(() => {
    let afterFormat = {
      formTitle: getModuleById?.formTitle,
      sections: [],
      quickCreateFieldsForUpdate: getModuleById?.quickCreateFieldsForUpdate,
    };
    if (getModuleById) {
      for (let section of getModuleById?.sections) {
        let inputs = [];

        if (Array.isArray(section?.inputs)) {
          Object.entries((section?.inputs[0])).map(([fieldName, field]) => {
            // console.log("getModuleById======>11", fieldName, field);
            inputs.push(field);

          })
          afterFormat["sections"].push({
            formTitle: section.formTitle,
            tableView: true,
            id:
              Math.random().toString(36).substr(2, 9) +
              new Date().getTime().toString(36),
            inputs,
          });

        } else {
          for (let field of Object.values(section?.inputs)) {
            inputs.push(field);
          }
          afterFormat["sections"].push({
            formTitle: section.formTitle,
            tableView: false,
            id:
              Math.random().toString(36).substr(2, 9) +
              new Date().getTime().toString(36),
            inputs,
          });
        }

      }

      setFormValue(afterFormat);
    }
  }, [getModuleById]);

  const generateUniqueInputName = async (inputName, sections) => {
    const sectionInputs = sections.flatMap(section => section.inputs.map(input => input.value));

    let counter = 1;
    let uniqueInputName = inputName;

    while (sectionInputs.includes(uniqueInputName)) {
      uniqueInputName = `${inputName}${counter}`;
      counter++;
    }

    return uniqueInputName;
  };

  const modalOpenOptions = async (sourceData) => {
    setSourceDataForModal(sourceData);
    if (sourceData.type === "Lookup") {
      setLookupModal(true);
    } else if (sourceData.type === "Formula") {
      setFormulaModal(true);
    } else {
      setModal(true);
    }
  };

  const saveSelectOptionModelData = async (data) => {
    let newObj = {
      id: `item-${new Date().getTime()}`,
      type: sourceDataForModal?.type,
      placeholder: sourceDataForModal?.placeholder,
      // maxLength: "255",
      duplicated: false,
      name: `item-${new Date().getTime()}`,
      value: data?.name?.replace(/ /g, ""),
      options: data.options,
      required: data.required,
      FieldName: sourceDataForModal?.FieldName,
      label: data?.name,
      isNumberEncrypt: false,
      isUniq: false,
    };

    let afterAddNewField = formValue?.sections?.map((sec) => {
      if (sec?.id === destinationDataForSelectModal?.droppableId) {
        sec?.inputs.splice(destinationDataForSelectModal?.index, 0, newObj);
      }
      return sec;
    });
    let afterModify = {
      formTitle: formValue?.formTitle,
      sections: afterAddNewField,
    };
    setFormValue(afterModify);
  };

  const saveLookupModelData = async (data) => {
    const uniqueInputName = await generateUniqueInputName(
      sourceDataForModal?.name,
      formValue.sections
    );

    let newObj = {
      id: `item-${new Date().getTime()}`,
      type: sourceDataForModal?.type,
      placeholder: sourceDataForModal?.placeholder,
      // maxLength: "255",
      duplicated: false,
      name: `item-${new Date().getTime()}`,
      // value: uniqueInputName,
      value: (data?.name).replace(/[^a-zA-Z0-9 ]/g, "")?.split(" ")?.join(""),
      lookupModule: data.lookupModule,
      relatedListTitle: data.relatedListTitle,
      required: data.required,
      FieldName: sourceDataForModal?.FieldName,
      label: data?.name,
      isNumberEncrypt: false,
      isUniq: false,
    };

    let afterAddNewField = formValue?.sections?.map((sec) => {
      if (sec?.id === destinationDataForSelectModal?.droppableId) {
        sec?.inputs.splice(destinationDataForSelectModal?.index, 0, newObj);
      }
      return sec;
    });
    let afterModify = {
      formTitle: formValue?.formTitle,
      sections: afterAddNewField,
    };
    setFormValue(afterModify);
  };

  const saveFormulaModelData = async (data) => {
    const uniqueInputName = await generateUniqueInputName(
      sourceDataForModal?.name,
      formValue.sections
    );

    let newObj = {
      id: `item-${new Date().getTime()}`,
      type: sourceDataForModal?.type,
      placeholder: sourceDataForModal?.placeholder,
      // maxLength: "255",
      duplicated: false,
      name: `item-${new Date().getTime()}`,
      value: uniqueInputName,
      expression: data.expression,
      required: data.required,
      FieldName: sourceDataForModal?.FieldName,
      label: data?.name,
      isNumberEncrypt: false,
      isUniq: false,
    };

    let afterAddNewField = formValue?.sections?.map((sec) => {
      if (sec?.id === destinationDataForSelectModal?.droppableId) {
        sec?.inputs.splice(destinationDataForSelectModal?.index, 0, newObj);
      }
      return sec;
    });
    let afterModify = {
      formTitle: formValue?.formTitle,
      sections: afterAddNewField,
    };
    setFormValue(afterModify);
  };

  const onDragEnd = async (result) => {
    const { source, destination, type } = result;
    // console.log("dfkdfkdjf", result);
    if (!destination) {
      return;
    }
    if (type === "ITEM") {
      if (source.droppableId === "items") {
        if (destination.droppableId === "items") {
          return;
        } else {
          const sourceData = LeftsideContent[source.index];
          if (
            sourceData.type === "Select" ||
            sourceData.type === "Multiselect" ||
            sourceData.type === "Lookup" ||
            sourceData.type === "Formula"
          ) {
            modalOpenOptions(sourceData);
            setDestinationDataForSelectModal(destination);
            return;
          }
          const uniqueInputName = await generateUniqueInputName(
            sourceData?.name,
            formValue.sections
          );

          let newObj = {
            id: `item-${new Date().getTime()}`,
            type: sourceData?.type,
            placeholder: sourceData?.placeholder,
            // maxLength: "255",
            required: false,
            duplicated: false,
            name: `item-${new Date().getTime()}`,
            value: uniqueInputName || "",
            FieldName: sourceData?.FieldName,
            // RolePermission: { ...defaultPermissions },
            label: uniqueInputName,
            isNumberEncrypt: false,
            isUniq: false,
          };

          let afterAddNewField = [...formValue?.sections]?.map((sec) => {
            if (sec?.id === destination?.droppableId) {
              sec?.inputs.splice(destination?.index, 0, newObj);
            }
            return sec;
          });
          let afterModify = {
            formTitle: formValue?.formTitle,
            sections: [...afterAddNewField],
          };
          setFormValue(afterModify);
        }
      } else {
        // ================= Swipe Field logic in same section ====================
        let afterModify = {
          formTitle: formValue?.formTitle || "Untitled",
          sections: [],
        };
        let findField = formValue?.sections
          ?.find((s) => s.id === source?.droppableId)
          ?.inputs?.find((f, i) => i === source.index);
        if (source?.droppableId === destination?.droppableId) {
          let afterSwipeField = formValue?.sections?.map((sec) => {
            if (sec?.id === destination?.droppableId) {
              sec?.inputs.splice(source?.index, 1);
              sec?.inputs.splice(destination?.index, 0, findField);
            }
            return sec;
          });
          afterModify["sections"] = afterSwipeField;
        } else {
          let findField = formValue?.sections
            ?.find((s) => s.id === source?.droppableId)
            ?.inputs?.find((f, i) => i === source.index);
          let rmRemovedReplacedOne = formValue?.sections?.map((section) => {
            if (
              section?.id === destination?.droppableId &&
              source?.draggableId !== destination?.droppableId
            ) {
              section?.inputs.splice(destination?.index, 0, findField);
            } else if (section?.id === source?.droppableId) {
              section?.inputs.splice(source?.index, 1);
            }
            return section;
          });
          afterModify["sections"] = rmRemovedReplacedOne;
        }
        setFormValue(afterModify);
      }
    } else if (type === "SECTION") {
      //  =========================== Section swipe ======================
      let preSections = formValue?.sections;
      let secWantToChangePlace = preSections[source?.index];
      let secWillReplace = preSections[destination?.index];

      preSections[destination?.index] = secWantToChangePlace;
      preSections[source?.index] = secWillReplace;

      let afterModify = {
        formTitle: formValue?.formTitle,
        sections: preSections,
      };
      setFormValue(afterModify);
    }
  };

  const addSection = () => {
    let sectionNumber = formValue.sections.length;
    const newSection = {
      formTitle: `New Section ${sectionNumber}`,
      id: `section-${new Date().getTime()}`,
      inputs: [],
    };
    setFormValue({
      ...formValue,
      sections: [...formValue?.sections, newSection],
    });
  };

  // on change events
  const handleFieldChange = (e, field, sectionid, fieldIndex) => {
    // alert(1);
    // remove error message
    const { value, defaultValue } = e.target;
    let filterDataSameFieldVale = formValue?.sections
      .filter((item) => item?.id === sectionid)[0]
      .inputs.filter((item) => item?.value === value);
    if (filterDataSameFieldVale.length !== 0) {
      e.target.value = defaultValue;

      return;
    }
    setError({ ...error, [field.id]: false });

    let afterFieldNameChange = formValue?.sections?.map((sec) => {
      if (sec?.id === sectionid) {
        sec["inputs"][fieldIndex] = {
          ...field,
          id: field?.id || `item-${value}-${new Date().getTime()}`,
          name: `item-${new Date().getTime()}`,
          label: value,
          placeholder: value,
          value: value?.replace(/ /g, ""),
        };
      }
      return sec;
    });

    let afterModify = {
      formTitle: formValue?.formTitle,
      sections: afterFieldNameChange,
    };
    setFormValue(afterModify);
  };

  const onChangeTitle = (e, sectionIndex) => {
    // let filterDataSameFieldVale = formValue?.sections
    //   .filter((item) => item?.id === sectionid)[0]
    //   .inputs.filter((item) => item?.value === value);
    // if (filterDataSameFieldVale.length !== 0) {
    //   return;
    // }
    const updatedFormValue = { ...formValue };
    updatedFormValue.sections[sectionIndex] = {
      ...updatedFormValue.sections[sectionIndex],
      formTitle: e.target.value,
    };
    setFormValue(updatedFormValue);
  };

  const handleDelete = (sectionIndex) => {
    const updatedSections = [...formValue.sections];
    updatedSections.splice(sectionIndex, 1);
    setFormValue((prevFormJson) => ({
      ...prevFormJson,
      sections: updatedSections,
    }));
  };

  useEffect(() => {
    let moduelName = location?.search.replace("?name=", "");
    setFormValue({ ...formValue, formTitle: moduelName });
    // eslint-disable-next-line
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=" gap-3 fixed w-full top-[6rem] left-0 flex justify-start sm:flex-start   md:justify-start lg:justify-start">
        <div className=" px-2 overflow-scroll w-1/4 h-screen">
          <ListOfFields
            moduelName={formValue?.formTitle}
            getItemStyle={getItemStyle}
            addSection={addSection}
            LeftsideContent={LeftsideContent}
            getListStyle={getListStyle}
          />
        </div>
        <div className="w-3/4 pb-56 overflow-scroll h-screen">
          <LayoutOfSection
            addSection={addSection}
            setFormValue={setFormValue}
            handleFieldChange={handleFieldChange}
            handleDelete={handleDelete}
            onChangeTitle={onChangeTitle}
            formValue={formValue}
            error={error}
            setError={setError}
          />
        </div>
        <SelectOptionsModal
          modal={modal}
          setModal={setModal}
          sourceData={sourceDataForModal}
          type={"create"}
          saveSelectOptionModelData={saveSelectOptionModelData}
        />
        <LookupModal
          modal={lookupModal}
          setModal={setLookupModal}
          sourceData={sourceDataForModal}
          saveLookupModelData={saveLookupModelData}
        />
        <FormulaModal
          modal={formulaModal}
          setModal={setFormulaModal}
          sourceData={sourceDataForModal}
          formValue={formValue}
          saveFormulaModelData={saveFormulaModelData}
        />
      </div>
    </DragDropContext>
  );
};

export default CreateModule;
