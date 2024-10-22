import { Edit, Eye, LogIn } from "react-feather";

const MenuList = [
  // {
  //   path: "/crm/useList",
  //   icon: <Eye />,
  //   title: "User List",
  // },
  {
    path: "/crm/profile",
    icon: <Edit size={18} />,
    title: "User Profile",
  },
  // {
  //   path: "/crm/company",
  //   icon: <Home size={18} />,
  //   title: "Company",
  // },
  // {
  //   path: "/crm/RoleList",
  //   icon: <UserPlus size={18} />,
  //   title: "Add Roles",
  // },
  // {
  //   path: "/crm/service-control/whatsapp",
  //   icon: <i className="bx bxl-whatsapp mr-2 text-xl" />,
  //   title: "WhatsApp Service",
  // },
  // {
  //   path: "/crm/service-control/email",
  //   icon: <i className="bx bx-envelope mr-2 text-xl" />,
  //   title: "Email Service",
  // },
  // {
  //   path: "/crm/service-control/sms",
  //   icon: <i className="bx bx-message-dots mr-2 text-xl" />,
  //   title: "SMS Service",
  // },
  {
    path: "/crm/change-password",
    icon: <Eye size={18} />,
    title: "Change Password",
  },
  // {
  //   path: "/crm/modules",
  //   icon: <Settings size={18} />,
  //   title: "Setting",
  // },
  // {
  //   path: "/crm/security-control",
  //   icon: <Settings size={18} />,
  //   title: "Security control",
  // },
  // {
  //   path: "/crm/field-map",
  //   icon: <Settings size={18} />,
  //   title: "Field Map",
  // },
  // {
  //   path: "/crm/setup",
  //   icon: <Settings size={18} />,
  //   title: "Setup",
  // },
  // {
  //   path: "/crm/login-logs",
  //   icon: <Settings size={18} />,
  //   title: "Login logs",
  // },
  {
    path: "",
    icon: <LogIn size={18} />,
    title: "Logout",
  },
];

export default MenuList;
