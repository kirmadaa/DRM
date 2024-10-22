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

const PurchaseOrder = ({ id, prePathname, ownerid, permission, formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const [loader, setLoader] = useState(true);

  const asyncGetPurchaseOrder = async () => {
    setLoader(true);
    let endPoint = "purchase-orders-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      setPurchaseOrder(res?.data?.purchaseOrderData);
    }
    setLoader(false);
  };

  useEffect(() => {
    asyncGetPurchaseOrder();
  }, [dispatch]);

  const checkPermission = () => {
    if (ownerid === getUserId()?._id || getUserId()?.profile === 'Administrator') {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Purchase Orders</p>
          <div
            //to={`/crm/create-purchaseorder?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
            className="bg-primary p-2 rounded-lg text-white"
            onClick={() => navigate("/crm/create-purchaseorder", {
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
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/purchaseOrder-details" data={purchaseOrder} id={id} />}
      </>
    } else if (permission?.read) {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Purchase Orders</p>
          {permission?.write && <div
            // to={`/crm/create-purchaseorder?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
            className="bg-primary p-2 rounded-lg text-white"
            onClick={() => navigate("/crm/create-purchaseorder", {
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
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/purchaseOrder-details" data={purchaseOrder} id={id} />}
      </>
    }
  }

  return (
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="purchase-order">
      {checkPermission()}
    </div>
  );
};

export default PurchaseOrder;
