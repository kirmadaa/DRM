import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_TIMELINE_BY_CONNECTION_ID } from "../../../../Redux/actions/comman";
import { useDispatch } from "react-redux";
import VendorDetailLayout from "../../../../Layouts/app/vendor/detail";

function VendorDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_TIMELINE_BY_CONNECTION_ID(id));
  }, []);

  return (
    <div>
      <VendorDetailLayout formType="Vendor" id={id} />
    </div>
  );
}

export default VendorDetails;
