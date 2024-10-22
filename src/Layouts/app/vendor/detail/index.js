import FormEditor from "../../../../Components/Common/EditForm/FormEditor";
import DetailsPageHeader from "../../../../Components/detailsPageHeader";
import { useSelector } from "react-redux";

const VendorDetailLayout = ({ formType, id }) => {
  const sections = useSelector((state) => state.user.form);
  return (
    <div className="w-full">
      <DetailsPageHeader sectionData={sections} />
      <div className="my-3 min-h-screen container mx-auto ">
        <br/>
        <br/>
        <br/>
        <FormEditor formType={formType} id={id} />
      </div>
    </div>
  );
};

export default VendorDetailLayout;
