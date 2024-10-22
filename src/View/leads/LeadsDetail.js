import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DetailsPageHeader from "../../Components/detailsPageHeader";
import LeadDetail from "../../Layouts/app/leads/detail";
import { GET_TIMELINE_BY_CONNECTION_ID } from "../../Redux/actions/comman";
import { useSelector } from "react-redux";

function LeadsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.user.form);

  useEffect(() => {
    dispatch(GET_TIMELINE_BY_CONNECTION_ID(id));
  }, []);

  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen ">
        <div>
          <LeadDetail formType="Leads" id={id} />
        </div>
      </div>
    </>
  );
}

export default LeadsDetail;
