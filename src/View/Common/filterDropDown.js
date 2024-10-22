import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function FilterDropDown({ module }) {
  const dispatch = useDispatch();
  const defaultValue = localStorage.getItem("filter") || "All";
  const [filterValue, setFilterValue] = useState(defaultValue);

  const changeHandler = (e) => {
    setFilterValue(e.target.value);
    localStorage.setItem("filter", e.target.value);
    dispatch({
      type: "SET_FILTER_VALUE",
      data: e.target.value,
    });
  };

  useEffect(() => {
    dispatch({
      type: "SET_FILTER_VALUE",
      data: defaultValue,
    });
  }, []);
  return (
    <>
      <select
        className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-white focus:outline-0 py-[0.7rem] px-4  border-[#dce2eb]   p-2 text-base"
        onChange={changeHandler}
        value={filterValue}
      >
        <option value="All">All {module}</option>
        <option value="Tuch">Touched {module}</option>
        <option value="UnTuch">Untouched {module}</option>
        <option value="Convert">Converted {module}</option>
        <option value="My">My {module}</option>
        <option value="MyConvert">My Converted {module}</option>
        <option value="Today">Today's {module}</option>
        <option value="UnRead">Unread {module}</option>
        <option value="Read">Read {module}</option>
      </select>
    </>
  );
}

export { FilterDropDown };
