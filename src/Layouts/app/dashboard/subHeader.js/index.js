import React, { useEffect } from "react";
import { ChevronRight } from "react-feather";
import { Menu } from "@headlessui/react";
import Refresh from "../../../../assets/images/dashboard/refresh-icon.svg";
import { useState } from "react";
import { GET_CUSTOMIZATION_DASHBOARD } from "../../../../Redux/actions/customizeDashboard";
import { useDispatch, useSelector } from "react-redux";

const MenuItemComponent = ({ item }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? "bg-primary text-white" : "text-gray-900"
          } group flex w-full items-center px-5 py-[10px] text-sm relative`}
        >
          {item?.title}
          {item?.children?.length !== 0 && <ChevronRight />}
          {item?.children?.length !== 0 && active && (
            <Menu.Items
              style={{ zIndex: 1000 }}
              className="absolute left-[140px] top-[4px] mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {item?.children?.map((ele, i) => (
                <MenuItemComponent item={ele} />
              ))}
            </Menu.Items>
          )}
        </button>
      )}
    </Menu.Item>
  );
};

const SubHeaderLayout = () => {
  const dispatch = useDispatch();
  const { list: data, reloadPage } = useSelector(
    (state) => state?.CustomizationDashboard
  );

  const [dashboardView, setDashboardView] = useState("");

  const changeHandler = (e) => {
    const { value } = e?.target;
    setDashboardView(value);
    dispatch({ type: "RESET_CUSTOMIZATION_DASHBOARD_DETAIL" });
    dispatch({ type: "SET_DASHBOARD_CUSTOMIZATION", data: value });
  };

  const refreshHandler = (e) => {
    dispatch({ type: "RESET_CUSTOMIZATION_DASHBOARD_DETAIL" });
    dispatch({ type: "SET_RELOAD_DASHBOARD", data: true });
  };

  useEffect(() => {
    dispatch(GET_CUSTOMIZATION_DASHBOARD()).then((res) => {
      if (res?.data?.CustomizeDashboardData?.length) {
        dispatch({
          type: "SET_DASHBOARD_CUSTOMIZATION",
          data: res?.data?.CustomizeDashboardData[0]._id,
        });
      }
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full p-6  flex-wrap hidden">
        {/* <h3 className="text-xl font-bold">Welcome To Dashboard</h3> */}
        <div className="flex items-center gap-4">
          <img src={Refresh} onClick={refreshHandler} alt="refresh icon" />
          <div>
            <select
              className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-white focus:outline-0 py-[0.7rem] px-4  border-[#dce2eb]   p-2 text-base"
              onChange={(e) => changeHandler(e)}
              value={dashboardView}
            >
              {data.map((dataValue) => {
                return <option value={dataValue._id}>{dataValue.name} </option>;
              })}
            </select>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SubHeaderLayout;
