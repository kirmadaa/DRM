import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OpportunitiesDetailLayout from "../../Layouts/app/opportunities/detail";
import { GET_TIMELINE_BY_CONNECTION_ID } from "../../Redux/actions/comman";
import { useDispatch } from "react-redux";
import DetailsPageHeader from "../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

function OpportunityDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const sections = useSelector((state) => state.user.form);

  useEffect(() => {
    dispatch(GET_TIMELINE_BY_CONNECTION_ID(id));
  }, [dispatch, id]);

  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen">
        <div>
          <OpportunitiesDetailLayout formType="Opportunities" id={id} />
        </div>
      </div>
    </>
  );
}

export default OpportunityDetail;
