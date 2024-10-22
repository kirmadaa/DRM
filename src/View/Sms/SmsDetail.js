import React from "react";

import { useParams } from "react-router-dom";
import FormEditor from "../../Components/Common/EditForm/FormEditor";
import { useSelector } from "react-redux";
import DetailsPageHeader from "../../Components/detailsPageHeader";

function SmsDetail() {
  const { id } = useParams();
  const sections = useSelector((state) => state.user.form);
  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <FormEditor formType="Sms" id={id} />;
    </>
  );
}

export default SmsDetail;
