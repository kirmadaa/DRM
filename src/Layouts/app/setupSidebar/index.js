import React, { useEffect, useState } from "react";
import { SmallLeftArrow } from "../../../assets/svgIcons";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "react-feather/dist";
import AutoComplete from "../../../Components/autoComplete";
// import { TECollapse } from "tw-elements-react";

const getUserId = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData;
};
const sidebarList = [
  {
    label: "General",
    show: false,
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
      },
    ],
  },
  {
    label: "Users and Control",
    show: false,
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
      },
    ],
  },
  {
    label: "BRD Directory",
    show: false,
    subList: [
      {
        label: "Single Sign-On(SAML)",
        link: "/crm/login-logs",
      },
    ],
  },
  {
    label: "Channels",
    show: false,
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
      },
    ],
  },
  {
    label: "Customization",
    show: false,
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
    show: false,
    subList: [
      {
        label: "Workflow Rules",
        link: "/crm/workflow-rules",
      },
      {
        label: "Action",
        link: "/crm/workflow-actions",
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
    show: false,
    subList: [
      {
        label: "Blueprint",
        link: "",
      },
      {
        label: "Approval Processes",
        link: "/crm/approval-process",
      },
      {
        label: "Command Center",
        link: "",
      },
    ],
  },
  {
    label: "Data Administration",
    show: false,
    subList: [
      // {
      //   label: "Import",
      //   link: "",
      // },
      {
        label: "Export",
        link: "/crm/export-data",
      },
      {
        label: "Data Backup",
        link: "/crm/data-backup",
      },
      {
        label: "Remove Sample Data",
        link: "/crm/remove-sample-data",
      },
      {
        label: "Add Activities",
        link: "/crm/add-activities",
      },
    ],
  },
];

const userControl = {
  label: "Users and Control",
  show: false,
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
    },
  ],
};


