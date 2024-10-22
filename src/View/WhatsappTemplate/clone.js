import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function WhatsappTemplateClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Whatsapp" id={id} />;
}

export { WhatsappTemplateClone };
