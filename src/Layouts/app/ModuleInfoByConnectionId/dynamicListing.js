import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DynamicListing = ({ data, detailPath, moduleName, callType, id }) => {
  const navigate = useNavigate()
  const location = useLocation();
  console.log("labelType===>bbbb", data);

  return (
    <div className="p-5 bg-white rounded-xl  min-h-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {data?.map((item) => {
          return (
            <div
              key={item?._id}
              //to={`${detailPath}/${item?._id}?prePathname=${location.pathname}`}
              onClick={() => {
                if (callType == "schedule" || callType == "log") {
                  navigate(`${detailPath}/${item?._id}?prePathname=${location.pathname}&callType=${callType}`, {
                    state: {
                      getConnectionId: id,
                      prePathname: location.pathname,
                      moduleName: moduleName,
                      type: moduleName,
                      parentModule: moduleName
                    }
                  })
                } else {
                  navigate(`${detailPath}/${item?._id}?prePathname=${location.pathname}`, {
                    state: {
                      getConnectionId: id,
                      prePathname: location.pathname,
                      moduleName: moduleName,
                      type: moduleName,
                      parentModule: moduleName
                    }
                  })
                }

              }
              }
              className="bg-gray-50 border overflow-hidden p-3 rounded-md"
            >
              <div className="mb-2 flex justify-start items-start">
                <p className="text-primary capitalize">{moduleName} Owner- </p>
                <p className="text-gray-500 capitalize">
                  {item?.ownerData ? `${item?.ownerData?.firstName} ${item?.ownerData?.lastName}` : `${item?.ModifiedBy?.firstName} ${item?.ModifiedBy?.lastName}`}

                </p>
              </div>
              {(item["Subject"] != undefined || item["Title"] != undefined) && moduleName !== "Note" && moduleName !== "Site Visit" && < div className="mb-2 flex justify-start items-start">
                <p className="text-primary ">Subject- </p>
                <p className="text-gray-500 truncate text-wrap">{item["Subject"] || item['Title'] || item["Description"]}</p>
              </div>
              }
              {item["Description"] != undefined && moduleName !== "Note" && moduleName !== "Site Visit" && < div className="mb-2 flex justify-start items-start">
                <p className="text-primary ">Description- </p>
                <p className="text-gray-500 truncate text-wrap">{item["Description"]}</p>
              </div>
              }
              {item["CallStartTime"] != undefined && moduleName !== "Note" && moduleName !== "Site Visit" && < div className="mb-2 flex justify-start items-start">
                <p className="text-primary ">Call Start Time- </p>
                <p className="text-gray-500 truncate text-wrap">{moment(item["CallStartTime"]).format("DD-MM-YYYY HH:mm:ss")}</p>
              </div>
              }
              {item["MeetingStartTime"] != undefined && moduleName !== "Note" && moduleName !== "Site Visit" && < div className="mb-2 flex justify-start items-start">
                <p className="text-primary ">Meeting Start Time- </p>
                <p className="text-gray-500 truncate text-wrap">{moment(item["MeetingStartTime"]).format("DD-MM-YYYY HH:mm:ss")}</p>
              </div>
              }
              {item["DueDate"] != undefined && moduleName !== "Note" && moduleName !== "Site Visit" && < div className="mb-2 flex justify-start items-start">
                <p className="text-primary ">Due Date- </p>
                <p className="text-gray-500 truncate text-wrap">{moment(item["DueDate"]).format("DD-MM-YYYY HH:mm:ss")}</p>
              </div>
              }
              {item["SiteVisitStartTime"] != undefined && moduleName !== "Note" && moduleName !== "Site Visit" && < div className="mb-2 flex justify-start items-start">
                <p className="text-primary ">Site Visit Start Time- </p>
                <p className="text-gray-500 truncate text-wrap">{moment(item["SiteVisitStartTime"]).format("DD-MM-YYYY HH:mm:ss")}</p>
              </div>
              }
            </div>
          );
        })}
      </div>
    </div >
  );
};

export default DynamicListing;
