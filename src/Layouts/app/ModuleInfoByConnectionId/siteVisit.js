import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_MODULE_INFO_BY_CONNECTION_ID } from "../../../Redux/actions/comman";
import DynamicListing from "./dynamicListing";
import SiteVisitModal from "./SiteVisitModal";
import { useNavigate } from "react-router-dom";
import PageLoader from '../../../Components/pageLoader';
const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData;
};

const SiteVisit = ({ id, moduleName, formType, ownerid, permission }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [invoice, setInvoice] = useState([]);
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(true);


  const asyncGetInvoice = async () => {
    setLoader(true);
    let endPoint = "siteVisit-by-connection";
    console.log("iddddd", id);
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      setInvoice(res?.data?.siteVisitData);
    }
    setLoader(false);
  };

  useEffect(() => {
    asyncGetInvoice();
  }, [dispatch]);

  const reloadData = () => {
    asyncGetInvoice();
  };

  const checkPermission = () => {
    if (
      ownerid === getUserId()?._id ||
      getUserId()?.profile === "Administrator"
    ) {
      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Site Visit</p>
            <button
              onClick={() => setModal(true)}
              className="bg-primary p-2 rounded-lg text-white"
              type="button"
            >
              Create
            </button>
          </div>
          {loader ? <PageLoader title="Loading" /> : <DynamicListing
            detailPath="/crm/SiteVisit-details"
            data={invoice}
            moduleName={formType}
            id={id}
          />}
          <SiteVisitModal
            modal={modal}
            setModal={setModal}
            module="Inventory"
            formType={formType}
            id={id}
            reloadData={reloadData}
          />
        </>
      );
    } else if (permission?.read) {
      return (
        <>
          <div className="pb-2 flex justify-between items-center">
            <p className="font-medium text-lg">Site Visit</p>
            {permission?.write && (
              <button
                onClick={() => setModal(true)}
                className="bg-primary p-2 rounded-lg text-white"
                type="button"
              >
                Create
              </button>
            )}
          </div>
          {loader ? <PageLoader title="Loading" /> : <DynamicListing
            detailPath="/crm/SiteVisit-details"
            data={invoice}
            moduleName={formType}
            id={id}
          />}
          <SiteVisitModal
            modal={modal}
            setModal={setModal}
            module="Inventory"
            formType={formType}
            id={id}
            reloadData={reloadData}
          />
        </>
      );
    }
  };

  return (
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="siteVisit">
      {checkPermission()}
    </div>
  );
};

export default SiteVisit;
