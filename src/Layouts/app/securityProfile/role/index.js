import React, { useState } from "react";
import { TreeItem, TreeView } from "../../../../Components/TreeView";
import { LeftBackArrow } from "../../../../assets/svgIcons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  CREATE_ROLE_DATA,
  GET_ALL_ROLE_DATA,
  UPDATE_ROLE_DATA,
} from "../../../../Redux/actions/role";

const RoleManagement = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const roles = useSelector((state) => state?.role);
  const dispatch = useDispatch();
  const [tree, settree] = useState([]);
  const [roleByIdData, setRoleByIdData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleActive = (index) => {
    setActiveBtn(index);
    if (index === 2) {
      setIsOpen(false);

      // setIsOpen(isOpen ? false : true);
      // console.log("rootNodes===>", tree);

    } else if (index === 3) {
      setIsOpen(true);

      // setIsOpen(isOpen ? false : true);
      // console.log("rootNodes===>", tree);

    }
  };

  const handleSubmit = async (data) => {
    let payload = {
      ...data,
      permission,
    };

    const res = await dispatch(CREATE_ROLE_DATA(payload)).then((response) => {
      if (response === 200) {
        setActiveBtn(0);
        dispatch(GET_ALL_ROLE_DATA(1, 200));
      }
    });
  };

  const handleSubmitEdit = async (data) => {
    let payload = {
      ...data,
      roleId: roleByIdData?._id,
      permission: roleByIdData?.permission,
    };
    const res = await dispatch(UPDATE_ROLE_DATA(payload));
    if (res === 200) {
      dispatch(GET_ALL_ROLE_DATA(1, 200));
      // setSelectRole(null);
      // closeModal();
      setActiveBtn(0);
      setRoleByIdData(null);
    }
  };

  useEffect(() => {
    const nodeMap = {};
    for (const item of roles.roledata) {
      const { _id, roleTitle, parent_id } = item;
      item.subTree = [];
      nodeMap[_id] = item;

      if (parent_id) {
        const parentNode = nodeMap[parent_id];
        if (parentNode) {
          parentNode.subTree.push(item);
        }
      }
    }

    const rootNodes = roles.roledata.filter((item) => item.parent_id === null);
    console.log("rootNodes===>", rootNodes);
    settree(rootNodes);
  }, [roles]);

  useEffect(() => {
    dispatch(GET_ALL_ROLE_DATA(1, 200));
  }, [dispatch]);

  const renderSubtrees = (trees) => {
    return trees.map((tree) => {
      if (!tree.subTree.length) {
        return (
          <TreeItem
            key={tree._id}
            id={tree._id}
            title={tree.roleTitle}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            handleActive={handleActive}
            tree={tree}
            setRoleByIdData={setRoleByIdData}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
          />
        );
      }

      return (
        <TreeItem
          key={tree._id}
          id={tree._id}
          title={tree.roleTitle}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          tree={tree}
          handleActive={handleActive}
          setRoleByIdData={setRoleByIdData}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
        >
          {renderSubtrees(tree.subTree)}
        </TreeItem>
      );
    });
  };
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="cursor-pointer" onClick={() => handleActive(0)}>
          <LeftBackArrow />
        </div>
        <div>
          <div className="text-primary text-base font-semibold">
            {" "}
            {activeBtn === 1 && roleByIdData
              ? "Edit Role"
              : activeBtn === 1
                ? "New Role"
                : "Role"}
          </div>
          <div className="font-medium text-sm text-[#929296] max-w-[800px]">
            This page will allow you to define how you share the data among
            users based on your organization's role hierarchy. For more
            information, refer to online help.
          </div>
        </div>
      </div>
      {activeBtn === 0 || activeBtn === 2 || activeBtn === 3 ? (
        <div>
          <div className="my-[24px]">
            <button
              onClick={() => handleActive(1)}
              className={
                activeBtn === 1
                  ? "text-white  border-transparent border bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                  : " border-[#191242]  text-sm font-medium  border cursor-pointer rounded-2xl px-5 py-3"
              }
            >
              New Role
            </button>
            <button
              className={
                activeBtn === 3
                  ? "text-white mx-2 border-transparent border bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                  : " border-[#191242] mx-2 text-sm font-medium  border cursor-pointer rounded-2xl px-5 py-3"
              }
              onClick={() => handleActive(3)}
            >
              Expand All{" "}
            </button>
            <button
              className={
                activeBtn === 2
                  ? "text-white  border-transparent border bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                  : " border-[#191242]  text-sm font-medium  border cursor-pointer rounded-2xl px-5 py-3"
              }
              onClick={() => handleActive(2)}
            >
              Collapse All
            </button>
          </div>
          <div className="ml-6">
            <TreeView>{renderSubtrees(tree)}</TreeView>
          </div>
        </div>
      ) : (
        <RoleAddAndEdit
          roleData={roles?.roledata}
          handleActive={handleActive}
          handleSubmit={handleSubmit}
          handleSubmitEdit={handleSubmitEdit}
          setRoleByIdData={setRoleByIdData}
          roleByIdData={roleByIdData}
        />
      )}
    </div>
  );
};

export default RoleManagement;

const RoleAddAndEdit = ({
  roleData,
  handleActive,
  handleSubmit,
  roleByIdData,
  setRoleByIdData,
  handleSubmitEdit,
}) => {
  const [data, setdata] = useState({
    roleTitle: "",
    parent_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleRole = () => {
    if (!roleByIdData) {
      handleSubmit(data);
    } else {
      handleSubmitEdit(data);
    }
    setdata({ roleTitle: "", parent_id: "" });
  };

  useEffect(() => {
    if (roleByIdData) {
      setdata({
        roleTitle: roleByIdData?.roleTitle,
        parent_id: roleByIdData?.parent_id,
      });
    }
  }, [roleByIdData]);

  return (
    <div className="mt-4">
      <div className="grid lg:grid-cols-1">
        <div className="form-group row flex mb-3 items-center">
          <label
            htmlFor="firstName"
            className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
          >
            Role Name <span className="text-red-800">*</span>
          </label>
          <div className="col-sm-6">
            <input
              name="roleTitle"
              value={data?.roleTitle}
              type="text"
              placeholder="Enter Sharing Rule Name"
              className={`form-control rounded-[10px] w-[270px]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
              onChange={(e) => handleChange(e)}
            // value={sharingRuleName}
            />
          </div>
        </div>

        <div className="form-group row  flex mb-3 items-center">
          <label
            htmlFor="roleId"
            className="col-sm-3 text-lg w-[160px] text-[#929296] font-medium col-form-label"
          >
            Reports To<span className="text-red-800">*</span>
          </label>
          <div className="col-sm-6">
            <select
              className="form-control rounded-[10px] w-[270px] placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
              placeholder="Select permission"
              name="parent_id"
              value={data?.parent_id}
              // defaultValue={permissionValue}
              onChange={(e) => handleChange(e)}
            >
              <option>please select parent</option>
              {roleData.map((item, index) => (
                <option key={item._id} value={item._id}>
                  {item.roleTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-start items-center gap-3">
          <button
            type="button"
            onClick={() => {
              handleActive(0);
              setdata({ roleTitle: "", parent_id: "" });
              setRoleByIdData(null);
            }}
            className="inline-flex justify-center rounded-lg border border-[#B2B2B6] bg-white px-8 py-2 text-sm font-medium text-[#B2B2B6] "
          >
            Cancel
          </button>
          <button
            type="button"
            // name={moduleName}
            onClick={(e) => {
              handleRole();
            }}
            className="inline-flex ml-2 justify-center rounded-lg border border-transparent bg-primary px-8 py-2 text-sm font-medium text-white "
          >
            Add Role
          </button>
        </div>
      </div>
    </div>
  );
};

export const permission = [
  {
    module_title: "home",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "leads",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "contacts",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "accounts",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "opportunities",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "tasks",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "Calls",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "meeting",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "saleOrders",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "purchaseOrders",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "invoices",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "inventory",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "siteVisit",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "quotes",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "settings",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
];
