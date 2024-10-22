import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_LOOKUP } from "../../Redux/actions/user";
import Select from "react-select";

const FilterLookup = ({ input, onChange, value }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useMemo(async () => {
    let lookupDataType = input?.lookupModule;
    const items = [];
    let urlEndPoint = () => {
      if (input?.lookupModule === "Opportunities") {
        return "deals";
      }
      return input?.lookupModule;
    };
    if (data?.length === 0) {
      await dispatch(GET_LOOKUP(`/search-${urlEndPoint()}`)).then((res) => {
        if (res?.length > 0) {
          for (let item of res) {
            if (lookupDataType === "Accounts") {
              let _i = {
                value: item?._id,
                label: item?.AccountName || "(Quick Create)",
              };

              items.push(_i);
            } else if (lookupDataType === "Vendor") {
              let _i = {
                value: item?._id,
                label: item?.VendorName,
              };

              items.push(_i);
            } else if (lookupDataType === "Contacts") {
              let _i = {
                value: item?._id,
                label: `${item?.FirstName} ${item?.LastName}`,
              };

              items.push(_i);
            } else if (
              lookupDataType === "opportunities" ||
              lookupDataType === "Opportunities"
            ) {
              let _i = {
                value: item?._id,
                label: item?.OpportunityName || "N/A",
              };
              items.push(_i);
            } else if (
              lookupDataType === "leads" ||
              lookupDataType === "Leads"
            ) {
              let _i = {
                value: item?._id,
                label: `${item?.FirstName} ${item?.LastName}`,
              };

              items.push(_i);
            } else if (lookupDataType === "call") {
              let _i = {
                value: item?._id,
                label: item?.ContactName,
              };

              items.push(_i);
            } else if (
              lookupDataType === "tasks" ||
              lookupDataType === "Tasks"
            ) {
              let _i = {
                value: item?._id,
                label: item?.Subject || item?.ContactName,
              };

              items.push(_i);
            } else if (lookupDataType === "inventory") {
              let _i = {
                value: item?._id,
                label: item?.InventoryName,
              };

              items.push(_i);
            } else {
              let _i = {
                value: item?._id,
                label: item?.Subject || item?.ContactName,
              };

              items.push(_i);
            }
          }
        }
      });
      setData(items);
    }
  }, [input?.lookupModule]);

  return (
    <>
      <Select
        className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 text-xs border-[#dce2eb]  outline-none p-0"
        name={input?.value}
        value={value}
        onChange={onChange}
        placeholder={input?.label}
        options={data}
        isMulti={false}
        isDisabled={false}
      />
    </>
  );
};

export default FilterLookup;
