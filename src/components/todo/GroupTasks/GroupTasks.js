import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MuiSelect from "@material-ui/core/Select";
// import { TasksContext } from "../../../contexts/TasksContext";

const GroupTasks = ({ handleGrouping }) => {
  const [groupBy, setGroupBy] = React.useState("None");

  const handleChange = (event) => {
    const groupBy = event.target.value;
    setGroupBy(groupBy);
    handleGrouping(groupBy);
    // setTasks(groupedTasks);
  };
  return (
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Group By</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={groupBy}
        onChange={handleChange}
      >
        <MenuItem value="None">None</MenuItem>
        <MenuItem value="createdOn">Created On</MenuItem>
        <MenuItem value="dueBy">Pending On</MenuItem>
        <MenuItem value="priority">Priority</MenuItem>
      </MuiSelect>
    </FormControl>
  );
};

export default GroupTasks;
