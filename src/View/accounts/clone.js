import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function AccountsClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Accounts" id={id} />;
}

export { AccountsClone };
