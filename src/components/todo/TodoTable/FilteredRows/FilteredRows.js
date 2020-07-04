import React from "react";
import PropTypes from "prop-types";

import TodoTableRow from "../TodoTableRow/TodoTableRow";
import NoRecordFound from "../NoRecordFound/NoRecordFound";

const FilteredRows = ({
  filteredTasks,
  handleStateChange,
  handleDialogOpen,
}) => {
  return filteredTasks.length ? (
    filteredTasks.map((task) => {
      return (
        <TodoTableRow
          key={task.id}
          task={task}
          handleStateChange={handleStateChange}
          handleDialogOpen={handleDialogOpen}
        />
      );
    })
  ) : (
    <NoRecordFound />
  );
};

FilteredRows.propTypes = {
  filteredTasks: PropTypes.array,
  handleStateChange: PropTypes.func,
  handleDialogOpen: PropTypes.func,
};

export default FilteredRows;
