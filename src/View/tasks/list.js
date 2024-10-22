import React, { useMemo, useState } from "react";
import TableList from "../../Components/table";
import { useSelector } from "react-redux";
import TasksSubHeader from "./TasksSubHeader";
import ListingCanvasViewLayout from "../../Components/canvasview";
import KanbanView from "../kanbanView";
import TaskDueReminder from "./reminder";

const defaultView = () => {
  return localStorage.getItem("Tasks-module-view");
};

function TaskList() {
  const [view, setView] = useState(defaultView());
  const form = useSelector((state) => state.user.form);

  const getDataView = useMemo(() => {
    if (view === "canvas") {
      return (
        <ListingCanvasViewLayout
          key="Tasks"
          moduleName="Tasks"
          filterSHow={true}
        />
      );
    } else if (view === "list" || view === null) {
      return (
        <div className="flex gap-3 items-center  flex-col w-full">
          <TableList key="Tasks" moduleName="Tasks" />
        </div>
      );
    } else {
      return <KanbanView moduleName="Tasks" />;
    }
  }, [view]);

  return (
    <>
      <TasksSubHeader
        setView={setView}
        form={form?.sections}
        moduleName="Tasks"
      />
      <div className="px-4">{getDataView}</div>
      <TaskDueReminder />
    </>
  );
}

export default TaskList;
