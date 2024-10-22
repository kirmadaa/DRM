import React, { memo, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  disabled,
  setSelectedPipeline,
  values,
  setValues,
  menuPlacement,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (option) => {
    console.log("form--->", values, form, option, isMulti, field);
    if (field.name === "siteVisitOwnerId") {
      form.setFieldValue(
        field.name,
        isMulti ? option.map((item) => item.value) : option.value
      );
    } else {
      form.setFieldValue(
        field.name,
        isMulti ? option.map((item) => item.value) : option.value
      );
      // console.log("form--->1", form, option, isMulti, field);

      if (isMulti) {
        setValues({ ...values, [field.name]: option.map((item) => item.value) });
      } else {
        setValues({ ...values, [field.name]: option?.value });
      }
      if (field?.name.toLowerCase().includes("pipeline")) {
        setSelectedPipeline(option);
      }
    }

  };

  const getValue = useMemo(() => {
    console.log("options====>", field?.name, options, field, values);
    if (options) {
      let valueis = isMulti
        ? options?.filter((option) => field?.value?.indexOf(option.value) >= 0)
        : options?.find((option) => option?.value === field?.value);
      return valueis;
    } else {
      return isMulti ? [] : "";
    }
  }, [options, field]);

  useEffect(() => {
    if (field?.name?.includes("OwnerId") && getValue?.label) {
      if (window.location?.search) {
        navigate(
          `${window.location?.pathname}${window.location?.search}&ownerName=${getValue?.label}`,
          {
            state: location?.state,
          }
        );
      } else {
        navigate(`${window.location?.pathname}?ownerName=${getValue?.label}`, {
          state: location?.state || "",
        });
      }
    }
  }, [getValue]);

  // console.log(getValue, field?.name)
  return (
    <Select
      className={className}
      name={field?.name}
      value={getValue}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      menuPlacement={menuPlacement == "top" ? "top" : "bottom"}
      isDisabled={disabled}
    />
  );
};

export default memo(CustomSelect);
