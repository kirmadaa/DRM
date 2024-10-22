import { Tab } from "@headlessui/react";
import TabComponent from "../../../../Components/tabsName";
import TimelineComponent from "../../ModuleInfoByConnectionId/timeline";
import FormEditor from "../../../../Components/Common/EditForm/FormEditor";
import RelatedList from "../../../../Components/relatedList";
import RightSidBar from "../../../../Components/relatedList/rightSideBar";

const OpportunityDetails = ({ formType, id }) => {
  return (
    <div className="flex gap-6">
      <RelatedList formType={formType} />
      <div className="w-full pt-[90px]">
        <Tab.Group>
          <TabComponent />
          <Tab.Panels>
            <Tab.Panel>
              <FormEditor
                detailPageIs="deals"
                formType={formType}
                id={id}
                OverviewCheck={true}
              />
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

export default OpportunityDetails;
