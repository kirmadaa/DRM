import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CUSTOMIZATION_DASHBOARD_DETAILS } from "../../../../Redux/actions/customizeDashboard";
import TableView from "../../homeCustomization/create/dataTable";

const CustomizationDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardFilter, details, reloadPage } = useSelector(
    (state) => state?.CustomizationDashboard
  );

  useEffect(() => {
    dispatch(GET_CUSTOMIZATION_DASHBOARD_DETAILS(dashboardFilter)).then(
      (res) => {
        dispatch({ type: "SET_RELOAD_DASHBOARD", data: false });
      }
    );
  }, [dashboardFilter, reloadPage]);

  return (
    <>
      <div className="grid grid-cols-2">
        {details?.dashboard?.map((value) => {
          return (
            <TableView
              // id={index}
              buttonType={value.value}
              moduleName={value.module}
              name={value.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default CustomizationDashboard;
