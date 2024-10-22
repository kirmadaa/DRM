import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_MODULE_INFO_BY_CONNECTION_ID,
  GET_FORM_BY_TITLE,
} from "../../../Redux/actions/comman";
import { Link } from "react-router-dom";
// import { getFormsByTitle } from "../../Redux/userSlice";
import DynamicListing from "./dynamicListing";
import { useNavigate } from "react-router-dom";
import PageLoader from '../../../Components/pageLoader';
import { Menu } from "@headlessui/react";

const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData;
};

const Calls = ({
  id,
  prePathname,
  moduleName,
  permission,
  ownerid,
  formType,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [calls, setCalls] = useState([]);
  const [newModule, setNewModule] = useState(false);
  const [loader, setLoader] = useState(true);

  const asyncGetCalls = async () => {
    dispatch(GET_FORM_BY_TITLE("Calls")).then((res) => {
      const data = res.data?.data ? false : true;
      setNewModule(data);
    });
    setLoader(true)
    let endPoint = "calls-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      const updatedCalls = res?.data?.callData?.map((call) => {
        // Parse the ClosedTime into a Date object
        const CallStartTime = new Date(call?.CallStartTime);
        // Get the current time
        const currentTime = new Date();
        // If the CallStartTime is in the past, mark the call as closed
        if (CallStartTime <= currentTime) {
          return { ...call, callClosed: "closed" };
        }
        return call;
      });
      setCalls(updatedCalls);
      setLoader(false)
    }
  };

  useEffect(() => {
    asyncGetCalls();
  }, [dispatch]);
  console.log("newModule---->>", newModule);
  const checkPermission = () => {
    if (
      ownerid === getUserId()?._id ||
      getUserId()?.profile === "Administrator"
    ) {
      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Calls</p>
            {!newModule ? (
              <div>
                <Menu>
                  <Menu.Button
                  //className="border flex bg-primary text-white items-center gap-3 border-[#E4E4E7] py-3 px-4 font-medium text-sm rounded-2xl"
                  >
                    <div
                      //to={`/crm/create-call?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                      className="bg-primary p-2 rounded-lg text-white"
                    // onClick={() => navigate("/crm/create-call?callType=log", {
                    //   state: {
                    //     getConnectionId: id,
                    //     prePathname: prePathname,
                    // moduleName: formType,
                    // type: formType,
                    // parentModule: formType
                    //   }
                    // })}
                    >
                      Create
                    </div>
                  </Menu.Button>

                  <div className="relative z-999 ml-0 mt-0 w-max origin-top-left divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg focus:outline-none">
                    <Menu.Items>
                      <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                        {({ active }) => (
                          <div
                            // className={`${active && "bg-white"}`}
                            //to="/crm/create-call?callType=log"
                            onClick={() => navigate("/crm/create-call?callType=log", {
                              state: {
                                getConnectionId: id,
                                prePathname: prePathname,
                                moduleName: formType,
                                type: formType,
                                parentModule: formType
                              }
                            })}
                          >
                            Log Call
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item className="text-gray-900 group flex w-full items-center px-5 py-[10px] text-sm border-b border-[#E4E4E7] hover:bg-primary hover:text-white">
                        {({ active }) => (
                          <div
                            // className={`${active && "bg-white"}`}
                            //  to="/crm/create-call?callType=schedule"
                            onClick={() => navigate("/crm/create-call?callType=schedule", {
                              state: {
                                getConnectionId: id,
                                prePathname: prePathname,
                                moduleName: formType,
                                type: formType,
                                parentModule: formType
                              }
                            })}
                          >
                            Schedule Call
                          </div>
                        )}
                      </Menu.Item>

                    </Menu.Items>
                  </div>
                </Menu>
                {/* <div
                //to={`/crm/create-call?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                className="bg-primary p-2 rounded-lg text-white"
                onClick={() => navigate("/crm/create-call?callType=log", {
                  state: {
                    getConnectionId: id,
                    prePathname: prePathname,
                    moduleName: formType,
                    type: formType,
                    parentModule: formType
                  }
                })}
              >
                --Create
              </div> */}
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
            <p className="font-medium text-lg">Calls</p>
            {permission?.write && (
              <>
                {!newModule ? (
                  <div
                    //to={`/crm/create-call?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                    className="bg-primary p-2 rounded-lg text-white"
                    onClick={() => navigate("/crm/create-call?callType=log", {
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
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="calls">
      {checkPermission()}
      <div className="bg-white mb-2 rounded-xl p-2">
        <p className="font-[500] text-gray-600">Open Activity</p>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing
          detailPath="/crm/call-details"
          data={calls?.filter((item) => item?.OutgoingCallStatus === "Scheduled")}
          moduleName={formType}
          callType={"schedule"}
          id={id}
        />}
      </div>
      <div className="bg-white mb-2 rounded-xl p-2">
        <p className="font-[500] text-gray-600">Close Activity</p>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing
          detailPath="/crm/call-details"
          data={calls?.filter((item) => item?.OutgoingCallStatus != "Scheduled")}
          moduleName={formType}
          callType={"log"}
          id={id}
        />}
      </div>
    </div>
  );
};

export default Calls;
