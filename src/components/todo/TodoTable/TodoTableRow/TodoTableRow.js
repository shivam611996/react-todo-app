import React from "react";
import { format } from "date-fns";
import clsx from "clsx";
import PropTypes from "prop-types";

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./TodoTableRow.styles.scss";

const TodoTableRow = ({ task, handleStateChange, handleDialogOpen }) => {
  const isCompleted = task.currentState === "Completed";
  const currentState = isCompleted ? "Re-open" : "Done";
  const completedStyle = clsx(isCompleted && "completed");

  return (
    <TableRow
      onClick={() => handleDialogOpen("read-only", task)}
      hover
      tabIndex={-1}
      key={task.id}
      className="cursor"
    >
      <TableCell className={completedStyle}>{task.summary}</TableCell>
      <TableCell className={completedStyle}>{task.description}</TableCell>
      <TableCell className={completedStyle}>
        {format(task.createdOn, "yyyy-MM-dd")}
      </TableCell>
      <TableCell className={completedStyle}>
        {format(task.dueBy, "yyyy-MM-dd")}
      </TableCell>
      <TableCell className={completedStyle}>{task.priority}</TableCell>
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

TodoTableRow.propTypes = {
  task: PropTypes.object,
  handleStateChange: PropTypes.func,
  handleDialogOpen: PropTypes.func,
};

export default TodoTableRow;
