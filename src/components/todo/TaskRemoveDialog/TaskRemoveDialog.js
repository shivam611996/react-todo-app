import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";

import { TasksContext } from "../../../contexts/TasksContext";

const TaskRemoveDialog = ({ taskDetails = {}, open, handleClose }) => {
  const setTasks = React.useContext(TasksContext)[1];

  const deleteTask = () => {
    setTasks((tasks) => tasks.filter((item) => item.id !== taskDetails.id));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="task-remove-dialog-title"
      disableBackdropClick
    >
      <DialogTitle id="task-remove-dialog-title">Delete Task</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{taskDetails.summary}</Typography>
        <Typography gutterBottom>Do you want to delete this task?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={deleteTask} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskRemoveDialog;
