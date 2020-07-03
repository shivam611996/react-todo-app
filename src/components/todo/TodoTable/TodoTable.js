import React from "react";
import { format } from "date-fns";

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TodoTableHead from "./TodoTableHead/TodoTableHead";
import TaskDetailsDialog from "../TaskDetailsDialog/TaskDetailsDialog";
import { stableSort, getComparator } from "../../../utils/todo";
import { TasksContext } from "../../../contexts/TasksContext";

const handleSearch = (searchValue, tasks) => {
  let filteredData = [];
  filteredData = tasks.filter((task) => {
    const { summary, description, createdOn, dueBy, priority } = task;
    let rowValues = Object.values({
      summary,
      description,
      createdOn,
      dueBy,
      priority,
    });
    return rowValues.some((value) => {
      const regex = new RegExp(searchValue, "gi");
      if (typeof value == "string") {
        const matches = value.match(regex);
        if (matches && matches.length) {
          return true;
        }
      } else if (typeof value == "object") {
        const matches = format(value, "yyyy-MM-dd").match(regex);
        if (matches && matches.length) {
          return true;
        }
      }
      return false;
    });
  });
  return filteredData;
};

const groupByField = (fieldName, tasks) =>
  tasks.reduce((result, task) => {
    return {
      ...result,
      [task[fieldName]]: [...(result[task[fieldName]] || []), task],
    };
  }, {});

const TodoTable = ({ type }) => {
  const classes = {};
  const [tasks, setTasks, searchValue, groupBy] = React.useContext(
    TasksContext
  );
  // const [searchValue, searchedTasks] = React.useContext(SearchContext);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("createdOn");
  const [open, setOpen] = React.useState(false);
  const [taskDetails, setTaskDetails] = React.useState({});
  const [filteredTasks, setFilteredTasks] = React.useState(tasks);

  React.useEffect(() => {
    if (type !== "All" && !searchValue && groupBy === "None") {
      let filteredTasksByType = tasks.filter(
        (task) => task.currentState === type
      );
      setFilteredTasks(filteredTasksByType);
    } else if (
      type === "All" &&
      !searchValue &&
      groupBy === "None" &&
      filteredTasks.length !== tasks.length
    ) {
      setFilteredTasks(tasks);
    }
  }, [filteredTasks.length, groupBy, searchValue, tasks, type]);

  React.useEffect(() => {
    if (searchValue) {
      const searchedTasks = handleSearch(searchValue, tasks);
      const filteredTasksBySearch =
        type === "All"
          ? searchedTasks
          : searchedTasks.filter((task) => task.currentState === type);
      setFilteredTasks(filteredTasksBySearch);
    }
  }, [searchValue, tasks, type]);

  React.useEffect(() => {
    if (groupBy && groupBy !== "None") {
      const groupedTasks = groupByField(groupBy, tasks);
      let filteredTasksByGroup = [];
      const keys = Object.keys(groupedTasks);
      keys.forEach((key) => filteredTasksByGroup.push(...groupedTasks[key]));
      filteredTasksByGroup =
        type === "All"
          ? filteredTasksByGroup
          : filteredTasksByGroup.filter((task) => task.currentState === type);
      if (searchValue) {
        const searchedTasks = handleSearch(searchValue, filteredTasksByGroup);
        const filteredTasksBySearch =
          type === "All"
            ? searchedTasks
            : searchedTasks.filter((task) => task.currentState === type);
        setFilteredTasks(filteredTasksBySearch);
      } else {
        setFilteredTasks(filteredTasksByGroup);
      }
    } else if (groupBy && groupBy === "None") {
      setFilteredTasks(tasks);
    }
  }, [groupBy, searchValue, tasks, type]);

  React.useEffect(() => {
    if (orderBy && order) {
      let orderedTasks =
        type === "All"
          ? tasks
          : tasks.filter((task) => task.currentState === type);
      if (searchValue) {
        orderedTasks = handleSearch(searchValue, orderedTasks);
      }
      orderedTasks = stableSort(orderedTasks, getComparator(order, orderBy));
      setFilteredTasks(orderedTasks);
    }
  }, [orderBy, order, searchValue, tasks, type]);

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

  const handleDialogClose = () => {
    setOpen(false);
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
            <TodoTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredTasks.map((task, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                const completedStyle = {
                  textDecoration:
                    task.currentState === "Completed" ? "line-through" : "none",
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
                      {format(task.createdOn, "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell style={completedStyle}>
                      {format(task.dueBy, "yyyy-MM-dd")}
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
                        {task.currentState === "Completed" ? "Re-open" : "Done"}
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TaskDetailsDialog
        open={open}
        handleClose={handleDialogClose}
        taskDetails={taskDetails}
        action="edit"
      />
    </div>
  );
};

export default TodoTable;
