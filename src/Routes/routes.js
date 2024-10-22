import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { OpportunitiesClone } from "../View/opportunities/clone"
import { MeetingClone } from "../View/meeting/clone"
import { EmailClone } from "../View/Email/clone"
import { SmsClone } from "../View/Sms/clone"
import { CallClone } from "../View/call/clone"
import { WhatsappTemplateClone } from "../View/WhatsappTemplate/clone"
import { TasksClone } from "../View/tasks/clone"
import { ContactsClone } from "../View/contacts/clone"
import { AccountsClone } from "../View/accounts/clone"
import { LeadsClone } from "../View/leads/clone"
import { VendorClone } from "../View/App/vendor/clone"
import { ChannelPartnerClone } from "../View/App/channelpartner/clone"
import { CallDetails } from "../View/call/CallDetail"
import UniversalLogin from "../View/Auth/universal_login";
const ResetPassword = lazy(() => import("../Auth/reset-password"));
const RoleList = lazy(() => import("../View/App/role/detail"));
const LeadList = lazy(() => import("../View/leads/list"));
const AccountList = lazy(() => import("../View/accounts/list"));
const ContactList = lazy(() => import("../View/contacts/list"));
const TaskList = lazy(() => import("../View/tasks/list"));
const OpportunitiesList = lazy(() => import("../View/opportunities/list"));
const MeetingList = lazy(() => import("../View/meeting/list"));
const SiteVisitList = lazy(() => import("../View/SiteVisit/list"));
const EmailList = lazy(() => import("../View/Email/list"));
const SmsList = lazy(() => import("../View/Sms/list"));
const CallList = lazy(() => import("../View/call/list"));
const WhatsappTemplateList = lazy(() => import("../View/WhatsappTemplate/list"));

const CreateLead = lazy(() => import("../View/leads/CreateLead"));
const CreateAccounts = lazy(() => import("../View/accounts/CreateAccounts"));
const CreateContacts = lazy(() => import("../View/contacts/CreateContacts"));
const CreateOpportunities = lazy(() => import("../View/opportunities/CreateOpportunities"));
const CreateTasks = lazy(() => import("../View/tasks/CreateTasks"));
const CreateMeeting = lazy(() => import("../View/meeting/CreateMeeting"));
const CreateCall = lazy(() => import("../View/call/CreateCall"));
const CreateWhatsappTemplate = lazy(() => import("../View/WhatsappTemplate/CreateWhatsappTemplate"));
const CreateSms = lazy(() => import("../View/Sms/CreateSms"));
const CreateEmail = lazy(() => import("../View/Email/CreateEmail"));
const CreateSiteVisit = lazy(() => import("../View/SiteVisit/CreateSiteVisit"));
const LeadsDetail = lazy(() => import("../View/leads/LeadsDetail"));
const AccountsDetail = lazy(() => import("../View/accounts/AccountsDetail"));
const ContactDetail = lazy(() => import("../View/contacts/ContctsDetail"));
const TasksDetail = lazy(() => import("../View/tasks/TasksDetail"));
const OpportunitiesDetail = lazy(() => import("../View/opportunities/OpportunitiesDetail"));
const MeetingDetail = lazy(() => import("../View/meeting/MeetingDetail"));
const SiteVisitDetail = lazy(() => import("../View/SiteVisit/siteVisitDetail"));
const EmailTemplateDetail = lazy(() => import("../View/Email/EmailDetails"));
const SmsDetail = lazy(() => import("../View/Sms/SmsDetail"));
const WhatsappTemplateDetail = lazy(() => import("../View/WhatsappTemplate/WhatsappTemplateDetail"));

