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


const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData;
};

const Notes = ({
  id,
  prePathname,
  moduleName,
  formType,
  ownerid,
  permission,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [notes, setNotes] = useState([]);
  const [newModule, setNewModule] = useState(false);
  const [loader, setLoader] = useState(true);

  const asyncGetNotes = async () => {
    dispatch(GET_FORM_BY_TITLE("Note")).then((res) => {
      const data = res.data?.data ? false : true;
      setNewModule(data);
    });
    setLoader(true);
    let endPoint = "notes-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      setNotes(res?.data?.NotesData);
    }
    setLoader(false);
  };

  useEffect(() => {
    asyncGetNotes();
  }, [dispatch]);

  const checkPermission = () => {
    if (
      ownerid === getUserId()?._id ||
      getUserId()?.profile === "Administrator"
    ) {
      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Notes</p>
            <>
              {!newModule ? (
                <div
                  //to={`/crm/create-note?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                  className="bg-primary p-2 rounded-lg text-white"
                  onClick={() => navigate("/crm/create-note", {
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
          </div>
          {loader ? <PageLoader title="Loading" /> : <DynamicListing
            detailPath="/crm/note-detail"
            data={notes}
            moduleName={moduleName}
            id={id}
          />}
        </>
      );
    } else if (permission?.read) {
      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Notes</p>
            {permission?.write && (
              <>
                {!newModule ? (
                  <div
                    //to={`/crm/create-note?connectionId=${id}?prePathname=${prePathname}&type=${formType}&parentModule=${formType}`}
                    className="bg-primary p-2 rounded-lg text-white"
                    onClick={() => navigate("/crm/create-note", {
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
                    to={`/crm/createModule?name=${formType}`}
                    type="button"
                    className="text-white mt-4 bg-primary hover:bg-priamry/20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
                  >
                    Create New module
                  </Link>
                )}
              </>
            )}
          </div>
          {loader ? <PageLoader title="Loading" /> : <DynamicListing
            detailPath="/crm/note-detail"
            data={notes}
            moduleName={formType}
            id={id}
          />}
        </>
      );
    }
  };

  return (
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="notes">
      {checkPermission()}
    </div>
  );
};

export default Notes;
