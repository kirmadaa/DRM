import React from "react";
import { useSelector } from "react-redux";
import TableList from "../../../../Components/table";
import ChannelPartnerSubHeader from "../../../../View/App/channelpartner/ChannelPartnerSubHeader";

function ChannelPartnerList() {
  const form = useSelector((state) => state?.user.form);

  return (
    <>
      <ChannelPartnerSubHeader moduleName='channelPartner' form={form?.sections} />
      <TableList key="channelPartner" moduleName="channelPartner" />
    </>
  );
}

export default ChannelPartnerList;
