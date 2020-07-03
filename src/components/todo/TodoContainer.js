import React from "react";

import CreateTask from "./CreateTask/CreateTask";
import GroupTasks from "./GroupTasks/GroupTasks";
import SearchTasks from "./SearchTasks/SearchTasks";
import TaskTabs from "./TaskTabs/TaskTabs";
import { rows } from "../../constants/todo";
import { TasksContext } from "../../contexts/TasksContext";

import "./TodoContainer.css";

const TodoContainer = () => {
  const [tasks, setTasks] = React.useState(rows);
  const [searchValue, setSearchValue] = React.useState("");
  const [groupBy, setGroupBy] = React.useState("None");

  const handleGrouping = (groupBy) => {
    setGroupBy(groupBy);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  return (
    <main className="todo-container">
      <h1>ToDo App</h1>
      <div className="content">
        <TasksContext.Provider value={[tasks, setTasks, searchValue, groupBy]}>
          <CreateTask />
          <GroupTasks handleGrouping={handleGrouping} />
          <SearchTasks handleSearch={handleSearch} />
          <TaskTabs />
        </TasksContext.Provider>
      </div>
    </main>
  );
};

export default TodoContainer;
