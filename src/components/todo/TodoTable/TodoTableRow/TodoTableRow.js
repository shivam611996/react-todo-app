import React from "react";
import { format } from "date-fns";

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./TodoTableRow.styles.scss";

const TodoTableRow = ({ task, handleStateChange, handleDialogOpen }) => {
  const completedStyle = {
    textDecoration: task.currentState === "Completed" ? "line-through" : "none",
  };
  const currentState = task.currentState === "Completed" ? "Re-open" : "Done";

  return (
    <TableRow
      onClick={() => handleDialogOpen("read-only", task)}
      hover
      tabIndex={-1}
      key={task.id}
    >
      <TableCell style={completedStyle}>{task.summary}</TableCell>
      <TableCell style={completedStyle}>{task.description}</TableCell>
      <TableCell style={completedStyle}>
        {format(task.createdOn, "yyyy-MM-dd")}
      </TableCell>
      <TableCell style={completedStyle}>
        {format(task.dueBy, "yyyy-MM-dd")}
      </TableCell>
      <TableCell style={completedStyle}>{task.priority}</TableCell>
      <TableCell>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDialogOpen("edit", task);
          }}
          color="primary"
          variant="conatined"
          aria-label="edit task"
        >
          <Edit />
        </IconButton>
        <Button
          className="task-state"
          onClick={(e) => {
            e.stopPropagation();
            handleStateChange(task);
          }}
          aria-label={`${currentState} task`}
        >
          {currentState}
        </Button>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDialogOpen("delete", task);
          }}
          color="secondary"
          variant="conatined"
          aria-label="delete task"
        >
          <DeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TodoTableRow;
