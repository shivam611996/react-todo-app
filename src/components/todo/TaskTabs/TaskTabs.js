import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "./TabPanel/TabPanel";
import TodoTable from "../TodoTable/TodoTable";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TaskTabs = () => {
  const classes = {};
  const [value, setValue] = React.useState("All");

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
        <TodoTable type="All" />
      </TabPanel>
      <TabPanel value={value} index="Pending">
        <TodoTable type="Pending" />
      </TabPanel>
      <TabPanel value={value} index="Completed">
        <TodoTable type="Completed" />
      </TabPanel>
    </div>
  );
};

export default TaskTabs;