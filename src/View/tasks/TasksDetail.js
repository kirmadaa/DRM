import React from "react";
import FormEditor from "../../Components/Common/EditForm/FormEditor";
import { useParams } from "react-router-dom";
import DetailsPageHeader from "../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

function TasksDetail() {
  const { id } = useParams();
  const sections = useSelector((state) => state.user.form);
  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen">
        <div>
          <FormEditor formType="Tasks" id={id} />{" "}
        </div>
      </div>
    </>
  );
}

export default TasksDetail;
