import React from "react";
import PropTypes from "prop-types";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import TodoTableRow from "../TodoTableRow/TodoTableRow";
import NoRecordFound from "../NoRecordFound/NoRecordFound";

const GroupedRows = ({ groupedTasks, handleStateChange, handleDialogOpen }) => {
  const groupKeys = Object.keys(groupedTasks);

  return groupKeys.length ? (
    groupKeys.map((taskGroup) => {
      const tasks = groupedTasks[taskGroup];
      return (
        <React.Fragment key={taskGroup}>
          <TableRow className="task-group-name" tabIndex={-1}>
            <TableCell align="center" colSpan={6}>
              {taskGroup}
            </TableCell>
          </TableRow>
          {tasks.map((task) => (
            <TodoTableRow
              key={task.id}
              task={task}
              handleStateChange={handleStateChange}
              handleDialogOpen={handleDialogOpen}
            />
          ))}
        </React.Fragment>
      );
    })
  ) : (
    <NoRecordFound />
  );
};

GroupedRows.propTypes = {
  groupedTasks: PropTypes.object,
  handleStateChange: PropTypes.func,
  handleDialogOpen: PropTypes.func,
};

export default GroupedRows;
