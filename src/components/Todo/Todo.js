/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Todo.css";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MuiSelect from "@material-ui/core/Select";
import MuiTextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { DateTimePicker } from "formik-material-ui-pickers";

import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";

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

function FormDialog({
  action = "create",
  taskDetails = {},
  open,
  setOpen,
  tasks,
  setTasks,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (action === "edit") {
      setTasks((prevTasks) => {
        const newTasks = prevTasks.map((task) => {
          if (task.id === taskDetails.id) {
            return {
              ...values,
              createdOn: new Date(),
              currentState: "Pending",
            };
          }
          return task;
        });
        return newTasks;
      });
    } else {
      // create action
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

    setTimeout(() => {
      setSubmitting(false);
      handleClose();
      console.log(JSON.stringify({ values }));
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
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
              <DialogContent>
                <Field
                  autoFocus
                  component={TextField}
                  name="summary"
                  label="Summary"
                  fullWidth
                />
                <Field
                  component={TextField}
                  multiline
                  rows={10}
                  placeholder="Description"
                  fullWidth
                  label="Description"
                  name="description"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Field
                    component={DateTimePicker}
                    // value={selectedDate}
                    // onChange={handleDateChange}
                    label="Due By"
                    name="dueBy"
                  />
                  <FormControl>
                    <InputLabel htmlFor="task-priority">Priority</InputLabel>
                    <Field
                      component={Select}
                      name="priority"
                      inputProps={{
                        id: "task-priority",
                      }}
                    >
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Field>
                  </FormControl>
                </div>
                {isSubmitting && <LinearProgress />}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting}
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
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SimpleTabs({ setOpen, tasks: allTasks }) {
  const classes = {};
  const [value, setValue] = React.useState("All");
  const [tasks, setTasks] = React.useState(allTasks);

  useEffect(() => {
    if (value !== "All") {
      const filteredTasks = allTasks.filter(
        (task) => task.currentState === value
      );
      setTasks(filteredTasks);
    } else {
      setTasks(allTasks);
    }
  }, [allTasks, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab value="All" label="All" {...a11yProps("All")} />
        <Tab value="Pending" label="Pending" {...a11yProps("Pending")} />
        <Tab value="Completed" label="Completed" {...a11yProps("Completed")} />
      </Tabs>
      <TabPanel value={value} index="All">
        <EnhancedTable setOpen={setOpen} setTasks={setTasks} tasks={tasks} />
      </TabPanel>
      <TabPanel value={value} index="Pending">
        <EnhancedTable setOpen={setOpen} setTasks={setTasks} tasks={tasks} />
      </TabPanel>
      <TabPanel value={value} index="Completed">
        <EnhancedTable setOpen={setOpen} setTasks={setTasks} tasks={tasks} />
      </TabPanel>
    </div>
  );
}

function createData(
  id,
  summary,
  description,
  createdOn,
  dueBy,
  priority,
  currentState
) {
  return { id, summary, description, createdOn, dueBy, priority, currentState };
}

const rows = [
  createData(
    1,
    "Eat food",
    "description of eating food",
    new Date(),
    new Date(),
    "Medium",
    "Pending"
  ),
  createData(
    2,
    "Play football",
    "description of playing football",
    new Date(),
    new Date(),
    "None",
    "Pending"
  ),
  createData(
    3,
    "Go to market",
    "description of going to market",
    new Date(),
    new Date(),
    "Low",
    "Pending"
  ),
  createData(
    4,
    "Preapre presentation",
    "description of preparing presentation",
    new Date(),
    new Date(),
    "High",
    "Completed"
  ),
  createData(
    5,
    "Study",
    "description of studying",
    new Date(),
    new Date(),
    "Medium",
    "Completed"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "summary",
    label: "Summary",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "createdOn",
    label: "Created On",
  },
  { id: "dueBy", label: "Due By" },
  { id: "priority", label: "Priority" },
  { id: "actions", label: "Actions" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTable({ setTasks, tasks }) {
  const classes = {};
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("priority");
  const [open, setOpen] = React.useState(false);
  const [taskDetails, setTaskDetails] = React.useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleState = (task) => {
    setTasks((tasks) => {
      const newTasks = [...tasks].map((item) => {
        if (item.id === task.id) {
          task.currentState =
            task.currentState === "Completed" ? "Pending" : "Completed";
        }
        return item;
      });
      return newTasks;
    });
  };

  const handleDelete = (task) => {
    setTasks((tasks) => [...tasks].filter((item) => item.id !== task.id));
  };

  const handleEdit = (task) => {
    setTaskDetails({ ...task });
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(tasks, getComparator(order, orderBy)).map(
                (task, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const completedStyle = {
                    textDecoration:
                      task.currentState === "Completed"
                        ? "line-through"
                        : "none",
                  };
                  return (
                    <TableRow hover tabIndex={-1} key={task.id}>
                      <TableCell
                        style={completedStyle}
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {task.summary}
                      </TableCell>
                      <TableCell style={completedStyle}>
                        {task.description}
                      </TableCell>
                      <TableCell style={completedStyle}>
                        {"createdOn" || task.createdOn}
                      </TableCell>
                      <TableCell style={completedStyle}>
                        {"dueBy" || task.dueBy}
                      </TableCell>
                      <TableCell style={completedStyle}>
                        {task.priority}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(task)}
                          color="primary"
                          aria-label="edit task"
                        >
                          <Edit />
                        </IconButton>
                        <Button
                          onClick={() => handleState(task)}
                          color="primary"
                          aria-label="edit task"
                        >
                          {task.currentState === "Completed"
                            ? "Re-open"
                            : "Done"}
                        </Button>
                        <IconButton
                          onClick={() => handleDelete(task)}
                          color="primary"
                          aria-label="delete task"
                        >
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FormDialog
        open={open}
        setOpen={setOpen}
        taskDetails={taskDetails}
        setTasks={setTasks}
        action="edit"
      />
    </div>
  );
}

const Todo = () => {
  const classes = {};
  const [groupBy, setGroupBy] = React.useState("None");
  const [tasks, setTasks] = React.useState(rows);
  const [open, setOpen] = React.useState(false);

  const groupByField = (fieldName) =>
    tasks.reduce((acc, task) => {
      if (fieldName === "Priority") {
        return {
          ...acc,
          [task.priority]: [...(acc[task.priority] || []), { ...task }],
        };
      }
      return task;
    }, {});

  const handleChange = (event) => {
    const groupBy = event.target.value;
    setGroupBy(groupBy);
    const groupedTasks = groupByField(groupBy);
    console.log({ groupedTasks });
    // setTasks(groupedTasks);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSearch = (event) => {
    let filteredData = [];
    filteredData = tasks.filter((e) => {
      let rowValues = Object.values(e);
      let retVal = true;
      rowValues.forEach((value) => {
        const regex = new RegExp(event.target.value, "gi");
        if (typeof value == "string") retVal = value.match(regex);
      });
      return retVal;
    });
    setTasks(filteredData);
  };

  return (
    <main className="todo-container">
      <h1>ToDo App</h1>
      <div className="content">
        <IconButton
          onClick={handleClickOpen}
          color="primary"
          aria-label="add a new task"
        >
          <AddCircle />
        </IconButton>
        <FormDialog
          open={open}
          setOpen={setOpen}
          tasks={tasks}
          setTasks={setTasks}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl
            style={{ minWidth: 120 }}
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-label">Group By</InputLabel>
            <MuiSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={groupBy}
              onChange={handleChange}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Created On">Created On</MenuItem>
              <MenuItem value="Pending On">Pending On</MenuItem>
              <MenuItem value="Priority">Priority</MenuItem>
            </MuiSelect>
          </FormControl>

          <MuiTextField
            id="standard-search"
            label="Search field"
            type="search"
            onClick={handleSearch}
          />
        </div>
        <SimpleTabs setOpen={setOpen} tasks={tasks} setTasks={setTasks} />
      </div>
    </main>
  );
};

export default Todo;
