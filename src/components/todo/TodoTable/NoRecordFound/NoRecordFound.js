import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const NoRecordFound = () => (
  <TableRow tabIndex={-1}>
    <TableCell align="center" colSpan={6}>
      No record found
    </TableCell>
  </TableRow>
);

export default NoRecordFound;
