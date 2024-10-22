import React from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const CustomDatePicker = ({
  className,
  field,
  form,
  disabled,
  setSelectFromDate,
  values,
  setValues
}) => {
  const onChange = (value) => {
    if (field.name === 'From') {
      setSelectFromDate(value)
    }
    setValues({...values, [field.name]: value})
    form.setFieldValue(
      field.name,
      value
    );
  };

  const getValue = () => {
    return form?.values[field.name]
  }


  return (
    <DateTimePicker
      onChange={onChange}
      value={getValue()}
      // value={form[field.name]}
      className={className}
      name={field.name}
      isCalendarOpen={false}
      isDisabled={disabled}
    />
  );
};

export default CustomDatePicker;
