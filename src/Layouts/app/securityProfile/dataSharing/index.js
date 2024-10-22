import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GET_DATA_SHARING_PERMISSIONS,
  UPDATE_DATA_SHARING_PERMISSIONS,
} from "../../../../Redux/actions/security-control";
import { toast } from "react-toastify";
import RuleSharing from "./ruleSharing";
import { GET_GROUP_LIST } from "../../../../Redux/actions/userList";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";
import { SET_LOADER } from "../../../../Redux/actions/user";
import PageLoader from "../../../../Components/pageLoader";


export default function DataSharing() {
  let dispatch = useDispatch();
  const roles = useSelector((store) => store.role?.roledata);
  const groups = useSelector((state) => state?.profile?.groupList);

  const [data, setData] = useState(permissions);
  const [editMode, setEditMode] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(true);

  // const loading = useSelector((state) => state.user.loading);
  const [loading, setLoading] = useState(false);

  const reloadAllData = () => {
    setReloadComponent(false);
    setReloadComponent(true);
  };

  const saveDataSharingModule = async () => {
    setLoading(true);
    await dispatch(UPDATE_DATA_SHARING_PERMISSIONS({ data })).then(
      (response) => {
        if (response?.status === 200) {
          dispatch(GET_DATA_SHARING_PERMISSIONS()).then((response) => {
            console.log(response)
            if (response?.status === 200) {
              setData(response?.data?.data);
              setEditMode(false);
              setLoading(false);

            }
          });
        }
      }
    );
    setLoading(false);

  };

  useEffect(() => {
    setLoading(true);

    dispatch(GET_DATA_SHARING_PERMISSIONS()).then((response) => {
      if (response?.status === 200 && response?.data?.data.length > 0) {
        setData(response?.data?.data);
      } else {
        toast.error(response?.data?.msg);
      }
    });
    dispatch(GET_GROUP_LIST(1, 100));
    dispatch(GET_ALL_ROLE_DATA(1, 100));
    setLoading(false);

  }, []);

  const handleChange = (moduleName, e) => {
    setLoading(true)

    const { value } = e?.target;
    let perm = {
      Private: true,
      read: false,
      write: false,
      delete: false,
    };
    if (value === "1") {
      perm = {
        Private: false,
        read: true,
        write: false,
        delete: false,
      };
    } else if (value === "2") {
      perm = {
        Private: false,
        read: true,
        write: true,
        delete: false,
      };
    } else if (value === "3") {
      perm = {
        Private: false,
        read: true,
        write: true,
        delete: true,
      };
    }
    const updatedPermission = data.map((item) => {
      if (item.moduleTitle === moduleName) {
        return {
          ...item,
          ...perm,
        };
      }
      return item;
    });
    setData(updatedPermission);
    setLoading(false)
  };
  if (loading) {
    return <PageLoader title="Loading" />;
  }
  return (
    <>
      <div className="mt-4 flex justify-end gap-3">
        {!editMode && (
          <button
            type="button"
            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
            onClick={(e) => {
              setEditMode(true);
            }}
          >
            Edit All Default Permissions
          </button>
        )}
      </div>
      {/* fixed inset-y-0  */}
      {!editMode ? (
        <div className="overflow-y-auto mt-3">
          <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
            <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
              <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[50%]  text-left font-medium "
                  >
                    Module
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[50%] text-left font-medium"
                  >
                    Default Access
                  </th>
                </tr>
              </thead>
              <tbody>
                {(data || []).map((item, index) => {
                  return (
                    <tr key={index} className="bg-white cursor-pointer">
                      <th
                        scope="row"
                        className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left"
                      >
                        <div className="flex justify-between">
                          <div>{item?.moduleTitle || ""}</div>
                        </div>
                      </th>
                      <th
                        scope="row"
                        className="px-5 py-4 font-medium text-[#929296] text-sm whitespace-nowrap text-left"
                      >
                        {item?.Private
                          ? "Private"
                          : item?.delete
                            ? "Public Read/Write/Delete"
                            : item?.read
                              ? "Public Read Only"
                              : "Public Read/Write"}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="ml-6 mt-[27px]">
            <p className="text-primary font-semibold">Sharing Rules</p>
            {reloadComponent &&
              permissions.map((module) => {
                return (
                  <RuleSharing
                    reloadAllData={reloadAllData}
                    moduleName={module.moduleTitle}
                    roles={roles}
                    groups={groups}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <EditePermission
          data={data}
          handleChange={handleChange}
          setEditMode={setEditMode}
          saveDataSharingModule={saveDataSharingModule}
        />
      )}
      {/* <div>
        <h1>Sharing Rules</h1>
        {reloadComponent &&
          permissions.map((module) => {
            return (
              <RuleSharing
                reloadAllData={reloadAllData}
                moduleName={module.moduleTitle}
                roles={roles}
                groups={groups}
              />
            );
          })}
      </div> */}
    </>
  );
}

const EditePermission = ({
  data,
  handleChange,
  setEditMode,
  saveDataSharingModule,
}) => {
  // const handleChange = () => {};
  return (
    <div>
      <h3 className="text-[#18181B] text-[20px] font-bold">
        Edit Default Organization Permissions
      </h3>
      <div className="flex min-h-full items-center  pt-5 ">
        <div className="grid">
          {data?.map((item) => {
            return (
              <div className="" key={item?.moduleTitle}>
                <div className="flex mt-2 items-center gap-2">
                  <p className="mb-0 text-[#191242] font-medium checkread min-w-[140px] ">
                    {item?.moduleTitle}
                  </p>
                  <form className="grid grid-cols-4 justify-start items-center ">
                    <div className="flex justify-start items-center m-1">
                      <input
                        name={item?.moduleTitle}
                        onChange={(e) => handleChange(item?.moduleTitle, e)}
                        value="0"
                        type="radio"
                        className="relative  float-left  mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        checked={item.Private}
                      // disabled={!editMode}
                      />
                      <p className="mb-0 p-1">Private</p>
                    </div>
                    <div className="flex justify-start items-center m-1">
                      <input
                        name={item?.moduleTitle}
                        value="1"
                        className="relative  float-left  mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        onChange={(e) => handleChange(item?.moduleTitle, e)}
                        type="radio"
                        // disabled={!editMode}
                        checked={
                          !item.Private &&
                          item.read &&
                          !item.write &&
                          !item.delete
                        }
                      />
                      <p className="mb-0 p-1">Public Read Only</p>
                    </div>
                    <div className="flex justify-start items-center m-1">
                      <input
                        name={item?.moduleTitle}
                        value="2"
                        onChange={(e) => handleChange(item?.moduleTitle, e)}
                        type="radio"
                        className="relative  float-left  mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                        // disabled={!editMode}
                        checked={
                          !item.Private &&
                          item.read &&
                          item.write &&
                          !item.delete
                        }
                      />
                      <p className="mb-0 p-1">Public Read/Write</p>
                    </div>
                    <div className="flex justify-start items-center m-1">
                      <input
                        name={item?.moduleTitle}
                        value="3"
                        onChange={(e) => handleChange(item?.moduleTitle, e)}
                        type="radio"
                        className="relative  float-left  mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                        // disabled={!editMode}
                        checked={
                          !item.Private &&
                          item.read &&
                          item.write &&
                          item.delete
                        }
                      />
                      <p className="mb-0 p-1">Public Read/Write/Delete</p>
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-[48px]">
        <button
          type="button"
          className="inline-flex justify-center rounded-lg border border-[#B2B2B6] bg-white px-10 py-4 text-sm font-medium text-[#B2B2B6] "
          onClick={() => {
            setEditMode(false);
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex ml-2 justify-center rounded-lg border border-transparent bg-primary px-10 py-4 text-sm font-medium text-white "
          onClick={saveDataSharingModule}
        >
          Save
        </button>
      </div>
    </div>
  );
};
const permissions = [
  {
    moduleTitle: "Leads",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Contacts",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Accounts",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "opportunities",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Tasks",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Meetings",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Calls",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Visits",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Sales Orders",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Purchase Orders",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "Invoices",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "quotes",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "inventory",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "siteVisit",
    Private: true,
    read: false,
    write: false,
    delete: false,
  },
  {
    moduleTitle: "whatsapp",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "sms",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "Note",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "settings",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "dataBackup",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "dataExport",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "sampleData",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "storage",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "recycleBin",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
  {
    moduleTitle: "auditLog",
    read: false,
    write: false,
    delete: false,
    Private: true,
  },
];
