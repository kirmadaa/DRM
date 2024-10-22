import React from "react";
import { useParams } from "react-router-dom";
import DetailsPageHeader from "../../../../Components/detailsPageHeader";
import FormEditor from "../../../../Components/Common/EditForm/FormEditor";
import { useSelector } from "react-redux";

function InventoryDetails() {
  const { id } = useParams();
  const sections = useSelector((state) => state.user.form);

  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen">
        <div>
          <FormEditor
            OverviewCheck={true}
            formType="Inventory" id={id} />
        </div>
      </div>
    </>
  );
}

export default InventoryDetails;
