import React, { useCallback, useEffect, useState } from "react";
import KanbanViewSettingModal from "../../Layouts/app/kanbanView/KanbanViewSettingModal";
import Column from "../../Layouts/app/kanbanView/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  GET_FILTER_KANBANVIEW,
  GET_KANBANVIEW,
  POST_KANBANVIEW,
  UPDATE_MODULE_KANBANVIEW,
} from "../../Redux/actions/kanbanView";
import {
  GET_ALL_DATA_FILTER,
  GET_FORM,
  GET_USER_PROFILE,
  UPDATE,
} from "../../Redux/actions/user";
import { list } from "../../Components/module";
import { useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import { ChevronDown } from "react-feather";
import { GET_ALL_PIPELINES } from "../../Redux/actions/pipeline";

const moduleData = [
  {
    label: "Leads",
    value: "leads",
  },
  {
    label: "Accounts",
    value: "accounts",
  },
  {
    label: "Contacts",
    value: "contacts",
  },
  {
    label: "Opportunities",
    value: "deals",
  },
  {
    label: "Inventory",
    value: "inventory",
  },
  {
    label: "SalesOrder",
    value: "SalesOrder",
  },
  // {
  //   label: "PurchaseOrder",
  //   value: "PurchaseOrder",
  // },
  // {
  //   label: "Invoice",
  //   value: "Invoice",
  // },
  {
    label: "Vendor",
    value: "Vendor",
  },
];

const KanbanView = ({ moduleName }) => {
  // state
  const [modal, setModal] = useState(false);
  const [state, setState] = useState(initialData);
  const [userId, setUserId] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [byModuleData, setByModuleData] = useState({});
  const [error, setError] = useState(200);
  const [pipelineData, setPipelineData] = useState();
  const [pipeline, setPipeline] = useState("All Pipelines");
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const api = list[moduleName] || {};
  const dpName = moduleData.find(
    (ele) => ele.label?.toLocaleLowerCase() === moduleName?.toLocaleLowerCase()
  )?.value;
  const sections = useSelector((state) => state.user.form.sections);

  const handleDragStart = useCallback(
    (start) => {
      document.body.style.color = "orange";
      setState({
        ...state,
        homeIndex: state.columnOrder.indexOf(start.source.droppableId),
      });
    },
    [state]
  );

  const handleDragUpdate = useCallback(
    (update) => {
      const opacity = update.destination
        ? update.destination.index / Object.keys(state.tasks).length
        : 0;
    },
    [state]
  );

  const handleDragEnd = useCallback(
    (result) => {
      document.body.style.color = "inherit";
      // document.body.style.backgroundColor = "inherit";
      setState({
        ...state,
        homeIndex: null,
      });

      if (!result.destination) {
        return;
      }

      if (
        result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index
      ) {
        return;
      }

      const start = state.columns[result.source.droppableId];
      const finish = state.columns[result.destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(result.source.index, 1);
        newTaskIds.splice(result.destination.index, 0, result.draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        setState({
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        });
        return;
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(result.source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(result.destination.index, 0, result.draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      });

      let updateData = {
        ModuleTitle: moduleName,
        [byModuleData?.CategorizeBy]: [
          state.columns[result?.destination?.droppableId]?.ids,
        ],
      };

      if (dpName === "deals") {
        let droppableStage =
          state?.columns?.[result?.destination?.droppableId]?._id;
        let draggableCard = state?.tasks?.[result?.draggableId]?._id;
        dispatch(
          UPDATE(api.updateApi, {
            stage: droppableStage,
            id: draggableCard,
            ModuleTitle: api,
          })
        );
      } else {
        dispatch(
          UPDATE_MODULE_KANBANVIEW(
            `${dpName}/${result?.draggableId}`,
            updateData
          )
        ).then((res) => {
          if (res.status === 200) {
            fetchFilterKanban();
          }
        });
      }
    },
    [state]
  );

  const fetchKanbanView = () => {
    dispatch(
      GET_KANBANVIEW(
        `get-kanban-view?offset=1&limit=2&ModuleName=${
          moduleData.find(
            (ele) =>
              ele.label?.toLocaleLowerCase() === moduleName?.toLocaleLowerCase()
          )?.value
        }`
      )
    ).then((res) => {
      console.log("res?.data?.data===>", res?.data?.data);
      if (res.status === 200) {
        // setError(400);

        setError(200);
        setByModuleData(res?.data?.data?.kanbanviewData[0]);
      } else if (res.status === 400) {
        setError(400);
        setModal(true);
      }
    });
  };

  const fetchFilterKanban = () => {
    dispatch(
      GET_FILTER_KANBANVIEW(
        `filtered-kanban-view?offset=1&limit=10&ModuleName=${dpName}`
      )
    ).then((res) => {
      if (res?.status === 200) {
        setFilterData(res?.data.data);
        // filterModuleData();
      }
    });
  };

  const handleSubmit = (data) => {
    dispatch(POST_KANBANVIEW("kanban-view", data)).then((res) => {
      if (res.status === 200) {
        fetchKanbanView();
        fetchFilterKanban();
        setModal(false);
      }
    });
  };

  const sumFunction = (item, data) => {
    let initialValue = 0;
    filterData
      .filter((taskId) => {
        return item.value === taskId[data[1].value];
      })
      .forEach((element) => {
        initialValue = element[byModuleData?.AggregateBy] + initialValue;
      });
    return initialValue;
  };

  useEffect(() => {
    console.log("sections===>", sections, byModuleData, "---", filterData);
    if (sections && byModuleData?.CategorizeBy && filterData.length !== 0) {
      let allSelectFilter = Object.entries(sections[0].inputs).find(
        (element) => {
          // return true;
          return element[1]?.value === byModuleData?.CategorizeBy;
        }
      );
      if (allSelectFilter) {
        setState({
          ...state,
          tasks: filterData
            .map((item) => {
              return {
                [`${item?._id}`]: {
                  ...item,
                  content: "",
                  id: `${item?._id}`,
                },
              };
            })
            .reduce((acc, curr) => {
              const key = Object.keys(curr)[0];
              acc[key] = curr[key];
              return acc;
            }, {}),
          columns: allSelectFilter[1]?.options
            .map((item) => {
              return {
                [item.label.replace(/ /g, "")]: {
                  id: item.label.replace(/ /g, ""),
                  ids: Number(item?.value),
                  totalPrice: sumFunction(item, allSelectFilter),
                  title: item?.label,
                  taskIds: filterData
                    .filter((taskId) => {
                      return item.value === taskId[allSelectFilter[1].value];
                    })
                    .map((ele) => `${ele?._id}`),
                },
              };
            })
            .reduce((acc, curr) => {
              const key = Object.keys(curr)[0];
              acc[key] = curr[key];
              return acc;
            }, {}),
          columnOrder: allSelectFilter[1].options.map((item) =>
            item?.label.replace(/ /g, "")
          ),
        });
      }
    }
  }, [sections, byModuleData, filterData]);

  const getAllPipelines = async () => {
    let data = {
      offset: 1,
      limit: 10,
      search: [],
    };
    dispatch(GET_ALL_PIPELINES(data));
    // setPipelineData(response?.data);

    // let response = await dispatch(GET_ALL_PIPELINES(data));
    // setPipelineData(response?.data);
  };

  useEffect(() => {
    dispatch(GET_USER_PROFILE()).then((res) => {
      if (res?.success) {
        setUserId(res?.data?.data[0]?.userId);
      }
    });
    dispatch(GET_FORM(api.formApi));

    fetchFilterKanban();
    if (moduleName === "Opportunities") {
      dispatch(
        GET_ALL_DATA_FILTER(api.getApi, {
          offset: 1,
          limit: 25,
        })
      );
      fetchKanbanView();
      // getAllPipelines();
    } else {
      fetchKanbanView();
    }
  }, []);

  // useEffect(() => {
  //   if (pipelineData && moduleName === "Opportunities" && data) {
  //     if (pipeline === "All Pipelines") {

  //       let newArray = pipelineData?.pipelineData
  //         ?.map((item) => {
  //           return item?.stages?.map((ele, i) => {
  //             return {
  //               [ele?.stageTitle]: {
  //                 ...ele,
  //                 pipelineId: item?._id,
  //                 id: ele?.stageTitle,
  //                 title: ele?.stageTitle,
  //                 taskIds:
  //                   i !== 0
  //                     ? data
  //                       ?.filter((idsFind) => idsFind?.Pipeline === item?._id)
  //                       .map((update) => `${update?._id}`)
  //                     : [],
  //               },
  //             };
  //           });
  //         })
  //         ?.flat()
  //         ?.reduce((acc, curr) => {
  //           const key = Object.keys(curr)[0];
  //           acc[key] = curr[key];
  //           return acc;
  //         }, {});
  //       let newArray2 = pipelineData?.pipelineData
  //         ?.map((item) => {
  //           return item?.stages?.map((ele) => {
  //             return ele?.stageTitle;
  //           });
  //         })
  //         ?.flat();

  //       let newObj = data
  //         ?.map((item) => {
  //           return {
  //             [item._id]: { ...item, id: item._id },
  //           };
  //         })
  //         ?.reduce((acc, curr) => {
  //           const key = Object.keys(curr)[0];
  //           acc[key] = curr[key];
  //           return acc;
  //         }, {});

  //       setState({
  //         tasks: { ...newObj },
  //         columns: {
  //           ...newArray,
  //         },
  //         columnOrder: [...newArray2],
  //       });
  //     } else {
  //       let newArray = pipelineData?.pipelineData
  //         ?.map((item) => {
  //           if (item?.pipelineTitle === pipeline) {
  //             return item?.stages?.map((ele, i) => {
  //               return {
  //                 [ele?.stageTitle]: {
  //                   ...ele,
  //                   pipelineId: item?._id,
  //                   id: ele?.stageTitle,
  //                   title: ele?.stageTitle,
  //                   taskIds: data
  //                     ?.filter((idsFind) => {
  //                       if (idsFind?.stage) {
  //                         return (
  //                           idsFind?.stage === ele?._id &&
  //                           idsFind?.Pipeline === item?._id
  //                         );
  //                       } else if (!idsFind?.stage) {
  //                         if (idsFind?.Pipeline === item?._id) {
  //                           return i === 0;
  //                         }
  //                       }
  //                     })
  //                     ?.map((update) => `${update?._id}`)
  //                     ?.filter((item, innd, a) => {
  //                       return a.indexOf(item) === innd;
  //                     }),
  //                 },
  //               };
  //             });
  //           }
  //         })
  //         ?.filter((ele) => ele !== undefined)
  //         ?.flat()
  //         ?.reduce((acc, curr) => {
  //           const key = Object.keys(curr)[0];
  //           acc[key] = curr[key];
  //           return acc;
  //         }, {});
  //       let newArray2 = pipelineData?.pipelineData
  //         ?.map((item) => {
  //           if (item?.pipelineTitle === pipeline) {
  //             return item?.stages?.map((ele) => {
  //               return ele?.stageTitle;
  //             });
  //           }
  //         })
  //         ?.filter((ele) => ele !== undefined)
  //         ?.flat();

  //       let newObj = data
  //         ?.map((item) => {
  //           return {
  //             [item._id]: { ...item, id: item._id },
  //           };
  //         })
  //         ?.reduce((acc, curr) => {
  //           const key = Object.keys(curr)[0];
  //           acc[key] = curr[key];
  //           return acc;
  //         }, {});

  //       setState({
  //         columns: {
  //           ...newArray,
  //         },
  //         // columnOrder: ["Stage 1", "Stage 2"],
  //         tasks: { ...newObj },
  //         columnOrder: [...newArray2],
  //       });
  //     }
  //   }
  // }, [pipelineData, pipeline, data]);
  return (
    <div>
      <div className="mt-4 flex justify-end">
        {moduleName !== "Opportunities" && (
          <button
            onClick={() => setModal(true)}
            className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
          >
            Create Kanban View
          </button>
        )}
        {moduleName === "Opportunities" && (
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center w-full justify-center rounded-lg px-3 py-2 text-sm font-medium bg-primary text-white hover:bg-opacity-90">
                  {pipeline}
                  <ChevronDown size={16} />
                </Menu.Button>
              </div>
              <Menu.Items
                style={{ zIndex: 1000 }}
                className="absolute left-0 mt-2 mx-3 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {pipelineData?.pipelineData &&
                  [
                    ...pipelineData?.pipelineData,
                    { pipelineTitle: "All Pipelines" },
                  ]?.map((item, index) => {
                    return (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setState(initialData);
                              setPipeline(item?.pipelineTitle);
                            }}
                            className={`${
                              active ? "bg-primary text-white" : "text-gray-900"
                            } group flex w-full items-center px-5 py-[10px] text-sm`}
                          >
                            {item?.pipelineTitle}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
              </Menu.Items>
            </Menu>
          </div>
        )}
      </div>

      {modal && (
        <KanbanViewSettingModal
          modal={modal}
          setModal={setModal}
          sections={sections}
          moduleName={moduleName}
          handleSubmit={handleSubmit}
          id={userId}
          error={error}
          byModuleData={byModuleData}
          moduleData={moduleData}
        />
      )}
      <div className="my-4">
        {error === 200 ? (
          <DragDropContext
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
            onDragEnd={handleDragEnd}
          >
            {/* {moduleName !== "Opportunities" ? (
              <div className="flex w-[100%] overflow-x-auto flex-nowrap gap-4">
                {state.columnOrder.map((columnId, index) => {
                  console.log("state====>", state, state.columnOrder);
                  const column = state?.columns?.[columnId];
                  const isDropDisabled = false;
                  return (
                    <Column
                      key={index}
                      column={column}
                      tasks={Object.values(state?.tasks)}
                      moduleName={moduleName}
                      isDropDisabled={isDropDisabled}
                      byModuleData={byModuleData}
                    />
                  );
                })}
              </div>
            ) : ( */}
            <div className="flex w-[100%] overflow-x-auto flex-nowrap gap-4">
              {state.columnOrder.map((columnId, index) => {
                const column = state?.columns?.[columnId];
                //console.log("state====>11 ===>", column);

                const tasks = column?.taskIds?.map(
                  (taskId) => state?.tasks?.[taskId]
                );
                //console.log("state====>11tasks", column?.taskIds, state);
                console.log("state====>byModuleData", byModuleData);

                const isDropDisabled = false;
                return (
                  <Column
                    key={index}
                    column={column}
                    tasks={tasks}
                    moduleName={moduleName}
                    isDropDisabled={isDropDisabled}
                    byModuleData={byModuleData}
                  />
                );
              })}
            </div>
            {/* )} */}
          </DragDropContext>
        ) : error === 400 ? (
          <p className="text-center">No Data Found..</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default KanbanView;

const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Ligar para fulano",
    },
    "task-2": {
      id: "task-2",
      content: "Ligar para ciclano",
    },
    "task-3": {
      id: "task-3",
      content: "Ligar para beltrano",
    },
    "task-4": {
      id: "task-4",
      content: "Ligar para patobrancano",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "status 1",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "status 2",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "status 3",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};
