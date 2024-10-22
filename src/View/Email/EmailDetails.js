import React from "react";

import { useParams } from "react-router-dom";
import FormEditor from "../../Components/Common/EditForm/FormEditor";

function EmailTemplateDetail() {
  const { id } = useParams();
  return <FormEditor formType="Email" id={id} />;
}

export default EmailTemplateDetail;
