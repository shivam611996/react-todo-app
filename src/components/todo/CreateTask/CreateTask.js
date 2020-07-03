import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";

import TaskDetailsDialog from "../TaskDetailsDialog/TaskDetailsDialog";

const CreateTask = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        color="primary"
        aria-label="add a new task"
      >
        <AddCircle />
      </IconButton>
      <TaskDetailsDialog
        action="create"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default CreateTask;
