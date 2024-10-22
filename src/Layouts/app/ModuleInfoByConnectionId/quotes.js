import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_MODULE_INFO_BY_CONNECTION_ID } from "../../../Redux/actions/comman";
import { Link } from "react-router-dom";
import DynamicListing from "./dynamicListing";
import { useNavigate } from "react-router-dom";
import PageLoader from '../../../Components/pageLoader';

const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData
}

const Quotes = ({ id, prePathname, ownerid, permission, formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quotes, setInvoice] = useState([]);
  const [loader, setLoader] = useState(true);


  const asyncGetQuotes = async () => {
    setLoader(true);
    let endPoint = "quotes-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      setInvoice(res?.data?.QuotesData);
    }
    setLoader(false);
  };

  useEffect(() => {
    asyncGetQuotes();
  }, [dispatch]);

  const checkPermission = () => {
    if (ownerid === getUserId()?._id || getUserId()?.profile === 'Administrator') {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Quotes</p>
          <div
            // to={`/crm/create-quotes?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
            className="bg-primary p-2 rounded-lg text-white"
            onClick={() => navigate("/crm/create-quotes", {
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
        </div>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/quotes-details" data={quotes} id={id} />}
      </>
    } else if (permission?.read) {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Quotes</p>
          {permission?.write && <div
            //to={`/crm/create-quotes?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
            className="bg-primary p-2 rounded-lg text-white"
            onClick={() => navigate("/crm/create-quotes", {
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
          </div>}
        </div>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/quotes-details" data={quotes} id={id} />}
      </>
    }
  }

  return (
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="quotes">
      {checkPermission()}
    </div>
  );
};

export default Quotes;
