import React from "react";

import { useParams } from "react-router-dom";

import FormEditorClone from "../../../Components/Common/EditFormClone/FormEditorClone";

function VendorClone() {
  const { id } = useParams();
  return <FormEditorClone formType="Vendor" id={id} />;
}

export { VendorClone };
