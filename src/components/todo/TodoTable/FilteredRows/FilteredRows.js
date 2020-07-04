import React from "react";

import TodoTableRow from "../TodoTableRow/TodoTableRow";
import NoRecordFound from "../NoRecordFound/NoRecordFound";

const TodoTable = ({ filteredTasks, handleStateChange, handleDialogOpen }) => {
  return filteredTasks.length ? (
    filteredTasks.map((task) => {
      return (
        <TodoTableRow
          key={task.id}
          task={task}
          handleStateChange={handleStateChange}
          handleDialogOpen={handleDialogOpen}
        />
      );
    })
  ) : (
    <NoRecordFound />
  );
};

export default TodoTable;
