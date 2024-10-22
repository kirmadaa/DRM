import React, { Fragment, memo, useEffect } from "react";
import Card, { NoDataCard } from "./Card";
import { Droppable } from "react-beautiful-dnd";

const Column = ({
  column,
  isDropDisabled,
  tasks,
  moduleName,
  byModuleData,
}) => {
  const cardData = (name) => {
    if (name === "Opportunities") {
      let temp = tasks.map(task => {
        if (task?.Stage === column?._id) {
          task.Stage = column._id;
        }
        if (task.ChannelPartnerName && task.ChannelPartnerName.match(/^[a-f0-9]{24}$/)) {
          if (task.channelPartnerData && typeof task.channelPartnerData === 'object') {
            task.ChannelPartnerName = task.channelPartnerData.ChannelPartnerName;
          }
        }
        else if (task.ChannelPartnerName === null) {
          task.ChannelPartnerName = "";
        }
        return task;
      });
      return temp;
      // return tasks?.filter((it) => it?.Stage === column?._id);
    } else if (name === "Leads") {
      let temp = tasks.map(task => {
        if (task.ChannelPartnerName && task.ChannelPartnerName.match(/^[a-f0-9]{24}$/)) {
          if (task.channelPartnerData && typeof task.channelPartnerData === 'object') {
            task.ChannelPartnerName = task.channelPartnerData.ChannelPartnerName;
          }
        }
        else if (task.ChannelPartnerName === null) {
          task.ChannelPartnerName = "";
        }
        return task;
      });
      return temp;
    } else if (name === "Accounts") {
      let temp = tasks.map(task => {

        if (task.ChannelPartnerName && task.ChannelPartnerName.match(/^[a-f0-9]{24}$/)) {
          if (task.channelPartnerData && typeof task.channelPartnerData === 'object') {
            task.ChannelPartnerName = task.channelPartnerData.ChannelPartnerName;
          }
        }
        else if (task.ChannelPartnerName === null) {
          task.ChannelPartnerName = "";
        }
        return task;
      });
      return temp;
      // return tasks?.filter((it) => it?.Stage === column?._id);
    } else if (name === "Contacts") {
      let temp = tasks.map(task => {

        if (task.ChannelPartnerName && task.ChannelPartnerName.match(/^[a-f0-9]{24}$/)) {
          if (task.channelPartnerData && typeof task.channelPartnerData === 'object') {
            task.ChannelPartnerName = task.channelPartnerData.ChannelPartnerName;
          }
        }
        else if (task.ChannelPartnerName === null) {
          task.ChannelPartnerName = "";
        }
        return task;
      });
      return temp;
      // return tasks?.filter((it) => it?.Stage === column?._id);
    } else {
      return tasks;
    }
  };
  useEffect(() => {
    console.log("tasks=======>", tasks);
  }, [tasks]);
  return (
    <div className="w-1/4 flex-none ">
      <div className="bg-[#F0F0F5] p-[16px] rounded-lg border-t-2 border-[#E6E6EB]">
        {/* <p className="text-[#18181B]  text-[14px] font-medium mb-[6px]">
          {moduleName !== "Opportunities" ? column?.stageTitle : column?.title}
        </p> */}
        {!moduleName === "Opportunities" ? (
          <div className="flex items-center">
            <span className="text-[#18181B] text-[14px] font-semibold">
              ₹ {column.totalPrice}
            </span>
            <span className="inline-block h-[4px] w-[4px] bg-[#D6D6DA] rounded-full mx-[4px]"></span>
            <span className="text-[#18181B]  text-[14px]">
              {column?.taskIds?.length || 0} {moduleName}
            </span>
          </div>
        ) : (
          <p className="text-[#18181B]  text-[14px] font-medium mb-[6px] ">
            {column?.title ? column?.title : column?.stageTitle}
          </p>
        )}
      </div>
      <Droppable droppableId={column?.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {console.log("tasks=====>", tasks)}
            {tasks?.length !== 0 ? (
              cardData(moduleName)?.map((task, index) => {
                return (
                  <Fragment key={index}>
                    <Card
                      key={index}
                      task={task}
                      index={index}
                      byModuleData={byModuleData}
                      moduleName={moduleName}
                    />
                  </Fragment>
                );
              })
            ) : (
              <NoDataCard />
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default memo(Column);
