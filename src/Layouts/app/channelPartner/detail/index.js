import FormEditor from "../../../../Components/Common/EditForm/FormEditor";
import DetailsPageHeader from "../../../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

const ChannelPartnerDetailLayout = ({ formType, id }) => {
  const sections = useSelector((state) => state.user.form);
  return (
    <>
      <DetailsPageHeader sectionData={sections} />
      <div className=" min-h-screen mt-[190px]">
        <div>
          <FormEditor formType={formType} id={id} />
        </div>
      </div>
    </>
  );
};

export default ChannelPartnerDetailLayout;
