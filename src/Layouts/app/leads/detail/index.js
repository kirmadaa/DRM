import { Tab } from "@headlessui/react";
import FormEditor from "../../../../Components/Common/EditForm/FormEditor";
import RelatedList from "../../../../Components/relatedList";
import TabComponent from "../../../../Components/tabsName";
import TimelineComponent from "../../ModuleInfoByConnectionId/timeline";
import RightSidBar from "../../../../Components/relatedList/rightSideBar";

const LeadDetails = ({ formType, id }) => {
  return (
    <div className="flex gap-6">
      <RelatedList formType={formType} />
      <div className="w-full pt-[90px]">
        <Tab.Group>
          <TabComponent />
          <div>
            <Tab.Panels>
              <Tab.Panel>
                <FormEditor
                  detailPageIs={"leads"}
                  formType={formType}
                  id={id}
                  OverviewCheck={true}
                />
              </Tab.Panel>
              <Tab.Panel>
                <TimelineComponent />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
      <RightSidBar />
    </div>
  );
};

export default LeadDetails;
