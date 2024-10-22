import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function MeetingClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Meeting" id={id} />;
}

export { MeetingClone };
