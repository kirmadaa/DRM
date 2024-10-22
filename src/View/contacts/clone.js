import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../Components/Common/EditFormClone/FormEditorClone";

function ContactsClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Contacts" id={id} />;
}

export { ContactsClone };
