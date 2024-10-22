import React from "react";
import ModuleInfoByConnections from "../ModuleInfoByConnectionId";

const Overview = ({ editable, sections, detailPageIs, formType }) => {
  return (
    <>
      <ModuleInfoByConnections
        formType={formType}
        detailPageIs={detailPageIs}
      />
    </>
  );
};

export default Overview;
