import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${value}-taks-tabpanel`}
      aria-labelledby={`${value}-tasks-tabpanel`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
