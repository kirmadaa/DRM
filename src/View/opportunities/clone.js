import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function OpportunitiesClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Opportunities" id={id} />;
}

export { OpportunitiesClone };