const CreateSalesOrder = lazy(() => import("../View/App/sale-order/create"));
const CanvasListofInvoice = lazy(() => import("../View/App/invoice/canvasList"));
const CanvasListofQuotes = lazy(() => import("../View/App/quotes/canvasList"));
const CanvasListofSaleOrder = lazy(() => import("../View/App/sale-order/canvasList"));
const CanvasListofPurchaseOrder = lazy(() => import("../View/App/purches/canvasList"));
const SaleOrderList = lazy(() => import("../View/App/sale-order/list"));
const PurchaseOrderList = lazy(() => import("../View/App/purches/list"));
const CreatepurchaseOrder = lazy(() => import("../View/App/purches/create"));
const InovoiceList = lazy(() => import("../View/App/invoice/list"));
const CreateinvoiceOrder = lazy(() => import("../View/App/invoice/create"));
const QuotesList = lazy(() => import("../View/App/quotes/list"));
const CreateQuotes = lazy(() => import("../View/App/quotes/create"));
const SaleOrderDetail = lazy(() => import("../View/App/sale-order/detial"));
const PurchaseOrderDetail = lazy(() => import("../View/App/purches/detial"));
const QuotesDetail = lazy(() => import("../View/App/quotes/detial"));
const InvoicesDetail = lazy(() => import("../View/App/invoice/detial"));

const SaleOrderClone = lazy(() => import("../View/App/sale-order/clone"));
const InvoiceClone = lazy(() => import("../View/App/invoice/clone"));
const QuotesClone = lazy(() => import("../View/App/quotes/clone"));
const PurchaseOrderClone = lazy(() => import("../View/App/purches/clone"));
const EditSecurityProfile = lazy(() => import("../Layouts/app/securityProfile/edit"));
const MassCall = lazy(() => import("../View/call/massCall"));
const MassMeetings = lazy(() => import("../View/meeting/massMeetings"));
const FieldMap = lazy(() => import("../View/App/field-map"));
const MassSiteVisit = lazy(() => import("../View/SiteVisit/massSite"));
const MassSaleOrder = lazy(() => import("../View/App/sale-order/massSaleOrder"));
const MassPurchaseOrder = lazy(() => import("../View/App/purches/massPurchaseOrder"));
const MassInvoice = lazy(() => import("../View/App/invoice/massInvoice"));
const MassQuotes = lazy(() => import("../View/App/quotes/massQuotes"));
const UnAuthorized = lazy(() => import("../View/Pages/UnAuthorized"));
const MassVendor = lazy(() => import("../View/App/vendor/massVendor"));
const ListVendorApp = lazy(() => import("../View/App/vendor/list"));
const CreateVendor = lazy(() => import("../View/App/vendor/create"));
const VendorDetails = lazy(() => import("../View/App/vendor/detail"));

const MasschannelPartner = lazy(() => import("../View/App/channelpartner/massChannelPartner"));
const ListchannelPartnerApp = lazy(() => import("../View/App/channelpartner/list"));
const CreatechannelPartner = lazy(() => import("../View/App/channelpartner/create"));
const ChannelPartnerDetails = lazy(() => import("../View/App/channelpartner/detail"));

const ExcelComponent = lazy(() => import("../Components/excel/index"));
const StaticModuleExcel = lazy(() => import("../Components/excel/StaticModuleExcel"));
const WorkFlow = lazy(() => import("../View/App/automation/workflow"));
const DetailRule = lazy(() => import("../View/App/automation/workflow/detailRule"));
const AutomationAction = lazy(() => import("../View/App/automation/email-notification"));
const EditDetailRule = lazy(() => import("../View/App/automation/workflow/editDetailRule"));
const AssignmentRules = lazy(() => import("../View/App/automation/asssignment-rules"));
const InventoryConnectionList = lazy(() => import("../Layouts/app/inventory/connectionTable"));
const Pipeline = lazy(() => import("../View/App/pipeline"));
const HomeCustomization = lazy(() => import("../View/App/homeCustomization"));
const HomeCustomizationManage = lazy(() => import("../View/App/homeCustomization/manage"));
const CaseEscalation = lazy(() => import("../View/App/caseEscalation"));
const EditCase = lazy(() => import("../View/App/caseEscalation/EditCase"));
const ApprovalProcess = lazy(() => import("../View/App/approvalProcess"));
const ApprovalProcessManage = lazy(() => import("../View/App/approvalProcess/manage"));

