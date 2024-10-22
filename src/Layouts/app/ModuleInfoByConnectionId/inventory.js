import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_MODULE_INFO_BY_CONNECTION_ID,
  GET_FORM_BY_TITLE,
  GET_INVENTORY_FOR_OPPORTUNITY,
} from "../../../Redux/actions/comman";
import { Link } from "react-router-dom";
import DynamicListing from "./dynamicListing";
import DynamicTableListing from "./dynamicTableListing";
import { useNavigate } from "react-router-dom";
import PageLoader from '../../../Components/pageLoader';



const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData
}

const Inventory = ({ id, prePathname, moduleName, permission, ownerid, formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [inventory, setInventory] = useState([]);
  const [data, setData] = useState();
  const [newModule, setNewModule] = useState(false);
  const [loader, setLoader] = useState(true);

  const asyncGetInventory = async () => {
    dispatch(GET_FORM_BY_TITLE("Inventory")).then((res) => {
      const data = res.data?.data ? false : true;
      setNewModule(data);
    });
    setLoader(true);
    let endPoint = "inventory-by-connection";
    let res = await dispatch(GET_MODULE_INFO_BY_CONNECTION_ID(endPoint, id));
    if (res?.data) {
      setInventory(res?.data?.inventoryData);
    }
    setLoader(false);
  };

  const getInventoryOfDeal = async () => {
    let res = await dispatch(GET_INVENTORY_FOR_OPPORTUNITY(id));
    setData(res?.data?.data);
  };

  useEffect(() => {
    asyncGetInventory();
    getInventoryOfDeal();
  }, [dispatch]);

  const checkPermission = () => {
    if (ownerid === getUserId()?._id || getUserId()?.profile === 'Administrator') {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Inventory</p>
          {!newModule ? (
            <>
              <div className="flex justify-end">
                {/* {!prePathname?.includes("opportunities") && (
                  <div
                    // to={`/crm/create-inventory?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
                    className="bg-primary p-2 rounded-lg text-white mx-2"
                    onClick={() => navigate("/crm/create-inventory", {
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
                )} */}
                {/* {prePathname?.includes("opportunities") && ( */}
                <div
                  //to={`/crm/inventory/connectionId/${id}`}
                  type="button"
                  className="bg-primary p-2 rounded-lg text-white"
                  onClick={() => navigate("/crm/inventory/connectionId/" + id, {
                    state: {
                      getConnectionId: id,
                      prePathname: prePathname,
                      moduleName: formType,
                      type: formType,
                      parentModule: formType
                    }
                  })}
                >
                  Add
                </div>
                {/* )} */}
              </div>
            </>
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
        {console.log("inventory===>", inventory, data)}
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/inventory-detail" data={inventory} moduleName={moduleName} id={id} />}
        {loader ? <PageLoader title="Loading" /> : <DynamicTableListing data={data?.Inventory} moduleName={moduleName} />}
      </>
    } else if (permission?.read) {
      return <>
        <div className="pb-2 flex justify-between items-center">
          <p className="font-medium text-lg">Inventory</p>
          {permission?.write && <>
            {!newModule ? (
              <>
                <div className="flex justify-end">
                  {/* {!prePathname?.includes("opportunities") && (
                    <div
                      // to={`/crm/create-inventory?connectionId=${id}?prePathname=${prePathname}&parentModule=${formType}`}
                      className="bg-primary p-2 rounded-lg text-white mx-2"
                      onClick={() => navigate("/crm/create-inventory", {
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
                  )} */}
                  {/* {prePathname?.includes("opportunities") && ( */}
                  <div
                    //to={`/crm/inventory/connectionId/${id}`}
                    type="button"
                    className="bg-primary p-2 rounded-lg text-white"
                    onClick={() => {
                      window.location.reload();

                      navigate("/crm/inventory/connectionId/" + id, {
                        state: {
                          getConnectionId: id,
                          prePathname: prePathname,
                          moduleName: formType,
                          type: formType,
                          parentModule: formType
                        }
                      })

                    }
                    }
                  >
                    Add
                  </div>
                  {/* )} */}
                </div>
              </>
            ) : (
              <Link
                to={`/crm/createModule?name=${moduleName}`}
                type="button"
                className="text-white mt-4 bg-primary hover:bg-priamry/20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
              >
                Create New module
              </Link>
            )}
          </>}
        </div>
        {loader ? <PageLoader title="Loading" /> : <DynamicListing detailPath="/crm/inventory-detail" data={inventory} moduleName={formType} id={id} />}
        {loader ? <PageLoader title="Loading" /> : <DynamicTableListing data={data?.Inventory} moduleName={formType} />}
      </>
    }
  }

  return (
    <div className="w-full my-3 pt-[200px] mt-[-200px]" id="inventory">
      {checkPermission()}
    </div>
  );
};

export default Inventory;
