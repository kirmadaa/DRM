import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CREATE_NEW_MODULE,
  UPDATE_MOUDLE_BY_ID,
} from "../../../../Redux/actions/modules";
import { toast } from "react-toastify";
import { useState } from "react";
import { CheckDragAndDropFormListValidation } from "../../../../utility/validation";

const ActionBar = ({ formValue, setError }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [remark, setRemark] = useState(formValue?.remark || '');

  function checkForDuplicates(obj, formTitle) {
    const valueSet = new Set();
    const labelSet = new Set();
    let hasDuplicateValue = false;
    let hasDuplicateLabel = false;

    // Iterate through the object keys
    for (const key in obj) {
      const currentItem = obj[key];
      // { console.log("obj===987>", currentItem.value && valueSet.has(currentItem.value), valueSet, currentItem, obj) }

      // Check for duplicate values
      if (currentItem.value && valueSet.has(currentItem.value)) {
        if (formTitle == "Invoice" || formTitle == "Quotes" || formTitle == "salesOrder") {
          { console.log("obj===987>", formTitle, currentItem.value && valueSet.has(currentItem.value), valueSet, currentItem, obj) }

          hasDuplicateValue = false;
          break;
        } else {
          hasDuplicateValue = true;
          break;
        }

      } else {
        valueSet.add(currentItem.value);
      }

      // Check for duplicate labels
      if (currentItem.label && labelSet.has(currentItem.label)) {
        if (formTitle == "Invoice" || formTitle == "Quotes" || formTitle == "salesOrder") {
          { console.log("obj===987>", formTitle, currentItem.value && valueSet.has(currentItem.value), valueSet, currentItem, obj) }

          hasDuplicateLabel = false;
          break;
        } else {
          hasDuplicateLabel = true;
          break;
        }

      } else {
        labelSet.add(currentItem.label);
      }
    }

    return {
      hasDuplicateValue,
      hasDuplicateLabel,
    };
  }

  const handleSubmit = async () => {
    let sections = [];
    let afterModifyPayload = {
      remark,
      formTitle: formValue?.formTitle || "Untitled",
      sections,
      quickCreateFieldsForUpdate: formValue?.quickCreateFieldsForUpdate
    };

    const validation = CheckDragAndDropFormListValidation(formValue?.sections);
    // console.log("formValue?.sections==>", validation, formValue?.sections)

    // return;
    if (validation.isValid) {
      setLoading(true);
      let isDuplicate = false
      for (let section of formValue?.sections) {
        let inputs = {};
        let inputs1 = {};

        const duplicates = checkForDuplicates(section?.inputs, formValue?.formTitle)
        console.log("formValue?.duplicates==>", duplicates, validation, formValue?.sections)

        if (duplicates.hasDuplicateValue) {
          isDuplicate = true
          break
        }
        if ((section?.tableView == true) && (formValue?.formTitle == "Invoice" || formValue?.formTitle == "Quotes" || formValue?.formTitle == "salesOrder")) {
          for (let field of section?.inputs) {
            console.log("section==sfs==>4", field);

            inputs1[field?.name] = field;
          }
          // console.log("section==sfs==>", section);
        } else {
          for (let field of section?.inputs) {
            console.log("section==sfs==>4", field);

            inputs[field?.name] = field;
          }
        }
        console.log("section==sfs==> input1", inputs1);
        if (section?.tableView == true) {
          sections.push({ formTitle: section?.formTitle, inputs: [inputs1] });

        } else {
          sections.push({ formTitle: section?.formTitle, inputs });

        }
        console.log("section==sfs==> input1----<<<", inputs1, afterModifyPayload);

      }
      if (isDuplicate) {
        setLoading(false);
        toast.warning("Duplicate value found lables");
        return
      }
      let success = false;
      console.log("save module data--->", afterModifyPayload, formValue, moduleId);
      // return;

      if (moduleId) {
        success = await dispatch(UPDATE_MOUDLE_BY_ID(afterModifyPayload, moduleId));
      } else {
        success = await dispatch(CREATE_NEW_MODULE(afterModifyPayload));
      }
      if (success) {
        navigate("/crm/modules");
      }
      setLoading(false);
    } else {
      setError(validation.error);
    }
  };

  return (
    <div className="bg-white p-3 flex justify-between items-center">
      <div className="flex justify-start items-center space-x-2">
        <p className="text-xl">{decodeURIComponent(formValue?.formTitle)}</p>
        <input value={remark} onChange={(e) => setRemark(e.target.value)}
          className=" focus:outline-none border p-1 rounded-md "
          placeholder="Layout Remark " />
      </div>
      <div className="flex justify-end gap-2">
        <button
          disabled={loading}
          onClick={() => navigate(-1)}
          className="rounded-md px-2 py-1 bg-gray-100 text-primary"
        >
          Go Back
        </button>
        <button
          disabled={loading}
          className="bg-primary text-white font-[300] px-2 py-1 rounded-md shadow"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Save Module"}
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
