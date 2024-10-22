import SaleOrderClone from "../View/App/sale-order/clone";
import SaleOrderDetail from "../View/App/sale-order/detial";
import SaleOrderList from "../View/App/sale-order/list";
import AccountDetails from "../View/accounts/AccountsDetail";
import CreateAccounts from "../View/accounts/CreateAccounts";
import { AccountsClone } from "../View/accounts/clone";
import AccountList from "../View/accounts/list";
import ContactDetails from "../View/contacts/ContctsDetail";
import CreateContacts from "../View/contacts/CreateContacts";
import { ContactsClone } from "../View/contacts/clone";
import ContactList from "../View/contacts/list";
import CreateLead from "../View/leads/CreateLead";
import { LeadsClone } from "../View/leads/clone";
import LeadList from "../View/leads/list";
import LeadsDetail from "../View/leads/LeadsDetail";
import MassSaleOrder from "../View/App/sale-order/massSaleOrder";
import MassAccount from "../View/accounts/massAccount";
import MassOpportunity from "../View/opportunities/massOpportunity";
import OpportunitiesList from "../View/opportunities/list";

export const allRoutes = [
  {
    element: SaleOrderDetail,
    path: "/crm/saleOrder-details/:id",
    roleType: "edit",
    modlueType: "saleOrders",
  },
  {
    element: SaleOrderList,
    path: "/crm/saleorder",
    roleType: "read",
    modlueType: "saleOrders",
  },
  {
    element: SaleOrderClone,
    path: "/crm/saleOrder-clone/:id",
    roleType: "edit",
    modlueType: "saleOrders",
  },
  {
    element: MassSaleOrder,
    path: "/crm/saleOrder-clone/:id",
    roleType: "edit",
    modlueType: "saleOrders",
  },
  {
    element: LeadList,
    path: "/crm/leads",
    roleType: "read",
    modlueType: "leads",
  },
  {
    element: CreateLead,
    path: "/crm/create-leads",
    roleType: "write",
    modlueType: "leads",
  },
  {
    element: LeadsDetail,
    path: "/crm/lead-details/:id",
    roleType: "edit",
    modlueType: "leads",
  },
  {
    element: LeadsClone,
    path: "/crm/lead-clone/:id",
    roleType: "edit",
    modlueType: "leads",
  },
  {
    element: ContactList,
    path: "/crm/contacts",
    roleType: "read",
    modlueType: "contacts",
  },
  {
    element: CreateContacts,
    path: "/crm/create-contacts",
    roleType: "read",
    modlueType: "contacts",
  },
  {
    element: ContactDetails,
    path: "/crm/contacts-details/:id",
    roleType: "read",
    modlueType: "contacts",
  },
  {
    element: ContactsClone,
    path: "/crm/contacts-clone/:id",
    roleType: "edit",
    modlueType: "contacts",
  },
  {
    element: AccountList,
    path: "/crm/accounts",
    roleType: "read",
    modlueType: "account",
  },
  {
    element: CreateAccounts,
    path: "/crm/create-accounts",
    roleType: "write",
    modlueType: "account",
  },
  {
    element: AccountsClone,
    path: "/crm/account-clone/:id",
    roleType: "read",
    modlueType: "account",
  },
  {
    element: AccountDetails,
    path: "/crm/account-details/:id",
    roleType: "read",
    modlueType: "account",
  },
  {
    element: MassAccount,
    path: "/crm/account/mass-module",
    roleType: "read",
    modlueType: "account",
  },
  {
    element: MassOpportunity,
    path: "/crm/account/mass-module",
    roleType: "read",
    modlueType: "opportunities",
  },
  {
    element: OpportunitiesList,
    path: "/crm/opportunities",
    roleType: "read",
    modlueType: "opportunities",
  },
  {
    element: OpportunitiesList,
    path: "/crm/create-opportunities",
    roleType: "read",
    modlueType: "opportunities",
  },
  {
    element: OpportunitiesList,
    path: "/crm/opportunities-details/:id",
    roleType: "read",
    modlueType: "opportunities",
  },
  {
    element: OpportunitiesList,
    path: "/crm/opportunities-clone/:id",
    roleType: "read",
    modlueType: "opportunities",
  },
];
