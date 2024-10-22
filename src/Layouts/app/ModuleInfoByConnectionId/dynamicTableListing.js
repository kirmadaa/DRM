import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DynamicTableListing = ({ data, moduleName }) => {
  const navigate = useNavigate()
  const notToRender = [
    "organizationData",
    "callOwnerId",
    "meetingHostId",
    "connectionId",
    "organizationId",
    "ownerData",
    "taskOwnerId",
    "_id",
    "orderedItems",
    "salesOrderOwnerId",
    "purchaseOrderOwnerId",
    "quoteOwnerOwnerId",
    "InventoryOwnerId"
  ];
  const getTitle = (value) => {
    let titleis = value
      ?.replace(/([A-Z])/g, " $1")
      ?.replace(/^./, function (str) {
        return str.toUpperCase();
      });
    return titleis.replace(/_/g, "");
  };

  return (
    <div className="p-5 bg-white rounded-xl  min-h-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {/* <input placeholder="Add a note..." type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" /> */}
        {data?.map((item) => {
          return (
            <div
              key={item?._id}
              //to={"crm/opportunities-details/" + `${item?._id}`}
              onClick={() => navigate("/crm/opportunities-details/" + item?._id, {
                state: {
                  getConnectionId: `${item?._id}`,
                  // prePathname: prePathname,
                  // moduleName: formType,
                  // type: formType,
                  // parentModule: formType
                }
              })}
              //to={`prePathname=`}
              className="bg-gray-50 overflow-hidden border p-3 rounded-md"
            >
              <div className="mb-2 flex justify-between items-center">
                <p className="text-primary"> {moduleName} Name</p>

                <p className="text-gray-500">
                  {item?.ownerData?.firstName} {item?.ownerData?.lastName}
                </p>
              </div>
              {Object.keys(item)
                ?.slice(0, 6)
                .map((key, i) => {
                  return (
                    <Fragment key={i}>
                      {!notToRender.includes(key) ? (
                        <div className="mb-2 flex justify-between items-center">
                          <p className="text-primary translate-x-0 ">{getTitle(key)}</p>
                          <p className="text-gray-500 translate-x-0 ">{item[key] || "N/A"}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicTableListing;