// import EditDetailRule from "../View/App/automation/workflow/editDetailRule";

const Main = lazy(() => import("./main"));
const Registerpage = lazy(() => import("../View/Auth/register"));
const Loginpage = lazy(() => import("../View/Auth/login"));
const ForgotPassword = lazy(() => import("../View/Auth/forgot-password"));
const ErrorPage404 = lazy(() => import("../View/Pages/404page"));
const DashboardView = lazy(() => import("../View/App/dashboard"));
const ChangePassword = lazy(() => import("../View/Auth/change-password"));
const EmailVerificationLayout = lazy(() =>
  import("../Auth/email-verification")
);
const APIDocView = lazy(() => import("../View/App/apiDoc"));
const MassTasks = lazy(() => import("../View/tasks/massTasks"));
const MassLeads = lazy(() => import("../View/leads/massLeads"));
const MassContacts = lazy(() => import("../View/contacts/massContact"));
const MassAccount = lazy(() => import("../View/accounts/massAccount"));
const MassOpportunity = lazy(() =>
  import("../View/opportunities/massOpportunity")
);
const AppUserProfileEdit = lazy(() => import("../View/App/user/edit"));
const UserProfile = lazy(() => import("../View/App/user/profile"));
const DataBackup = lazy(() => import("../View/App/dataBackup/index"));
const RemoveSample = lazy(() => import("../View/App/removeSample/index"));
const ExportData = lazy(() => import("../View/App/export/index"));
const Telephony = lazy(() => import("../View/App/telephony/index"));
const Company = lazy(() => import("../View/App/company"));
const Modules = lazy(() => import("../View/App/modules"));
const FormLayoutByModule = lazy(() => import("../View/App/modules/formLayoutByModule"));
const CreateModule = lazy(() => import("../View/App/modules/create"));
const EditModule = lazy(() => import("../View/App/modules/edit"));
const ListOfUser = lazy(() => import("../View/userlist/list"));
const DealMeetingView = lazy(() => import("../View/App/deal-meeting"));
const SecurityProfiles = lazy(() => import("../View/securityprofile/list"));
const ServiceControl = lazy(() => import("../View/App/serviceControl"));
const Setup = lazy(() => import("../View/setup/list"));
const LoginLogs = lazy(() => import("../View/loginLogs/list"));
const InventoryApp = lazy(() => import("../View/App/inventory/list"));

const MassInventory = lazy(() => import("../View/App/inventory/massInventory"));
const CreateInventory = lazy(() => import("../View/App/inventory/create"));
const InventoryDetails = lazy(() => import("../View/App/inventory/detail"));
const NoteApp = lazy(() => import("../View/App/notes/list"));
const MassNote = lazy(() => import("../View/App/notes/massNote"));
const CreateNote = lazy(() => import("../View/App/notes/create"));
const NoteDetails = lazy(() => import("../View/App/notes/detail"));
const MacroCreate = lazy(() => import("../View/App/macro/index"));
const MacroManage = lazy(() => import("../View/App/macro/manage-macro"));
const Compliance = lazy(() => import("../View/App/compliance/index"));
const TerritoryManagement = lazy(() => import("../View/App/territoryManagement"));
const AuditLog = lazy(() => import("../View/App/auditLog"));
const GoogleAccounts = lazy(() => import("../View/GoogleAccounts/GoogleAccounts"));
const IpanelApp = lazy(() => import("../View/App/ipanelApp"));
const Facebook = lazy(() => import("../View/GoogleAccounts/Facebook"));
const FacebookLeads = lazy(() =>
  import("../View/GoogleAccounts/FacebookLeads")
);
const Google = lazy(() => import("../View/GoogleAccounts/Google"));
const CanvasViewStyle = lazy(() => import("../View/App/canvasViewStyle"));
const ChatApp = lazy(() => import("../View/App/chat"));
const TrustedDomain = lazy(() => import("../View/App/trustedDomain"));
const KanbanView = lazy(() => import("../View/kanbanView"));
const AutoResponders = lazy(() => import("../View/settings/autoResponders"));
const AutoRespondersCreate = lazy(() =>
  import("../View/settings/autoRespondersCreate")
);
const AutoRespondersEdit = lazy(() =>
  import("../View/settings/autoRespondersEdit")
);

