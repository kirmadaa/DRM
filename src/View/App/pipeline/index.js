import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import PipelineModal from "../../../Layouts/app/pipeline/PipelineModal";
import { useDispatch } from "react-redux";
import {
  ADD_PIPELINE,
  DELETE_PIPELINE,
  GET_ALL_PIPELINES,
  GET_ALL_STAGES,
  UPDATE_PIPELINE,
} from "../../../Redux/actions/pipeline";
import StageModal from "../../../Layouts/app/pipeline/StageModal";
import { useSelector } from "react-redux";

const Pipeline = () => {
  const [state, setState] = useState(initialData);
  const [preserveState, setPreserveState] = useState();
  const [button, setButton] = useState([]);
  const [modal, setModal] = useState(false);
  const [stageModal, setStageModal] = useState(false);
  const [pipelineData, setPipelineData] = useState();
  const { pipelineModal } = useSelector((store) => store?.pipelineReducer);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: "PIPELINE_MODAL",
      data: false,
    });
    setModal(false);
  };
  const handleCloseStage = () => {
    setStageModal(false);
    if (pipelineModal) {
      setModal(true);
    }
  };

  const handleDragStart = useCallback(
    (start) => {
      setPreserveState(state);
      document.body.style.color = "orange";
      // document.body.style.transition = "background-color 0.2s ease";
      // document.body.style.transition = "background-color 0.2s ease";

      setState({
        ...state,
        homeIndex: state.columnOrder.indexOf(start.source.droppableId),
      });
    },
    [state]
  );
  const handleDragUpdate = useCallback(
    (update) => {
      setButton([update.destination.droppableId]);
    },
    [state]
  );

  const handleDragEnd = useCallback(
    (result) => {
      document.body.style.color = "inherit";
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
    },
    [state]
  );

  const removeStageFromPipeline = (stageData, columnData) => {
    setPreserveState(state);
    setButton([columnData?.id]);
    setState({
      ...state,

      columns: {
        ...state?.columns,
        [columnData?.pipelineTitle]: {
          ...state?.columns?.[columnData?.pipelineTitle],
          stages: [
            ...state?.columns?.[columnData?.pipelineTitle]?.stages?.filter(
              (ele) => ele?.stageTitle !== stageData?.stageTitle
            ),
          ],
          taskIds: [
            ...state?.columns?.[columnData?.pipelineTitle]?.taskIds?.filter(
              (ele) => ele !== stageData?.id
            ),
          ],
        },
      },
      tasks: {
        ...state?.tasks,
      },
    });
    // dispatch(UPDATE_PIPELINE(columnData?._id, { stages:  }))
  };

  const updatePipeline = (columnData) => {
    let updatedData = columnData?.taskIds
      ?.map((item) => {
        return columnData?.stages?.find((ele) => {
          if (ele?.stageTitle === item) {
            return true;
          }
        });
      })
      ?.map((item, index) => {
        return {
          ...item,
          order: index + 1,
        };
      });
    dispatch(UPDATE_PIPELINE(columnData?._id, { stages: updatedData }));
    setButton([]);
  };

  const makeDefault = async (columnData) => {
    let response = await dispatch(
      UPDATE_PIPELINE(columnData?._id, { Default: true })
    );
    if (response === 200) {
      getAllPipelines();
    }
  };

  const handleCancel = () => {
    setState(preserveState);
    setButton([]);
  };

  const handlePipelineDelete = async (id) => {
    let response = await dispatch(DELETE_PIPELINE(id));
    if (response === 200) {
      getAllPipelines();
    }
  };

  const handleClone = async (columnData) => {
    let newObj = {
      pipelineTitle: columnData?.pipelineTitle + " Copy",

      Layout: columnData?.Layout,
      stages: columnData?.stages,
      Default: false,
    };


    const response = await dispatch(ADD_PIPELINE(newObj));
    if (response === 200) {
      getAllPipelines();
    }
  };
  const addStageIntoPipeline = async (stageData, columnData) => {
    setPreserveState(state);
    setButton([columnData?.id]);
    // let newObj = {
    //   pipelineTitle: columnData?.pipelineTitle + " Copy",

    //   Layout: columnData?.Layout,
    //   stages: columnData?.stages,
    //   Default: false,
    // };
    setState({
      ...state,

      columns: {
        ...state?.columns,
        [columnData?.pipelineTitle]: {
          ...state?.columns?.[columnData?.pipelineTitle],
          stages: [
            ...state?.columns?.[columnData?.pipelineTitle]?.stages,
            {
              ...stageData,
              order:
                state?.columns?.[columnData?.pipelineTitle]?.taskIds?.length +
                1,
            },
          ],
          taskIds: [
            ...state?.columns?.[columnData?.pipelineTitle]?.taskIds,
            stageData?.stageTitle,
          ],
        },
      },
      tasks: {
        ...state?.tasks,
        [stageData?.stageTitle]: {
          ...stageData,
          id: stageData?.stageTitle,
          order:
            state?.columns?.[columnData?.pipelineTitle]?.taskIds?.length + 1,
        },
      },
    });


    // const response = await dispatch(ADD_PIPELINE(newObj));
    // if (response === 200) {
    //   getAllPipelines();
    // }
  };

  const getAllStages = () => {
    let data = {
      offset: 1,
      limit: 100,
      search: [],
    };
    dispatch(GET_ALL_STAGES(data));
  };
  const getAllPipelines = async () => {
    let data = {
      offset: 1,
      limit: 100,
      search: [],
    };
    let response = await dispatch(GET_ALL_PIPELINES(data));
    setPipelineData(response?.data);
  };

  useEffect(() => {
    if (pipelineData) {
      setState({
        ...state,
        columnOrder: pipelineData?.pipelineData?.map(
          (item) => item?.pipelineTitle
        ),
        columns: pipelineData?.pipelineData
          ?.map((item) => {
            return {
              [item?.pipelineTitle]: {
                ...item,
                id: item?.pipelineTitle,
                title: item?.pipelineTitle,
                taskIds: item?.stages?.map((ele) => {
                  return ele?.stageTitle;
                }),
              },
            };
          })
          .reduce((acc, curr) => {
            const key = Object.keys(curr)[0];
            acc[key] = curr[key];
            return acc;
          }, {}),
        tasks: {
          ...pipelineData?.pipelineData
            ?.map((item) => {
              return item?.stages?.map((ele) => {
                return {
                  [ele?.stageTitle]: {
                    id: ele?.stageTitle,
                    ...ele,
                  },
                };
              });
            })
            ?.flat()
            ?.reduce((acc, curr) => {
              const key = Object.keys(curr)[0];
              acc[key] = curr[key];
              return acc;
            }, {}),
        },
      });
    }
  }, [pipelineData]);

  useEffect(() => {
    getAllStages();
    getAllPipelines();
  }, []);

  return (
    <div className=" pb-32">
      <div className="flex justify-end gap-3 mt-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
          onClick={() => setStageModal(true)}
        >
          Add New Stage
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
          onClick={() => setModal(true)}
        >
          Add New Pipeline
        </button>
      </div>
      <div className="m-3 grid grid-cols-3 gap-4">
        {state?.columnOrder?.map((columnId, index) => {
          const column = state?.columns[columnId];
          const tasks = column?.taskIds?.map((taskId) => state?.tasks[taskId]);

          return (
            <div key={index}>
              <DragDropContext
                onDragStart={handleDragStart}
                onDragUpdate={handleDragUpdate}
                onDragEnd={handleDragEnd}
              >
                <div
                  className="flex w-[100%] flex-nowrap gap-4 rounded-lg border border-[#D8D6D6] h-fit"
                // key={pipeline._id}
                >
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    isDropDisabled={false}
                    setStageModal={setStageModal}
                    buttonState={button}
                    updatePipeline={updatePipeline}
                    handleCancel={handleCancel}
                    makeDefault={makeDefault}
                    handlePipelineDelete={handlePipelineDelete}
                    handleClone={handleClone}
                    addStageIntoPipeline={addStageIntoPipeline}
                    removeStageFromPipeline={removeStageFromPipeline}
                  />
                </div>
              </DragDropContext>
            </div>
          );
        })}
      </div>
      <PipelineModal
        setModal={setModal}
        modal={modal}
        handleClose={handleClose}
        setStageModal={setStageModal}
        getAllPipelines={getAllPipelines}
      />
      <StageModal
        setModal={setStageModal}
        setPipelineModal={setModal}
        modal={stageModal}
        handleClose={handleCloseStage}
        getAllStages={getAllStages}
      />
    </div>
  );
};

export default Pipeline;

const initialData = {
  tasks: {},
  columns: {},
  columnOrder: [],
};
