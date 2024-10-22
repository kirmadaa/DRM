import { useLocation, useParams } from "react-router-dom";
import Tasks from "./tasks";
import Calls from "./calls";
import Meetings from "./meeting";
import SaleOrder from "./saleOrder";
import PurchaseOrder from "./purchaseOrder";
import Invoice from "./invoice";
import Quotes from "./quotes";
import WhatsApp from "./whatsapp";
import Smscom from "./sms";
import EmailCom from "./email";
import { useEffect } from "react";
import { GET_COMPANY_DATA_BY_ID } from "../../../Redux/actions/company";
import { useSelector, useDispatch } from "react-redux";
import Inventory from "./inventory";
import Notes from "./notes";
import SiteVisit from "./siteVisit";

const ModuleInfoByConnections = ({ formType }) => {
  const { id } = useParams();
  const permissionById = useSelector(
    (state) => state?.ServiceControlReducer?.permissionById
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.user.detail);
  const serviceControl = useSelector(
    (state) => state?.companyReducer?.Company?.data
  );
  const { pathname } = location;
  useEffect(() => {
    dispatch(GET_COMPANY_DATA_BY_ID());
  }, []);

  const getModulePermissions = (moduleName) => {
    return permissionById?.find((item) => item?.moduleTitle === moduleName);
  };

  return (
    <div className="w-full ">
      <Tasks
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Tasks")}
        moduleName="Tasks"
        formType={formType}
        id={id}
        prePathname={pathname}
      />
      <Calls
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Call")}
        moduleName="Call"
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <Meetings
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Meetings")}
        moduleName="Meeting"
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <Inventory
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Inventory")}
        moduleName="Inventory"
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <Notes
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Note")}
        moduleName="Note"
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <SaleOrder
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Sales Orders")}
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <PurchaseOrder
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Purchase Orders")}
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <Invoice
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("Invoices")}
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <SiteVisit
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("siteVisit")}
        moduleName="Site visit"
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      <Quotes
        ownerid={detail[`${formType}OwnerId`]}
        permission={getModulePermissions("quotes")}
        id={id}
        formType={formType}
        prePathname={pathname}
      />
      {serviceControl?.whatsapp_service && (
        <WhatsApp
          ownerid={detail[`${formType}OwnerId`]}
          permission={getModulePermissions("whatsapp")}
          id={id}
          formType={formType}
          prePathname={pathname}
        />
      )}
      {serviceControl?.sms_service && (
        <Smscom
          ownerid={detail[`${formType}OwnerId`]}
          permission={getModulePermissions("sms")}
          id={id}
          formType={formType}
          prePathname={pathname}
        />
      )}
      {serviceControl?.whatsapp_service && (
        <EmailCom
          ownerid={detail[`${formType}OwnerId`]}
          permission={getModulePermissions("email")}
          id={id}
          formType={formType}
          prePathname={pathname}
        />
      )}
    </div>
  );
};

export default ModuleInfoByConnections;
