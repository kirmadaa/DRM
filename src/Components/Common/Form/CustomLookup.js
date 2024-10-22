import React, { memo, useMemo } from "react";
import Creatable from "react-select/creatable";

export const CustomLookup = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  disabled,
  formType,
  setValues,
  values,
  fulldata,
  edit,
  arrIndex,
  labelType
}) => {
  const onChange = (option) => {
    // setValues({ ...values, [field?.name]: option?.value });
    console.log("fulldata==bbb=qqqqq> arrIndex Invoices33 4-->", values, option, field, formType);

    if (values?.contactTitle == "Leads") {
      // console.log("fulldata==bbb=qqqqq> arrIndex Invoices", labelType, values, option, field, formType);

      setValues({
        ...values,
        "RelatedTo": option?.label,
        "connectionId": option?.value,
        "ContactName": option?.label ? option?.label : values.ContactName


      });
    }
    if (field?.name == "RelatedTo") {
      console.log("fulldata==bbb=qqqqq> arrIndex Invoices33", labelType, values, option, field, formType);

      setValues({
        ...values,
        "ContactName": option?.label ? option?.label : values.ContactName,
        "RelatedTo": option?.label,
        "connectionId": option?.value,
      });
    }
    if (values?.orderedItems && field?.name == "InventoryName") {
      setValues({
        ...values,
        orderedItems: [...values?.orderedItems,
        values.orderedItems[arrIndex][field.name] = option?.value]
      });
      // console.log("===option=>after", option, values);
    } else {
      let newkey = field?.name == "AccountName" ? option?.value : null
      setValues({ ...values, [field?.name]: field?.name == "AccountName" ? option?.label : option?.value, ["AccountsOwnerId"]: newkey ? newkey : values?.AccountsOwnerId });
    }
  }
  const onChange1 = (option) => {
    console.log("fulldata==bbb=qqqqq> arrIndex Invoices", labelType, values, option, field, formType);

    let accoutId = fulldata?.find((it) => it?._id == option.value);
    // console.log("fulldata==bbb=>", accoutId, "--", fulldata);
    // console.log("fulldata===>", values, accoutId, option, field, fulldata);
    if (values?.orderedItems && field?.name == "InventoryName") {
      setValues({
        ...values,
        orderedItems: [...values?.orderedItems, values.orderedItems[arrIndex][field.name] = option.value],
      });
      // console.log("===option=>after", option, values);
    }
    // if (formType === "Opportunities" && field?.name === "AccountName") {
    //   setValues({
    //     ...values,
    //     AccountName: edit ? accoutId?._id : accoutId?.AccountName,
    //   });
    //   // console.log("===option=>after", option, values);
    // }
    else if (formType === "Opportunities" && field?.name === "ContactName") {
      // console.log("fulldata==/=>", fulldata);
      setValues({
        ...values,
        ContactName: edit ? accoutId?._id : option?.label,
        AccountName: edit ? accoutId?.AccountName : accoutId?.Company ? accoutId?.Company : accoutId?.AccountName,
      });
    }
    else if ((formType === "contacts" || formType === "Contacts") && field?.name == "accounts") {
      console.log("===option=>1111---->", "hhshs");
      setValues({
        ...values,
        AccountName: option?.label,
        AccountsOwnerId: option?.value,
        "connectionId": option?.value

      });
    }
    else if (formType === "Meeting" && field?.name === "ContactName") {
      console.log("field=values=>", field, option);
      setValues({
        ...values,
        "ContactName": option?.label ? option?.label : values.ContactName
      });
    }
    else if (formType === "Tasks" && field?.name === "ContactName") {
      // console.log("kjhkd")
      console.log("field=values=>", field, option);
      setValues({
        ...values,
        "ContactName": option?.label ? option?.label : values.ContactName
      });
    }
    else if (formType === "Calls" && field?.name === "ContactName") {
      console.log("field=values=>", field, option);
      setValues({
        ...values,
        "ContactName": option?.label ? option?.label : values.ContactName
      });
    }
    else if (formType === "Calls" && field?.name === "RelatedTo") {
      console.log("field=values=>", field, option);
      setValues({
        ...values,
        "RelatedTo": option?.label ? option?.label : values.ContactName
      });
    }
    // else if (field?.name === "ContactName") {
    //   console.log("field=values=>", field, option);
    //   setValues({
    //     ...values,
    //     "ContactName": option?.label ? option?.label : values.ContactName
    //   });
    // }
    else if (field?.name === "Participants") {
      console.log("field=values=>Participants", field, option);
      setValues({
        ...values,
        "Participants": option?.label ? option?.label : values.ContactName
      });
    }
    else if (field?.name === "Host" || field?.name === "siteVisitOwnerId") {
      alert("lklk")
      console.log("field=values=>Participants333", field, option);
      setValues({
        ...values,
        "Host": option?.label ? option?.label : ""
      });
    }
    else if ((field?.name === "Related To" || field?.name === "RelatedTo") && formType === "Tasks"
      // && values?.connectionId == null
    ) {
      console.log("field=RelatedTo=>", field, option);
      setValues({
        ...values,
        "RelatedTo": option?.label,
        "connectionId": option?.value
      });
    }
    // else if (
    //   field?.name === "Lookup"
    //   // && values?.connectionId == null
    // ) {
    //   // console.log("field==>", field, option);
    //   setValues({
    //     ...values,
    //     "RelatedTo": option?.label,
    //     "connectionId": option?.value
    //   });
    // }
    else if (formType === "siteVisit" && field?.name === "inventory") {
      setValues({
        ...values,
        "inventory": option?.label
      });
    }
    else if (formType === "siteVisit" && field?.name === "Participants") {
      setValues({
        ...values,
        "Participants": option?.label
      });
    }
    else if (formType === "siteVisit" && field?.name === "Inventory") {
      setValues({
        ...values,
        "inventory": option?.label
      });
    }
    else if (formType === "siteVisit" && field?.name === "Participants") {
      setValues({
        ...values,
        "Participants": option?.label
      });
    }
    else {
      //  console.log("else option==54321=>", values, option, field, formType);
      let newkey = field?.name == "AccountName" ? option?.value : null
      setValues({ ...values, [field?.name]: field?.name == "AccountName" ? option?.label : option?.value, ["AccountsOwnerId"]: newkey });
    }
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
    );
  };
  const getValue = useMemo(() => {

    console.log("field=65432145sldkfj63=>", values, options, field, formType);


    if (options) {
      // console.log("lookupDataTypelookupDataType1", options, values, field);

      let valueis = isMulti
        ? options?.filter((option) => field?.value?.indexOf(option.value) >= 0)
        : options?.find((option) =>
          option?.value === field?.value
            ? option?.label
            : option?.label === field?.value
              ? option.label
              : option?.value === values?._id ? option.label : ""
        );
      // console.log("valueis", valueis);
      if (valueis) {
        return valueis ? valueis : { label: field.label, value: field.value };

      } else {
        if (field.name == "RelatedTo") {
          return { label: values?.RelatedTo, value: values?.RelatedTo };
        }
        if (field.name == "ContactName") {
          return { label: values?.ContactName, value: values?.ContactName };
        }
        if (field.name == "ChannelPartnerName") {
          return { label: values?.ChannelPartnerName, value: values?.ChannelPartnerName };
        }
        if (field.name == "AccountName" || field.name == "Company" || field.name == "CompanyName") {
          return { label: values?.AccountName || values?.Company || values?.CompanyName, value: values?.AccountName || values?.Company || values?.CompanyName };
        }
        if (field.name == "LOISubject") {
          return { label: values?.LOISubject, value: values?.LOISubject };
        }

      }

    } else {
      return isMulti ? [] : "";
    }



  }, [options, field]);

  // const getValue = useMemo(() => {

  //   console.log("field=6543214563=>", values, options, field, formType);
  //   if ((field?.name === "RelatedTo" || field?.name === "Lookup") && (field?.value == values?.Lookup || field?.value == values?.RelatedTo) && options?.length > 0) {
  //     //   console.log("field=654321=>1", options, values, field);
  //     let getStatus = options.filter((item, index) => values?.RelatedTo ? item.value === values?.RelatedTo : item.value === values?.Lookup)
  //     //  console.log("getStatus===>", options, values, getStatus);
  //     let valueis = options?.find((option) =>
  //       option?.value == values?._id
  //         ? option?.label : option?.label == values?.RelatedTo ? option?.label : ""
  //     );
  //     // console.log("valueis --->", valueis);
  //     return valueis ? valueis : { label: field.label, value: field.value };
  //   }
  //   if ((field?.name === "RelatedTo" || field?.name === "Lookup") && (field?.value == values?.Lookup || field?.value == values?.RelatedTo) && options?.length > 0) {
  //     // console.log("field=654321=>1", options, values, field);
  //     let getStatus = options.filter((item, index) => values?.RelatedTo ? item.value === values?.RelatedTo : item.value === values?.Lookup)
  //     // console.log("getStatus===>", options, values, getStatus);
  //     let valueis = options?.find((option) =>
  //       option?.value == values?._id
  //         ? option?.label : option?.label == values?.RelatedTo ? option?.label : ""
  //     );
  //     // console.log("valueis --->", valueis);
  //     return valueis ? valueis : { label: field.label, value: field.value };
  //   } else {
  //     if (values?.RelatedTo) {
  //       return { label: values?.RelatedTo, value: values?.RelatedTo };
  //     }

  //     if (options) {
  //       // console.log("lookupDataTypelookupDataType1", options, values, field);

  //       let valueis = isMulti
  //         ? options?.filter((option) => field?.value?.indexOf(option.value) >= 0)
  //         : options?.find((option) =>
  //           option?.value === field?.value
  //             ? option?.label
  //             : option?.label === field?.value
  //               ? option.label
  //               : option?.value === values?._id ? option.label : ""
  //         );
  //       // console.log("valueis", valueis);
  //       return valueis ? valueis : { label: field.label, value: field.value };
  //     } else {
  //       return isMulti ? [] : "";
  //     }


  //   }
  // }, [options, field]);

  const getArrayValue = useMemo(() => {

    console.log("field=6543214563=>", values, options, field, formType);
    if ((field?.name === "RelatedTo" || field?.name === "Lookup") && (field?.value == values?.Lookup || field?.value == values?.RelatedTo) && options?.length > 0) {
      //   console.log("field=654321=>1", options, values, field);
      let getStatus = options.filter((item, index) => values?.RelatedTo ? item.value === values?.RelatedTo : item.value === values?.Lookup)
      //  console.log("getStatus===>", options, values, getStatus);
      let valueis = options?.find((option) =>
        option?.value == values?._id
          ? option?.label : option?.label == values?.RelatedTo ? option?.label : ""
      );
      // console.log("valueis --->", valueis);
      return valueis ? valueis : { label: field.label, value: field.value };
    }
    if ((field?.name === "RelatedTo" || field?.name === "Lookup") && (field?.value == values?.Lookup || field?.value == values?.RelatedTo) && options?.length > 0) {
      // console.log("field=654321=>1", options, values, field);
      let getStatus = options.filter((item, index) => values?.RelatedTo ? item.value === values?.RelatedTo : item.value === values?.Lookup)
      // console.log("getStatus===>", options, values, getStatus);
      let valueis = options?.find((option) =>
        option?.value == values?._id
          ? option?.label : option?.label == values?.RelatedTo ? option?.label : ""
      );
      // console.log("valueis --->", valueis);
      return valueis ? valueis : { label: field.label, value: field.value };
    } else {
      if (values?.RelatedTo) {
        return { label: values?.RelatedTo, value: values?.RelatedTo };
      }

      if (options) {
        // console.log("lookupDataTypelookupDataType1", options, values, field);

        let valueis = isMulti
          ? options?.filter((option) => field?.value?.indexOf(option.value) >= 0)
          : options?.find((option) =>
            option?.value === field?.value
              ? option?.label
              : option?.label === field?.value
                ? option.label
                : option?.value === values?._id ? option.label : ""
          );
        // console.log("valueis", valueis);
        return valueis ? valueis : { label: field.label, value: field.value };
      } else {
        return isMulti ? [] : "";
      }
    }
  }, [options, field]);

  return (
    <>
      {console.log("getValue=getValue==>", getValue, values, getArrayValue)}
      {values?.orderedItems ? <Creatable
        className={className}
        name={field.name}
        // value={getValue}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        isDisabled={disabled}
        noOptionsMessage={() => "Quick Create "}
      />
        :
        !values?.connectionId ? <Creatable
          className={className}
          name={field.name}
          // value={field.name == "RelatedTo" ? "" : getValue}
          value={getValue}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          isMulti={isMulti}
          isDisabled={disabled}
          noOptionsMessage={() => "Quick Create "}
        />
          :
          <Creatable
            className={className}
            name={field.name}
            // value={field.name == "RelatedTo" ? "" : getValue}
            value={edit ? getValue : getValue}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
            isDisabled={disabled}
            noOptionsMessage={() => "Quick Create "}
          />
      }
    </>
  );
};

export default memo(CustomLookup);
