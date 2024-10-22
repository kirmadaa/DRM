import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_ALL_DATA,
} from "../../../../Redux/actions/role";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_BY_ID_SECURITY_PROFILE,
  UPDATE_SECURITY_PROFILE,
} from "../../../../Redux/actions/security-control";
import SetupSidebar from "../../setupSidebar";

const EditSecurityProfile = ({
  // selectRole,
  // setSelectRole,
  modalShow,
  // roleByIdData,
  // currentPage,
}) => {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState();
  const [roleSingleData, setRoleSingleData] = useState();
  const params = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(GET_BY_ID_SECURITY_PROFILE(params.id)).then((res) => {
      setRoleSingleData(res.data.RoleData);
      setPermission(res?.data?.RoleData[0]?.permission);
    });
  }, [params.id]);

  useEffect(() => { }, [permission]);

  const updateProfile = async () => {
    setLoading(true);
    let payload = {
      profileId: params?.id,
      profileTitle: roleSingleData[0]?.profileTitle,
      profileDescription: roleSingleData[0]?.profileDescription,
      permission,
    };
    const res = await dispatch(UPDATE_SECURITY_PROFILE(payload)).then(
      (response) => {
        if (response.status === 200) {
          navigator("/crm/security-control");
          setLoading(false);
        }
      }
    );
  };
  useEffect(() => {
    if (modalShow) {
      dispatch(GET_ALL_DATA(1, 50));
    }
  }, [modalShow]);

  const handleChange = (moduleName, e) => {
    const { name, checked } = e?.target;
    const updatedPermission = roleSingleData[0]?.permission?.map((item) => {
      if (item.module_title === moduleName) {
        return {
          ...item,
          module_permission: {
            ...item.module_permission,
            [name]: checked || true,
          },
        };
      }
      return item;
    });
    const updatedRoleSingleData = [
      {
        ...roleSingleData[0],
        permission: updatedPermission,
      },
    ];
    setPermission(updatedPermission);
    setRoleSingleData(updatedRoleSingleData);
  };

  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div>
        <div className="py-2 w-full">
          <div className="w-full font-[300] text-md flex justify-between text-gray-500">
            <p className="text-primary font-semibold">Profile</p>
            <ol className="flex justify-start gap-2 flex-wrap">
              <li className="text-gray-400 hover:underline">
                <a exact="/crm/list" href="/crm/list">
                  Dashboard <span>/</span>
                </a>
              </li>
              <li className="text-gray-700 font-normal">list</li>
            </ol>
          </div>
        </div>
        <div className="py-3 px-4 mt-2 hadow-xl bg-white rounded w-[100%]">
          <div className="grid lg:grid-cols-2 gap-4">
            {roleSingleData &&
              roleSingleData[0]?.permission?.map((item) => {
                return (
                  <div className="text-sm" key={item?.module_title}>
                    <div>
                      <p className="m-0.5 px-2 mt-2 font-semibold text-primary checkread uppercase min-w-[140px]">
                        {item?.module_title}
                      </p>
                      <form className="flex flex-wrap items-center ">
                        <div className="flex justify-start items-center m-0.5">
                          <input
                            name="read"
                            onChange={(e) =>
                              handleChange(item?.module_title, e)
                            }
                            type="checkbox"
                            disableUnderline
                            checked={item?.module_permission?.read}
                          />
                          <p className="mb-0 p-1">Read</p>
                        </div>
                        <div className="flex justify-start items-center m-0.5">
                          <input
                            name="write"
                            onChange={(e) =>
                              handleChange(item?.module_title, e)
                            }
                            type="checkbox"
                            disableUnderline
                            checked={item?.module_permission?.write}
                          />
                          <p className="mb-0 p-1">write</p>
                        </div>
                        <div className="flex justify-start items-center m-0.5">
                          <input
                            name="edit"
                            onChange={(e) =>
                              handleChange(item?.module_title, e)
                            }
                            type="checkbox"
                            disableUnderline
                            checked={item?.module_permission?.edit}
                          />
                          <p className="mb-0 p-1">Edit</p>
                        </div>
                        <div className="flex justify-start items-center m-0.5">
                          <input
                            name="delete"
                            onChange={(e) =>
                              handleChange(item?.module_title, e)
                            }
                            type="checkbox"
                            disableUnderline
                            checked={item?.module_permission?.delete}
                          />
                          <p className="mb-0 p-1">Delete</p>
                        </div>
                        <div className="flex justify-start items-center m-0.5">
                          <input
                            name="autoResponders"
                            onChange={(e) =>
                              handleChange(item?.module_title, e)
                            }
                            type="checkbox"
                            disableUnderline
                            checked={item?.module_permission?.autoResponders}
                          />
                          <p className="mb-0 p-1">Auto Responders</p>
                        </div>
                        <div className="flex justify-start items-center m-0.5">
                          <input
                            name="excelSheet"
                            onChange={(e) =>
                              handleChange(item?.module_title, e)
                            }
                            type="checkbox"
                            disableUnderline
                            checked={item?.module_permission?.excelSheet}
                          />
                          <p className="mb-0 p-1">Excel Sheet</p>
                        </div>
                      </form>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
            onClick={updateProfile}
          >
            {loading ? "Process.." : "Edit Profile"}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
            onClick={() => {
              navigator("/crm/security-control");
            }}
          >
            {loading ? "Process.." : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSecurityProfile;
