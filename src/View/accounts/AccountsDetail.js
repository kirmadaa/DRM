import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AccountDetailLayout from "../../Layouts/app/accounts/detail";
import { GET_TIMELINE_BY_CONNECTION_ID } from "../../Redux/actions/comman";
import { useDispatch } from "react-redux";
import DetailsPageHeader from "../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

function AccountDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const sections = useSelector((state) => state.user.form);

  useEffect(() => {
    dispatch(GET_TIMELINE_BY_CONNECTION_ID(id));
  }, []);

  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen">
        <div>
          <AccountDetailLayout formType="Accounts" id={id} />
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
