import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function LeadsClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Leads" id={id} />;
}

export { LeadsClone };
