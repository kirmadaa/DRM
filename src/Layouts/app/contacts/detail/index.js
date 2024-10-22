import { Tab } from "@headlessui/react";
import FormEditor from "../../../../Components/Common/EditForm/FormEditor";
import TabComponent from "../../../../Components/tabsName";
import TimelineComponent from "../../ModuleInfoByConnectionId/timeline";
import RelatedList from "../../../../Components/relatedList";
import RightSidBar from "../../../../Components/relatedList/rightSideBar";

const ContactDetails = ({ formType, id }) => {
  return (
    <div className="flex gap-6">
      <RelatedList formType={formType} />
      <div className="w-full pt-[90px]">
        <Tab.Group>
          <TabComponent />
          <Tab.Panels>
            <Tab.Panel>
              <FormEditor
                detailPageIs="contacts"
                formType={formType}
                id={id}
                OverviewCheck={true}
              />{" "}
            </Tab.Panel>
            <Tab.Panel>
              <TimelineComponent />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <RightSidBar />
    </div>
  );
};

export default ContactDetails;
