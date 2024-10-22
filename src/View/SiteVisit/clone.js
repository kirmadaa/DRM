import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function SiteVisitClone() {
  const { id } = useParams();
  return <FormEditorClone formType="siteVisit" id={id} />;
}

export { SiteVisitClone };
