import { Dialog, Transition } from "@headlessui/react";
import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { GET_ALL_PIPELINES } from "../../Redux/actions/pipeline";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { GET_USER_PROFILE } from "../../Redux/actions/user";
import { GET_ALL_ACTIVE_USER } from "../../Redux/actions/userList";
import FilterLookup from "./filterlookup";
import moment from "moment";

const FilterFieldFortable = ({
  formbyModuleName,
  filter,
  modulename,
  selectedFilter,
  setselectedFilter,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedInput, setSelectedInputs] = useState(null);
  const [values, setValues] = useState({});
  const [userOptions, setUserOptions] = useState(null);
  const [pipelineData, setPipelineData] = useState(null);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (formbyModuleName?.formData?.length > 0) {
      for (let item of formbyModuleName?.formData[0]?.sections) {
        for (let input in item?.inputs) {
          if (item?.inputs[input]?.value === filter?.name) {
            setSelectedInputs(item?.inputs[input]);
            break;
          }
        }
      }
    }
  }, [formbyModuleName]);
  console.log("dkfjdkfjdkfj", selectedInput);
  const optionsForOwner = () => {
    let options = [];
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      const data = {
        ...values,
        [`${modulename}OwnerId`]: resData?.userId,
      };
      setValues(data);
    });

    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
      (data) => {
        const res = data?.data?.data?.usersData;
        if (res?.length > 0) {
          res?.map((item) => {
            options.push({
              value: item?._id,
              label: `${item?.firstName} ${item?.lastName}`,
            });
          });
        }
      }
    );
    setUserOptions(options);
  };

  const getAllPipelines = async () => {
    let data = {
      offset: 1,
      limit: 10,
      search: [],
    };
    let response = await dispatch(GET_ALL_PIPELINES(data));
    setPipelineData(response?.data);
  };

  useMemo(() => {
    if (pipelineData === null) {
      getAllPipelines();
    }
    if (userOptions === null) {
      optionsForOwner();
    }
  }, []);
  console.log("dfdfd", selectedInput);
  const getDataForNormalOrByCondition = (type, defaulData) => {
    if (type?.toLowerCase().includes("pipeline")) {
      let items = pipelineData?.pipelineData;
      let newValue = items?.map((item) => {
        return {
          label: item?.pipelineTitle,
          value: item?._id,
        };
      });
      return newValue;
    } else if (type?.toLowerCase().includes("stage")) {
      let findItem = pipelineData?.pipelineData?.find(
        (_it) => _it?._id === selectedPipeline?.value
      );
      return findItem?.stages?.map((item) => {
        return {
          label: item?.stageTitle,
          value: item?._id,
        };
      });
    } else {
      return defaulData;
    }
  };

  const onChange = (option) => {
    let newchnages = selectedFilter?.map((item) => {
      if (item?.name === selectedInput?.value) {
        item["value"] = option?.value;
        // item['filter'] = true
        item["label"] = option?.label;
        setSelectedInputs({ ...selectedInput, data: option?.value });
      }
      return item;
    });
    setselectedFilter(newchnages);
  };

  const normaltextChange = (e) => {
    let { value } = e.target;
    let newchnages = selectedFilter?.map((item) => {
      if (item?.name === selectedInput?.value) {
        item["value"] = value;
        // item['filter'] = true
        setSelectedInputs({ ...selectedInput, data: value });
      }
      return item;
    });
    setselectedFilter(newchnages);
  };
  console.log("filter", filter);
  const fieldGenerator = (input) => {
    if (input?.value === "UserLookup") {
      return (
        <Select
          className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 text-xs border-[#dce2eb]  outline-none p-0"
          name={input?.value}
          value={{ label: filter?.label, value: filter?.value }}
          onChange={onChange}
          placeholder={input?.label}
          options={userOptions}
          isMulti={false}
          isDisabled={false}
        />
      );
    }
    if (input?.value === "Owner") {
      return (
        <Select
          className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 text-xs border-[#dce2eb]  outline-none p-0"
          name={`${modulename}OwnerId`}
          value={{ label: filter?.label, value: filter?.value }}
          onChange={onChange}
          placeholder={input?.label}
          options={userOptions}
          isMulti={false}
          isDisabled={false}
        />
      );
    }
    if (input?.type === "Owner") {
      return (
        <Select
          className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 text-xs border-[#dce2eb]  outline-none p-0"
          name={`${modulename}OwnerId`}
          value={{ label: filter?.label, value: filter?.value }}
          onChange={onChange}
          placeholder={input?.label}
          options={userOptions}
          isMulti={false}
          isDisabled={false}
        />
      );
    }
    switch (input?.type) {
      case "Multiselect":
        return (
          <Select
            className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 text-xs border-[#dce2eb]  outline-none p-0"
            name={input?.value || ""}
            value={{ label: filter?.label, value: filter?.value }}
            options={input?.options}
            placeholder={input?.label}
            isMulti={true}
            disabled
          />
        );

      case "Select":
        return (
          <Select
            className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 text-xs border-[#dce2eb]  outline-none p-0"
            name={input?.value || ""}
            value={{ label: filter?.label, value: filter?.value }}
            onChange={onChange}
            placeholder={input?.label}
            options={getDataForNormalOrByCondition(
              input?.label,
              input?.options
            )}
            isMulti={false}
            isDisabled={false}
          />
        );

      case "Lookup":
        return (
          <FilterLookup
            input={input}
            value={{ label: filter?.label, value: filter?.value }}
            modulename={modulename}
            onChange={onChange}
          />
        );

      case "datetime-local":
        return (
          <input
            type="date-time"
            name={input?.value || ""}
            placeholder={input?.label}
            className="mb-3 w-full h-12 outline-none mt-2 p-0.5 rounded-lg border-2 border-gray-200"
          />
        );
      case "textarea":
        return (
          <textarea
            rows={2}
            onChange={normaltextChange}
            value={filter?.value || ""}
            className="form-control rounded w-full bg-[#F8F8FC] focus:outline-0 border shadow border-[#dce2eb]   p-2 text-xs"
            placeholder={input?.label}
          />
        );
      case "date":
        return (
          <input
            type={"date"}
            // disabled?={editable}
            max={"3099-12-31"}
            value={moment(filter.value).format("YYYY-MM-DD") || ""}
            // onChange={(e) =>
            //   setValues({ ...values, [input?.value]: e.target.value })
            // }
            // setValues={setValues}
            onChange={normaltextChange}
            className=" disabled:bg-[#f2f2f2] custom-select border w-full p-2 rounded-lg"
            name={input?.value}
            placeholder={input?.label}
          />
        );

      default:
        return (
          <input
            onChange={normaltextChange}
            value={filter?.value || ""}
            className="form-control rounded w-full bg-[#F8F8FC] focus:outline-0 border shadow border-[#dce2eb]   p-2 text-xs"
            placeholder={input?.label}
          />
        );
    }
  };

  return <>{selectedInput && fieldGenerator(selectedInput)}</>;
};

export default memo(FilterFieldFortable);
