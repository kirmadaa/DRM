import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../Components/breadcrumb";
import { GET_TIMELINE_BY_CONNECTION_ID } from "../../../../Redux/actions/comman";
import { useDispatch } from "react-redux";
import VendorDetailLayout from "../../../../Layouts/app/vendor/detail";

const breadcrumblist = [
  { name: "Dashboard", path: "/crm/dashboard" },
  { name: "Channel Partner", path: "/crm/channelPartner" },
];

function ChannelPartnerDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_TIMELINE_BY_CONNECTION_ID(id));
  }, []);

  return (
    <div className="my-3 min-h-screen container mx-auto ">
      <BreadCrumb
        mainTitle="Edit Channel Partner"
        active={id}
        breadcrumblist={breadcrumblist}
      />
      <div>
        <VendorDetailLayout formType="channelPartner" id={id} />
      </div>
    </div>
  );
}

export default ChannelPartnerDetails;
