import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { getValueOfItemTypeIsSelect } from "../../../utility/serviceMethod";
import { useDispatch, useSelector } from "react-redux";
import { GET_FORM } from "../../../Redux/actions/user";
import { list } from "../../../Components/module";
import { useNavigate } from "react-router-dom";

const Card = ({ index, task, byModuleData, moduleName }) => {
  const api = list[moduleName] || {};
  const form = useSelector((state) => state.user.form);
  const navigate = useNavigate()
  console.log("moduleName--hkjhsakfjsdahkjfjhdskjfh-->", index, task, byModuleData, moduleName);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_FORM(api.formApi));
  }, []);

  const calldetail = (_id, name) => {
    // alert(firstName + LastName)
    navigate(api.detialUrl + _id + "/?fullName=" + name);
    // navigate(api.detialUrl + _id);
  };
  const isDragDisabled = false;
  return (
    <Draggable
      draggableId={task.id}
      isDragDisabled={isDragDisabled}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`mt-[8px] bg-[#FFFFFF] border-2  border-dashed ${snapshot.isDragging ? "border-primary" : "border-white"
            }  p-[16px] rounded-lg`}
          // onClick={() => alert("gg")}
          onClick={() => {
            let name = "";
            if (moduleName == "Leads" || moduleName == "Contacts") {
              name =
                (task?.FirstName ? task?.FirstName : "") +
                " " +
                (task?.LastName ? task?.LastName : "N/A");
              calldetail(task._id, name);
            } else if (moduleName == "Accounts") {
              name = task?.AccountName ? task?.AccountName : task?.Company;
              calldetail(task._id, name);
            } else if (moduleName == "Opportunities") {
              name = task?.OpportunityName;
              calldetail(task._id, name);
            } else {
              name = task?.Subject;
              calldetail(task._id, name);
            }
          }}
        >
          <div {...provided.dragHandleProps}>
            {!moduleName === "Opportunities11" ? (
              byModuleData?.fields?.map((item, index) => (
                <div key={index}>
                  <span className="text-[#18181B]  text-[14px] leading-6">
                    {Object?.keys(task)?.includes(item?.value)
                      ? task[item?.value]
                      : ""}{" "}
                  </span>
                </div>
              ))
            ) : (
              <div>
                {moduleName === "Opportunities" ? (
                  <div>
                    <p className="text-[#18181B]  text-[14px] leading-6">
                      <span className="text-gray-900 font-[500]">
                        Opportunity Name:{" "}
                      </span>{" "}
                      <span className="text-gray-600">
                        {task?.OpportunityName || task?.content || "N/A"}
                      </span>
                    </p>
                    <p className="text-[#18181B]  text-[14px] leading-6">
                      <span className="text-gray-900 font-[500]">
                        Contact Name:{" "}
                      </span>{" "}
                      <span className="text-gray-600">
                        {task?.ContactData?.length > 0
                          ? `${task?.ContactData[0]?.FirstName} ${task?.ContactData[0]?.LastName}`
                          : "N/A"}
                      </span>
                    </p>
                    <p className="text-[#18181B]  text-[14px] leading-6">
                      <span className="text-gray-900 font-[500]">
                        Account Name:{" "}
                      </span>{" "}
                      <span className="text-gray-600">
                        {task?.AccountData?.length > 0
                          ? task?.AccountData[0]?.AccountName
                          : "N/A"}
                      </span>
                    </p>
                    <p className="text-[#18181B]  text-[14px] leading-6">
                      <span className="text-gray-900 font-[500]">
                        Pipeline:{" "}
                      </span>{" "}
                      <span className="text-gray-600">
                        {task?.pipelineData?.pipelineTitle || "N/A"}
                      </span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div key={index}>
                  <span className="text-[#18181B]  text-[14px] leading-6">
                    Owner:{" "}
                    {byModuleData?.ownerData?.firstName +
                      " " +
                      byModuleData?.ownerData?.lastName}
                  </span>
                  {console.log("form?.byModuleData=====><", byModuleData)}
                  {console.log("form?.taskkeys=====><", Object?.keys(task))}
                  {console.log("form?.taskvalue=====><", Object?.values(task))}

                  {byModuleData?.fields?.map((item, index) => (
                    <div key={index}>
                      {console.log("form?.sections=====><", form?.sections)}
                      {console.log("element=====><", item.label)}
                      {console.log("row[element]=====><", task[item?.value])}
                      {console.log(
                        "test values json",
                        item,
                        getValueOfItemTypeIsSelect(
                          form.sections,
                          item.value,
                          task[item?.value]
                        )
                      )}

                      {console.log("item?.value", item)}
                      <span className="text-[#18181B]  text-[14px] leading-6">
                        {Object?.keys(task)?.includes(item?.value)
                          ? item?.value + ": " + task[item?.value] &&
                            item?.value
                            ? item?.value +
                            ": " +
                            getValueOfItemTypeIsSelect(
                              form.sections,
                              item.value,
                              task[item?.value]
                            )
                            : ""
                          : ""}{" "}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="text-[#18181B]  text-[14px] leading-6">
                ₹{" "}
                {Object.keys(task)?.includes(byModuleData?.AggregateBy)
                  ? task[byModuleData?.AggregateBy] && byModuleData?.AggregateBy
                    ? task[byModuleData?.AggregateBy]
                    : 0
                  : 0}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;

export const NoDataCard = () => {
  return (
    <div className="mt-[8px]  bg-[#F0F0F5] p-[16px] rounded-lg  justify-center flex items-center">
      <p>No Leads Found.</p>
    </div>
  );
};