const SheetViewList = lazy(() => import("../View/App/sheetview"));
//
const MassSmss = lazy(() => import("../View/Sms/massSms"));
const MassWhatsappTemplates = lazy(() =>
  import("../View/WhatsappTemplate/massWhatsappTemplate")
);

const ReportLanding = lazy(() => import("../View/App/reports"));
const ReportCreationBoard = lazy(() => import("../View/App/reports/create"));
const ReportEditBoard = lazy(() => import("../View/App/reports/update"));
const GenrateReport = lazy(() => import("../View/App/reports/genrateReport"));
const SupportContact = lazy(() => import("../View/Pages/support-contact"));

const AllRoutes = () => (
  <Suspense
    fallback={
      <div className="h-screen w-full overflow-hidden flex justify-center items-center">
        Loading ...
      </div>
    }
  >
    <Routes>
      <Route path="*" element={<ErrorPage404 />} />
      {/* ============== Pages =================  */}
      <Route path="/" element={<Loginpage />} />
      <Route path="/crm/login" element={<Loginpage />} />
      <Route path="/crm/universal-login" element={<UniversalLogin />} />
      <Route path="/crm/support-contact" element={<SupportContact />} />
      <Route path="/crm/register" element={<Registerpage />} />
      <Route path="/crm/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route
        path="/email-verification/:id"
        element={<EmailVerificationLayout />}
      />

      {/* ============== Protected routes */}
      <Route path="/crm" element={<Main moduleType="leads" />}>
        <Route path="/crm/leads" element={<LeadList />} />
        <Route path="/crm/create-leads" element={<CreateLead />} />
        <Route path="/crm/lead-details/:id" element={<LeadsDetail />} />
        <Route path="/crm/lead-clone/:id" element={<LeadsClone />} />
        <Route path="/crm/leads/mass-module" element={<MassLeads />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="contacts" />}>
        <Route path="/crm/contacts/mass-module" element={<MassContacts />} />
        <Route path="/crm/contacts" element={<ContactList />} />
        <Route path="/crm/create-contacts" element={<CreateContacts />} />
        <Route path="/crm/contacts-details/:id" element={<ContactDetail />} />
        <Route path="/crm/contacts-clone/:id" element={<ContactsClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="accounts" />}>
        <Route path="/crm/account/mass-module" element={<MassAccount />} />
        <Route path="/crm/accounts" element={<AccountList />} />
        <Route path="/crm/create-accounts" element={<CreateAccounts />} />
        <Route path="/crm/account-details/:id" element={<AccountsDetail />} />
        <Route path="/crm/account-clone/:id" element={<AccountsClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="opportunities" />}>
        <Route
          path="/crm/opportunities/mass-module"
          element={<MassOpportunity />}
        />
        <Route path="/crm/opportunities" element={<OpportunitiesList />} />
        <Route
          path="/crm/create-opportunities"
          element={<CreateOpportunities />}
        />
        <Route
          path="/crm/opportunities-details/:id"
          element={<OpportunitiesDetail />}
        />
        <Route
          path="/crm/opportunities-clone/:id"
          element={<OpportunitiesClone />}
        />
      </Route>

      <Route path="/crm" element={<Main moduleType="tasks" />}>
        <Route path="/crm/tasks/mass-module" element={<MassTasks />} />
        <Route path="/crm/tasks" element={<TaskList />} />
        <Route path="/crm/create-tasks" element={<CreateTasks />} />
        <Route path="/crm/task-details/:id" element={<TasksDetail />} />
        <Route path="/crm/task-clone/:id" element={<TasksClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="Calls" />}>
        <Route path="/crm/call/mass-module" element={<MassCall />} />
        <Route path="/crm/call" element={<CallList />} />
        <Route path="/crm/create-call" element={<CreateCall />} />
        <Route path="/crm/call-details/:id" element={<CallDetails />} />
        <Route path="/crm/call-clone/:id" element={<CallClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="meeting" />}>
        <Route path="/crm/meeting/mass-module" element={<MassMeetings />} />
        <Route path="/crm/meeting" element={<MeetingList />} />
        <Route path="/crm/create-meeting" element={<CreateMeeting />} />
        <Route path="/crm/meeting-details/:id" element={<MeetingDetail />} />
        <Route path="/crm/meeting-clone/:id" element={<MeetingClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="vendor" />}>
        <Route path="/crm/vendor/mass-module" element={<MassVendor />} />
        <Route path="/crm/vendor" element={<ListVendorApp />} />
        <Route path="/crm/create-vendor" element={<CreateVendor />} />
        <Route path="/crm/vendor-details/:id" element={<VendorDetails />} />
        <Route path="/crm/vendor-clone/:id" element={<VendorClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="channelPartner" />}>
        <Route path="/crm/channelPartner/mass-module" element={<MasschannelPartner />} />
        <Route path="/crm/channelPartner" element={<ListchannelPartnerApp />} />
        <Route path="/crm/create-channelPartner" element={<CreatechannelPartner />} />
        <Route path="/crm/channelPartner-details/:id" element={<ChannelPartnerDetails />} />
        <Route path="/crm/channelPartner-clone/:id" element={<ChannelPartnerClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="saleOrders" />}>
        <Route
          path="/crm/saleOrder/saleOrder-canvas-list"
          element={<CanvasListofSaleOrder />}
        />
        <Route path="/crm/saleorder/mass-module" element={<MassSaleOrder />} />
        <Route path="/crm/saleorder" element={<SaleOrderList />} />
        <Route path="/crm/create-saleOrder" element={<CreateSalesOrder />} />
        <Route
          path="/crm/saleOrder-details/:id"
          element={<SaleOrderDetail />}
        />
        <Route path="/crm/saleOrder-clone/:id" element={<SaleOrderClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="purchaseOrders" />}>
        <Route
          path="/crm/purchaseOrders/purcheseOrder-canvas-list"
          element={<CanvasListofPurchaseOrder />}
        />
        <Route
          path="/crm/purchaseorder/mass-module"
          element={<MassPurchaseOrder />}
        />

        <Route
          path="/crm/purchaseOrder-details/:id"
          element={<PurchaseOrderDetail />}
        />
        <Route
          path="/crm/purchaseOrder-clone/:id"
          element={<PurchaseOrderClone />}
        />
        <Route path="/crm/purchaseorder" element={<PurchaseOrderList />} />

        <Route
          path="/crm/create-purchaseorder"
          element={<CreatepurchaseOrder />}
        />
      </Route>

      <Route path="/crm" element={<Main moduleType="invoices" />}>
        <Route
          path="/crm/invoices/invoices-canvas-list"
          element={<CanvasListofInvoice />}
        />
        <Route path="/crm/invoices/mass-module" element={<MassInvoice />} />
        <Route path="/crm/invoices" element={<InovoiceList />} />
        <Route path="/crm/invoices-details/:id" element={<InvoicesDetail />} />
        <Route path="/crm/invoices-clone/:id" element={<InvoiceClone />} />
        <Route path="/crm/create-invoice" element={<CreateinvoiceOrder />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="quotes" />}>
        <Route
          path="/crm/quotes/quotes-canvas-list"
          element={<CanvasListofQuotes />}
        />
        <Route path="/crm/quotes/mass-module" element={<MassQuotes />} />
        <Route path="/crm/quotes" element={<QuotesList />} />
        <Route path="/crm/create-quotes" element={<CreateQuotes />} />
        <Route path="/crm/quotes-details/:id" element={<QuotesDetail />} />
        <Route path="/crm/quotes-clone/:id" element={<QuotesClone />} />
      </Route>
      <Route path="/crm" element={<Main moduleType="whatsapp" />}>
        <Route
          path="/crm/whatsapp/mass-module"
          element={<MassWhatsappTemplates />}
        />

        <Route path="/crm/whatsapp" element={<WhatsappTemplateList />} />
        <Route
          path="/crm/create-whatsapp"
          element={<CreateWhatsappTemplate />}
        />
        <Route
          path="/crm/whatsapp-details/:id"
          element={<WhatsappTemplateDetail />}
        />
        <Route
          path="/crm/whatsapp-clone/:id"
          element={<WhatsappTemplateClone />}
        />
      </Route>
      {/* sms */}
      <Route path="/crm" element={<Main moduleType="" />}>
        <Route path="/crm/genrate/report/:reportId" element={<GenrateReport />} />
        <Route path="/crm/report/edit/:reportId" element={<ReportEditBoard />} />
        <Route path="/crm/create/report" element={<ReportCreationBoard />} />
        <Route path="/crm/reports" element={<ReportLanding />} />
        <Route path="/crm/sheetview" element={<SheetViewList />} />
        <Route path="/crm/sms/mass-module" element={<MassSmss />} />
        <Route path="/crm/sms" element={<SmsList />} />
        <Route path="/crm/create-sms" element={<CreateSms />} />
        <Route path="/crm/sms-details/:id" element={<SmsDetail />} />
        <Route path="/crm/sms-clone/:id" element={<SmsClone />} />
      </Route>

      <Route path="/crm" element={<Main moduleType="" />}>
        <Route path="/crm/modules" element={<Modules />} />
        <Route path="/crm/form-layout-by-module/:modulename" element={<FormLayoutByModule />} />
      </Route>

      <Route path="/crm" element={<Main />}>
        <Route
          path="/crm/canvas/view/:modulename"
          element={<CanvasViewStyle />}
        />
        <Route path="/crm/ipanel" element={<IpanelApp />} />
        <Route path="/crm/chat" element={<ChatApp />} />
        <Route path="/crm/notes/mass-module" element={<MassNote />} />
        <Route path="/crm/notes" element={<NoteApp />} />
        <Route path="/crm/note-detail/:id" element={<NoteDetails />} />
        <Route path="/crm/create-note" element={<CreateNote />} />

        <Route path="/crm/inventory/mass-module" element={<MassInventory />} />
        <Route path="/crm/inventory" element={<InventoryApp />} />
        <Route
          path="/crm/inventory/connectionId/:id"
          element={<InventoryConnectionList />}
        />
        <Route
          path="/crm/inventory-detail/:id"
          element={<InventoryDetails />}
        />
        <Route path="/crm/create-inventory" element={<CreateInventory />} />
        <Route
          path="/crm/service-control/:servicename"
          element={<ServiceControl />}
        />
        {/* <Route
          path="/crm/service-control/:servicename"
          element={<ServiceControl />}
        /> */}
        <Route path="/crm/api-doc" element={<APIDocView />} />
        <Route path="/crm/dashboard" element={<DashboardView />} />
        <Route path="/crm/RoleList" element={<RoleList />} />
        <Route path="/crm/change-password" element={<ChangePassword />} />
        <Route path="/crm/edit-profile" element={<AppUserProfileEdit />} />
        <Route path="/crm/profile" element={<UserProfile />} />

        <Route path="/crm/sitevisit/mass-module" element={<MassSiteVisit />} />

        <Route path="/crm/sitevisit" element={<SiteVisitList />} />
        <Route path="/crm/create-sitevisit" element={<CreateSiteVisit />} />
        <Route
          path="/crm/sitevisit-details/:id"
          element={<SiteVisitDetail />}
        />
        <Route path="/crm/email" element={<EmailList />} />
        <Route path="/crm/create-email" element={<CreateEmail />} />
        <Route
          path="/crm/email-details/:id"
          element={<EmailTemplateDetail />}
        />
        <Route path="/crm/email-clone/:id" element={<EmailClone />} />

        {/* <Route path="/crm/company" element={<Company />} /> */}
        <Route path="/crm/createModule" element={<CreateModule />} />
        <Route path="/crm/module/:moduleId" element={<EditModule />} />
        <Route path="/crm/useList" element={<ListOfUser />} />

        <Route path="/crm/security-control" element={<SecurityProfiles />} />
        <Route
          path="/crm/security-control/:id"
          element={<EditSecurityProfile />}
        />

        <Route path="*" element={<ErrorPage404 />} />

        <Route path="/crm/google-calander" element={<DealMeetingView />} />

        <Route path="/crm/excel" element={<ExcelComponent />} />

        <Route path="/crm/field-map" element={<FieldMap />} />
        <Route path="/crm/setup" element={<Setup />} />
        <Route path="/crm/login-logs" element={<LoginLogs />} />
        {/* // */}
        <Route path="/crm/adds_accounts" element={<GoogleAccounts />} />
        <Route path="/crm/facebook_adds" element={<Facebook />} />
        <Route path="/crm/facebook_leads/:id" element={<FacebookLeads />} />
        <Route path="/crm/google_adds" element={<Google />} />
        <Route path="/crm/macro" element={<MacroCreate />} />
        <Route path="/crm/macro/manage-macro" element={<MacroManage />} />

        <Route path="/crm/data-backup" element={<DataBackup />} />
        <Route path="/crm/remove-sample-data" element={<RemoveSample />} />
        <Route path="/crm/export-data" element={<ExportData />} />

        <Route path="/crm/telephony" element={<Telephony />} />
        <Route path="/crm/compliance" element={<Compliance />} />
        <Route
          path="/crm/terriory-managements"
          element={<TerritoryManagement />}
        />
        <Route path="/crm/add-activities" element={<AuditLog />} />
        <Route path="/crm/trusted-domain" element={<TrustedDomain />} />
        <Route path="/crm/kanban-view" element={<KanbanView />} />
        <Route path="/crm/unauthorized" element={<UnAuthorized />} />
        <Route path="/crm/import" element={<ExcelComponent />} />
        <Route path="/crm/imports" element={<StaticModuleExcel />} />
        <Route path="/crm/workflow-rules" element={<WorkFlow />} />
        <Route path="/crm/workflow-rules/:id" element={<EditDetailRule />} />
        <Route path="/crm/workflow-rules/create" element={<DetailRule />} />
        <Route path="/crm/workflow-actions" element={<AutomationAction />} />
        <Route path="/crm/assignment-rules" element={<AssignmentRules />} />

        <Route
          path="/crm/modules/auto-responders"
          element={<AutoResponders />}
        />
        <Route
          path="/crm/modules/auto-responders/create"
          element={<AutoRespondersCreate />}
        />
        <Route
          path="/crm/modules/auto-responders/edit/:id"
          element={<AutoRespondersEdit />}
        />
        <Route path="/crm/pipeline" element={<Pipeline />} />
        <Route path="/crm/case-escalation-rules" element={<CaseEscalation />} />
        <Route path="/crm/case-escalation-rules/:id" element={<EditCase />} />

        <Route path="/crm/excel" element={<ExcelComponent />} />

        <Route path="/crm/approval-process" element={<ApprovalProcess />} />
        <Route
          path="/crm/approval-process/manage"
          element={<ApprovalProcessManage />}
        />

        <Route path="/crm/home-customization" element={<HomeCustomization />} />
        <Route
          path="/crm/home-customization/manage"
          element={<HomeCustomizationManage />}
        />
      </Route>
    </Routes>
  </Suspense>
);

export default AllRoutes;
