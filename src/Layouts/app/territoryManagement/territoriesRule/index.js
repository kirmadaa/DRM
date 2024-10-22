import React, {  useEffect, useState } from "react";
import { TreeItem, TreeView } from "../../../../Components/TerritoryTreeView";
import {  Minus, Plus } from "react-feather";
import { useDispatch } from "react-redux";
import { GET_ALL_ACTIVE_USER } from "../../../../Redux/actions/userList";
import { GET_FILTERS, GET_USER_PROFILE } from "../../../../Redux/actions/user";
import { useSelector } from "react-redux";
import { CREATE_TERRITORY, GET_TERRITORY, UPDATE_TERRITORY } from "../../../../Redux/actions/territory";

const hideFilterList = [
  "_id",
  "Owner",
  "AccountOwnerId",
  "AccountsOwnerId",
  "Id",
  "id",
  "connectionId",
  "taskOwnerId",
  "connectionId",
  "ModifiedBy",
  "id",
  "SmsOwnerId",
  "WhatsappOwnerId",
  "templateOwner",
  "siteVisitOwnerId",
  "meetingHostId",
  "_id",
  "ContactOwnerId",
  "organizationId",
  "EmailOwnerId",
  "noteOwnerId",
  "createdAt",
  "updatedAt",
  "createdTime",
  "updatedTime"
];

const TerritoryRule = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const terriory = useSelector((state) => state?.territoryReducer?.List);
  const fields = useSelector((state) => state.user.filters);
  const [activeUsers, setActiveUsers] = useState([])
  const [terrioryByIdData, setTerriotryByIdData] = useState(null)


  const dispatch = useDispatch()
  const [tree, setTree] = useState([]);
  const optionsForActiveUsers = () => {
    dispatch(GET_USER_PROFILE()).then((profile) => {
      const resData = profile?.data?.data[0];
      const options = activeUsers;
      options.push({
        value: resData?.userId,
        label: `${resData?.firstName} ${resData?.lastName}`,
      });
      setActiveUsers(options)
    });

    dispatch(GET_ALL_ACTIVE_USER(`get-user?active=true`, 1, 100)).then(
      (data) => {
        const res = data?.data?.data?.usersData;
        const options = activeUsers;
        if (res?.length > 0) {
          res?.map((item) => {
            options.push({
              value: item?._id,
              label: `${item?.firstName} ${item?.lastName}`,
            });
          });
          setActiveUsers(options)
        }
      }
    );

  };

  const territoryList = () => {
    dispatch(GET_TERRITORY(1, 100))
  }

  useEffect(() => {
    optionsForActiveUsers()
    territoryList()
    dispatch(GET_FILTERS("/get-accounts-filter-field"));
  }, [])

  useEffect(() => {
    const nodeMap = {};
    for (const item of terriory) {
      const { _id, patentTerritory } = item;
      item.subTree = [];
      nodeMap[_id] = item;

      if (patentTerritory) {
        const parentNode = nodeMap[patentTerritory];
        if (parentNode) {
          parentNode.subTree.push(item);
        }
      }
    }

    const rootNodes = terriory.filter((item) => item.patentTerritory === null);
    setTree(rootNodes);
  }, [terriory]);


  const handleSubmit = async (data) => {
    await dispatch(CREATE_TERRITORY(data)).then((response) => {
      if (response === 200) {
        setActiveBtn(0);
        dispatch(GET_TERRITORY(1, 100));
      }
    });
  };

  const handleEditSubmit = async (data) => {
    await dispatch(UPDATE_TERRITORY(terrioryByIdData?._id, data)).then((response) => {
      if (response === 200) {
        setActiveBtn(0);
        dispatch(GET_TERRITORY(1, 100));
        setTerriotryByIdData(null);
      }
    });
  };


  const handleActive = (index) => {
    setActiveBtn(index);
    if (index == 2) {
      setIsOpen(false);
    } else if (index == 3) {
      setIsOpen(true);
    }
  };

  const renderSubtrees = (trees) => {
    return trees.map((tree) => {
      if (!tree.subTree?.length) {
        return (
          <TreeItem
            key={tree._id}
            id={tree._id}
            title={tree.name}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            handleActive={handleActive}
            tree={tree}
            setTerriotryByIdData={setTerriotryByIdData}
            type="asignRuleForTerriotry"
          />
        );
      }

      return (
        <>
          <TreeItem
            key={tree._id}
            id={tree._id}
            title={tree.name}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            handleActive={handleActive}
            tree={tree}
            setTerriotryByIdData={setTerriotryByIdData}
            type="asignRuleForTerriotry"
          >
            {renderSubtrees(tree.subTree)}
          </TreeItem>
        </>
      )
    });
  };
  return (
    <div>
      <h2 className="text-primary text-base font-semibold">
        Territory Hierarchy
      </h2>
      <div>
        {activeBtn === 0 || activeBtn === 2 || activeBtn === 3 ? (
          <div>
            <div className="ml-6">
              <TreeView>{renderSubtrees(tree)}</TreeView>
            </div>
          </div>
        ) : (
          <TerritoryAddEdit
            activeUsers={activeUsers}
            handleActive={handleActive}
            terriory={terriory}
            handleSubmit={handleSubmit}
            handleEditSubmit={handleEditSubmit}
            accountFields={fields}
            setTerriotryByIdData={setTerriotryByIdData}
            terrioryByIdData={terrioryByIdData}
          />
        )}
      </div>
    </div>
  );
};

