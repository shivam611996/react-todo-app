import React from "react";

import MuiTextField from "@material-ui/core/TextField";
// import { TasksContext, SearchContext } from "../../../contexts/TasksContext";

const SearchTasks = ({ handleSearch }) => {
  // const tasks = React.useContext(TasksContext)[0];

  return (
    // <SearchContext.Provider value={[searchValue, searchedTasks]}>
    <MuiTextField
      id="standard-search"
      label="Search field"
      type="search"
      onChange={handleSearch}
    />
    // </SearchContext.Provider>
  );
};

export default SearchTasks;
