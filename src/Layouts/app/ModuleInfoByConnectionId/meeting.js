import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_MODULE_INFO_BY_CONNECTION_ID,
  GET_FORM_BY_TITLE,
} from "../../../Redux/actions/comman";
// import { getFormsByTitle } from "../../Redux/userSlice";
import { Link } from "react-router-dom";
import DynamicListing from "./dynamicListing";
import { useNavigate } from "react-router-dom";
import PageLoader from '../../../Components/pageLoader';


const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData;
};
const Meetings = ({
  id,
  prePathname,
  moduleName,
  ownerid,
  formType,
  permission,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [meetings, setMeetings] = useState([]);
  const [newModule, setNewModule] = useState(false);
  const [loader, setLoader] = useState(true);


  const asyncGetMeetings = async () => {
    dispatch(GET_FORM_BY_TITLE("Meeting")).then((res) => {
      const data = res.data?.data ? false : true;
      setNewModule(data);
    });
    setLoader(true);
    let endPoint = "meetings-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      const updatedMeetings = res?.data?.meetingData?.map((call) => {
        // Parse the ClosedTime into a Date object
        const meetingStartTime = new Date(call?.To);
        // Get the current time
        const currentTime = new Date();
        // If the meetingStartTime is in the past, mark the call as closed
        if (meetingStartTime <= currentTime) {
          return { ...call, meetingClosed: "closed" };
        }
        return call;
      });
      setMeetings(updatedMeetings);
      setLoader(false);
    }
  };

  useEffect(() => {
    asyncGetMeetings();
  }, [dispatch]);

  const checkPermission = () => {
    if (
      ownerid === getUserId()?._id ||
      getUserId()?.profile === "Administrator"
    ) {
      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Meetings</p>
            {!newModule ? (
              <div
                // to={`/crm/create-meeting?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                className="bg-primary p-2 rounded-lg text-white"
                onClick={() => navigate("/crm/create-meeting", {
                  state: {
                    getConnectionId: id,
                    prePathname: prePathname,
                    moduleName: formType,
                    type: formType,
                    parentModule: formType
                  }
                })}
              >
                Create
              </div>
            ) : (
              <Link
                to={`/crm/createModule?name=${moduleName}`}
                type="button"
                className="text-white mt-4 bg-primary hover:bg-priamry/20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
              >
                Create New module
              </Link>
            )}
          </div>
        </>
      );
    } else if (permission?.read) {
      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Meetings</p>
            {permission?.write && (
              <>
                {!newModule ? (
                  <div
                    //to={`/crm/create-meeting?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                    className="bg-primary p-2 rounded-lg text-white"
                    onClick={() => navigate("/crm/create-meeting", {
                      state: {
                        getConnectionId: id,
                        prePathname: prePathname,
                        moduleName: formType,
                        type: formType,
                        parentModule: formType
                      }
                    })}
                  >
                    Create
                  </div>
                ) : (
                  <Link
                    to={`/crm/createModule?name=${moduleName}`}
                    type="button"
                    className="text-white mt-4 bg-primary hover:bg-priamry/20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
                  >
                    Create New module
                  </Link>
                )}
              </>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="meetings">
      {checkPermission()}
      <div className="bg-white mb-2 rounded-xl p-2">
        <p className="font-[500] text-gray-600">Open Activity</p>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing
          detailPath="/crm/meeting-details"
          data={meetings?.filter((item) => item?.meetingClosed === undefined)}
          moduleName={formType}
          id={id}
        />}
      </div>
      <div className="bg-white mb-2 rounded-xl p-2">
        <p className="font-[500] text-gray-600">Close Activity</p>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing
          detailPath="/crm/meeting-details"
          data={meetings?.filter((item) => item?.meetingClosed === "closed")}
          moduleName={formType}
          id={id}
        />}
      </div>
    </div>
  );
};

export default Meetings;