export default TerritoryRule;

const TerritoryAddEdit = ({ handleActive, handleEditSubmit, accountFields, terrioryByIdData, setTerriotryByIdData }) => {
  const defaultData = {
    rules: [{
      field: "0",
      value: "",
      operator: "="
    }]
  }
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    if (terrioryByIdData) {
      setData({
        rules: terrioryByIdData?.rules &&
          terrioryByIdData?.rules.length ?
          terrioryByIdData?.rules :
          [{
            field: "0",
            value: "",
            operator: "="
          }]
      });
    }
  }, [terrioryByIdData]);

  const handleTerritory = () => {
    const finalData = { ...data }
    if (finalData.rules.length > 0) {
      const rules = []
      finalData.rules.map((rule) => {
        if (rule.field !== "0") {
          rules.push(rule)
        }
      })
      finalData.rules = rules
    }
    if (terrioryByIdData) {
      handleEditSubmit(finalData)
    }
  };


  const changeHandlerUpdateRules = (e, index) => {
    const { name, value } = e?.target
    const dataUpdate = { ...data }
    dataUpdate.rules[index] = { ...dataUpdate.rules[index], [name]: value }
    setData(dataUpdate)
  }

  const addHandler = () => {
    const updateData = { ...data }
    const rules = [...updateData.rules]
    rules.push({
      field: "0",
      value: "",
      operator: "="
    })
    setData({ ...data, rules })
  }

  const deleteHandler = (index) => {
    const updateData = { ...data }
    const rules = [...updateData.rules]
    rules.splice(0, index)
    setData({ ...data, rules })
  }


  const operator = [
    {
      name: "is",
      value: "="
    },
    {
      name: "isn't",
      value: "!="
    },
  ]

  return (
    <div>
      <div className="my-[40px]">
        <span className="px-[14px] py-[12px] rounded-lg border-[#FCB900] border-2 bg-[#FFFCE4]">
          To automatically assign accounts to this territory, please fill out
          the rule criteria.
        </span>
      </div>
      <div className="my-4">
        <h2 className="text-[#1D1D1E]  text-[18px] font-semibold">
          Account Rule
        </h2>
        {data.rules.map((rule, index) => {
          return (
            <div className="my-6 flex items-center">
              <div>
                <span className="bg-[#E4E6EE] rounded-[32px] p-2 inline-block ">
                  <span className="bg-[#191242] w-[28px] h-[28px] rounded-[32px] text-[#fff] inline-block px-2 py-1  text-center">
                    {index + 1}
                  </span>
                </span>
              </div>

              <div className="px-4">
                <select
                  className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  placeholder="Field"
                  name="field"
                  value={data.rules[index].field}
                  onChange={(e) =>
                    changeHandlerUpdateRules(e, index)
                  }
                >
                  <option value="0">None</option>
                  {accountFields
                    .filter(
                      (item) =>
                        !hideFilterList?.includes(item)
                    )
                    .map((field) => {
                      return (
                        <option value={field}>
                          {field}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="px-4">
                <select
                  className="form-control rounded-[10px] w-[270px] border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                  placeholder="operator"
                  name="operator"
                  value={data.rules[index].operator}
                  onChange={(e) =>
                    changeHandlerUpdateRules(e, index)
                  }
                  disabled={data.rules[index].field === "0" ? true : false}
                >
                  {operator
                    .map((field) => {
                      return (
                        <option value={field.value}>
                          {field.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <input
                  name="value"
                  type="text"
                  value={data.rules[index].value}
                  onChange={(e) =>
                    changeHandlerUpdateRules(e, index)
                  }
                  disabled={data.rules[index].field === "0" ? true : false}
                  className={`form-control  rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base`}
                />
              </div>
              <div className="ml-4">
                <button className=" bg-[#FFEAEF] rounded-lg text-[#F95250] p-1"
                  onClick={() => deleteHandler(index)}
                >
                  <Minus />
                </button>
                <button
                  className="bg-[#DCFCE7] rounded-lg text-[#22C55E] p-1"
                  onClick={addHandler}
                >
                  <Plus />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex justify-start items-center gap-3">
        <button
          type="button"
          onClick={() => {
            handleActive(0);
            setData(defaultData);
            setTerriotryByIdData(null);
          }}
          className="inline-flex justify-center rounded-lg border border-[#B2B2B6] bg-white px-8 py-2 text-sm font-medium text-[#B2B2B6] "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={(e) => {
            handleTerritory();
          }}
          className="inline-flex ml-2 justify-center rounded-lg border border-transparent bg-primary px-8 py-2 text-sm font-medium text-white "
        >
          Save Rule
        </button>
      </div>
    </div >
  );
};
