import React from "react";

import { useParams } from "react-router-dom";
import FormEditor from "../../Components/Common/EditForm/FormEditor";
import DetailsPageHeader from "../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

function SiteVisitDetail() {
  const { id } = useParams();
  const sections = useSelector((state) => state.user.form);

  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className=" min-h-screen mt-[190px]">
        <div>
          <FormEditor formType="siteVisit" id={id} />
        </div>
      </div>
    </>
  );
}

export default SiteVisitDetail;