const SetupSidebar = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [openListId, setOpenListId] = useState("");
  const [query, setQuery] = useState("");
  const [accordianData, setAccordianData] = useState(sidebarList);
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    let path = window.location;
    getCurrentPath(path?.pathname)
  }, []);

  const getCurrentPath = (path) => {
    accordianData.map((item, index) => {
      item?.subList.map((itemP, indexP) => {
        if (path === itemP.link) {
          accordianData[index].show = true
          setAccordianData([...accordianData]);
          // console.log("itemP", item, itemP);
        }
      })
    })
  }
  const handleopen = (routes) => {
    // console.log("routes==>", routes);
    navigator(routes);
  };
  const handleListId = (item, index) => {
    // console.log("===>11===>", accordianData, item, index);
    accordianData[index].show = item.show ? false : true
    setAccordianData([...accordianData]);
  };
  //const handleListId = (item, index) => {

  // if (openListId == id) {
  //   setOpenListId(0);
  // } else {
  //   setOpenListId(id);
  // }
  //};
  // useEffect(() => {
  //   alert(openListId)
  // }, [openListId])
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
    setSearchData([...updatedList]);
  };

  return (
    <>
      <div className=" rounded-2xl bg-white h-full p-6 w-[270px] min-w-[270px]">
        <div className="font-semibold text-base text-[#191242] mb-4">Setup</div>

        <div className="w-[100%]">
          <AutoComplete
            setSearchData={setSearchData}
            query={query}
            setQuery={setQuery}
            handleChange={handleChange}
            showData={searchData}
            handleopen={handleopen}
          />
        </div>
        <div className="py-6">
          <div className="mb-2">
            {/* {getUserId()?.profile === "Administrator" && (
            <div className="rounded-2xl bg-white overflow-hidden">
              <div>
                <div
                  className="p-4 cursor-pointer flex items-center gap-2 justify-between text-primary font-semibold text-base border-b-[1.5px] border-gray-300"
                  onClick={() => {
                    handleListId("userControl");
                  }}
                >
                  {userControl.label}sdfds
                  {openListId === "userControl" ? (
                    <ChevronDown size={16} />
                  ) : (
                    <SmallLeftArrow />
                  )}
                </div>
                {userControl?.subList.map(
                  (subItem, subIndex) =>
                    openListId === "userControl" && (
                      <ul key={subIndex}>
                        <li
                          onClick={() => handleopen(subItem?.link || "")}
                          className={`font-normal text-base text-gray-600 pl-10 py-2 pr-2 cursor-pointer hover:text-primary ${
                            location.pathname === subItem?.link
                              ? "text-primary"
                              : ""
                          }`}
                        >
                          {subItem.label}
                        </li>
                      </ul>
                    )
                )}
              </div>
            </div>
          )} */}
            {accordianData.map((item, index) => {
              // if (
              //   item?.show &&
              //   getUserId()?.profile === "Administrator"
              // ) {
              //   return (
              //     <div
              //       className="rounded-2xl bg-white overflow-hidden target:text-pink-700"
              //     >
              //       <div>
              //         <div
              //           className="p-4 cursor-pointer flex items-center gap-2 justify-between text-primary font-semibold text-base border-b-[1.5px] border-gray-300 target:text-pink-700"
              //           onClick={() => {
              //             handleListId(item, index);
              //             // toggleShow({ ...show, collapse1: !show.collapse1 })

              //           }}
              //         >
              //           {userControl.label}
              //           {openListId === "userControl" ? (
              //             <ChevronDown size={16} />
              //           ) : (
              //             <SmallLeftArrow />
              //           )}
              //         </div>
              //         {openListId === "userControl" && userControl?.subList.map(
              //           (subItem, subIndex) =>
              //             openListId === "userControl" && (
              //               <ul key={subIndex}>
              //                 <li
              //                   onClick={() => handleopen(subItem?.link || "")}
              //                   className={`font-normal text-base text-gray-600 pl-10 py-2 pr-2 cursor-pointer hover:text-primary ${location.pathname === subItem?.link
              //                     ? "text-primary"
              //                     : "text-secondary"
              //                     }`}
              //                 >
              //                   {subItem.label}
              //                 </li>
              //               </ul>
              //             )
              //         )}
              //       </div>
              //     </div>
              //   );
              // } else {
              return (
                <div key={String(index)}>
                  <div
                    className="p-4 cursor-pointer flex items-center gap-2 justify-between text-primary font-semibold text-base border-b-[1.5px] border-gray-300"
                    onClick={() => {
                      handleListId(item, index);

                    }}
                  >
                    {item.label}
                    {item.show ? (
                      <ChevronDown size={16} />
                    ) : (
                      <SmallLeftArrow />
                    )}
                  </div>
                  {item.show && item?.subList.map(
                    (subItem, subIndex) =>
                    (
                      <ul key={String(subIndex)}>
                        <li
                          onClick={() => handleopen(subItem?.link || "")}
                          className={`font-normal text-base text-gray-600 pl-2 py-2 mx-2 pr-2 cursor-pointer hover:text-primary ${location.pathname === subItem?.link
                            ? "text-primary leading-9 bg-hoverColorPrimary	color-white"
                            : ""
                            }`}
                        >
                          {subItem.label}
                        </li>
                      </ul>
                    )
                  )}
                </div>
              )
              // }
            }
            )}
          </div>
          {/* <div
            className="p-4 cursor-pointer flex items-center gap-2 justify-between text-primary font-semibold text-base border-b-[1.5px] border-gray-300"
            onClick={() => {
              setGeneralOpen(!generalOpen);
            }}
          >
            General
            <SmallLeftArrow />
          </div>
          {generalOpen == true && (
            <ul>
              <li
                onClick={() => handleopen("/crm/profile")}
                className={`font-semibold text-base text-gray-600 pl-10 py-2 pr-2 cursor-pointer hover:text-primary ${
                  location.pathname === "/crm/profile" ? "text-primary" : ""
                }`}
              >
                Personal settings
              </li>
              <li
                onClick={() => handleopen("/crm/company")}
                className={`font-semibold text-base text-gray-600 pl-10 py-2 cursor-pointer hover:text-primary pr-2 ${
                  location.pathname === "/crm/company" ? "text-primary" : ""
                }`}
              >
                Company Details
              </li>
              <li className="font-semibold text-base text-gray-600 pl-10 py-2 pr-2 cursor-pointer hover:text-primary">
                Calendar Booking
              </li>
              <li className="font-semibold text-base text-gray-600 pl-10 py-2 pr-2 cursor-pointer hover:text-primary">
                QT
              </li>
            </ul>
          )}
        </div>
        <div className="mb-2">
          <div className="p-4 flex items-center gap-2 justify-between text-gray-700 font-semibold text-base border-b-[1.5px] border-gray-300">
            Users and Control
            <SmallLeftArrow />
          </div>
        </div>
        <div className="mb-2">
          <div className="p-4 flex items-center gap-2 justify-between text-gray-700 font-semibold text-base border-b-[1.5px] border-gray-300">
            BRD Directory
            <SmallLeftArrow />
          </div>
        </div>
        <div className="mb-2">
          <div className="p-4 flex items-center gap-2 justify-between text-gray-700 font-semibold text-base border-b-[1.5px] border-gray-300">
            Channels
            <SmallLeftArrow />
          </div>
        </div>
        <div className="mb-2">
          <div className="p-4 flex items-center gap-2 justify-between text-gray-700 font-semibold text-base border-b-[1.5px] border-gray-300">
            Customization
            <SmallLeftArrow />
          </div>
        </div>
        <div className="mb-2">
          <div className="p-4 flex items-center gap-2 justify-between text-gray-700 font-semibold text-base border-b-[1.5px] border-gray-300">
            Automation
            <SmallLeftArrow />
          </div>
        </div>
        <div className="mb-2">
          <div className="p-4 flex items-center gap-2 justify-between text-gray-700 font-semibold text-base border-b-[1.5px] border-gray-300">
            Process Management
            <SmallLeftArrow />
          </div>
        </div>
        <div className="mb-2">
          <div
            onClick={() => {
              if (openListId == 8) {
                setOpenListId(0);
              } else {
                setOpenListId(8);
              }
            }}
            className="p-4 flex items-center gap-2 justify-between text-gray-700 font-semibold text-base border-b-[1.5px] border-gray-300"
          >
            Data Administration
            <SmallLeftArrow />
          </div>
          {openListId == 8 && (
            <ul>
              <li
                onClick={() => handleopen("/crm/export-data")}
                className={`font-semibold text-base text-gray-600 pl-10 py-2 pr-2 cursor-pointer hover:text-primary ${
                  location.pathname === "/crm/export-data" ? "text-primary" : ""
                }`}
              >
                Export
              </li>
              <li
                onClick={() => handleopen("/crm/data-backup")}
                className={`font-semibold text-base text-gray-600 pl-10 py-2 cursor-pointer hover:text-primary pr-2 ${
                  location.pathname === "/crm/data-backup" ? "text-primary" : ""
                }`}
              >
                Data Backup
              </li>
              <li
                onClick={() => handleopen("/crm/remove-sample-data")}
                className={`font-semibold text-base text-gray-600 pl-10 py-2 cursor-pointer hover:text-primary pr-2 ${
                  location.pathname === "Remove sample Data"
                    ? "text-primary"
                    : ""
                }`}
              >
                Remove sample Data
              </li>
            </ul>
          )}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default SetupSidebar;
