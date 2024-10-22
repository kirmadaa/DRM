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

const Invoice = ({ id, prePathname, ownerid, permission, formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [invoice, setInvoice] = useState([]);
  const [loader, setLoader] = useState(true);


  const asyncGetInvoice = async () => {
    setLoader(true);
    let endPoint = "invoices-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      setInvoice(res?.data?.invoicesData);
    }
    setLoader(false);
  };

  useEffect(() => {
    asyncGetInvoice();
  }, [dispatch]);

  const checkPermission = () => {
    if (ownerid === getUserId()?._id || getUserId()?.profile === 'Administrator') {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Invoice</p>
          <div
            //to={`/crm/create-invoice?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
            className="bg-primary p-2 rounded-lg text-white"
            onClick={() => navigate("/crm/create-invoice", {
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
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/invoices-details" data={invoice} moduleName={formType} id={id} />}
      </>
    } else if (permission?.read) {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Invoice</p>
          {permission?.write && <div
            //  to={`/crm/create-invoice?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
            className="bg-primary p-2 rounded-lg text-white"
            onClick={() => navigate("/crm/create-invoice", {
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
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/invoices-details" data={invoice} moduleName={formType} id={id} />}
      </>
    }
  }

  return (
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="invoice">
      {checkPermission()}
    </div>
  );
};

export default Invoice;
