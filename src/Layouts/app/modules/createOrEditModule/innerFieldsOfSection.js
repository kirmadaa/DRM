import ActionButtonDropDown from "./actionBtn";

const InnerFieldsOfSection = (props) => {
  const {
    formValue,
    error,
    setFormValue,
    section,
    index,
    sectionIndex,
    sectionId,
    item,

    handleFieldChange,
  } = props;
  return (
    <>
      <div className="w-full flex justify-between items-end">
        <input
          name={item?.label}
          id={item?.id}
          // type={item?.typeDuplicate}
          // value={item?.value || ""}
          required={item?.required}
          defaultValue={item?.label || ""}
          disabled={item?.type === "Owner" ? true : false}
          // placeholder={item?.placeholder}
          className="min-w-[100px] px-2 py-1 focus:outline-none hover:bg-gray-100 rounded"
          onBlur={(e, key) => handleFieldChange(e, item, sectionId, index)}
        // onChange={(e) => handleFieldChange(e, item, sectionId, index)}
        />
        <p>{item?.FieldName}</p>

        <div className="flex justify-start items-center">
          <ActionButtonDropDown
            field={item}
            setFormValue={setFormValue}
            formValue={formValue}
            id={sectionId}
            index={index}
            sectionIndex={sectionIndex}
            selectValue={section?.inputs}
          />
        </div>
      </div>
      {error[item.id] && (
        <div className="text-red-500">This field name is required</div>
      )}
    </>
  );
};

export default InnerFieldsOfSection;
