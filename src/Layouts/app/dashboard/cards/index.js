import React, { useEffect, useState } from "react";
import rate from "../../../../assets/images/dashboard/rate.svg";
import rateRed from "../../../../assets/images/dashboard/rate-red.svg";
import chart from "../../../../assets/images/dashboard/chart.svg";
import { SET_LOADER } from "../../../../Redux/actions/user";
import { GET_DASHBOARD } from "../../../../Redux/actions/comman";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CardsLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    SET_LOADER(true);
    await dispatch(GET_DASHBOARD("alldata"))
      .then((res) => {
        setData(res.data?.data);
        SET_LOADER(false);
      })
      .catch(() => {
        SET_LOADER(false);
      });
  };

  const getAllList = (route) => {
    navigate(route, { replace: true });
  };

  return (
    <div className="grid grid-cols-3 gap-8">
       <div className="flex flex-col gap-6">
        {/* <Card
          title="Total Calls"
          value={data?.call || "00"}
          onClick={() => getAllList("/crm/call")}
        />
        <Card
          title="Total Meetings"
          value={data?.meeting || "00"}
          onClick={() => getAllList("/crm/meeting")}
        /> */}
        <Card
          title="Total Inventory"
          value={data?.sitevisit || "00"}
          onClick={() => getAllList("/crm/inventory")}
        />
        {/* <Card
          title="Total Site Visits"
          value={data?.sitevisit || "00"}
          onClick={() => getAllList("/crm/sitevisit")}
        /> */}
      </div>
      {/* Column 2: Leads Cards */}
      {/* <div className="flex flex-col gap-6">
        <Card
          title="Total Leads"
          value={data?.leads || "00"}
          onClick={() => getAllList("/crm/leads")}
        />
        <Card
          title="Total Leads Pending Actions"
          value={data?.leadsPendingAction || "00"}
          onClick={() => getAllList("/crm/leads")}
        />
      </div> */}

      {/* Column 3: Opportunities Cards */}
      {/* <div className="flex flex-col gap-6">
        <Card
          title="Total Opportunities"
          value={data?.deals || "00"}
          onClick={() => getAllList("/crm/opportunities")}
        />
        <Card
          title="Total Opportunities Pending Actions"
          value={data?.opportunitiesPendingAction || "00"}
          onClick={() => getAllList("/crm/opportunities")}
        />
      </div> */}
    </div>
  );
};

const Card = ({ title, value, onClick }) => (
  <div
    className="bg-white border-[1px] rounded-2xl py-6 px-4 shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
    onClick={onClick}
  >
    <div className="text-xl font-semibold text-navy mb-4">{title}</div>
    <div className="text-4xl font-bold text-grey mb-2">{value}</div>
  </div>
);

export default CardsLayout;
