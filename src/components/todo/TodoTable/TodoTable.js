import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import TodoTableHead from "./TodoTableHead/TodoTableHead";
import TodoTableRow from "./TodoTableRow/TodoTableRow";
import TaskDetailsDialog from "../TaskDetailsDialog/TaskDetailsDialog";
import TaskRemoveDialog from "../TaskRemoveDialog/TaskRemoveDialog";
import {
  stableSort,
  getComparator,
  searchByValue,
  groupByField,
} from "../../../utils/todo";
import { TasksContext } from "../../../contexts/TasksContext";

const TodoTable = ({ type }) => {
  const classes = {};
  const [tasks, setTasks, searchValue, groupBy] = React.useContext(
    TasksContext
  );
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("createdOn");
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("edit");
  const [taskDetails, setTaskDetails] = React.useState({});
  const [filteredTasks, setFilteredTasks] = React.useState(tasks);
  const [groupedTasks, setGroupedTasks] = React.useState({});

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
      const searchedTasks = searchByValue(searchValue, tasks);
      const filteredTasksBySearch =
        type === "All"
          ? searchedTasks
          : searchedTasks.filter((task) => task.currentState === type);
      setFilteredTasks(filteredTasksBySearch);
    }
  }, [searchValue, tasks, type]);

  React.useEffect(() => {
    if (groupBy && groupBy !== "None") {
      const filterdedTasks =
        type === "All"
          ? tasks
          : tasks.filter((task) => task.currentState === type);
      const searchedTasks = searchValue
        ? searchByValue(searchValue, filterdedTasks)
        : filterdedTasks;
      const groupedTasks = groupByField(groupBy, searchedTasks);
      setGroupedTasks(groupedTasks);
    } else if (groupBy && groupBy === "None") {
      setFilteredTasks(tasks);
      setGroupedTasks({});
    }
  }, [groupBy, searchValue, tasks, type]);

  React.useEffect(() => {
    if (orderBy && order) {
      let orderedTasks =
        type === "All"
          ? tasks
          : tasks.filter((task) => task.currentState === type);
      if (searchValue) {
        orderedTasks = searchByValue(searchValue, orderedTasks);
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

  const handleStateChange = (task) => {
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

  const handleDialogOpen = (action, task) => {
    console.log({ action });
    setTaskDetails({ ...task });
    setAction(action);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const groupKeys = Object.keys(groupedTasks);

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
              {groupBy && groupBy !== "None"
                ? groupKeys.map((taskGroup) => {
                    const tasks = groupedTasks[taskGroup];
                    return (
                      <React.Fragment key={taskGroup}>
                        <TableRow tabIndex={-1}>
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
                : filteredTasks.map((task) => {
                    return (
                      <TodoTableRow
                        key={task.id}
                        task={task}
                        handleStateChange={handleStateChange}
                        handleDialogOpen={handleDialogOpen}
                      />
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {action !== "delete" ? (
        <TaskDetailsDialog
          open={open}
          handleClose={handleDialogClose}
          taskDetails={taskDetails}
          action={action}
        />
      ) : (
        <TaskRemoveDialog
          open={open}
          handleClose={handleDialogClose}
          taskDetails={taskDetails}
        />
      )}
    </div>
  );
};

export default TodoTable;
