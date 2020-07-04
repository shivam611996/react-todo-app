import { format } from "date-fns";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const createData = (
  id,
  summary,
  description,
  createdOn,
  dueBy,
  priority,
  currentState
) => {
  return { id, summary, description, createdOn, dueBy, priority, currentState };
};

export const searchByValue = (searchValue, tasks) => {
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

export const groupByField = (fieldName, tasks) =>
  tasks.reduce((result, task) => {
    return {
      ...result,
      [task[fieldName]]: [...(result[task[fieldName]] || []), task],
    };
  }, {});
