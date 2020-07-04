import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DateTimePicker } from "formik-material-ui-pickers";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";
import { TasksContext } from "../../../contexts/TasksContext";

const TaskDetailsSchema = Yup.object().shape({
  summary: Yup.string()
    .min(10, "Min 10 characters allowed")
    .max(140, "Max 140 characters allowed")
    .required("Required"),
  description: Yup.string()
    .min(10, "Min 10 characters allowed")
    .max(500, "Max 500 characters allowed")
    .required("Required"),
  dueBy: Yup.date().required("Required"),
  priority: Yup.string().matches(/(None|Low|Medium|High)/),
});

const TaskDetailsDialog = ({ action, taskDetails = {}, open, handleClose }) => {
  const setTasks = React.useContext(TasksContext)[1];
  const isReadOnly = action === "read-only";

  const onSubmit = (values, { setSubmitting }) => {
    if (action === "edit") {
      setTasks((prevTasks) => {
        const newTasks = prevTasks.map((task) => {
          if (task.id === taskDetails.id) {
            return {
              ...task,
              ...values,
            };
          }
          return task;
        });
        return newTasks;
      });
    } else if (action === "create") {
      setTasks((prevTasks) => {
        return [
          ...prevTasks,
          {
            ...values,
            id: prevTasks.length + 1,
            createdOn: new Date(),
            currentState: "Pending",
          },
        ];
      });
    }

    setSubmitting(false);
    handleClose();
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">
          {isReadOnly ? "View" : "Edit"} Task
        </DialogTitle>
        <Formik
          initialValues={{
            summary: taskDetails.summary || "",
            description: taskDetails.description || "",
            dueBy: taskDetails.dueBy || new Date(),
            priority: taskDetails.priority || "None",
          }}
          validationSchema={TaskDetailsSchema}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <DialogContent dividers>
                <Field
                  autoFocus
                  component={TextField}
                  name="summary"
                  label="Summary"
                  fullWidth
                  margin="dense"
                  disabled={isReadOnly}
                />
                <Field
                  component={TextField}
                  multiline
                  rows={10}
                  placeholder="Description"
                  fullWidth
                  label="Description"
                  name="description"
                  disabled={isReadOnly}
                  margin="dense"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Field
                    component={DateTimePicker}
                    label="Due By"
                    name="dueBy"
                    disabled={isReadOnly}
                    margin="dense"
                  />
                  <FormControl
                    margin="dense"
                    style={{ minWidth: "40%" }}
                    disabled={isReadOnly}
                  >
                    <InputLabel htmlFor="task-priority">Priority</InputLabel>
                    <Field
                      component={Select}
                      name="priority"
                      inputProps={{
                        id: "task-priority",
                      }}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Field>
                  </FormControl>
                </div>
                {isSubmitting && <LinearProgress />}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {isReadOnly ? "Close" : "Cancel"}
                </Button>
                <Button
                  disabled={isSubmitting || isReadOnly}
                  onClick={submitForm}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default TaskDetailsDialog;
