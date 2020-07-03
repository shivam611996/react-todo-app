import { addDays } from "date-fns";

import { createData } from "../utils/todo";

export const headCells = [
  {
    id: "summary",
    label: "Summary",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "createdOn",
    label: "Created On",
  },
  { id: "dueBy", label: "Due By" },
  { id: "priority", label: "Priority" },
  { id: "actions", label: "Actions" },
];

export const rows = [
  createData(
    1,
    "Eat food",
    "description of eating food",
    new Date(),
    addDays(new Date(), 1),
    "Medium",
    "Pending"
  ),
  createData(
    2,
    "Play football",
    "description of playing football",
    addDays(new Date(), -2),
    addDays(new Date(), 3),
    "None",
    "Pending"
  ),
  createData(
    3,
    "Go to market",
    "description of going to market",
    addDays(new Date(), -2),
    addDays(new Date(), 10),
    "Low",
    "Pending"
  ),
  createData(
    4,
    "Preapre presentation",
    "description of preparing presentation",
    addDays(new Date(), -1),
    addDays(new Date(), 1),
    "High",
    "Completed"
  ),
  createData(
    5,
    "Study",
    "description of studying",
    addDays(new Date(), -1),
    addDays(new Date(), 1),
    "Medium",
    "Completed"
  ),
  createData(
    6,
    "Excercise",
    "description of Excercise",
    addDays(new Date(), -4),
    addDays(new Date(), 1),
    "High",
    "Completed"
  ),
];
