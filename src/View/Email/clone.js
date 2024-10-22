import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function EmailClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Email" id={id} />;
}

export { EmailClone };
