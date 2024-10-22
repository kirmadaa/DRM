import LeadList from "../../View/leads/list";
import ContactList from "../../View/contacts/list";
import DashboardView from "../../View/App/dashboard";

export const menuItems = [
  {
    label: "Alerts",
    id: "home",
    key: "/crm/dashboard",
    create: "/crm/create-leads",
    component: DashboardView,
  },
  // {
  //   label: "Leads",
  //   id: "leads",
  //   key: "/crm/leads",
  //   create: "/crm/create-leads",
  //   component: LeadList,
  // },
  // {
  //   label: "Contacts",
  //   id: "contacts",
  //   key: "/crm/contacts",
  //   create: "/crm/create-contacts",
  //   component: ContactList,
  // },
  {
    label: "Inventory",
    id: "inventory",
    create: "/crm/create-leads",
    key: "/crm/inventory",
  },
  // {
  //   label: "Accounts",
  //   id: "accounts",
  //   key: "/crm/accounts",
  //   create: "/crm/create-accounts",
  // },
  {
    label: "Sale Orders",
    id: "saleOrders",
    create: "/crm/create-leads",
    key: "/crm/saleorder",
  },
  {
    label: "Purchase Orders",
    id: "purchaseOrders",
    key: "/crm/purchaseorder",
    create: "/crm/create-leads",
  },
  {
    label: "Invoices",
    id: "invoices",
    create: "/crm/create-leads",
    key: "/crm/invoices",
  },
  {
    label: "Vendor",
    id: "vendor",
    create: "/crm/create-vendor",
    key: "/crm/vendor",
  },
  // {
  //   label: "Opportunities",
  //   id: "opportunities",
  //   create: "/crm/create-opportunities",
  //   key: "/crm/opportunities",
  // },
  // {
  //   label: "Tasks",
  //   id: "tasks",
  //   create: "/crm/create-tasks",
  //   key: "/crm/tasks",
  // },
  // { label: "Calls", id: "Calls", create: "/crm/create-call", key: "/crm/call" },
  // {
  //   label: "Meeting",
  //   id: "meeting",
  //   create: "/crm/create-meeting",
  //   key: "/crm/meeting",
  // },
  {
    label: "Reports",
    id: "reports",
    create: "/crm/reports",
    key: "/crm/reports",
  },
  {
    hamburger: [
      // {
      //   label: "Sale Orders",
      //   id: "saleOrders",
      //   create: "/crm/create-leads",
      //   key: "/crm/saleorder",
      // },
      // {
      //   label: "Purchase Orders",
      //   id: "purchaseOrders",
      //   key: "/crm/purchaseorder",
      //   create: "/crm/create-leads",
      // },
      // {
      //   label: "Invoices",
      //   id: "invoices",
      //   create: "/crm/create-leads",
      //   key: "/crm/invoices",
      // },
      // {
      //   label: "Quotes",
      //   id: "quotes",
      //   create: "/crm/create-leads",
      //   key: "/crm/quotes",
      // },
      // {
      //   label: "Inventory",
      //   id: "inventory",
      //   create: "/crm/create-leads",
      //   key: "/crm/inventory",
      // },
      {
        label: "Notes",
        id: "note",
        create: "/crm/create-leads",
        key: "/crm/notes",
      },
      // {
      //   label: "Site Visit",
      //   id: "siteVisit",
      //   create: "/crm/create-leads",
      //   key: "/crm/sitevisit",
      // },
      // {
      //   label: "Vendor",
      //   id: "vendor",
      //   create: "/crm/create-vendor",
      //   key: "/crm/vendor",
      // },
      {
        label: "Channel Partner",
        id: "channelPartner",
        create: "/crm/create-channelPartner",
        key: "/crm/channelPartner",
      },
      {
        label: "Adds Account",
        id: "vendor",
        create: "/crm/create-leads",
        key: "/crm/adds_accounts",
      },
    ],
  },
];
