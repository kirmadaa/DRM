// ** Redux Imports
import { combineReducers } from "redux";

import auth from "./authentication";
import user from "./user";
import apiDocReducer from "./apiDoc";
import companyReducer from "./company";
import role from "./role";

import ModulesReducer from "./modules";
import profile from "./userList";
import Saleorder from "./saleOrder";
import PurchaseOrder from "./purchaseOrder";
import Invoices from "./invoices";
import Quotes from "./quotes";
import commanvar from "./comman";
import SecurityProfile from "./security-profile";
import FieldMap from "./fieldMap";
import socialAccountsreducer from "./socialAccounts.JS";
import ServiceControlReducer from "./serviceControl";
import sideBarReducer from "./sideBar";
import territoryReducer from "./territory";
import AssignmentRules from "./assignmentRules";
import workflowReducer from "./workflow";
import ipanelState from "./ipanel";
import CustomizationDashboard from "./custimationDashboard";
import sheetReducer from './sheet'
import pipelineReducer from "./pipeline";
import approvalProcess from "./approvalProcess";
import reports from './reports'

const rootReducer = combineReducers({
  auth,
  user,
  apiDocReducer,
  companyReducer,
  role,
  ModulesReducer,
  profile,
  Saleorder,
  PurchaseOrder,
  Invoices,
  Quotes,
  commanvar,
  SecurityProfile,
  FieldMap,
  socialAccountsreducer,
  ServiceControlReducer,
  sideBarReducer,
  territoryReducer,
  AssignmentRules,
  workflowReducer,
  ipanelState,
  CustomizationDashboard,
  sheetReducer,
  pipelineReducer,
  approvalProcess,
  reports
});

export default rootReducer;
