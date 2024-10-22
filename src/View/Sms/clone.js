import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function SmsClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Sms" id={id} />;
}

export { SmsClone };
