import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoComplete from "../../../../Components/autoComplete";

const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData

}
const sidebarList = [
  {
    label: "General",
    subList: [
      // {
      //   label: "Personal settings",
      //   link: "/crm/profile",
      // },
      // {
      //   label: "Company Details",
      //   link: "/crm/company",
      // },
      {
        label: "Calendar Booking",
        link: "/crm/google-calander",
      }
    ],
  },
  {
    label: "Users and Control",
    subList: [
      {
        label: "Users",
        link: "/crm/useList",
      },
      {
        label: "Security Control",
        link: "/crm/security-control",
      },
      {
        label: "Compliance Settings",
        link: "/crm/compliance",
      },
      {
        label: "Territory Management",
        link: "/crm/terriory-managements",
      }
    ],
  },
  {
    label: "BRD Directory",
    subList: [
      {
        label: "Single Sign-On(SAML)",
        link: "/crm/login-logs",
      }
    ],
  },
  {
    label: "Channels",
    subList: [
      {
        label: "Telephony",
        link: "/crm/telephony",
      },
      {
        label: "Business Messaging",
        link: "/crm/service-control/whatsapp",
      },
      {
        label: "Email Service",
        link: "/crm/service-control/email",
      },
      {
        label: "Notification SMS",
        link: "/crm/service-control/sms",
      },
      {
        label: "Social",
        link: "/crm/adds_accounts",
      },
      {
        label: "Chat",
        link: "/crm/chat",
      }
    ],
  },
  {
    label: "Customization",
    subList: [
      {
        label: "Modules and Fields",
        link: "/crm/modules",
      },
      {
        label: "Field Map",
        link: "/crm/field-map",
      },
      {
        label: "Pipelines",
        link: "/crm/pipeline",
      },
      {
        label: "Customize Home Page",
        link: "/crm/home-customization",
      },
    ],
  },
  {
    label: "Automation",
    subList: [
      {
        label: "Workflow Rules",
        link: "/crm/workflow-rules",
      },
      {
        label: "Assignment Rules",
        link: "/crm/assignment-rules",
      },
      {
        label: "Case Escalation Rules",
        link: "/crm/case-escalation-rules",
      },
    ],
  },
  {
    label: "Process Management",
    subList: [
      {
        label: "Approval Processes",
        link: "/crm/approval-process",
      }
    ],
  },
  {
    label: "Data Administration",
    subList: [
      {
        label: "Export",
        link: "/crm/export-data",
      },
      {
        label: "Data Backup",
        link: "/crm/data-backup",
      },
      {
        label: "Add Activities",
        link: "/crm/add-activities",
      },
    ],
  },
];


const SetupList = () => {
  const navigator = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [query, setQuery] = useState("");

  const [searchData, setSearchData] = useState([]);
  const handleopen = (routes) => {
    navigator(routes);
    setActiveItem(routes);
  };

  const handleChange = (e) => {
    const querys = e.target.value;
    var updatedList = [...sidebarList];
    updatedList = updatedList
      .map((item) => {
        return item.subList.filter((ele) => {
          return ele.label
            ?.toLowerCase()
            ?.replace(/\s+/g, "")
            ?.includes(querys.toLowerCase().replace(/\s+/g, ""));
          // return ele.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
      })
      .filter((ele) => ele.length !== 0)
      .flat();
    setQuery(e.target.value);
    setSearchData([...updatedList]);
  };

  return (
    <div
      style={{ minHeight: "500px" }}
      className="rounded table-responsive mt-3 pb-4 mx-7"
    >
      <div className="flex items-center gap-3 justify-between py-6">
        <div className="relative flex justify-start items-center">
          <div className="font-medium text-lg mr-4">Setup</div>
          <AutoComplete
            setSearchData={setSearchData}
            query={query}
            setQuery={setQuery}
            handleChange={handleChange}
            showData={searchData}
            handleopen={handleopen}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* {getUserId()?.profile === 'Administrator' && <div className="rounded-2xl bg-white overflow-hidden">
          <div className="bg-gray-200 p-4 font-semibold text-sm">
            {" "}
            {userControl?.label}
          </div>
          {userControl?.subList.map((subItem, subIndex) => (
            <ul key={subIndex}>
              <li
                onClick={() => handleopen(subItem?.link || "")}
                // onClick={() => handleopen("/crm/profile")}
                className={`py-5 px-4 font-normal text-sm hover:text-primary cursor-pointer ${activeItem === "/crm/profile" ? "active" : ""
                  }`}
              >
                {subItem.label}
              </li>
            </ul>
          ))}
        </div>} */}
        {sidebarList?.map((item, index) => (
          <div key={index} className="rounded-2xl bg-white overflow-hidden">
            <div className="bg-gray-200 p-4 font-semibold text-sm">
              {" "}
              {item.label}
            </div>
            {item?.subList.map((subItem, subIndex) => (
              <ul key={subIndex}>
                <li
                  onClick={() => handleopen(subItem?.link || "")}
                  // onClick={() => handleopen("/crm/profile")}
                  className={`py-5 px-4 font-normal text-sm hover:text-primary cursor-pointer ${activeItem === "/crm/profile" ? "active" : ""
                    }`}
                >
                  {subItem.label}
                </li>
              </ul>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
};

export default SetupList;
