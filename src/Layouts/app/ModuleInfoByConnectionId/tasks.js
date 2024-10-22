import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MODULE_INFO_BY_CONNECTION_ID,
  GET_FORM_BY_TITLE,
} from "../../../Redux/actions/comman";
// import { getFormsByTitle } from "../../Redux/userSlice";
import { Link } from "react-router-dom";
import DynamicListing from "./dynamicListing";
import { useNavigate } from "react-router-dom";
import { SET_LOADER } from '../../../Redux/actions/user';
import PageLoader from '../../../Components/pageLoader';

const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData;
};
const Tasks = ({
  id,
  prePathname,
  formType,
  moduleName,
  permission,
  ownerid,
}) => {
  console.log("fromType", formType);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([]);
  const [newModule, setNewModule] = useState(false);
  const [loader, setLoader] = useState(true);

  const loading = useSelector((state) => state.user.loading)
  const asyncGetTasks = async () => {
    dispatch(GET_FORM_BY_TITLE("Tasks")).then((res) => {
      const data = res.data?.data ? false : true;
      setNewModule(data);

    });
    setLoader(true)

    let endPoint = "tasks-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));


    if (res?.data) {
      const updatedTasks = res?.data?.taskData?.map((task) => {
        // Parse the ClosedTime into a Date object
        const closedTime = new Date(task?.ClosedTime);
        // Get the current time
        const currentTime = new Date();
        // If the ClosedTime is in the past, mark the task as closed
        if (closedTime <= currentTime) {
          return { ...task, taskClosed: "closed" };
        }
        return task;
      });
      setTasks(updatedTasks);
      setLoader(false);
    }
    setTimeout(() => {
      SET_LOADER(false)

    }, 5000);
  };

  useEffect(() => {
    asyncGetTasks();
  }, [dispatch]);
  // if (loader) {
  //   return <PageLoader title="Loading" />;
  // }
  const checkPermission = () => {
    if (
      ownerid === getUserId()?._id ||
      getUserId()?.profile === "Administrator"
    ) {

      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Tasks</p>
            {!newModule ? (
              <div
                // to={`/crm/create-tasks?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                className="bg-primary p-2 rounded-lg text-white"
                onClick={() => navigate("/crm/create-tasks", {
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
            <p className="font-medium text-lg">Tasks</p>
            {permission?.write && (
              <>
                {!newModule ? (
                  <div
                    //to={`/crm/create-tasks?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                    className="bg-primary p-2 rounded-lg text-white"
                    onClick={() => navigate("/crm/create-tasks", {
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
  // console.log(tasks)
  if (loading) {
    return <PageLoader title="Loading" />;
  }


  return (
    <div className="w-full my-3 pt-[210px] mt-[-200px]" id="task">
      {checkPermission()}
      {/* {console.log("formType===>0", formType)} */}
      <div className="bg-white mb-2 rounded-xl p-2">
        <p className="font-[500] text-gray-600">Open Activity</p>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing
          detailPath="/crm/task-details"
          data={tasks?.filter((item) => item?.taskClosed === undefined)}
          moduleName={formType}
          id={id}
        />}
      </div>
      <div className="bg-white mb-2 rounded-xl p-2">
        <p className="font-[500] text-gray-600">Close Activity</p>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing
          detailPath="/crm/task-details"
          data={tasks?.filter((item) => item?.taskClosed === "closed")}
          moduleName={formType}
          id={id}

        />}
      </div>
    </div>
  );
};

export default memo(Tasks);
