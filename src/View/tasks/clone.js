import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function TasksClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Tasks" id={id} />;
}

export { TasksClone };
